// class User {
//   lastName: string
//   firstName: string
//   fullName: string

//   constructor(firstName: string, lastName: string){
//     this.firstName = firstName
//     this.lastName = lastName
//     this.fullName = firstName + ' ' + lastName
//   }
// }
// interface Person {
//   lastName: string,
//   firstName: string
// }
// function greeter(person: Person) {
//   return `hello ${person.firstName} ${person.lastName}`
// }
// let user = new User('bai', 'yongf')

// console.log(greeter(user))

// 接口:为代码定义契约！
//存在属性即可（类型需要对应），不检查顺序

// interface LabelledValue {
//   label: string | number
// }
// function printLabel(LabelledObj: LabelledValue) {
//   console.log(LabelledObj.label)
// }
// const myObj = {
//   label: "1231",
//   id: '001'
// }
// printLabel(myObj)

// 接口的可选属性,捕获参数的错误

// interface Square {
//   color: string
//   area: number
// }
// // ? 可有，可无
// interface SquuareConfig {
//   color?: string
//   width?: number
// }
// function createSquare(config:SquuareConfig): Square {
//   let newSquare = {
//     color :'yellow',
//     area: 100
//   }
//   if(config.color) {
//     newSquare.color = config.color
//   }
//   if(config.width) {
//     newSquare.area = config.width * config.width
//   }
//   return newSquare
// }
// createSquare({color:'bule'})

// 只读属性：readonly 标志符
// 只能读，不能修改

// interface Point {
//   readonly x: number
//   readonly y: number
// }
// const p1: Point = {x: 10, y: 10}
// p1.x = 10

// 范型只读数组

// let a: number[] = [1,2,3,4]
// let ro: ReadonlyArray<number> = a
// ro[0] = 0  //不可以修改
// ro.length = 100 //不可以改变长度
// ro.push(1)  //不可以添加删除元素
// a 数组能改变,也改变ro => 实现单线变化
// a[1] = 1
// console.log(a, ro)
// a = ro
// a 和 ro 不对应、
// 想要赋值 需要使用类型断言 as
// a = ro as number[]

// 额外属性检查：当传入参数多余接口配置类型当时候，我们最好去接口里申明。这样会避免麻烦

// +函数类型：参数列表和函数返回值的类型定义
// interface SearchFunc {
//   (source: string, subString: string): boolean
// }
// let mySearch: SearchFunc

// mySearch = function (source: string, subString: string): boolean {
//   let result = source.search(subString)
//   console.log(result)
//   return result > -1
// }
// mySearch('asdf', 'nnnasd')
// 可简写 ts 会自动去推断
// mySearch = function (src, sub): boolean {
//   let result = src.search(sub)
//   return result > -1
// }
// +可索引类型:索引签名之：数字签名，有索引签名后，在定义其他类型 必须是索引的子集！！！
// interface StringArray {
//   [index: number]: string
  
//   num:number // 编译时候会报错
// }
// let myArray: StringArray = ['Bob', 'Tom']
// let myStr:string = myArray[0]
// console.log(myStr)

// 类类型 (不懂)

// 接口继承：可以继承一个或者多个
// interface Shape {
//   color: string
// }
// interface PenStroke {
//   penWidth: number
// }
// // Squre 继承 Shape
// interface Square extends Shape, PenStroke {
//   sidelLenght: number
// }
// // squre 拥有两个属性了
// let squre = {} as Square
// squre.color = 'blue'
// squre.sidelLenght = 10
// squre.penWidth = 1001

// 接口的混合类型: 类型可以定义为多种形势

// interface Counter {
//   (start: number): string

//   interval: number

//   reset(): void
// }
// function getCounter(): Counter {
//   let cuonter = (function(star: number) {
    
//   }) as Counter
//   cuonter.interval = 123

//   cuonter.reset = function () {

//   }
//   return cuonter
// }

// let foo = getCounter()
// foo(19)
// foo.interval = 10
// foo.reset() 

// 接口继承类   不懂  3-12 小节 需要重新看

