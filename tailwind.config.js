const tailwindcss = require('tailwindcss');

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C51BF', // Customize to match your brand
        secondary: '#2D3748', // Customize to match your brand
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      rotate: {
        '2': '2deg',
      },
    },
  },
  plugins: [
    tailwindcss,
  ],
};