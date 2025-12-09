import request from '@/utils/request'

/**
 * 评论管理相关 API
 */

// 获取所有评论（管理员）
export const getComments = () => {
  return request.get('/comment')
}

// 删除评论
export const deleteComment = (id: string) => {
  return request.delete(`/comment/${id}`)
}

// 审核评论
export const approveComment = (id: string, status: 'approved' | 'rejected') => {
  return request.put(`/comment/${id}/approve`, { status })
}
