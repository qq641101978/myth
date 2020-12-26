import React, { Component } from 'react'
import MyEvent from './MyEvent'
export default class TickControl extends Component {
  state = {
    num: 3,
    isOver:false,
    onOver: () => {
      this.setState({
        isOver: true
      })
    }
  }
  render() {
    if (this.state.isOver) {
      return <h1>计时结束</h1>
    }
    return <MyEvent {...this.state}/>
  }
}
