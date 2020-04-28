//将server.conf 配置文件解析
let fs = require('fs');
let conf = fs.readFileSync('./server.conf');

let configArr = conf.toString().split('\n');
//收集配置
let globalConfig = {};

for(let i = 0; i < configArr.length; i ++) {
  globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1].trim()
}
// 区分静态文件配置
// if (globalConfig['static_file_type']) {
//   globalConfig['static_file_type'] = globalConfig['static_file_type'].split('|');
// } else {
//   throw new Error('配置文件异常，缺少:static_file_type');
// }
module.exports = globalConfig;