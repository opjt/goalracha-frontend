/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: false,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
  
}

