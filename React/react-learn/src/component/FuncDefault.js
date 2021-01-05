import React, { Component } from 'react'

export default function FuncDefault(props) {
  return (
    <div>
      name:{props.name} age:{props.age} sex:{props.sex}
    </div>
  )
}
/**
 * 默认值
 * react 自带的默认配置
 */
FuncDefault.defaultProps = {
  name: 'byf',
  age: 11,
  sex: '男'
}

/**
 * 类的形式
 */
// export class FuncDefault extends Component {
//   static defaultProps = {
//     ...
//   }
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
