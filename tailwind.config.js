/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // penting! biar bisa dikontrol class dari next-themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
