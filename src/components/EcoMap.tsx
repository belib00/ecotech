import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import pinIcon from "@/assets/map-pin.png";
import type { CollectionPoint } from "@/data/collectionPoints";
import { directionsUrl, formatDistance, haversineKm, type LatLng } from "@/lib/geo";
import { getOpenStatus } from "@/lib/opening-hours";

const baseIcon = L.icon({
  iconUrl: pinIcon,
  iconSize: [48, 48],
  iconAnchor: [24, 46],
  popupAnchor: [0, -42],
});

/** Versão maior do pino, usada quando o ponto está selecionado ou com o mouse em cima. */
const activeIcon = L.icon({
  iconUrl: pinIcon,
  iconSize: [62, 62],
  iconAnchor: [31, 59],
  popupAnchor: [0, -54],
});

const DEFAULT_CENTER: [number, number] = [-29.6852, -51.4598];

/** Ajusta o enquadramento do mapa para caber todos os pontos visíveis (e o usuário, se localizado). */
const FitToPoints = ({
  points,
  userLocation,
}: {
  points: CollectionPoint[];
  userLocation: LatLng | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    const coords = points.map((p) => [p.lat, p.lng] as [number, number]);
    if (userLocation) coords.push([userLocation.lat, userLocation.lng]);

    if (coords.length === 1) {
      map.flyTo(coords[0], 16, { duration: 0.8 });
      return;
    }
    map.fitBounds(L.latLngBounds(coords), { padding: [48, 48], maxZoom: 15 });
  }, [points, userLocation, map]);

  return null;
};

/** Voa até o ponto selecionado na lista. */
const FlyToPoint = ({ point }: { point: CollectionPoint | null }) => {
  const map = useMap();

  useEffect(() => {
    if (point) {
      map.flyTo([point.lat, point.lng], 16, { duration: 0.8 });
    }
  }, [point, map]);

  return null;
};

type Props = {
  points: CollectionPoint[];
  selectedType?: string | null;
  selectedPointId?: string | null;
  hoveredPointId?: string | null;
  userLocation?: LatLng | null;
  onSelectPoint?: (id: string) => void;
  zoom?: number;
};

const EcoMap = ({
  points,
  selectedType = null,
  selectedPointId = null,
  hoveredPointId = null,
  userLocation = null,
  onSelectPoint,
  zoom = 14,
}: Props) => {
  const markerRefs = useRef(new Map<string, L.Marker>());
  const selectedPoint = selectedPointId
    ? points.find((p) => p.id === selectedPointId) ?? null
    : null;

  // Abre o popup do ponto escolhido na lista
  useEffect(() => {
    if (selectedPointId) {
      markerRefs.current.get(selectedPointId)?.openPopup();
    }
  }, [selectedPointId]);

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((p) => {
        const isActive = p.id === selectedPointId || p.id === hoveredPointId;
        const status = getOpenStatus(p.weeklyHours);
        const distanceKm = userLocation ? haversineKm(userLocation, p) : null;

        return (
          <Marker
            key={p.id}
            ref={(marker) => {
              if (marker) markerRefs.current.set(p.id, marker);
              else markerRefs.current.delete(p.id);
            }}
            position={[p.lat, p.lng]}
            icon={isActive ? activeIcon : baseIcon}
            zIndexOffset={isActive ? 1000 : 0}
            eventHandlers={onSelectPoint ? { click: () => onSelectPoint(p.id) } : undefined}
          >
            <Popup>
              <div className="min-w-[220px] max-w-[260px]">
                <p className="text-sm font-bold text-primary-dark">{p.name}</p>

                {status ? (
                  <p className={`text-xs font-semibold ${status.isOpen ? "text-primary" : "text-muted-foreground"}`}>
                    {status.label}
                  </p>
                ) : null}

                {p.description ? <p className="text-xs">{p.description}</p> : null}

                {p.address ? (
                  <p className="flex items-start gap-1 text-xs">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p.address}</span>
                  </p>
                ) : null}

                {p.phone ? (
                  <p className="flex items-center gap-1 text-xs">
                    <Phone className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p.phone}</span>
                  </p>
                ) : null}

                {p.hours ? (
                  <p className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p.hours}</span>
                  </p>
                ) : null}

                {p.notes ? <p className="text-xs italic">{p.notes}</p> : null}

                {selectedType && p.accepts.includes(selectedType) ? (
                  <p className="text-xs font-medium text-primary-dark">Recebe: {selectedType}</p>
                ) : null}

                {distanceKm !== null ? (
                  <p className="text-xs font-medium">a {formatDistance(distanceKm)} de você</p>
                ) : null}

                <a
                  href={directionsUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-directions-link mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold transition-colors duration-300 hover:bg-highlight"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  Como chegar
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {userLocation ? (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
        >
          <Popup>Você está aqui</Popup>
        </CircleMarker>
      ) : null}

      <FitToPoints points={points} userLocation={userLocation} />
      <FlyToPoint point={selectedPoint} />
    </MapContainer>
  );
};

export default EcoMap;
