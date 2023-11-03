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
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [],
};
export default config;
