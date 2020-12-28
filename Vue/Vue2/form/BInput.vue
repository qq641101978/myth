<template>
  <div>
    <!-- 自定义组件实现 v-model 必须实现 :value  @input --> 
    <!-- $attrs 存储着 props 之外的属性 -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs:false, //避免顶层容器继承属性
    props:{
      value:String
    },
    methods:{
      onInput(e){
        // 通知父组件，数值发生变化
        // 单向数据流：父组件修改了子组件的值，子组件触发事件告知值被修改
        this.$emit('input',e.target.value )
        // 通知 FormItem 校验 $parent 为 FormItem
        // 注意：FormItem 必须为他的父组件
        this.$parent.$emit('validate')
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>