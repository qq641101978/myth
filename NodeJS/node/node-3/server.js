let net = require('net');
// 读文件
let fs = require('fs');
let server = net.createServer()
server.listen(12345,'127.0.0.1')
server.on('listening',()=>{
  console.log('服务器已启动')
})
server.on('connection',(socket)=>{
  console.log('有新的链接')
  //获取客户端发送来端信息
  socket.on('data',(data)=>{
    let url = data.toString().split('\r\n')[0].split(' ')[1];
    console.log(url)
    try {
      let dataFile = fs.readFileSync(__dirname + url)
      socket.write(`HTTP/1.1 200OK\r\n\r\n`)
      socket.write(dataFile)
    } catch (e) {
      socket.write(`HTTP/1.1 404NOtFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>`)
    }
    socket.end()
    // socket.write(`HTTP/1.1 200OK\r\nservers:byf\r\nContent-type:text/html\r\n\r\n<html>${url}<body></body></html>`)
  })
})