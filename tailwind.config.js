/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'pulse-purple': '#b259ff',
        'pulse-cyan': '#4deaff',
        'pulse-blue': '#4d6aff',
        'pulse-dark': '#121221',
        'pulse-darker': '#0a0a14',
        'pulse-gray': '#2a2a3a',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(178, 89, 255, 0.5)',
        'glow-cyan': '0 0 15px rgba(77, 234, 255, 0.5)',
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}
