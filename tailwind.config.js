import { preset as Core } from "@sk-web-gui/core";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx,css}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: ".sk-qwerty-3",
  corePlugins: {
    preflight: true,
  },

  theme: {
    extend: {
      boxShadow: {
        chatelement: "0px 1px 0 0 rgba(0, 0, 0, 0.2)",
      },
      transitionProperty: {
        space: "margin, padding, width, height, top, left, right, bottom",
        size: "width, height",
        spacing: "margin, padding",
        position: "top, left, right, bottom",
      },
      keyframes: {
        bouncy: {
          "0%": { transform: "translateY(0)" },
          "1%": { transform: "translateY(-30%)" },
          "2%": { transform: "translateY(5%)" },
          "3%": { transform: "translateY(-15%)" },
          "4%": { transform: "translateY(2%)" },
          "5%": { transform: "translateY(-5%)" },
          "8%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" },
        },
        reveal: {
          "0%": {
            opacity: 0.5,
            filter: "blur(10px)",
          },
          "100%": {
            opacity: 1,
            filter: "blur(0)",
          },
        },
        popup: {
          "0%": {
            opacity: 0,
            transform: "translateY(50%)",
            filter: "blur(2px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        bouncy: "bouncy 20s ease-out 40s infinite",
        reveal: "reveal 150ms ease-in normal",
        dissappear: "reveal 100ms ease-out reverse forwards",
        popup: "popup 70ms ease-out normal",
        popdown: "popup 70ms ease-out reverse forwards",
      },
    },
  },

  presets: [
    Core({
      plugin: {
        cssBase: false,
      },
    }),
  ],
};
