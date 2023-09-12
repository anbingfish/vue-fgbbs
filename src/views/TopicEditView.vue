<script setup>
import { ref,onMounted } from 'vue';
import request from '../http';
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

import { EditPen } from '@element-plus/icons-vue'
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/debug/simplemde.css'
import SimpleMDE from 'simplemde'

const form = ref({
  id: route.params.id,
  title: '',
  content: '',
  category_id: null
})

const cates =  ref([])

const editor = ref()
var simplemde
onMounted(()=>{
  getCategory()
  if (form.value.id) {
    getTopic()
  }

  const simplemder = new SimpleMDE({
    element: editor.value,
    placeholder: '请使用 Markdown 格式书写 ;-)，代码片段粘贴时请注意使用高亮语法。',
    spellChecker: false,
    autoDownloadFontAwesome: false,
    autosave: {
      enabled: false,
      uniqueId: 'content'
    },
    showIcons: true,
    autofocus: true,
    renderingConfig: {
      codeSyntaxHighlighting: true
    }
  })
  simplemder.codemirror.on('change', () => {
    // 将改变后的值赋给文章内容
    form.value.content = simplemder.value()
  })
  simplemde = simplemder
})
function getCategory () {
  request.request({
    url:'category/index'
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
      cates.value = res.data
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

function getTopic(){
  request.request({
    url:'topic/show',
    body: { id: form.value.id}
  }).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 1) {
        form.value.title = res.data.title
        form.value.category_id = res.data.category_id
        form.value.content = res.data.content
        simplemde.value(form.value.content)
    }
  }).catch(() => {
    ElMessage({
      message: '操作失败，服务器异常。',
      type: 'error'
    })
  })
}

function save(){
  request.request({
    url: 'topic/save',
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
      router.push({ name: 'showTopic', params: { id: res.data.id } })
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
  <div class="bg-light">
    <h2 class="text-center"><el-icon><EditPen /></el-icon>编辑主题</h2>
    <div class="form-group">
      <el-input type="text" v-model="form.title" class="form-control" placeholder="标题" />
    </div>
    <div class="form-group">
      <label>选择分类</label>
      <el-select class="form-control" v-model="form.category_id" placeholder="未选择">
        <el-option v-for="(cate,index) in cates" :key="index" :value="cate.id" :label="cate.name" name="category_id" />
      </el-select>
    </div>
    <div class="form-group">
      <textarea class="textarea" ref="editor"></textarea>
    </div>
    <div class="text-center pb-4">
      <el-button type="primary" class="btn-primary" @click="save">提交话题</el-button>
    </div>
  </div>
</template>

<style scoped>
.form-group{
  margin: 10px 0;
}
.form-control{
  width: 100%;
}
.text-center{
  text-align: center;
}

</style>