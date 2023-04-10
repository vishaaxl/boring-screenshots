/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  daisyui: {
    themes: [
      {
        bumblebee: {
          ...require("daisyui/src/colors/themes")["[data-theme=bumblebee]"],
          primary: "#7300E6",
          "base-200": "#C2C2C2",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
