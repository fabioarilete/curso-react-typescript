import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },  {rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
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
    "prefer-regex-literals": "off"}

  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  
]);