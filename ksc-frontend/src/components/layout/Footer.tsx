import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
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

  return (
    <footer className="bg-ksc-navy text-white animate-fade-in-up delay-200">
      {/* Poster Red Contact Banner */}
      <div className="bg-ksc-red border-y-4 border-ksc-yellow relative overflow-hidden py-10 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container-site relative z-10 text-center flex flex-col md:flex-row items-center justify-between gap-6">
           <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-widest text-shadow-heavy">
             Always Contact Our Educational Services:
           </h3>
           <div className="flex flex-col sm:flex-row gap-4 items-center bg-black/20 p-4 rounded-xl border border-white/10 shadow-inner">
             <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-white hover:text-ksc-yellow transition-colors drop-shadow-md">
               <Phone className="w-6 h-6 sm:w-8 sm:h-8" /> {contact.phone}
             </a>
             <span className="hidden sm:inline text-white/50">|</span>
             <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-white hover:text-[#25D366] transition-colors drop-shadow-md">
               <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" /> {contact.whatsapp}
             </a>
           </div>
        </div>
      </div>

      {/* University logo strip */}
      <div className="bg-ksc-navy border-b border-white/10">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-6">
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
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link to="/" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> Home</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> About Us</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> Gallery</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Programmes</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link to="/academic#tnou" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> TNOU Courses</Link></li>
              <li><Link to="/academic#bdu" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> BDU Courses</Link></li>
              <li><Link to="/academic#alagappa" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> ALU Courses</Link></li>
              <li><Link to="/admissions" className="transition-colors hover:text-white text-white font-bold flex items-center gap-2"><span className="text-ksc-yellow">▶</span> Admissions {new Date().getFullYear()}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-yellow">Support</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link to="/exam-update" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> Exam Updates</Link></li>
              <li><Link to="/facilities" className="transition-colors hover:text-white flex items-center gap-2"><span className="text-ksc-red">▶</span> Facilities</Link></li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 transition-all bg-ksc-red hover:bg-red-700 rounded-lg px-4 py-2.5 mt-2 text-white shadow-sm hover:-translate-y-0.5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="border-t border-white/10 py-12">
          <h4 className="mb-8 text-center text-lg font-bold uppercase tracking-wider text-white">Our Associated Branches</h4>
          <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((branch) => (
              <div key={branch.name} className="group rounded-2xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-ksc-yellow transition-colors duration-300 group-hover:bg-ksc-yellow group-hover:text-ksc-navy">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    {branch.isHead && <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-ksc-yellow">Head Office</span>}
                    <h5 className="text-lg font-bold text-white leading-tight">{branch.name}</h5>
                  </div>
                </div>
                <div className="ml-16 space-y-2 text-sm text-slate-300">
                  <p className="leading-relaxed">{branch.address}</p>
                  <p className="flex items-center gap-2 font-medium text-white">
                    <Phone className="h-4 w-4 text-ksc-yellow" /> {branch.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#040e29] px-6 py-6 sm:px-12 border-t border-white/10">
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