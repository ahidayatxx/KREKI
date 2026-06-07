/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gemini: {
          50: '#f0f7ff',
          100: '#e0eeff',
          200: '#bae0ff',
          300: '#7cc4ff',
          400: '#36a3ff',
          500: '#1a73e8',
          600: '#0d5ec7',
          700: '#0b4da3',
          800: '#0d4385',
          900: '#113c6e',
        },
      },
    },
  },
  plugins: [],
}
