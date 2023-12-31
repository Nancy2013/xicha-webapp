'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/fcapi/teaAction': {
        target: 'https://op.cn88555.com/fcapi/teaAction', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          // 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/user/userInfo 时
          // 实际上访问的地址是：http://192.168.1.249:9527/user/userInfo,因为重写了 /api

          '^/fcapi/teaAction': ''
        }
      },
      // '/api/base': {
      //   target: 'http://192.168.110.106:8090/base', //对应自己的接口，代理地址修改后必须重启项目
      //   changeOrigin: true, //是否允许跨域
      //   pathRewrite: {
      //     '^/api/base': ''
      //   }
      // },
      '/api': {
        // target: 'http://192.168.110.96:8084/api',
        target: 'https://op.cn88555.com/api',  //'https://op.cn88555.com/api',  //'http://192.168.110.28:8084',  //'https://xi.cn88555.com/api',   //'https://xi.cn88555.com/api', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/fcapi/ys': {
        target: 'https://xicloud.cn88555.com/fcapi/ys', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          '^/fcapi/ys': ''
        }
      },
      ///zhiyunapi/scan
      '/zhiyunapi/scan': {
        target: 'https://zhiyun.cn88555.com/zhiyunapi/scan', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          '^/zhiyunapi/scan': ''
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost',   //'192.168.110.217',  //localhost // can be overwritten by process.env.HOST
    port: 8091, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
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

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
