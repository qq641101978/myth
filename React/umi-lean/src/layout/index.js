import React from 'react'

export default function index(props) {
  console.log('props', props)
  return (
    <div>
      <h1>导航菜单</h1>
      {props.children}
      <h1>页脚</h1>
    </div>
  )
}
