import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation, { Shared } from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
import { shared } from "./vite.federation.shared";

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
      shared,
    }),
    topLevelAwait(),
  ],
});
