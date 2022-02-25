const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
