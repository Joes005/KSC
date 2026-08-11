import { MapPin, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../../data/site-content";
import { cn } from "../../utils/cn";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.5v3H10v8h3.5Z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  </svg>
);

const ACTIONS = [
  {
    href: SITE_CONFIG.socials.facebook,
    label: "Facebook",
    className: "bg-[#3b5998] hover:bg-[#314a7f]",
    icon: <FacebookIcon className="h-5 w-5 fill-current" />,
  },
  {
    href: SITE_CONFIG.socials.maps,
    label: "Location",
    className: "bg-[#7a7a7a] hover:bg-[#5f5f5f]",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    href: `https://wa.me/${SITE_CONFIG.contact.whatsapp}`,
    label: "WhatsApp",
    className: "bg-[#25D366] hover:bg-[#1fb959]",
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    href: SITE_CONFIG.socials.youtube,
    label: "YouTube",
    className: "bg-[#cd201f] hover:bg-[#a91a19]",
    icon: <YoutubeIcon className="h-6 w-6" />,
  },
];

export function StickyActionBar() {
  return (
    <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 sm:block">
      <div className="flex flex-col overflow-hidden rounded-l-xl shadow-xl">
        {ACTIONS.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            title={action.label}
            className={cn(
              "flex h-[52px] w-[52px] items-center justify-center text-white transition-colors",
              action.className
            )}
          >
            {action.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
