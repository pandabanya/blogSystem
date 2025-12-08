/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@bytemd/vue-next' {
  import type { DefineComponent } from 'vue'
  export const Editor: DefineComponent<any, any, any>
  export const Viewer: DefineComponent<any, any, any>
}

// 更精确的语言包声明
declare module 'bytemd/locales/zh_Hans.json' {
  const locale: any;
  export default locale;
}

declare module 'bytemd/locales/en.json' {
  const locale: any;
  export default locale;
}