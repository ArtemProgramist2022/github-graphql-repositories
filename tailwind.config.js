/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary_50: '#FFA133',
        primary_100: '#FF900E',
        white: '#fff',
        gray_50: '#F7F7F7',
        gray_100: '#F2F2F2',
        gray_200: '#E6E6E6',
        gray_300: '#CCCCCC',
        gray_400: '#B3B3B3',
        gray_600: '#808080',
        gray_700: '#666666',
        gray_900: '#363636',
      },
      maxWidth: {
        max_app_width: '1280px',
      },
    },
  },
  plugins: [],
}
