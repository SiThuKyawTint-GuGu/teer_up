import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/page-containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cover: "linear-gradient(180deg, rgba(218,41,28,0) 0%, rgba(218,41,28,0.25) 100%);",
      },
      colors: {
        primary: "#DA291C",
        secondary: "#F9E9EA",
        slateGray: "#BBC7D6",
        layout: "#F8F9FB",
      },
      boxShadow: {
        theme: "0px 6px 35px 5px rgba(0, 0, 0, 0.2)",
        input: "0px 26px 30px 0px rgba(0, 0, 0, 0.05)",
        profile: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        "10px-tl-tr": "10px 10px 0 0",
        "16px-tl-tr": "16px 16px 0 0",
      },
      listStyleType: {
        square: "square",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", visibility: "hidden" },
          "100%": { opacity: "1", visibility: "visible" },
        },
        fadeOut: {
          "0%": { opacity: "1", visibility: "visible" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        fadeInWidth: {
          "0%:": { width: "30px" },
          "100%": { width: "200px" },
        },
        fadeOutWidth: {
          "0%:": { width: "200px" },
          "100%": { width: "30px" },
        },
      },
    },
  },
  plugins: [
   require("tailwindcss-animate")],
};
export default config;
