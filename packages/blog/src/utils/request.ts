import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 5000
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('请求失败:', error)
    return Promise.reject(error)
  }
)

export default request