let path = new Map()

function upload(request, response) {
  console.log(request.file.mimeType)
  // 原始文件名称
  console.log(request.file.originalname)
  // 文件大小
  console.log(request.file.size)
  // 文件路径
  console.log(request.file.mimeType)
  response.end('finish')
}

path.set('/upload', upload)

module.exports.path = path