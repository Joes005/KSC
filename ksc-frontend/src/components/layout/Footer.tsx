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
    <footer className="bg-ksc-navy text-white shadow-inner border-t border-white/10 animate-fade-in-up delay-200">
      {/* University logo strip */}
      <div className="border-b border-white/5 bg-ksc-navy-dark">
        <div className="container-site grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-wrap items-center md:justify-center md:gap-x-10 md:gap-y-4 py-4 md:py-6">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="flex items-center gap-3 transition-colors hover:opacity-100 opacity-70 group"
            >
              {uni.logo ? (
                <div 
                  className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 transition-all group-hover:border-secondary"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-heading text-xs font-bold text-secondary border border-secondary/40 group-hover:bg-secondary/10">
                  {uni.shortName.slice(0, 3).toUpperCase()}
                </span>
              )}
              <span className="text-sm font-semibold text-white/90 group-hover:text-secondary transition-colors">{uni.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-site grid grid-cols-1 gap-12 md:gap-10 py-12 md:py-20 md:grid-cols-12">
        {/* Brand & Contact Col */}
        <div className="md:col-span-5 space-y-6 pr-0 md:pr-10">
          <div className="flex items-center gap-4">
            <Logo className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-full border border-secondary/40 shadow-glow transition-transform duration-500 hover:scale-105 hover:border-secondary" />
            <div className="leading-tight">
              <p className="font-heading text-2xl font-bold tracking-tight text-white">{SITE_CONFIG.name}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1.5">
                {SITE_CONFIG.shortName}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70 max-w-md">
            {SITE_CONFIG.description}
          </p>

        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li><Link to="/" className="transition-colors hover:text-secondary">Home</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-secondary">About Us</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-secondary">Gallery</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-secondary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Programmes</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li><Link to="/academic#tnou" className="transition-colors hover:text-secondary">TNOU Courses</Link></li>
              <li><Link to="/academic#bdu" className="transition-colors hover:text-secondary">BDU Courses</Link></li>
              <li><Link to="/academic#alagappa" className="transition-colors hover:text-secondary">ALU (Alagappa) Courses</Link></li>
              <li><Link to="/admissions" className="transition-colors hover:text-secondary text-secondary/90 font-bold">Admissions {new Date().getFullYear()}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li><Link to="/exam-update" className="transition-colors hover:text-secondary">Exam Updates</Link></li>
              <li><Link to="/facilities" className="transition-colors hover:text-secondary">Facilities</Link></li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-[#25D366]">
                  <MessageCircle className="h-4 w-4 text-[#25D366]/70" /> WhatsApp Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="border-t border-white/5 bg-ksc-navy-mid/30 py-12">
        <div className="container-site">
          <h4 className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/80">Our Associated Centres</h4>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((branch) => (
              <div key={branch.name} className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:bg-white/10 hover:shadow-glow">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-secondary transition-colors duration-300 group-hover:bg-secondary/10 group-hover:border-secondary/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    {branch.isHead && <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.25em] text-secondary">Head Office</span>}
                    <h5 className="text-sm font-bold text-white leading-tight">{branch.name}</h5>
                  </div>
                </div>
                <div className="ml-16 space-y-3 text-xs text-white/60">
                  <p className="leading-relaxed">{branch.address}</p>
                  <p className="flex items-center gap-2 font-medium text-white/80">
                    <Phone className="h-3.5 w-3.5 text-secondary/60" /> {branch.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-ksc-navy-dark px-6 py-6 sm:px-12 border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/50 font-medium tracking-wide">
            © {new Date().getFullYear()} Karur Study Centre. Developed by <a href="https://www.digitaltactsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">Digitaltactsolutions</a>.
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-secondary hover:text-ksc-navy-dark hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}