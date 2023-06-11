<script setup>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const tutorid = ref('')
const title = ref('')
const introduction = ref('')

const teaching_category = ref([])
const educational_background = ref('')
const work_experience = ref([])
const notice = ref('')
const teaching_introduction = ref([])

function textChange() {
  // console.log('text Change')
}
/*
function getUserData() {
  console.log('get Dta')
  introduction.value = '<p>多年教學經驗，讓我開始思考，為什麼孩子對於數學的認知及學習程度會有落差？</p><p>要如何幫助孩子們不排斥數學、喜歡上數學、甚至愛上數學呢？讓Kiki老師來告訴你！'
  title.value = '王牌家教老師'
  teaching_category.value = ['數學']
  educational_background.value = "Background text"
  work_experience.value = 'Work experience'
  notice.value = '用Zoom上課，請提早上線等候！'
  teaching_introduction.value = "數的運算、分數的運算、一元一"
}
*/
function getUserData() {
  const { value: token } = useCookie("token");

  $fetch(`/tutors/v1/profile/tutorBackground`, {
    // baseURL: "http://localhost:8000",
    baseURL: "https://tutorgurus-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
    console.log(response.data[0]);
    const user = response.data[0];

    title.value = user.title;
    introduction.value = user.introduction;
    teaching_category.value = user.teaching_category;
    educational_background.value = user.educational_background;
    work_experience.value = user.work_experience;
    notice.value = user.notice;
    teaching_introduction.value = user.teaching_introduction;
    tutorid.value = user.tutorId._id;
  });
};

function saveContent() {
  const api = `/tutors/v1/${tutorid.value}/profile/tutorBackground`;
  // console.log(api);
  // console.log(tutorid.value);
  fetch(api, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      teaching_category: teaching_category.value,
      introduction: introduction.value,
      educational_background: educational_background.value,
      work_experience: work_experience.value,
      notice: notice.value,
      teaching_introduction: teaching_introduction.value
    })
  })
}

onMounted(() => {
  const userData = sessionStorage.getItem('user')
  // console.log(userData)
  if (userData === null) {
    // alert("請先登入會員");
    // .router.push("/");
  } else {
    getUserData()
  }

  getUserData()

})
</script>

<template>
  <div>
    <UserInfo />
    <div class="py-16">

      <v-container>
        <div>
          <v-col cols="12">

            <v-card class="mb-8 mx-auto pa-5 rounded-xl">
              <h3>講師介紹</h3>

              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="title" label="專屬頭銜" variant="outlined" />
                </v-col>

                <v-col cols="12">
                  <v-select v-model="teaching_category" :items="['數學', '英文']" label="Select" multiple variant="outlined" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </div>
      </v-container>

      <div class="mb-8 mx-auto pa-5 rounded-xl quillbox">
        <h3>簡單自介</h3>
        <ClientOnly>
          <QuillEditor v-model:content="introduction" theme="snow" content-type="html" @textChange="textChange" />
        </ClientOnly>
        <!-- <p> {{ introduction }}</p> -->
      </div>

      <div class="mb-8 mx-auto pa-5 rounded-xl quillbox">
        <h3>教學背景</h3>
        <ClientOnly>
          <QuillEditor v-model:content="educational_background" theme="snow" content-type="html" @textChange="textChange" />
        </ClientOnly>
        <!-- <p> {{ educational_background }}</p> -->
      </div>


      <div class=" mb-8 mx-auto pa-5 rounded-xl quillbox">
        <h3>課程簡介</h3>
        <ClientOnly>
          <QuillEditor v-model:content="teaching_introduction" theme="snow" content-type="html" @textChange="textChange" />
        </ClientOnly>
        <!-- <p> {{ teaching_introduction }}</p> -->
      </div>

      <div class="mb-8 mx-auto pa-5 rounded-xl quillbox">
        <h3>上課注意事項</h3>
        <ClientOnly>
          <QuillEditor v-model:content="notice" theme="snow" content-type="html" @textChange="textChange" />
        </ClientOnly>
        <!-- <p> {{ notice }}</p> -->
      </div>

      <v-btn color="success" @click="saveContent">Save</v-btn>

      <!-- <p>  {{  tutorid }}</p>
      <v-btn @click="getUserData">TestGet</v-btn> -->

    </div>
  </div>
</template>

<style scoped>
</style>
