import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Menu, X } from "lucide-react";
import logo from "@/assets/ecotech-logo.png";

const navItems = [
  { to: "/", label: "Início", end: true },
  { to: "/sobre", label: "Sobre" },
  { to: "/produtos", label: "Produtos" },
  { to: "/contato", label: "Contato" },
];

const SiteLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 bg-primary-dark text-primary-foreground shadow-[var(--shadow-soft)]">
        <div className="container relative flex h-20 items-center justify-between gap-3 md:h-28">
          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-lg font-bold md:gap-3 md:text-2xl"
          >
            <img
              src={logo}
              alt="Logo EcoTech"
              className="h-14 w-14 shrink-0 object-contain drop-shadow-md md:h-20 md:w-20"
            />
            <span className="truncate bg-gradient-to-r from-primary-light to-white bg-clip-text text-transparent">
              EcoTech
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <ul className="pointer-events-auto flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-primary-light ${
                        isActive
                          ? "text-primary-light"
                          : "text-primary-foreground"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botão Mobile */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {open && (
          <nav className="border-t border-white/10 bg-primary-dark md:hidden">
            <ul className="container flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-white/10 ${
                        isActive
                          ? "text-primary-light"
                          : "text-primary-foreground"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Conteúdo das páginas */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Rodapé */}
      <footer className="mt-16 bg-primary-dark text-primary-foreground">
        <div className="container py-10 text-center">
          <p className="text-sm opacity-90">
            © 2026 EcoTech. Todos os direitos reservados.
          </p>

          <div className="my-5 flex justify-center gap-5">
            <a
              href="#"
              aria-label="Facebook"
              className="transition-transform hover:scale-110 hover:text-primary-light"
            >
              <Facebook className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="transition-transform hover:scale-110 hover:text-primary-light"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="transition-transform hover:scale-110 hover:text-primary-light"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm opacity-90">
            <a href="#" className="hover:text-primary-light hover:underline">
              Termos de Uso
            </a>

            <a href="#" className="hover:text-primary-light hover:underline">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;