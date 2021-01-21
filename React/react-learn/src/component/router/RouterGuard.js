import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'


function _RouterGuard(props) {
  useEffect(() => {
    // 添加一个监听器
    const unlisten = props.history.listen((location, cation) => {
      /**
       * prevLocation: 当前路由
       * location.pathname: 去往路由
       * cation: 动作
       * unlisten: 取消监听的函数
       */
      const prevLocation = props.location
      props.onChange && props.onChange(prevLocation, location, cation, unlisten)
    })
    // 阻止页面跳转，设置阻塞
    props.history.block('真的跳转么')
    return () => {
      console.log('卸载监听器')
      unlisten()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return props.children
}
const RouterGuard = withRouter(_RouterGuard)

export default function _Router() {
  const count = React.createRef(0)
  return (
    <Router
      /**
       * 设置了阻塞，才能调用此函数，阻塞消息传递过来
       * msg：阻塞消息
       * callbcak：回调函数，true 跳转,
       * window.confirm() 的返回值来确认是否跳转
       */
      getUserConfirmation={(msg, callbcak) => callbcak(window.confirm(msg))}>
      <p>
        <Link to="/a">to A</Link>
      </p>
      <p>
      <Link to="/b">to B</Link>
      </p>
      <RouterGuard onChange={(prevLocation, location, cation, unlisten) => {
        count.current++
        console.log(`日志:从页面${prevLocation.pathname},进入页面${location.pathname}，进入方式${cation}`)
        if(count.current === 5) unlisten()
      }}>
        <Route path="/a"  component={ A } />
        <Route path="/b" component={ B }/> 
      </RouterGuard>
    </Router>
  )
}
function A(props) {
  return (
    <>
      <h1>组件A</h1>
    </>
  )
}
function B(props) {
  return (
    <>
      <h1>组件B</h1>
    </>
  )
}