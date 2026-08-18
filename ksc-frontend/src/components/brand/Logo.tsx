import { SITE_CONFIG } from "../../data/site-content";

/**
 * Circular KSC emblem — built as an inline SVG placeholder so the site works
 * before the real logo file is uploaded.
 *
 * SWAP IN THE REAL LOGO:
 *   1. save your file (PNG/SVG) and reference it in SITE_CONFIG.branding.logoSource
 *   2. set SITE_CONFIG.branding.useImage = true
 *
 * The SVG quartered design follows the brief: torch (victory figure),
 * open book on a lotus, graduation cap with scroll, oil lamp on a lotus,
 * "K S C" in the centre cross, motto band (empty until supplied),
 * and a "KARUR STUDY CENTER" ribbon at the bottom.
 */
interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-14 w-14" }: LogoProps) {
  const { branding } = SITE_CONFIG;

  if (branding.useImage) {
    return (
      <div
        className={`flex-shrink-0 flex items-center justify-center overflow-hidden ${className}`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <img
          src={branding.logoSource}
          alt={`${SITE_CONFIG.name} logo`}
          className="h-full w-full object-cover scale-[1.10]"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 220 230"
      className={className}
      role="img"
      aria-label={`${SITE_CONFIG.name} emblem`}
    >
      {/* Outer ring */}
      <circle cx="110" cy="102" r="96" fill="#ffffff" stroke="#0E6B4E" strokeWidth="7" />
      <circle cx="110" cy="102" r="88" fill="#E9F5F1" stroke="#0E6B4E" strokeWidth="1.5" />

      {/* Quartering cross */}
      <rect x="102" y="14" width="16" height="176" fill="#0E6B4E" />
      <rect x="22" y="94" width="176" height="16" fill="#0E6B4E" />

      {/* Upper-arc motto band — SITE_CONFIG.branding.motto renders here */}
      <path
        id="mottoArc"
        d="M 52 26 A 80 80 0 0 1 168 26"
        fill="none"
        stroke="#C99A2E"
        strokeWidth="3"
      />
      {branding.motto && (
        <text fontSize="9" fill="#0E6B4E" fontWeight="600" letterSpacing="1">
          <textPath href="#mottoArc" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
            {branding.motto}
          </textPath>
        </text>
      )}

      {/* ---- TL QUADRANT · Graduation cap with scroll ---- */}
      <g fill="#0E6B4E">
        <polygon points="28,54 55,42 82,54 55,66" />
        <rect x="47" y="60" width="16" height="11" rx="2" />
      </g>
      <circle cx="55" cy="48" r="2.5" fill="#C99A2E" />
      <path d="M55 42 L76 53" stroke="#C99A2E" strokeWidth="2" fill="none" />
      <circle cx="79" cy="54" r="2" fill="#C99A2E" />
      {/* small scroll under cap */}
      <rect x="47" y="73" width="16" height="8" rx="1.5" fill="#C99A2E" />

      {/* ---- TR QUADRANT · Open book on a lotus ---- */}
      <g fill="#E9F5F1">
        <path d="M165 74 C152 72 145 80 165 86 C185 80 178 72 165 74 Z" />
        <path d="M165 84 C156 83 150 89 165 94 C180 89 174 83 165 84 Z" />
      </g>
      <g stroke="#0E6B4E" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M165 44 C151 40 143 52 165 60" />
        <path d="M165 44 C179 40 187 52 165 60" />
      </g>
      <line x1="165" y1="46" x2="165" y2="59" stroke="#C99A2E" strokeWidth="2" />

      {/* ---- BL QUADRANT · Torch (victory figure) ---- */}
      <path d="M55 136 C47 148 47 157 55 162 C63 157 63 148 55 136 Z" fill="#C99A2E" />
      <path d="M45 164 H65 L61 176 H49 Z" fill="#0E6B4E" />
      <rect x="51" y="176" width="8" height="18" rx="2" fill="#0E6B4E" />

      {/* ---- BR QUADRANT · Oil lamp (diya) on a lotus ---- */}
      <g fill="#E9F5F1">
        <path d="M140 176 Q153 190 165 181 Q177 190 190 176 Z" />
        <path d="M148 181 Q156 190 165 184 Q174 190 182 181 Z" />
      </g>
      <path d="M151 174 H179 L176 184 L154 184 Z" fill="#0E6B4E" />
      <path d="M165 160 C158 169 158 173 165 175 C172 173 172 169 165 160 Z" fill="#C99A2E" />

      {/* ---- Centre cross medallion · K S C ---- */}
      <circle cx="110" cy="102" r="21" fill="#C99A2E" stroke="#ffffff" strokeWidth="2" />
      <text
        x="110"
        y="107"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="Inter, Arial, sans-serif"
        letterSpacing="0.5"
      >
        K S C
      </text>

      {/* ---- Ribbon banner ---- */}
      <rect x="6" y="198" width="208" height="26" rx="4" fill="#0E6B4E" />
      <path d="M0 199 H6 V224 H0 Z M220 199 H214 V224 H220 Z" fill="#0E6B4E" />
      <text
        x="110"
        y="216"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="Inter, Arial, sans-serif"
        letterSpacing="0.5"
      >
        KARUR STUDY CENTER
      </text>
    </svg>
  );
}