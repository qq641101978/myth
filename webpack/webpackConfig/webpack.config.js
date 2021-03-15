const path = require('path')
// 智能提示（运行后记得注释)写给 vscode 看的
// import { Configuration } from 'webpack'
/**
 * @type {Configuration}
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 自动清理 dist 目录
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成 html
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝文件
const RemoveCommentsPlugin = require('./remove-comments-plugin') //自定义。删除打包的注释

const config = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' //替换掉代理地址中的 /api
        },
        changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
    // ...
    // 详细配置文档：https://webpack.js.org/configuration/dev-server/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        // 直接相对路径
        use: ['html-loader', './markdown-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '我是 plugins 生成的 html',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width'
      }
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    }),
    new CopyWebpackPlugin({
      patterns: ['public'] // 需要拷贝的目录或者路径通配符
    }),
    new RemoveCommentsPlugin()
  ]
}

module.exports = config