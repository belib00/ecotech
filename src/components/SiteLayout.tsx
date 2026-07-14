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

const socialLinks = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Twitter", icon: Twitter },
];

/** Link do menu desktop com sublinhado animado em verde-limão. */
const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-highlight after:transition-transform after:duration-300 hover:text-highlight hover:after:scale-x-100 ${
    isActive ? "text-highlight after:scale-x-100" : "text-primary-foreground"
  }`;

/** Link do menu mobile. */
const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-highlight ${
    isActive ? "text-highlight" : "text-primary-foreground"
  }`;

const SiteLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao trocar de página
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 bg-primary-dark/95 text-primary-foreground shadow-[var(--shadow-soft)] backdrop-blur-md">
        <div className="container relative flex h-20 items-center justify-between gap-3 md:h-28">
          {/* Logo */}
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2 text-lg font-bold md:gap-3 md:text-2xl"
          >
            <img
              src={logo}
              alt="Logo EcoTech"
              className="glow-hover h-14 w-14 shrink-0 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20"
            />
            <span className="truncate bg-gradient-to-r from-primary-light to-white bg-clip-text font-display text-transparent transition-opacity group-hover:opacity-90">
              EcoTech
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav
            aria-label="Navegação principal"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <ul className="pointer-events-auto flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={desktopLinkClass}>
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
            className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-white/10 hover:text-highlight md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {open && (
          <nav
            aria-label="Navegação principal (móvel)"
            className="border-t border-white/10 bg-primary-dark md:hidden"
          >
            <ul className="container flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={mobileLinkClass}>
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
          <small className="block text-sm opacity-90">
            © 2026 EcoTech. Todos os direitos reservados.
          </small>

          <nav aria-label="Redes sociais" className="my-5">
            <ul className="flex justify-center gap-5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="glow-hover inline-block transition-all hover:scale-110 hover:text-highlight"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Documentos legais">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="transition-colors hover:text-highlight hover:underline">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-highlight hover:underline">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
