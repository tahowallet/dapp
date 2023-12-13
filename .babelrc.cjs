module.exports = {
  compact: true,
  plugins: [
    "styled-jsx/babel",
    "@babel/plugin-syntax-dynamic-import",
    [
      "babel-plugin-styled-components",
      {
        minify: true,
        transpileTemplateLiterals: false,
      },
    ],
  ],
  presets: ["@babel/preset-typescript", "@babel/react"],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
}
