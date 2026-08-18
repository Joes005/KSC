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
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
        ksc: {
          /* KSC brand palette — SET College-inspired but green-branded
             green  #0E6B4E  primary (logo green)
             gold   #EFA725  bright amber accent (SET-style CTAs)
             saffron#F97316  warm orange highlight
             navy   #0A1A33  deep navy headings/footer surfaces */
          green: 'var(--ksc-green)',
          'green-mid': 'var(--ksc-green-mid)',
          dark: 'var(--ksc-dark)',
          deep: 'var(--ksc-deep)',
          mist: 'var(--ksc-mist)',
          gold: 'var(--ksc-gold)',
          saffron: 'var(--ksc-saffron)',
          navy: 'var(--ksc-navy)',
          ink: 'var(--ksc-ink)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(10, 26, 51, 0.08)',
        lift: '0 16px 40px rgba(10, 26, 51, 0.14)',
      },
      keyframes: {
        marqueeVertical: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        marqueeVertical: 'marqueeVertical 25s linear infinite',
      },
    },
  },
  plugins: [],
}
