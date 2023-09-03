import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation, { RemotesObject } from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
import { shared } from "./vite.federation.config";

const devRemotes: RemotesObject = {
  remote_profile: "http://localhost:3001/assets/remoteEntry.js",
};

const prodRemotes: RemotesObject = {
  remote_profile: {
    external: "Promise.resolve('')",
    externalType: "promise",
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const remotes = mode === "development" ? devRemotes : prodRemotes;
  console.log(remotes);
  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes,
        shared,
      }),
      topLevelAwait(),
    ],
  };
});
