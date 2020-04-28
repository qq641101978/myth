class CopyrightWebpackPlugin {
  constructor(options) {
    console.log(options)
  }
  apply(compiler) {
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log(compilation.assets)
    })
    // 对应的钩子函数
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      debugger
      compilation.assets['asyncCopyRight.js'] = {
        source: function() {
          return "bai"
        },
        size: function() {
          return 8
        }
      }
      cb()
    })
  }
}
module.exports = CopyrightWebpackPlugin;