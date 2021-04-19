## Vue 源码实现

- **变化侦测篇**：学习Vue中如何实现数据的响应式系统，从而达到数据驱动视图。

- **虚拟 DOM 篇**：学习什么是虚拟 DOM，以及Vue中的DOM-Diff原理

- **模板编译篇**：学习Vue内部是怎么把template模板编译成虚拟DOM,从而渲染出真实DOM

- **实例方法篇**：学习Vue中所有实例方法(即所有以$开头的方法)的实现原理

- **全局 API 篇**：学习Vue中所有全局API的实现原理

- **生命周期篇**：学习Vue中组件的生命周期实现原理

- **指令篇**：学习Vue中所有指令的实现原理

- **过滤器篇**：学习Vue中所有过滤器的实现原理

- **内置组件篇**：学习Vue中内置组件的实现原理

### 变化侦测篇
- Object.defineProperty方法使数据变化变成可观测


### 对 Vue 的理解

- 是一个用于创建用户界面的开源JavaScript框架，也是一个创建单页应用的Web应用框架。

- Vue核心特性：数据驱动视图（MVVM）

- 组件化  一句话来说就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在Vue中每一个.vue文件都可以视为一个组件。

> 组件的优势：降低整个系统的耦合度，提高可维护性，每个组件的职责单一可被复用的，所以对代码进行优化可获得系统的整体升级。调试方便。

- 指令系统：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM，简洁的操作DOM

### Vue 和 React 对比

#### 相同点

- 都有组件化思想

- 都支持服务器端渲染, 都有 Virtual DOM

- 数据驱动视图

- 都有自己的构建工具

- 都有支持 native 的方案：Vue的weex、React的React native

#### 区别

- 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
  - Vue 数替换数据，React是直接新增数据（React认为新增数据的属性更快）

- 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
  - 一个观察者模式一个发布订阅模式？

- diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

## Vue 源码流程：


### 初始化过程：

#### 初始化之前：
- 静态成员初始化：initGlobalAPI(Vue) 
  - config：能挂载相应属性和方法，不能修改
  - util:
  - Vue.set, Vue.delete, Vue.nextTick
  - options: 
    - components / directives / filters：储存全局组件，指令和过滤器
  - _base：Vue 记录 Vue 构造函数
  - extend(Vue.options.components, builtinComponents): 注册全局内置组件 keep-alive
  - initUse(Vue): 注册 Vue.use 用来注册全局插件
  - initMixin(Vue): 注册全局混入
  - initExtend(Vue): 注册 Vue.extend() 基于传入的 options 返回一个组件的构造函数，自定义组件实现
  - initAssetRegisters(Vue): 注册 Vue.directives(), Vue.components(), Vue.filters() 
> vue 组件 继承至 vue 实例 

- 实例成员初始化：instance/index.js
  - initMixin(Vue): 注册 vm 的 _init() 方法，初始化 vm 
  - stateMixin(Vue): 注册 vm 的 $data/$props/$set/$delete/$watch 
  - eventsMixin(Vue): 初始化事件相关的方法： $on/$noce/$off/$emit  
  - lifecycleMixin(Vue): 初始化生命周期相关的混入方式： _update/$forceUpdate/$destroy
    - _update: 核心 是 _patch_ 方法，把虚拟 DOM 转化从真实 DOM，储存到 $el 中去
  - renderMixin(Vue): 混入 render的方法 $nextTick/_render

> _update 需要深入了解

#### 初始化：Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。
- 调用 _init 方法：
  - vm：保存 Vue 实例
  - _uid：唯一标识
  - _isVue = true：Vue 实例不需要被 observe
  - 合并 options
  - initLifecycle(vm)：初始化生命周期相关
  - initEvents(vm)：事件监听的初始化，父组件绑定在当前组件上的事件
  - **initRender(vm)**：vm 编译 render 初始化，slot, createElement attr listeners
  - callHook(vm, 'beforeCreate')
  - initInjections(vm) // resolve injections before data/props
  - **initState(vm)**：初始化了 _props / methods / _data / computed / watch, 进行重名校验后注入到实例中
  - initProvide(vm) // resolve provide after data/props
  - callHook(vm, 'created') 
  - 最后调用 $mount(vm.options.el) 挂载页面

### 首次渲染过程：
- Vue 初始化实例成员，静态成员
- new Vue() 
  - 调用实例的 this._init() 方法
  - 调用 complier 重写的 vm.$mount：把模板编译成 render() 挂载到实例的 render 属性上
    - 如果没有传递 render，把模板编译成 render 函数
    - complieToFunctions 生成 render()
    - options.render = render
    - 这里做的就是编译生成 render 然后执行 运行时的 vm.$mount()
  - 运行时的 vm.$mount()：
    - runtime.js（平台相关，通过 vue-loader 去编译处理，或者使用vue 带编译带的版本） 中的 mount
    - 重新获取 el
    - 执行 mountComponent()
      - mountComponent(this, el)
        - 判断是否有 render 选项，如果没有，但是传入了模板，并且处于开发环境，会抛出警告
        - 触发 beforeMount
        - **定义 updateComponent 方法**: **仅仅是定义了**
          - 调用了 render 和 update 方法，render 方法生成 虚拟 DOM , update 方法 将虚拟 DOM 转化为 真实 DOM，挂载到页面
        - **new Watcher 实例**
          - 传入 vm, updateComponent 等参数，会传入一个首次渲染的 boolean 参数， 确定首次渲染
        - new Watcher 初次渲染会调用一次 get(): 也就是执行 updateComponent()
        - 调用 updateComponent()
          - 调用 vm._render() 返回 vnode
            - 用户传入的render 或者 模板生成的 render
          - 调用 vm.update(vnode, ...) 生成真实 DOM 
            - 调用 vm.__patch__(vm.$el, vnode) 挂载真实 DOM
            - 记录 vm.$el
        - 触发 mounted
        - return vm


### 响应式原理：收集和派发

### Watcher 类： computed watcher， 用户 watcher ， 渲染 watcher

- 当数据发生变化：调用了 dep.notify 方法，通知 watcher ，先把 watcher 放入队列 ， 遍历调用 watcer.run 方法，run 方法又调用了 渲染 watcher 的 updateComponent  方法

- 创建顺序：计算，用户，渲染，id排序
- 执行顺序，id排序执行 flushSchedulerQueue 方法会进行排序



## 源码小结：

### 封装了常用方法：
- 类型判断、类型转换、数据格式转换等方法
- 兼容函数的实现：如 节点操作兼容函数 （万恶的IE 和 old 浏览器）
  - addClass ,removeClass，createElement，appendChild，removeChild：到时候写兼容的时候，可以直接源码拿出来用

### 真的用了很多设计模式
- 发布订阅，观察者，链式调用，单例，组合继承等等。。
- 核心还是发布订阅和观察者。

### 闭包的使用
- cached 函数，一个专门使用闭包 为缓存的函数
- createPatchFunction 当属篇幅最大的使用闭包的函数了，把一堆函数作为闭包，然后返回 一个函数。他最大的作用是 比较更新DOM 节点

### 使用很多标志位
- 标志状态，身份等等
-  多用标志位，控制流程，替代多余的判断（直接判断标志位来确认身份，不用做太多的判断），减少开销


### 学会调试