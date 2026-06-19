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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // AetheronDuty custom tokens
        void: "#05070D",
        surface: "#0D1117",
        elevated: "#161B22",
        "elevated-2": "#1E2530",
        "border-subtle": "#262C38",
        "border-strong": "#3A4150",
        "accent-amber": "#FF7A1A",
        "accent-teal": "#2DE2C5",
        "accent-crimson": "#E63950",
        "accent-gold": "#FFD166",
        "accent-violet": "#8B5CF6",
        "text-primary": "#F4F6FA",
        "text-secondary": "#B6BECC",
        "text-muted": "#8A93A3",
        "text-disabled": "#525A68",
        success: "#36D399",
        warning: "#FBBF24",
        error: "#E63950",
        info: "#2DE2C5",
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 24px rgba(255, 122, 26, 0.2)",
        "glow-teal": "0 0 24px rgba(45, 226, 197, 0.2)",
        "glow-crimson": "0 0 24px rgba(230, 57, 80, 0.2)",
        "glow-gold": "0 0 24px rgba(255, 209, 102, 0.2)",
        "glow-violet": "0 0 24px rgba(139, 92, 246, 0.2)",
        "inner-highlight": "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -20px)" },
          "66%": { transform: "translate(-20px, 15px)" },
        },
        "orb-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "grid-pulse": "grid-pulse 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "orb-drift": "orb-drift 25s ease-in-out infinite",
        "orb-breathe": "orb-breathe 8s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        ticker: "ticker 30s linear infinite",
        "fade-up": "fade-up 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
