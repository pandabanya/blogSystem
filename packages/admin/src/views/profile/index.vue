<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <!-- 个人信息卡片 -->
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>个人信息</span>
          </template>
          <div class="profile-info">
            <div class="avatar-container">
              <el-avatar :size="100" :src="userInfo.avatar" />
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="handleAvatarUpload"
                accept="image/*"
              >
                <el-button type="primary" size="small" class="mt-3" :loading="uploading">
                  {{ uploading ? '上传中...' : '更换头像' }}
                </el-button>
              </el-upload>
            </div>
            <div class="info-item">
              <span class="label">用户名：</span>
              <span class="value">{{ userInfo.username }}</span>
            </div>
            <div class="info-item">
              <span class="label">角色：</span>
              <el-tag type="success">{{ userInfo.role }}</el-tag>
            </div>
            <div class="info-item">
              <span class="label">注册时间：</span>
              <span class="value">{{ userInfo.createdAt }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 修改密码 -->
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <span>修改密码</span>
          </template>
          <el-form
            :model="passwordForm"
            :rules="passwordRules"
            ref="passwordFormRef"
            label-width="100px"
            style="max-width: 500px"
          >
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input
                v-model="passwordForm.oldPassword"
                type="password"
                placeholder="请输入当前密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="请输入新密码（至少6位）"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="请再次输入新密码"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleChangePassword">
                修改密码
              </el-button>
              <el-button @click="resetPasswordForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 系统信息 -->
        <el-card shadow="hover" class="mt-4">
          <template #header>
            <span>系统信息</span>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
            <el-descriptions-item label="框架">Vue 3 + NestJS</el-descriptions-item>
            <el-descriptions-item label="数据库">MongoDB Atlas</el-descriptions-item>
            <el-descriptions-item label="部署平台">Render + Vercel</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const passwordFormRef = ref()
const uploading = ref(false)

// ImgBB 上传配置
const IMGBB_API_KEY = 'a57c4185fae059184294ea6da96a576e'

// 用户信息
const userInfo = reactive({
  username: '管理员',
  role: 'Admin',
  createdAt: '2024-01-01',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 修改密码
const handleChangePassword = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    
    try {
      // TODO: 调用修改密码 API
      // const res = await changePassword(passwordForm)
      
      // 模拟成功
      ElMessage.success('密码修改成功，请重新登录')
      
      // 重置表单
      resetPasswordForm()
      
      // 可选：退出登录
      // setTimeout(() => {
      //   userStore.setToken('')
      //   router.push('/login')
      // }, 1500)
    } catch (error) {
      console.error('修改密码失败:', error)
      ElMessage.error('修改密码失败')
    }
  })
}

// 重置表单
const resetPasswordForm = () => {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordFormRef.value?.clearValidate()
}

// 上传前验证
const beforeAvatarUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

// 自定义上传方法
const handleAvatarUpload = async (options: any) => {
  const { file } = options
  uploading.value = true

  try {
    const formData = new FormData()
    formData.append('image', file)

    // 发送上传请求到 ImgBB 图床
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (result.success) {
      // 更新头像 URL（优先使用 display_url）
      userInfo.avatar = result.data.display_url || result.data.url
      
      // 持久化到 localStorage（生产环境应调用后端 API 保存到数据库）
      localStorage.setItem('userAvatar', userInfo.avatar)
      
      ElMessage.success('头像更换成功！')
    } else {
      ElMessage.error(result.error?.message || '上传失败')
    }
  } catch (error) {
    console.error('头像上传失败:', error)
    ElMessage.error('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

onMounted(() => {
  // 从 localStorage 或 API 获取用户信息
  const username = localStorage.getItem('username') || '管理员'
  const avatar = localStorage.getItem('userAvatar')
  userInfo.username = username
  if (avatar) {
    userInfo.avatar = avatar
  }
})
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.profile-info {
  text-align: center;
}

.avatar-container {
  margin-bottom: 30px;
}

.mt-3 {
  margin-top: 15px;
}

.mt-4 {
  margin-top: 20px;
}

.info-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  font-weight: 600;
  color: #606266;
  margin-right: 10px;
}

.info-item .value {
  color: #303133;
}
</style>
