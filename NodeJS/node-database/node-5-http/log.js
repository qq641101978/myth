// 两件事没有必然联系，用异步。
let fs = require('fs');
let globalConfig = require('./config');
//写入日志
let fileName = globalConfig['log_path'] + globalConfig['log_name']
// 异步
// fs.writeFile(fileName, 'ssd',()=>{
//   console.log('执行完后回调')
// })
// // 同步无回调
// fs.writeFileSync(fileName,'asd')

function log (data) {
  console.log(data)
  //flag ：w 以写入模式打开文件，不存在则创建
  //       a  以追加模式写
  fs.writeFile(fileName, data + '\n', {flag:'a'}, ()=>{
    // console.log('日志文件已创建')
  })
}
module.exports = log;