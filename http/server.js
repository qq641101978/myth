const http = require('http')
const fs = require('fs')
const port  = 8881

const wait = (seconds) => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve()
    },seconds * 1000)
  })
}
// 创建服务
http.createServer((request,response)=>{
  console.log('request come:',request.headers.host)
  if  (request.url === '/'){
    const html = fs.readFileSync('http/test.html','utf8')
    response.writeHead(200,{
      'Content-Type': 'text/html',
      // 一个cookie设置了过期时间，一个设置了js禁止访问
      'Set-Cookie':['id=123; max-age=200','name=bai; httpOnly' ],
    })
    response.end(html)
  }
  // 缓存相关
  if  (request.url === '/script.js'){
    const etag = request.headers['if-none-match']
    if (etag === '445') {
      response.writeHead(304,{
        'Content-Type': 'text/javascript',
        'Cache-Control':'max-age=2000000, no-cache',
        "Last-Modified": '123', // date
        'Etag': '445'
      })
      response.end('')
    }else {
      response.writeHead(200,{
        'Content-Type': 'text/javascript',
        'Cache-Control':'max-age=2000000, no-cache',
        "Last-Modified": '123',
        'Etag': '445'
      })
      response.end('console.log("javascript load")')
    }
  }
  // 代理缓存接口
  if(request.url === '/data') {
    wait(2).then(()=> {
      response.writeHead(200,{
        'Cache-Control':'max-age=20',
        // 'Vary': 'X-Test-Cache'
      })
      response.end('success')
    })
  }
  
}).listen(port)

console.log('客户端服务已启动，端口：',port )