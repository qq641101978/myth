import React, { useState } from 'react'

window.arr = [] // 对比是否函数复用
export default function SetState() {
  console.log('render')
  const [n, setN] = useState(0)
  const [visible, setVisible] = useState(true)
  const [, forceUpdate] = useState()
  window.arr.push(setN)
  return (
    <>
      <div style={{display: visible ? 'block': 'none'}}>
        <button onClick={ ()=>{setN(()=>n - 1)}}>-</button>
        <span>{n}</span>
        <button onClick={() => { 
          // setN(n + 1) // 不会立即改变，事件运行完后统一改变
          // setN(n + 1) // 此时 n 的值还是 0
          setN(prevN => prevN + 1 ) // 传入的函数在事件结束后统一运行
          setN(prevN => prevN + 1) 
          
          
         }}>+</button>
      </div>
      <br />
      <button onClick={() => { setVisible(!visible) }}>显示/隐藏</button>
      <button onClick={() => {
        forceUpdate({}) // 执行强制刷新
      }}>强制刷新</button>
    </>
  )
}
