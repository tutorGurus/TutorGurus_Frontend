import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/avocado/Desktop/TutorGurusProject/TutorGurus_Frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}