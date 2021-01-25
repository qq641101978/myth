export const AddUser = Symbol('AddUser')
export const DelUser = Symbol('DelUser')
export const NewUser = Symbol('NewUser')

export const getAddUserAction = (payload) => ({
  type: AddUser,
  payload
})
export const getDelUserAction = (payload) => ({
  type: DelUser,
  payload
})
export const getNewUserAction = (payload) => ({
  type: NewUser,
  payload
})

/**
 * 由于thunk 的存在，允许 action是一个带有副作用的函数
 */
export function fetchUsers() {
  return (dispatch) => {
    setTimeout(() => {
      const user = {
        id: 110,
        name:'byf'
      }
      dispatch(getAddUserAction(user))
    },1000)
  }
}