<script setup>
import { ref, onMounted } from 'vue'

const isEditingBackground = ref(false)
const isEditingIntroduction = ref(false)
const isEditingNotice = ref(false)
const isEditingBasic = ref(false)

// const data = ref({});
const data = ref({
  classBackground: '教學背景',
  classIntro: '@課程內容',
  classNotice: '[課程預約須知] '
})

const introBasic = ref({
  title: 'XXX數學權威',
  tags: null,
  promotIntro: ''
})

const updateBackground = () => {
  console.log('Updating data: ', data.value.classBackground)
  isEditingBackground.value = false
}

const cancelBackground = () => {
  // getTeacherInfo();
  isEditingBackground.value = false
}

const updateIntroduction = () => {
  console.log('Updating data: ', data.value.classIntro)
  isEditingIntroduction.value = false
}

const cancelIntroduction = () => {
  // getTeacherInfo();
  isEditingIntroduction.value = false
}

const updateNotice = () => {
  console.log('Updating data: ', data.value.classNotice)
  isEditingNotice.value = false
}

const cancelNotice = () => {
  // getTeacherInfo();
  isEditingNotice.value = false
}

const updateBasic = () => {
  // console.log('Updating data: ', data.value.classNotice)
  isEditingBasic.value = false
}

const cancelBasic = () => {
  // getTeacherInfo();
  isEditingBasic.value = false
}

const getUserData = () => {
}

onMounted(() => {
  const userData = sessionStorage.getItem('user')
  console.log(userData)
  if (userData === null) {
    // alert("請先登入會員");
    // .router.push("/");
  } else {
    getUserData()
  }
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
              <div class="d-flex align-center mb-8">
                <h3>講師介紹</h3>
                <v-spacer />
                <v-btn
                  v-if="!isEditingBasic"
                  color="primary"
                  icon="mdi-pencil"
                  size="small"
                  @click="isEditingBasic = !isEditingBasic"
                />
                <v-btn
                  v-else-if="isEditingBasic"
                  color="success"
                  icon="mdi-check-bold"
                  size="small"
                  @click="updateBasic"
                />
                <v-btn
                  v-if="isEditingBasic"
                  class="ms-2"
                  color="grey"
                  icon="mdi-close-thick"
                  size="small"
                  @click="cancelBasic"
                />
              </div>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="introBasic.title"
                    :disabled="!isEditingBasic"
                    label="專屬頭銜"
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="introBasic.tags"
                    :disabled="!isEditingBasic"
                    :items="['數學', '英文']"
                    label="Select"
                    multiple
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="introBasic.promotIntro"
                    :disabled="!isEditingBasic"
                    label="簡單自介"
                    variant="outlined"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-row>
            <!-- 教學背景 -->
            <v-col cols="12">
              <v-card class="mb-8 mx-auto pa-5 rounded-xl">
                <div class="d-flex align-center mb-8">
                  <h3>教學背景</h3>
                  <v-spacer />
                  <v-btn
                    v-if="!isEditingBackground"
                    color="primary"
                    icon="mdi-pencil"
                    size="small"
                    @click="isEditingBackground = !isEditingBackground"
                  />
                  <v-btn
                    v-else-if="isEditingBackground"
                    color="success"
                    icon="mdi-check-bold"
                    size="small"
                    @click="updateBackground"
                  />
                  <v-btn
                    v-if="isEditingBackground"
                    class="ms-2"
                    color="grey"
                    icon="mdi-close-thick"
                    size="small"
                    @click="cancelBackground"
                  />
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="data.classBackground"
                      :disabled="!isEditingBackground"
                      label="教學簡介"
                      maxlength="30"
                      show-word-limit
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- 課程簡介 -->
            <v-col cols="12">
              <v-card class="mb-8 mx-auto pa-5 rounded-xl">
                <div class="d-flex align-center mb-8">
                  <h3>課程簡介</h3>
                  <v-spacer />
                  <v-btn
                    v-if="!isEditingIntroduction"
                    color="primary"
                    icon="mdi-pencil"
                    size="small"
                    @click="isEditingIntroduction = !isEditingIntroduction"
                  />
                  <v-btn
                    v-else-if="isEditingIntroduction"
                    color="success"
                    icon="mdi-check-bold"
                    size="small"
                    @click="updateIntroduction"
                  />
                  <v-btn
                    v-if="isEditingIntroduction"
                    class="ms-2"
                    color="grey"
                    icon="mdi-close-thick"
                    size="small"
                    @click="cancelIntroduction"
                  />
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="data.classIntro"
                      :disabled="!isEditingIntroduction"
                      label="課程簡介"
                      maxlength="30"
                      show-word-limit
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- 上課注意事項 -->
            <v-col cols="12">
              <v-card class="mb-8 mx-auto pa-5 rounded-xl">
                <div class="d-flex align-center mb-8">
                  <h3>上課注意事項</h3>
                  <v-spacer />
                  <v-btn
                    v-if="!isEditingNotice"
                    color="primary"
                    icon="mdi-pencil"
                    size="small"
                    @click="isEditingNotice = !isEditingNotice"
                  />
                  <v-btn
                    v-else-if="isEditingNotice"
                    color="success"
                    icon="mdi-check-bold"
                    size="small"
                    @click="updateNotice"
                  />
                  <v-btn
                    v-if="isEditingNotice"
                    class="ms-2"
                    color="grey"
                    icon="mdi-close-thick"
                    size="small"
                    @click="cancelNotice"
                  />
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="data.classNotice"
                      :disabled="!isEditingNotice"
                      label="上課注意事項"
                      maxlength="30"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<style scoped></style>
