import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import iamgeSrc1 from './assets/demo.jpg';
import iamgeSrc2 from './assets/vue组件化.jpg';

const imgeList = [iamgeSrc1, iamgeSrc2]
let index = 0
let timer;
const content = document.getElementById('root')
function renderImage() { 
  const img = <img alt='nihao' src={imgeList[index]}></img>
  ReactDOM.render(img, content)
  
}

function start() {
  console.log('start')
  timer = setInterval(() => {
    index = (index + 1) % 2
    renderImage()
  },2000)
}
renderImage()
start()

function stop() {
  console.log('stop')
  clearInterval(timer)
}
content.onmouseenter = stop
content.onmouseleave = start