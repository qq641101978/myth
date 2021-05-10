// const list: number[] = [1, 2, 3, 4]
// const newList: Array<number | string> = [1, , '2', 3, 4]
// let x: [string, number]
// x = ['10', 10]
// x.push(1)
// console.log(x)
/**
 * as 类型断言
 */
// const str: any = 'abc'
// const strLen = (str as string).length
/**
 * 接口:为代码定义契约！存在属性即可（类型需要对应），不检查顺序
 * readonly 只读属性
 * ? 可不传属性
 */
// interface Person {
//   lastName: string,
//   firstName: string,
//   readonly age?: string | number,
// }
// const greeter = (person: Person): string => {
//   // person.age = 11
//   return `hello-${person.firstName}-${person.lastName}`
// }
// console.log(greeter({ lastName: 'bai', firstName: 'yf', age: 18 }))



/**
 * 范型只读数组
 * a 数组能改变,也改变ro => 实现单线变化
 */
// const a: number[] = [1, 2, 3, 4]
// const ro: readonly number[] = a
// let ro: ReadonlyArray<number> = a
// ro[0] = 0  // 不可以修改
// ro.length = 100 // 不可以改变长度
// ro.push(1)  // 不可以添加删除元素

// a[1] = 1
// console.log(a, ro)
// a = ro
// a 和 ro 不对应、
// 想要赋值 需要使用类型断言 as
// a = ro as number[]


/**
 * 额外属性检查
 * 额外属性检查：当传入参数多余接口配置类型当时候，我们最好去接口里申明。这样会避免麻烦
 * [propName: string]: any 额外属性类型是 any，必须满足其他属性类型，
 */
// interface Obj{
//   width: number,
//   height: number,

//   [propName: string]: any
// }
// const obj: Obj = {
//   width: 100,
//   height: 100,
//   color:'#f40'
// }

/**
 * 函数类型接口：参数列表和函数返回值的类型定义
 */
// interface SearchFunc {
//   (source: string, subString: string): boolean
// }

// const mySearch: SearchFunc = (source: string, subString: string): boolean => {
//   let result = source.search(subString)
//   return result > -1
// }
// mySearch('asdf', 'nnnasd')

/**
 * 可简写, ts 会自动去推断
 */

// const mySearch: SearchFunc = (src, sub) => {
//   let result = src.search(sub)
//   return result > -1
// }


/**
 * 可索引类型:索引签名之：数字签名，有索引签名后，在定义其他类型 必须是索引的子集！！！
 *
 */
// interface StringArray {
//   [propName: number]: string,

// }
// const myArray: StringArray = ['Bob', 'Tom']
// let a: string = myArray[0]

/**
 * 类类型 ：实例部分 和 构造器（静态）部分
 */

// 实例接口，分配的属性类型
// interface ClockInterface {
//   tick()
// }
// 构造器接口，需要的参数类型和返回的实例类型
// interface ClockConstructor {
//   new(hour: number, minute: number): ClockInterface
// }

// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface{
//   return new ctor(hour, minute)
// }
// class DigitalClock implements ClockInterface {
//   constructor(hour: number, minute: number) {

//   }
//   tick() {
//     console.log('deep deep')
//   }
// }

// class AnyloglClock implements ClockInterface {
//   constructor(hour: number, minute: number) {

//   }
//   tick() {
//     console.log('tick toc')
//   }
// }
// createClock(DigitalClock, 11,12)
// createClock(AnyloglClock, 11,12)

/**
 * 接口继承
 * 可继承多个接口
 */

// interface Foo{
//   foo: string
// }
// interface Bar{
//   bar: number
// }
// interface Obj extends Foo, Bar {
//   name: string
// }
// const obj: Obj = {
//   foo: '123',
//   bar: 123,
//   name:'xxx'
// }

/**
 * 接口的混合类型: 类型可以定义为多种形势
 */

// interface Counter {
//   (start: number): string

//   interval: number
//   reset(): void
// }
// function getCounter(): Counter {
//   const cuonter:Counter= ((star: number) => {

//   }) as Counter
//   cuonter.interval = 123

//   cuonter.reset = () => { }
//   return cuonter
// }

// let foo = getCounter()
// foo(19)
// foo.interval = 10
// foo.reset()

/**
 * 接口继承类,会继承类的私有属性
 * 类——基本例子+继承
 */

// 类：申明了 greeting 属性  构造函数，和 greet 方法
// class Greeter {
//   greeting: string
//   constructor(massage: string) {
//     this.greeting = massage
//   }
//   greet(){
//     console.log(`Hello ${this.greeting}`)
//   }
// }
// let greeter = new Greeter('wrold')
// greeter.greet()

/**
 *
 * 继承 扩展现有的类！！！！3-13
 */

// 父类(基类)
// class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }
// 子类（派生类）
// class Dog extends Animal {
//   bark() {
//     console.log(`woof woof`)
//   }
// }
// let dog1 = new Dog('Tom')
// dog1.bark()
// dog1.move(100)

