import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote-profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/modules/Profile",
      },
      shared: ["react", "react-dom"],
    }),
    topLevelAwait(),
  ],
});
