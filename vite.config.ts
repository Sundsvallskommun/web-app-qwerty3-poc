import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH,
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
    },
    preview: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `js/assistant-service.js`,
          assetFileNames: `assets/assistant-service.[ext]`,
        },
      },
    },
  };
});
