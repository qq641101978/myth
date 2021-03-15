## 原型: 本质是一个对象
- 那什么是原型呢？你可以这样理解：每一个 JavaScript 对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

> ps:继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

- 每一个 JavaScript 对象(除了 null )都具有的一个属性，叫 __proto__ ，这个属性会指向该对象的原型。

- 函数的 prototype 属性指向了一个对象，这个对象正是 调用该构造函数创建的 实例 的原型，也就是这个例子中的 person1 和 person2 的原型。（函数创造的实例如何指向原型）

- 原型指向构造函数: constructor

```js
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
let person1 = new Person();
let person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```
- 实例 指向 原型：__proto__ 
- 构造函数 指向 实例原型：prototype
- 原型 指向 构造 函数：constructor

```js
function Person() {

}

let person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

### 原型链：当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。通过过__proto__链接起来

### 闭包 = 函数 + 函数能够访问的自由变量
- 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。

- 从实践角度：以下函数才算是闭包：
  - 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
  - 在代码中引用了自由变量

### 作用域：程序源代码中定义变量的区域

- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

- JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

### 静态作用域与动态作用域
- 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

- 而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo(); // 1
}

bar();
```
- 控制台打印结果为1，说明 js 是静态作用域

```js
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
      return scope;
  }
  return f();
}
```
```js
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
      return scope;
  }
  return f;
}
checkscope()();
```
- 以上代码执行返回都是 local scope ，this指向 window

### 执行上下文：对象变量，作用域链，this

### 变量：全局对象

