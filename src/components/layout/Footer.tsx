import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { SITE_CONFIG, UNIVERSITY_LOGOS } from "../../data/site-content";
import { UNIVERSITIES } from "../../data/universities";
import { Logo } from "../brand/Logo";

/* Brand glyphs inline (lucide-react no longer ships brand icons) */
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
    <footer className="bg-ksc-deep text-white">
      {/* University logo strip */}
      <div className="border-b border-white/10 bg-ksc-dark">
        <div className="container-site flex flex-col items-center gap-3 py-5 md:flex-row md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Affiliated Universities &amp; Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {UNIVERSITY_LOGOS.map((u) => (
              <span
                key={u.short}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/90"
              >
                {/* TODO: replace the monogram placeholder with u.image when logos are provided */}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ksc-gold text-xs text-ksc-deep">
                  {u.short.slice(0, 1)}
                </span>
                {u.name}
              </span>
            ))}
            {UNIVERSITIES.filter((u) => !UNIVERSITY_LOGOS.some((l) => u.shortName === l.short)).map((u) => (
              <span
                key={u.id}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/90"
              >
                {u.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-site grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Logo className="h-14 w-14 rounded-full" />
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight">{SITE_CONFIG.name}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ksc-gold">
                {SITE_CONFIG.shortName}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{SITE_CONFIG.description}</p>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ksc-gold" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-ksc-gold" />
              <a href={`tel:${contact.phone}`} className="hover:text-ksc-gold">{contact.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 shrink-0 text-ksc-gold" />
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-ksc-gold">
                WhatsApp: {contact.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-ksc-gold" />
              <a href={`mailto:${contact.email}`} className="hover:text-ksc-gold">{contact.email}</a>
            </li>
          </ul>
          {/* Social — TODO: swap placeholder URLs */}
          <div className="flex gap-3 pt-1">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-ksc-gold hover:text-ksc-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-5 border-b border-ksc-gold/40 pb-2 text-base font-bold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/" className="hover:text-ksc-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-ksc-gold">About Us</Link></li>
            <li><Link to="/founder" className="hover:text-ksc-gold">Founder Message</Link></li>
            <li><Link to="/chairman" className="hover:text-ksc-gold">Chairman Message</Link></li>
            <li><Link to="/gallery" className="hover:text-ksc-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-ksc-gold">Contact Us</Link></li>
          </ul>
        </div>

        {/* Programmes */}
        <div>
          <h4 className="mb-5 border-b border-ksc-gold/40 pb-2 text-base font-bold">Programmes</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/academic#tnou" className="hover:text-ksc-gold">TNOU — UG / PG / Diploma</Link></li>
            <li><Link to="/academic#bdu" className="hover:text-ksc-gold">Bharathidasan University Courses</Link></li>
            <li><Link to="/academic#tnou" className="hover:text-ksc-gold">TNOU Certificate Programmes</Link></li>
            <li><Link to="/academic#tnou" className="hover:text-ksc-gold">Vocational &amp; Short-Term</Link></li>
            <li><Link to="/admissions" className="hover:text-ksc-gold">Admissions 2026</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-5 border-b border-ksc-gold/40 pb-2 text-base font-bold">Student Support</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/exam-update" className="hover:text-ksc-gold">Exam Updates &amp; Hall Tickets</Link></li>
            <li><Link to="/curriculum" className="hover:text-ksc-gold">Curriculum &amp; Syllabus</Link></li>
            <li><Link to="/facilities" className="hover:text-ksc-gold">Facilities at KSC</Link></li>
            <li><Link to="/admissions" className="hover:text-ksc-gold">Apply Now</Link></li>
            <li className="text-xs text-white/50">{contact.workingHours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p>
            {SITE_CONFIG.admissionOpen} · {SITE_CONFIG.name} ({SITE_CONFIG.shortName})
          </p>
        </div>
      </div>
    </footer>
  );
}