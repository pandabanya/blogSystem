<template>
  <div class="comment-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>评论管理</span>
          <el-tag type="info">共 {{ comments.length }} 条评论</el-tag>
        </div>
      </template>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <el-radio-group v-model="filterStatus" @change="handleFilter">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="approved">已通过</el-radio-button>
          <el-radio-button label="pending">待审核</el-radio-button>
          <el-radio-button label="rejected">已拒绝</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 评论列表 -->
      <el-table :data="filteredComments" v-loading="loading" style="width: 100%">
        <el-table-column prop="author" label="评论者" width="120" />
        <el-table-column prop="content" label="评论内容" min-width="300">
          <template #default="{ row }">
            <div class="comment-content">
              {{ row.content }}
              <el-tag v-if="row.parentId" size="small" type="warning" class="ml-2">
                回复
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="articleId" label="所属文章" width="180">
          <template #default="{ row }">
            <el-link 
              v-if="row.articleId?.title" 
              type="primary" 
              :underline="false"
            >
              {{ row.articleId.title }}
            </el-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150">
          <template #default="{ row }">
            {{ row.email || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="likes" label="点赞数" width="80" align="center">
          <template #default="{ row }">
            <el-tag type="success">{{ row.likes || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag 
              :type="getStatusType(row.status)"
            >
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP" width="120">
          <template #default="{ row }">
            <el-text size="small" type="info">{{ row.ip || '-' }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button 
              v-if="row.status === 'pending'"
              link 
              type="success" 
              size="small" 
              @click="handleApprove(row._id, 'approved')"
            >
              通过
            </el-button>
            <el-button 
              v-if="row.status !== 'rejected'"
              link 
              type="warning" 
              size="small" 
              @click="handleApprove(row._id, 'rejected')"
            >
              拒绝
            </el-button>
            <el-button 
              link 
              type="danger" 
              size="small" 
              @click="handleDelete(row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getComments, deleteComment, approveComment } from '@/api/comment'

const loading = ref(false)
const comments = ref<any[]>([])
const filterStatus = ref('all')

// 加载评论列表
const loadComments = async () => {
  loading.value = true
  try {
    const res: any = await getComments()
    if (res.code === 200) {
      comments.value = res.data
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    ElMessage.error('加载评论失败')
  } finally {
    loading.value = false
  }
}

// 筛选评论
const filteredComments = computed(() => {
  if (filterStatus.value === 'all') {
    return comments.value
  }
  return comments.value.filter(comment => comment.status === filterStatus.value)
})

// 处理筛选
const handleFilter = () => {
  // 筛选逻辑已在 computed 中实现
}

// 审核评论
const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
  try {
    const action = status === 'approved' ? '通过' : '拒绝'
    await ElMessageBox.confirm(`确认${action}该评论？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res: any = await approveComment(id, status)
    if (res.code === 200) {
      ElMessage.success(`${action}成功`)
      loadComments()
    }
  } catch (error) {
    console.log('取消操作')
  }
}

// 删除评论
const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm('确认删除该评论？删除后无法恢复！', '警告', {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'error'
    })
    
    const res: any = await deleteComment(id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadComments()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (error) {
    console.log('取消删除')
  }
}

// 获取状态类型
const getStatusType = (status: string) => {
  const typeMap: any = {
    approved: 'success',
    pending: 'warning',
    rejected: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status: string) => {
  const textMap: any = {
    approved: '已通过',
    pending: '待审核',
    rejected: '已拒绝'
  }
  return textMap[status] || status
}

// 格式化时间
const formatTime = (time: string) => {
  return new Date(time).toLocaleString('zh-CN')
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-bar {
  margin-bottom: 20px;
}

.comment-content {
  line-height: 1.6;
  word-break: break-word;
}

.ml-2 {
  margin-left: 8px;
}
</style>
