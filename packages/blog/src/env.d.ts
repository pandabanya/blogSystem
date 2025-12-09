/// <reference types="vite/client" />
/**
 * 这个文件告诉 TypeScript：

所有 .vue 文件都是合法的模块
它们导出的是 Vue 组件
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
