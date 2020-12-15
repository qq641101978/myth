- 补充：关于 DOM 事件标准

- 你知道下面 3 种事件监听方式的区别吗？
![MDN资料](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)
```js
// 方式1

<input type="text" onclick="click()"/>

// 方式2

document.querySelector('input').onClick = function(e) {

  // ...

}

// 方式3

document.querySelector('input').addEventListener('click', function(e) {

  //...

})

```
- 方式 1 和方式 2 同属于 DOM0 标准，通过这种方式进行事件监会覆盖之前的事件监听函数。

- 方式 3 属于 DOM2 标准，推荐使用这种方式。同一元素上的事件监听函数互不影响，而且可以独立取消，调用顺序和监听顺序一致。