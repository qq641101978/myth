import React, { Component } from 'react'
import './index.css'
/**
 * 分页组件
 * 属性：
 * 1.current：初始页码
 * 2.total：总数据量
 * 3.limit：每页条数
 * 4.panelNumber：数字页码最多显示个数
 */
export default class Pager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props,
      tali: Math.ceil(this.props.total / this.props.limit)
    }
    if (this.state.current > this.state.tali || this.state.current < 1) {
      this.state.current = 1
    }
    console.log(this.state)
  }
  /***
   * 生成中间数字,用 current 当作中间当数字,
   * 判断边界问题：
   * min 最小为 1， 最大为 总页数 -（数字页码显示个数 - 1）
   * max 最小为 1， 最大为 总页数
   * 校验 current 的合法性
   */
  pageList = () => {
    let min = this.state.current - Math.floor(this.state.panelNumber / 2)
    if (min < 1) {
      min = 1
    }
    let max = min + (this.state.panelNumber - 1)
    if (max > this.state.tali) {
      min = this.state.tali - (this.state.panelNumber - 1)
      max = this.state.tali
      if (min < 1) {
        min = 1
      }
    }
    const pageList = []
    for (let i = min; i <= max; i++){
      pageList.push(<span key={i} onClick={() => { this.toPage(i) }} className={ i === this.state.current ? 'item active' : 'item'}>{ i }</span>)
    }
    return pageList
  }
  /**
   * 跳转页码，
   * 这里需要父组件传递。谁的数据谁改变这里偷懒了
   * @param {*} target 目标页面
   */
  toPage = (target) => {
    if (target < 1 || target > this.state.tali) return
    this.setState({
      current: target
    })
  }
  render() {
    if (!this.props.total) return null
    return (
      <>
        <span onClick={ ()=>{this.toPage(1)} } className={ this.state.current === 1 ? 'item disabled' : 'item'}>首页</span>
        <span onClick={ ()=>{this.toPage(this.state.current - 1)}} className={ this.state.current === 1 ? 'item disabled' : 'item'}>上一页</span>
        {/* 数字页码区域 */}
        {this.pageList()}
        <span onClick={ ()=>{this.toPage(this.state.current + 1)} } className={ this.state.current >= this.state.tali ? 'item disabled' : 'item'}>下一页</span>
        <span onClick={ ()=>{this.toPage(this.state.tali)} } className={ this.state.current >= this.state.tali ? 'item disabled' : 'item'}>尾页</span>
        <span className="tag">{this.state.current} / {this.state.tali}</span>
      </>
    )
  }
}
