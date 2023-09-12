<script setup>
import { defineProps } from 'vue'
import { RouterLink } from "vue-router";

const props = defineProps({
  topics: Array
})

</script>

<template>
  <div>
    <el-skeleton :loading="!props?.topics" animated>
      <template #template>
        <div class="card" v-for="i in new Array(5)">
          <el-row>
            <el-col :span="4">
              <el-skeleton-item variant="image" style="width: 80px; height: 80px;" />
            </el-col>
            <el-col :span="19">
              <el-skeleton-item />
              <el-skeleton-item />
            </el-col>
          </el-row>
        </div>
      </template>
      <template #default>
        <el-card class="card" shadow="always" v-for="(topic,index) in props.topics" :key="index">
          <RouterLink :to="{ name: 'showTopic', params: { id: topic.id } }">
            <el-avatar class="avatar" :size="50" :src="topic.user.img_url" />
            <h4><el-text size="large" tag="b">{{ topic.title }}</el-text></h4>
            <div><el-text>{{ topic.user.name }} · {{ topic.update_time }} · 点赞数 {{ topic.likenum }} · 点击数 {{ topic.hits }}</el-text></div>
          </RouterLink>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.card{
  margin: 20px 0;
  padding: 5px;
  height: 100px;
}
.avatar{
  float: left;
  margin-right: 20px;
}
</style>