# 令人心动的 React 开始拉
> 由 facebook 研发的，解决 UI 复杂度的开源 JavaScript 项目
## html 页面 js 引入
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

## React.createElement()
- 创建一个 React 元素。称作虚拟dom，本质是一个对象（内置组件）
- 参数1：元素类型，如果是字符串，则是一个普通的 html 元素
- 参数2：元素的属性，一个对象，如class，id等等
- 参数3：元素的字节点

### ReactDOM.render()
- 将 React.createElement() 创建的虚拟节点，编译成真实的dom
- 参数1:虚拟节点
- 参数2：挂载的节点
```js
// 创建一个 span 元素
let span = React.createElement('span',{}, '我是一个span')
// 创建 h1元素
let h1 = React.createElement('h1', {
    title:'h1'
}, '321', span)
// 以上都是 React 元素
// 生成真实节点
ReactDOM.render(h1,document.getElementById('reactRoot'))
```

### JSX 语法如何转化成真实的 DOM
- JS的扩展语法，需要使用 babel 进行转译，
- 目的：方便我们书写代码

<script type="text/babel">
    let h1 = <h1>我是和<span>我是一个span</span></h1>
    ReactDOM.render(h1,document.getElementById('reactRoot'))
</script>

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

## 什么是JSX
- Facebook 起草的 jS 扩展语法
- 本质是一个 JS 对象，会被 babel 编译，最终被转换成 createElement
- 每个 JSX 表达式，有且仅有一个根节点
  - React.Fragment 解决需要多节点问题
- 每个 JSX 元素必须结束（XML规范）

### 在 JSX 中嵌入表达式：{}
- 将表达式作为内容的一部分
 - null undefind false 不会显示
 - 不能放置普通对象作为子元素
 - 可以放置 react 元素对象，style 对象
- 将表达式作为元素属性
- 属性使用小驼峰命名法
- 添加class：className
- 防止注入攻击
 - 自动编码
 - dangerouslySetInnerHTML
```js
let a = 111,
    b = 222,
    arr =[ 1, false, null, undefined, 3 ]
const div = (<div>
  {/* 不会产生任何输出 */}
  <p>{ null}</p>
  <p>{ undefined }</p>
  <p>{ false }</p>
  <p>{ true }</p>
  <p>0</p>
  <p>{Boolean(0)}</p>
  <h1 className={cls}>{a} * {b} = {a * b}</h1>
  <h1>{ arr }</h1>
</div>)
ReactDOM.render(div,document.getElementById('root'))
```
```js
// 直接插入dom元素
const conent = '<h1>asd</h1>'
const div = (
  <div  dangerouslySetInnerHTML={{
    __html:content
  }}>
  </div>
)
ReactDOM.render(div,document.getElementById('root'))
```

### 元素的不可变性
- 虽然 JSX 是一个对象，但是该对象的所有属性不可更改
- 如果确实需要更改属性，需要重新创建 JSX 元素，重新渲染
 - 因为改变的是 React 对象，不是真实的dom，效率是非常快的

### React中的哲学：数据属于谁，谁才有权利改动。

## 组件
- 组件大驼峰规则
 - 如果首字母不大写，会解析成普通的 React 元素，会报错 
- 函数组件：返回一个 react 元素
- 类组件：必须继承 React.Component,提供 render函数，返回 react 元素
> 未来：推荐使用函数组件（新增的hooks）。目的：消除 this


### 组件属性：
- 对于函数组件：属性会作为一个对象的属性。传递给函数的参数
- 对于类组件：属性会作为一个对象的属性，传递给构造函数的参数
> 注意：使用小驼峰命名，组件不能改变自身的属性（传入的属性做了限制）。


### 组件状态：
- 组件可以自行维护的数据
- 组件状态仅在组件中有效
- 状态（state）：本质上是一个类数组的属性，是一个对象


### 组件状态更新：
- 不能直接改变状态：因为 React 无法监控到状态发生了变化
- 必须使用 this.setState({}) 改变状态
- 一旦调用了 this.setState 相同数据进行覆盖，会导致组件重新渲染


### 组件中的数据：
- props：该数据是由组件使用者传递的数据，所有权不属于组件自身，因此组件无法改变该数据
- state：组件自身创建，所有权属于自身，组件自身有权改变。


## 事件：这种操作，我爱了
- 在 React中，组件的事件，本质就是一个属性
- 按照之前 React 对组件对约定， 由于事件本质上是一个属性：也需要用小驼峰命名
- 内置组件事件与DOM元素事件保持一致
- 如果没有特殊处理，在事件处理函数中 this 指向 undefined
- 问题：内置组件如何获取this
  - 使用 bind 函数绑定 this
  - 使用箭头函数（最舒服的写法）：变成一个属性，在对象上，不在原型上了

