/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        '300px': '300px',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.md:max-h-[400px]': {
          '@media (min-width: 768px)': {
            'max-height': '400px',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    plugin(function({ addComponents }) {
      addComponents({
        '.w-1-12': {
          width: '8.333333%',
        },
        '.w-2-12': {
          width: '16.666667%',
        },
        '.w-3-12': {
          width: '25%',
        },
        '.w-4-12': {
          width: '33.333333%',
        },
        '.w-5-12': {
          width: '41.666667%',
        },
        '.w-6-12': {
          width: '50%',
        },
        '.w-7-12': {
          width: '58.333333%',
        },
        '.w-8-12': {
          width: '66.666667%',
        },
        '.w-9-12': {
          width: '75%',
        },
        '.w-10-12': {
          width: '83.333333%',
        },
        '.w-11-12': {
          width: '91.666667%',
        },
      })
    }),
    require("daisyui"),
  ],
}

