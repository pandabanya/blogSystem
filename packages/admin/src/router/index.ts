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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router