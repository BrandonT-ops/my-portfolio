import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalism Color Palette
        onyx: "#121619",
        ruby: "#9e0031",
        seagreen: "#09814a",
        skyblue: "#05b2dc",
        fawn: "#e5c687",
        // Keep legacy variables for compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #121619',
        'brutal': '4px 4px 0px 0px #121619',
        'brutal-lg': '8px 8px 0px 0px #121619',
        'brutal-xl': '12px 12px 0px 0px #121619',
        'brutal-ruby': '4px 4px 0px 0px #9e0031',
        'brutal-seagreen': '4px 4px 0px 0px #09814a',
        'brutal-skyblue': '4px 4px 0px 0px #05b2dc',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
