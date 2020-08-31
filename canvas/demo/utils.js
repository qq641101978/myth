// 位子信息更新 实现运动
function update(item, cxt){
  item.vx += item.gx || 0
  item.vy += item.gy || 0
  item.x += item.vx
  item.y += item.vy

  if(item.y + item.r >= cxt.canvas.height) {
    item.vy = -(item.vy * (item.u || 1))
    item.y = cxt.canvas.height - item.r
  }
  if (item.y - item.r <= 0) {
    item.vy = -(item.vy * (item.u || 1))
    item.y = item.r
  }
  if(item.x + item.r >= cxt.canvas.width) {
    item.vx = -(item.vx * (item.u || 1))
    item.x = cxt.canvas.width - item.r
  }
  if(item.x - item.r <= 0) {
    item.vx = -(item.vx * (item.u || 1))
    item.x = item.r
  }
}