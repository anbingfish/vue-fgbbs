<script setup>
import { ref,onMounted } from 'vue';
import request from '../http';

import { EditPen } from '@element-plus/icons-vue'


const form = ref({
  title: '',
  content: '',
  category_id: null
})

const cates =  ref([])
onMounted(()=>{
  getCategory()
})
function getCategory () {
  request.request({
    url:'category/index'
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      cates.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

function save(){

}

</script>

<template>
  <div class="bg-light">
    <h2 class="text-center"><el-icon><EditPen /></el-icon>编辑主题</h2>
    <div class="form-group">
      <el-input type="text" v-model="form.title" class="form-control" placeholder="标题" />
    </div>
    <div class="form-group">
      <label>选择分类</label>
      <el-select class="form-control" v-model="form.category_id" placeholder="未选择">
        <el-option v-for="(cate,index) in cates" :key="index" :value="cate.id" :label="cate.name" name="category_id" />
      </el-select>
    </div>
    <div class="form-group">
      <textarea ref="editor"></textarea>
    </div>
    <div class="text-center pb-4">
      <el-button type="primary" class="btn-primary" @click="save">提交话题</el-button>
    </div>
  </div>
</template>

<style scoped>
.form-group{
  margin: 10px 0;
}
.form-control{
  width: 100%;
}
.text-center{
  text-align: center;
}
</style>