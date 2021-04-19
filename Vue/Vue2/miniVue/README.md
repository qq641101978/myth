# 实现 miniVue

### 构造 Vue 实例: Vue
- 实现 Vue 构造函数：
  - 属性方法：
  - 属性：$data, $options, $el 
  - 方法：_proxyData
    - _proxyData: 将 data 的属性转化成 getter/setter，并注入实例

### data 响应式: Observer
- 将 data 数据转化成响应式
  - 属性方法：
    - 属性：
    - 方法：walk, defineReactive
      - walk: 遍历 data
      - defineReactive: 创建响应式
  - data 属性中对象的响应式处理
  - data 属性被赋值为新对象，也需要响应式 

### 编译dom: Compiler
  - 属性方法：
    - 属性：vm, el
    - 方法：complier, compileElement, textUptater, modelUpdater, compileText, isDirective, isTextNode, isElementNode,
      - complier: 遍历 el 区分 元素节点，文本节点，检测节点是否有子节点，有的话递归遍历
      - compileElement: 处理元素节点，检测属性是否有 v-，有的话，触发对应的 textUptater， modelUpdater
      - compileText: 处理文本节点的差值表达式
      - isDirective, isTextNode, isElementNode: 判断 指令，文本节点，元素节点
- 获取当前 dom 元素，遍历节点
- 处理差值表达式：{{}}
- 处理元素节点的 v- 属性

### 创建依赖收集 和 依赖监听：Dep 和 Watcher
- Dep: 依赖收集，收集 每个数据对应的 Watcher  数组
  - 属性方法:
    - 属性: subs
  - 依赖在 get 的时候收集 addSub 
  - 依赖在 set 的时候触发更新 notify
- Watcher: 创建监听实例
  - 属性方法:
    - 属性: vm ,key
    - 方法: cb
  - 在何时创建实例：在 compiler 时候，创建监听。
  - 添加: 在属性 getter 的时候收集
  - 触发: 在属性 seter 时候触发，

## 问题来了  
1.  vm.$set 方法如何实现:
  - 给 vm 新增属性