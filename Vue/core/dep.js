class Dep{
  subs = []
  // 添加 依赖
  addSubs(sub) {
    console.log('收集依赖')
    this.subs.push(sub)
  }
  // 删除依赖
  removeSub(sub) {
    this.subs.length && (this.subs.indexOf(sub) > -1) && this.subs.slice(_index, 1)
  }
  // 添加一个依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知更新
  notify() {
    console.log('更新依赖')
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}