const http = require('http')
const fs = require('fs')
const port  = 8881

http.createServer((request,response)=>{
  console.log('request come:',request.url)
  if  (request.url === '/'){
    const html = fs.readFileSync('http/test.html','utf8')
    response.writeHead(200,{
      'Content-Type': 'text/html',
    })
    response.end(html)
  }
  if  (request.url === '/script.js'){
    response.writeHead(200,{
      'Content-Type': 'text/javascript',
      'Cache-Control':'max-age=100, public'
    })
    response.end('console.log("javascript load")')
  }
  
}).listen(port)

console.log('客户端服务已启动，端口：',port )