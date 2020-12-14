const http = require('http')
const fs = require('fs')
const port = 8881

// 创建服务
http.createServer((request, response) => {
    console.log('request come:', request.headers.host)
    if (request.url === '/') {
        const html = fs.readFileSync('index.html', 'utf8')
        // response.writeHead(200,{
        //   'Content-Type': 'text/html',
        // })
        response.end(html)
    }

}).listen(port)

console.log('客户端服务已启动，端口：', port)