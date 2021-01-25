export const Increase = Symbol('increase')
export const Decrease = Symbol('Decrease')
export const Set = Symbol('Set')
/**
 * action 创建函数 
 * 得到一个用于增加数字的操作 action
 */

export const getIncreaseAction = () => ({
  type: Increase
})
export const getDecreaseAction = () => ({
  type: Decrease
})
export const getSetAction = (payload) => ({
  type: Set,
  payload
})