import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "proxy"
declare module "/Users/stu/web_2023/web0521/render/TutorGurus_Frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}