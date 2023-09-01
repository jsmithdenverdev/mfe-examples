import { Shared } from "@originjs/vite-plugin-federation";

export const shared: Shared = {
  context: {
    requiredVersion: "1.0.0",
  },
};

export const modules = {
  remote_profile: ["Profile"],
};
