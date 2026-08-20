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
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors tracking-wide",
          "text-ksc-navy hover:text-ksc-red",
          open && "text-ksc-red"
        )}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-56 rounded-md border-b-4 border-ksc-red bg-white p-2 shadow-xl">
          {item.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-ksc-navy hover:bg-slate-50 hover:text-ksc-red"
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
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-white"
    )}>
      {/* Top bar (Dark Blue) */}
      <div className="bg-ksc-navy text-white py-2 text-xs hidden md:block">
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
              className="bg-ksc-red text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
            >
              Apply Now
            </Link>
            <a
              href="#"
              className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-ksc-navy transition-colors shadow-sm hidden sm:block"
            >
              Pay Fee Online
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-4 group" aria-label={`${SITE_CONFIG.name} home`}>
          <div className="bg-ksc-navy p-2 rounded-full">
            <Logo className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0" />
          </div>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl sm:text-2xl font-bold text-ksc-navy">
              {SITE_CONFIG.name}
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {SITE_CONFIG.shortName}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return <DesktopDropdown key={item.label} item={item} />;
            }
            return (
              <NavLink 
                key={item.label} 
                to={item.path!} 
                end={item.path === "/"} 
                className={({ isActive }) =>
                  cn(
                    "relative py-2 text-sm font-semibold transition-colors duration-200",
                    isActive ? "text-ksc-red" : "text-slate-700 hover:text-ksc-red"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ksc-red rounded-full" />
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
          <Link to="/admissions" className="btn-gold ml-2">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="xl:hidden rounded-lg border border-slate-200 p-2 text-ksc-navy hover:bg-slate-50 hover:text-ksc-red"
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
              if (item.children) {
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-slate-100">
                    <button
                      className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-semibold text-ksc-navy"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      aria-expanded={expanded}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 text-ksc-red transition-transform", expanded && "rotate-180")} />
                    </button>
                    {expanded && (
                      <div className="flex flex-col pb-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-ksc-red"
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