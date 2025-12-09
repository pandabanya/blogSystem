import request from '@/utils/request'

// 获取文章列表（支持分页）
export const getArticles = (page: number = 1, pageSize: number = 100) => {
  return request.get('/article', {
    params: { page, pageSize }
  })
}

// 获取单篇文章
export const getArticle = (id: string) => {
  return request.get(`/article/${id}`)
}