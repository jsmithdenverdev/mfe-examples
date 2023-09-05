import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          remote_app: {
            external: fetchExternal(env.MANIFEST_URL, "remote_app"),
            externalType: "promise",
          },
        },
        shared: ["react", "react-dom", "react-router-dom"],
      }),
      topLevelAwait(),
    ],
  };
});

const fetchExternal = (base, name) =>
  `fetch('${base}')
    .then(r => r.json())
    .then(manifest => manifest.remotes['${name}'].url)`;
