// store 源码实现
// 1、维护状态 state
// 2、修改实现 commit
// 3、业务逻辑控制实现 dispatch
// 4、状态派发 getter
// 5、实现 state 响应式
let Vue
function install (_Vue, storeName = '$store') {
  Vue = _Vue
  // 混入
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) Vue.prototype[storeName] = this.$options.store
    }
  })
}
class Store {
  // options = { state:{num:0},mutations:{addNum(state){}}}
  constructor (options = {}) {
    // 利用响应式
    this.state = new Vue({
      data: options.state
    })
    // 初始化 mutations
    this.mutations = options.mutations || {}
    this.actions = options.actions || {}
    options.getter && this.handleGetters(options.getter)
  }

  // 实现commit,使用箭头函数，this，指向 Store
  commit = (type, arg) => {
    const fn = this.mutations[type]
    fn(this.state, arg)
  }

  // dispatch,使用箭头函数，this，指向 Store, return 出函数结果。（这里常是异步逻辑操作）
  dispatch = (type, arg) => {
    const fn = this.actions[type]
    return fn({ ...this }, arg)
  }

  // 定义只读属性get
  handleGetters (getter) {
    this.getter = {}
    Object.keys(getter).map(key => {
      Object.defineProperty(this.getter, key, {
        get: () => {
          return getter[key][this.state]
        }
      })
    })
  }
}
// 导出对象当作 vuex
export default { Store, install }
