const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public/dist"), // 项目的打包文件路径
    filename: "main.js", // 打包后的文件名
  },
  mode: 'development',
  devServer: {
    host: "127.0.0.1", //地址
    hot: true, //自动更新
    port: 3001, // 端口号
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve("src"),
      app: path.resolve("src/app")
    },
    extensions: [".js", ".jsx"],
  },
  devtool: 'eval-source-map'
};
