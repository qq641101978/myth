import * as actionTypes from '../action/action-Type'

/**
 * reducer 本质是一个普通函数
 * @param {*} state 之前仓库的状态
 * @param {*} action 描述要操作的对象
 */
/* eslint import/no-anonymous-default-export: */
export default (state = 10, action) => {
  switch (action.type) {
    case actionTypes.Increase:
      return state + 1
    case actionTypes.Decrease:
      return state - 1
    case actionTypes.Set:
      return action.payload
    default:
      return state
  }
  
}