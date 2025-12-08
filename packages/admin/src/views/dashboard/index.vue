<template>
  <div class="dashboard-container">
    <!-- 欢迎栏 -->
    <el-card class="welcome-card" shadow="hover">
      <div class="welcome-content">
        <el-avatar :size="64" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="welcome-text">
          <h2>早安，管理员，祝你开心每一天！</h2>
          <p>今日天气晴朗，气温 20℃ - 28℃</p>
        </div>
      </div>
    </el-card>

    <!-- 数据概览卡片 -->
    <el-row :gutter="20" class="data-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>总访问量</span>
              <el-tag type="success">日</el-tag>
            </div>
          </template>
          <div class="card-value">25,848</div>
          <div class="card-footer">日同比 12.5% <el-icon color="red"><CaretTop /></el-icon></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>文章总数</span>
              <el-tag>月</el-tag>
            </div>
          </template>
          <div class="card-value">128</div>
          <div class="card-footer">本月新增 4 篇</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>评论数</span>
              <el-tag type="warning">周</el-tag>
            </div>
          </template>
          <div class="card-value">492</div>
          <div class="card-footer">周同比 5.2% <el-icon color="green"><CaretBottom /></el-icon></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统消息</span>
            </div>
          </template>
          <div class="card-value">8</div>
          <div class="card-footer">未读消息</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区：图表与动态 -->
    <el-row :gutter="20" class="main-row">
      <el-col :span="16">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <span>访问趋势</span>
          </template>
          <div class="chart-placeholder">
            <!-- 这里后续会放 ECharts -->
            图表区域 (ECharts Placeholder)
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" icon="Edit">发布文章</el-button>
            <el-button type="success" icon="Picture">上传图片</el-button>
            <el-button type="warning" icon="Setting">系统设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import { CaretTop, CaretBottom, Edit, Picture, Setting } from '@element-plus/icons-vue'
// 注意：图标需要先导入。如果你在 main.ts 里没有全局注册图标组件，这里需要按需导入。
// 或者我们在 main.ts 里统一注册所有图标（推荐做法，见下一步）。
</script>

<style scoped>
.dashboard-container {
  padding: 10px;
}
.welcome-card {
  margin-bottom: 20px;
}
.welcome-content {
  display: flex;
  align-items: center;
}
.welcome-text {
  margin-left: 20px;
}
.welcome-text h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}
.welcome-text p {
  margin: 10px 0 0;
  color: #909399;
}
.data-cards {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 10px 0;
}
.card-footer {
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
}
.main-row {
  margin-top: 20px;
}
.chart-placeholder {
  height: 300px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.quick-actions .el-button {
  margin-left: 0; 
}
</style>