import request from '@/utils/request'

// 获取文章列表（支持分页）
export const getArticles = (page: number = 1, pageSize: number = 10) => {
  return request.get('/article', {
    params: { page, pageSize }
  })
}

// 获取单篇文章
export const getArticle = (id: string) => {
  return request.get(`/article/${id}`)
}

// 创建文章
export const createArticle = (data: any) => {
  return request.post('/article', data)
}

// 更新文章
export const updateArticle = (id: string, data: any) => {
  return request.put(`/article/${id}`, data)
}

// 删除文章
export const deleteArticle = (id: string) => {
  return request.delete(`/article/${id}`)
}