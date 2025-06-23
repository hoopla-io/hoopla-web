import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#F5E6D3",
        success: "#4a934a",
        main: "#1a1a1a",
        primary: "#892235",
        muted: "#262626",
      },
      fontFamily: {
        eugusto: ["Eugusto", "serif"],
        sofia: ["Sofia", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
