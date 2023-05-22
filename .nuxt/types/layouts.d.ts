import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/stu/web_2023/web0521/render/TutorGurus_Frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}