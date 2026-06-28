import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy all /generate requests to the backend during development.
    // This also avoids any CORS pre-flight issues.
    proxy: {
      "/generate": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});