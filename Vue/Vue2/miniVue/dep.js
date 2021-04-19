/**
 * 对每个data属性 进行依赖收集， 在属性修改时，触发notify
 */
class Dep{
  subs = []

  addSub(sub) {
    sub && sub.update && this.subs.push(sub)
   }

  notify() {

    console.log(this.subs)
    this.subs.forEach(sub => sub.update())
  }
}