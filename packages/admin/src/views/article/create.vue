<template>
  <div class="article-create-container">
    <el-card shadow="never">
      <!-- 顶部操作栏 -->
      <div class="header-actions">
        <el-input 
          v-model="articleForm.title" 
          placeholder="输入文章标题..." 
          class="title-input"
          size="large"
        />
        <div class="action-buttons">
          <el-button>保存草稿</el-button>
          <el-button type="primary" @click="handlePublish">发布文章</el-button>
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

    <!-- 发布设置弹窗 -->
    <el-dialog v-model="publishDialogVisible" title="发布设置" width="500px">
      <el-form label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="articleForm.category" placeholder="选择分类" style="width: 100%">
            <el-option label="前端开发" value="frontend" />
            <el-option label="后端架构" value="backend" />
          </el-select>
        </el-form-item>
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
          </el-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="articleForm.summary" rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="publishDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmPublish">确认发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Editor } from '@bytemd/vue-next'
import { useRouter } from 'vue-router'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { ElMessage } from 'element-plus'
import { createArticle } from '@/api/article'
// import zhHans from 'bytemd/locales/zh_Hans.json' // 删除这行
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'
const router = useRouter()

const plugins = [
  gfm(),
  highlight(),
]

const articleForm = reactive({
  title: '',
  content: '',
  category: '',
  tags: [] as string[], // 加个类型标注
  summary: ''
})

const publishDialogVisible = ref(false)

const handleChange = (v: string) => {
  articleForm.content = v
}

const handlePublish = () => {
  if (!articleForm.title) {
    alert('请输入标题') 
    return
  }
  publishDialogVisible.value = true
}

const confirmPublish = async() => {
  // 只传递后端需要的字段
  const data = {
    title: articleForm.title,
    content: articleForm.content,
    author: '管理员', // 或者从用户信息中获取
    tags: articleForm.tags
  }
  
  console.log('Publish:', data)
  try {
    const res:any = await createArticle(data)
    if (res.code === 201) {
      ElMessage.success('创建成功')
      publishDialogVisible.value = false
      router.push('/article')
    }
  } catch (error) {
    console.error('创建失败:', error)
    ElMessage.error('发布失败')
  }
}
</script>
<style scoped>
.article-create-container {
  height: calc(100vh - 100px); /* 减去 layout 的 header/padding */
}

/* 覆盖 el-card body 样式，让编辑器尽可能大 */
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
  box-shadow: none !important; /* 去掉输入框边框，更像 Medium */
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

/* 强行修改 ByteMD 高度以适应容器 */
:deep(.bytemd) {
  height: 100%;
}
</style>