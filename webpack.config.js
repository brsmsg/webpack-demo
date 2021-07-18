const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: 'body',
      scriptLoading: 'blocking',
    }),
  ],
  devServer: {
    port: '3001',
    hot: true,
    static: 'error-only',  //仅打印error
    compress: true, //是否启用gzip压缩
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:80',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  devtool: 'eval-cheap-module-source-map',  //定位错误原始代码
}