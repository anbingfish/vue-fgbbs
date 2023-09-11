<script setup>
import { ref, onMounted } from 'vue'
import request from "../http";
import { ElCol } from 'element-plus';

const cates = ref([])

onMounted(() => {
  getCategory()
})

function getCategory () {
  request.request({ url: 'category/index' }).then(res => {
    if (res.code === 1) {
      cates.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}


const newCate = ref({
  sort: '',
  name: ''
})
function add () {
  request.request({
    url: 'category/save',
    method: 'post',
    body: newCate.value
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      getCategory()
      newCate.value.sort = ''
      newCate.value.name = ''
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(() => {
    ElMessage({
      message: '添加失败，服务器异常。',
      type: 'error'
    })
  })
}


function save (cate, name) {
  let data = {
    id: cate.id,
    sort: cate.sort,
    name: cate.name
  }
  request.request({
    url: 'category/save',
    method: 'post',
    body: data
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      getCategory()
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(() => {
    ElMessage({
      message: '修改失败，服务器异常。',
      type: 'error'
    })
  })
}

function del (cate) {
  ElMessageBox.confirm(
    '确定删除此分类：'+cate.name+' ？',
    '警告！',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(()=>{
    request.request({
      url: 'category/del',
      method: 'post',
      body:  {id: cate.id}
    }).then(res => {
      if (res.code === 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
      } else if (res.code === 1) {
        getCategory()
        ElMessage({
          message: res.msg,
          type: 'success'
        })
      }
    }).catch(() => {
      ElMessage({
        message: '删除失败，服务器异常。',
        type: 'error'
      })
    })
  })


}
</script>

<template>
  <div class="cate">
    <!-- 添加分类 -->
    <el-row :gutter="20" class="cate-add">
      <el-col :span="2">
        <el-input type="number" placeholder="排序" v-model="newCate.sort" />
      </el-col>
      <el-col :span="4">
        <el-input type="text" placeholder="分类名称" v-model="newCate.name" />
      </el-col>
      <el-col :span="1">
        <el-button type="primary" class="btn-primary" @click="add">添加</el-button>
      </el-col>
    </el-row>

    <!-- 分类列表 -->
    <el-table :data="cates" stripe table-layout="fixed">
      <el-table-column label="排序" width="200">
        <template #default="cate">
          <el-input type="number" v-model="cate.row.sort" @change="save(cate.row, 'sort')" />
        </template>
      </el-table-column>
      <el-table-column label="分类名">
        <template #default="cate">
          <el-input type="text" v-model="cate.row.name" @change="save(cate.row, 'name')" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="cate">
          <el-button type="danger" class="btn-primary" @click="del(cate.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<style scoped>
.cate-add {
  margin-bottom: 10px;
}
</style>