import { MessageCircle, Phone, GraduationCap } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";
import { cn } from "../../utils/cn";

export function StickyActionBar() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();

  const ACTIONS = [
    {
      href: `https://wa.me/${SITE_CONFIG.contact.whatsapp}`,
      label: "WhatsApp",
      className: "bg-[#2dd36f] hover:bg-[#28ba62]", // Light green
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      href: `tel:${SITE_CONFIG.contact.phone}`,
      label: "Call Us",
      className: "bg-[#11694f] hover:bg-[#0e5741]", // Dark green
      icon: <Phone className="h-6 w-6" />,
    },
    {
      href: "/admissions",
      label: "Admissions",
      className: "bg-[#d49e35] hover:bg-[#b8892d]", // Golden yellow
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
            "flex h-12 w-12 items-center justify-center rounded-l-xl text-white shadow-xl transition-all hover:w-16 hover:-translate-x-1",
            action.className
          )}
        >
          {action.icon}
        </a>
      ))}
    </div>
  );
}
