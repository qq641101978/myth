import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

//第三方中间件的使用

// const store = createStore(reducer, applyMiddleware(thunk, logger))

// // 使用 bindActionCreators
// const boundActiions =  bindActionCreators(numberActions, store.dispatch )
// boundActiions.getIncreaseAction()
// boundActiions.getIncreaseAction()


export default createStore(reducer,
  applyMiddleware(
    thunk,
    logger,
  )
)