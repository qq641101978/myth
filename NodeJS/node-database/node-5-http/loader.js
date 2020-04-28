// 自动读取文件路径 主要作用是web层监听page的请求
let fs = require('fs')
let globalConfig = require('./config')
// let controllerSet = [];
let pathMap = new Map()
// 读取文件路径（需要数据请求读）约定导出一个map
let files = fs.readdirSync(globalConfig['web_path']);
for (let i = 0; i < files.length; i ++) {
  let temp = require(`./${globalConfig['web_path']}/${files[i]}`)
  if (temp.path) {
    for (let [key, value] of temp.path) {
      // 判断一个url是否对应多个方法
      if (pathMap.get(key) == null) {
        pathMap.set(key, value)
      } else {
        throw new Error('url path异常，ur:' + key)
      }
    }
    // controllerSet.push(temp)
  }
}
// console.log(pathMap)
module.exports = pathMap