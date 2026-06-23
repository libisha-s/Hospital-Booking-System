/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: {
  50: '#f7faf6',
  100: '#D4DDCB',
  200: '#C3D4BD',
  300: '#AAC8AC',
  400: '#91BFA8',
  500: '#719A90', // Main color
  600: '#62877e',
  700: '#53756d',
  800: '#45625d',
  900: '#374f4b',
},
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
