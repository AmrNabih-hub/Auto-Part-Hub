import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginTs from "typescript-eslint";

export default [
  { ignores: ["backend/vendor/**", "dist/**"] },
  { files: ["script.js"], rules: { "no-unused-vars": "off", "no-undef": "off" } },
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, module: "readonly", bootstrap: "readonly", handleImageError: "readonly", showLoading: "readonly", hideLoading: "readonly", renderAllProducts: "readonly", filterByCategory: "readonly", openProductModal: "readonly", updateQuantity: "readonly", addToCart: "readonly", __dirname: "readonly", require: "readonly" } } },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Your custom rules here
    },
  },
];