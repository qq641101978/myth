### canvas
重点：canvas 是基于状态绘制的
当不设置宽高时：宽：300 ，高：150
按照用途，Canvas API 分成两大部分：绘制图形和图像处理。
>阮大的教程很详细 https://www.bookstack.cn/read/webapi-tutorial/spilt.2.docs-canvas.md

自己需要注意的问题：
#### 1:canvas画布如何指定宽高合适？
不建议使用css方式指定宽高。css指定的是canvas画布显示的大小。分辨率并没有指定。
我们需要同时指定画布大小和分辨率，一般在js中一起指定或者canvas元素行内直接指定 width 和 height 属性。
具体看 W3C标准

#### 2: 2D上下文的状态有哪些？
所有的2D上下文的属性都是可以保存和恢复的属性。你在恢复一个状态的时候，绘制区域并不会自动进行恢复。你恢复的仅仅是2D上下文的设置（属性值），这些设置包括：
fillStyle
font
globalAlpha
globalCompositionOperation
lineCap
lineJoin
lineWidth
miterLimit
shadowBlur
shadowColor
shadowOffsetX
shadowOffsetY
strokeStyle
textAlign
textBaseline
clipping区域
转换矩阵 等等


#### 3:beginPath 和 closePath 的作用
创建一个标准的封闭的路径，不与其他路径造成影响，还可以省略 moveTo() 直接 lineTo(),
closePath 会封闭路径，需要在合适的情况下使用


#### 4:fillStyle的属性
fillStyle: color, gradient, image, canvas, video

#### 5: 绘制圆弧的两种方式，他俩的不同点
arc(centerX, centerY, radius, startingAngle, endingAngle, anticlockwise) 手动确定圆心半径
arcTo(x1, y1,x2, y2,radius) //三个不在一条直线上点构成点内切圆

#### 6:所有像素变成透明，并擦除之前绘制的所有内容的方法。

ctx.clearRect(x, y, width, height) 清除矩形区域的内容

#### 8:贝塞尔曲线的应用

#### 9:canvas 文字的设置, 以及结合渐变应用


#### 10:canvas中的图形变换
translate(x, y) 在原有的基础上，图像偏移 x, y 像素
rotate(deg)     在原有的基础上，图像旋转 deg 度,需要转换成弧度制 deg/180 * Math.Pi
scale(xs, xy)   在原有的基础上，图像沿 x 轴缩放 xs 倍, y轴缩放 xy 倍(副作用较大，会把图像偏移和边框都放大)

可以使图形封闭的属性：
closePath() fill() 

canvas状态
绘制动作：
stroke: 绘制连线
beginPath: 采取新的状态绘图
closePath: 结束当前状态
fill:填充
clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT) //清空视图(canvas)区域

Canvas状态数据的保存与恢复
canvas.save()：用来保存Canvas的状态(将一个状态压入状态栈中)

canvas.restore()：用来恢复Canvas旋转、缩放等之后的状态，当和canvas.save( )一起使用时，恢复到canvas.save( )保存时的状态(将最前面的状态出栈，并设置到2d上下文中)。
```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.save();
ctx.fillStyle = 'green';
ctx.restore();
ctx.fillRect(10, 10, 100, 100);
// 上面代码画一个矩形。矩形的填充色本来设为绿色，但是restore()方法撤销了这个设置，
// 将样式恢复上一次保存的状态（即默认样式），所以实际的填充色是黑色（默认颜色）。
```

对于一个状态栈，你可以压入多个状态，然后在将它们依次弹出(先进后出。栈的性质)
```js
cxt.save() 1
// xxx
cxt.save() 2
// xxx
cxt.restore()
cxt.restore()
// 先弹出的是2 
```