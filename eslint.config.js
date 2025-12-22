import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default [
  {
    files: ["eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,

  ...compat.extends("plugin:react/recommended"),

  {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
