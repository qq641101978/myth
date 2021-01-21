
import { createStore, bindActionCreators } from '../_redux'
// import { createStore, bindActionCreators } from 'redux'
import * as  numberActions from './action/number-action'
import reducer from './reducer'


const store = createStore(reducer, 10) //获得当前仓库，并调用一次 reducer


store.subscribe(() => {
  console.log('状态变化了', store.getState())
})
// store.dispatch(numberActions.getDecreaseAction())
// console.log(bindActionCreators)
// 使用 bindActionCreators
const boundActiions =  bindActionCreators(numberActions, store.dispatch )
console.log(boundActiions)

boundActiions.getSetAction(20)
boundActiions.getIncreaseAction()