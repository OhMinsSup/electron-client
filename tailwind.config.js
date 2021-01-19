const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
      width: {
        '1024': '1024px',
        '768': '768px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
