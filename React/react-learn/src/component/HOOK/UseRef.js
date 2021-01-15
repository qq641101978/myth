import React, { useRef,useState } from 'react'
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