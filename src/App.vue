<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <el-container>
    <el-header><Header class="el-header"/></el-header>
    <el-main class="el-main"><RouterView /></el-main>
    <el-footer><Footer class="el-footer"/></el-footer>
  </el-container>
</template>

<style scoped>
.el-header{
  padding: 0;
}
.el-main{
  width: 100%;
  max-width: 1024px;
  margin: auto;
}
</style>
