import aspectRatio from "@tailwindcss/aspect-ratio";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class", ".dark-mode-class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,css,,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,css,md,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [tailwindcssAnimate, aspectRatio],
} satisfies Config;
export default config;
