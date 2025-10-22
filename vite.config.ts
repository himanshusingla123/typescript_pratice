import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "Day 09"), // 👈 Vite root folder
  build: {
    outDir: path.resolve(__dirname, "Day 09/dist"),
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
