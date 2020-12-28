## form表单实现

- 实现input双向绑定
- 实现局部校验 和全局校验（扩展：同步和异步校验）



## 组件结构功能：
### form：
- 数据模型：model
- 校验规则：rules
- 全局校验方法：validate

### formItem
- 显示label标签
- 执行校验prop
- 显示校验结果

### input
- 数据绑定 v-model
- 通知formItem 执行校验

###  解决的问题：
- input自定义组件怎么实现数据双向绑定
- formItem 怎么执行校验和获取校验信息
- form 怎么实现全局校验，用什么办法把数据模型和校验规则传递给内部组件

### 实现功能后存在的问题

- formItem 可能不是直接嵌套input（中间有dom间隔，不是父子关系）


校验库：async-validator: npm i async-validator -S