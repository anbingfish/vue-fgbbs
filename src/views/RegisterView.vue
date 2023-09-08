<script setup>
import { ref } from 'vue'
import request from '../http';

const form = ref({
  name: '',
  password: '',
  email: ''
})
const repassword = ref('')
function register(){
  if (form.value.password && form.value.password !== repassword.value) {
    alert('两次输入密码不一致。')
    return
  }
  request.request({
    url: 'user/register',
    method: 'post',
    body: form.value,
  }).then((res)=>{
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(()=>{
    alert('操作失败，服务器异常。')
  })
}
</script>


<template>
  <div class="register">
    <div class="row">
      <div class="col register-logo">
        <h2>FGBBS</h2>
      </div>
      <div class="col register-title">用户注册</div>
    </div>
    <div class="form-group">
      <el-input type="text" class="form-control" placeholder="用户名" v-model="form.name" />
    </div>
    <div class="form-group">
      <el-input type="email" class="form-control" placeholder="邮箱" v-model="form.email" />
    </div>
    <div class="form-group">
      <el-input type="password" class="form-control" placeholder="密码" v-model="form.password" show-password/>
    </div>
    <div class="form-group">
      <el-input type="password" class="form-control" placeholder="确认密码" v-model="repassword" show-password/>
    </div>
    <div class="form-group">
      <el-button class=" register-submit" @click="register">注册</el-button>
    </div>
  </div>
</template>

<style scoped>
.register {
  margin-top: 20px;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 0px;
  border: 1px solid #dde2e8;
  background: #ffffff;
}
.register-logo {
  text-align: right;
  color: #fd7e14;
}
.register-title {
  text-align: left;
  font-size: 16px;
  line-height: 60px;
}
.form-group{
  margin: 10px 0;
}
.register-submit {
  width: 100%;
}
</style>
