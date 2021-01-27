import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import asgaTask from './saga'
//第三方中间件的使用
const sagaMid = createSagaMiddleware()
export default createStore(reducer,
  applyMiddleware(
    sagaMid,
    logger,
  )
)

// 启动 saga 任务
sagaMid.run(asgaTask)