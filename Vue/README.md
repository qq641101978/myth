# vue

### vue 首屏优化：资源加载优化 和 页面渲染优

- 白屏原因：加载资源过多，和请求时间过长，（vue3大概了是请求造成的白屏问题）

SPA --> 单页
加载过程：html 静态资源 =>解析 js =>请求

- html 静态资源：可骨架屏，GPU 加速渲染

- 解析 js：可分包, ES2020 import 的动态模块提案

- 减小入口文件积：路由懒加载
- 静态资源本地缓存：采用HTTP缓存，设置Cache-Control，Last-Modified，Etag等响应头
- UI框架按需加载
- 图片资源的压缩：nginx 压缩，雪碧图（老技术，解决请求压力）
- 组件重复打包：重复用到的文件，在 webpack 配置抽离公共化
- 开启GZip压缩：打包时候配置 webpack 压缩，compression-webpack-plugin
- 使用SSR：也就是服务端渲染，组件或页面通过服务器生成html字符串，再发送到浏览器

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

## 总结
- Vue.js 3.0 核⼼优势：
  - 没有 this，没烦恼；
  - 更好的类型推导能⼒（TypeScript）；
  - 更友好的 Tree-shaking ⽀持（渐进式体验）；
  - 更⼤的代码压缩空间；
  - 更灵活的逻辑复⽤能⼒。


## 源码：

### UI = render(state)：Vue的作用就是相当于 render函数，状态（state）一旦变化，视图（UI)也就会相对应的变化

### 问题一：Vue怎么知道状态的变化，怎么实现一套数据监听机制？
- SE6 之前：Object.defineProperty，ES6之后：Proxy，实现数据的监听

### 扩展问题：Object.defineProperty 和 Proxy 的区别：
- Object.defineProperty： 只能实现对属性的单个监听，只能监听现有的属性，无法对数据的添加和删除进行监听（解决这个问题 Vue增加了两个全局API:Vue.set和Vue.delete）
- Proxy：能实现对整个对象对监听，能监听新创建的属性。是 Object.defineProperty 的功能完善

### 数据的变化怎么驱动视图更新？
- 对依赖数据的视图，在数据变化时候，通知对应的视图更新。
- 在 getter 中收集依赖，在 setter 中通知依赖更新。

### 扩展问题，如何实现数组的可观测
- 将数组方法拦截，重写。拦截 __proto__
- 数组新增元素的侦测：push、unshift、splice 特殊重写

### 绕不开的虚拟 DOM 和 diff 算法：用 JS 的计算性能来换取操作 DOM 所消耗的性能
- 当数据发生变化时，我们对比变化前后的虚拟 DOM 节点，通过 DOM-Diff 算法计算出需要更新的地方，然后去更新需要更新的视图。

- 用一个 js 对象，描述一个 DOM 元素
```js
<div class="a" id="b">我是内容</div>

{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}
```
### 可描述的节点
- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式组件节点
- 克隆节点
### VNode 作用
- 在视图渲染之前，把写好的 template 模板先编译成 VNode 并缓存下来，等到数据发生变化页面需要重新渲染的时候，把数据发生变化后生成的 VNode 与前一次缓存下来的 VNode 进行对比，找出差异，然后有差异的 VNode 对应的真实 DOM 节点就是需要重新渲染的节点，最后根据有差异的 VNode 创建出真实的 DOM 节点再插入到视图中，最终完成一次视图更新。

### DOM-Diff: patch(对 新旧节点 修修补补)
- 以新节点为基础，进行对比操作，在旧 VNode 上修修改改， 返回一份旧的 VNode
  - 创建节点：新的 VNode 中有而旧的 oldVNode 中没有，就在旧的 oldVNode 中创建。
  - 删除节点：新的 VNode 中没有而旧的 oldVNode 中有，就从旧的 oldVNode 中删除。
  - 更新节点：新的 VNode 和旧的 oldVNode 中都有，就以新的 VNode 为准，更新旧的 oldVNode。  
- patch 过程
  - 新旧节点一致，退出
  - 新旧节点都是静态节点，退出
  - 新旧节点都是文本节点，对比文本，不同，旧节点替换成新的，
  - 新旧节点都有子节点，对比子节点，不同，旧节点替换成新的（有优化，子节点如何对比），
  - 只有新节点有子节点，旧节点添加子节点（清空旧子节点的文本），
  - 只有旧节点有子节点，清空旧节点的子节点
  - 只有旧节点有文本，清空旧节点文本

- 静态节点：渲染一次不会再更新的节点，性能优化的点

### 扩展问题，操作DOM 耗费性能的原因
- dom操作影响性能最主要是因为它导致了浏览器的重绘（repaint）和重排（reflow）
- 浏览器标准把 DOM 设计的非常复杂
- 在浏览器中DOM的实现和ECMAScript是分离的。

### VNode 的来源：模板编译
- template 模板内容，对 Vue 来说是一堆字符串，需要处理成 AST，然后生成渲染函数
- template 模板内容经过 render 函数生成 VNode
  - 模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST，根据解析内容的不同分为 HTML 解析器，文本解析器和过滤器解析器。 
    - const ast =parse(template.trim(), options):parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。
  - 优化阶段：遍历 AST，找出其中的静态节点，并打上标记
  - 代码生成阶段：将 AST 转换成渲染函数

### 扩展问题：为什么不直接把 AST 直接解析成 VNode 对象 ？

- 代码生成其实就是根据模板对应的抽象语法树 AST 生成一个函数供组件挂载时调用，通过调用这个函数就可以得到模板对应的虚拟 DOM。

### 模板编译的最终目的
- 模板编译就是一台机器，给它输入模板字符串，它就输出对应的render函数。

### Vue 生命周期的四个阶段
- 初始化阶段：为 Vue 实例上初始化一些属性，事件，以及响应式数据
- 模板编译阶段：将模板编译成渲染函数
- 挂载阶段：将实例挂载到指定到 DOM 上，即将模板渲染到真实 DOM 上
- 销毁阶段：将实例自身从父组件中删除，并取消依赖追踪以及事件监听器。

### 扩展问题：初始化阶段具体做了什么
- 创建一个 Vue 实例
- 为创建好的 Vue 实例初始化 事件，属性，响应式数据等

- 初始化做完：判断用户是否传入 el 如果传入则调用 $mount 函数进入模板编译和挂载阶段，如果没有传入 el 则不会进入下一个生命周期，需要用户手动执行 vm.$mount 方法才会进入下一个生命周期


### 扩展问题：销毁阶段，注册到事件超出了组件范围（如注册到了body身上），Vue 能否自动解绑

### vue histroy 模式 nginx 和 node服务 对应的配置
- nginx： location 中配置 try_files $uri $uri/ /index.html ： 尝试找 对应 uri 内容，如果找不到 返回 index.html
- node：安装对应的 histroy 模块