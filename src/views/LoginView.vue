<script setup>
import { ref } from 'vue'
import request from '../http';
import store from '../store/index'

const form = ref({
  name: '',
  password: ''
})
function login () {
  request.request({
    url: 'user/login',
    method: 'post',
    body: form.value,
  }).then((res)=>{
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      localStorage.setItem('Authorization', res.data.session_id);
      store.commit('LoginIn', res.data)
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常！',
      type: 'error'
    })
  })
}

</script>

<template>
  <div class="login">
    <div class="row">
      <div class="login-logo">
        <h2>FGBBS</h2>
      </div>
      <div class="login-title">用户登录</div>
    </div>
    <div class="form-group">
      <el-input type="text" class="form-control" placeholder="用户名" v-model="form.name" />
    </div>
    <div class="form-group">
      <el-input type="password" show-password class="form-control" placeholder="密码" v-model="form.password" />
    </div>
    <div class="form-group">
      <el-button class="login-submit" @click="login" type="success">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.login {
  margin-top: 20px;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 0px;
  border: 1px solid #dde2e8;
  background: #ffffff;
}
.login-logo {
  text-align: right;
  color: #fd7e14;
}
.login-title {
  text-align: left;
  font-size: 16px;
  line-height: 60px;
}
.form-group{
  margin: 10px 0;
}
.login-submit {
  width: 100%;
}
</style>