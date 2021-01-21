import number from './number'
import { combineReducers } from 'redux'
/**
 * 合并的 reducer
 * @param {*} state 
 * @param {*} action 
 */
export default function reducer(state = {}, action) {
  return {
    number: number(state.number, action)
  }

}
/**
 * redux 提供的导出
 */
// export default combineReducers({
//   number
// })