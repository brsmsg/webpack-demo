// 拆分环境后各环境公共配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const rootDir = process.cwd();

module.exports = {
  entry: path.resolve(rootDir, 'src/index.js'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'bundle.[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        include: path.resolve(rootDir, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              }
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins:[
                  "autoprefixer"
                ]
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      // 资源loader
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: 'asset',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'public/index.html'),
      inject: 'body',
      scriptLoading: 'defer',
    }),
    new CleanWebpackPlugin(),  // 清除之前打包产物
    new MiniCssExtractPlugin({  //  打包后抽离css文件
      filename: 'css/[name].css'
    }),
    new OptimizeCssPlugin(),  // 压缩打包后css文件
    new CopyWebpackPlugin({   // 复制静态资源到dist目录下
      patterns: [
        {
          from: '*.js',
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, 'dist/js')
        }
      ]
    })
  ]
}