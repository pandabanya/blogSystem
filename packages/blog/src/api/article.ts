import request from '@/utils/request'

// 获取文章列表
export const getArticles = () => {
  return request.get('/article')
}

// 获取单篇文章
export const getArticle = (id: string) => {
  return request.get(`/article/${id}`)
}