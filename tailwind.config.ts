import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // min-width means from {} px, apply this rule
  // max-width means upto {} px, apply this rule
  // sm: min-width: 640px
  // md: min-width: 768px
  // lg: min-width: 1024px
  // xl: min-width: 1280px
  // 2xl:min-width: 1536px
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xsm: { min: "320px" },
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      xl2: { min: "1536px" },
      //max in our lang
      upto321: { max: "321px" },
      upto375: { max: "375px" },
      upto425: { max: "425px" },
      upto640: { max: "640px" },
      upto768: { max: "768px" },
      upto1024px: { max: "1024px" },
      upto1280px: { max: "1280px" },
      upto1440px: { max: "1440px" },
      upto1536px: { max: "1536px" },
      // min in our language
      from321: { min: "321px" },
      from375: { min: "375px" },
      from425: { min: "425px" },
      from640: { min: "640px" },
      from768: { min: "768px" },
      from1024px: { min: "1024px" },
      from1280px: { min: "1280px" },
      from1440px: { min: "1440px" },
      from1536px: { min: "1536px" },
    },
  },
  plugins: [nextui(), addVariablesForColors],
};
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config;
