import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Jon's Darkroom palette
        walnut: "#5C4033",
        espresso: "#2C1E16",
        cream: "#F4E9D8",
        brass: "#B08D57",
        charcoal: "#1A1A1A",
        film: "#101010",
        burgundy: "#7B3F3F",
        // derived shades for depth
        "walnut-light": "#6F4E3D",
        "espresso-light": "#3A2A20",
        "cream-dark": "#E6D6BD",
        "brass-light": "#C9A877",
        "brass-dark": "#8E6E40",
      },
      fontFamily: {
        // Headings (serif) + body (sans). Wired up via next/font in layout.tsx.
        serif: ["var(--font-cormorant)", "Libre Baskerville", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        plaque:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 24px -8px rgba(0,0,0,0.55)",
        polaroid: "0 14px 30px -12px rgba(0,0,0,0.6)",
        counter: "0 24px 60px -20px rgba(0,0,0,0.7)",
        brass: "0 0 0 1px rgba(176,141,87,0.35), 0 8px 20px -8px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "wood-grain":
          "repeating-linear-gradient(95deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 7px), linear-gradient(145deg, #5C4033 0%, #3A2A20 55%, #2C1E16 100%)",
        "paper-grain":
          "radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)",
      },
      backgroundSize: {
        paper: "4px 4px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "94%": { opacity: "0.82" },
          "96%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        flicker: "flicker 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
