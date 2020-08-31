// router 源码实现
// 1、能解析出 routes配置，变成一个 key 为 path，value 为 component 的 map
// 2、能监控url的变化事件，把最新的 hash 值保存到 current 路由
// 3、定义两个全局组件：router-view (显示组件内容) 和 router-link (用于修改hash)
// 4、current 是响应式的，可以触发 router-view 重新渲染 (响应不成功,原因是没有改变 this 指向)

let Vue // install 赋值上 vue 实例

class VueRouter {
  constructor (options) {
    this.$options = options

    // 创建一个 路由 path 和 route 的 映射关系
    this.routeMap = {}

    // current 路径需要响应式，借助vue实现
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }

  init () {
    // 绑定事件
    this.bandEvents()
    // 解析路由配置
    this.createRouteMap(this.$options)
    // 创建组件
    this.initComponent()
  }

  bandEvents () {
    // 在页面 load 和 hash 时触发事件
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange () {
    // http://localhost/#home  截取 # 号后面的 url（如 #home）
    this.app.current = window.location.hash.slice(1) || '/'
  }

  createRouteMap (options) {
    options.routes.map(item => {
      // ['/home']: {path:'/home',component:Home}
      this.routeMap[item.path] = item
    })
  }

  initComponent () {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        // 目标： 渲染一个 a 标签 添加对应的 href
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        // jsx 写法
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })
    // 展示对应组件
    // hash => current => render
    Vue.component('router-view', {
      // 修改为箭头函数，this 指向变化为当前类的实例 VueRouter
      render: (h) => {
        // console.log('渲染模版')
        const Comp = this.routeMap[this.app.current].component
        return h(Comp)
      }
    })
  }
}
// 把 VueRouter 变为插件：实现 install 方法
VueRouter.install = function (_Vue) {
  Vue = _Vue // 挂载vue
  // 混入
  Vue.mixin({
    // 代码会在初始化的时候被调用，实现 vue 的扩展
    // beforeCreate 会在组件创建的时候都执行 (但是这里只希望跟组件执行一次)
    // this 指向 vue 组件实例
    beforeCreate () {
      // 因为只有根组件挂载了 router 所以
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}

export default VueRouter