// class Snake extends Animal{
//   move(distance: number = 5) {
//     console.log('Slithering...')
//     super.move(distance)
//   }
// }
// class Horse extends Animal {
//   move(distance: number = 100) {
//     console.log('Galloping...')
//     super.move(distance)
//   }

// }
// let snake = new Snake('snake')
// let horse = new Horse('horse')
// snake.move()
// horse.move(1000)


/**
 * 公共，私有 受保护，readonly 修饰符
 * 公共：public （默认的）
 * 私有：private (手动设置)私有父级和子级能互通
 * 保护：protected （受保护类型：外界不能访问，只能在派生类中去访问）
 * 只读：readonly  不能修改只能读取
 */

// class Animal {
//   private name: string
//   constructor(name: string) {
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
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }

// let animal = new Animal('Cat')
// let rhino = new Rhino()
// let employee = new Employee('Bob')
// animal = rhino
// 不能将类型“Employee”分配给类型“Animal”。类型具有私有属性“name”的单独声明。
// animal = employee

// 保护
// class Person {
//   protected name: string
//   // 构造函数被保护，不能被外界实例化，只能派生类(子类)去访问
//   protected constructor(name: string) {
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
//     console.log(`Hello my  name is ${this.name} and I work in ${this.department}`)
//   }
// }
// let employee = new Employee('byf', 'dodo')
// employee.getElevatorPiontch()
//属性“name”受保护，只能在类“Person”及其子类中访问
// console.log(employee.name)

/**
 * 只读：readonly  不能修改只能读取
 */

// class Animal {
//   readonly name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance}`)
//   }
// }
// let animal = new Animal('Cat')
//无法分配到 "name" ，因为它是只读属性。
// animal.name = '123'
// console.log(animal.name)



/**
 * 类：存取器 + 静态属性
 * 存取器实现：用到了 es5 的语法 所以需要 使用命令 tsc demo.ts --target es5
 */

// let passcode = 'admin' // 验证正确才能赋值
// class Employee {
//   private _fullName: string

//   get fullName(): string {
//     return this._fullName
//   }
//   set fullName(newName: string) {
//     if (passcode && passcode === 'admin') {
//       this._fullName = newName
//     } else {
//       console.log('Error: Unauthorized update of employee!')
//     }
//   }
// }

// const employee = new Employee()
// employee.fullName = 'Bob ---'
// console.log(employee.fullName)

/**
 * 静态属性：static
 */

// class Grid {
//   static origin = {x: 0, y: 0}
//   scale: number
//   constructor(scale: number) {
//     this.scale = scale
//   }
//   fromOrigin(Point: { x: number, y: number }) {
//     let xDist = Point.x - Grid.origin.x  // 类的本身去获取
//     let yDist = Point.y - Grid.origin.y
//     console.log(Math.sqrt(xDist * xDist + yDist * yDist) * this.scale)
//     return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
//   }
// }

// let grid1 = new Grid(1.0)
// let grid2 = new Grid(5.0)
// grid1.fromOrigin({ x: 3, y: 4 })
// grid2.fromOrigin({ x: 3, y: 4 })

/**
 * 抽象类 abstract：作为派生类的基类使用，一般不能实例化
 * ts 允许类当作接口使用
 *

 */
//

/**
 *
 * 函数：函数基本示例 + 函数类型
 */
// function add(x: number, y: number): number {
//   return x + y
// }
/**
 *完整的函数参数类型,和返回值类型
 */
// let myAdd:(baseValue: number, increment: number) => number = function(x: number, y: number): number {
//   return x + y
// }
/**
 * 省略（ts 类型推断）
 */
// let myAdd = function(x: number, y: number): number {
//   return x + y
// }
// or
// let myAdd: (x: number, y: number) => number = function (x, y) {
//   return x + y
// }

/**
 *
 * 可选参数 和 默认参数 以及 剩余参数
 * 可选参数: lastNma?:string  可选参数位子必须跟在必须参数的后面
 * 默认参数： 默认参数位子最前面  lastName = 'bai' 要获取参数 必须传入 undefined 来获取默认参数
 * 剩余参数： ...string[]  对于传参的格式不确定。一个不传和传多个
 */
// function buildName (firstName: string, lastName: string): string {
//   return firstName + lastName
// }
// 可选参数
// function buildName (firstName: string, lastName?: string): string {
//   return firstName + (lastName || '')
// }
// 默认参数
// function buildName (firstName = 'bai', lastName: string): string {
//   return firstName + lastName
// }
// 剩余参数（很好用）
// function buildName(firstName: string, ...rest: string[]): string[] {
//   rest.unshift(firstName)
//   return rest
// }

// let fullName = buildName('bai', 'yf', 'ddd')
// console.log(fullName)


/**
 *
 * 函数this 和 重载
 * this 参数是一个假参数：
 *
 */

