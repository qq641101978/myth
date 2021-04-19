class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$set = this._set
    this._proxyData(this.$data)

    new Observer(this.$data)

    new Compiler(this)
  }
  _proxyData(data) {
    Reflect.ownKeys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) return

          data[key] = newValue
        }
      })
    })
  }

  _set(obj, key, val) {
    Observer.prototype.defineReactive(obj, key, val)
  }
}

class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(obj) {
    if (!obj || typeof obj !== 'object') return
    Reflect.ownKeys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive(obj, key, val) {
    let that = this
    this.walk(val)
    
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        that.walk(newVal)
        dep.notify()
      }
    })
  }
}

class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm

    this.compiler(this.el)
  }

  compiler(node) {
    let { childNodes } = node
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) this.compileElement(node)

      if (this.isTextNode(node)) this.compileText(node)

      if(node.childNodes && node.childNodes.length) this.compiler(node)
    })

  }
  // 解析指令
  compileElement(node) {
    let { attributes } = node

    Array.from(attributes).forEach(attr => {
      let { name: attrName, value: key } = attr
      if (this.isDirective(attrName)) {

        attrName = attrName.substr(2)
        this[`${attrName}Updater`] && this[`${attrName}Updater`](node, this.vm[key], key)
      }
    })
  }

  textUpdater(node, val, key) {
    node.textContent = val

    new Watcher(this.vm, key, (newVal) => {
      node.textContent = newVal
    })
  }

  modelUpdater(node, val, key) {
    node.value = val

    new Watcher(this.vm, key, (newVal) => {
      node.value = newVal
    })
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // 解析差值
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    if (reg.test(node.textContent)) {
      let key = RegExp.$1.trim()
      node.textContent = this.vm[key]

      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal
      })
    }
  }

  isTextNode(node) { 
    return node.nodeType === 1
  }
  
  isElementNode(node) { 
    return node.nodeType === 1
  }
  
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  
}

class Dep{
  subs = []

  addSub(sub) {
    sub && sub.update && this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.oldVal = this.vm[this.key]
    Dep.target = null
  }

  update() {
    let newVal = this.vm[this.key]

    if(newVal !== this.oldVal) this.cb(newVal)
  }
}