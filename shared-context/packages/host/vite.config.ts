import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        remote_profile: {
          external: "Promise.resolve('')",
          externalType: "promise",
        },
      },
      shared: {
        context: {
          requiredVersion: "1.0.0",
        },
      },
    }),
    topLevelAwait(),
  ],
});
