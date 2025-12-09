import request from '@/utils/request'

/**
 * 评论相关 API
 */

// 获取文章的所有评论
export const getComments = (articleId: string) => {
  return request.get(`/comment/article/${articleId}`)
}

// 发表评论
export const createComment = (data: {
  articleId: string
  author: string
  email?: string
  website?: string
  content: string
  parentId?: string
}) => {
  return request.post('/comment', data)
}

// 点赞评论
export const likeComment = (id: string) => {
  return request.put(`/comment/${id}/like`)
}
