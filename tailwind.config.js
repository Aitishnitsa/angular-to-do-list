/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Itim", "cursive"],
      },
      colors: {
        black: "#111111",
        white: "#FFFFFF",
      },
      keyframes: {
        "slide-in-blurred-top": {
          "0%": {
            transform: "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
            "transform-origin": "50% 0%",
            filter: "blur(40px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: 1,
          },
        },
        "slide-in-elliptic-right-fwd": {
          "0%": {
            transform: "translateX(800px) rotateY(-30deg) scale(0)",
            "transform-origin": "-100% 50%",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0) rotateY(0) scale(1)",
            "transform-origin": "-1800px 50%",
            opacity: 1,
          },
        },
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-0.5em",
            opacity: 0,
          },
          "40%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-in-blurred-top":
          "slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
        "slide-in-elliptic-right-fwd":
          "slide-in-elliptic-right-fwd 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
      },
      animationDelay: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
