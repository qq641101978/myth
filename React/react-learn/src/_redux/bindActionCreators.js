export default function bindActionCreators(actions, dispatch) {
  if (typeof actions === 'function') {
    return getAutoDispatchActionCreator(actions, dispatch)
  }
  else if (typeof actions === 'object') {
    const result = {}
    for (const key in actions) {
      if (actions.hasOwnProperty(key)) {
        if (typeof actions[key] === 'function') {
          result[key] = getAutoDispatchActionCreator(actions[key], dispatch)
        }
        else {
          throw new TypeError(`${key} 不是一个函数'`)
        }
      }
    }
    return result
  }
  else {
    throw new TypeError('action 不是一个对象或者一个函数')
  }
}

/**
 * dispatch 增强函数
 * @param {*} actionCreator 
 * @param {*} dispatch 
 */
function getAutoDispatchActionCreator(actionCreator, dispatch) {
  return (...args) => {
    dispatch(actionCreator(...args))
  }
}