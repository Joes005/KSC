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
          /* New Premium Dark Education Theme */
          navy: 'var(--ksc-navy)',
          'navy-mid': 'var(--ksc-navy-mid)',
          'navy-dark': 'var(--ksc-navy-dark)',
          gold: 'var(--ksc-gold)',
          'gold-light': 'var(--ksc-gold-light)',
          ink: 'var(--ksc-ink)',
          muted: 'var(--ksc-muted)',
          
          /* Keeping old var names around just in case to not break build immediately, mapping to new colors */
          green: 'var(--ksc-navy)',
          'green-mid': 'var(--ksc-navy-mid)',
          dark: 'var(--ksc-navy-dark)',
          deep: 'var(--ksc-navy-dark)',
          mist: 'var(--ksc-navy-mid)',
          saffron: 'var(--ksc-gold)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
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
