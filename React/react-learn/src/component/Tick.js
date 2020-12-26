import React, { Component } from 'react'

export default class Tick extends Component {
  //初始化状态
  state = {
    ...this.props
  }
  constructor(props) {
    super(props)
    console.log(props)
    //初始化状态
    // this.state = {
    //   ...this.props
    // }
    this.timer = setInterval(() => {
      // 重新设置状态，触发自动渲染
      this.setState({
        num: this.state.num - 1
      })
      if (this.state.num === 0) {
        clearInterval(this.timer)
        return
      }
    },1000)
  }
  render() {
    console.log(this.state)
    return (
      <div>
        倒计时：{this.state.num}
      </div>
    )
  }
}
