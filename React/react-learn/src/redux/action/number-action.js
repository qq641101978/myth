import * as actionTypes from './action-Type'

/**
 * action 创建函数 
 * 得到一个用于增加数字的操作 action
 */

export const getIncreaseAction = () => ({
  type: actionTypes.Increase
})
export const getDecreaseAction = () => ({
  type: actionTypes.Decrease
})
export const getSetAction = (payload) => ({
  type: actionTypes.Set,
  payload
})