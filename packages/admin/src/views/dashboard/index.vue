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
    <el-row :gutter="20" class="data-cards" v-loading="loading">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>文章总数</span>
              <el-icon color="#409eff"><Document /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ stats.totalArticles }}</div>
          <div class="card-footer">所有文章</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>已发布</span>
              <el-icon color="#67c23a"><Select /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ stats.publishedArticles }}</div>
          <div class="card-footer">正式发布的文章</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>草稿箱</span>
              <el-icon color="#e6a23c"><EditPen /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ stats.draftArticles }}</div>
          <div class="card-footer">草稿状态文章</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>总浏览量</span>
              <el-icon color="#f56c6c"><View /></el-icon>
            </div>
          </template>
          <div class="card-value">{{ stats.totalViews }}</div>
          <div class="card-footer">累计浏览次数</div>
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
          <div ref="chartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" icon="Edit" @click="router.push('/article/create')">
              发布文章
            </el-button>
            <el-button type="success" icon="Picture" @click="router.push('/upload')">
              上传图片
            </el-button>
            <el-button type="info" icon="Document" @click="router.push('/article/list')">
              文章列表
            </el-button>
            <el-button type="warning" icon="User" @click="router.push('/profile')">
              个人中心
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleStats } from '@/api/article'
import * as echarts from 'echarts'

const router = useRouter()
const loading = ref(false)
const chartRef = ref()
const stats = ref({
  totalArticles: 0,
  publishedArticles: 0,
  draftArticles: 0,
  totalViews: 0
})

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  const chart = echarts.init(chartRef.value)
  
  // 生成近7天的日期
  const dates = []
  const views = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`)
    // 模拟数据：随机生成浏览量
    views.push(Math.floor(Math.random() * 100) + 50)
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: views,
        itemStyle: {
          color: '#409eff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ])
        }
      }
    ]
  }

  chart.setOption(option)

  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

const loadStats = async () => {
  loading.value = true
  try {
    const res: any = await getArticleStats()
    if (res.code === 200) {
      stats.value = res.data
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadStats()
  await nextTick()
  initChart()
})
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
.chart-container {
  height: 300px;
  width: 100%;
}
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.quick-actions .el-button {
  margin-left: 0;
  width: 100%;
}
</style>