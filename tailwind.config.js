/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shafaq: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#ffd2a8', // palette swatch 5 (soft peach cream)
          300: '#fdba74',
          400: '#fb923c',
          500: '#f07f3c', // palette swatch 4 (sunset orange)
          600: '#ea580c',
          700: '#c2410c',
          800: '#7a3518', // palette swatch 3 (warm terracotta)
          900: '#3b1b10', // palette swatch 2 (dark chocolate)
          950: '#1c0f09', // palette swatch 1 (deepest espresso night)
        },
      },
    },
  },
  plugins: [],
};
