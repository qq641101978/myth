主旨：异步与性能

### 类型
typeof 的安全防范机制：阻止报错
很多开发人员认为全局命名空间中不应该有变量存在，所有东西都应该被封装到模块和私有 / 独立的命名空间中。理论上这没错，却不切实际。然而这仍不失为一个值得为之努力奋斗的目标。好在 ES6 中加入了对模块的支持，这使我们又向目标迈近了一步。
小结：
- JavaScript 有 七 种 内 置 类 型:null、undefined、boolean、number、string、object 和 symbol，可以使用 typeof 运算符来查看。
- 变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。
- 很多开发人员将 undefined 和 undeclared 混为一谈，但在 JavaScript 中它们是两码事。undefined 是值的一种。undeclared 则表示变量还没有被声明过。
- 遗憾的是，JavaScript 却将它们混为一谈，在我们试图访问 "undeclared" 变量时这样报错:ReferenceError: a is not defined， 并 且 typeof 对 undefined 和 undeclared 变 量 都 返 回 "undefined"。
- 然而，通过 typeof 的安全防范机制(阻止报错)来检查 undeclared 变量，有时是个不错的办法。
### 值
#### 整数检测(es6 api): 
- 1:Number.isInteger(..) // true or false
- 2: (..) % 1 取于是否为0
- 安全的整数(不超过精度范围)： Number.isSafeInteger(..)
- NaN 判断：Number.isNaN(xx)  (window.isNaN() 区分不了字符串)
- 你可以从有 穷走向无穷，但无法从无穷回到有穷。
#### -0 问题 
- 1、从数字转为字符结果为 0
- 2、从字符转为数字结果为 -0
- 3、-0 === 0  为true  可以用Object.is(..) 来判断两个值是否绝对相等

#### 为啥需要 -0
抛开学术上的繁枝褥节不论，我们为什么需要负零呢?
有些应用程序中的数据需要以级数形式来表示(比如动画帧的移动速度)，数字的符号位 (sign)用来代表其他信息(比如移动的方向)。此时如果一个值为 0 的变量失去了它的符号位，它的方向信息就会丢失。所以保留 0 值的符号位可以防止这类情况发生。

#### 小结：
- JavaScript 中的数组是通过数字索引的一组任意类型的值。字符串和数组类似，但是它们的行为特征不同，在将字符作为数组来处理时需要特别小心。JavaScript 中的数字包括“整 数”和“浮点型”。
- 基本类型中定义了几个特殊的值。
- null 类型只有一个值 null，undefined 类型也只有一个值 undefined。所有变量在赋值之前默认值都是 undefined。void 运算符返回 undefined。
数字类型有几个特殊值，包括 NaN(意指“not a number”，更确切地说是“invalid number”)、+Infinity、-Infinity 和 -0。
- 简单标量基本类型值(字符串和数字等)通过值复制来赋值 / 传递，而复合值(对象等) 通过引用复制来赋值 / 传递。JavaScript 中的引用和其他语言中的引用 / 指针不同，它们不能指向别的变量 / 引用，只能指向值。

### 原生函数
>常用的原生函数有:
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()——ES6 中新加入的!

