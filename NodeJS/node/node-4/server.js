// 配置不同路径下的服务器 模块化 微型服务器
let net = require('net'); //网络层和运输层的协议  针对 TCP/ip
let fs = require('fs')
let gloablConf = require('./config')
let server = net.createServer()

server.listen(gloablConf.port,'127.0.0.1')

server.on('listening',()=>{
  console.log('服务器已启动')
  // 绝对路径下的文件
  // console.log(gloablConf.basePath)
})
server.on('connection',(socket)=>{
  console.log('有新的链接')
  //获取客户端发送来端信息
  socket.on('data',(data)=>{
    //解析请求头
    let url = data.toString().split('\r\n')[0].split(' ')[1];
    console.log(url)
    try {
      // 对应路径的文件
      let dataFile = fs.readFileSync(gloablConf.basePath + url)
      socket.write(`HTTP/1.1 200OK\r\n\r\n`)
      socket.write(dataFile)
    } catch (e) {
      socket.write(`HTTP/1.1 404NOtFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>`)
    }
    socket.end()
    // socket.write(`HTTP/1.1 200OK\r\nservers:byf\r\nContent-type:text/html\r\n\r\n<html>${url}<body></body></html>`)
  })
})