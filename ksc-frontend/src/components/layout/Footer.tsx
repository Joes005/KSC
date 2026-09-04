import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { Logo } from "../brand/Logo";

/* Brand glyphs inline */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.5v3H10v8h3.5Z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  </svg>
);
const TwitterXIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.7 3h2.9l-6.3 7.2L21.6 21h-5.8l-4.5-5.9L6.2 21H3.3l6.7-7.7L2.6 3h5.9l4.1 5.4L17.7 3Zm-1 16.2h1.6L7.6 4.7H5.9l10.8 14.5Z" />
  </svg>
);


export function Footer() {
  const { data: { settings: SITE_CONFIG, universities: UNIVERSITIES, branches: BRANCHES } } = useSiteData();
  const { contact, socials } = SITE_CONFIG;
  const footerLinks = (SITE_CONFIG as any).footer as { quickLinks: Array<{ label: string; to: string }>; programmeLinks: Array<{ label: string; to: string }>; supportLinks: Array<{ label: string; to: string }> };
  const quickLinks = footerLinks?.quickLinks?.length ? footerLinks.quickLinks : [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" },
  ];
  const programmeLinks = footerLinks?.programmeLinks?.length ? footerLinks.programmeLinks : [
    { label: "TNOU Courses", to: "/academic#tnou" },
    { label: "BDU Courses", to: "/academic#bdu" },
    { label: "ALU Courses", to: "/academic#alagappa" },
    { label: `Admissions ${new Date().getFullYear()}`, to: "/admissions" },
  ];
  const supportLinks = footerLinks?.supportLinks?.length ? footerLinks.supportLinks : [
    { label: "Exam Updates", to: "/exam-update" },
    { label: "Facilities", to: "/facilities" },
  ];

  return (
    <footer className="bg-ksc-navy text-white animate-fade-in-up delay-200">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#fffdf5] via-[#fffbf0] to-[#fffdf5] py-6 text-ksc-navy sm:py-7 border-b border-amber-200/50">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-ksc-yellow/15 [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]" />
        <div className="container-site relative z-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
           <div><p className="text-[11px] font-black uppercase tracking-[.18em] text-ksc-red">Need help choosing a course?</p><h3 className="mt-1 text-xl font-extrabold text-ksc-navy sm:text-2xl">Talk to our education team</h3></div>
           <div className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-3">
             <a href={`tel:${contact.phone}`} className="flex min-h-10 items-center gap-2 rounded-lg bg-ksc-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ksc-royal">
               <Phone className="h-4 w-4" /> {contact.phone}
             </a>
             <a href={`https://wa.me/${contact.whatsapp}`} className="flex min-h-10 items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#20b858]">
               <MessageCircle className="h-4 w-4" /> {contact.whatsapp}
             </a>
           </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="border-t border-slate-200/80 bg-gradient-to-b from-white via-[#fcfdff] to-[#f4f8fd] py-6 sm:py-9 bg-dot-pattern">
          <div className="container-site mb-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[.2em] text-ksc-red">Visit Us</p>
            <h4 className="mt-1 text-2xl font-black text-ksc-navy sm:text-3xl tracking-tight">Our Associated Branches</h4>
            <p className="mt-1 text-xs sm:text-sm font-bold text-slate-600">Meet our counsellors at the centre nearest to you.</p>
          </div>
          <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((branch) => {
              const mapUrl = (branch as any).mapUrl || (branch.location === "Karur" || branch.name.includes("Karur") ? "https://maps.app.goo.gl/MJFWjrveBV3DQhi4A" : branch.location === "Dindigul" || branch.name.includes("Dindigul") ? "https://maps.app.goo.gl/5MT1b3oKCiyhkxos6" : `https://maps.google.com/maps?q=${encodeURIComponent(branch.name + ", " + branch.address)}`);
              return (
                <div 
                  key={branch.name}
                  onClick={() => window.open(mapUrl, '_blank', 'noopener,noreferrer')}
                  className="group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ksc-red/50 hover:shadow-xl shadow-xs"
                >
                  <div>
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-100 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-xs border border-red-200/80">
                        📍
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          {branch.isHead && (
                            <span className="text-[10px] font-black uppercase tracking-[.18em] text-white bg-ksc-red px-2 py-0.5 rounded-md shadow-xs">
                              Head Office
                            </span>
                          )}
                          <span className="text-[10px] font-black uppercase tracking-wider text-ksc-red bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                            {(branch as any).location || (branch.name.includes("Dindigul") || branch.address.includes("Dindigul") ? "Dindigul" : (branch.name.includes("Kang") || branch.address.includes("Kang")) ? "Kangeyam" : "Karur")}
                          </span>
                        </div>
                        <h5 className="text-base sm:text-lg font-black leading-tight text-ksc-navy transition-colors group-hover:text-ksc-red">
                          {branch.name}
                        </h5>
                      </div>
                    </div>

                    {/* Highlighted Address Box with Right Corner Arrow only (Flex layout prevents text overlap) */}
                    <div className="rounded-xl bg-gradient-to-r from-red-50/70 via-white to-amber-50/40 p-3 sm:p-3.5 border border-red-200/90 transition-all duration-300 group-hover:bg-red-50 group-hover:border-red-300 shadow-2xs">
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <MapPin className="h-4.5 w-4.5 text-ksc-red shrink-0 mt-0.5 stroke-[2.5]" />
                          <p className="text-xs sm:text-sm font-extrabold leading-snug text-slate-900 tracking-tight">
                            {branch.address}
                          </p>
                        </div>

                        {/* Arrow mark in right side corner only of address */}
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/90 group-hover:bg-ksc-red text-slate-400 group-hover:text-white border border-red-200/70 shadow-2xs transition-all duration-200 group-hover:scale-105 mt-0.5">
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Numbers Highlighted Separately */}
                  <div className="mt-3 border-t border-slate-100 pt-2.5 flex flex-wrap items-center gap-1.5">
                    {branch.phone.split(',').map((phone, idx) => {
                      const cleanPhone = phone.trim();
                      return (
                        <a 
                          key={idx}
                          href={`tel:${cleanPhone.replace(/\s+/g, '')}`} 
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-md bg-red-50/80 hover:bg-ksc-red text-ksc-navy hover:text-white border border-red-200/90 hover:border-ksc-red px-2.5 py-1 text-[11px] sm:text-xs font-black tracking-wide shadow-2xs transition-all duration-200 group/phone"
                        >
                          <Phone className="h-3 w-3 text-ksc-red group-hover/phone:text-white stroke-[2.5]" />
                          <span>{cleanPhone}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* University logo strip */}
      <div className="bg-ksc-navy border-b border-white/10">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-6 mx-auto px-4 sm:px-6">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="flex items-center gap-4 transition-all duration-300 hover:scale-105 group"
            >
              {uni.logo ? (
                <div
                  className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white transition-all duration-300 group-hover:border-ksc-red shadow-sm"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-1.5"
                  />
                </div>
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white font-heading text-sm font-bold text-ksc-navy shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-blue-50">
                  {uni.shortName.slice(0, 3).toUpperCase()}
                </span>
              )}
              <span className="text-sm font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors">{uni.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-site grid grid-cols-1 gap-12 md:gap-10 py-12 md:py-16 md:grid-cols-12 bg-ksc-navy">
        {/* Brand & Contact Col */}
        <div className="md:col-span-5 space-y-6 pr-0 md:pr-10">
          <div className="flex items-center gap-4 animate-slide-in-right">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm">
              <Logo className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0 transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-2xl font-bold tracking-tight text-white">{SITE_CONFIG.name}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ksc-yellow mt-1">
                {SITE_CONFIG.shortName}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 max-w-md animate-slide-in-right delay-100">
            {SITE_CONFIG.description}
          </p>

        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> {link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Programmes</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              {programmeLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> {link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Support</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              {supportLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> {link.label}</Link></li>
              ))}
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 transition-all bg-ksc-red hover:bg-red-700 rounded-lg px-4 py-2.5 mt-2 text-white shadow-sm hover:-translate-y-0.5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#040e29] px-6 pt-6 pb-24 sm:pb-6 sm:px-12 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} Karur Study Centre. Developed by <a href="https://www.digitaltactsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 transition-colors">Digitaltactsolutions</a>.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { href: socials.facebook, icon: FacebookIcon, label: "Facebook" },
              { href: socials.instagram, icon: InstagramIcon, label: "Instagram" },
              { href: socials.youtube, icon: YoutubeIcon, label: "YouTube" },
              { href: socials.twitterX, icon: TwitterXIcon, label: "X (Twitter)" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-ksc-yellow hover:text-ksc-navy hover:-translate-y-1 hover:shadow-sm"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
