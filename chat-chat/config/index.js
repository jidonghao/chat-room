'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

let path = require('path')

module.exports = {
  dev: {
    bonjour: true,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // 可以被 process.env.HOST 覆盖
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,  // 自动打开浏览器
    // open:`http://localhost:${this.port}`,
    errorOverlay: true,     // 错误叠加
    notifyOnErrors: true,   // 通知错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {  //production 生产环境
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // 编译 index.html文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),  // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/',  // 编译发布的根目录,如果不在根目录应当修改此配置

    /**
     * Source Maps
     */

    productionSourceMap: true,  // 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    /** Gzip off by default as many popular static hosts such as  *
     * Surge or Netlify already gzip all static assets for you.   *
     * Before setting to `true`, make sure to:                    *
     * npm install --save-dev compression-webpack-plugin         **/
    /** 默认情况下 Gzip 关闭，因为许多流行的静态主机
     * （例如 Surge 或 Netlify）已经为您 gzip 所有静态资产。
     * 在设置为 `true` 之前，
     * 请确保： npm install --save-dev compression-webpack-plugin **/

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
