import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages'
export default function index() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={ Login } />
        {/* Admin组件不需要精确匹配 */}
        <Route path='/' component={ Admin } /> 
      </Switch>
    </Router>
  )
}
