<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const content = ref('')

function textChange () {
  console.log('text Change')
}
</script>

<template>
  <div>
    <UserInfo />
    <div class="py-16">
      <ClientOnly>
        <QuillEditor v-model:content="content" theme="snow" content-type="html" @textChange="textChange" />
      </ClientOnly>

      <p> {{ content }}</p>
    </div>
  </div>
</template>

  <style scoped lang="css">
    :deep(.ql-editor) {
    min-height: 200px;
    }
    :deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    }
    :deep(.ql-container.ql-snow) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    }
  </style>
