/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E50914", // Netflix Red
        dark: "#141414", // Dark background
        light: "#FFFFFF", // White text
        gray: "#808080", // Gray text
        darkGray: "#181818", // Slightly lighter black
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