// 类——基本例子+继承

// 类：申明了 greeting 属性  构造函数，和greet方法
// class Greeter1 {
//   greeting: string
//   constructor(massage: string) {
//     this.greeting = massage
//   }
//   greet() {
//     return `Hello ${this.greeting}`
//   }
// }
// let greeter1 = new Greeter1('wrold')
// console.log(greeter.greet())

// 继承 扩展现有的类！！！！3-13
// 父类(基类)
// class Animal1 {
//   name: string
//   constructor(name:string) {
//     this.name = name
//   }
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }
// // 子类（派生类）
// class Dog1 extends Animal1 {
//   bark() {
//     console.log(`woof woof`)
//   }
// }
// let dog1 = new Dog1()
// dog1.bark()
// dog1.move(100)
// class Snake extends Animal1{
//   constructor(name: string) {
//     super(name) // 调用父级构造器
//   }

//   move(distance:number = 5) {
//     console.log('Slithering...')
//     super.move(distance)
//   }
// }
// class Horse extends Animal1 {
//   constructor(name: string) {
//     super(name)
//   }

//   move(distance: number = 100) {
//     console.log('Galloping...')
//     super.move(distance)
//   }

// }
// let snake = new Snake('snake')
// let horse = new Horse('horse')
// snake.move()
// horse.move(1000)

// 公共，私有 受保护，readonly 修饰符 3-14
// 公共：public （默认的）
// 私有：private (手动设置)私有父级和子级能互通
// 保护：protected （受保护类型：外界不能访问，只能在派生类中去访问）
// 只读：readonly  不能修改只能读取

// class Animal {
//   private name: string  //私有的
//   constructor(name:string) {
//     this.name = name
//   }
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }

// class Rhino extends Animal {
//   constructor() {
//     super('Rhino')
//   }
// }

// class Employee {
//   private name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }

// let animal = new Animal('Cat')
// let rhino = new Rhino()
// let employee = new Employee('Bob')
// console.log(animal)
// console.log(rhino)
// console.log(employee)

// 保护
// class Person {
//   protected name: string 

//   protected constructor(name: string) {  // 构造函数被保护，不能被外界实例话，只能派生类(子类)去访问
//     this.name = name
//   }
// }

// class Employee extends Person {
//   private department: string

//   constructor(name: string, deparment: string) {
//     super(name)
//     this.department =deparment
//   }

//   getElevatorPiontch() {
//     return `Hello my  name is ${this.name} and I work in ${this.department}`
//   }
// }
// let employee = new Employee('byf', 'dodo')
// console.log(employee.getElevatorPiontch())
// console.log(employee.name) // name 收保护

// 只读：readonly  不能修改只能读取

// class Animal {
//   readonly name: string  //私有的
//   constructor(name:string) {
//     this.name = name
//   }
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }
// let animal = new Animal('Cat')
// // animal.name = '123'  // 不能对 name 修改
// console.log(animal.name)



// 类：存取器 + 静态属性 3- 15

// 存取器实现：用到了 es5 的语法 所以需要 使用命令 tsc demo.ts --target es5

// let passcode = 'BaiMax' // 验证正确才能赋值
// class Employee {
//   private _fullName: string

//   get fullName(): string {
//     return this._fullName
//   }
//   set fullName(newName: string) {
//     if (passcode && passcode === 'BaiMax') {
//       this._fullName = newName
//     } else {
//       console.log('Error: Unauthorized update of employee!')
//     }
//   }
// }

// let employee = new Employee()
// employee.fullName = 'Bob ---'
// console.log(employee.fullName)

// 静态属性：static

// class Grid {
//   static origin = {x: 0, y: 0}
//   scale: number
//   constructor(scale: number){
//     this.scale = scale
//   }
//   fromOrigin(Point: {x: number, y: number}) {
//     let xDist = Point.x - Grid.origin.x  // 类的本身去获取
//     let yDist = Point.y - Grid.origin.y
//     return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
//   }
// }

