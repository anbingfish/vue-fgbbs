<script setup>
import { ref,onMounted,computed } from "vue";
import { RouterLink,useRouter } from "vue-router";
const router = useRouter()

import store from '@/store/index'
import request from '@/http'

const isLogin=computed(()=>{
  return store.getters.getIsLogin
})
const user = ref({})
onMounted(()=>{
  getProfile()
})
function getProfile () {
  request.request({
    url:'user/profile'
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      user.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '获取用户信息失败。',
      type: 'error'
    })
  })
}


</script>

<template>
  <div class="model bg-light">
    <div class="modal-header">
      <h3>LightBBS</h3>
    </div>
    <el-divider style="background-color: black;" />
    <el-row class="modal-body" v-if="isLogin">
      <el-col :span="8">
        <RouterLink :to="{ name: 'user' }">
          <el-image style="width:65px" :src="user.img_url" />
        </RouterLink>
      </el-col>
      <el-col :span="10">
        <div style="margin-bottom: 10px;">
          <el-text size="large"><RouterLink :to="{ name: 'user' }">{{ user.name }}</RouterLink></el-text>
        </div>
        <div>
          <el-button type="primary" plain @click="router.push({ name: 'addTopic' })">发布主题</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="modal-body text-center" v-if="!isLogin">
      <div class="mb-2">
        <el-button type="Info" plain @click="router.push({ name: 'register' })">现在注册</el-button>
      </div>
      <div class="small">
        已注册用户请
        <RouterLink :to="{ name: 'login' }">登录</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-center{
  text-align: center;
}
</style>
