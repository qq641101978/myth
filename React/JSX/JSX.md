## JSX
### 问题：
#### JSX 的本质是什么，它和 JS 之间到底是什么关系？

- JSX 的本质是 JavaScript 的语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力。

- 使 JSX 生效的手段：Babel 编译 => Babel 具备将 JSX 语法转换为 JavaScript 代码的能力。

- createElement函数作用：格式化数据

- 什么是Bable：Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。—— Babel 官网

#### 为什么要用 JSX？不用会有什么后果？

- JSX 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM，在降低学习成本的同时，也提升了研发效率与研发体验。

#### JSX 背后的功能模块是什么，这个功能模块都做了哪些事情？

- JSX => Bable => React.createElement => ReactElement => 虚拟DOM => reactDOM.render() 渲染 => 真实DOM