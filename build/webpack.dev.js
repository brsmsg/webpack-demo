// dev环境下配置
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',  //定位错误原始代码
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
  cache: {
    type: 'memory'
  }
})