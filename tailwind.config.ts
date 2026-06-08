import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#07080b",
        graphite: "#111318",
        platinum: "#e9edf2",
        mercury: "#aeb7c2",
        frost: "rgba(255,255,255,0.12)",
        signal: "#8ee8ff",
        champagne: "#d8c59b"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 32px 120px rgba(0, 0, 0, 0.42)",
        glow: "0 0 48px rgba(142, 232, 255, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
