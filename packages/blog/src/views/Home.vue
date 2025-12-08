<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <section class="mb-16 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          欢迎来到我的博客
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          分享前端开发、架构设计与技术思考
        </p>
      </section>

      <!-- Articles Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
          @click="$router.push(`/article/${article.id}`)"
        >
          <!-- Cover Image -->
          <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span 
                v-for="tag in article.tags" 
                :key="tag"
                class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            
            <h2 class="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ article.title }}
            </h2>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ article.summary }}
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ article.date }}</span>
              <span>{{ article.views }} 阅读</span>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

// Mock 数据
const articles = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    summary: '深入探讨 Vue 3 Composition API 的设计理念与最佳实践，帮助你写出更优雅的代码...',
    tags: ['Vue3', 'TypeScript'],
    date: '2023-12-01',
    views: 1205
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统实战',
    summary: '从泛型到条件类型，全面掌握 TypeScript 的类型体操技巧...',
    tags: ['TypeScript', '进阶'],
    date: '2023-11-28',
    views: 856
  },
  {
    id: 3,
    title: 'Vite 构建原理与优化策略',
    summary: 'ESM、HMR、预构建...深入 Vite 源码，理解现代化构建工具的秘密...',
    tags: ['Vite', '工程化'],
    date: '2023-11-25',
    views: 642
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>