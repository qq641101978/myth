
// 坷里化
const curry = (fn) => {
  const curryFn = (...args) => {
    return fn.length > args.length ? (...newAgrs) => curryFn(...args, ...newAgrs) : fn(...args)
  }
  return curryFn
}

// 函数组合
const compose = (...fns) => (v) => fns.reduceRight((acc, fn) => fn(acc), v)


// 测试函数
const reverse = arr => arr.reverse()
const fisrt = arr => arr[0]
const toUpper = s => s.toLocaleUpperCase()

// 辅助函数
// 查看组合传递的结果
const log = v => {
  console.log(v)
  return v
}
// 查看执行过程
const trace = curry((tag, v) => {
  console.log(tag, v)
  return v
})

// 一次性函数：利用锁
const noce = (fn) => {
  let flag = false
  return (...args) => {
    if (!flag) {
      flag = true
      return fn(...args)
    }
  }
}

// 缓存函数，记忆函数
const memoize = (fn) => {
  const cache = {}
  return (...args) => {
    let key = JSON.stringify(...args)
    cache[key] = cache[key] || fn(...args)
    return cache[key]
  }  
}

// 函子 => 像一个盒子：维护一个值，永远不对外部暴露，通过 map 方法操作
class Container {
  static of(value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

// 函子参数异常问题解决
class Maybe {
  static of (v) {
    return new Maybe(v)
  }
  constructor(v){
    this._v  = v
  }
  nap(fn) {
    return this.isNothing() ? Maybe.of(null) : fn(this._v)
  }
  isNothing() {
    return this._v === null || this._v === undefined
  }
}

// Either 函子：处理异常（副作用）
// Left 返回异常函子
class Left {
  static of (v) {
    return new Left(v)
  }
  constructor(v){
    this._v  = v
  }
  nap(fn) {
    return this
  }
}

// 正常执行函子
class Right {
  static of (v) {
    return new Right(v)
  }
  constructor(v){
    this._v  = v
  }
  nap(fn) {
    return Right.of(fn(this._v))
  }
}

// 测试
const parseJSON = (str) => {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({error: e.message})
  }
}

// IO 函子：甩锅函子，把不纯操作延迟到调用时候
class IO {
  static of(v) {
    return new IO(()=> v)
  }
  constructor(fn) {
    this._v = fn
  }
  map(fn) {
    return new IO(compose(fn, this._v))
  }
}

// 测试
let i = IO.of(()=> 123).map(x => console.log('x', x))
// console.log(i._v())