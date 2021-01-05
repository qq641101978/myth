/**
 * 一些不会显示在页面的属性
 */
import React from 'react';
import ReactDOM from 'react-dom';
let a = 111,
  b = 222,
  arr =[ 1, false, null, undefined, 3 ]
const div = (<div>
  {/* 不会产生任何输出 */}
  <p>{ null}</p>
  <p>{ undefined }</p>
  <p>{ false }</p>
  <p>{ true }</p>
  <p>0</p>
  <p>{Boolean(0)}</p>
  <h1>{a} * {b} = {a * b}</h1>
  <h1>{ arr }</h1>
</div>)
ReactDOM.render(div,document.getElementById('root'))