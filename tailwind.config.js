/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    animation: {
      'spin-slow': 'spin 20s linear infinite',
      'spin-slow-1': 'spin 155s linear infinite',

    }
  },
  plugins: [
    require('preline/plugin'),
  ],
}

