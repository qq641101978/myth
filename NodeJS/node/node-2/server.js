let net = require('net');

// 创建服务
let server = net.createServer();
//监听12345端口
server.listen(12345,'127.0.0.1');

//服务启动事件
server.on('listening',()=>{
  console.log('服务已启动')
  console.log(server.address()) //访问服务器地址
})
//客户端连接服务器事件(连接来的事件)
server.on('connection',(socket)=>{
  console.log('有新的链接')
  //获取客户端发送来端信息
  socket.on('data',(data)=>{
    console.log(data.toString())
    //给客户端发送信息
    setTimeout(()=>{
      socket.write('hello client')
    },1000)
  })
  //监听客户端关闭回调
  socket.on('close',()=>{
    console.log('客户端已关闭')
    //关闭服务器
    server.close()
  })
})
//关闭服务器回调
server.on('close',()=>{
  console.log('服务器关闭')
})