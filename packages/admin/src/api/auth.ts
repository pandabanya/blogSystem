import request from '../utils/request'

// 登录接口
export const login = (data: { username: string; password: string }) => {
  return request.post('/auth/login', data)
}

// 注册接口
export const register = (data: { username: string; password: string }) => {
  return request.post('/auth/register', data)
}