## setState
- setSate 对状态对改变，**可能**是异步的
> 如果改变状态对代码处于某个HTML元素的事件中，则其是异步的，否则是同步
- 如果希望在状态改变之后继续操作，这利用setSate 的第二个参数，回调函数，
```js
this.state.n = 1
this.setState({
  n: this.state.n + 1
}, () =>{
  console.log(his.state.n) //2
})
console.log(his.state.n) // 1
```
- 需要多次改变状态：setSate的第一个参数可以是一个回调函数
- 如果遇到某个事件中，需要多次同步修改状态，需要使用函数的方式得到最新状态
```js
this.setState(cur=>{
  //参数 cur 表示当前状态
  // 该函数的返回结果，会混合（覆盖）掉之前的状态
  // 该函数异步执行
  return {
    n: cur.n + 1
  }
})
```
- 实践：
 - 1、把所有 setState 当作异步的
 - 2、永远不要信任 setState 调用之后的状态
 - 3、如果要使用改变之后的状态，需要使用回调函数（setState第二个参数）
 - 4、如果新的状态需要根据之前的状态进行运算，使用函数的方式改变状态（setState第一个参数，作为函数使用）

- React 会对异步的 setState 进行优化，将多次的 setState 进行合并（将多次状态改变完成后，再统一对 state 进行改变，然后触发 render）

## 生命周期
- 生命周期仅存在类组件中，函数组件每次调用都是重新运行函数，旧对组件即刻被销毁

### 旧版生命周期： React < 16.0.0
![旧生命周期](./img/旧生命周期.jpg)

### 初始化阶段
1. constructor：初始化阶段，初始化属性和状态
  1. 同一个组件对象只会创建一次
  2. 不能在第一次挂载页面之前，调用 setState。

2. componentWillMount：组件即将挂载到页面 新版移除
  1. 正常情况下，和构造函数一样，它只会运行一次
  2. 可以使用 setState ，但是为了避免 bug ，不允许使用，因为在某些情况下，该函数会调用多次

3. **render** 组件渲染虚拟 DOM
  1. 返回的 React 元素会被挂载到虚拟 DOM 树中，最终渲染到页面的真实 DOM 中
  2. render 可能不止运行一次，只要需要重新渲染，就会重新执行
  3. 严禁使用 setState

4. **componentDidMount** 虚拟 DOM 挂载，成为真实 DOM
  1. 只会执行一次，挂载完成 
  2. 可以使用 setState
  3. 通常情况下，会将网络请求，定时器等等操作写在这里

> 1 - 4 挂载阶段完成

#### 更新阶段 状态改变，属性更新
5. componentWillReceiveProps 接收到新的属性值 新版移除
  1. 即将接收新的属性值
  2. 参数为新的属性对象
  3. 该函数可能会导致一些bug，不推荐使用（状态和属性混乱使用，导致数据出处不明确）

6. **shouldComponentUpdata** 是否重新渲染组件 性能优化点
  1. 指示 React 是否要重新渲染该组件，通过返回 true 和 false 来指定，
  2. 默认 为 true
 
7. componentWillUpdate 即将重新渲染组件 新版移除
  1. 组件即将被重新渲染

8. componentDidUpdete 虚拟 DOM 挂载，成为真实 DOM
  1. 往往在该组件中使用 DOM 操作，改变元素


#### 销毁阶段
9. **componentWillUnMount**
  1. 组件从 DOM 树移除的时候触发
  2. 通常在该函数中，销毁一些组件依赖的资源，比如计时器


### 新版生命周期 React > 16.0.0
![生命周期](./img/生命周期.jpg)
constructor -> static getDerivedStateFromProps -> componentDidMount 挂载三步走

### 初始化阶段
1. constructor：初始化阶段，初始化属性和状态
  1. 同一个组件对象只会创建一次
  2. 不能在第一次挂载页面之前，调用 setState。

#### 更新阶段 状态改变，属性更新

2. static getDerivedStateFromProps 从属性中获取新的状态
  1. 通过参数可以获取新的属性和状态
  2. 该函数是静态的
  3. 该函数返回值会覆盖掉组件的状态
  4. 该函数几乎没啥用

3. **shouldComponentUpdata** 是否要重新渲染该组件  性能优化点
  1. 指示 React 是否要重新渲染该组件，通过返回 true 和 false 来指定，
  2. 默认 为 true
 
4. **render** 组件渲染虚拟 DOM
  1. 返回的 React 元素会被挂载到虚拟 DOM 树中，最终渲染到页面的真实 DOM 中
  2. render 可能不止运行一次，只要需要重新渲染，就会重新执行
  3. 严禁使用 setState

5. **componentDidMount** 挂载
  1. 只会执行一次，挂载完成 
  2. 可以使用 setState
  3. 通常情况下，会将网络请求，定时器等等操作写在这里

6. getSnapshotBeforeUptate 获取更新时候的快照
  1. 真实的 DOM 构建完成，还没有渲染到页面中
  2. 在该函数中，通常用于实现一些**附加的 DOM 操作**
  3. 该函数的返回值，会作为 componentDidUpdete 钩子函数的第三个参数

