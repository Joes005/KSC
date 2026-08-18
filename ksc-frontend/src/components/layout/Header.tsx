import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, ChevronDown, Mail, Sun, Moon } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { useTheme } from "../../services/ThemeContext";
import { Logo } from "../brand/Logo";
import { cn } from "../../utils/cn";

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academic", path: "/academic" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "text-ksc-ink hover:text-primary hover:bg-ksc-mist",
          open && "text-primary bg-ksc-mist"
        )}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-56 rounded-lg border border-ksc-green/15 bg-white p-1.5 shadow-xl">
          {item.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-ksc-ink hover:bg-ksc-mist hover:text-primary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* close the mobile menu on navigation */
  useEffect(() => {
    const handleRoute = () => setMobileOpen(false);
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "text-primary bg-ksc-mist" : "text-ksc-ink hover:text-primary hover:bg-ksc-mist"
    );

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-ksc-green/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      {/* Top bar */}
      <div className="hidden bg-ksc-dark dark:bg-ksc-deep text-white/80 lg:block">
        <div className="container-site flex flex-col items-center justify-between py-2 text-xs md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail className="h-3.5 w-3.5 text-ksc-gold" /> {SITE_CONFIG.contact.email}
            </a>
            <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-ksc-gold" /> {SITE_CONFIG.contact.phone}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-ksc-gold" /> WhatsApp
            </a>
          </div>
          <div className="mt-2 flex items-center gap-4 md:mt-0">
            <span className="hidden font-medium tracking-wide md:block">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {SITE_CONFIG.admissionOpen}
            </span>
            <Link 
              to="/admissions" 
              className="rounded-full bg-white/10 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white hover:text-ksc-dark"
            >
              Admissions
            </Link>
            <a 
              href="#" 
              className="rounded-full bg-ksc-gold px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-ksc-dark shadow transition-all hover:bg-white"
            >
              Pay Fee Online
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <Logo className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded-full ring-2 ring-ksc-gold/40 shadow-sm" />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-ksc-navy sm:text-xl">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-[0.18em] text-ksc-gold">
              {SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return <DesktopDropdown key={item.label} item={item} />;
            }
            return (
              <NavLink key={item.label} to={item.path!} end={item.path === "/"} className={linkClass}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hidden items-center gap-2 text-sm font-semibold text-ksc-dark 2xl:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ksc-mist text-primary">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-wide text-ksc-ink/60">Call us</span>
              {SITE_CONFIG.contact.phone}
            </span>
          </a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ksc-ink hover:bg-ksc-mist hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/admissions" className="btn-gold">
            Admissions
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="xl:hidden rounded-md p-2 text-ksc-dark hover:bg-ksc-mist"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-ksc-green/10 bg-white">
          <nav className="container-site flex flex-col py-3" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-ksc-green/5">
                    <button
                      className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-ksc-dark"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      aria-expanded={expanded}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                    </button>
{expanded && (
                      <div className="flex flex-col pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-md px-5 py-2.5 text-sm font-medium text-ksc-ink hover:bg-mist hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.path!}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-ksc-green/5 px-3 py-3 text-sm font-semibold",
                      isActive ? "text-primary" : "text-ksc-dark"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-ksc-green/10 px-3 py-3 text-sm font-semibold text-ksc-dark transition-colors hover:bg-ksc-mist"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to="/admissions" onClick={() => setMobileOpen(false)} className="btn-gold mt-4 w-full">
              Admissions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}