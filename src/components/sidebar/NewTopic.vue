<script setup>
import { ref,onMounted,computed } from "vue";
import { RouterLink,useRouter } from "vue-router";
import request from '@/http'

const router = useRouter()

const topics = ref([])
const size = 5
onMounted(() => {
  getNewTopic()
})
function getNewTopic(){
  request.request({
    url: 'topic/new',
    body: {
      size: size
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      topics.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '获取最新话题信息失败。',
      type: 'error'
    })
  })
}
</script>

<template>
  <div class="model bg-light">
    <div class="modal-header">
      <h5 class="modal-title small">最新发布的话题</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item bg-light small" v-for="topic in topics" :key="topic.id">
        <router-link :to="{ name: 'showTopic', params: { id: topic.id } }">{{ topic.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.modal-header {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.list-group-item {
  padding: 0.4rem 1.25rem;
  border: 0;
}
.list-group-item a {
  color: #666;
}
</style>
