import isPlainObject from './utils/isPlainObject'
export default function combineReducers(reducers) {
  validateReducers(reducers)
  /**
   * 返回一个 reducer函数
   */
  return function (state = {}, action) {
    const newState = {}
    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        const reducer = reducers[key]
        newState[key] = reducer(state[key], action)
      }
    }
    return newState
    
  }
}
/**
 * 验证数据是否正确
 */
function validateReducers(reducers) {
  if (typeof reducers !== 'object') throw new TypeError('reducers 必须是一个对象')
  if (!isPlainObject(reducers)) throw new TypeError('action 不是一个 plain-object')
  // 验证 reducer的返回结果是不是 undefined
  for (const key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      const reducer = reducers[key]

      let state = reducer(undefined, {
        type: `@@redux/INIT${Math.random().toString(36).substring(2, 7)}`
      })
      if (state === undefined) throw new TypeError('reducer 不能返回 undefined')
      state = reducer(undefined, {
        type: `@@redux/PROBE_UNKNOWN_ACTION9${Math.random().toString(36).substring(2, 7)}`
      })
      if (state === undefined) throw new TypeError('reducer 不能返回 undefined')
    }
  }
}

