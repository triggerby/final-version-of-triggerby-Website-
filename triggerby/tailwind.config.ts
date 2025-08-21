import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        mint1: "var(--mint-1)",
        green2: "var(--green-2)",
        green3: "var(--green-3)",
        green4: "var(--green-4)",
        green5: "var(--green-5)",
      },
      boxShadow: {
        emerald: "var(--emerald-glow)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

export default config;
