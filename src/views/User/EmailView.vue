<script setup>
import { ref } from "vue";
import request from "../../http";

const form = ref({
  password: '',
  email: ''
})

function submit(){
  request.request({
    url: 'user/updateEmail',
    method: 'post',
    body: form.value
  }).then(res => {
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
      form.value.password = ''
      form.value.email = ''
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

</script>


<template>
  <div>
    <transition appear appear-active-class="animated fadeIn">
      <el-card class="card border-secondary">
        <template #header>
          <div class="card-header">修改邮箱</div>
        </template>
        <div class="card-body">
          <div class="form-group">
            <label>输入原密码：</label>
            <el-input type="password" show-password class="form-control-file" v-model="form.password" />
            <small class="text-secondary">为了确保安全，必须输入原密码。</small>
          </div>
          <div class="form-group">
            <label>输入新邮箱：</label>
            <el-input type="text" class="form-control-file" v-model="form.email" />
          </div>
          <el-button @click="submit" type="primary" class="btn-primary">提交修改</el-button>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<style scoped>
.form-group {
  margin: 20px 0;
}

.btn-primary {
  width: 100%;
}
</style>