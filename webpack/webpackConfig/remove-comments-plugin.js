class RemoveCommentsPlugin {
  apply(compiler) {
    console.log('RemoveCommentsPlugin 启动')
    // 获取对应操作的钩子
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log('输出文件名称', name) // 输出文件名称
        // console.log(compilation.assets[name].source())
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.toString().replace(/\/\*{2,}\/\s?/g, '')
          // 需要返回操作后的内容和大小
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
module.exports = RemoveCommentsPlugin