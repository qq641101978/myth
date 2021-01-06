import React, { Component } from 'react'
import PropTypes from 'prop-types' // 类型检测
export default class OldContext extends Component {
  state = {
    a: 123,
    b: 'abc'
  }
  /**
   * 创建上下文
   */
  static childContextTypes = {
    a: PropTypes.number,
    b: PropTypes.string.isRequired,
    change: PropTypes.func
  }
  /**
   * 得到上下文中的数据
   */
  getChildContext() {
    console.log('获取上下文')
    return {
      a: this.state.a,
      b: this.state.b,
      change: () => {
        this.setState({
          a: this.state.a + 1
        })
      }
    }
  }
  render() {
    return (
      <div>
        <h1>{ this.state.a}</h1>
        <h1>{ this.state.b}</h1>
        <ChildB />
      </div>
    )
  }
}
/**
 * 函数组件获取上下文
 */
function ChildA(props, context) {
  console.log(context)
  return (
    <>
      <h1>组件A</h1>
      <button onClick={ context.change}>点击修改</button>
    </>
  )
} 

ChildA.contextTypes = {
  a: PropTypes.number,
  b: PropTypes.string,
  change: PropTypes.func
}

export class ChildB extends Component {
  // constructor(props, context) {
  //   // 获取方式一
  //   // super(props)
  //   // console.log(context)
  //   // 获取方式二
  //   // super(props, context)
  //   // console.log(this.context)
  // }
   /**
   * 创建上下文
   */
  static childContextTypes = {
    a: PropTypes.number,
    b: PropTypes.string.isRequired,
  }
  /**
   * 得到上下文中的数据
   */
  getChildContext() {
    console.log('获取上下文')
    return {
      a: 111,
      b: 'bbb',
    }
  }
  render() {
    return (
      <div>
        <h1> 组件 B</h1>
       < ChildA />
      </div>
    )
  }
}
