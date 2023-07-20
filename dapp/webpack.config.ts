import "webpack-dev-server"
import { Configuration } from "webpack"
import Dotenv from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import "dotenv-defaults/config"
import path from "path"

const config: Configuration = {
  entry: ["./src/index.tsx"],
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    // chunkLoading: false,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|webp|svg|jpg|gif|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv({
      defaults: true,
      systemvars: true,
      safe: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      favicon: "./src/public/favicon.svg",
    }),
    new ForkTsCheckerPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
    client: {
      overlay: false,
    },
  },
  optimization: {
    splitChunks: { automaticNameDelimiter: "-" },
  },
}

export default config
