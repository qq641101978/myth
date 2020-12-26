# 令人心动的 React 开始拉

### html 页面 js 引入
```js
// <!-- crossorigin 跨域报错可以看到详细信息 -->
// <!-- 核心库 与宿主环境无关 -->
// <!-- 提供对象： React.createElement:创建react 元素 -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
// <!-- 依赖核心库，将核心库的功能与页面结合 将react元素生成真实的dom-->
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
// <!-- JSX的转译babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin></script>
```
### React.createElement()

- 创建一个 React 元素。称作虚拟dom，本质是一个对象（内置组件）
- 参数1：元素类型，如果是字符串，则是一个普通的 html 元素
- 参数2：元素的属性，一个对象，如class，id等等
- 参数3：元素的字节点

### ReactDOM.render()
- 将 React.createElement() 创建的虚拟节点，编译成真实的dom
- 参数1:虚拟节点
- 参数2：挂载的节点

### JSX 语法如何转化成真实的 DOM
- JS的扩展语法，需要使用 babel 进行转译，
- 目的：方便我们书写代码

### 使用脚手架搭建工程
- 官方：create-react-app
- 第三方：next.js, umijs
- yarn源安装：yarn create react-app 工程名


### 开发环境配置

- VScode emmet配置：快速写JSX
- settings.json 文件中
```json
"emmet.includeLanguages": {
    "javascript":"javascriptreact"
  }
```
- vscode插件：VS Code ES7 React/Redux/React-Native/JS snippets
- 目的：快速编写代码
- 浏览器插件：React Develooper Tools
- 目的：方便调试



## 开发

### 什么是JSX
- Facebook 起草的 jS 扩展语法
- 本质是一个 JS 对象，会被 babel 编译，最终被转换成 createElement
- 每个 JSX 表达式，有且仅有一个根节点
  - React.Fragment
- 每个 JSX 元素必须结束（XML规范）

### 在 JSX 中嵌入表达式
- 将表达式作为内容的一部分
 - null 和 undefind 不会显示
 - 不能放置普通对象
 - 可以放置 react 元素对象，style 对象
- 将表达式作为元素属性
- 属性使用小驼峰命名法
- 防止注入攻击
 - 自动编码
 - dangerouslySetInnerHTML

### 元素的不可变性
- 虽然 JSX 是一个对象，但是该对象的所有属性不可更改
- 如果确实需要更改属性，需要重新创建 JSX 元素，重新渲染

### React中： 数据属于谁，谁才有权利改动。

### 组件
- 组件大驼峰规则
- 函数组件：返回一个 react 元素
- 类组件：必须继承 React.Component,提供 render函数，返回 react 元素
- 组件属性：使用小驼峰命名，组件不能改变自身的属性（传入的属性做了限制）。


### 组件状态：
- 组件可以自行维护数据
- 组件状态仅在组件中有效
- 状态（state）：本质上是一个类数组的属性，是一个对象

### 组件状态更新：
- 不能直接改变状态：因为 React 无法监控到状态发生了变化
- 必须使用 this.setState({}) 改变状态
- 一旦调用了 this.setState 相同数据进行覆盖，会导致组件重新渲染

### 组件中的数据：
- props：该数据是由组件使用者传递的数据，所有权不属于组件自身，因此组件无法改变该数据
- state：组件自身创建，所有权属于自身，组件自身有权改变。

### 事件：
- 在 React中，组件的事件，本质就是一个属性
- 按照之前 React 对组件对约定， 由于事件本质上是一个属性：也需要用小驼峰命名
- 内置组件事件与DOM元素事件保持一致
- 如果没有特殊处理，在事件处理函数中 this 指向 undefined
- 问题：内置组件如何获取this
  - 使用 bind 函数绑定 this
  - 使用箭头函数