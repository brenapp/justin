/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pinkurple-900": "#1A1A21",
        "pinkurple-400": "#8082A5",
        "lipstick-400": "#E797EC",
      },
    },
  },
  plugins: [],
};
