
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // GitHub Pages deployment path
  base: "/anjali-portfolio/",

  server: {
    port: 5173,
    host: true,
  },
});
