<template>
  <div>
    <slot/>
  </div>
</template>

<script>
  export default {
    provide(){
      return {
        form: this
      }
    },
    props:{
      model:{
        type:Object,
        required: true
      },
      rules:{
        type:Object
      }
    },
    methods: {
      validate(cb) {
        // map的结果是一个promise数组
        const tasks = this.$children
        .filter(item => item.prop) //过滤不校验的项
        .map(item => item.validate())
        // 全部校验成功才算通过
        Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>