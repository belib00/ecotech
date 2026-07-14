import { useMemo, useState } from "react";
import {
  Clock,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  SearchX,
  X,
} from "lucide-react";
import EcoMap from "@/components/EcoMap";
import {
  collectionPoints,
  wasteTypes,
  type CollectionPoint,
} from "@/data/collectionPoints";
import { directionsUrl, formatDistance, haversineKm, type LatLng } from "@/lib/geo";
import { getOpenStatus } from "@/lib/opening-hours";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GeoState = "idle" | "loading" | "denied" | "error";

/** Card de um ponto de coleta na lista lateral, sincronizado com o mapa. */
const PointCard = ({
  point,
  isSelected,
  distanceKm,
  onSelect,
  onHover,
}: {
  point: CollectionPoint;
  isSelected: boolean;
  distanceKm: number | null;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
}) => {
  const status = getOpenStatus(point.weeklyHours);
  const previewAccepts = point.accepts.slice(0, 3);
  const remainingAccepts = point.accepts.length - previewAccepts.length;

  return (
    <li
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`rounded-xl border-2 bg-card p-4 text-left shadow-[var(--shadow-soft)] transition-all duration-300 ${
        isSelected
          ? "border-primary ring-2 ring-primary/25"
          : "border-transparent hover:-translate-y-0.5 hover:border-highlight/60 hover:shadow-[var(--shadow-elevated)]"
      }`}
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-snug text-primary-dark">{point.name}</h3>
        {distanceKm !== null ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-primary-dark">
            <Navigation className="h-3 w-3" aria-hidden="true" />
            {formatDistance(distanceKm)}
          </span>
        ) : null}
      </div>

      {status ? (
        <p
          className={`mb-1 flex items-center gap-1.5 text-xs font-semibold ${
            status.isOpen ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-2 w-2 rounded-full ${status.isOpen ? "bg-primary" : "bg-muted-foreground/60"}`}
          />
          {status.label}
        </p>
      ) : point.notes ? (
        <p className="mb-1 text-xs italic text-muted-foreground">{point.notes}</p>
      ) : null}

      {point.address ? (
        <p className="mb-1 flex items-start gap-1.5 text-xs text-foreground/80">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{point.address}</span>
        </p>
      ) : null}

      {point.hours ? (
        <p className="mb-1 flex items-center gap-1.5 text-xs text-foreground/80">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{point.hours}</span>
        </p>
      ) : null}

      {point.phone ? (
        <p className="mb-1 flex items-center gap-1.5 text-xs text-foreground/80">
          <Phone className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{point.phone}</span>
        </p>
      ) : null}

      <p className="mt-2 flex flex-wrap gap-1.5" aria-label="Itens aceitos">
        {previewAccepts.map((item) => (
          <span
            key={item}
            className="rounded-full bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-primary-dark"
          >
            {item}
          </span>
        ))}
        {remainingAccepts > 0 ? (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            +{remainingAccepts}
          </span>
        ) : null}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSelect}
          onFocus={() => onHover(true)}
          onBlur={() => onHover(false)}
          aria-pressed={isSelected}
          className="inline-flex items-center gap-1.5 rounded-md border-2 border-primary px-3 py-1.5 text-xs font-semibold text-primary-dark transition-all duration-300 hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Ver no mapa
        </button>
        <a
          href={directionsUrl(point)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
          Como chegar
        </a>
      </div>
    </li>
  );
};

