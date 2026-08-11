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
          /* KSC brand palette — adjust here to approve/refine
             green  #0E6B4E  primary (logo green)
             gold   #C99A2E  secondary accent
             saffron#E08E23  warm highlight (Tamil Nadu open-university accent)
             navy   #1E2A44  deep neutral for alternate surfaces */
          green: '#0E6B4E',
          'green-mid': '#0A5640',
          dark: '#063731',
          deep: '#062B27',
          mist: '#E9F5F1',
          gold: '#C99A2E',
          saffron: '#E08E23',
          navy: '#1E2A44',
          ink: '#22303A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}