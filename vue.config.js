const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: os.cpus().length,
          cache: true,
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']
            },
            output: {
              // 最紧凑的输出
              beautify: false,
              // 删除所有的注释
              comments: false
            }
          }
        })
      ]
    }
  },
  chainWebpack: (config) => {}
};
