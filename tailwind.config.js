const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false,
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      display: ['group-hover'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mukta', ...fontFamily.sans],
      },
    },
  },
};
