import type { Config } from "tailwindcss";

/**
 * Colours are CSS variables (see globals.css) so the palette can be swapped
 * in one place without touching components.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: v("paper"),
        ink: v("ink"),
        muted: v("muted"),
        accent: v("accent"),
        highlight: v("highlight"),
        positive: v("positive"),
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 0 rgb(var(--ink))",
        "hard-sm": "3px 3px 0 0 rgb(var(--ink))",
        "hard-accent": "6px 6px 0 0 rgb(var(--accent))",
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
