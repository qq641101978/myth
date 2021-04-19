### webpack
- **从一个打包工具变成了一个前端构建系统**
- webpack 的工作原理，webpack 的执行过程大体上可以分为 3 个步骤，包括：检验配置项、创建编译器、执行编译。

- 在 检验 配置项时使用了 JSONSchema 来校验配置参数。

- 在创建编译器时，用到了 tapable 模块提供的钩子机制，通过触发适当的钩子事件来让对应的插件进行初始化。

- 在执行编译阶段，以 compiler.hooks.make 钩子事件为起始点，触发入口文件的解析工作，并调用加载器对资源进行处理，然后构建成抽象语法树，将最终的抽象语法树转换成目标文件并输出到配置项指定的目录。

### 打包结果运行原理
- 为了更好的理解打包后的代码，我们先将 Webpack 工作模式设置为 none，这样 Webpack 就会按照最原始的状态进行打包，所得到的结果更容易理解和阅读

- 打包后的 main.js 文件就是一个立即执行函数: 这个函数是 Webpack 工作入口（webpackBootstrap），它接收一个 modules 参数，调用时传入了一个数组。
- 函数意义：最开始定义了一个 installedModules 对象用于存放或者缓存加载过的模块。紧接着定义了一个 require 函数，顾名思义，这个函数是用来加载模块的。再往后就是在 require 函数上挂载了一些其他的数据和工具函数。这个函数执行到最后调用了 require 函数，传入的模块 id 为 0，开始加载模块。模块 id 实际上就是模块数组的元素下标，也就是说这里开始加载源代码中所谓的入口模块，

### Loader
- **loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。**
- 各种资源模块的加载，实现整体资源的模块化
- use数组的解析顺序从后到前
### 开发一个 loader
- **把不同类型的文件转换成 js 文件输出**
### 开发一个插件
- 通过前面的介绍，我们知道相比于 Loader，插件的能力范围更宽，因为 Loader 只是在模块的加载环节工作，而插件的作用范围几乎可以触及 Webpack 工作的每一个环节。

- 那么，这种插件机制是如何实现的呢？

- 其实说起来也非常简单，Webpack 的插件机制就是我们在软件开发中最常见的钩子机制。

### Plugin 
- **plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务**
- 增强 Webpack 在项目自动化构建方面的能力

- 我在这里先介绍几个插件最常见的应用场景：

  1. 实现自动在打包之前清除 dist 目录（上次的打包结果）；

  2. 自动生成应用所需要的 HTML 文件；

  3. 根据不同环境为代码注入类似 API 地址这种可能变化的部分；

  4. 拷贝不需要参与打包的资源文件到输出目录；

  5. 压缩 Webpack 打包完成后输出的文件；

  6. 自动发布打包结果到服务器实现自动部署。

- 总之，有了 Plugin 的 Webpack 几乎“无所不能”。借助插件，我们就可以轻松实现前端工程化中绝大多数经常用到的功能，这也正是很多初学者会认为 “Webpack 就是前端工程化，或者前端工程化就是 Webpack” 的原因。

- plugin 实现：Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象

- 思考：plugin 能实现 loader的功能么：能，但是没必要

# 开发体验优化：
// package.json
```js
"scripts": {
  "build": "webpack --watch"  // 修改代码 → Webpack 自动打包 → 手动刷新浏览器 → 预览运行结果。
},
```

### webpack-dev-server 是 Webpack 官方推出的一款开发工具，根据它的名字我们就应该知道，它提供了一个开发服务器，并且将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起。

- 安装 webpack-dev-server
$ npm install webpack-dev-server --save-dev
- 运行 webpack-dev-server
$ npx webpack-dev-server

## webpack5 版本下不用按装 webpack-dev-server， 直接执行命令 webpack serve
"start": "webpack serve --open",

### source-map:增加开发体验，快速定位错误，
- 出现的原因是，代码经过 webpack 处理，会丢失原本的位子信息，排查错误造成很大困扰。

### HMR：模块热更新，已经集成，只需要 --hot 开启
- 当代码修改时候，页面会以不刷新的形式更新
- 在不借助 框架 CLI 工具情况下，热更新只能对 css模块实现不刷新式更新，js代码的更新需要手动配置，因为js逻辑复杂，更新范围不能确定
- module.hot.accept('需要更新的模块文件'() => {
  更新回调
})

### Tree Shaking 的实现：借助了 ES Modules 模式
- Webpack 的 Tree-shaking 特性在**生产模式**下会自动开启。$ npx webpack --mode=production
- Tree Shaking 失效的原因：babel-loader 把 ES Modules 转化成了 CommonJS 模式
- usedExports - 打包结果中只导出外部用到的成员；
- minimize - 压缩打包结果。

- 如果把我们的代码看成一棵大树，那你可以这样理解：
  - usedExports 的作用就是标记树上哪些是枯树枝、枯树叶；
  - minimize 的作用就是负责把枯树枝、枯树叶摇下来。

- concatenateModules: 配置的作用就是尽可能将所有模块合并到一起输出到一个函数中，这样既提升了运行效率，又减少了代码的体积。


### sideEffects: 不是太理解
- 注意这个特性在 production 模式下同样会自动开启。

- Webpack 4 中新增了一个 sideEffects 特性，它允许我们通过配置标识我们的代码是否有副作用，从而提供更大的压缩空间。

- Tree-shaking 只能移除没有用到的代码成员，而想要完整移除没有用到的模块，那就需要开启 sideEffects 特性了。

- 需要配置的地方
  - webpack.config.js 中的 sideEffects 用来开启这个功能；
  - package.json 中的 sideEffects 用来标识我们的代码没有副作用。

- 目前很多第三方的库或者框架都已经使用了 sideEffects 标识，所以我们再也不用担心为了一个小功能引入一个很大体积的库了。例如，某个 UI 组件库中只有一两个组件会用到，那只要它支持 sideEffects，你就可以放心大胆的直接用了。

- 重点就是想明白哪些副作用代码是可以随着模块的移除而移除，哪些又是不可以移除的。总结下来其实也很简单：对全局有影响的副作用代码不能移除，而只是对模块有影响的副作用代码就可以移除。
