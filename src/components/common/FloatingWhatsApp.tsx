import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';

export function FloatingWhatsApp() {
  const message = encodeURIComponent("Hello KARUR STUDY CENTER, I would like to know more about the available courses and admission process.");
  const url = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
