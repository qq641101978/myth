/**
 * 操作 dom
 */
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm

    this.compiler(this.el)
  }
  /**
   * 编译模版，处理文本节点和元素节点
   * 递归节点，把节点归类
   */
  compiler(el) {
    const { childNodes } = el
    Array.from(childNodes).forEach(node => {

      if (this.isTextNode(node)) this.compileText(node)

      if (this.isElementNode(node)) this.compileElement(node)

      // 递归
      if(node.childNodes && node.childNodes.length) this.compiler(node)
    })
  }
  /**
   * 编译元素节点和处理指令
   * 遍历属性节点，
   * 判断是否有指令
   */
  compileElement(node) {
    node.attributes.length && Array.from(node.attributes).forEach(attr => {
      let { name: attrName, value: key } = attr
      if (this.isDirective(attrName)) {
        // 截取掉 v-
        attrName = attrName.substr(2) 

        // 执行对应的指令
        this[`${attrName}Updater`] && this[`${attrName}Updater`](node, this.vm[key], key)

        
      }
    })
  }
  /**
   * text指令 解析
   */
  textUpdater(node, value, key) {
    node.textContent = value
    // 创建 Watcher 对象，当数据改变，更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
      node.value = newValue
    })
  }
  /**
   * model指令 解析
   */
  modelUpdater(node, value, key) {
    node.value = value
    // 创建 Watcher 对象，当数据改变，更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 注册双向绑定事件
    node.addEventListener('input', (e) => {
      this.vm[key] = node.value
    })
  }
  /**
   * 编译文本节点，处理差值表达式，这里功能残缺
   * 问题：源码中如何处理 变量计算
   */
  compileText(node) { 
    let reg = /\{\{(.+?)\}\}/  // 匹配双括号内到值
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建 Watcher 对象，当数据改变，更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  
  /**
   * 判断元素是否有 v- 属性
   */
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  /**
   * 判断文本节点
   */
  isTextNode(node) {
    return node.nodeType === 3
  }
  /**
   * 判读元素节点
   */
  isElementNode(node) {
    return node.nodeType === 1
  }
}