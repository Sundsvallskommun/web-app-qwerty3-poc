import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

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
    plugins: [
      react(),
      VitePWA({
        manifest: {
          short_name: "QWERTY",
          name: "QWERTY assistenter",
          description: "Sundsvalls kommuns AI-koncept.",
          edge_side_panel: {
            preferred_width: 0,
          },
          icons: [
            {
              src: "favicon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          start_url: ".",
          display_override: ["window-controls-overlay", "standalone"],
          display: "standalone",
          theme_color: "#2F2F3C",
          background_color: "#FFFFFF",
        },
      }),
    ],
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
