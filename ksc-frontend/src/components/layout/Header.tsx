import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, ChevronDown, Mail } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
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
          "text-white/80 hover:text-secondary",
          open && "text-secondary"
        )}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-56 rounded-xl border border-white/10 bg-ksc-navy-mid p-1.5 shadow-xl">
          {item.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-secondary"
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
      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors group",
      isActive ? "text-secondary font-bold" : "text-white/80 hover:text-secondary"
    );

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full glass-panel animate-fade-in-up border-b border-white/10">
      {/* Top bar */}
      <div className="hidden bg-ksc-navy-dark border-b border-white/5 text-white/70 lg:block">
        <div className="container-site flex flex-col items-center justify-between py-2 text-[11px] font-medium uppercase tracking-wider md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-secondary">
              <Mail className="h-3.5 w-3.5 text-secondary/70" /> {SITE_CONFIG.contact.email}
            </a>
            <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-secondary">
              <Phone className="h-3.5 w-3.5 text-secondary/70" /> {SITE_CONFIG.contact.phone}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[#25D366]"
            >
              <MessageCircle className="h-3.5 w-3.5 text-secondary/70" /> WhatsApp
            </a>
          </div>
          <div className="mt-2 flex items-center gap-4 md:mt-0">
            <span className="hidden tracking-wide text-secondary md:block">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              {SITE_CONFIG.admissionOpen}
            </span>
            <Link 
              to="/admissions" 
              className="rounded-full bg-white/5 px-4 py-1 font-bold text-white transition-all hover:bg-secondary hover:text-ksc-navy-dark"
            >
              Admissions
            </Link>
            <a 
              href="#" 
              className="rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1 font-bold text-secondary transition-all hover:bg-secondary hover:text-ksc-navy-dark"
            >
              Pay Fee Online
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group" aria-label={`${SITE_CONFIG.name} home`}>
          <Logo className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-full border-2 border-secondary/50 shadow-glow transition-all duration-500 group-hover:scale-105 group-hover:border-secondary" />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-lg sm:text-2xl font-extrabold tracking-tight text-white transition-colors group-hover:text-secondary">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white/70 transition-colors">
              {SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return <DesktopDropdown key={item.label} item={item} />;
            }
            return (
              <NavLink key={item.label} to={item.path!} end={item.path === "/"} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-secondary rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hidden items-center gap-2 text-sm font-semibold text-white/90 2xl:flex group"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-secondary transition-all group-hover:bg-secondary group-hover:text-ksc-navy-dark">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-secondary transition-colors">Call us</span>
              <span className="font-medium group-hover:text-white transition-colors">{SITE_CONFIG.contact.phone}</span>
            </span>
          </a>
          <Link to="/admissions" className="btn-gold ml-2 py-2.5">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="xl:hidden rounded-lg border border-white/10 p-2 text-white hover:bg-white/5 hover:text-secondary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-white/10 bg-ksc-navy-dark absolute left-0 top-full w-full shadow-2xl">
          <nav className="container-site flex flex-col py-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-white/5">
                    <button
                      className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-semibold text-white/90"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      aria-expanded={expanded}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 text-secondary transition-transform", expanded && "rotate-180")} />
                    </button>
                    {expanded && (
                      <div className="flex flex-col pb-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-secondary"
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
                      "border-b border-white/5 px-2 py-3 text-sm font-semibold transition-colors",
                      isActive ? "text-secondary" : "text-white/90 hover:text-secondary hover:bg-white/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link to="/admissions" onClick={() => setMobileOpen(false)} className="btn-gold mt-6 w-full py-3">
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}