import React from 'react'
import Header from './common/Header'
import Aside from './common/Aside'
import './index.css'
export default function Layout({children}) {
  return (
    <>
      <div className="container">
        <div className="hearder">
          <Header/>
        </div>
        <div className="middle">
          <div className="aside">
            <Aside/>
          </div>
          <div className="main">{ children }</div>          
        </div>
      </div>
    </>
  )
}
