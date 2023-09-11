<script setup>
import { ref, onMounted } from "vue";
import request from "../../http";

const user = ref({})

onMounted(() => {
  getProfile()
})

function getProfile () {
  request.request({url:'user/profile'})
  .then(res => {
    if (res.code === 1) {
      user.value = res.data
    }
  })
  .catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

</script>

<template>
  <div class="profile">
    <el-card>
      <template #header>
        <div>
          个人信息
        </div>
      </template>
      <div>
        <table>
          <tbody>
            <tr>
              <td class="text-right">用户名：</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td class="text-right">邮 箱：</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td class="text-right">注册时间：</td>
              <td>{{ user.create_time }}</td>
            </tr>
            <tr>
              <td class="text-right">最后修改时间：</td>
              <td>{{ user.update_time }}</td>
            </tr>
            <tr>
              <td class="text-right">是否激活：</td>
              <td>
                <span v-if="user.is_active !== undefined">
                  <span v-if="user.is_active" class="text-success">已激活</span><span v-else>未激活</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.text-right{
  text-align: right;
}
</style>
