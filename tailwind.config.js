/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Warm, Eye-Soothing Brand Colors
        brand: {
          cream: '#F0EBE4',
          'cream-dark': '#E5DED4',
          sand: '#DDD5C9',
          rose: '#C06070',
          'rose-light': '#D08090',
          'rose-soft': '#E8C8D0',
          sage: '#7A9A7A',
          'sage-light': '#A8C0A8',
          taupe: '#A08060',
          'taupe-light': '#C0A880',
          coffee: '#5A5045',
          charcoal: '#3D352E',
          warm: '#C8A08C',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        soft: '0 2px 8px rgba(60, 50, 40, 0.04), 0 8px 24px rgba(60, 50, 40, 0.06), 0 24px 48px rgba(60, 50, 40, 0.04)',
        elevated: '0 4px 12px rgba(60, 50, 40, 0.05), 0 16px 40px rgba(60, 50, 40, 0.08), 0 40px 80px rgba(60, 50, 40, 0.05)',
        glow: '0 0 80px rgba(190, 100, 120, 0.25)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