// let grid1 = new Grid(1.0)
// let grid2 = new Grid(5.0)
// console.log(grid1.fromOrigin({x: 3, y: 4}))
// console.log(grid2.fromOrigin({x: 3, y: 4}))

// 抽象类 ：作为派生类的基类使用，一般不能实例化
// ts 允许类当作接口使用
// abstract：

// 函数：函数基本示例 + 函数类型
// function add(x: number, y: number): number {
//   return x + y
// }
// 完整的函数参数类型,和返回值类型
// let myAdd:(baseValue: number, increment: number) => number = function(x: number, y: number): number {
//   return x + y
// }
// 省略（ts 类型推断）
// let myAdd = function(x: number, y: number): number {
//   return x + y
// }

//可选参数 和 默认参数 以及 剩余参数
// 可选参数: lastNma?:string  可选参数位子必须跟在必须参数的后面
// 默认参数： 默认参数位子最前面  lastName = 'bai' 要获取参数 必须传入 undefined 来获取默认参数
// 剩余参数： ...string[]  对于传参的格式不确定。一个不传和传多个

// function buildName (firstName: string, lastName: string): string {
//   return firstName + lastName
// }
// 可选参数
// function buildName (firstName: string, lastName?: string): string {
//   return firstName + lastName
// }
// 默认参数
// function buildName (firstName = 'bai', lastName: string): string {
//   return firstName + lastName
// }
// 剩余参数（很好用）
// function buildName (firstName: string, ...nameArr:string[]): string {
//   return firstName + nameArr
// }

// let fullName = buildName('bai', 'yf')

// 函数this 和 重载
// this 参数是一个假参数：

// let deck = {
//   suits: ['hearts', 'spades', 'clubs', 'dimonds'],
//   cards: Array(52),
//   createCardPicker: function () {
//     return () => {
//       let pickerCard = Math.floor(Math.random() * 52)
//       let pickerSuits = Math.floor(pickerCard / 13)
//       return {
//         suit: this.suits[pickerSuits],  //这种写法 suit 类型为 any  由this引起
//         card: pickerCard % 13
//       }
//     }
//   }
// }
// let cardPicker = deck.createCardPicker()
// let pickedCard = cardPicker()
// console.log(pickedCard)

// 解决 this 类型问题
// interface Card {
//   suit: string,
//   card: number
// }

// interface Deck {
//   suits: string[]
//   cards: number[]
//   createCardPicker(this: Deck): () => Card
// }
// let deck: Deck = {
//   // 花色
//   suits: ['hearts', 'spades', 'clubs', 'dimonds'],
//   // 牌的数量
//   cards: Array(52),
//   createCardPicker: function (this: Deck) {
//     return () => {
//       // 确定第几张牌 1 ～ 52
//       let pickerCard = Math.floor(Math.random() * 52)
//       // 确定花色 
//       let pickerSuits = Math.floor(pickerCard / 13)
//       return {
//         suit: this.suits[pickerSuits], 
//         card: pickerCard % 13
//       }
//     }
//   }
// }
// let cardPicker = deck.createCardPicker()
// let pickedCard = cardPicker()
// console.log(pickedCard)
// 接口含义：函数addClickListener 返回值为空：参数是一个回调函数 回调函数里 this类型制定为空 返回值 为空 
// interface UIElement {
//   addClickListener(onClick:(this: void, e: Event) => void):void
// }

// class Handler {
//   type: string
//   // 箭头函数帮我节省了很多事情
//   onClickBad = (e: Event) => {
//     this.type = e.type
//   }
// }
// let h = new Handler()
// let uiElement: UIElement = {
//   addClickListener() {

//   }
// }
// uiElement.addClickListener(h.onClickBad)

// 函数重载的目的是让函数有确定的类型

// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
// function reverse(x: number): number; // 函数定义类型1
// function reverse(x: string): string; // 函数定义类型2
// function reverse(x: number | string): number | string {  // 函数实现
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if (typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }
// }

