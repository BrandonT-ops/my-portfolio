import type { Config } from "tailwindcss";

/**
 * Search-engine palette. Colours are CSS variables (see globals.css), so the
 * whole site can be re-themed in one place.
 *   sheet = page background · panel = soft surface · line = text ("ink")
 *   muted = secondary text · accent = links and buttons · signal = small highlights
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sheet: v("sheet"),
        panel: v("panel"),
        line: v("line"),
        muted: v("muted"),
        accent: v("accent"),
        signal: v("signal"),
      },
      fontFamily: {
        display: ['"Outfit Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { page: "76rem" },
      boxShadow: {
        soft: "0 1px 2px rgb(27 27 31 / 0.06), 0 8px 24px rgb(27 27 31 / 0.08)",
        lift: "0 2px 6px rgb(27 27 31 / 0.08), 0 18px 40px rgb(86 60 232 / 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
