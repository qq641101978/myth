// 省略dao和service层
let url = require('url')
let path = new Map();

function getbyf (request, response) {
  let params = url.parse(request.url, true).query
  // console.log(params.num)
    // 添加解析汉字头
  let herders = {
    "Content-Type": "text/html; charset=utf-8"
  }
  response.writeHead(200,herders);
  response.write(`${params.num}`)
  response.end();
}

path.set('/getbyf',getbyf);

module.exports.path = path