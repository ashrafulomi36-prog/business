import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#05080f", 900: "#080d18", 800: "#0c1424", 700: "#121c31" },
        line: "rgba(148,170,210,0.14)",
        bone: "#eef2f8",
        mist: "#9aa8c2",
        accent: { DEFAULT: "#38bdf8", strong: "#0ea5e9", soft: "#7dd3fc" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: { shell: "76rem" },
    },
  },
  plugins: [],
};
export default config;
