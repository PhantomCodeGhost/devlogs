/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {

        pastelPink: "#FFB6C1",
        pastelCandy: "#FF9AA2",

        pastelBlue: "#A7D8F0",
        babyBlue: "#89CFF0",

        pastelGreen: "#C5E1A5",
        mint: "#72E0D5",

        pastelYellow: "#F8DE7E",

        pastelLavender: "#D8BFD8",

        pastelGray: "#CFCFCF",

        darkBg: "#111827",
        darkCard: "#1F2937",
      },
    },
  },

  plugins: [],
}