import number from './number'
import users from './users'
// import { combineReducers } from 'redux'
import { combineReducers } from '../../_redux'

/**
 * 合并的 reducer
 * @param {*} state 
 * @param {*} action 
 */
// export default function reducer(state = {}, action) {
//   return {
//     number: number(state.number, action)
//  }

// }
/**
 * redux 提供的导出
 */
export default combineReducers({
  number,
  // users
})