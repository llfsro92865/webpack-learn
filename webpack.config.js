import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

export default {
  mode: NODE_ENV,
  entry: "./src/index.js", // 单入口默认输出文件名是 main.js 等同于 =>  entry: { main: './src/index.js' }
  // entry: ['./src/bundle1.js', './src/bundle2.js'],
  // entry: { // 多入口
  //   bundle1: './src/bundle1.js',
  //   bundle2: './src/bundle2.js'
  // },
  output: {
    // filename: 'main.js', // 输入的文件名字
    filename: "[name].[contenthash].js", // 输入的文件名字
    path: path.resolve(__dirname, "dist"),
    clean: true, // 每次打包前清理 /dist 文件夹
    // publicPath: 'https://cdn.example.com/assets/[fullhash]/', // 给输出的资源加上 CDN 地址: 意思就是打包好的js文件，不是以绝对路径或者相对路径引入的，而是以cdn形式，使用script标签引入的
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader", // 自动添加浏览器前缀
        ],
      },
      {
        test: /\.less$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader", // 自动添加浏览器前缀
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      // chunks: ['main'], // 如果是多入口，就需要指定引入哪个入口的文件
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    // 如果是多入口，就需要配置多个 HtmlWebpackPlugin
    // new HtmlWebpackPlugin({
    //   template: "./bundle1.html",
    //   filename: "bundle1.html",
    //   chunks: ["bundle1"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./bundle2.html",
    //   filename: "bundle2.html",
    //   chunks: ["bundle2"],
    // }),
  ],
  devServer: {
    // 客户端输出打包进度
    // client: {
    //   progress: true,
    // },
    port: 3000,
    open: true,
    hot: true,
    compress: true, // 启用 gzip 压缩
    // static: {
    //   directory: path.join(__dirname, "dist"),
    // },
  },
};
