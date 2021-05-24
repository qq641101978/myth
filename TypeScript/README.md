# TypeScript
- TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。

- TypeScript 只会进行静态检查，编译为 js 之后，并没有什么检查的代码被插入进来。如果编译时发现有错误，就会报错，但还是会生成编译结果。

### TS优势
 - TypeScript 增加了代码的可读性和可维护性
   - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
   - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
   - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
 - TypeScript 非常包容
   - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
   - 即使不显式的定义类型，也能够自动做出类型推论
   - 可以定义从简单到复杂的几乎一切类型
   - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
   - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
 - TypeScript 拥有活跃的社区
   - 大部分第三方库都有提供给 TypeScript 的类型定义文件
 - TypeScript 的缺点
   - 有一定的学习成本
   - 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
   - 集成到构建流程需要一些工作量
   - 可能和一些库结合的不是很完美

### 全局安装
- npm install typesrcipt -g
- 检测是否安装成功：输入命令：tsc
- npm i -g ts-node：直接运行ts文件
- Mac 指令。sudo npm i -g typescript 因为全局需要提高权限。加sodu
- 类型注解
- 基础类型：https://typescript.bootcss.com/basic-types.html

- 联合类型：number | string （数字或者字符串）只能访问他俩的共有属性

- 强制类型转化： as 语法

- 元组访问越界元素 会报错从3.1版本开始

- 接口（interface）：类型监测器

- 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

- 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

- 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### TS 迁移的过程
- 使用 any，类型断言 as

### ts学习
[ts学习](./ts-leran.ts)


## TS 再学习

### 编译上下文
- 编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件。
- [编译上下文](./tsconfig.json)

### 声明空间
- 在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。
- 类型声明空间
```ts
class Foo {}
interface Bar {}
type Bas = {};
```
### 变量声明空间
```js
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

### ES 模块语法，模块路径
- 模块的 导出 和导入，导出和导入名称改变，默认导出
- 模块路径
  - 相对模块路径（路径以 . 开头，例如：./someFile 或者 ../../someFolder/someFile 等）；
  - 其他动态查找模块（如：core-js，typestyle，react 或者甚至是 react/core 等）。

### 基本注解
- 类型注解使用 :TypeAnnotation 语法。在类型声明空间中可用的任何内容都可以用作类型注解。
```ts
const num: number = 123;
function identity(num: number): number {
  return num;
}
```
- js 原声方法 都带有自己的 ts 类型
- 类型别名: TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 type SomeName = someValidTypeAnnotation 来创建别名：
```ts
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

### 类型保护
- typeof,instaceof, in, 字面量
![相关链接](https://jkchao.github.io/typescript-book-chinese/typings/typeGuard.html#%E5%AD%97%E9%9D%A2%E9%87%8F%E7%B1%BB%E5%9E%8B%E4%BF%9D%E6%8A%A4)
