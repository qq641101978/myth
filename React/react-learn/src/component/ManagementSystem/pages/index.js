import React from 'react'
import Layout from '../layout'
import { Route } from 'react-router-dom'
import Welcome from './Welcome'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'
import Page5 from './page5'
export default function index() {
  return (
    <div>
      <Layout>
        <Route path="/" exact component={ Welcome } />
        <Route path="/page1" exact component={ Page1 } />
        <Route path="/page2" exact component={ Page2 } />
        <Route path="/page3" exact component={ Page3 } />
        <Route path="/page4" exact component={ Page4 } />
        <Route path="/page5" exact component={ Page5 } />
      </Layout>
    </div>
  )
}
