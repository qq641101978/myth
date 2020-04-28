let fs = require('fs');
//加载配置文件
let globConfig = {};
let conf = fs.readFileSync('server.conf').toString().split('\n');
for (let i = 0; i< conf.length; i++) {
  let temConf = conf[i].split('=');
  if (temConf.length < 2) {
    continue
  } else {
    globConfig[temConf[0]] = temConf[1]
  }
}
console.log(globConfig)
//相对路径
if (globConfig['path_position'] === 'relative') {
  globConfig.basePath = __dirname + globConfig.path
} else {
  //绝对路径
  globConfig.basePath = globConfig.path
}
module.exports = globConfig

// 终端获取绝对路径的命令 关键 pwd
// Linux pwd命令用于显示工作目录。
// 执行pwd指令可立刻得知您目前所在的工作目录的绝对路径名称。
