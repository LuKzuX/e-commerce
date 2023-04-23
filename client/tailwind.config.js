/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': '390px',
      'md': '780px',
      'lg': '1024px',
      'xl': '1280px'
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

