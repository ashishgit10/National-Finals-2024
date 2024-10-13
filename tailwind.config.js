const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
  ],
  theme: {
    animation: {
      'spin-slow': 'spin 20s linear infinite',
      'spin-slow-1': 'spin 155s linear infinite',
'spin':'spin 1s linear infinite'
    }
  },
 
}

