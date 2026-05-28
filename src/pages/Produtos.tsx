import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Produtos = () => {
  return (
    <section className="container py-12 text-center md:py-16">
      <h1 className="mb-3 text-3xl text-primary-dark sm:text-4xl md:mb-4 md:text-5xl">
        Marketplace de Eletrônicos Recicláveis
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground sm:text-base md:mb-10">
        Veja abaixo os produtos disponíveis e contribua para o consumo consciente.
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            description={`${p.price} — ${p.shortDescription}`}
            ctaLabel="Ver mais"
            ctaTo={`/produtos/${p.id}`}
          />
        ))}
      </div>
      <div className="mt-8 md:mt-10">
        <Link
          to="/contato"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:scale-105 hover:bg-primary-light hover:text-primary-dark sm:px-8"
        >
          Quero anunciar meu produto
        </Link>
      </div>
    </section>
  );
};

export default Produtos;
