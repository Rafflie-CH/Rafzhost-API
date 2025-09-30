/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // penting supaya class 'dark' bekerja
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
