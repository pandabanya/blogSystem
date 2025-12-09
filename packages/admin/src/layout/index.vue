<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <div class="logo">Blog Admin</div>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical"
          default-active="/dashboard" text-color="#fff" router>
          <!-- 菜单 -->
          <el-menu-item index="/dashboard">
            <el-icon><icon-menu /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <!-- 文章管理菜单 -->
          <el-sub-menu index="/article">
            <template #title>
              <el-icon>
                <document />
              </el-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
            <el-menu-item index="/article/create">发布文章</el-menu-item>
          </el-sub-menu>
          <!-- 标签管理 -->
          <el-menu-item index="/tag">
            <el-icon><collection-tag /></el-icon>
            <span>标签管理</span>
          </el-menu-item>
          <!-- 分类管理 -->
          <el-menu-item index="/category">
            <el-icon><folder /></el-icon>
            <span>分类管理</span>
          </el-menu-item>
          <!-- 评论管理 -->
          <el-menu-item index="/comment">
            <el-icon><chat-dot-round /></el-icon>
            <span>评论管理</span>
          </el-menu-item>
          <!-- 图片上传 -->
          <el-menu-item index="/upload">
            <el-icon><upload-filled /></el-icon>
            <span>图片上传</span>
          </el-menu-item>
          <!-- 个人中心 -->
          <el-menu-item index="/profile">
            <el-icon><user /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-content">
            <span>管理员</span>
            <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
          </div>
        </el-header>
        <el-main class="main-content">
          <!-- 核心：子页面渲染出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Menu as IconMenu, Document, CollectionTag, UploadFilled, Folder, ChatDotRound, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 清除 token
    userStore.setToken('')
    ElMessage.success('退出成功')
    router.push('/login')
  } catch (error) {
    // 用户取消
  }
}
</script>
<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
}

.sidebar {
  height: 100vh;
  background-color: #545c64;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #434a50;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>