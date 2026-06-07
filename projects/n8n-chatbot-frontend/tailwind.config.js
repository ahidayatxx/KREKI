/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        n8n: {
          50: '#fff5f3',
          100: '#ffe8e2',
          200: '#ffd0c4',
          300: '#ffaa96',
          400: '#ff7f68',
          500: '#ff6d5a',
          600: '#f54d38',
          700: '#d43a27',
          800: '#b33124',
          900: '#932b22',
        },
      },
    },
  },
  plugins: [],
}
