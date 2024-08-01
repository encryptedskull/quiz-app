/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        500: "500px",
        700: "700px",
        800: "800px",
      },
    },
  },
  plugins: [],
};
