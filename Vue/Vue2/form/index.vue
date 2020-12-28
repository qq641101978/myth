<template>
  <div>
    <BForm :model="model" :rules="rules" ref="loginForm">
      <BFormItem  label="姓名" prop="userName">
        <BInput v-model="model.userName" />
      </BFormItem>
      <BFormItem label="密码" prop="password">
        <BInput v-model="model.password" type="password"/>
      </BFormItem>
      <BFormItem>
        <button @click="onLogin">登陆</button>
      </BFormItem>
    </BForm>
    {{model}}
  </div>
</template>

<script>
import BInput from './BInput'
import BFormItem from './BFormItem'
import BForm from './BForm'
  export default {
    components:{
      BInput,
      BFormItem,
      BForm
    },
    data() {
      return {
        model:{
          userName:'123',
          password:''
        },
        rules:{
          userName:[{required: true, message:'用户名必填'}],
          password:[{required: true, message:'密码必填'}]
        }
      }
    },
    mounted(){
    },
    methods:{
      onLogin(){
        this.$refs.loginForm.validate((isValid)=>{
          console.log(isValid)
        })
      }
      
    }
  }
</script>

<style lang="scss" scoped>

</style>