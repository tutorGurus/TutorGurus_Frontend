<template>
  <div>
    <div class="py-16">
      <v-container>
        <div>
          <v-col cols="12">
            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <h3>講師介紹</h3>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="title" label="專屬頭銜" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="teaching_category"
                    :items="[
                      '國文',
                      '數學',
                      '英文',
                      '物理',
                      '化學',
                      '生物',
                      '地球科學',
                      '歷史',
                      '地理'
                    ]"
                    label="Select"
                    multiple
                    variant="outlined"
                  />
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <v-row>
                <v-col>
                  <h3>簡單自介</h3>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="introduction"
                      theme="snow"
                      content-type="html"
                      @textChange="textChange"
                    />
                  </ClientOnly>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <v-row>
                <v-col>
                  <h3>教學背景-學歷</h3>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="educational_background"
                      theme="snow"
                      content-type="html"
                      @textChange="textChange"
                    />
                  </ClientOnly>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <v-row>
                <v-col>
                  <h3>教學背景-經歷</h3>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="work_experience"
                      theme="snow"
                      content-type="html"
                      @textChange="textChange"
                    />
                  </ClientOnly>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <v-row>
                <v-col>
                  <h3>課程簡介</h3>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="teaching_introduction"
                      theme="snow"
                      content-type="html"
                      @textChange="textChange"
                    />
                  </ClientOnly>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="mb-8 mx-auto pa-5 rounded-xl ql-editor">
              <v-row>
                <v-col>
                  <h3>上課注意事項</h3>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="notice"
                      theme="snow"
                      content-type="html"
                      @textChange="textChange"
                    />
                  </ClientOnly>
                </v-col>
              </v-row>
            </v-card>

            <v-btn color="success" @click="saveContent">Save</v-btn>
            <!-- <p>  {{  tutorid }}</p>
            <v-btn @click="getUserData">TestGet</v-btn> -->
          </v-col>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tutorid = ref('')
const title = ref('')
const introduction = ref('')

const teaching_category = ref([])
const educational_background = ref('')
const work_experience = ref('')
const notice = ref('')
const teaching_introduction = ref([])

function textChange() {
  // console.log('text Change')
}

function getUserData() {
  const { value: token } = useCookie('token')

  $fetch(`/tutors/v1/profile/tutorBackground`, {
    // baseURL: "http://localhost:8000",
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    console.log(response)
    console.log(response.data[0])
    const user = response.data[0]

    title.value = user.title
    introduction.value = user.introduction
    teaching_category.value = user.teaching_category
    educational_background.value = user.educational_background
    work_experience.value = user.work_experience
    notice.value = user.notice
    teaching_introduction.value = user.teaching_introduction[0].teaching_content
  })
}

function saveContent() {
  const { value: token } = useCookie('token')

  $fetch('/tutors/v1/profile/tutorBackground', {
    method: 'PATCH',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title.value,
      teaching_category: teaching_category.value,
      introduction: introduction.value,
      educational_background: educational_background.value,
      work_experience: work_experience.value,
      notice: notice.value,
      teaching_introduction: [
        {
          teaching_category: '國中',
          subject: '數學',
          teaching_content: teaching_introduction.value
        }
      ]
    })
  })
}

onMounted(() => {
  const { value: token } = useCookie('token')
  if (!token) {
    alert('請先登入會員')
    router.push('/')
  } else {
    getUserData()
  }
})
</script>

<style scoped>
.ql-editor {
  height: 250px;
  max-height: 250px;
  overflow: auto;
}
</style>
