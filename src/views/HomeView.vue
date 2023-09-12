<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
import request from '../http';

import TopicList from '../components/TopicList.vue';
import Sidebar from "../components/Sidebar.vue";

const topics = ref()
const categories = ref([])
onMounted(()=>{
  getCategory()
  getTopic(route.params.cate)
})

const cate_active = ref(0)
function getCategory(){
  request.request({url: 'category/index'}).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      categories.value = res.data
      cate_active.value = parseInt(route.params?.cate || 0)
    }
  }).catch(() => {
    ElMessage({
      message: '获取分类信息失败。',
      type: 'error'
    })
  })
}

const total = ref(0)
function getTopic(id=0, page=1){
  request.request({
    url: 'topic/list',
    body: {
      category_id: id,
      page: page,
      size: 5
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      topics.value = res.data.data
      total.value = res.data.total
    }
  }).catch(() => {
    ElMessage({
      message: '获取话题信息失败。',
      type: 'error'
    })
  })
}

function changeCategory(id){
  router.replace({name: 'topicList', params: {cate: id, page: 1}})
}
function changePage(page){
  router.replace({name: 'topicList', params: {cate: route.params.cate, page: page}})
}

watch(
  () => route.params,
  (params, prevParams) => {
    getTopic(params.cate,params.page)
  }
)

</script>

<template>
  <el-row>
    <el-col :span="16">
      <el-tabs type="card" :model-value="cate_active" @tab-change="changeCategory">
        <el-tab-pane label="全部" :name="0" />
        <el-tab-pane v-for="(category,index) in categories" :key="index" :label="category.name" :name="category.id"/>
      </el-tabs>
      <TopicList :topics="topics"/>
      <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :default-page-size="5" :total="total" @current-change="changePage"/>
    </el-col>
    <el-col :span="8">
      <Sidebar />
    </el-col>
  </el-row>
</template>

