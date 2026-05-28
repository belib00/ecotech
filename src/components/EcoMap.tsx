import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pinIcon from "@/assets/map-pin.png";

const customIcon = L.icon({
  iconUrl: pinIcon,
  iconSize: [48, 48],
  iconAnchor: [24, 46],
  popupAnchor: [0, -42],
});

export type CollectionPoint = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  hours?: string;
  notes?: string;
  lat: number;
  lng: number;
};

const points: CollectionPoint[] = [
  {
    id: "ecopila",
    name: "EcoPila",
    address: "Rua Capitão Cruz, Centro - Montenegro/RS",
    hours: "Quintas-feiras, 07:00 às 12:00",
    notes:
      "Ponto de troca aceita alguns recicláveis. Confirme se o item gera crédito na moeda social no momento da entrega.",
    lat: -29.6810776,
    lng: -51.4624438,
  },
  {
    id: "telemonte",
    name: "Telemonte Coleta e Transporte",
    description: "Ponto oficial fixo (parceria com a Prefeitura).",
    address: "Estrada Maurício Cardoso (RS-287), nº 8351 - Bairro Estação/Senai",
    phone: "(51) 3649-3200",
    lat: -29.6938,
    lng: -51.4338,
  },
  {
    id: "montepel",
    name: "Montepel",
    description: "Recebe diversos materiais para reciclagem, incluindo eletrônicos e pilhas.",
    address: "Rua Hortêncio R. Machado, 40 - Bairro Municipal",
    lat: -29.6852,
    lng: -51.4598,
  },
  {
    id: "smartcom",
    name: "SmartCom Assistência Técnica",
    description: "Aceita descarte de baterias e eletrônicos.",
    address: "Rua Dr. Bruno de Andrade, 1340 - Timbaúva",
    lat: -29.6755,
    lng: -51.4502,
  },
  {
    id: "praca-rui-barbosa",
    name: "Dia do Descarte Correto - Praça Rui Barbosa",
    description:
      "Evento periódico da Secretaria Municipal de Meio Ambiente (SMMA). Recebimento gratuito de eletrônicos, óleo de cozinha e lâmpadas.",
    address: "Praça Rui Barbosa - Centro, Montenegro/RS",
    lat: -29.6878,
    lng: -51.4612,
  },
  {
    id: "estacao-cultura",
    name: "Dia do Descarte Correto - Estação da Cultura",
    description:
      "Evento periódico da SMMA. Recebimento gratuito de eletrônicos, óleo de cozinha e lâmpadas.",
    address: "Rua Osvaldo Aranha - Montenegro/RS",
    lat: -29.6864,
    lng: -51.4639,
  },
];

type Props = {
  selectedType?: string | null;
  zoom?: number;
};

const FlyTo = ({ lat, lng, zoom, trigger }: { lat: number; lng: number; zoom: number; trigger: unknown }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 0.8 });
  }, [trigger, lat, lng, zoom, map]);
  return null;
};

const EcoMap = ({ selectedType = null, zoom = 14 }: Props) => {
  const center: [number, number] = [-29.6852, -51.4598];
  const mainRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (selectedType && mainRef.current) {
      mainRef.current.openPopup();
    }
  }, [selectedType]);

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <Marker
          key={p.id}
          ref={p.id === "ecopila" ? mainRef : undefined}
          position={[p.lat, p.lng]}
          icon={customIcon}
        >
          <Popup>
            <strong>{p.name}</strong>
            {p.description ? (
              <>
                <br />
                {p.description}
              </>
            ) : null}
            {p.address ? (
              <>
                <br />
                <span>{p.address}</span>
              </>
            ) : null}
            {p.phone ? (
              <>
                <br />
                Telefone: {p.phone}
              </>
            ) : null}
            {p.hours ? (
              <>
                <br />
                Horário: {p.hours}
              </>
            ) : null}
            {p.notes ? (
              <>
                <br />
                <em>{p.notes}</em>
              </>
            ) : null}
            {p.id === "ecopila" && selectedType ? (
              <>
                <br />
                <em>Recebe: {selectedType}</em>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
      {selectedType ? (
        <FlyTo lat={-29.6810776} lng={-51.4624438} zoom={16} trigger={selectedType} />
      ) : null}
    </MapContainer>
  );
};

export default EcoMap;
