/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['"Outfit"']
      },
      boxShadow: {
        button: '2px 2px 4px 2px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  important: true,
  plugins: []
}
