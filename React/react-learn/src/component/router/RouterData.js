import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect, Link, NavLink } from 'react-router-dom'
export default function _HashRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/a/:year?/:mouth?/:day?"  component={ A } />
        <Route path="/b" component={ B }/> 
        <Route path="/c" component={C} /> 
        <Redirect to="/a" component={ A }/>
      </Switch>
     <NavLink to="/a" activeStyle={{ marginLeft:20,color:'#f40',textDecoration:'none'}}>去A</NavLink>
    </Router>
  )
}

function A(props) {
  console.log(props)
  return (
    <>
      <h1>组件A</h1>
      <BBtn/>
    </>
  )
}
const BBtn = withRouter(Btn)
function Btn(props) {
  return (
    <button onClick={
      ()=>{props.history.push('/b')}
    }>跳转B</button>
  )
}
function B(props) {
  return (
    <>
      <h1>组件B</h1>
      <Link to="/a">跳转A</Link>
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
