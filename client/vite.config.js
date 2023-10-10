import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/client/", // Setează acest lucru la ruta de bază a proiectului tău pe server
  build: {
    // ...
    publicDir: "public", // Asigură-te că acesta arată către directorul public din proiectul tău
  },
  plugins: [react()],
});
