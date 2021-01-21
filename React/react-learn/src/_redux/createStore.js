/**
 * 实现createStore
 * @param {Function} reducer 
 * @param {any} defaultState 
 */
export default function createStore (reducer, defaultState) {
  const currentReducer = reducer // 当前使用的 reducer
  let currentState = defaultState // 当前仓库状态
  const listeners = [] // 记录所有的监听器

  const dispatch = (action) => {
    // 验证 action
    if (!isPlainObject(action)) throw new TypeError('action 不是一个 plain-object')
    // 验证 type
    if (action.type === undefined) throw new TypeError('action 必须要有 type 属性 ')
    // 调用reducer
    currentState = currentReducer(currentState, action)

    // 运行所有监听器
    for (const listener of listeners) {
      listener()
    }
  }
  const getState = () => currentState
  /**
   * 添加一个监听器（订阅器）
   */
  const subscribe = (listener) => { 
    listeners.push(listener)
    // 移除监听器
    let isRemove = false
    return () => {
      if(isRemove) return
      const i = listeners.indexOf(listener)
      listeners.splice(i, 1)
      isRemove = true
    }
  }
  // 创建仓库时，需要分发一次初始的 action
  dispatch({
    type: `@@redux/INIT${Math.random().toString(36).substring(2, 7)}`
  })
  return {
    dispatch,
    getState,
    subscribe
  }
}

/**
 * 验证 obj 是否是 plain-object
 * @param {*} obj 
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object') return false

  return Object.getPrototypeOf(obj) === Object.prototype

}