import { Link } from "react-router-dom";
import { Recycle, ShoppingBag, Users, Leaf } from "lucide-react";
import CollectionPointsSection from "@/components/CollectionPointsSection";
import logo from "@/assets/ecotech-logo.png";

const stats = [
  { icon: Recycle, label: "+500 itens reciclados", desc: "Eletrônicos com nova vida" },
  { icon: ShoppingBag, label: "Marketplace ativo", desc: "Compre e venda com segurança" },
  { icon: Users, label: "Comunidade local", desc: "Montenegro/RS e região" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-titulo"
        className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-12 text-primary-foreground sm:py-16 md:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"
        />
        <div className="container relative grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur sm:px-4 sm:py-1.5 sm:text-sm">
              <Leaf className="h-4 w-4 text-highlight" aria-hidden="true" />
              Economia circular em ação
            </p>
            <h1 id="hero-titulo" className="mb-4 text-3xl leading-tight sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
              Inovação Sustentável com a <span className="text-primary-light">EcoTech</span>
            </h1>
            <p className="mb-6 max-w-xl text-base opacity-90 sm:text-lg md:mb-8 md:text-xl">
              Marketplace de eletrônicos recicláveis. Compre, venda e dê uma nova vida aos seus dispositivos.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <Link
                to="/produtos"
                className="inline-block rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)] sm:px-7"
              >
                Ver Produtos
              </Link>
              <Link
                to="/contato"
                className="inline-block rounded-lg border-2 border-primary-light/60 px-6 py-3 text-center font-semibold text-primary-foreground transition-all duration-300 hover:border-highlight hover:bg-white/10 hover:text-highlight sm:px-7"
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

      {/* Destaques */}
      <section aria-labelledby="destaques-titulo" className="border-y border-border/60 bg-card py-8 md:py-10">
        <h2 id="destaques-titulo" className="sr-only">
          Destaques da EcoTech
        </h2>
        <ul className="container grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, desc }) => (
            <li
              key={label}
              className="group flex flex-col items-center gap-2 rounded-xl p-4 transition-colors duration-300 hover:bg-secondary/50"
            >
              <div className="rounded-full bg-secondary p-3 text-primary-dark transition-all duration-300 group-hover:scale-110 group-hover:bg-highlight group-hover:text-highlight-foreground">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="font-semibold text-primary-dark">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Pontos de coleta: filtro, lista sincronizada e mapa */}
      <CollectionPointsSection />
    </>
  );
};

export default Index;
