module.exports = {
  root: true,
  extends: ["@thesis-co"],
  plugins: ["unused-imports"],
  settings: {
    "import/core-modules": ["styled-jsx/css"],
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  env: {
    browser: true,
  },
  rules: {
    "react/default-props-match-prop-types": [
      2,
      { allowRequiredDefaults: true },
    ],
    "react/require-default-props": [0],
    "react/prop-types": [0],
    "react/no-unknown-property": [
      2,
      {
        ignore: ["jsx", "global"],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  ignorePatterns: ["dist", "typechain"],
}
