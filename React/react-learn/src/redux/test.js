import { bindActionCreators } from 'redux'
import store from './index'
import * as  numberAction from './action/numberAction'

const boundActiions = bindActionCreators(numberAction, store.dispatch)

boundActiions.getDecreaseAction()

