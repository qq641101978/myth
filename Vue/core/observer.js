
class Observer {
  constructor(value) {
    this.value = value
    if (typeof value === 'object') {
      this.wake(value)
    }
  }

  wake(obj) {
    const keys = Object.keys(obj)
   
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj,keys[i])
    }
    
  }
}

// 在getter中收集依赖，在setter中通知依赖更新。
function defineReactive(obj, key, val) {
  // 如果只传了obj和key，那么val = obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
    new Observer(val)
  }
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep
  console.log(dep)
  Object.defineProperty(obj, key, {
    get() {
      console.log(`${key}属性被读取了`);
      dep.depend()    // 在getter中收集依赖
      return val
    },
    set(newVal) {
      if(val === newVal){
        return
      }
      console.log(`${key}属性被修改了`);
      val = newVal
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}