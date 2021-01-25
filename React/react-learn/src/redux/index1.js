/* eslint-disable no-unused-vars */
// import { createStore, bindActionCreators } from '../_redux'
import { createStore, bindActionCreators, applyMiddleware } from 'redux'
import * as  numberActions from './action/numberAction'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// const store = createStore(reducer) //获得当前仓库，并调用一次 reducer


// const Unsubscribe =  store.subscribe(() => {
//   console.log('状态变化了', store.getState())
// })
// Unsubscribe()
// store.dispatch(numberActions.getDecreaseAction())


// // 使用 bindActionCreators
// const boundActiions =  bindActionCreators(numberActions, store.dispatch )
// boundActiions.getSetAction(20)
// boundActiions.getIncreaseAction()

// 中间件: 改写 dispatch ，获取旧数据，改变数据的action，新数据

// const oldDispatch = store.dispatch
// store.dispatch = (action) => {
//   console.log('旧数据', store.getState())
//   console.log('action', action)
//   oldDispatch(action)
//   console.log('新数据', store.getState())
//   console.log('')
// }
// store.dispatch(numberActions.getDecreaseAction())

//第三方中间件的使用

const store = createStore(reducer, applyMiddleware(thunk, logger))

store.dispatch(numberActions.getDecreaseAction())
store.dispatch(numberActions.getDecreaseAction())