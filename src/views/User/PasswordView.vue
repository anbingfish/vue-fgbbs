<script setup>
import { ref } from "vue";
import request from "../../http";

const form = ref({
  old_password: '',
  password: ''
})
const repassword = ref('')

function submit () {
  if (form.value.password && form.value.password !== repassword.value) {
    ElMessage({
      message: '两次输入密码不一致',
      type: 'error'
    })
    return
  }
  request.request({
    url: 'user/updatePassword',
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
      form.value.old_password = ''
      form.value.password = ''
      repassword.value = ''
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
          <div class="card-header">修改密码</div>
        </template>
        <div class="card-body">
          <div class="form-group">
            <label>输入原密码：</label>
            <el-input type="password" show-password v-model="form.old_password" />
            <small class="text-secondary">为了确保安全，必须输入原密码。</small>
          </div>
          <div class="form-group">
            <label>输入新密码：</label>
            <el-input type="password" show-password v-model="form.password" />
          </div>
          <div class="form-group">
            <label>再次输入新密码：</label>
            <el-input type="password" show-password v-model="repassword" />
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