import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, Mail, MapPin, ChevronDown } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { Logo } from "../brand/Logo";
import { cn } from "../../utils/cn";

interface NavItem {
  label: string;
  path: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academic" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const { data: { settings: SITE_CONFIG, branches } } = useSiteData();
  const navItems: NavItem[] = Array.isArray((SITE_CONFIG as any).navItems) && (SITE_CONFIG as any).navItems.length
    ? (SITE_CONFIG as any).navItems
    : DEFAULT_NAV_ITEMS;
  const BRANCH_META: Record<string, { city: string; label: string }> = {
    "Karur Study Centre": { city: "Karur", label: "Karur Study Centre" },
    "Pace Computer College": { city: "Kangeyam", label: "Pace Computer College" },
    "S.S. Institute": { city: "Dindigul", label: "S.S. Institute" },
  };
  const branchList = (Array.isArray(branches) ? branches : []).map((b: any) => ({
    label: BRANCH_META[b.name]?.label || b.name,
    city: BRANCH_META[b.name]?.city || b.name,
  }));
  const previousQuestionLinks: { label: string; url: string }[] = Array.isArray((SITE_CONFIG as any).previousQuestionLinks)
    ? (SITE_CONFIG as any).previousQuestionLinks
    : [];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pqOpen, setPqOpen] = useState(false);
  const [pqMobileOpen, setPqMobileOpen] = useState(false);
  const pqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pqOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (pqRef.current && !pqRef.current.contains(e.target as Node)) {
        setPqOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pqOpen]);

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

  /* collapse the mobile "Previous Question" accordion whenever the drawer closes */
  useEffect(() => {
    if (!mobileOpen) setPqMobileOpen(false);
  }, [mobileOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-ksc-navy/90 backdrop-blur-md shadow-lg" : "bg-ksc-navy/95 backdrop-blur-sm border-b border-white/10"
    )}>
      {/* Branch ticker (running strip) */}
      {branchList.length > 0 && (
        <div className="relative z-20 overflow-hidden bg-gradient-to-r from-ksc-yellow via-amber-400 to-ksc-yellow py-1.5 text-ksc-navy">
          <div className="flex w-max animate-marqueeHorizontal items-center gap-10 whitespace-nowrap">
            {[...branchList, ...branchList, ...branchList].map((b, i) => (
              <span key={`${b.label}-${i}`} className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider">
                <MapPin className="h-3 w-3" />
                {b.city} <span className="font-medium normal-case text-ksc-navy/70">— {b.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top bar (Dark Blue) */}
      <div className="bg-ksc-navy text-white py-2.5 text-xs hidden md:block relative z-20">
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
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ksc-yellow"></span>
              </span>
              Admissions Open {SITE_CONFIG.admissionYear}
            </span>
            <Link 
              to="/admissions" 
              className="bg-ksc-red hover:bg-[#a30b13] text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex min-h-16 sm:min-h-20 items-center justify-between gap-3 sm:gap-6 py-2.5 sm:py-3 xl:grid xl:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] xl:py-2">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3 justify-self-start" aria-label={`${SITE_CONFIG.name} home`}>
          <div className="shrink-0 p-0.5 sm:p-1">
            <Logo className="h-10 w-10 flex-shrink-0 drop-shadow-md sm:h-14 sm:w-14" />
          </div>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-heading text-sm sm:text-lg lg:text-xl font-extrabold text-white drop-shadow-sm tracking-tight">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/70">
              {SITE_CONFIG.shortName}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-1 2xl:gap-2 xl:flex" aria-label="Primary">
          {navItems.map((item) => {
            return (
              <NavLink 
                key={item.label} 
                to={item.path}
                end={item.path === "/"} 
                className={({ isActive }) =>
                  cn(
                    "relative whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300",
                    isActive ? "text-ksc-yellow bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-t-full bg-ksc-yellow" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
          {previousQuestionLinks.length > 0 && (
            <div className="relative" ref={pqRef}>
              <button
                type="button"
                onClick={() => setPqOpen((v) => !v)}
                aria-expanded={pqOpen}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300",
                  pqOpen ? "text-ksc-yellow bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                Previous Question
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", pqOpen && "rotate-180")} />
              </button>
              {pqOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-ksc-navy shadow-2xl animate-fade-in">
                  {previousQuestionLinks.map((link, i) => (
                    <a
                      key={`${link.label}-${i}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setPqOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-ksc-yellow"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center justify-self-end gap-3 xl:flex">
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hidden items-center gap-3 text-sm font-semibold text-white/90 2xl:flex hover:text-ksc-yellow transition-colors"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-white/60">Call us today</span>
              <span className="font-bold drop-shadow-sm">{SITE_CONFIG.contact.phone}</span>
            </span>
          </a>
          <Link to="/admissions" className="btn-gold whitespace-nowrap hover:shadow-lg transition-shadow">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/10 hover:text-ksc-yellow xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      {/* Mobile menu backdrop overlay & drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[60px] z-40 bg-black/60 backdrop-blur-xs xl:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="xl:hidden border-t border-white/10 bg-ksc-navy/98 backdrop-blur-2xl absolute left-0 top-full w-full shadow-2xl animate-fade-in-up z-50 max-h-[calc(100vh-70px)] overflow-y-auto">
            <nav className="container-site flex flex-col py-4" aria-label="Mobile">
              <div className="space-y-1">
                {navItems.map((item) => {
                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "px-4 py-3 text-base font-bold transition-all block w-full text-left rounded-xl",
                          isActive
                            ? "text-ksc-yellow bg-white/15 shadow-inner"
                            : "text-white/85 hover:text-white hover:bg-white/10"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
                {previousQuestionLinks.length > 0 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setPqMobileOpen((v) => !v)}
                      aria-expanded={pqMobileOpen}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-base font-bold transition-all rounded-xl",
                        pqMobileOpen ? "text-ksc-yellow bg-white/15 shadow-inner" : "text-white/85 hover:text-white hover:bg-white/10"
                      )}
                    >
                      Previous Question
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", pqMobileOpen && "rotate-180")} />
                    </button>
                    {pqMobileOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                        {previousQuestionLinks.map((link, i) => (
                          <a
                            key={`${link.label}-${i}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-ksc-yellow transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5 px-1">
                <Link
                  to="/admissions"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full justify-center py-3.5 text-sm font-bold shadow-lg"
                >
                  Apply for Admission
                </Link>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-ksc-yellow" /> Call Us
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/30 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-600/40 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" /> WhatsApp
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
