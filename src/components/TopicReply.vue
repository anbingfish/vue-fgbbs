<script setup>
import { defineProps,ref, onMounted,computed } from "vue";
import request from "../http"
import store from '../store/index'

const props = defineProps({
  topicId: Number
})
const reply = ref({
  id: 0,
  content: ''
})
function resetReply () {
  reply.value.id = 0
  reply.value.content = ''
}

function sendReply(){
  request.request({
    url: 'reply/save',
    method: 'post',
    body: {
      id: reply.value.id,
      topic_id: props.topicId,
      content: reply.value.content
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      resetReply()
      getReply()
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(() => {
    ElMessage({
      message: (reply.value.id?'发布':'修改')+'评论失败。',
      type: 'error'
    })
  })
}

function delReply(index, delReply) {
  ElMessageBox.confirm(
    '确定删除此评论：'+delReply.content+' ？',
    '警告！',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(()=>{
    request.request({
      url: 'reply/del',
      method: 'post',
      body:  {id: delReply.id}
    }).then(res => {
      if (res.code === 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
      } else if (res.code === 1) {
        getReply()
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

const replies = ref([])
const total = ref(0)
onMounted(() => {
  getReply()
})
function getReply(){
  request.request({
    url: 'reply/index',
    body: {
      topic_id: props.topicId,
      page: pageCurrent.value,
      size: 3
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      replies.value = res.data.data
      total.value = res.data.total
    }
  }).catch(() => {
    ElMessage({
      message: '获取评论信息失败。',
      type: 'error'
    })
  })
}

const user=computed(()=>{
  return store.getters.getUser
})
const replyText = ref()
function editReply(newReply){
  reply.value.id = newReply.id
  reply.value.content = newReply.content
  replyText.value.focus()
}

const pageCurrent = ref(1)
function changePage(page){
  pageCurrent.value = page
  getReply()
}
</script>

<template>
  <div class="reply">
    <h3>话题评论</h3>
    <div class="reply-group">
      <div class="list-group-item" v-for="(reply,index) in replies" :key="index">
        <el-row>
          <el-col :span="3"><el-avatar :size="50" :src="reply.user.img_url" /></el-col> 
          <el-col :span="17">
            <el-text tag="b">{{ reply.user.name }} 创建于 {{ reply.create_time }} 更新于 {{ reply.update_time }}</el-text>
            
            <div><el-text size="large">{{ reply.content }}</el-text></div>
          </el-col>
          <el-col :span="3">
            <span v-if="user.role === 'admin' || user.id == reply.user_id">
              <el-button type="primary" class="opt" @click="editReply(reply)">编辑</el-button>
              <el-button type="danger" class="opt" @click="delReply(index, reply)">删除</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :default-page-size="3" :total="total" @current-change="changePage"/>
    <div class="add-reply">
      <el-row>
        <el-col>
          <el-input v-model="reply.content" ref="replyText" type="textarea" :rows="4" placeholder="请输入评论" />
        </el-col>
      </el-row>
      <el-button type="primary" @click="sendReply">{{reply.id ? '修改评论' : '发布评论'}}</el-button>
      <el-button type="primary" @click="resetReply">取消</el-button>
    </div>
  </div>
</template>

<style scoped>
.reply-group{
  margin: 20px 0;
}
.list-group-item{
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 20px;
}
.add-reply{
  margin-top: 20px;
}
</style>
