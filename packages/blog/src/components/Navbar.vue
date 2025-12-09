<template>
  <nav class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform shadow-lg"></div>
          <span class="text-xl font-bold text-white">我的博客</span>
        </router-link>

        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/about" class="nav-link">关于</router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 移动端菜单 -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
          <router-link 
            to="/" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            首页
          </router-link>
          <router-link 
            to="/about" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            关于
          </router-link>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-blue-400 transition-colors font-medium;
}

.mobile-nav-link {
  @apply block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all;
}

/* 移动菜单动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>