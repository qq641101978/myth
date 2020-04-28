//登陆拦截器 返回布尔值
let url = require('url')
let globalConfig = require('../config')
function loginFilter (request, response) {
  let pathName = url.parse(request.url).pathname;
  if (pathName === '/login.html' || pathName === '/login' || isStaticsRequest(pathName)) {
    // console.log('放行')
    return true
  }
  // 验证登陆id是否存在
  if (request.headers.cookie) {
    let cookies = request.headers.cookie.split(';');
    for(let i = 0; i < cookies.length; i ++) {
      if (cookies[i].split('=')[0].trim() === 'id') {
        return  true
      }
    }
  }
  console.log('拦截')
  response.writeHead(302, {
    'location' : '/login.html'
  });
  response.end();
  return false
}
//区分静态资源和动态资源方法 静态：true 动态：false
function isStaticsRequest (pathName) {
  for(var i = 0; i < globalConfig['static_file_type'].length; i ++) {
    let temp = globalConfig['static_file_type'][i]
    if (temp === '.html') {
      continue;
    }
    if (pathName.indexOf(temp) === pathName.length - temp.length) {
      return true
    }
  }
  return  false
}
module.exports = loginFilter