import { bindActionCreators } from 'redux'
import store from './index'
import * as  usersActions from './action/usersAction'

const boundActiions = bindActionCreators(usersActions, store.dispatch)

boundActiions.fetchUsers()

