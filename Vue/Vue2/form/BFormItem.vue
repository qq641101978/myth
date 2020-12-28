<template>
  <div>
    <label class="label" v-if="label">{{label}}</label>
    <slot />
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator';
  export default {
    inject:['form'],
    props: {
      label: String,
      prop:String
    },
    data() {
      return {
        errorMessage:'' 
      }
    },
    mounted(){
      // 监听 校验事件
      this.$on('validate',()=>{
        this.validate()
      })
    },
    methods:{
      validate(){
        // console.log('触发校验')
        // 执行校验，
        // 获取规则
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]
        //执行校验(简单校验，后需要引入校验库)
        // rules.map(el=>{
        //   this.errorMessage = (el.required && !value) ? el.message : ''
        // })
        // 执行校验
        const desc = {
          [this.prop]: rules
        }
        const schema = new Schema(desc)
        // 返回 一个 promise 
        return schema.validate({[this.prop]:value}, errors =>{
          this.errorMessage = errors ? errors[0].message : ''
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.label{
  margin-left: -100px;
}
</style>