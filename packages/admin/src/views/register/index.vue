<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">注册账号</h2>
      <el-form :model="registerForm" :rules="rules" ref="formRef" class="register-form">
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名（至少3个字符）"
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码（至少6个字符）"
            size="large"
            prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            size="large"
            prefix-icon="Lock"
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="footer-links">
            已有账号？<router-link to="/login" class="link">立即登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '@/api/auth'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 验证规则
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码至少6个字符'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const res: any = await register({
          username: registerForm.username,
          password: registerForm.password
        })
        
        if (res.code === 201) {
          ElMessage.success('注册成功！请登录')
          router.push('/login')
        } else {
          ElMessage.error(res.message || '注册失败')
        }
      } catch (error: any) {
        ElMessage.error(error.response?.data?.message || '注册失败')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-box {
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
