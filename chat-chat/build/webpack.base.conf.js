'use strict'
const path = require('path')    // 整理路径
const utils = require('./utils')//预编译css的工具模块
const config = require('../config')//对于开发环境和生产环境的参数、路径等的配置
const vueLoaderConfig = require('./vue-loader.conf')//基础生产环境和开发环境对vue-loader进行的配置
// 方便获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: { //输出文件的路径
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath //如果是生产环境
      : config.dev.assetsPublicPath   //如果是生产环境
  },
  resolve: {  //对模块进行解析
    extensions: ['.js', '.vue', '.json'], //对模块扩展名解析
    alias: {  //配置别名
      'vue$': 'vue/dist/vue.esm.js', //预编译+运行时，经过该文编译转化为纯js文件
      '@': resolve('src'), // 用@代替src目录的绝对路径
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,       //解析所有带vue扩展名的文件
        loader: 'vue-loader', //用vue-loader解析
        options: vueLoaderConfig //对vue的style样式解析
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //解析的文件只包含这些
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {                                                  // 对解析文件参数配置
          limit: 10000,                                             // 当小于10000字节转成base64
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 对输出的内容进行地址转换
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
