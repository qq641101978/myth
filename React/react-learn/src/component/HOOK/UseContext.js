import React, { useContext } from 'react'
const ctx = React.createContext()

export default function _UseContext() {
  return (
    <div>
      <ctx.Provider value='abc'>
        <Test />
      </ctx.Provider>
    </div>
  )
}

function Test() {
  const value = useContext(ctx)
  return (
    <h1>Test:上下文的值{value}</h1>
  )
}