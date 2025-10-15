import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import EslintPlugin from "eslint-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

export default {
  mode: NODE_ENV,
  // entry: "./src/index.ts", // 单入口默认输出文件名是 main.js 等同于 =>  entry: { main: './src/index.js' }
  // entry: ['./src/bundle1.js', './src/bundle2.js'],
  // entry: { // 多入口
  //   bundle1: './src/bundle1.js',
  //   bundle2: './src/bundle2.js'
  // },
  entry: {
    // // vonder: "./src/vonder.js",
    // main: {
    //   import: "./src/index.js",
    //   // dependOn: "vonder", // 依赖共享模块
    //   runtime: 'runtime-main'
    // }

    bundle1: {
      import: "./src/bundle1.js",
      runtime: "runtime",
    },
    bundle2: {
      import: "./src/bundle2.js",
      runtime: "runtime",
    },
  },
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
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: [
          // "ts-loader" // 也可以用 babel-loader
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript", // 转换TypeScript语法
              ],
              plugins: [
                // "@babel/plugin-proposal-class-properties", // 支持类的属性
                // "@babel/plugin-proposal-object-rest-spread", // 支持对象展开运算符
              ],
            },
          },
        ],
      },
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
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // 如果配置了 Babel 配置文件，就不需要在这里配置 options 了
          // options: {
          //   presents: ["@babel/preset-env"], // 直接用预设
          //   plugins: ['@babel/plugin-proposal-object-rest-spread'], // 也可以单独用插件
          // }
        },
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
    new EslintPlugin({
      extensions: ["ts", "js"],
      // exclude: "node_modules",
      // fix: true, // 自动修复
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
    port: 9000,
    open: true,
    hot: true,
    compress: true, // 启用 gzip 压缩
    // static: {
    //   directory: path.join(__dirname, "dist"),
    // },
    proxy: [
      {
        context: ["/api/getSSE"],
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // 使用新的配置方式
        proxyTimeout: 0, // 禁用超时
        timeout: 0, // 禁用超时
        // 直接透传流
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("accept", "text/event-stream");
        },
      },
      {
        context: ["/api"],
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    ],
  },
  // 其他配置
  // optimization: {
  //   runtimeChunk: false,  // 禁用运行时代码分离
  //   splitChunks: false,   // 禁用代码分割
  //   moduleIds: 'named',   // 使用可读的模块ID
  //   chunkIds: 'named',    // 使用可读的chunk ID
  //   minimize: false,      // 禁用压缩
  // },
};