// interface Deck {
//   suits: string[],
//   cards: number[],
//   [propName:string]:any
// }
// interface card {
//   suit: string,
//   card: number
// }
// const deck: Deck = {
//   suits: ['hearts', 'spades', 'clubs', 'dimonds'],
//   cards: Array(52),
//   createCardPicker() {
//     return (): card => {
//       let pickerCard = Math.floor(Math.random() * 52)
//       let pickerSuits = Math.floor(pickerCard / 13)
//       return {
//         suit: this.suits[pickerSuits],
//         card: pickerCard % 13
//       }
//     }
//   }
// }
// const cardPicker = deck.createCardPicker()
// const pickedCard = cardPicker()
// console.log(pickedCard)

/**
 * 函数重载的目的是让函数有确定的类型
 * 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
 */

// // 重载类型1
// function reverse(x: number): number
// // 重载类型2
// function reverse(x: string): string
// // 函数实现
// function reverse(x) {
//   if (typeof x === 'number') {
//     return Number(x.toString().split('').reverse().join(''))
//   }
//   else if (typeof x === 'string') {
//     return x.split('').reverse().join('');
//   }
// }
// reverse([])


/**
 *
 * 范型：T 特定场合定义一种类型变量。尽量不使用any，这样不会丢失信息：适用多个类型
 * 我们的本意是，一个函数传入的类型和返回的类型一致，但是不能使用 any
 */

// function identity<T>(arg: T): T {
//   return arg
// }
// let output = identity<string>('123')
// // 类型推论实现。不用造成代码冗余，更为普遍
// let output1 = identity('123')

/**
 * 范型变量灵活性使用
 */
// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length)  // 因为 T 是任意属性。所以不一定存在length 我们需要其他操作
//   return arg
// }

// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length)  // 这里定义为T类型的数组模式。所以T存在length
//   return arg
// }

/**
 * 范型接口
 */
// interface IdentityFn<T> {
//   (arg: T): T
// }
// function identity<T>(arg: T): T {
//   return arg
// }

// const identity1: IdentityFn<number> = identity

/**
 *
 * 范型类:
 * 静态属性不能使用范型类型
 */

// class AddClass<T> {
//   zeroValue: T
//   add: (x: T, y: T) => T
// }
// // 限定了T 为number 类型
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

/**
 * 范型约束:把key的值约束在obj里面对应的key上
 */

// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   console.log(obj, key, obj[key])
//   return obj[key]
// }
// let obj = {a: 1, b: 2, c: 3, d: 4}
// getProperty(obj, 'aa')

// 给范型函数定义约束 length
// interface Lengthwise {
//   length: number
// }
// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length)
//   return arg
// }

/**
 * 类型推断
 * 基础
 */

/**
 * 最佳通用类型
 */
// class Animal {
//   numleas: number
// }
// class Bee extends Animal {

// }
// class Lion extends Animal {

// }
// // 如果 foo 没有类型定义，会自动推断出 Bee 和 Lion 的联合类型
// let foo = [new Bee(), new Lion()]

/**
 * 上下文类型
 */
// class Animal {
//   numleas: number
// }
// class Bee extends Animal {

// }
// class Lion extends Animal {
//   name: string
// }
// // Animal[] 在这作为最佳通用类型
// function foo(): Animal[] {
//   return [new Bee(), new Lion()]
// }

/**
 * 高级类型之 交叉类型 & (把类型拼接到一起)
 * 这里定义返回值为 T 和 U 的交叉类型
 */

// function extend<T, U>(first: T, second: U): T & U {
//   let result = {...first, ...second}
//   return result
// }

/**
 * 联合类型 | 或
 * 在联合类型中，我们只能访问共有属性。
 */

// interface Bird {
//   fiy()
//   layEggs()
// }
// interface Fish {
//   swim()
//   layEggs()
// }

// function getSamllPet(): Bird | Fish {
//   return null
// }
// let b = getSamllPet()
// b.layEggs //共有属性 layEggs 能访问
// b.swim  // 单独属性不能访问

/**
 * 类型保护 is typeof instanceof
 */

// interface Bird {
//   fiy()
//   layEggs()
// }
// interface Fish {
//   swim()
//   layEggs()
// }

// function getSamllPet(): Bird | Fish {
//   return null
// }
// let pet = getSamllPet()
// if (isFish(pet)) {
//   pet.swim()
// } else {
//   pet.fiy()
// }
// // pet is Fish 不是返回值 而是一种谓词 pet 返回类型是否是 Fish 类型的
// function isFish(pet: Fish | Bird): pet is Fish {
//   // pet的 swim 属性不等于 undefined 就判定为 Fish 类型
//   return (pet as Fish).swim !== undefined
// }

/**
 * instanceof
 *  其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可
 */

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
// if (pet instanceof Bird) {
//   pet.fly()
// } else {
//   pet.swim()
// }


// 新征程

// Keyof 该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

interface Person {
  name: string;
  age: number;
  location: string;
}

// 这里 type 会给类型起一个新的名称
type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number

// 枚举
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
console.log(dir['NORTH']) // 0


// Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
type Partial1<T> = {
  [P in keyof T]?: T[P];
};

//在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，
// 将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选
