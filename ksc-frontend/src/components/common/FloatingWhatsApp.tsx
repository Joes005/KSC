import { MessageCircle } from "lucide-react";
import { useSiteData } from "../../services/SiteDataContext";

export function FloatingWhatsApp() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  const message = encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I would like to know more about the programmes and admission process.`
  );
  const url = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}