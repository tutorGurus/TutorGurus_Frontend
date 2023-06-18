<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
const tabs = ref(1)

const isShowSchedule = ref(true)
const isShowAccount = ref(false)
const accountInfoButtonStyle = ref({
  'text-white': true,
})

const switchToMySchedule = () => {
  tabs.value = 1
  isShowAccount.value = false
  isShowSchedule.value = true
  router.push('/schedule')
}

const switchToAccountInfo = () => {
  tabs.value = 1
  isShowAccount.value = true
  isShowSchedule.value = false
  router.push('/user')
}
</script>
<template>
  <div class="pt-16" style="background-color: #fffdff">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-avatar class="ma-3" size="120" rounded="lg">
            <v-img src="/avatar/01.png"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="text-h4 font-weight-black"> 你好，Jessica </v-card-title>
            <div class="d-flex mt-3">
              <v-btn
                class="rounded mx-2"
                :class="accountInfoButtonStyle"
                :color="isShowSchedule === true ? '#F2813B' : 'orange-darken-1'"
                :variant="isShowSchedule === true ? 'flat' : 'outlined'"
                @click="switchToMySchedule"
                >我的課表</v-btn
              >
              <v-btn
                class="rounded mx-2"
                :color="isShowAccount === false ? '#F2813B' : 'orange-darken-1'"
                :variant="isShowAccount === true ? 'flat' : 'outlined'"
                @click="switchToAccountInfo"
                >帳戶資訊</v-btn
              >
              <v-btn class="rounded text-white mx-2" color="orange-darken-1" variant="outlined"
                >課程軌跡</v-btn
              >
            </div>
          </div>
        </div>
        <div class="d-flex algin-center px-15 pt-5">
          <div class="d-flex flex-column align-center mx-3">
            <p class="mb-2">預約中堂數</p>
            <p class="text-h3 font-weight-black">2</p>
          </div>
          <div class="d-flex flex-column align-center mx-3">
            <p class="mb-2">已購買堂數</p>
            <p class="text-h3 font-weight-black">10</p>
          </div>
          <div class="d-flex flex-column align-center mx-3">
            <p class="mb-2">已使用堂數</p>
            <p class="text-h3 font-weight-black">0</p>
          </div>
        </div>
      </div>
      <!-- 切換我的課表 -->
      <v-card class="tab-position" v-if="isShowSchedule">
        <v-tabs v-model="tabs" bg-color="white" color="deep-orange-accent-2">
          <v-tab :value="1"> 行事曆 </v-tab>
          <v-tab :value="2"> 課程預約 </v-tab>
          <v-tab :value="3"> 課程請假 </v-tab>
          <v-tab :value="4"> 課程異動 </v-tab>
        </v-tabs>
      </v-card>
      <!-- 切換帳戶資訊 -->
      <v-card class="tab-position" v-if="isShowAccount">
        <v-tabs v-model="tabs" bg-color="white" color="deep-orange-accent-2">
          <v-tab :value="1"> 個人檔案 </v-tab>
          <v-tab :value="2"> 銀收分析 </v-tab>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>
<style scoped>
.tab-position {
  position: relative;
  top: 40px;
}
</style>
