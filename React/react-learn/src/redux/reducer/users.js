import * as usersAction from '../action/usersAction'

export default function reducer(state = [], { type, payload }) {
  switch (type) {
    case usersAction.AddUser:
      return [...state, payload]
    case usersAction.DelUser:
      return state.filter(it => it.id !== payload)
    case usersAction.NewUser:
      return payload
    default:
      return state
  }
}