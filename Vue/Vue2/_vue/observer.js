class Observer {
  constructor(data) {
    if (typeof data === 'object') this.walk(data)
  }

  walk(obj) {
    if (!obj || typeof obj !== 'object') return

    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
   
  }
}

// 在getter中收集依赖，在setter中通知依赖更新。
// 传递第三个参数的原因：直接写 obj[key] 会造成死递归
function defineReactive(obj, key, val) {
  let that = this
  if(typeof val === 'object'){
    new Observer(val)
  }
  // const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep

  Object.defineProperty(obj, key, {
    get() {
      console.log(`${key}属性被读取了`);
      // dep.depend()    // 在getter中收集依赖
      return val
    },
    set(newVal) {
      if(val === newVal){
        return
      }
      console.log(`${key}属性被修改了`);
      val = newVal
      if(typeof vay === 'object') that.walk(newVal)
      // dep.notify()   // 在setter中通知依赖更新
    }
  })
}

// 解决问题：如果 data 是对象，需要递归响应式，如果 data 数据重新赋值一个对象 需要绑定响应式