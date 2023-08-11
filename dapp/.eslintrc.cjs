module.exports = {
  root: true,
  extends: ["@thesis-co"],
  settings: {
    "import/core-modules": ["styled-jsx/css"],
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // these will be caught during build
    "import/no-unresolved": "error",
    "react/default-props-match-prop-types": [
      2,
      { allowRequiredDefaults: true },
    ],
    "react/require-default-props": [0],
    "react/no-unknown-property": [
      2,
      {
        ignore: ["jsx", "global"],
      },
    ],
  },
  ignorePatterns: ["dist"],
}
