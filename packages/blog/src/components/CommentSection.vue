<template>
  <div class="comment-section">
    <h2 class="section-title">💬 评论区 ({{ comments.length }})</h2>

    <!-- 发表评论表单 -->
    <div class="comment-form-wrapper">
      <form @submit.prevent="handleSubmit" class="comment-form">
        <div class="form-header">
          <input
            v-model="form.author"
            type="text"
            placeholder="昵称 *"
            required
            class="input-field"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="邮箱（选填）"
            class="input-field"
          />
          <input
            v-model="form.website"
            type="url"
            placeholder="网站（选填）"
            class="input-field"
          />
        </div>
        <textarea
          v-model="form.content"
          placeholder="写下你的评论..."
          required
          rows="4"
          class="textarea-field"
        ></textarea>
        <button type="submit" :disabled="submitting" class="submit-btn">
          {{ submitting ? '发送中...' : '发表评论' }}
        </button>
      </form>
    </div>

    <!-- 评论列表 -->
    <div v-if="comments.length > 0" class="comment-list">
      <div v-for="comment in comments" :key="comment._id" class="comment-item">
        <!-- 评论内容 -->
        <div class="comment-header">
          <div class="author-info">
            <div class="avatar">{{ comment.author.charAt(0).toUpperCase() }}</div>
            <div>
              <div class="author-name">
                {{ comment.author }}
                <a v-if="comment.website" :href="comment.website" target="_blank" class="website-link">
                  🔗
                </a>
              </div>
              <div class="comment-time">{{ formatTime(comment.createdAt) }}</div>
            </div>
          </div>
        </div>
        
        <div class="comment-content">{{ comment.content }}</div>
        
        <div class="comment-actions">
          <button @click="handleLike(comment._id)" class="action-btn">
            👍 {{ comment.likes || 0 }}
          </button>
          <button @click="toggleReply(comment._id)" class="action-btn">
            💬 回复
          </button>
        </div>

        <!-- 回复表单 -->
        <div v-if="replyingTo === comment._id" class="reply-form">
          <form @submit.prevent="handleReply(comment._id)" class="comment-form">
            <textarea
              v-model="replyContent"
              placeholder="写下你的回复..."
              required
              rows="3"
              class="textarea-field"
            ></textarea>
            <div class="reply-actions">
              <button type="button" @click="cancelReply" class="cancel-btn">取消</button>
              <button type="submit" class="submit-btn">发送回复</button>
            </div>
          </form>
        </div>

        <!-- 子回复列表 -->
        <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
          <div v-for="reply in comment.replies" :key="reply._id" class="reply-item">
            <div class="comment-header">
              <div class="author-info">
                <div class="avatar small">{{ reply.author.charAt(0).toUpperCase() }}</div>
                <div>
                  <div class="author-name">{{ reply.author }}</div>
                  <div class="comment-time">{{ formatTime(reply.createdAt) }}</div>
                </div>
              </div>
            </div>
            <div class="comment-content">{{ reply.content }}</div>
            <div class="comment-actions">
              <button @click="handleLike(reply._id)" class="action-btn">
                👍 {{ reply.likes || 0 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-comments">
      <p>暂无评论，来抢沙发吧~ 🛋️</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getComments, createComment, likeComment } from '@/api/comment'

const props = defineProps<{
  articleId: string
}>()

const comments = ref<any[]>([])
const submitting = ref(false)
const replyingTo = ref<string | null>(null)
const replyContent = ref('')

const form = ref({
  author: '',
  email: '',
  website: '',
  content: ''
})

// 加载评论列表
const loadComments = async () => {
  try {
    const res: any = await getComments(props.articleId)
    if (res.code === 200) {
      comments.value = res.data
    }
  } catch (error) {
    console.error('加载评论失败:', error)
  }
}

// 发表评论
const handleSubmit = async () => {
  submitting.value = true
  try {
    const res: any = await createComment({
      articleId: props.articleId,
      ...form.value
    })
    
    if (res.code === 201) {
      alert('评论成功！')
      form.value.content = ''
      loadComments()
    }
  } catch (error) {
    console.error('评论失败:', error)
    alert('评论失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 切换回复框
const toggleReply = (commentId: string) => {
  replyingTo.value = replyingTo.value === commentId ? null : commentId
  replyContent.value = ''
}

// 取消回复
const cancelReply = () => {
  replyingTo.value = null
  replyContent.value = ''
}

// 发送回复
const handleReply = async (parentId: string) => {
  try {
    const res: any = await createComment({
      articleId: props.articleId,
      author: form.value.author || '匿名用户',
      email: form.value.email,
      content: replyContent.value,
      parentId
    })
    
    if (res.code === 201) {
      alert('回复成功！')
      cancelReply()
      loadComments()
    }
  } catch (error) {
    console.error('回复失败:', error)
    alert('回复失败，请重试')
  }
}

// 点赞评论
const handleLike = async (commentId: string) => {
  try {
    const res: any = await likeComment(commentId)
    if (res.code === 200) {
      loadComments()
    }
  } catch (error) {
    console.error('点赞失败:', error)
  }
}

// 格式化时间
const formatTime = (time: string) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN')
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-section {
  margin-top: 60px;
  padding: 30px;
  background: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #fff;
}

/* 评论表单 */
.comment-form-wrapper {
  margin-bottom: 40px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.input-field {
  padding: 12px 16px;
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(31, 41, 55, 1);
}

.textarea-field {
  padding: 12px 16px;
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s;
}

.textarea-field:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(31, 41, 55, 1);
}

.submit-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  align-self: flex-end;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 评论列表 */
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  padding: 20px;
  background: rgba(31, 41, 55, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.author-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.avatar.small {
  width: 32px;
  height: 32px;
  font-size: 14px;
}

.author-name {
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.website-link {
  font-size: 14px;
  text-decoration: none;
}

.comment-time {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}

.comment-content {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 12px;
  word-break: break-word;
}

.comment-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 6px 12px;
  background: rgba(75, 85, 99, 0.3);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 6px;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
  color: #3b82f6;
}

/* 回复表单 */
.reply-form {
  margin-top: 15px;
  padding: 15px;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 8px;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 6px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* 回复列表 */
.replies-list {
  margin-top: 15px;
  padding-left: 30px;
  border-left: 2px solid rgba(59, 130, 246, 0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reply-item {
  padding: 15px;
  background: rgba(17, 24, 39, 0.3);
  border-radius: 8px;
}

/* 空状态 */
.empty-comments {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
}
</style>
