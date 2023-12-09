/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        bg_primary: "var(--bg-primary)",
        bg_secondary: "var(--bg-secondary)",
        text_color: "var(--text-color)",
        heading: "var(--heading-color)",
      },
    },
  },
  plugins: [],
};
