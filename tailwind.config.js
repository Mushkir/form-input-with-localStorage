/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./all_details.html",
    "./assets/js/main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Sen': 'Sen'
      }
    },
  },
  plugins: [],
}