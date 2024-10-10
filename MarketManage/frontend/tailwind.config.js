/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
        "fade-in": "fade-in 0.5s forwards",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      colors: {
        lightGreen: "#88AB8E",
        mutedGreen: "#AFC8AD",
        offWhite: "#EEE7DA",
        softGray: "#F2F1EB",
      },
    },
  },
  plugins: [],
};
