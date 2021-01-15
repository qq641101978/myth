import React, { Component } from 'react'
// import MyInput from './component/MyForm'
// import FuncDefault from './component/FuncDefault'
// import Demo from './component/HOOK/UseEffect'
// import Demo from './component/HOOK/UseContext'
// import Demo from './component/HOOK/UseCallback'
// import Demo from './component/HOOK/UseMemo'
import Demo from './component/HOOK/UseRef'
export default class App extends Component {
  render() {
    return (
      <>
        <Demo/>
      </>
    )
  }
}
// import useList from './component/myHook/useList'
// export default function App() {
//   const stus = useList()
//   const list = stus.map(it => (
//     <p key={it}>{it }</p>
//   ))
//   console.log('渲染了',stus)
//   return (
//     <div>{list }</div>
//   )
// }
