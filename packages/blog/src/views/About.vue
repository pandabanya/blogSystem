<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 粒子背景 -->
    <canvas ref="particleCanvas" class="particle-bg"></canvas>
    
    <Navbar />
    
    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- 头部 Hero -->
      <section class="text-center mb-20">
        <div class="inline-block mb-8">
          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl mx-auto">
            <div class="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-7xl">
              👨‍💻
            </div>
          </div>
        </div>
        
        <h1 class="text-5xl font-bold mb-4">关于我</h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          一个热爱技术、喜欢分享的前端工程师
        </p>
      </section>

      <!-- 个人简介 -->
      <section class="mb-16 bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
        <h2 class="text-3xl font-bold mb-6 flex items-center gap-2">
          <span>👋</span> 你好，我是张三
        </h2>
        <div class="space-y-4 text-gray-300 leading-relaxed">
          <p>
            我是一名专注于前端开发的工程师，目前在某互联网公司负责前端架构设计与开发工作。
            对 Vue.js 生态、TypeScript、工程化实践有深入研究。
          </p>
          <p>
            编程之外，我喜欢摄影、跑步、撸猫。认为技术是手段，让生活变得更美好才是目的。
            这个博客是我记录技术探索和生活感悟的地方，希望我的分享能对你有所帮助。
          </p>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 flex items-center gap-2">
          <span>💻</span> 技术栈
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="category in techStack" 
            :key="category.name"
            class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
          >
            <h3 class="text-xl font-bold mb-4 text-blue-400">{{ category.name }}</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in category.items" 
                :key="tech"
                class="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 成长时间线 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 flex items-center gap-2">
          <span>📅</span> 成长历程
        </h2>
        <div class="space-y-8">
          <div 
            v-for="(event, i) in timeline" 
            :key="i"
            class="relative pl-8 border-l-2 border-blue-500/30"
          >
            <!-- 时间线节点 -->
            <div class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg"></div>
            
            <div class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">{{ event.icon }}</span>
                <span class="text-blue-400 font-bold">{{ event.year }}</span>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
              <p class="text-gray-400">{{ event.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系方式 -->
      <section class="mb-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
        <h2 class="text-3xl font-bold mb-6 flex items-center gap-2">
          <span>📬</span> 联系我
        </h2>
        <p class="text-gray-300 mb-6">欢迎与我交流技术、分享想法，或者只是打个招呼！</p>
        <div class="grid md:grid-cols-2 gap-4">
          <a 
            v-for="contact in contacts" 
            :key="contact.name"
            :href="contact.link"
            target="_blank"
            class="contact-card"
          >
            <div class="text-3xl mb-2">{{ contact.icon }}</div>
            <div class="font-bold text-white">{{ contact.name }}</div>
            <div class="text-sm text-gray-400">{{ contact.handle }}</div>
          </a>
        </div>
      </section>

      <!-- 博客统计 -->
      <section class="grid md:grid-cols-3 gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 text-center"
        >
          <div class="text-4xl font-bold text-blue-400 mb-2">{{ stat.value }}</div>
          <div class="text-gray-400">{{ stat.label }}</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'

const particleCanvas = ref<HTMLCanvasElement | null>(null)

const techStack = [
  {
    name: '前端核心',
    items: ['Vue 3', 'React', 'TypeScript', 'JavaScript ES6+']
  },
  {
    name: '工程化',
    items: ['Vite', 'Webpack', 'pnpm', 'Monorepo', 'Git']
  },
  {
    name: '样式方案',
    items: ['TailwindCSS', 'SCSS', 'CSS Modules', 'Styled Components']
  },
  {
    name: '后端 & 工具',
    items: ['Node.js', 'NestJS', 'MongoDB', 'Docker', 'Nginx']
  }
]

const timeline = [
  {
    year: '2024',
    icon: '🚀',
    title: '架构升级',
    desc: '负责公司前端架构重构，引入 Monorepo + Micro Frontend 方案'
  },
  {
    year: '2023',
    icon: '📚',
    title: '技术沉淀',
    desc: '开始系统学习前端工程化，发布多个开源项目'
  },
  {
    year: '2022',
    icon: '💼',
    title: '职业转型',
    desc: '加入互联网公司，从事全职前端开发工作'
  },
  {
    year: '2021',
    icon: '🎓',
    title: '自学起步',
    desc: '开始学习前端开发，完成第一个 Vue 项目'
  }
]

const contacts = [
  {
    name: 'GitHub',
    icon: '💻',
    handle: '@zhangsan',
    link: 'https://github.com'
  },
  {
    name: 'Email',
    icon: '📧',
    handle: 'zhangsan@example.com',
    link: 'mailto:zhangsan@example.com'
  },
  {
    name: '掘金',
    icon: '✍️',
    handle: '@张三',
    link: 'https://juejin.cn'
  },
  {
    name: '微信公众号',
    icon: '📱',
    handle: '前端技术分享',
    link: '#'
  }
]

const stats = [
  { value: '42', label: '原创文章' },
  { value: '1.2w', label: '总阅读量' },
  { value: '365', label: '持续天数' }
]

// 简化版粒子动画（复用）
let animationId: number | null = null

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
})

function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const canvasWidth = canvas.width = window.innerWidth
  const canvasHeight = canvas.height = window.innerHeight
  
  const particles: any[] = []
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    })
  }
  
  function animate() {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvasWidth) p.vx *= -1
      if (p.y < 0 || p.y > canvasHeight) p.vy *= -1
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.fill()
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()
}
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

.contact-card {
  @apply bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700;
  @apply hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1;
  @apply transition-all duration-300 text-center;
}
</style>