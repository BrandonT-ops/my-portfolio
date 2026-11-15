import type { Config } from "tailwindcss";

/**
 * Search-engine palette. Colours are CSS variables (see globals.css), so the
 * whole site can be re-themed in one place.
 *   sheet = page background · panel = soft surface · line = text ("ink")
 *   muted = secondary text · accent = links and buttons · signal = small highlights
 *   ox / leaf = error and success messages
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
        ox: v("ox"),
        leaf: v("leaf"),
      },
      fontFamily: {
        display: ['"Outfit Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { page: "76rem" },
      boxShadow: {
        soft: "0 1px 6px rgb(32 33 36 / 0.18)",
        lift: "0 2px 10px rgb(32 33 36 / 0.24)",
        press: "0 1px 1px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
