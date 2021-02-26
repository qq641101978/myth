import React, { Component, useEffect, useState } from 'react'

export default class FnAndClass extends Component {
  state = {
    user: 'bai'
  }
  handleClick = (e) => {
    console.log('修改了')
    this.setState({ user: 'fff' })
  }
  render() {
    return (
      <div>
        <button onClick={ this.handleClick }>点击修改user</button>
        <p>{this.state.user }</p>
        <ProfilePage user={ this.state.user }/>
      </div>
    )
  }
}

function ProfilePage(props) {
  console.log('ProfilePage',props)
  const showMessage = () => {
    console.log(props)
    alert('Followed ' + props.user);
  };
  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };
  return (
    <div>
      <button onClick={handleClick}>Follow</button>
      <p>{ props.user }</p>
    </div>
  );
}
// this变化的问题，得不到正确的结果
class ProfilePage1 extends Component{
  
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return (
    <div>
      <button onClick={this.handleClick}>Follow</button>
      <p>{ this.props.user }</p>
    </div>
  );
}
}

// https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/
