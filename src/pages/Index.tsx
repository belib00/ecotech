import { useState } from "react";
import { Link } from "react-router-dom";
import { Recycle, ShoppingBag, Users, Leaf } from "lucide-react";
import EcoMap from "@/components/EcoMap";
import logo from "@/assets/ecotech-logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const wasteTypes = [
  "Computadores",
  "Tablets",
  "Monitores",
  "Teclados",
  "Impressoras",
  "Câmeras Fotográficas",
  "Aparelhos de Som",
  "Lâmpadas Eletrônicas",
  "Televisores",
  "Geladeira",
  "Fogão",
  "Micro-ondas",
  "Rádios",
  "Telefones",
  "Celulares",
  "Carregadores",
  "Baterias",
  "Pilhas",
  "Fios",
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <>
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-12 text-primary-foreground sm:py-16 md:py-28">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="container relative grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="order-2 text-center md:order-1 md:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur sm:px-4 sm:py-1.5 sm:text-sm">
              <Leaf className="h-4 w-4 text-primary-light" />
              Economia circular em ação
            </span>
            <h1 className="mb-4 text-3xl leading-tight sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
              Inovação Sustentável com a <span className="text-primary-light">EcoTech</span>
            </h1>
            <p className="mb-6 max-w-xl text-base opacity-90 sm:text-lg md:mb-8 md:text-xl">
              Marketplace de eletrônicos recicláveis. Compre, venda e dê uma nova vida aos seus dispositivos.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <Link
                to="/produtos"
                className="inline-block rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:scale-105 hover:bg-primary-light hover:text-primary-dark sm:px-7"
              >
                Ver Produtos
              </Link>
              <Link
                to="/contato"
                className="inline-block rounded-lg border-2 border-primary-light/60 px-6 py-3 text-center font-semibold text-primary-foreground transition-all hover:bg-white/10 sm:px-7"
              >
                Anunciar item
              </Link>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <img
              src={logo}
              alt="EcoTech - reciclagem de eletrônicos"
              className="w-72 drop-shadow-2xl sm:w-96 md:w-[34rem] lg:w-[42rem] xl:w-[48rem] animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card py-8 md:py-10">
        <div className="container grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
          {[
            { icon: Recycle, label: "+500 itens reciclados", desc: "Eletrônicos com nova vida" },
            { icon: ShoppingBag, label: "Marketplace ativo", desc: "Compre e venda com segurança" },
            { icon: Users, label: "Comunidade local", desc: "Montenegro/RS e região" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-secondary p-3 text-primary-dark">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-primary-dark">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-12 md:py-16">
        <div className="container text-center">
          <h2 className="mb-3 text-2xl text-primary-dark sm:text-3xl md:mb-4 md:text-4xl">
            Encontre um ponto de coleta
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Selecione o tipo de lixo eletrônico para localizar o ponto de descarte correto.
          </p>

          <div className="mx-auto mb-6 flex max-w-md flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Select
              value={selectedType ?? undefined}
              onValueChange={(v) => setSelectedType(v)}
            >
              <SelectTrigger className="bg-background">
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
            {selectedType ? (
              <button
                onClick={() => setSelectedType(null)}
                className="rounded-lg border border-primary-dark/30 bg-background px-4 py-2 text-sm font-medium text-primary-dark transition-colors hover:bg-secondary"
              >
                Limpar
              </button>
            ) : null}
          </div>

          {selectedType ? (
            <p className="mb-4 text-sm text-primary-dark sm:text-base">
              Ponto de coleta para <strong>{selectedType}</strong>: <strong>Ecopila</strong> — R. Cap. Cruz, Centro, Montenegro/RS.
            </p>
          ) : null}

          <div className="mx-auto h-[280px] max-w-3xl overflow-hidden rounded-xl border-4 border-primary-dark shadow-[var(--shadow-elevated)] sm:h-[360px] md:h-[420px]">
            <EcoMap selectedType={selectedType} />
          </div>
          <p className="mt-5 text-sm text-foreground/80 sm:text-base md:mt-6">
            Entre em contato pelas redes sociais ou visite nossa unidade.
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
