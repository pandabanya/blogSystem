import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port:3000 // Blog 前台运行在 3000 端口
  },
  resolve:{
    alias: {
       '@': fileURLToPath(new URL('./src',import.meta.url))
    }
  }
})
