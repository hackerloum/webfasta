import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        paper: "#f4f0e8",
        ink: "#1a1814",
        moss: "#146c43",
        "moss-dark": "#0e4d30",
        line: "#e4ddd2",
        mute: "#6b645b",
        border: "#e4ddd2",
        input: "#e4ddd2",
        ring: "#146c43",
        background: "#f4f0e8",
        foreground: "#1a1814",
        primary: {
          DEFAULT: "#146c43",
          foreground: "#fbf9f5",
        },
        secondary: {
          DEFAULT: "#ebe4d8",
          foreground: "#1a1814",
        },
        destructive: {
          DEFAULT: "#9b3a2f",
          foreground: "#fbf9f5",
        },
        muted: {
          DEFAULT: "#ebe6dc",
          foreground: "#6b645b",
        },
        accent: {
          DEFAULT: "#e6dccb",
          foreground: "#1a1814",
        },
        popover: {
          DEFAULT: "#fbf9f5",
          foreground: "#1a1814",
        },
        card: {
          DEFAULT: "#fbf9f5",
          foreground: "#1a1814",
        },
        code: {
          bg: "#ebe6dc",
          border: "#e4ddd2",
        },
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-bottom": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.35s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
