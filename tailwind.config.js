// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-purple": "var(--primary-purple)",
        "primary-purple-hover": "var(--primary-purple-hover)",
        "input-ring": "var(--input-ring)",
        primary: "#6366f1",
        "primary-dark": "#4f46e5",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...fontFamily.sans],
      },
    },
  },

};
