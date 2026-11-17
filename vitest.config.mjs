import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  esbuild: { loader: "jsx", include: /.*\.jsx?$/, exclude: [], jsx: "automatic" },
  resolve: { alias: { "@": path.resolve(__dirname) } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.test.{js,jsx}"],
  },
});
