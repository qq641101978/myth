let http = require('http');
let url = require('url'); //解析url专用
let fs = require('fs');
let log = require('./log');
let filterSet = require('./filterLoader');
log('服务器已启动')
//加载server配置
let globalConfig = require('./config')
//动态数据加载配置
let loader = require('./loader')
// 客户端访问执行
http.createServer((request, response) => {
  // 执行的文件路径
  // console.log(request.url)
  // 路径名
  let pathName = url.parse(request.url).pathname
  log(pathName)
  // console.log(pathName)
  //参数（传入true会解析成对象）
  // let params = url.parse(request.url, true).query
  for (let i = 0; i < filterSet.length; i++) {
    let flag = filterSet[i](request, response)
    if (!flag) {
      return;
    }
  }
  let isStatic = isStaticsRequest(pathName)
  // isStatic 判断加载的数据类型（静态 or 动态）
  // console.log(isStatic)
  if (isStatic) {
    //加载静态
    try {
      let data = fs.readFileSync(globalConfig['page_path'] + pathName)
      response.writeHead(200)
      response.write(data)
      response.end()
    } catch (e) {
      response.writeHead(404)
      response.write('<html lang="en"><body><h1>404 NotFound</h1></body></html>')
      response.end()
    }
  } else {
    //加载动态
    if (loader.get(pathName) != null) {
      // 程序运行报错处理,请求出错处理，防止进程结束
      try {
        loader.get(pathName)(request, response)
      } catch (e) {
        response.writeHead(500)
        response.write('<html lang="en"><body><h1>500 Badserver</h1></body></html>')
        response.end()
      }
    } else {
      response.writeHead(404)
      response.write('<html lang="en"><body><h1>404 NotFound</h1></body></html>')
      response.end()
    }
  }

}).listen(globalConfig['part']);

//区分静态资源和动态资源方法 静态：true 动态：false
function isStaticsRequest (pathName) {
  for(var i = 0; i < globalConfig['static_file_type'].length; i ++) {
    let temp = globalConfig['static_file_type'][i]
    //判断是否是结尾
    if (pathName.indexOf(temp) === pathName.length - temp.length) {
      return true
    }
  }
  return  false
}
