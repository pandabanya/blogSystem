<template>
  <div class="article-list-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" icon="Plus" @click="$router.push('/article/create')">
            发布文章
          </el-button>
        </div>
      </template>
      
      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input 
          v-model="searchKeyword" 
          placeholder="搜索文章标题..." 
          style="width: 300px" 
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>

      <!-- 表格 -->
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="category" label="分类" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="200">
          <template #default="{ row }">
            <el-tag 
              v-for="tag in row.tags" 
              :key="tag" 
              size="small" 
              class="mx-1"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100" align="center" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'info'">
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticles, deleteArticle } from '@/api/article'

const loading = false
const router = useRouter()
const articles = ref([])
const searchKeyword = ref('')

// 获取文章列表
const handleSearch = async () => {
  try {
    const res:any = await getArticles()
    if (res.code === 200) {
      articles.value = res.data
    }
  } catch (error) {
    console.error('获取文章失败:', error)
  }
}

// 删除文章
const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm('确认删除该文章？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res:any = await deleteArticle(id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      handleSearch()
    }
  } catch (error) {
    console.log('取消删除')
  }
}

// 编辑文章
const handleEdit = (id: string) => {
  router.push(`/article/edit/${id}`)
}

// 新建文章
const handleCreate = () => {
  router.push('/article/create')
}

onMounted(() => {
  handleSearch()
})
</script>


<style scoped>
.article-list-container {
  padding: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-bar {
  margin-bottom: 20px;
}
.mx-1 {
  margin-right: 5px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>