7. componentDidUpdete  虚拟 DOM 挂载，成为真实 DOM
  1. 往往在该组件中使用 DOM 操作，改变元素

#### 销毁阶段
8. **componentWillUnMount**
  1. 组件从 DOM 树移除的时候触发
  2. 通常在该函数中，销毁一些组件依赖的资源，比如计时器


## 表单
- 受控组件和非受控组件
 - 受控组件：组件的使用者，有能力完全控制该组件的行为，无状态组件，
 - 非受控组件：组件的使用者，没有能力控制组件的行为和内容，状态组件


## ref
- 场景：希望直接使用 DOM 元素的方法，或者自定义组件的方法 
1. ref 作用于内置 html 组件，得到的将是真实的 dom 对象
2. ref 作用于类组件，得到的将是类的实列
3. ref不能作用于函数组件
- **谨慎使用 ref**
>ps：ref 不再推荐使用字符串赋值，字符串赋值的方式将来可能会被移除，目前推荐使用对象，或者函数
- **对象** 通过 React.crateRef() 函数创建
```js
import React, { Component } from 'react'

export default class MyRef extends Component {
  state = {
    val: '',
    inpRef: React.createRef()//方式一
    // inpRef: {  //方式二
    //   current: null
    // }
  }
  render() {
    return (
      <div>
        <input ref={ this.state.inpRef} type="text" value={this.state.val} onChange={e => {
          this.setState({
            val: e.target.value
          })
        }}/>
        <button onClick={() => {
          console.log(this.state.inpRef.current)
        }}>聚焦</button>
      </div>
    )
  }
}
```
- **函数**
  -  componentDidMount事件中（挂载完成） 时候可以使用 ref 了
  -  ref 的值发生了变动，旧的函数被新的函数替代，会被调用了两次
```js
import React, { Component } from 'react'

export default class MyRef extends Component {
  state = {
    val: '',
  }
  render() {
    return (
      <div>
        <input ref={ref=>{ ... }} type="text" value={this.state.val} onChange={e => {
          this.setState({
            val: e.target.value
          })
        }}/>
        <button onClick={() => {
        }}>聚焦</button>
      </div>
    )
  }
}
```

## Context：上下文：表示做一些事的环境
- React 中上下文的特点
  1. 当某个组件创建了上下文后，上下文中的数据，会被所以后代组件共享
  2. 如果某个组件依赖上下文，会导致组件不再纯粹（外部数据仅来自于props）
  3. 一般情况下，用于第三方组件（通用组件）

### 旧API
![旧的上下文 API](./react-learn/src/component/OldContext.js)
> 只有类组件才可以创建上下文
- **创建上下文**
  1. 给类组件书写静态属性 childContextTypes，使用该属性对上下文中的数据类型进行约束
  2. 添加实例方法 getChildContext，该方法返回的对象，即为上下文中的数据，该数据必须满足类型约束，该方法会在 render 之后运行，（第一次会在 constructor 时候运行）

- **使用上下文**
- 要求：如果要使用上下文中的数据，组件必须有一个静态属性 contextTypes，该属性描述了需要获取的上下文中的数据类型
  1. 可以在组件的构造函数中，通过第二个参数，获取上下文数据
  2. **从组件的 coontext 属性中获取**
  3. 在函数组件中，通过第二个参数，获取上下文数据

- **上下文中的数据变化**：上下文中的数据不可以直接变化，最终都是状态改变
> ps: 如果上下文重复，组件会拿到最近一级的上下文（就近原则）


### 新的API(真像 vue bus)
![新的上下文 API](./react-learn/src/component/NewContext.js)
- 旧版 API 存在效率和滥用问题
- **创建上下文**
  1. 上下文是一个独立于组件的对象，该对象通过 React.createCoontext(默认值) 创建，返回的是一个包含两个属性的对象
    1. Provider属性：生产者，一个组件，该组件会创建一个上下文
      1. 该属性有一个 value 属性，通过该属性，可以为其他数据赋值
      2. 同一个 Provider，不要用到多个组件，如果需要在其他组件中使用该数据，应该考虑将数据提升到更高到层次
    2. Comsumer属性：消费者，

- **使用上下文**
  1. 在类组件中，直接使用 this.context 获取上下文数据
    1. 要求：必须拥有静态属性 contextType，应赋值为创建的上下文对象
  2. 在函数组件中，需要使用 Comsumer 来获取上下文数据（类也可以使用这种方式）
    1. Comsumer 是一个组件
    2. 它到子节点。是一个函数（它的 props.children 需要传递一个函数）

- **注意细节**
  1. 如果，上下文提供者（Context.Provider）中的 value 更新，会导致使用该上下文的所有后代元素全部重新渲染。无论该子元素是否有优化（无论 shoouldComponentUpdata 函数返回什么结果（强制更新））