import React, { useEffect, useState } from 'react'

export default function UseEffect() {
  const [x, setX] = useState(100)
  const [y, setY] = useState(100)
  const refX = React.createRef()
  const refY = React.createRef()
  return (
    <div style={{
      'paddingTop': '200px'
    }}>
      x: <input ref={refX} type="number"/>
      y: <input ref={refY} type="number" />
      <button onClick={() => {
        setX(refX.current.value)
        setY(refY.current.value)
      }}>确定</button>
      <MovebleBlock left={ x } top={ y }/>
    </div>
  )
}

const ref = React.createRef()
let timer = null
function MovebleBlock(props) {
  useEffect(() => {
    console.log('渲染完成执行副作用函数')
    const div = ref.current
    let curTimes = 0
    const disX = props.left / 100
    const disY = props.top / 100
    timer = setInterval(() => {
      curTimes++
      div.style.left = `${disX * curTimes}px`  
      div.style.top = `${disY * curTimes}px` 
      if(curTimes === 100) clearInterval(timer)
    }, 10)
    return () => {
      console.log('清理函数：下一次副作用函数执行之前 和 组件销毁后执行')
      clearInterval(timer)
      timer = null
    }
  }, [props.left, props.top])
  // [props.left, props.top]: 依赖的数据没有发生变化，不会触发 副作用操作
  // 使用空数组作为依赖项：则副作用函数，仅在挂载的时候运行一次
  console.log('render')
  return (
    <div ref={ref}
      style={{
      width: '100px',
      height: '100px',
      background: '#f40',
      position:'fixed'
      }}
    ></div>
  )
}
// let a = 0
// function move() {
//   a++
//   console.log(a)
//   if (a < 100) {
//     window.requestAnimationFrame(move)
//   } else {
//     window.cancelAnimationFrame(move)
//   }
// }
// window.requestAnimationFrame(move)