# 杂记

### 字符串方法 substring
```js
'baiyf'.substring(0, 3) // bai
```

### 深克隆性能开销问题：
- 创建对象和深拷贝对象的时间开销对比，耗时相差一倍，对于结构更加复杂的对象，这个差异可能会变得更大。
```js
// 创建对象 
console.time('create') 
var obj = {} 
for(let i=0;i<100;i++) { 
  obj[Math.random()] = Math.random() 
} 
console.timeEnd('create') // create: 0.288818359375ms 
// 深拷贝 
console.time('clone') 
_.cloneDeep(obj) 
console.timeEnd('clone') // clone: 0.637939453125ms
```
- React 组件是通过将 state 设置为不可变对象的方式来实现的，不可变对象指的就是当一个变量被创建后，它的值不可以被修改。这也就意味着当组件状态发生变化时，不修改 state 属性，而是重新创建新的 state 状态对象。
- 验证 React 状态响应：通过新增属性实现 state 状态对象而不是通过深克隆：一个对象两个属性，修改一个，另外一个还指向这个对象，证明对象不变。