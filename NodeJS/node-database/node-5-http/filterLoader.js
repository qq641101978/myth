// 自动读取文件路径 主要作用是web层监听page的请求
let fs = require('fs')
let globalConfig = require('./config')
// let controllerSet = [];
let filterSet = [];
// 读取动态加载文件（需要数据请求读）
let files = fs.readdirSync(globalConfig['filter_path']);

for (let i = 0; i < files.length; i ++) {
  let temp = require('./' + globalConfig['filter_path'] + '/' + files[i])
  filterSet.push(temp);
}
module.exports = filterSet