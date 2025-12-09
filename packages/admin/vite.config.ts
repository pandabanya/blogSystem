import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001 // Admin 运行在 3001 端口
  },
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src',import.meta.url))
    }
  }
})
