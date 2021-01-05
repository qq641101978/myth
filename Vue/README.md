# vue

### vue 首屏优化

- 白屏原因：加载资源过多，和请求时间过长，（vue3大概了是请求造成的白屏问题）

SPA --> 单页
加载过程：html 静态资源 =>解析 js =>请求

- html 静态资源：可骨架屏，GPU 加速渲染

- 解析 js：可分包, ES2020 import 的动态模块提案

- ajax 请求：可缓存

### vue 自身对性能优化做的事情

- 更新视图会延时：每次有新的数据变更要放入队列时都会进行判断，如果已存在则跳过，等所有变更都添加到队列后再进行统一更新操作。这么做的好处是如果同一个 watcher 被多次触发，只会被推入到队列中一次，从而避免了同一时刻重复操作 DOM 导致性能损耗。具体实现是通过调用 queueWatcher() 函数

### veu 的一些操作

- 实现每个实例都是独立对象：data 函数返回一个对象，而不是直接设置一个对象。（组件复用理解）

### 状态管理库的特点（vuex）：可预测，中心化，可调试

- 可预测：状态随动
- 中心化：构建一颗状态树
- 可调试：插件可以追踪调试



## vue3

- 项目创建：在原有的 vue2 项目 执行命令 vue add vue-next
- 项目创建：npm init vite-app 项目名
 - 好处：每次执行都是使用最新的 vite-app 搭建项目
- 使用具名导出：
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

```
### vite 和 webpack 比较
- webpack 会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。

- 而 vite 是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。

- 由于现代浏览器本身就支持 ES module，会自动向依赖的 Module 发出请求。vite 充分利用了这点，将开发环境下的模块文件，作为浏览器要执行的文件，而不像 webpack 那样进行打包合并。

- 由于 vite 在启动项目的时不用打包。也就意味着不需要分析模块依赖，不需要编译，因此启动速度非常快。当浏览器请求某个模块时，
再根据需要对模块进行编译。这种按需求动态编译的方式，极大的缩减了编译时间，项目越复杂，模块越多，vite的优势越明显。

- 在 HMR 方面，当改动了一个模块，仅需要让浏览器重新请求该模块即可，不像 webpack 那样需要把该模块的相关依赖全部编译一次。

- 当需要打包到生成环境时，vite 使用传统的 rollup 进行打包，因此，vite的主要优势在开发阶段。另外，由于 vite 利用 ES Module, 因此在代码中不可以使用 CommonJS（因为浏览器不认识它）

> ps:开发是真的爽！！！


### compositon api
- vue3 之前，都是配置式代码：option api
- option api 存在的缺陷：在复杂应用的情况下，代码散乱，不好维护
- compositon api： 高内聚，

## vue3 的优化 - 静态话，标记

### 静态提升，减少内存占用
- 静态节点提升
- 静态属性提升

### 预字符串化
- 对于大量对静态元素，直接编译成字符串
### 缓存事件处理函数
- 对不可变事件进行缓存，不用重新创建
### Block Tree
- 标记动态的节点，不用去比树的全部节点
### PatchFlag - 比对标记
- 比对标记，不用比对每一个节点

## 为什么 vue3 中去掉了构造函数？
- 去掉 this
- 一个页面有多个 vue
- vue2 的静态方法，不利于隔离 
- vue2 集成功能太多

## vue3 响应式
- 采用 es6 的新语法 proxy
- vue2 需要遍历属性去实现响应式

## 关于 v-for 和 v-if
- vue3中规定：v-if 的优先级高于 v-for
 

## 关于 key
- 当使用 <template> 进行 v-for 循环时，需要吧 key 值放到 <template> 中，而不是它的子元素中
- 当使用 v-if v-else-if v-else 分支的时候，不再需要指定 key 值，因为 vue3 会自动给予每个分支一个唯一的key
- 即便要手动给予 key 值，也必须给予每个分支唯一的 key，不能因为要重用分支而给予相同的 key

- 关于 Fragment 
- vue3 现在允许组件出现多个根节点

## 异步组件
vue 中的 defineAsyncComponent 函数：返回一个 promise

## 响应式 api：reacttivity api
>  ps：ref，computed
### api
- reactive: 深度代理对象的所有成员
- readonly：只能读取代理对象中的成员，不能修改
- ref：对 value 的访问是响应式的，如果给 value 是一个对象 ，则会通过 reactive 函数进行代理，如果已经是代理，则直接使用代理
- computed：当读取 value 值时，会根据情况决定是否哦要运行函数
### 判断 inProxy isReactive isReadonly isRef
- 判断响应式数据类型

### 应用：
- 如果想要让一个对象变为响应式数据，可以使用 reactive 或 ref
- 如果想要让一个对象的所有属性只读，可以使用 readonly
- 如果想要一个非对象的数据变为响应式数据，使用 ref
- 如果想要根据已知的响应式数据得到一个新的响应式数据，使用 comptued

## 监听数据变化：异步执行（微队列）
- watchEffect: 自动监听
- watch：手动
- 除非遇到如下场景，都推荐使用 watchEffect
- 不希望回调函数一开始就执行
- 数据改变时，需要参考旧值
- 需要监控一些回调函数中不会用到的数据（某些数据变，去通知服务器）
```js
const state = reactive({a:1, b:2})
const count = ref(0)
watchEffect(()=>{
  console.log(state.a ,state.b) //自动监听到 state.a， state.b
})
// 不能直接写 state.a ，因为表达式计算后是一个原始值
wacth(state.a, (newValue, oldValue) => {
  console.log(`新${newValue}旧${oldValue}`)
})
// 下面方式可以
wacth(()=>{ state.a }, (newValue, oldValue) => {
  console.log(`新${newValue}旧${oldValue}`)
})
// 监听多个值
wacth([()=>{ state.a }, count], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
  console.log(`新${newValue1}${newValue2}旧${oldValue1}${oldValue2}`)
})
```


## 降低心智负担：不用去思考他返回的响应式类型
- 所有的 composition function 均以 ref 的结果返回，以保证 setup 函数的返回结果中不包含 reactive 或 readonly 直接产生的数据，（因为数据解构的时候可能会失去响应）
``` js
setup() {
  const state = {}
  return toRefs(state)
}
```
## setup
- 不同于 响应式 api，composition api 提供的函数很多是与组件深度绑定的，不能脱离组件存在
- setup 只会运行一次的函数，比组件创建还早执行（created 钩子）。this 指向 undefind
- 两参数 props content

### 配合vue 食用的动画 gsap
https://cloud.tencent.com/developer/article/1599224