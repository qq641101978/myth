## Fetch 
[相关文章](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

- **XMLHttprequest的问题**
  1. 所有功能集中在一个对象上，书写混乱，不容易维护
  2. 采用传统的事件驱动模式，无法适配新的 Promise Api

- **Fetch Api 的特点**
  1. 并非取代 AJAX，而是对 AJAX 传统 API 的改进
  2. 精细的功能分割，头部信息，请求信息，响应信息等，均分割在不同对象，更有利于处理各种复杂的 AJAX 场景
  3. 使用 Promise Api，更利于异步代码的书写
  4. Fetch Api 并非 ES6 的内容，属于 HTML5 新增的 Web APi
  5. 需要掌握网络通信的知识

### 基本使用
- 使用```fetch```函数即可向服务器发送网络请求
### 参数
- 该函数有两个参数：
  1. 必填：字符串，请求地址
  2. 选填：对象，请求配置
    
- **请求配置对象**
- method：字符串，请求方法，默认值 GET
- headers：对象，请求头信息
- body：请求体内容，必须匹配请求头中的 Content-Type
- mode：字符串，请求模式
  - cors：默认值，配置为该值，会在请求头中加入 origin 和 referer
  - no-cors：配置为该值，不会在请求头中加入 origin 和 referer，跨域的时候可能会出现问题
  - same-origin：指示请求必须在同一个域中发生，如果请求其他域。则会报错
- credentials：如何携带凭据（cookie）
  - omit：默认值，不需要携带cookie
  - same-origin：请求同源地址时携带cookie
  - include：请求任何地址都携带cookie
- cache：**配置缓存模式**
  - default：表示 fetch请求前，将检查 http 缓存
  - no-store：表示 fetch请求完全忽略 http 缓存的存在，意味着请求之前将不再检查 http 缓存。拿到响应后，它也不会更新 http 缓存
  - no-cache：如果存在缓存，发送一个条件查询 request 和一个正常的 request，拿到响应后，它会更新 http 缓存
  - reload：请求之前将忽略 http 缓存的存在，但请求拿到响应后，它将主动更新 http 缓存
  - force-cache：表示 fetch 请求不顾一切的依赖缓存，即使过期了，它依然从缓存中读取，除非没有任何缓存，那么它将发送一个正常的 request
  - only-if-cached：表示 fetch 请求不顾一切的依赖缓存，即使缓存过期，它依然从缓存中读取，如果没有缓存，将抛出错误（该设置只在mode为 same-origin 时有效）

### 返回值
- fetch 函数返回一个 Promise 对象
- 当收到服务器的返回结果后，Promise 进入 resolved 状态，状态数据为 Response 对象
- 当网络发生错误（或其他导致无法完成交互的错误）时，Promise 进入 rejected 状态，状态数据为错误信息

### Request 对象
- 除了使用基本的 fetch 方法，还可以通过创建一个 Request 对象来完成请求（事实上，fetch的内部会帮你创建一个 Request 对象）
```js
new Request(url地址，配置)
```
- 注意点：尽量保证每次请求都是一个新的 Request 对象

### Response 对象
- ok：boolean，当响应消息码在 200～299之间时为 true，其他为 false
- status：number，响应的状态码
- text()：用于处理文本格式的 Ajax 响应。他从响应中获取文本流，将其读完，然后返回一个被解决为 string 对象的 Promise。
- blob()：用于处理二进制文件格式（比如图片或者电子表格）的 Ajax 响应。它读取文件的原始数据，一旦读取完整个文件，就返回一个被解决的 blob 对象的 Promise。
- json()：用于处理 JSON 格式的 Ajax 响应。它将 JSON 数据流转为一个被解决为 Javascript 对象的 Promise。
- redirect()：可以用于重定向到另一个 URL。它会创建一个新的 Promise，以解决来自重定向的 URL 的响应。


### Headers 对象
- 在 Request 和 Response 对象内部，会将传递的请求头对象，转换为 Headers 对象
- Headers 对象中的方法：类比对象方法
  1. has(key)
  2. get(key)
  3. set(key, value)
  4. append(key, value)
  5. keys()
  6. values()
  7. entries()

### 文件上次
- 流程：
  1. 客户端文件数据发送给服务器
  2. 服务器保存上传文件数据到服务器端
  3. 服务器响应客户端一个文件访问地址

- 请求方法：POST
- 请求的表单格式：multipart/form-data
- 请求体中必须包含一个键值对，键的名称是服务器要求的名称，值是文件数据（键的名称：表单域名称）
> HTML5 中，JS仍然无法随意获取文件数据，但是可以获取 input元素中，被用户选中的文件数据
> 可以利用 HTML5 提供的 FormData 构造函数创建请求体