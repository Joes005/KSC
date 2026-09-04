import { MessageCircle, Phone, GraduationCap } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { cn } from "../../utils/cn";

export function StickyActionBar() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();

  const DESKTOP_ACTIONS = [
    {
      href: `https://wa.me/${SITE_CONFIG.contact.whatsapp}`,
      label: "WhatsApp",
      className: "bg-[#25D366] hover:bg-[#20b858] text-white",
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      href: `tel:${SITE_CONFIG.contact.phone}`,
      label: "Call Us",
      className: "bg-ksc-navy hover:bg-[#0d276b] text-white",
      icon: <Phone className="h-6 w-6" />,
    },
    {
      href: "/admissions",
      label: "Admissions",
      className: "bg-ksc-yellow hover:bg-yellow-400 text-ksc-navy",
      icon: <GraduationCap className="h-6 w-6" />,
    },
  ];

  return (
    <>
      {/* Desktop Side Dock */}
      <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
        {DESKTOP_ACTIONS.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.href.startsWith("/") ? "_self" : "_blank"}
            rel={action.href.startsWith("/") ? undefined : "noopener noreferrer"}
            title={action.label}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-l-xl border-y-2 border-l-2 border-white/80 shadow-xl transition-all hover:w-16 hover:-translate-x-1",
              action.className
            )}
          >
            {action.icon}
          </a>
        ))}
      </div>

      {/* Mobile Ergonomic Bottom Action Bar (Thumb-reach optimized) */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200/80 bg-white/95 backdrop-blur-lg px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:hidden">
        <div className="flex items-center justify-around gap-1.5">
          {/* Call button */}
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="flex flex-1 flex-col items-center justify-center rounded-xl bg-slate-100/90 py-1.5 text-ksc-navy transition-all active:scale-95 active:bg-slate-200"
            aria-label="Call Karur Study Centre"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ksc-navy text-white shadow-xs">
              <Phone className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-slate-800">Call</span>
          </a>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Karur%20Study%20Centre,%20I%20need%20admission%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center justify-center rounded-xl bg-[#25D366]/15 py-1.5 text-emerald-800 transition-all active:scale-95 active:bg-[#25D366]/25"
            aria-label="WhatsApp Karur Study Centre"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-emerald-900">WhatsApp</span>
          </a>

          {/* Apply Now Primary CTA */}
          <a
            href="/admissions"
            className="flex flex-[1.4] flex-col items-center justify-center rounded-xl bg-gradient-to-r from-ksc-red to-[#b30e1a] py-1.5 text-white shadow-md transition-all active:scale-95 active:shadow-sm"
            aria-label="Apply for Admission"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white shadow-xs">
              <GraduationCap className="h-4 w-4 text-white" />
            </span>
            <span className="mt-1 text-[11px] font-black uppercase tracking-wide text-white">Apply Now</span>
          </a>

          {/* Branches / Contact */}
          <a
            href="/contact"
            className="flex flex-1 flex-col items-center justify-center rounded-xl bg-slate-100/90 py-1.5 text-ksc-navy transition-all active:scale-95 active:bg-slate-200"
            aria-label="View Branches and Contact"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-white shadow-xs">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-tight text-slate-800">Branches</span>
          </a>
        </div>
      </div>
    </>
  );
}
