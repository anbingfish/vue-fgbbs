<script setup>
import { computed } from "vue";
import { RouterView,RouterLink,useRoute } from 'vue-router'
import store from "../store/index";
import { Operation,Picture,Message,Lock } from "@element-plus/icons-vue";

const isLogin = computed(()=>{
  return store.getters.getIsLogin
})

const route = useRoute()

</script>

<template>
  <div>
    <div class="row" v-show="isLogin">
      <el-container>
        <el-aside width="200px">
          <div class="list-group">
            <el-row class="list-group-row" :class="{ active: route.name==='user/profile' }">
              <RouterLink :to="{ name: 'user/profile' }" class="list-group-item" title="个人信息">
                <el-icon><Operation /></el-icon> 个人信息
              </RouterLink>
            </el-row>
            <el-row class="list-group-row" :class="{ active: route.name==='user/avatar' }">
              <RouterLink :to="{ name: 'user/avatar' }" class="list-group-item" title="修改头像">
                <el-icon><Picture /></el-icon> 修改头像
              </RouterLink>
            </el-row>
            <el-row class="list-group-row" :class="{ active: route.name==='user/email' }">
              <RouterLink :to="{ name: 'user/email' }" class="list-group-item" title="修改邮箱">
                <el-icon><Message /></el-icon> 修改邮箱
              </RouterLink>
            </el-row>
            <el-row class="list-group-row" :class="{ active: route.name==='user/password' }">
              <RouterLink :to="{ name: 'user/password' }" class="list-group-item" title="修改密码">
                <el-icon><Lock /></el-icon> 修改密码
              </RouterLink>
            </el-row>
          </div>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-group{
  text-align: center;
}
.list-group-row{
  border: 2px rgb(62, 138, 224) solid;
}
.list-group-row:first-child{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.list-group-row:last-child{
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.list-group-item{
  display: block;
  width: 100%;
  height: 100%;
  padding: 15px 0;
  text-align: center;
  color: #000;
}
.active{
  background-color: rgb(62, 138, 224);
  .list-group-item{
    padding: 25px 0;
    color: #fff;
    font-size: 24px;
  }
}
</style>