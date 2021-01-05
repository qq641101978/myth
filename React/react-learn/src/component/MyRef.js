import React, { Component } from 'react'

export default class MyRef extends Component {
  state = {
    val: '',
    inpRef: React.createRef(),
  }
  render() {
    return (
      <div>
        <input ref={ this.state.inpRef} type="text" value={this.state.val} onChange={e => {
          this.setState({
            val: e.target.value
          })
        }}/>
        <button onClick={() => {
          this.state.inpRef.current.focus()
        }}>聚焦</button>
      </div>
    )
  }
}
