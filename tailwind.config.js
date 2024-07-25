/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-white': '#fffff0',
        'primary-black': '#0B1215',
        'light-gray': '#E0E0E0',

        'custom-orange': {
          100: '#fde6bd',
          200: '#fbcc8a',
          300: '#f9b257',
          400: '#f79824',
          500: '#bc7721',
          600: '#81551d',
          700: '#463419',
        },
        'custom-blue': {
          100: '#c8ddf4',
          200: '#90bbf8',
          300: '#5999fc',
          400: '#2176ff',
          500: '#1c5dc5',
          600: '#16448a',
          700: '#112b50',
        },
        'custom-yellow': {
          100: '#fff2c4',
          200: '#fee598',
          300: '#fed86c',
          400: '#fdca40',
          500: '#c19c36',
          600: '#846e2b',
          700: '#484020',
        },
      },
    },
  },
  plugins: [],
}
