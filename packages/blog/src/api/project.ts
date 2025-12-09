import request from '@/utils/request'

/**
 * 开源项目相关 API
 */

// 获取所有可见的开源项目
export const getProjects = () => {
  return request.get('/project')
}

// 获取单个项目详情
export const getProject = (id: string) => {
  return request.get(`/project/${id}`)
}