const CollectionPointsSection = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [geoState, setGeoState] = useState<GeoState>("idle");

  // Pontos que recebem o tipo filtrado (o conjunto controla o enquadramento do mapa)
  const filteredPoints = useMemo(
    () =>
      selectedType
        ? collectionPoints.filter((p) => p.accepts.includes(selectedType))
        : collectionPoints,
    [selectedType]
  );

  // Mesma lista, ordenada por proximidade quando a localização está ativa
  const sortedPoints = useMemo(() => {
    if (!userLocation) return filteredPoints;
    return [...filteredPoints].sort(
      (a, b) => haversineKm(userLocation, a) - haversineKm(userLocation, b)
    );
  }, [filteredPoints, userLocation]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setSelectedPointId(null);
  };

  const clearFilter = () => {
    setSelectedType(null);
    setSelectedPointId(null);
  };

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoState("idle");
      },
      (error) => {
        setGeoState(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const clearLocation = () => {
    setUserLocation(null);
    setGeoState("idle");
  };

  return (
    <section aria-labelledby="coleta-titulo" className="bg-secondary/40 py-12 md:py-16">
      <div className="container">
        <div className="text-center">
          <h2 id="coleta-titulo" className="mb-3 text-2xl text-primary-dark sm:text-3xl md:mb-4 md:text-4xl">
            Encontre um ponto de coleta
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Filtre pelo tipo de lixo eletrônico, veja quem está aberto agora e trace a rota até o ponto mais próximo.
          </p>
        </div>

        {/* Controles: filtro + localização */}
        <div className="mx-auto mb-4 flex max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-xs">
            <Select value={selectedType ?? undefined} onValueChange={handleTypeChange}>
              <SelectTrigger
                aria-label="Filtrar por tipo de lixo eletrônico"
                className="bg-background transition-colors duration-300 hover:border-highlight/70"
              >
                <SelectValue placeholder="Filtrar por tipo de lixo eletrônico" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {wasteTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType ? (
            <button
              type="button"
              onClick={clearFilter}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary-dark/30 bg-background px-4 py-2 text-sm font-medium text-primary-dark transition-colors duration-300 hover:border-highlight hover:bg-secondary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Limpar filtro
            </button>
          ) : null}

          {userLocation ? (
            <button
              type="button"
              onClick={clearLocation}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary-dark/30 bg-background px-4 py-2 text-sm font-medium text-primary-dark transition-colors duration-300 hover:border-highlight hover:bg-secondary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Remover localização
            </button>
          ) : (
            <button
              type="button"
              onClick={requestLocation}
              disabled={geoState === "loading"}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)] disabled:pointer-events-none disabled:opacity-60"
            >
              {geoState === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LocateFixed className="h-4 w-4" aria-hidden="true" />
              )}
              {geoState === "loading" ? "Localizando..." : "Perto de mim"}
            </button>
          )}
        </div>

        {/* Mensagens de status */}
        <div role="status" className="mb-6 text-center text-sm">
          {geoState === "denied" ? (
            <p className="text-destructive">
              Permissão de localização negada. Você pode reativá-la nas configurações do navegador.
            </p>
          ) : geoState === "error" ? (
            <p className="text-destructive">Não foi possível obter sua localização. Tente novamente.</p>
          ) : null}

          {selectedType && sortedPoints.length > 0 ? (
            <p className="text-primary-dark">
              <strong>{sortedPoints.length}</strong>{" "}
              {sortedPoints.length === 1 ? "ponto recebe" : "pontos recebem"}{" "}
              <strong>{selectedType}</strong>
              {userLocation ? " — ordenados do mais próximo para o mais distante" : ""}
            </p>
          ) : !selectedType && userLocation ? (
            <p className="text-primary-dark">Pontos ordenados do mais próximo para o mais distante.</p>
          ) : null}
        </div>

        {sortedPoints.length === 0 ? (
          /* Estado vazio: nenhum ponto recebe o tipo filtrado */
          <div className="mx-auto max-w-xl rounded-2xl border-2 border-dashed border-primary-dark/30 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <SearchX className="mx-auto mb-3 h-10 w-10 text-muted-foreground" aria-hidden="true" />
            <p className="mb-2 font-semibold text-primary-dark">
              Nenhum ponto cadastrado recebe {selectedType}.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Os eventos "Dia do Descarte Correto" da SMMA costumam aceitar itens variados — vale acompanhar a agenda.
            </p>
            <button
              type="button"
              onClick={clearFilter}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Limpar filtro
            </button>
          </div>
        ) : (
          /* Lista + mapa sincronizados */
          <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
            <ul
              aria-label="Lista de pontos de coleta"
              className="order-2 flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-1 lg:order-1 lg:max-h-[480px]"
            >
              {sortedPoints.map((p) => (
                <PointCard
                  key={p.id}
                  point={p}
                  isSelected={p.id === selectedPointId}
                  distanceKm={userLocation ? haversineKm(userLocation, p) : null}
                  onSelect={() => setSelectedPointId(p.id)}
                  onHover={(hovering) => setHoveredPointId(hovering ? p.id : null)}
                />
              ))}
            </ul>

            <div className="order-1 h-[320px] overflow-hidden rounded-2xl border-2 border-primary-dark/70 shadow-[var(--shadow-elevated)] sm:h-[380px] lg:order-2 lg:h-[480px]">
              <EcoMap
                points={filteredPoints}
                selectedType={selectedType}
                selectedPointId={selectedPointId}
                hoveredPointId={hoveredPointId}
                userLocation={userLocation}
                onSelectPoint={setSelectedPointId}
              />
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-foreground/80 sm:text-base">
          Entre em contato pelas redes sociais ou visite nossa unidade.
        </p>
      </div>
    </section>
  );
};

export default CollectionPointsSection;
