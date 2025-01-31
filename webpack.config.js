const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
require('dotenv').config({
  path: path.join(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env')
});
const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true, // Очистка папки dist перед сборкой
  },
  devServer: {
    open: true,
    host: "localhost",
    watchFiles: ["src/pages/*.html"],
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/pages/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new DefinePlugin({
      'process.env.DEVELOPMENT': !isProduction,
      'process.env.API_ORIGIN': JSON.stringify(process.env.API_ORIGIN ?? '')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ["babel-loader", "ts-loader"],
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "resolve-url-loader", {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            sassOptions: {
              includePaths: ["src/scss"]
            }
          }
        }],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/resource",
      },
      // Добавьте ваши правила для пользовательских модулей здесь
      // Узнайте больше о загрузчиках на https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true
      }
    })],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
