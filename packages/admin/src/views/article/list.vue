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
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
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
import { ref } from 'vue'

const searchKeyword = ref('')
const loading = ref(false)

// 模拟数据
const tableData = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 最佳实践',
    category: '前端开发',
    tags: ['Vue3', 'TypeScript'],
    views: 1205,
    status: 'published',
    createTime: '2023-10-24 10:00:00'
  },
  {
    id: 2,
    title: '深入理解 TypeScript 泛型',
    category: 'TypeScript',
    tags: ['TS', '进阶'],
    views: 856,
    status: 'draft',
    createTime: '2023-10-23 14:30:00'
  }
]

const handleSearch = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 500)
}
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