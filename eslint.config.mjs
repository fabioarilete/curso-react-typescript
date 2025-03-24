import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    "rules": {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "camelcase": "off",
    "react/prop-types": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-multi-str": "off",
    "jsx-a11y/anchor-is-valid": 0,
    "no-use-before-define": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prefer-regex-literals": "off"
  }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
