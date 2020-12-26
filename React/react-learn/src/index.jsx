import React from 'react';
import ReactDOM from 'react-dom';
// import MyFnComp from './component/fncomp' // 函数组件
// import MyClssComp from './component/classComp' // 类组件
// import Tick from './component/Tick'
// import Test from './component/Test'
import TickControl from './component/TickControl'

const content = document.getElementById('root')
const kid = <TickControl />

ReactDOM.render(kid, content)