import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../../data/site-content";
import { UNIVERSITIES } from "../../data/universities";
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
  const { contact, socials } = SITE_CONFIG;

  return (
    <footer className="bg-ksc-dark text-white shadow-inner">
      {/* University logo strip */}
      <div className="border-b border-white/10 bg-ksc-deep">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="flex items-center gap-3 transition-colors hover:opacity-100 opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-heading text-xs font-bold text-ksc-gold ring-1 ring-ksc-gold/40">
                {uni.shortName.slice(0, 3).toUpperCase()}
              </span>
              <span className="text-sm font-semibold text-white/90">{uni.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 sm:px-12">
        {/* Brand & Contact Col */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <Logo className="h-16 w-16 rounded-full bg-white p-1" />
            <div className="leading-tight">
              <p className="text-xl font-bold tracking-wide">{SITE_CONFIG.name}</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-ksc-gold mt-1">
                {SITE_CONFIG.shortName}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/80 max-w-md">
            {SITE_CONFIG.description}
          </p>
          <ul className="space-y-4 text-sm font-medium text-white/90">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ksc-gold" />
              <span className="leading-relaxed">{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-ksc-gold" />
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-ksc-gold">{contact.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-ksc-gold" />
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-ksc-gold">{contact.email}</a>
            </li>
          </ul>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-gold border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium text-white/80">
              <li><Link to="/about" className="transition-colors hover:text-white hover:underline underline-offset-4">About Us</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-white hover:underline underline-offset-4">Gallery</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white hover:underline underline-offset-4">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-gold border-b border-white/10 pb-2 inline-block">Programmes</h4>
            <ul className="space-y-3 text-sm font-medium text-white/80">
              <li><Link to="/academic#tnou" className="transition-colors hover:text-white hover:underline underline-offset-4">TNOU Courses</Link></li>
              <li><Link to="/academic#bdu" className="transition-colors hover:text-white hover:underline underline-offset-4">BDU Courses</Link></li>
              <li><Link to="/admissions" className="transition-colors hover:text-white hover:underline underline-offset-4">Admissions {new Date().getFullYear()}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-ksc-gold border-b border-white/10 pb-2 inline-block">Support</h4>
            <ul className="space-y-3 text-sm font-medium text-white/80">
              <li><Link to="/exam-update" className="transition-colors hover:text-white hover:underline underline-offset-4">Exam Updates</Link></li>
              <li><Link to="/facilities" className="transition-colors hover:text-white hover:underline underline-offset-4">Facilities</Link></li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-white hover:underline underline-offset-4">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-ksc-deep px-6 py-5 sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} <a href="https://www.digitaltactsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ksc-gold transition-colors font-medium">Digitaltactsolutions</a>. All rights reserved.
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
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/5 text-white/70 transition-all hover:bg-ksc-gold hover:text-ksc-dark"
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