import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        rem: ["REM", "sans-serif"],
      },
      backgroundColor: {
        lightM: "#f1f4f9",
        darkM: "#02040d",
      },
      textColor: {
        lightM: "#f1f4f9",
      },
    },
  },
}
export default config