// 范型：T 特定场合定义一种类型变量。尽量不使用any，这样不会丢失信息
// function identity<T>(arg: T): T {
//   return arg
// }
// let output = identity<string>('123')
// let output = identity('123')    // 类型推论实现。不用造成代码冗余

// 范型变量灵活性使用 
// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length)  // 因为 T 是任意属性。所以不一定存在length 我们需要其他操作
//   return arg
// }

// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length)  // 这里定义为T类型的数组模式。所以T存在length
//   return arg
// }

// 范型类:
// 静态属性不能使用范型类型
// class AddClass<T> {
//   zeroValue: T
//   add: (x: T, y: T) => T
// }
// 限定了T 为number 类型
// let myNumber = new AddClass<number>()
// myNumber.zeroValue = 123
// myNumber.add = function(x, y) {
//   console.log(x + y)
//   return x + y
// }
// myNumber.add(myNumber.zeroValue, 2)
// // 限定了T为 string 类型
// let myString = new AddClass<string>()
// myString.zeroValue = '123'
// myString.add = function(x, y) {
//   console.log(x + y)
//   return x + y
// }
// myString.add('12','333')

// 范型约束  把key的值约束在obj里面对应的key上
// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   console.log(obj, key,obj[key])
//   return obj[key]
// }
// let obj = {a: 1, b: 2, c: 3, d: 4}
// getProperty(obj, 'a')
// interface Lengthwise {
//   length: number
// }
// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length)
//   return arg
// }

//类型推断
// 基础：
// let x = [0, 1, null,'122']
// x = [1,2,3,1,'12'] 

// 最佳通用类型
// class Animal {
//   numleas: number
// }
// class Bee extends Animal {

// }
// class Lion extends Animal {

// }
// let foo = [new Bee(), new Lion()] // 如果foo 没有类型定义，会自动推断出 Bee 和 Lion 的联合类型

// 上下文类型
// class Animal {
//   numleas: number
// }
// class Bee extends Animal {

// }
// class Lion extends Animal {
//   name: string
// }
// // Animal[] 在这作为最佳通用类型
// function foo():Animal[] {
//   return [new Bee(), new Lion()]
// }

// 高级类型之 交叉类型 & (把类型拼接到一起)
// 这里定义返回值为 T 和 U 的交叉类型
// function extend<T, U>(first: T, second: U): T & U {
//   let result = {...first, ...second}
//   return result
// }

// 联合类型 | 或，
// 申明foo的类型 为number 或者 string  
// let foo: number | string
// 在联合类型中，我们只能访问共有属性。 
// interface Bird {
//   fiy()
//   layEggs()
// }
// interface Fish {
//   swim()
//   layEggs()
// }

// function getSamllPet(): Bird | Fish {
// // ...
// }
// let b = getSamllPet()
// b.layEggs //共有属性 layEggs 能访问
// b.swim  // 单独属性不能访问

// 类型保护 is typeof instanceof 

// interface Bird {
//   fiy()
//   layEggs()
// }
// interface Fish {
//   swim()
//   layEggs()
// }

// function getSamllPet(): Bird | Fish {
// // ...
// }
// let pet = getSamllPet()
// if (isFish(pet)) {
//   pet.swim()
// } else {
//   pet.fiy()
// }
// // pet is Fish 不是返回值 而是一种谓词 pet 返回类型是否是 Fish 类型的
// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined  // pet的 swim 属性不等于 undefined 就判定为 Fish 类型
// }

// instanceof
// class Bird {
//   fly(){
//     console.log('Bird fly')
//   }
//   layEggs(){
//     console.log('Bird lay eggs')
//   }
// }
// class Fish {
//   swim(){
//     console.log('fish swim')
//   }
//   layEggs(){
//     console.log('fish lay eggs')
//   }
// }
  
// function getRandomPet(): Bird | Fish {
//   return Math.random() > 0.5 ? new Bird() : new Fish()
// }
// let pet = getRandomPet()
// // 其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可
// if (pet instanceof Bird) {
//   pet.fly()
// } else {
//   pet.swim()
// }
// 重构 axios ing。。。