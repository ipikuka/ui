/// <reference types="vitest" />
import { defineConfig } from "vite";

import { coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ipikuka-ui",
      formats: ["es", "umd"],
      fileName: (format) => `ipikuka-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup-tests.js"],
    include: ["**/*.{test,spec}.ts?(x)"],
    coverage: {
      provider: "v8",
      reporter: [
        ["lcov", { projectRoot: "./src" }],
        ["json", { file: "coverage.json" }],
        "text",
      ],
      exclude: ["archive", "tests", "**/*.d.ts", ...coverageConfigDefaults.exclude],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
