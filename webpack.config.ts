/* eslint-disable import/no-extraneous-dependencies */
import "webpack-dev-server"
import { Configuration, DefinePlugin, ProvidePlugin } from "webpack"
import { merge } from "webpack-merge"
import Dotenv from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"

import "dotenv-defaults/config"
import path from "path"
import fs from "fs/promises"
import child_proces from "child_process"
import packageJson from "./package.json"

const config: Configuration = {
  entry: {
    main: "./src/index.tsx",
    DesktopDApp: "./src/shared/components/DApps/DesktopDApp.tsx",
    Onboarding: "./src/ui/Onboarding/index.tsx",
    IslandView: "./src/shared/components/DApps/IslandView.tsx",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    clean: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js"],
    preferAbsolute: true,
    alias: {
      "@": path.resolve(__dirname, "src"),
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
        test: /\.(png|webp|svg|jpg|gif|woff2|mp4)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv({
      defaults: true,
      systemvars: true,
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
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
    new DefinePlugin({
      "process.env.VERSION": JSON.stringify(packageJson.version),
    }),
    new DefinePlugin({
      "process.env.COMMIT_HASH": JSON.stringify(
        child_proces.execSync("git rev-parse --short HEAD").toString().trim()
      ),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
    client: {
      overlay: false,
    },
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "-",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: { context: { match: (arg0: RegExp) => string[] } }) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            return `npm.${packageName.replace("@", "")}`
          },
        },
      },
    },
  },
}

export default async (
  _webpackEnv: Record<string, string | boolean>,
  argv: {
    mode: "development" | "production"
    [otherWebpackOption: string]: unknown
  }
) => {
  const { mode } = argv

  const deploymentInfo: { name: string; expectedAddress: string }[] =
    JSON.parse(
      await fs
        .readFile(path.resolve(__dirname, "./deployment-info.json"), "utf-8")
        .catch(() => "[]")
    )

  const overrides: Record<string, Configuration> = {
    all: {
      plugins: [
        new DefinePlugin(
          Object.fromEntries(
            deploymentInfo.map(({ name, expectedAddress }) => [
              `CONTRACT_${name}`,
              `"${expectedAddress}"`,
            ])
          )
        ),
      ],
    },
    production: {
      output: { chunkLoading: false },
      devtool: false,
    },
  }

  return merge(config, overrides.all, overrides[mode] || {})
}
