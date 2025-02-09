/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This sets your default mono font to Fira Code
        sans: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
