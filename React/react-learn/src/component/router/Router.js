import React from 'react'
import { HashRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
/**
 * _Router组件 提供了上下文信息
 */
export default function _Router() {
  return (
    <Router>
      <Switch>
        <Route path="/a" exact component={A}>
          <h1>在没有Switch组件下，不管有没有匹配上，一定会展示，并且忽略 component</h1>
        </Route>
        <Route path="/a/b" component={ B }/> 
        <Route  component={ C }/> 
      </Switch>
    </Router>
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
function C() {
  return (
    <>
      <h1>找不到页面</h1>
      <Route  path="/abc" component={ D }/> 
    </>
  )
}

function D() {
  return (
    <h1>组件D</h1>
  )
}