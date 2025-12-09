<template>
  <div class="category-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>分类管理</span>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            添加分类
          </el-button>
        </div>
      </template>

      <!-- 分类列表 -->
      <el-table :data="categories" v-loading="loading" style="width: 100%">
        <el-table-column prop="name" label="分类名称" width="200" />
        <el-table-column prop="slug" label="URL别名" width="150" />
        <el-table-column prop="description" label="描述" min-width="250" />
        <el-table-column prop="articleCount" label="文章数" width="100" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.articleCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'info'">
              {{ row.isActive ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="isEdit ? '编辑分类' : '添加分类'" 
      width="500px"
    >
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="URL别名" prop="slug">
          <el-input v-model="form.slug" placeholder="如：frontend（可自动生成）" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            rows="3"
            placeholder="请输入分类描述"
          />
        </el-form-item>
        <el-form-item label="状态" prop="isActive">
          <el-switch v-model="form.isActive" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const categories = ref<any[]>([])
const formRef = ref()

const form = reactive({
  _id: '',
  name: '',
  slug: '',
  description: '',
  isActive: true
})

const rules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { max: 50, message: '分类名称最多50个字符', trigger: 'blur' }
  ]
}

// 加载分类列表
const loadCategories = async () => {
  loading.value = true
  try {
    const res: any = await request.get('/category')
    if (res.code === 200) {
      categories.value = res.data
    }
  } catch (error) {
    console.error('加载分类失败:', error)
    ElMessage.error('加载分类失败')
  } finally {
    loading.value = false
  }
}

// 添加分类
const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, {
    _id: '',
    name: '',
    slug: '',
    description: '',
    isActive: true
  })
  dialogVisible.value = true
}

// 编辑分类
const handleEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, {
    _id: row._id,
    name: row.name,
    slug: row.slug || '',
    description: row.description || '',
    isActive: row.isActive
  })
  dialogVisible.value = true
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    
    try {
      const data = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        isActive: form.isActive
      }
      
      let res: any
      if (isEdit.value) {
        res = await request.put(`/category/${form._id}`, data)
      } else {
        res = await request.post('/category', data)
      }
      
      if (res.code === 201 || res.code === 200) {
        ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
        dialogVisible.value = false
        loadCategories()
      }
    } catch (error) {
      console.error('操作失败:', error)
      ElMessage.error('操作失败')
    }
  })
}

// 删除分类
const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm('确认删除该分类？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res: any = await request.delete(`/category/${id}`)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadCategories()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (error) {
    console.log('取消删除')
  }
}

// 格式化时间
const formatTime = (time: string) => {
  return new Date(time).toLocaleString('zh-CN')
}

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
.category-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
