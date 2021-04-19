/**
 * 需要实现：
 * 1. 完成数据到初始化
 * 2. data 中到成员 转化成 getter/setter 注入到实例中上（data内部属性没有做判断）
 * 3. 将 data 数据遍历转化成响应式，
 * 4. 编译模版
 */
class Vue {
  constructor(options) {
    // 完成数据初始化
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$set  = this._set
    // data 中到成员 转化成 getter/setter 注入到实例中去
    this._proxyData(this.$data)

    // 响应式数据
    new Observer(this.$data)

    // 编译
    new Compiler(this)
  }

  _proxyData(data) {
    Object.keys(data).forEach(key => {
      // 注入到实例中去 this
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
  // 简陋的 set
  _set(obj, key, value) {
    Observer.prototype.defineReactive(obj, key, value)
  }
}
