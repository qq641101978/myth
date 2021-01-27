
/**
 * 
 * @param  {...any} middlweares 中间件创建函数，得到新的dispatch
 * middlweares的本质，是一个调用后可以得到 dispatch 创建函数的函数
 * compose：函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际是反向调用之前组合的函数
 */
export default function applyMiddleware(...middlweares) {
  // 给我创建仓库的函数
  return function (createStore) {
    // 创建仓库，改写dispatch
    return function (reducer, defaultState) {
      const store = createStore(reducer, defaultState)
      let dispatch = () => { throw new TypeError('目前不能使用 dispatch') }
      // 给 disptch 赋值
      // 根据中间件数组，得到一个 dispatch 创建数组
      const dispatchProducers = middlweares.map(mid => mid({
        getState: store.getState,
        dispatch: store.dispatch,
      }))
      dispatch = compose(...dispatchProducers)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args //没有要组合的函数，则返回原封不动的参数
  }
  else if (funcs.length === 1) {
    return funcs[0]
  }
  //优化
  return funcs.reduce((a,b) => (...args) => a(b(...args)))

  // return (...args) => {
  //   let lastReturn = null // 记录上一个函数的返回值，作为你下一个函数的参数
  //   for (let i = funcs.length - 1; i > 0; i--){
  //     const func = funcs[i]
  //     if (i === funcs.length - 1) { // 数组最后一项
  //       lastReturn = func(...args)
  //     }
  //     e lse {
  //       lastReturn = func(lastReturn)
  //     }
  //   }
  // }
}
// function fn1(n) {
//   return n * 2
// }
// function fn2(n) {
//   return n * n
// }

// const func = compose(fn1, fn2)
// console.log(func(3)) //12