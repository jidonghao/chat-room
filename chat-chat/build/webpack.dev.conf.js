'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 引入webpack-merge插件用来合并配置对象
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// 拷贝插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 收集错误和日志 并展示
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 自动获取端口 不会发生端口冲突的情况
const portfinder = require('portfinder')
// 获取本机ip
const os = require('os');
const interfaces = os.networkInterfaces();
const hostIp = function() {
  let IPv4;
  if(process.platform === 'darwin') {
    for(let i = 0; i < interfaces.en0.length; i++) {
      if(interfaces.en0[i].family === 'IPv4') {
        IPv4 = interfaces.en0[i].address;
      }
    }
  } else if(process.platform === 'win32') {
    for(let devName in interfaces) {
      let iFace = interfaces[devName];
      for(let i = 0; i < iFace.length; i++) {
        let alias = iFace[i];
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          IPv4 = alias.address;
        }
      }
    }
  }
  return IPv4;
}

//--
const HOST = process.env.HOST || hostIp()
const PORT = process.env.PORT && Number(process.env.PORT)
// 合并配置对象
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map 开发速度更快
  devtool: config.dev.devtool,// 开发工具选项使用的是cheap-module-eval-source-map
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning', // 客户端日志级别：警告
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },

    hot: true,          // 热重载
    contentBase: false, // 因为我们使用 CopyWebpackPlugin。
    compress: true,     // 压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay  //覆盖
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // 公共路径 默认 '/'
    proxy: config.dev.proxyTable, // 代理
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({  // 定义全局变量
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `本地运行： http://localhost:${port}`,
            `网络运行： http://${hostIp()}:${port}`
          ],

        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
