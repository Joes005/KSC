/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ksc: {
          /* Traditional Education Theme */
          sky: '#f8fafc',
          navy: '#071B4A', /* Dark Blue */
          royal: '#1e3a8a',
          red: '#C91419',
          yellow: '#F5C400',
          cream: '#fff8e7',
          chalk: '#0d4a2c',
          
          /* Keep mapping aliases if needed */
          blue: '#071B4A',
          teal: '#1e3a8a',
          orange: '#C91419',
          
          'navy-mid': '#0D2E68',
          'navy-dark': '#041338',
          gold: '#F5C400',
          'gold-light': '#FFE477',
          ink: '#24324A',
          muted: '#64748b',
          
          green: '#063B8F',
          'green-mid': '#147CC1',
          dark: 'var(--poster-navy)',
          deep: 'var(--poster-navy)',
          mist: 'var(--poster-cream)',
          saffron: 'var(--poster-yellow)',
        }
      },
      fontFamily: {
        sans: ['"Manrope"', '"Noto Sans Tamil"', 'system-ui', 'sans-serif'],
        heading: ['"Merriweather"', '"Noto Sans Tamil"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.12)',
        lift: '0 16px 40px rgba(0, 0, 0, 0.24)',
        glow: '0 0 20px rgba(224, 180, 55, 0.15)',
      },
      keyframes: {
        marqueeVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        marqueeHorizontal: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        progress: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        slideUpWord: {
          '0%': { transform: 'translateY(120%) rotate(4deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
        },
        clipReveal: {
          '0%': { clipPath: 'inset(15% 15% 15% 15% round 2rem)' },
          '100%': { clipPath: 'inset(0% 0% 0% 0% round 1.4rem)' },
        },
        imageScaleDown: {
          '0%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        marqueeVertical: 'marqueeVertical 25s linear infinite',
        marqueeHorizontal: 'marqueeHorizontal 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        progress: 'progress 4s linear forwards',
        slideUpWord: 'slideUpWord 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        clipReveal: 'clipReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        imageScaleDown: 'imageScaleDown 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
