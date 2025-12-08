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
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-content">
            <span>管理员</span>
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
import { Menu as IconMenu, Document } from '@element-plus/icons-vue'
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