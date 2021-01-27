import { all, call, delay, put, select, take, takeEvery } from 'redux-saga/effects'
import * as  numberActions from '../action/numberAction'

/**
 * saga任务，只能有一个,当其他地方触发对应 saga 里当 action 时候，saga 会寻找对应的任务执行
 * next() { value: 指令对象，done: false}
 * 合并多个生成器
 */
export default function* rootSaga() {
  console.log('saga任务 启动了')
  // const action = yield take(numberActions.getIncreaseAction)
  // console.log('saga运行了', action)
  yield all([numberTask()])
  console.log('saga任务 完成')
}

function* numberTask() {
  // while (true) {
  //   const action = yield take(numberActions.getIncreaseAction)
  //   console.log('监听到了', action)
  // }

  // const action = yield takeEvery(numberActions.getIncreaseAction, () => {
  //   console.log('监听到了', action)
  // })

  // const result = yield delay(2000, 'delay返回结果')
  // console.log('saga运行了delay', result)

  // yield put(numberActions.getIncreaseAction())

  // const resp = yield call(numberActions.getIncreaseAction)
  // console.log(resp)

  const state = yield select(state => state)
  console.log('state', state)
}
