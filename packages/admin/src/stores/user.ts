import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({
    name: 'Admin',
    avatar: ''
  })

  // actions
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = ''
    userInfo.value = { name: '', avatar: '' }
    localStorage.removeItem('token')
  }

  // 模拟登录 Action (把业务逻辑移到 Store 里)
  async function login(username: string, password: string): Promise<boolean> {
    // 这里模拟 API 请求
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          const mockToken = 'mock-token-' + Date.now()
          setToken(mockToken) // 调用内部方法，统一管理
          resolve(true)
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 1000)
    })
  }

  return {
    token,
    userInfo,
    setToken,
    logout,
    login // 导出 login action
  }
})