<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DevBlog
          </span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            首页
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            关于
          </router-link>
        </div>

        <!-- Search & Theme Toggle -->
        <div class="flex items-center space-x-4">
          <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>