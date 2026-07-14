import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Produtos = () => {
  return (
    <section aria-labelledby="produtos-titulo" className="container py-12 text-center md:py-16">
      <h1 id="produtos-titulo" className="mb-3 text-3xl text-primary-dark sm:text-4xl md:mb-4 md:text-5xl">
        Marketplace de Eletrônicos Recicláveis
      </h1>
      <div
        aria-hidden="true"
        className="mx-auto mb-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-highlight"
      />

      <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground sm:text-base md:mb-10">
        Veja abaixo os produtos disponíveis e contribua para o consumo consciente.
      </p>

      <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
        {products.map((p) => (
          <li key={p.id} className="flex w-full max-w-sm">
            <ProductCard
              id={p.id}
              title={p.title}
              description={`${p.price} — ${p.shortDescription}`}
              ctaLabel="Ver mais"
              ctaTo={`/produto/${p.id}`}
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 md:mt-10">
        <Link
          to="/contato"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)] sm:px-8"
        >
          Quero anunciar meu produto
        </Link>
      </div>
    </section>
  );
};

export default Produtos;
