class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(obj) {
    if (!obj || typeof obj !== 'object') return
    Object.keys(obj).forEach(key => this.defineReactive(obj, key, obj[key]))
  }

  defineReactive(obj, key, val) {
    let that = this
    if (typeof val === 'object') this.walk(val)
    // 负责收集依赖
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // console.log(`${key}属性被读取了`);
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) return
        // console.log(`${key}属性被修改了`);
        val = newVal
        that.walk(newVal)
        dep.notify()
      }
    })
  }
}
