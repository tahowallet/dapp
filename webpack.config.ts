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
// eslint-disable-next-line import/no-extraneous-dependencies
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import packageJson from "./package.json"

const config: Configuration = {
  entry: "./src/index.tsx",
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name].[chunkhash].${packageJson.version}.js`,
    sourceMapFilename: `[name].[chunkhash].${packageJson.version}.map`,
    chunkFilename: `[name].[id].[chunkhash].${packageJson.version}.js`,
    clean: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js"],
    preferAbsolute: false,
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
        test: /\.(png|webp|svg|jpg|gif|woff2|mp4|webm)$/,
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
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
    // new BundleAnalyzerPlugin({
    //   generatorStatsFile: true,
    //   analyzerMode: "static",
    // }),
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
    usedExports: true,
    minimize: true,
    splitChunks: {
      automaticNameDelimiter: "-",
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        ui: {
          test: /\/src\/ui/,
          name: "ui",
        },
        vendors: {
          test: /node_modules\/(?!(react-dom|react-reconciler|react-markdown\/lib|@react-spring|@stablelib|keccak|rlp|@web3-onboard|@metamask|@walletconnect|@ethereumjs|ethereumjs-util|@ethersproject|konva\/lib|joi\/dist|@rocicorp|posthog-js|bnc-sdk|browserify-sign|@trezor|remark-parse|elliptic|zod\/lib|qrcode|remarkparse))/,
          name: "vendor",
        },
        others: {
          test: /node_modules\/(elliptic|zod\/lib|qrcode|remarkparse|@stablelib|keccak|rlp|bnc-sdk|browserify-sign)/,
          name: "others",
        },
        reactdom: {
          test: /\/node_modules\/(react-dom)/,
          name: "reactdom",
        },
        reactspring: {
          test: /\/node_modules\/(@react-spring)/,
          name: "reactspring",
        },
        reactmisc: {
          test: /\/node_modules\/(react-markdown\/lib|react-reconciler)/,
          name: "reactmisc",
        },
        web3core: {
          test: /\/node_modules\/(@web3-onboard\/core)/,
          name: "web3core",
        },
        web3hw: {
          test: /\/node_modules\/@web3-onboard\/hw-common/,
          name: "web3hw",
        },
        metamask: {
          test: /\/node_modules\/@metamask/,
          name: "metamask",
        },
        ethersproject: {
          test: /\/node_modules\/(@ethersproject)/,
          name: "ethersproject",
        },
        walletconnect: {
          test: /\/node_modules\/@walletconnect/,
          name: "walletconnect",
        },
        ethereumjs: {
          test: /\/node_modules\/(@ethereumjs|ethereumjs-util)/,
          name: "ethereumjs",
        },
        konva: {
          test: /\/node_modules\/konva\/lib/,
          name: "konva",
        },
        joi: {
          test: /\/node_modules\/joi\/dist/,
          name: "joi",
        },
        rocicorp: {
          test: /\/node_modules\/@rocicorp/,
          name: "rocicorp",
        },
        posthog: {
          test: /\/node_modules\/posthog-js/,
          name: "posthog",
        },
        trezor: {
          test: /\/node_modules\/@trezor/,
          name: "trezor",
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
  }

  return merge(config, overrides.all, overrides[mode] || {})
}
