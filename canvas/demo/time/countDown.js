// 需要重构 class 模式


// 屏幕宽高
const WINDOW_WIDTH = document.body.clientWidth
const WINDOW_HEIGHT = document.body.clientHeight
// 点阵半径
const RADIUS = WINDOW_HEIGHT / 120
// 间距
const MARGIN_TOP = WINDOW_HEIGHT / 5
const MARGIN_LEFT = WINDOW_WIDTH / 10
// 初始时间
let hours = new Date().getHours()
let minutes = new Date().getMinutes()
let seconds = new Date().getSeconds()
//小球集合
let balls = []
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function() {
  const canvas = document.getElementById('canvas')
  const cxt = canvas.getContext('2d')
  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT
  setInterval(()=>{
    render(cxt)
    update()
  },50)
}
function render(cxt){
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  renderDigit(MARGIN_LEFT + 0*(RADIUS + 1), MARGIN_TOP, parseInt(hours/10), cxt)
  renderDigit(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(hours%10), cxt)
  renderDigit(MARGIN_LEFT + 32*(RADIUS + 1), MARGIN_TOP, 10, cxt)

  renderDigit(MARGIN_LEFT + 40*(RADIUS + 1), MARGIN_TOP, parseInt(minutes/10), cxt)
  renderDigit(MARGIN_LEFT + 55*(RADIUS + 1), MARGIN_TOP, parseInt(minutes%10), cxt)
  renderDigit(MARGIN_LEFT + 70*(RADIUS + 1), MARGIN_TOP, 10, cxt)

  renderDigit(MARGIN_LEFT + 80*(RADIUS + 1), MARGIN_TOP, parseInt(seconds/10), cxt)
  renderDigit(MARGIN_LEFT + 95*(RADIUS + 1), MARGIN_TOP, parseInt(seconds%10), cxt)
  balls.map(ball => {
    renderBall(ball, cxt)
  })
}
// 时间更新
function update(){
  const newHours = new Date().getHours()
  const newMinutes = new Date().getMinutes()
  const newSeconds = new Date().getSeconds()
  updateBalls()
  if((seconds%10) !== (newSeconds%10)) {
    if(parseInt(seconds/10) !== parseInt(newSeconds/10)) {
      // 创建小球集合
      addBalls(MARGIN_LEFT + 80*(RADIUS + 1), MARGIN_TOP, parseInt(seconds/10))
    }
    seconds = newSeconds
    // 创建小球集合
    addBalls(MARGIN_LEFT + 95*(RADIUS + 1), MARGIN_TOP, parseInt(seconds%10))
  }
}
// 生成小球集合
function addBalls(x0, y0, num) {
  digit[num].map((item, y) => {
    item.map((el,x)=>{
      if (el === 1){
        // 创建随机化小球
        const ball = {
          x: x0+x*2*(RADIUS+ 1)+(RADIUS+ 1),
          y: y0+y*2*(RADIUS+ 1)+(RADIUS+ 1),
          r: RADIUS,
          color: colors[parseInt(Math.random()*10)],
          vx: Math.pow(-1,Math.ceil(Math.random() * 1000)) * 4,
          vy: -20,
          gy: 4 + Math.random(),
          u: 0.75
        }
        balls.push(ball)
      }
    })
  })
  // 边界小球删除
  balls = balls.filter(el=> el.x < WINDOW_WIDTH && el.x > 0)
}
// 更新数据
function updateBalls(){
  balls.map(ball => {
    // 更新小球状态
    ball.x += ball.vx
    ball.vx += ball.gx || 0
    ball.y += ball.vy
    ball.vy += ball.gy
    if(ball.y >= WINDOW_HEIGHT) {
      ball.y = WINDOW_HEIGHT - ball.r
      ball.vy = -(ball.vy * ball.u)
    }
  })
}

// 创建运动小球
function renderBall(ball, cxt){
  cxt.fillStyle = ball.color
  cxt.beginPath()
  cxt.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI)
  cxt.closePath()
  cxt.fill()
}
// 创建数字
function renderDigit(x0, y0, num, cxt){
  // console.log(x0, y0, num, cxt)
  cxt.fillStyle = '#f40'
  digit[num].map((item, y) => {
    item.map((el,x)=>{
      if (el === 1){
        cxt.beginPath()
        cxt.arc(x0+x*2*(RADIUS+ 1)+(RADIUS+ 1), y0+y*2*(RADIUS+ 1)+(RADIUS+ 1) , RADIUS, 0, 2*Math.PI)
        cxt.fill()
        cxt.closePath()
      }
    })
  })
}