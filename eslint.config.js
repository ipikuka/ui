import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginVitest from "@vitest/eslint-plugin";
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
      ".storybook",
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
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    name: "vitest",
    files: ["**/*.{spec,test}.{ts,tsx}"],
    plugins: { vitest: pluginVitest },
    languageOptions: {
      globals: pluginVitest.environments.globals,
    },
  },
  ...pluginStorybook.configs["flat/recommended"],
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}"],
    rules: {
      "storybook/csf-component": "warn",
      "storybook/hierarchy-separator": "warn",
      "storybook/default-exports": "warn",
    },
  },
  eslintPluginPrettierRecommended,
);
