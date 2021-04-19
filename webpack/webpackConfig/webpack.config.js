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
  // 其他配置项
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果, false 不压缩
    minimize: false,
    // 副作用移除
    sideEffects: true
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
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                 // loader 过后的模块会强行 转化成 commonJs模式，Tree-shaking 失效
                // modules 默认为 auto ,
                // { modules: 'commonjs' }
              ]
            ]
          }
        }
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