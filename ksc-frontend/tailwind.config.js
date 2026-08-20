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
          
          'navy-mid': '#1e293b',
          'navy-dark': '#0f172a',
          gold: '#0f172a',
          'gold-light': '#334155',
          ink: '#1e293b',
          muted: '#64748b',
          
          green: 'var(--poster-royal)',
          'green-mid': 'var(--poster-sky)',
          dark: 'var(--poster-navy)',
          deep: 'var(--poster-navy)',
          mist: 'var(--poster-cream)',
          saffron: 'var(--poster-yellow)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        marqueeVertical: 'marqueeVertical 25s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
