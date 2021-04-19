class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 把 watcher 记录到 Dep 的静态属性 target 中
    Dep.target = this
    //  这里会触发 observer 的 get 操作，然后调用 dep 的 addSubs
    this.oldValue = vm[key]

    Dep.target = null
  }
  // 数据改变 调用 cb 更新视图
  update() {
    let newValue = this.vm[this.key]

    if(newValue !== this.oldValue) this.cb(newValue)
  }
}