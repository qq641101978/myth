import useReducer from './useReducer'
/**
 * 该函数，根据当前数据，已经 action，生成一个新数据
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state, action) {
  switch (action.type) {
    case 'increase': return state + 1
    case 'decrease': return state - 1
    default: return state
      
  }
}

/**
 *简单的数字加减
 */
export default function Demo() {
  const [n, dispatch] = useReducer(reducer, 10)

  return (
    <div>
      <p>{ n }</p>
      <button onClick={() => {
       dispatch({type:'decrease'}) 
      }}>-</button>
      <button onClick={() => {
       dispatch({type:'increase'}) 
      }}>+</button>
    </div>
  )
}