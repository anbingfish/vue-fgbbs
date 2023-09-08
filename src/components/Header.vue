<script setup>
import User from './icon/User.vue'
import Edit from './icon/Edit.vue'
</script>

<template>
  <div class="header">
    <nav class="navbar">
      <div class="header-logo">
        <a href="/">FGBBS</a>
      </div>
      <div class="navbar-search" id="collapsibleNavbar">
        <input class="form-control" type="text" placeholder="Search" />
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <el-link class="nav-link" href="login">
            <el-icon><User /></el-icon>
            登录
          </el-link>
        </li>
        <li class="nav-item">
          <el-link class="nav-link" href="register">
            <el-icon><Edit /></el-icon>
            注册
          </el-link>
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
.navbar-search{
  flex-grow: 2;
  
  input{
    width: 70%;
    height: 40px;
  }
}
.navbar-nav{
  display: flex;
  align-items: center;
  .nav-item{
    padding: 0 10px;
    list-style-type: none;
    font-size: 16px;
    
  }
}
</style>
