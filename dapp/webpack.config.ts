import "webpack-dev-server"
import { Configuration, ProvidePlugin } from "webpack"
import { merge } from "webpack-merge"
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
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@assets": path.resolve(__dirname, "src/shared/assets"),
      "@shared": path.resolve(__dirname, "src/shared"),
      buffer: "buffer",
      crypto: "crypto-browserify",
      assert: "assert",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util",
    },
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  experiments: {
    asyncWebAssembly: true,
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
      inject: true,
      publicPath: "/",
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
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
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

export default (
  _webpackEnv: Record<string, string | boolean>,
  argv: {
    mode: "development" | "production"
    [otherWebpackOption: string]: unknown
  }
) => {
  const { mode } = argv

  const overrides: Record<string, Configuration> = {
    production: {
      output: {
        chunkLoading: false,
      },
    },
  }

  return merge(config, overrides[mode] || {})
}
