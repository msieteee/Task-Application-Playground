import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";

export default {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("build"),
    filename: "index.bundle.min.js",
    clean: true,
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: [`./src/**/*`],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "css-modules-typescript-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|pdf)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
