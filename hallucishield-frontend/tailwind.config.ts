import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A12",
        panel: "#0D111C",
        "panel-raised": "#111827",
        line: "rgba(148, 163, 184, 0.16)",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
} satisfies Config;
