import request from '@/utils/request'

/**
 * 技能相关 API
 */

// 获取所有可见的技能
export const getSkills = () => {
  return request.get('/skill')
}

// 获取单个技能详情
export const getSkill = (id: string) => {
  return request.get(`/skill/${id}`)
}
