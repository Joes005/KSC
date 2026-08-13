import React from 'react';
import { useSiteData } from '../../services/SiteDataContext';

export default function WhatsAppButton() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  // KSC WhatsApp number (international format, no + or leading zeros)
  const WHATSAPP_NUMBER = SITE_CONFIG.contact.whatsapp || '919965107404';

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      {/* Official WhatsApp SVG logo with white fill */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="#fff"
      >
        <path d="M16.001 0C7.164 0 .001 7.163.001 16c0 2.824.745 5.502 2.045 7.835L0 32l8.332-2.088a15.96 15.96 0 007.67 1.938c8.837 0 16-7.163 16-16 .001-8.837-7.162-16-15.999-16zm8.896 22.698c-.479.135-2.813.139-3.292.001-.331-.096-4.115-2.058-5.025-2.821-.908-.764-.815-1.124-.815-1.124s-.479-.135-1.083-.203c-.603-.066-1.236-.03-1.669.423-.432.453-.977 1.279-1.169 1.555-.191.276-.383.302-.862.102-.478-.199-2.018-.618-3.839-2.001-1.417-1.082-2.374-2.418-2.654-2.896-.279-.479-.03-.734.156-1.027.159-.265.357-.688.535-1.032.179-.344.239-.479.362-.795.122-.317.061-.574-.03-.796-.09-.222-.815-1.979-1.118-2.71-.295-.704-.596-.607-.815-.607-.218 0-.479-.021-.731-.021-.251 0-.68.099-.998.466-.317.366-1.208 1.179-1.208 2.877 0 1.696 1.252 3.342 1.429 3.574.179.231 2.472 4.041 6.061 5.666 3.587 1.624 3.587 1.083 4.235 1.012.645-.072 2.101-.86 2.395-1.689.294-.827.294-1.535.207-1.689-.086-.154-.314-.248-.679-.433z" />
      </svg>
    </a>
  );
}
