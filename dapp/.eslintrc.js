module.exports = {
  root: true,
  extends: ["@thesis-co"],
  settings: { "import/core-modules": ["styled-jsx/css"] },
  rules: {
    "react/no-unknown-property": [
      2,
      {
        ignore: ["jsx", "global"],
      },
    ],
  },
};
