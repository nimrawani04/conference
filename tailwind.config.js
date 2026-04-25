/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'animate-popIn',
    'animate-slideUp',
    'animate-fadeRotate',
    'delay-200',
    'delay-300'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeRotate: {
          "0%": { opacity: "0", transform: "rotate(-3deg)" },
          "100%": { opacity: "1", transform: "rotate(0deg)" },
        },
        // Marquee animation for scrolling text
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        popIn: "popIn 0.7s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        fadeRotate: "fadeRotate 0.8s ease-out forwards",
        // Marquee animation configuration
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}