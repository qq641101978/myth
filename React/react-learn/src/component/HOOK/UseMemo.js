import React, { useState, useMemo } from 'react'

export default function Parent() {
  console.log('parent Render')
  const [range] = useState({ min:1, max:10000})
  const [n, setN] = useState(0)
  // 优化前 n 的值改变后，会重新渲染组件，但是 range 并不改变，也会跟着渲染
  // const list =[]
  // for (let i = range.min; i < range.max; i++) {
  //   console.log(i)
  //   list.push((
  //     <div key={i}>{ i }</div>
  //   ))
  // }
  // 优化后 对 list 进行了缓存，range 不改变，就不会重新渲染这部分
  const list = useMemo(() => {
    const list =[]
    for (let i = range.min; i < range.max; i++) {
      list.push((
        <div key={i}>{ i }</div>
      ))
    }
    return list
  }, [range])
  
  return (
    <div>
      <input type="number"
        value={n}
        onChange={e => {
          setN(parseInt(e.target.value))
        }}
      />
      {list}
    </div>
  )
}
