<template>
  <div class="min-h-screen bg-gray-900 text-white relative overflow-hidden">
    <!-- 粒子背景 -->
    <canvas ref="particleCanvas" class="particle-bg"></canvas>
    
    <Navbar />
    
    <main class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Hero - 自我介绍 -->
      <section class="mb-20">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <!-- 头像 -->
          <div class="flex-shrink-0">
            <div class="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl">
              <div class="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </div>
          
          <!-- 介绍文字 -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              你好，我是 <span class="text-blue-400">张三</span>
            </h1>
            <p class="text-xl text-gray-300 leading-relaxed mb-6">
              一名热爱编码的前端工程师 🚀<br />
              专注于 Vue 生态、TypeScript 与工程化实践<br />
              平时喜欢写博客、做开源、撸猫 🐱
            </p>
            
            <!-- 社交链接 -->
            <div class="flex gap-4 justify-center md:justify-start">
              <a href="https://github.com" target="_blank" class="social-link">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="#" class="social-link">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能标签云 -->
      <section class="mb-16 bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>💻</span> 技能栈
        </h2>
        <div class="flex flex-wrap gap-3">
          <span v-for="skill in skills" :key="skill.name" :class="['skill-tag', skill.color]">
            {{ skill.name }}
          </span>
        </div>
      </section>

      <!-- 近期博客 -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold flex items-center gap-2">
            <span>📝</span> 近期博客
          </h2>
          <div class="flex gap-2">
            <button 
              v-for="cat in categories" 
              :key="cat"
              :class="['category-btn', activeCategory === cat && 'active']"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card group"
            @click="$router.push(`/article/${article.id}`)"
          >
            <!-- 封面 -->
            <div :class="['cover', article.coverColor]">
              <div class="text-5xl">{{ article.emoji }}</div>
            </div>

            <!-- 内容 -->
            <div class="p-6">
              <div class="flex gap-2 mb-3">
                <span v-for="tag in article.tags" :key="tag" class="mini-tag">
                  {{ tag }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {{ article.title }}
              </h3>
              
              <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                {{ article.summary }}
              </p>

              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ article.date }}</span>
                <span class="flex items-center gap-1 text-blue-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {{ article.views }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 开源项目 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 flex items-center gap-2">
          <span>🚀</span> 开源项目
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div v-for="project in projects" :key="project.name" class="project-card">
            <div class="text-3xl mb-3">{{ project.icon }}</div>
            <h3 class="font-bold text-white mb-2">{{ project.name }}</h3>
            <p class="text-sm text-gray-400 mb-4">{{ project.desc }}</p>
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                ⭐ {{ project.stars }}
              </span>
              <span>{{ project.lang }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 生活片段 -->
      <section class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
        <h2 class="text-3xl font-bold mb-6 flex items-center gap-2">
          <span>🌈</span> 生活片段
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(life, i) in lifePhotos" :key="i" class="life-card">
            <div class="text-6xl mb-2">{{ life.emoji }}</div>
            <p class="text-sm text-gray-300 font-medium">{{ life.label }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import { getArticles } from '@/api/article'
const activeCategory = ref('全部')

const categories = computed(() => {
  const cats = ['全部']
  articles.value.forEach((article: any) => {
    article.tags.forEach((tag: string) => {
      if (!cats.includes(tag)) {
        cats.push(tag)
      }
    })
  })
  return cats
})
const particleCanvas = ref<HTMLCanvasElement | null>(null)

const skills = [
  { name: 'Vue 3', color: 'bg-green-500/20 text-green-300 border border-green-500/30' },
  { name: 'TypeScript', color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  { name: 'React', color: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' },
  { name: 'Vite', color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  { name: 'Node.js', color: 'bg-lime-500/20 text-lime-300 border border-lime-500/30' },
  { name: 'TailwindCSS', color: 'bg-sky-500/20 text-sky-300 border border-sky-500/30' },
  { name: 'Git', color: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  { name: 'Docker', color: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' }
]
const currentCategory = ref('全部')

const articles = ref<any[]>([])
const fetchArticles = async () => {
  try {
    const res: any = await getArticles()
    if (res.code === 200) {
      // 转换后端数据格式为前端需要的格式
      articles.value = res.data.map((item: any) => ({
        id: item._id,  // MongoDB 的 _id 转为 id
        title: item.title,
        summary: item.content.substring(0, 100) + '...',  // 截取前100字作为摘要
        tags: item.tags,
        date: new Date(item.createdAt).toLocaleDateString('zh-CN'),  // 格式化日期
        views: item.views,
        category: item.tags[0] || '未分类',  // 用第一个标签作为分类
        emoji: getRandomEmoji(),  // 随机生成 emoji
        coverColor: getRandomColor()  // 随机生成背景色
      }))
    }
  } catch (error) {
    console.error('获取文章失败:', error)
  }
}

// 随机 emoji
const getRandomEmoji = () => {
  const emojis = ['🎯', '💡', '🍛', '🎨', '📚', '🚀', '✨', '🔥']
  return emojis[Math.floor(Math.random() * emojis.length)]
}

// 随机背景色
const getRandomColor = () => {
  const colors = [
    'bg-gradient-to-br from-blue-600/80 to-cyan-600/80',
    'bg-gradient-to-br from-purple-600/80 to-pink-600/80',
    'bg-gradient-to-br from-orange-600/80 to-yellow-600/80',
    'bg-gradient-to-br from-pink-600/80 to-red-600/80',
    'bg-gradient-to-br from-green-600/80 to-teal-600/80'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const projects = [
  { name: 'vue3-starter', desc: 'Vue 3 快速启动模板', stars: '1.2k', lang: 'TypeScript', icon: '📦' },
  { name: 'blog-theme', desc: '极简博客主题', stars: '856', lang: 'Vue', icon: '🎨' },
  { name: 'cli-tool', desc: '前端脚手架工具', stars: '642', lang: 'Node.js', icon: '⚡' }
]

const lifePhotos = [
  { emoji: '🐱', label: '我家的猫' },
  { emoji: '📷', label: '摄影爱好' },
  { emoji: '🏃', label: '跑步健身' },
  { emoji: '☕', label: '咖啡时光' }
]

const filteredArticles = computed(() => {
  if (currentCategory.value === '全部') {
    return articles.value
  }
  return articles.value.filter((article: any) =>
    article.tags.includes(currentCategory.value)
  )
})
// 粒子动画
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  
  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2 + 1
  }
  
  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy
    
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
    ctx.fill()
  }
}

let animationId: number
const particles: Particle[] = []

onMounted(() => {
  fetchArticles()
  const canvas = particleCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // 创建粒子
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(particle => {
      particle.update(canvas.width, canvas.height)
      particle.draw(ctx)
    })
    
    // 绘制连线
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 社交链接 */
.social-link {
  @apply px-6 py-3 bg-blue-600 text-white rounded-full;
  @apply hover:bg-blue-700 transition-all duration-300;
  @apply flex items-center gap-2 font-medium text-sm shadow-lg;
}

/* 技能标签 */
.skill-tag {
  @apply px-4 py-2 rounded-full font-medium text-sm transition-all duration-300;
  @apply hover:scale-105 cursor-default;
}

/* 分类按钮 */
.category-btn {
  @apply px-4 py-2 text-sm font-medium text-gray-400 rounded-lg;
  @apply hover:bg-gray-800 transition-colors;
}

.category-btn.active {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

/* 文章卡片 */
.article-card {
  @apply bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-700;
  @apply hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 cursor-pointer;
}

.cover {
  @apply h-32 flex items-center justify-center;
}

.mini-tag {
  @apply px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600;
}

/* 项目卡片 */
.project-card {
  @apply bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-700;
  @apply hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300;
}

/* 生活卡片 */
.life-card {
  @apply bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50;
  @apply hover:scale-105 hover:border-blue-500/50 transition-all duration-300;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>