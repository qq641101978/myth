import React, { Component } from 'react'

export default class MyEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.timer = setInterval(() => {
      this.setState({
        num: this.state.num - 1
      })
      if (this.state.num === 0) {
        clearInterval(this.timer)
        // 倒计时完成，想做一些事情,触发父组件事件
        props.onOver && props.onOver()
      }
    }, 1000)
  }
  // 需要 bind 改变 this 指向
  handleClick(e) {
    console.log('this',this)
    clearInterval(this.timer)
  }
  // 箭头形式(变成一个属性，在对象上，不在原型上了)
  handleClick = () => {
    console.log('this',this)
    clearInterval(this.timer)
  }
  render() {
    return (
      <>
        <h1>计时：{this.state.num }</h1>
        <button onClick={this.handleClick.bind(this)}>  点我暂停</button>
      </>
    )
  }
}
