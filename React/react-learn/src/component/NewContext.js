import React, { Component } from 'react'

const ctx = React.createContext()
export default class NewContext extends Component {
  state = {
    a: 111,
    b: '1212',
    changeA: () => {
      this.setState({
        a:this.state.a + 1
      })
    }
  }
  render() {
    return (
      <ctx.Provider value={this.state}>
        <h1>上下文新 API</h1>
        <ChildA />
      </ctx.Provider>
    )
  }
}

function ChildA(props) {
  return (
    <div>
      <h1> 
        <ctx.Consumer>
          {value => (
            <span>
             a:{ value.a}
            </span>
          ) }
        </ctx.Consumer>
      </h1>
      <ChildB/>
    </div>
  )
}
// ChildB 直接拿到 NewContext 的数据
export class ChildB extends Component {
  
  static contextType = ctx

  render() {
    return (
      <div>
        {/* 类组件也可以使用 */}
        {/* <ctx.Consumer>
          {value => (
             <div>
             来自于上下文的数据：a：{this.context.a}
             <button onClick={this.context.changeA}>A++</button>
           </div>
          ) }
        </ctx.Consumer> */}
        来自于上下文的数据：a：{this.context.a}
        <button onClick={this.context.changeA}>A++</button>
      </div>
    )
  }
}
