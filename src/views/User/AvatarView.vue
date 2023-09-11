<script setup>
import { ref, onMounted } from "vue";
import request from '../../http';

const user = ref({})
onMounted(() => {
  getProfile()
})
function getProfile () {
  request.request({ url: 'user/profile' }).then(res => {
    if (res.code === 1) {
      user.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器无法访问',
      type: 'error'
    })
  })
}

const avatar = ref()
function submit () {
  const file = avatar.value.files[0]

  if (!file) {
    ElMessage({
      message: '请选择一个文件！',
      type: 'error'
    })
    return
  }
  var formData = new FormData()
  formData.append('image', file)
  request.uploadReq({
    url: 'user/updateAvatar',
    body: formData
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      user.value.img_url = res.data.img_url
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  })

}
</script>

<template>
  <div class="profile">
    <ElCard class="card border-secondary">
      <template #header>
        <div class="card-header">修改头像</div>
      </template>
      <div class="card-body text-secondary">
        <div>
          <div class="avatar">
            <div>
              <el-image
                v-if="user.img_url" 
                style="width: 100%; height: 100%"
                :src="user.img_url"
                :zoom-rate="1.2"
                :preview-src-list="[user.img_url]"
                fit="contain"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="form-group">
            <label>请选择图片：</label>
            <input type="file" ref="avatar" class="form-control-file" />
          </div>
          <ElButton @click="submit" type="primary" class="btn btn-primary">上传头像</ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-block;
  padding: 5px;
  border: 1px gray solid;
  background-color: rgb(230, 230, 230);
  border-radius: 3px;
}
.avatar > div {
  display: inline-block;
  width: 130px;
  height: 130px;
  background: #eee;
  border-radius: 0.25rem;
}
.form-group{
  margin: 20px 0;
}
</style>
