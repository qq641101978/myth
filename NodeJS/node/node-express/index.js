let express = require('express');
let globalConfig = require('./config');
let loader = require('./loader');
let cookie = require('cookie-parser')
let url = require('url')
// npm 安装
// let multer = require('multer')

let app = new express();
//监听page（默认index.html页面）
app.use(express.static(globalConfig['page_path']));
// 使用cookie
app.use(cookie())

// 文件上传
// let uploadSingle = multer({dest: './file/'})
// app.post('./upload', uploadSingle.single('file'),loader.get('/upload'))

// get请求，/api/下的任意字符连接 next 实现拦截器功能
app.get('/api/*',(request, response, next) =>{
  console.log(request.cookies)
  console.log(url.parse(request.url, true).query)
  // console.log('===拦截器===')
  if (request.cookies.id) {
    next()
  } else {
    // 重定向
    response.redirect('/login.html')
  }
  // 写cookie
  // response.cookie('id', '1234')
})

// get请求 方法。当网页添加上 /getbyf 时候 回执行后面当回调函数
app.get('/api/getbyf', loader.get('/getbyf'));


//监听端口
app.listen(globalConfig['port']);