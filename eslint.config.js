import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginStorybook from "eslint-plugin-storybook";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: [
      ".DS_Store",
      ".vscode/",
      "archive/",
      "coverage/",
      "dist/",
      "node_modules/",
      "package-lock.json",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      storybook: pluginStorybook,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginStorybook.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  {
    name: "vitest",
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}"],
    rules: {
      "storybook/hierarchy-separator": "warn",
      "storybook/default-exports": "warn",
    },
  },
  eslintPluginPrettierRecommended,
);
