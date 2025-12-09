<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const res:any = await login(loginForm.value)
    
    if (res.code === 200) {
      // 保存 Token
      userStore.setToken(res.data.token)
      
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error(res.message || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">博客管理系统</h2>
      <el-form :model="loginForm" class="login-form">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            size="large"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="footer-links">
            还没有账号？<router-link to="/register" class="link">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.footer-links {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.link {
  color: #409eff;
  text-decoration: none;
  margin-left: 5px;
}

.link:hover {
  text-decoration: underline;
}
</style>