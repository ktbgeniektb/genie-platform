/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        aladdin: ['Aladdin', 'sans-serif'],
        rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
}