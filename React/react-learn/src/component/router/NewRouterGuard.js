/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'

/**
 * 辅助函数，帮助获取 路由上下文
 * 添加监听和阻塞
 * @param {*} props 
 */
let prevLocation, location, action, unBlock
function _GuardHelper(props) {
  useEffect(() => {
    // 添加阻塞,传递路由信息
    unBlock =  props.history.block((lo, ac) => {
      prevLocation = props.location
      location = lo
      action = ac
      return 'xxx'
    })
    // 监听
    const unListen = props.history.listen((location, action) => {
      props.onChange(props.location, location, action, unListen)
    })
    return () => {
      // 取消监听和阻塞
      unBlock()
      unListen()
    }
  },[])
  return null
}

const GuardHelper = withRouter(_GuardHelper)
/**
 * 将 RouterGuard 放置在根组件上
 * 需要解决问题：操作函数中，路由的上下文怎么获取
 * @param {*} props 
 */
function RouterGuard(props) {
  /**
   * 阻塞设置时，触发的方法
   * @param {*} msg 
   * @param {*} commit 
   */
  const handlConfirm = (msg, commit) => {
    if (props.onBeforeChange) {
      // 获取阻塞时。全局设置的变量
      props.onBeforeChange(prevLocation, location, action, msg, commit, unBlock)
    } else {
      commit(true)
    }
  }

  return (
    <Router
      getUserConfirmation={handlConfirm}
    >
      <GuardHelper onChange={ props.onChange }/>
      { props.children}
    </Router>
  )
}

export default function _Router() {
  return (
    /**
     * onBeforeChange 参数需求：模拟vue路由守卫，能获取路由上下文
     * prevLocation, location, action
     */
    <RouterGuard
      onBeforeChange={(prevLocation, location, action, msg, commit, unBlock) => {
        console.log(`阻塞日志：从${prevLocation.pathname},到${location.pathname},跳转方式${action}，携带信息:${msg}`)
        commit(true)
        // unBlock() // 取消阻塞，仅阻塞一次
      }}

      onChange={ (prevLocation, location, action, unListen) => {
        console.log(`监听日志：从${prevLocation.pathname},到${location.pathname},跳转方式${action}`)
        // unListen()// 取消监听，仅监听一次
      }}
    >
      <p>
        <Link to="/a">to A</Link>
      </p>
      <p>
        <Link to="/b">to B</Link>
      </p>
        <Route path="/a"  component={ A } />
        <Route path="/b" component={ B }/> 
    </RouterGuard>
  )
}
function A() {
  return (
    <>
      <h1>组件A</h1>
    </>
  )
}
function B() {
  return (
    <>
      <h1>组件B</h1>
    </>
  )
}