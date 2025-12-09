<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 阅读进度条 -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${readProgress}%` }"></div>
    </div>
    <!-- 粒子背景（复用首页的，简化版）-->
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <Navbar />

    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- 文章头部 -->
      <header class="mb-12">
        <div class="flex gap-2 mb-4">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
          {{ article.title }}
        </h1>

        <div class="flex items-center gap-6 text-gray-400 text-sm">
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              👨‍💻
            </div>
            <span>张三</span>
          </div>
          <span>{{ article.date }}</span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
              </path>
            </svg>
            {{ article.views }} 阅读
          </span>
        </div>
      </header>

      <div class="grid lg:grid-cols-[1fr_250px] gap-12">
        <!-- 文章内容 -->
        <article class="prose prose-invert prose-lg max-w-none">
          <div v-html="renderedContent" class="markdown-body"></div>
        </article>

        <!-- 目录导航（桌面端）-->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <div class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-bold mb-4">目录</h3>
              <nav class="toc">
                <ul>
                  <li v-for="(item, i) in toc" :key="i">
                    <a :href="`#${item.id}`" :class="['toc-link', `level-${item.level}`]"
                      @click.prevent="scrollToHeading(item.id)">
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>
      </div>

      <!-- 评论区 -->
      <CommentSection v-if="article._id" :articleId="article._id" />

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Navbar from '../components/Navbar.vue'
import CommentSection from '../components/CommentSection.vue'
import { getArticle } from '@/api/article'

const route = useRoute()
const particleCanvas = ref<HTMLCanvasElement | null>(null)
const readProgress = ref(0)

// 计算阅读进度
function updateReadProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / docHeight) * 100
  readProgress.value = Math.min(100, Math.max(0, progress))
}
// Markdown 渲染器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) { }
    }
    return ''
  }
})

// Mock 文章数据
const article: any = ref({
  _id: '',
  title: '加载中...',
  author: '',
  date: '',
  tags: [] as string[],
  views: 0,
  content: '',  // ✅ 必须是空字符串，不能是 undefined
  readTime: 0
})
const fetchArticle = async () => {
  try {
    const id = route.params.id as string
    const res: any = await getArticle(id)
    if (res.code === 200) {
      article.value = {
        _id: res.data._id,
        title: res.data.title,
        author: res.data.author,
        date: new Date(res.data.createdAt).toLocaleDateString('zh-CN'),
        tags: res.data.tags,
        views: res.data.views,
        content: res.data.content || '',  // ✅ 防止后端返回 null/undefined
        readTime: Math.ceil((res.data.content?.length || 0) / 400)
      }
      // 获取数据后生成目录
      setTimeout(() => {
        generateToc()
      }, 100)
    }
  } catch (error) {
    console.error('获取文章失败:', error)
    article.value = {
      title: '文章未找到',
      author: '',
      date: '',
      tags: [],
      views: 0,
      content: '## 文章不存在\n\n请检查文章 ID 是否正确。',
      readTime: 0
    }
  }
}
const renderedContent = computed(() => {
  return md.render(article.value.content || '')  // ✅ 确保始终传入字符串
})

// 生成目录
interface TocItem {
  level: number
  text: string
  id: string
}

const toc = ref<TocItem[]>([])

onMounted(() => {
  fetchArticle()
  generateToc()
  initParticles()
  // 监听滚动事件
  window.addEventListener('scroll', updateReadProgress)
  updateReadProgress() // 初始化进度
})

function generateToc() {
  const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3')
  toc.value = Array.from(headings).map((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    return {
      level: parseInt(heading.tagName.substring(1)),
      text: heading.textContent || '',
      id
    }
  })
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth' })
}
let animationId: number | null = null

// 简化版粒子动画
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
    const canvas = particleCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // 然后在使用前仍然检查
    if (!ctx) return
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
onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  // 移除滚动监听
  window.removeEventListener('scroll', updateReadProgress)
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

.tag {
  @apply px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30;
}

/* 目录样式 */
.toc ul {
  @apply space-y-2;
}

.toc-link {
  @apply block text-gray-400 hover:text-blue-400 transition-colors text-sm;
}

.toc-link.level-2 {
  @apply pl-0;
}

.toc-link.level-3 {
  @apply pl-4 text-xs;
}

/* Markdown 样式 */
.markdown-body {
  @apply text-gray-300 leading-relaxed;
}

.markdown-body :deep(h2) {
  @apply text-3xl font-bold text-white mt-12 mb-6;
}

.markdown-body :deep(h3) {
  @apply text-2xl font-bold text-white mt-8 mb-4;
}

.markdown-body :deep(p) {
  @apply mb-4;
}

.markdown-body :deep(code) {
  @apply bg-gray-800 px-2 py-1 rounded text-blue-300 text-sm;
}

.markdown-body :deep(pre) {
  @apply bg-gray-800 rounded-xl p-6 overflow-x-auto mb-6 border border-gray-700;
}

.markdown-body :deep(pre code) {
  @apply bg-transparent p-0 text-sm;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  @apply mb-4 pl-6;
}

.markdown-body :deep(li) {
  @apply mb-2;
}

/* 阅读进度条 */
.progress-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(55, 65, 81, 0.5);
  z-index: 100;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
