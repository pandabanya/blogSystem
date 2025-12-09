import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Layout from '../layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
      // 新增文章模块路由
      {
        path: 'article/list',
        name: 'ArticleList',
        component: () => import('../views/article/list.vue'),
        meta: { title: '文章列表', icon: 'document' }
      },
      {
        path: 'article/create',
        name: 'ArticleCreate',
        component: () => import('../views/article/create.vue'),
        meta: { title: '发布文章', icon: 'edit' }
      },
      {
        path: 'article/edit/:id',
        name: 'ArticleEdit',
        component: () => import('../views/article/edit.vue'),
        meta: { title: '编辑文章', icon: 'edit' }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('../views/tag/index.vue'),
        meta: { title: '标签管理', icon: 'collection-tag' }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('../views/upload/index.vue'),
        meta: { title: '图片上传', icon: 'upload' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/category/index.vue'),
        meta: { title: '分类管理', icon: 'folder' }
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('../views/comment/index.vue'),
        meta: { title: '评论管理', icon: 'chat-dot-round' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router