import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-white': '#FFFFFF',
        'background-grey': '#979797',
        'background-yellow': '#FFC5AC',
        'background-green': '#B9E7BB',
        'background-kiwi': '#DDF873',
        'background-purple': '#EAD3FC',
        'background-pink': '#FF93FB',
        'background-sky': '#A9FFFA',
        'background-lock': '#FFC5AC',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
};
export default config;
