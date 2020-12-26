import React, { Component } from 'react'

export default class Test extends Component {
  state = {
    num:123
  }
  constructor(props) {
    super(props)
    this.timer = setInterval(() => {
      this.setState({
        num:this.state.num - 1
      })
      if (this.state.num === 0) {
        clearInterval(this.timer)
      }
    },200)
  }
  render() {
    return (
      <div>
        Test组件：{this.state.num}
        <A num={this.state.num} />
      </div>
    )
  }
}

function A(props) {
  return <div>组件A：{props.num} <B num ={ props.num} /></div>
}

function B(props) {
  return <div>组件B：{props.num}</div>
}