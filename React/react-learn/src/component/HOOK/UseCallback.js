import React, { useCallback, useState } from 'react'

export default function Parent() {
  console.log('parent Render')
  const [txt, setTxt] = useState(123)
  const [n, setN] = useState(0)
  const handleClick = useCallback(() => {
    setTxt(Math.random())
  }, [])
  return (
    <div>
      {/* onClick属性注册的函数每次创建，函数地址会变化，然后触发组件的更新渲染 ，使用 useCallback 就不会了*/}
      <Test text={txt} onClick={handleClick} />
      <input type="number"
        value={n}
        onChange={e => {
          setN(parseInt(e.target.value))
        }}
      />
    </div>
  )
}


/**
 * 纯组件
 */
class Test extends React.PureComponent {
  render() {
    console.log('Test Render')
    return (
      <div>
        <h1>{this.props.text}</h1>
        <button onClick={ this.props.onClick}>改变文本</button>
      </div>
    )
  }
}
