/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F3F1A",
        beige: "#F7F1E8",
        softBlue: "#E3F0FF"
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.04)"
      },
      borderRadius: {
        xl2: "1.5rem"
      }
    }
  },
  plugins: []
};
