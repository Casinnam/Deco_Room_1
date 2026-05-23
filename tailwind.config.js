/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#f7f1e8',
        almond: '#eadfce',
        espresso: '#342a24',
        clay: '#b98966',
        cream: '#fffaf2',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(52, 42, 36, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
