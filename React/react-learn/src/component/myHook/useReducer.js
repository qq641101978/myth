import { useState } from "react";

/**
 *
 * @param {Function} reducer
 * @param {any} initalState  初始值
 * @param {Function} initFn 计算初始值的函数
 * 还可以继续封装成公共的 初始值，和 reducer 函数
 * ps：官方已经封装好了 useReducer
 */
export default function useReducer(reducer, initalState, initFn) {
  const [state, setState] = useState(initFn ? initFn(initalState) : initalState)

  function dispatch(action) {
    const newState = reducer(state, action)
    console.log(`日志：state的值${state}-->${newState}`)
    setState(newState)
  }

  return [state, dispatch]
}
