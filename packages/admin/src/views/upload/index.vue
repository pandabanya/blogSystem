<template>
  <div class="upload-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>图片上传</span>
          <el-tag type="success">ImgBB 免费图床 · 支持 JPG、PNG、GIF，单个不超过 5MB</el-tag>
        </div>
      </template>

      <!-- 上传区域 -->
      <div class="upload-area">
        <el-upload
          class="upload-demo"
          drag
          :auto-upload="false"
          :on-change="handleFileChange"
          :show-file-list="false"
          accept="image/*"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              支持 jpg/png/gif 文件，且不超过 5MB
            </div>
          </template>
        </el-upload>
      </div>

      <!-- 上传历史 -->
      <el-divider>上传历史</el-divider>
      <div class="image-list" v-if="uploadedImages.length > 0">
        <el-row :gutter="20">
          <el-col 
            :xs="12" 
            :sm="8" 
            :md="6" 
            :lg="4" 
            v-for="(image, index) in uploadedImages" 
            :key="index"
          >
            <el-card shadow="hover" class="image-card">
              <el-image
                :src="image.url"
                :preview-src-list="[image.url]"
                fit="cover"
                class="image-preview"
              />
              <div class="image-actions">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="copyUrl(image.url)"
                  text
                >
                  复制链接
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="removeImage(index)"
                  text
                >
                  删除
                </el-button>
              </div>
              <div class="image-url">
                <el-input 
                  :model-value="image.url" 
                  readonly 
                  size="small"
                  @click="copyUrl(image.url)"
                >
                  <template #suffix>
                    <el-icon><DocumentCopy /></el-icon>
                  </template>
                </el-input>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-empty v-else description="暂无上传记录" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 使用 ImgBB 免费图床（无需注册，实际生产环境建议使用自己的对象存储）
// ImgBB API Key（这是公开的 demo key，建议去 imgbb.com 注册获取自己的 key）
// 注册地址：https://imgbb.com/
const IMGBB_API_KEY = 'a57c4185fae059184294ea6da96a576e' // 示例 key，有限制
const uploadUrl = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`

const uploadedImages = ref<{ url: string; name: string }[]>([])

// 文件选择后自动上传
const handleFileChange = async (file: any) => {
  const rawFile = file.raw
  
  // 验证文件
  const isImage = rawFile.type.startsWith('image/')
  const isLt5M = rawFile.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return
  }

  // 创建 FormData
  const formData = new FormData()
  formData.append('image', rawFile)

  try {
    ElMessage.info('上传中...')
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (result.success) {
      const imageInfo = {
        url: result.data.display_url || result.data.url,
        name: rawFile.name
      }
      uploadedImages.value.unshift(imageInfo)
      ElMessage.success('上传成功！')
    } else {
      ElMessage.error(result.error?.message || '上传失败')
    }
  } catch (error) {
    console.error('上传失败:', error)
    ElMessage.error('上传失败，请重试')
  }
}

// 复制链接
const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    ElMessage.success('链接已复制到剪贴板')
  } catch (error) {
    // 降级方案
    const input = document.createElement('input')
    input.value = url
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    ElMessage.success('链接已复制到剪贴板')
  }
}

// 删除图片记录
const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
  ElMessage.success('已删除')
}
</script>

<style scoped>
.upload-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-area {
  padding: 20px 0;
}

.upload-demo {
  display: flex;
  justify-content: center;
}

:deep(.el-upload-dragger) {
  width: 500px;
}

.image-list {
  margin-top: 20px;
}

.image-card {
  margin-bottom: 15px;
}

.image-preview {
  width: 100%;
  height: 150px;
  border-radius: 4px;
}

.image-actions {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

.image-url {
  margin-top: 10px;
}

:deep(.image-url .el-input__inner) {
  font-size: 12px;
  cursor: pointer;
}
</style>
