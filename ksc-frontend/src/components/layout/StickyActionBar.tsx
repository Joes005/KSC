import { MessageCircle, Phone, GraduationCap } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { cn } from "../../utils/cn";

export function StickyActionBar() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();

  const ACTIONS = [
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
    <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
      {ACTIONS.map((action) => (
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
  );
}
