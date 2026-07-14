import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
}

const ProductCard = ({ id, title, description, ctaLabel = "Ver mais", ctaTo = "#" }: ProductCardProps) => {
  return (
    <article
      id={id}
      className="group flex w-full max-w-sm flex-col justify-between rounded-xl border-2 border-transparent bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:border-highlight/60 hover:shadow-[var(--shadow-elevated)]"
    >
      <div>
        <h3 className="mb-2 text-xl font-semibold text-primary-dark transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-foreground/80">{description}</p>
      </div>
      <Link
        to={ctaTo}
        className="mt-5 inline-block w-fit rounded-md border-2 border-primary px-4 py-2 font-bold text-primary-dark transition-all duration-300 hover:border-highlight hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)]"
      >
        {ctaLabel}
        <span className="sr-only"> — {title}</span>
      </Link>
    </article>
  );
};

export default ProductCard;
