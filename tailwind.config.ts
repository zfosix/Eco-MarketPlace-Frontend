import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "red-telkom": "#800020", // Tambahkan warna kustom di sini
        "red-telkom-hover": "#BF153E",
        "red-text": "#480313",
        "red-bg" : "#4A4042",
        "light-cream": "#FFFDD0", // Warna krem muda kustom
        "color-menu": "#FFA07A"
      },
    },
  },
  
  
  plugins: [],
} satisfies Config;
