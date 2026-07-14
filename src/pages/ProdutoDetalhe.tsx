import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { getProductById } from "@/data/products";

const ProdutoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <section className="container py-20 text-center">
        <h1 className="mb-4 text-3xl text-primary-dark">Produto não encontrado</h1>
        <p className="mb-6 text-muted-foreground">
          O item que você procura não está disponível.
        </p>
        <Link
          to="/produtos"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)]"
        >
          Ver todos os produtos
        </Link>
      </section>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto "${product.title}" anunciado na EcoTech.`
  );
  const whatsappUrl = `https://wa.me/${product.seller.phone}?text=${whatsappMessage}`;
  const emailUrl = `mailto:${product.seller.email}?subject=${encodeURIComponent(
    `Interesse em ${product.title}`
  )}&body=${whatsappMessage}`;

  return (
    <section aria-labelledby="produto-titulo" className="container py-8 md:py-12">
      <Link
        to="/produtos"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-dark transition-colors hover:text-primary hover:underline"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Voltar para produtos
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {/* Galeria */}
        <figure>
          <div className="aspect-square w-full overflow-hidden rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={product.images[activeImage]}
              alt={`${product.title} - imagem ${activeImage + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <ul className="mt-3 flex gap-2 overflow-x-auto" aria-label="Miniaturas do produto">
              {product.images.map((img, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                    aria-current={activeImage === i}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      activeImage === i
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border opacity-70 hover:border-highlight hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-contain" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </figure>

        {/* Informações */}
        <div className="flex flex-col">
          <span className="mb-2 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary-dark">
            {product.condition}
          </span>
          <h1 id="produto-titulo" className="mb-3 text-2xl text-primary-dark sm:text-3xl md:text-4xl">
            {product.title}
          </h1>
          <p className="mb-4 text-3xl font-bold text-primary">{product.price}</p>
          <p className="mb-6 text-foreground/80">{product.fullDescription}</p>

          <h2 className="mb-3 text-lg font-semibold text-primary-dark">
            Características
          </h2>
          <ul className="mb-8 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Vendedor */}
          <aside
            aria-labelledby="vendedor-titulo"
            className="rounded-xl border-2 border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <h2 id="vendedor-titulo" className="mb-3 text-lg font-semibold text-primary-dark">
              Entre em contato com o vendedor
            </h2>
            <div className="mb-4 space-y-1 text-sm text-foreground/80">
              <p className="font-semibold text-foreground">{product.seller.name}</p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {product.seller.location}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={emailUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary px-5 py-3 font-semibold text-primary-dark transition-all duration-300 hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                E-mail
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProdutoDetalhe;
