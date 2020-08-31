### canvas
重点：canvas 是基于状态绘制的(全局只有一个状态。结束的时候才能开启新的)
当不设置宽高时：宽：300 ，高：150
问题：
1:属性值什么时候保持着，什么时候被覆盖？

属性值在没有被重写的时候会一直保持，在被重写后会被覆盖

2:为什么 moveTo 在 beginPath 的执行下可以不写？
beginPath 为采取新的绘图

3:如何绘制一个标准的封闭多边形(closePath)

4:fill 填充时候怎么不影响 lineWidth，为什么会影响？
先填充，再描边（先描边，再填充。会有一半的lineWidth被填充）。

5:图形覆盖的遮挡关系 => 前覆盖后

6:fillStyle的属性设置
fillStyle: color, gradient, image, canvas, video

7: 绘制圆弧的两种方式，他俩的不同点

8:贝塞尔曲线的应用

9:canvas 文字的设置, 以及结合渐变应用


状态：
moveTo，lineTo，lineWidth，strokeStyle 等等都是状态，

// 线条属性
lineCap: butt(default), round, square
lineWidth:

moveTo(x, y) ：不从任何坐标点开始，指定一个新的点（有beginPath时候可以省略）
rect(x,y,width,height) // 绘制矩形
// 不但规划路径，还完成绘制
fillRect(x,y,width,height) // 填充矩形
strokeRect(x,y,width,height) // 矩形

arc: 圆和圆弧


绘制动作：
stroke: 绘制连线
beginPath: 采取新的状态绘图
closePath: 结束当前状态
fill:填充
clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT) //清空视图区域


创建数字点阵：=> 循环事件：=> 判断数字改变做对应处理