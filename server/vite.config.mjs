import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  exclude: ["dist", "node_modules"],
  test: {
    maxWorkers: 1,
  },
});
