<template>
  <div class="tag-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <el-button type="primary" icon="Plus" @click="dialogVisible = true">
            添加标签
          </el-button>
        </div>
      </template>

      <!-- 标签展示区 -->
      <div class="tag-list" v-loading="loading">
        <div v-if="tags.length === 0" class="empty-state">
          <el-empty description="暂无标签数据" />
        </div>
        <div v-else class="tag-grid">
          <el-card 
            v-for="tag in tags" 
            :key="tag.name" 
            shadow="hover" 
            class="tag-card"
          >
            <div class="tag-info">
              <el-tag :type="getTagType(tag.count)" size="large">
                {{ tag.name }}
              </el-tag>
              <div class="tag-count">{{ tag.count }} 篇文章</div>
            </div>
            <div class="tag-actions">
              <el-button type="danger" size="small" text @click="handleDelete(tag.name)">
                删除
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>

    <!-- 添加标签对话框 -->
    <el-dialog v-model="dialogVisible" title="添加标签" width="400px">
      <el-form :model="tagForm" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="tagForm.name" placeholder="请输入标签名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticles } from '@/api/article'

const loading = ref(false)
const dialogVisible = ref(false)
const tags = ref<{ name: string; count: number }[]>([])
const tagForm = ref({
  name: ''
})

// 获取所有标签及使用次数
const loadTags = async () => {
  loading.value = true
  try {
    // 获取所有文章（不分页）
    const res: any = await getArticles(1, 1000)
    if (res.code === 200) {
      // 统计标签使用次数
      const tagMap = new Map<string, number>()
      res.data.list.forEach((article: any) => {
        if (article.tags && Array.isArray(article.tags)) {
          article.tags.forEach((tag: string) => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
          })
        }
      })
      
      // 转换为数组并按使用次数排序
      tags.value = Array.from(tagMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    }
  } catch (error) {
    console.error('加载标签失败:', error)
    ElMessage.error('加载标签失败')
  } finally {
    loading.value = false
  }
}

// 根据使用次数返回不同的标签类型
const getTagType = (count: number) => {
  if (count >= 10) return 'danger'
  if (count >= 5) return 'warning'
  if (count >= 3) return 'success'
  return ''
}

// 添加标签（示例功能，实际需要创建一篇文章）
const handleAdd = () => {
  if (!tagForm.value.name) {
    ElMessage.warning('请输入标签名称')
    return
  }
  ElMessage.info('标签需要在发布文章时添加')
  dialogVisible.value = false
  tagForm.value.name = ''
}

// 删除标签（提示）
const handleDelete = async (tagName: string) => {
  try {
    await ElMessageBox.confirm(
      `删除标签"${tagName}"需要手动从所有文章中移除该标签`,
      '提示',
      {
        confirmButtonText: '知道了',
        showCancelButton: false,
        type: 'info'
      }
    )
  } catch (error) {
    // 用户关闭弹窗
  }
}

onMounted(() => {
  loadTags()
})
</script>

<style scoped>
.tag-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-list {
  min-height: 300px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.tag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.tag-card {
  padding: 15px;
  transition: all 0.3s;
}

.tag-card:hover {
  transform: translateY(-5px);
}

.tag-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.tag-count {
  font-size: 14px;
  color: #909399;
}

.tag-actions {
  display: flex;
  justify-content: center;
}
</style>
