import React from 'react';

export default class ClassComp extends React.Component {
  // constructor(props) {
  //   super(props) // this.props = props
  //   console.log(props) 
  // }
  // 该方法必须返回 react 元素
  render() {
    return <h1>class组件，当前数字 { this.props.num}</h1>
  }
}