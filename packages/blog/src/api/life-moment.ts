import request from '@/utils/request'

/**
 * 生活片段相关 API
 */

// 获取所有可见的生活片段
export const getLifeMoments = () => {
  return request.get('/life-moment')
}

// 获取单个生活片段详情
export const getLifeMoment = (id: string) => {
  return request.get(`/life-moment/${id}`)
}
