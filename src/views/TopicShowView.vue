<script setup>
import { ref, onMounted,computed } from "vue";
import { useRoute,useRouter,RouterLink } from "vue-router";
const route = useRoute()
const router = useRouter()
import request from "../http"
import store from '../store/index'

import showdown from 'showdown'
const converter = new showdown.Converter()

import TopicReply from "../components/TopicReply.vue"
import Sidebar from "../components/Sidebar.vue"
import LikeThumb from "../components/icon/LikeThumb.vue"

const id = ref(route.params.id)
onMounted(() => {
  getTopic()
  getLike()
})

const topic = ref({
  user: {}
})
function getTopic () {
  request.request({
    url: 'topic/show',
    body: { id: id.value }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      topic.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '获取话题信息失败。',
      type: 'error'
    })
  })
}

const isLike = ref(false)
function getLike () {
  request.request({
    url: 'like/isLike',
    body: { id: id.value }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      isLike.value = res.data.isLike
    }
  }).catch(() => {
    ElMessage({
      message: '获取点赞信息失败。',
      type: 'error'
    })
  })
}

function likeTopic(changeLike){
  request.request({
    url: 'like/setLike',
    method: 'post',
    body: {
      id: id.value,
      isLike: changeLike
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      isLike.value = res.data.isLike
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

function delTopic (topic) {
  ElMessageBox.confirm(
    '确定删除此话题：'+topic.title+' ？',
    '警告！',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(()=>{
    request.request({
      url: 'topic/del',
      method: 'post',
      body:  {id: topic.id}
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
        router.push({ name: 'home' })
      }
    }).catch(() => {
      ElMessage({
        message: '删除失败，服务器异常。',
        type: 'error'
      })
    })
  })
}

const user = computed(() => {
  return store.getters.getUser
})
</script>

<template>
  <el-row>
    <el-col :span="16">
      <div class="topic">
        <div class="panel bg-light">
          <div class="panel-heading">
            <el-avatar class="avatar" :size="50" :src="topic.user.img_url" />
            <h3><el-text size="large" tag="b">{{ topic.title }}</el-text></h3>
            <div>
              <el-text>作者 {{ topic.user.name }} / 阅读数 {{ topic.hits }} / 点赞数 {{ topic.likenum }}</el-text>
              <span v-if="isLike !== null">
                <el-link v-if="isLike" :underline="false" type="danger" class="opt" @click="likeTopic(false)">
                  <el-icon><LikeThumb /></el-icon>取消点赞
                </el-link>
                <el-link v-else :underline="false" type="info" class="opt" @click="likeTopic(true)">
                  <el-icon><LikeThumb /></el-icon>点赞
                </el-link>
              </span>            
            </div>
          </div>
          <el-divider />
          <div class="panel-body">
            <div class="markdown-body" v-html="converter.makeHtml(topic.content)"></div>
            <el-divider />
            <div class="topic-info">
              <el-text>创建时间 {{ topic.create_time }} / 更新时间 {{ topic.update_time }}</el-text>
              <div class="opt" v-if="user.role === 'admin' || topic.user_id === user.id">
                <el-button type="primary" @click="router.push({ name: 'edit', params: { id: id } })">编辑</el-button>
                <el-button type="danger" @click="delTopic(topic)">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 40px;"><TopicReply :topicId="id" /></div>
    </el-col>
    <el-col :span="8">
      <Sidebar />
    </el-col>
  </el-row>
</template>

<style>
.avatar {
  float: left;
  margin-right: 20px;
}
.opt{
  float: right;
  padding: 0 10px;
}
</style>