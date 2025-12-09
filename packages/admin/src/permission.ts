import router from './router'
import { useUserStore } from './stores/user'
import type { RouteLocationNormalized } from 'vue-router'

const whiteList = ['/login'] // 白名单，不需要登录也能访问

router.beforeEach((to: RouteLocationNormalized, _from:RouteLocationNormalized, next:any)=>{
  const userStore = useUserStore()
  const hasToken = userStore.token
  console.log(_from);
  if(hasToken){
    if(to.path === '/login'){
      next('/')
    }else{
      next()
    }
  }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      next(`/login?rediect=${to.path}`)
    }
  }

})