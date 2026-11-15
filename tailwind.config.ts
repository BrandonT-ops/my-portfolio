import type { Config } from "tailwindcss";

/**
 * Drafting-sheet palette. Colours are CSS variables (see globals.css) so the
 * whole sheet can be re-inked in one place.
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
        display: ['"Big Shoulders Display Variable"', "Impact", "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { sheet: "96rem" },
    },
  },
  plugins: [],
} satisfies Config;
