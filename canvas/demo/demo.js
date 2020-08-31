// 利用圆画五角星 参数：上下文，大圆半径，小圆半径，圆心 x，y, 旋转角度 rot
// 函数承载功能太多，需要拆分
// 图形变换 
function drawFiveStar(cxt, R = 20, r = 10, x = 20, y = 20, rot = 0) {
  cxt.save()
  cxt.translate(x, y)
  cxt.rotate(rot / 180 * Math.PI)
  cxt.scale(R, R)
  starPath(cxt, R, r)
  cxt.fill()
  cxt.restore()
}
// 标准五角星
function starPath(cxt, R) {
  cxt.beginPath()
  for(let i = 0; i < 5; i++){
    cxt.lineTo(Math.cos((18 + i * 72 )/180 * Math.PI ), -Math.sin((18 + i * 72)/180 * Math.PI ))
    cxt.lineTo(Math.cos((54 + i * 72)/180 * Math.PI )/ 2, -Math.sin((54 + i * 72)/180 * Math.PI )/ 2)
  }
  cxt.closePath()
}
//  以顶角固定在 y 轴上计算
function drawStars(cxt, num = 5, R =300, x = 400, y = 400){
  cxt.lineWidth = 3
  const deg = 360 / num
  const fixedDeg = 90 - deg
  const minFixedDeg = deg - fixedDeg
  cxt.beginPath()
  for(let i = 0; i < num; i++){
    cxt.lineTo(Math.cos((fixedDeg + i * deg)/180 * Math.PI )*R + x, -Math.sin((fixedDeg + i * deg)/180 * Math.PI )*R + y)
    cxt.lineTo(Math.cos((minFixedDeg + i * deg)/180 * Math.PI )*R/2 + x, -Math.sin((minFixedDeg + i * deg)/180 * Math.PI )*R/2 + y)
  }
  cxt.closePath()
  cxt.stroke()
  // 基线
  cxt.beginPath()
  cxt.lineWidth = 2
  cxt.moveTo(x,0)
  cxt.lineTo(x,cxt.canvas.height)
  cxt.moveTo(0,y)
  cxt.lineTo(cxt.canvas.width,y)
  cxt.closePath()
  cxt.stroke()
}

// 绘制圆角矩形
function drawRoundRect(x = 100, y = 100, width = 400, height = 400, radius = 50) {
  cxt.save()
  cxt.translate(x, y)
  pathRoundRect1(width, height, radius)
  cxt.stroke()
  cxt.restore()
}

//圆角矩形路径
function pathRoundRect(width, height, radius) {
  cxt.beginPath()
  cxt.arc(width - radius, height - radius, radius, 0, 0.5 * Math.PI, )
  cxt.arc(radius, height - radius, radius,0.5 * Math.PI, Math.PI) 
  cxt.arc(radius, radius, radius, Math.PI, 1.5 * Math.PI)
  cxt.arc(width - radius, radius, radius, 1.5 * Math.PI, 0)
  cxt.closePath()
}


// 绘制弯月
//  x, y 圆心坐标。R 大圆半径  0 < d < 2 为偏移圆心的量, rot 旋转角度
function drawMoon(x = 200, y = 200, R = 100, d = 1, rot = 0) {
  cxt.save()
  cxt.lineWidth = 5
  cxt.translate(x, y)
  cxt.scale(R, R)
  cxt.rotate(rot * Math.PI / 180)
  drawMoonPath(d)
  cxt.fillStyle = '#fb5'
  cxt.fill()
  cxt.restore()

  cxt.save()
  cxt.translate(x, y)
  cxt.lineWidth = 2

  // 基线
  cxt.beginPath()
  cxt.lineTo(-R, -R)
  cxt.lineTo(R, -R)
  cxt.lineTo(R, R)
  cxt.lineTo(-R, R)
  cxt.closePath()
  cxt.stroke()
  cxt.restore()
}
// 绘制弯月路径 合理使用 单位圆
function drawMoonPath(d) {
  // const r = dis(0, -1, d, 0) / d
  cxt.beginPath()
  cxt.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true)
  cxt.moveTo(0, -1)
  // cxt.arcTo(d, 0, 0, 1, r)
  cxt.quadraticCurveTo(d, 0, 0, 1)
  cxt.closePath()
}

function dis(x1, y1, x2, y2) {
  console.log(Math.sqrt((x1 - x2)**2 + (y1 - y2)**2))
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
}