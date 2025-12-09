<template>
  <div class="article-list-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" icon="Plus" @click="handleCreate">
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
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row._id)">编辑</el-button>
            <el-button link type="success" size="small" @click="handleExport(row._id)">导出</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          background
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticles, deleteArticle, exportArticle } from '@/api/article'

const loading = ref(false)
const router = useRouter()
const articles = ref([])
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取文章列表
const handleSearch = async () => {
  loading.value = true
  try {
    // 传递搜索关键词
    const res:any = await getArticles(
      currentPage.value, 
      pageSize.value, 
      searchKeyword.value || undefined
    )
    if (res.code === 200) {
      // 处理文章数据，添加缺失字段
      articles.value = res.data.list.map((item: any) => ({
        ...item,
        category: item.tags?.[0] || '未分类',  // 从 tags 取第一个作为分类
        status: item.status || 'draft',  // 从后端读取状态，默认为草稿
        createTime: new Date(item.createdAt).toLocaleString('zh-CN')  // 格式化时间
      }))
      total.value = res.data.total
    }
  } catch (error) {
    console.error('获取文章失败:', error)
  } finally {
    loading.value = false
  }
}

// 分页改变
const handlePageChange = (page: number) => {
  currentPage.value = page
  handleSearch()
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

// 导出文章
const handleExport = async (id: string) => {
  try {
    const res: any = await exportArticle(id)
    if (res.code === 200) {
      // 创建 Blob 对象
      const blob = new Blob([res.data.content], { type: 'text/markdown;charset=utf-8' })
      // 创建下载链接
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = res.data.filename || 'article.md'
      document.body.appendChild(a)
      a.click()
      // 清理
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      ElMessage.success('导出成功！')
    }
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  }
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