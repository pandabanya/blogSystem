import axios from "axios";

import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002',
  timeout: 5000
})

service.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},error=>{
  return Promise.reject(error)
})

// 响应拦截器（统一处理错误）
service.interceptors.response.use((response)=>{
  const res = response.data
  return res
},error=>{
  if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else {
      ElMessage.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
})


export default service