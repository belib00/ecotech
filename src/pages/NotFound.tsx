import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <section className="text-center">
        <p className="mb-2 font-display text-7xl font-bold text-primary" aria-hidden="true">
          404
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-primary-dark sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mb-6 text-muted-foreground">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[var(--shadow-glow)]"
        >
          Voltar para o início
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
