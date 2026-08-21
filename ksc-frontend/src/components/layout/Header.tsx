import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, Mail } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { Logo } from "../brand/Logo";
import { cn } from "../../utils/cn";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academic" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* close the mobile menu on navigation */
  useEffect(() => {
    const handleRoute = () => setMobileOpen(false);
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-slate-200 transition-all duration-200",
      isScrolled ? "bg-white/95 shadow-[0_8px_30px_rgba(7,27,74,.09)] backdrop-blur-xl" : "bg-white"
    )}>
      {/* Top bar (Dark Blue) */}
      <div className="bg-ksc-navy text-white py-2.5 text-xs hidden md:block">
        <div className="container-site flex justify-between items-center">
          <div className="flex gap-6">
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-2 hover:text-ksc-yellow transition-colors">
              <Mail className="h-3.5 w-3.5" />
              {SITE_CONFIG.contact.email}
            </a>
            <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center gap-2 hover:text-ksc-yellow transition-colors">
              <Phone className="h-3.5 w-3.5" />
              {SITE_CONFIG.contact.phone}
            </a>
            <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} className="flex items-center gap-2 transition-colors hover:text-[#25D366]" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-semibold text-ksc-yellow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ksc-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ksc-yellow"></span>
              </span>
              Admissions Open {SITE_CONFIG.admissionYear}
            </span>
            <Link 
              to="/admissions" 
              className="bg-ksc-red text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex min-h-20 items-center justify-between gap-6 py-3 xl:grid xl:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] xl:py-2">
        <Link to="/" className="group flex min-w-0 items-center gap-3 justify-self-start" aria-label={`${SITE_CONFIG.name} home`}>
          <div className="shrink-0 p-1">
            <Logo className="h-12 w-12 flex-shrink-0 drop-shadow-md sm:h-14 sm:w-14" />
          </div>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-heading text-lg font-extrabold text-ksc-navy sm:text-xl">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {SITE_CONFIG.shortName}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-1 2xl:gap-2 xl:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            return (
              <NavLink 
                key={item.label} 
                to={item.path}
                end={item.path === "/"} 
                className={({ isActive }) =>
                  cn(
                    "relative whitespace-nowrap rounded-lg px-3 py-3 text-sm font-semibold transition-colors duration-200 2xl:px-4",
                    isActive ? "text-ksc-red" : "text-slate-700 hover:text-ksc-red"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-ksc-red 2xl:left-4 2xl:right-4" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center justify-self-end gap-3 xl:flex">
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hidden items-center gap-3 text-sm font-semibold text-slate-700 2xl:flex hover:text-ksc-red transition-colors"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-ksc-navy">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-slate-500">Call us today</span>
              <span className="font-bold">{SITE_CONFIG.contact.phone}</span>
            </span>
          </a>
          <Link to="/admissions" className="btn-gold whitespace-nowrap">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-ksc-navy hover:bg-slate-50 hover:text-ksc-red xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white absolute left-0 top-full w-full shadow-lift">
          <nav className="container-site flex flex-col py-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-slate-100 px-2 py-3 text-sm font-semibold transition-colors",
                      isActive ? "text-ksc-red font-bold" : "text-slate-600 hover:text-ksc-navy",
                      "hover:bg-slate-50"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link to="/admissions" onClick={() => setMobileOpen(false)} className="btn-gold mt-6 w-full py-3 shadow-lg">
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
