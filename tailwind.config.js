/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070d",
        panel: "#0a1120",
        "panel-2": "#0e1729",
        line: "#1b2a45",
        neon: "#22d3ee",
        lime: "#a3e635",
        amber: "#fbbf24",
        rose: "#fb7185",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "Courier New", "monospace"],
        terminal: ['"VT323"', "Courier New", "monospace"],
      },
      animation: {
        blink: "blink 1.1s steps(2, start) infinite",
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        pageIn: "pageIn 0.45s ease-out both",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pageIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
