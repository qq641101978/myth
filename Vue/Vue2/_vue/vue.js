/**
 * 1. 通过属性保存选项等数据
 * 2. 把 data 转化成 getter/setter，注入 Vue 实例
 * 3. 调用 obsever 对象，监听数据变化
 * 4. 调用 compiler 对象，解析指令和表达式
 */
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项等数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    
    // 2. 把 data 转化成 getter/setter，注入 Vue 实例
    this._proxyData(this.$data)

    // 3. 调用 obsever 对象，监听数据变化
    new Observer(this.$data)
  } 
  _proxyData(data) {
    Object.keys(data).forEach(key => {
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
}