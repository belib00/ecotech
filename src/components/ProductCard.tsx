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
      className="flex w-full max-w-sm flex-col justify-between rounded-xl bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-2 hover:shadow-[var(--shadow-elevated)]"
    >
      <div>
        <h3 className="mb-2 text-xl font-semibold text-primary-dark">{title}</h3>
        <p className="text-foreground/80">{description}</p>
      </div>
      <Link
        to={ctaTo}
        className="mt-5 inline-block w-fit rounded-md border-2 border-primary px-4 py-2 font-bold text-primary-dark transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        {ctaLabel}
      </Link>
    </article>
  );
};

export default ProductCard;
