let path = new Map()
function getData (request, response) {
  // console.log(request)
  response.writeHead(200);
  response.write('hello1')
  response.end()
  console.log(1111)
}
function getData2 (request, response) {
 console.log(2222)
}
path.set('/getData', getData)
path.set('/getData2',getData2)

module.exports.path = path