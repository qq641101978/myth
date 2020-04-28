let dao = require('./../service/byfService');
// let url = require('url') //解析url专用
let path = new Map()

function getData (request, response) {
  dao.queryAllByf((res)=>{
    let resArr = [];
    for (let i = 0; i < res.length; i++) {
      resArr.push(res[i].name)
    }
    response.write(resArr.toString())
    response.end();
  })
}
path.set('/getData', getData)

// get 请求的login
// function login (request, response) {
//   let params = url.parse(request.url, true).query
//   dao.queryByfByStuNum(params.stuNum,(result)=>{
//     let res = 'fail'
//     console.log(result)
//     if (result && result.length>0 && params.password === result[0].pwd) {
//       res = 'ok'
//     }
//     response.write(res)
//     response.end();
//   })
// }

// post 请求的login
function login (request, response) {
  // data事件去监听参数
  request.on('data',(data)=>{
    console.log(data.toString())
    let stuNum = data.toString().split('&')[0].split('=')[1]
    let password = data.toString().split('&')[1].split('=')[1]
    console.log(stuNum, password)
    // 查询数据库对应数据，是否满足登陆信息
    // dao.queryByfByStuNum(stuNum,(result)=>{
    //   let res = 'fail'
    //   console.log(result)
    //   if (result && result.length>0 && password === result[0].pwd) {
    //     res = 'ok';
    //     // 浏览器来做跳转
    //     response.writeHead(302, {
    //       'location': '/main.html',
    //       'Set-Cookie': `id=${stuNum}`,
    //     })
    //     // response.write(res)
    //     response.end();
    //   } else {
    //     response.writeHead(302, {'location': '/error.html'})
    //     response.end();
    //   }
    // })
  })
}
path.set('/login', login)
module.exports.path = path

//重定向写法
// response.writeHead(302, {'location': '/error.html'})
//     response.end();