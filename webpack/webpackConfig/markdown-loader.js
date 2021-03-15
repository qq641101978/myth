const marked = require('marked')
module.exports = source => {
  // 将 markdown 转为 html
  const html = marked(source)
  return html
}