<script setup>
import UserInfo from './sidebar/UserInfo.vue';
import BestTopic from './sidebar/BestTopic.vue';
import NewTopic from './sidebar/NewTopic.vue';

</script>

<template>
  <div class="bar">
    <div>
      <UserInfo />
    </div>
    <div>
      <BestTopic />
    </div>
    <div>
      <NewTopic />
    </div>
  </div>
</template>

<style scoped>
.bar{
  background-color: rgb(235, 235, 235);
  margin: 30px;
  padding: 10px;
}
</style>