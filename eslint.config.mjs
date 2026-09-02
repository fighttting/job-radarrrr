import reactPlugin from "eslint-plugin-react";
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,

  {
    ...reactPlugin.configs.flag.recommended,
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.css"],
    languageOptions: {
      ...reactPlugin.configs.flag.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },

  reactPlugin.configs.flat["jsx-runtime"],
  prettier,

];