const http = require('http')
const port  = 8882

http.createServer((request,response)=>{
  console.log('被访问:',request.url)
  response.writeHead(200,{
    'Content-Type': 'text/html',
    // * 表示任何服务都允许访问  可以设置为特定都域名允许访问资源 如 http:/127.0.0.1:8881/
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Headers': 'X-Test-Cors', //自定义请求头允许跨域
    'Access-Control-Allow-Methods': 'PUT,Delete', //请求方法
    'Access-Control-Max-Age': '1000' //跨域请求允许的最长时间（在这个时间段内，不需要预请求直接请求）
  })
  response.end('123')
}).listen(port)

console.log('服务端服务已启，动端口：',port )