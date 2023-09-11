<script setup>
import { ref,computed,onMounted } from 'vue'
import { RouterLink } from "vue-router";
import request from '../http'
import store from '../store/index'

import { Search,User,Edit,EditPen,Operation } from '@element-plus/icons-vue'
import Logout from './icon/Logout.vue'

const user=computed(()=>{
  return store.getters.getUser
})
const isLogin=computed(()=>{
  return store.getters.getIsLogin
})

onMounted(()=>{
  store.getters.getUser||getLoginUser()
})

function getLoginUser () {
  request.request({
    url:'user/userinfo'
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      store.commit('UpdateUser',res.data)
    }
  }).catch(() => {
    ElMessage({
      message: '获取用户信息失败。',
      type: 'error'
    })
  })
}

function logout(){
  request.request({
    url: 'user/logout',
    method: 'post'
  }).then((res) => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      localStorage.removeItem('Authorization');
      store.commit('LoginOut')
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(()=>{
    ElMessage({
      message: '退出失败。',
      type: 'error'
    })
  })
}
</script>

<template>
  <div class="header">
    <nav class="navbar">
      <div class="header-logo">
        <RouterLink :to="{ name: 'home' }">FGBBS</RouterLink>
      </div>
      <div class="navbar-search" id="collapsibleNavbar">
        <el-input class="form-control" type="text" placeholder="Search">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>

      <ul class="navbar-nav" v-if="isLogin">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'user' }">
            <el-icon><User /></el-icon>{{ user.name }}
            <el-text type="danger" v-show="!user.is_active">(待验证)</el-text>
          </RouterLink>
        </li>
        <li class="nav-item" v-show="user.role === 'admin'">
          <RouterLink class="nav-link" :to="{ name: 'category' }">
            <el-icon><Operation /></el-icon>分类管理
          </RouterLink>
        </li>
        <li class="nav-item" v-show="user.role === 'admin'">
          <RouterLink class="nav-link" :to="{ name: 'addTopic' }">
            <el-icon><EditPen /></el-icon>发布主题
          </RouterLink>
        </li>      
        <li class="nav-item">
          <div @click="logout" class="logout">
            退出<el-icon><Logout /></el-icon>
          </div>
        </li>
      </ul>
      
      <ul class="navbar-nav" v-if="!isLogin">
        <li class="nav-item">
          <RouterLink :to="{ name: 'login' }" class="nav-link">
            <el-icon><User /></el-icon>登录
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'register' }" class="nav-link">
            <el-icon><Edit /></el-icon>注册
          </RouterLink>
        </li>
      </ul>

    </nav>

  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: rgba(204, 204, 204, 0.616);
}

.navbar {
  padding: 0 5%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  text-align: center;
  align-items: center;
}

.header-logo {
  color: rgb(74, 155, 230);
  font-size: 32px;
}

.navbar-search {
  flex-grow: 2;
  padding: 0 15%;
}

.navbar-nav {
  display: flex;
  align-items: center;

  .nav-item {
    padding: 0 10px;
    list-style-type: none;
    font-size: 16px;

    .fa-user {
      margin-left: 2px;
      margin-right: 5px;
    }
    .fa-sign-out {
      margin-right: 5px;
    }
    .logout {
      cursor: pointer;
    }
  
  }
  
}

</style>
