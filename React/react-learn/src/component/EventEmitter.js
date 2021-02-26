import React, { useState } from 'react'

class Bus {

  eventMap = {}

  on(type, handle) {
    if (typeof handle !== 'function') {
      throw new Error('哥们，我需要一个函数')
    }
    if (!this.eventMap[type]) this.eventMap[type] = []
    this.eventMap[type].push(handle) 
  }

  emit(type, params) {
    this.eventMap[type] && this.eventMap[type].forEach(handle => { handle(params) })
  } 

  off(type, handler) {
    this.eventMap[type] && this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
  }
}
export default class EventEmitter extends React.Component{

  render() {
    return (
      <div>
        <B/>
        <A/>
      </div>
    )
  }
}

const globalEvent = new Bus()
function B() {
  const [str, setstr] = useState('')
  const handler = (params) => {
    setstr(params)
  }
  const bindHandler = () => {
    globalEvent.on('someEvent', handler)
  }
  return  (
    <div>
      <button onClick={bindHandler}>点我监听A的动作</button>
      <div>A传入的内容是[{str}]</div>
    </div>
  )
}
function A() {
  const [val, setval] = useState('来自A')
  const handlerChange = (e) => {
    setval(e.target.value)
  }
  const reportToB = () => {
    globalEvent.emit('someEvent', val)
  }
  return (
    <div>
      <input type="text" value={ val }  onChange={ handlerChange }  placeholder='请输入传给 B 的值'/>
      <button onClick={reportToB}>点我把state传递给B</button>
    </div>
  )
}
