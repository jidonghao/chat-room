'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')          // 用于展示加载中的效果
const rm = require('rimraf')        // 用来删除文件和文件夹，不管文件夹是否为空
const path = require('path')        // 导入path模块 处理路径
const chalk = require('chalk')      // 用来改变文字颜色
const webpack = require('webpack')  //
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('正在为生产环境构建...')
spinner.start()
// 删除static文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //构建webpack
  webpack(webpackConfig, (err, stats) => {
    //停止动画
    spinner.stop()
    if (err) throw err
    //输出相当于console.log
    process.stdout.write(stats.toString({
      colors: true,// 颜色
      modules: false, // 是否增加内置模块信息
      children: false, // 如果您使用 ts-loader，将其设置为 true 将使 TypeScript 错误在构建期间出现。
      chunks: false, // 允许较少地输出？
      chunkModules: false // 将模块的信息加到包信息？
    }) + '\n\n')
    //编译推出
    if (stats.hasErrors()) {
      console.log(chalk.red('  构建失败并出现错误。\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  构建完成。\n'))
    console.log(chalk.yellow(
      '  提示：构建文件旨在通过 HTTP 服务器提供服务。\n' +
      '  在文件上打开 index.html：// 行不通 \n'+
      '  如遇404请检查 config/index.js assetsPublicPath属性'
    ))
  })
})
