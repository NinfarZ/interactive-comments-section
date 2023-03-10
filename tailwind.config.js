/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "Moderate-blue": "hsl(238, 40%, 52%)",
      "Soft-Red": "hsl(358, 79%, 66%)",
      "Light-grayish-blue": "hsl(239, 57%, 85%)",
      "Pale-red": "hsl(357, 100%, 86%)",
      "Dark-blue": "hsl(212, 24%, 26%)",
      "Grayish-Blue": "hsl(211, 10%, 45%)",
      "Light-gray": "hsl(223, 19%, 93%)",
      "Very-light-gray": "hsl(228, 33%, 97%)",
      "White": "hsl(0, 0%, 100%)",
    },
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif'],
    },
    extend: {
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'rotate(-3deg)' }
        }
      },
      animation: {
        slide: 'slide 1s ease-in-out linear'
      }
    },
  },
  plugins: [],
}

