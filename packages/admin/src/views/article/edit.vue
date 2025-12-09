<template>
  <div class="article-edit-container">
    <el-card shadow="never" v-loading="pageLoading">
      <!-- 顶部操作栏 -->
      <div class="header-actions">
        <el-input 
          v-model="articleForm.title" 
          placeholder="输入文章标题..." 
          class="title-input"
          size="large"
        />
        <div class="action-buttons">
          <el-button @click="router.back()">返回</el-button>
          <el-button type="primary" @click="handleUpdate">更新文章</el-button>
        </div>
      </div>

      <!-- 编辑器区域 -->
      <div class="editor-container">
        <Editor 
          :value="articleForm.content" 
          :plugins="plugins"
          @change="handleChange"
        />
      </div>
    </el-card>

    <!-- 更新设置弹窗 -->
    <el-dialog v-model="updateDialogVisible" title="更新设置" width="500px">
      <el-form label-width="80px">
        <el-form-item label="标签">
          <el-select 
            v-model="articleForm.tags" 
            multiple 
            filterable 
            allow-create 
            placeholder="选择或输入标签"
            style="width: 100%"
          >
            <el-option label="Vue3" value="vue3" />
            <el-option label="TypeScript" value="ts" />
            <el-option label="NestJS" value="nestjs" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmUpdate">确认更新</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Editor } from '@bytemd/vue-next'
import { useRouter, useRoute } from 'vue-router'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { ElMessage } from 'element-plus'
import { getArticle, updateArticle } from '@/api/article'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'

const router = useRouter()
const route = useRoute()
const articleId = route.params.id as string

const plugins = [
  gfm(),
  highlight(),
]

const pageLoading = ref(false)
const updateDialogVisible = ref(false)

const articleForm = reactive({
  title: '',
  content: '',
  tags: [] as string[],
  author: ''
})

// 加载文章详情
const loadArticle = async () => {
  pageLoading.value = true
  try {
    const res: any = await getArticle(articleId)
    if (res.code === 200) {
      articleForm.title = res.data.title
      articleForm.content = res.data.content
      articleForm.tags = res.data.tags || []
      articleForm.author = res.data.author
    } else {
      ElMessage.error('文章加载失败')
      router.back()
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    ElMessage.error('文章加载失败')
    router.back()
  } finally {
    pageLoading.value = false
  }
}

const handleChange = (v: string) => {
  articleForm.content = v
}

const handleUpdate = () => {
  if (!articleForm.title) {
    ElMessage.warning('请输入标题')
    return
  }
  updateDialogVisible.value = true
}

const confirmUpdate = async () => {
  // 只传递后端需要的字段
  const data = {
    title: articleForm.title,
    content: articleForm.content,
    author: articleForm.author,
    tags: articleForm.tags
  }
  
  try {
    const res: any = await updateArticle(articleId, data)
    if (res.code === 200) {
      ElMessage.success('更新成功')
      updateDialogVisible.value = false
      // 跳转回文章列表
      router.push('/article/list')
    }
  } catch (error) {
    console.error('更新失败:', error)
    ElMessage.error('更新失败')
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-edit-container {
  height: calc(100vh - 100px);
}

:deep(.el-card__body) {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header-actions {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-input {
  width: 60%;
  font-size: 18px;
}

:deep(.el-input__wrapper) {
  box-shadow: none !important;
  padding-left: 0;
}

:deep(.title-input .el-input__inner) {
  font-size: 24px;
  font-weight: bold;
}

.editor-container {
  flex: 1;
  overflow: hidden;
}

:deep(.bytemd) {
  height: 100%;
}
</style>
