import React, { useEffect, useRef,useState } from 'react'
window.arr = []
// export default function UseRef() {
//   console.log('render')
//   const inpRef = React.createRef()
//   // 通过控制台输出，每次得到的ref是不相同的
//   window.arr.push(inpRef)
//   const [n, setN] = useState(0)
//   return (
//     <div>
//       <input type="text" ref={inpRef} />
//       <button onClick={() => {
//         console.log(inpRef.current.value)
//       }}>得到input的值</button>
//       <input type="number"
//         value={n}
//         onChange={e => {
//           setN(e.target.value)
//         }}
//       />
//     </div>
//   )
// }
export default function UseRef() {
  console.log('render')
  // 这里固定了 ref
  const inpRef = useRef()
  // 通过控制台输出，每次得到的ref是相同的
  window.arr.push(inpRef)
  const [n, setN] = useState(0)
  return (
    <div>
      <input type="text" ref={inpRef} />
      <button onClick={() => {
        console.log(inpRef.current.value)
      }}>得到input的值</button>
      <input type="number"
        value={n}
        onChange={e => {
          setN(e.target.value)
        }}
      />
    </div>
  )
}
/**
 * 这里不管函数运行多少次，nRef的值都不会重置
 */
export  function TimerRef() {
  const [n, setN] = useState(10)
  const nRef = useRef(n)
  useEffect(() => {
    const timer = setInterval(() => {
      nRef.current-- 
      setN(nRef.current)
      if(nRef.current === 0) clearInterval(timer)
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  })
}