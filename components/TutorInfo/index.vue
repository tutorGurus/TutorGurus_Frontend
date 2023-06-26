<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const store = useTutorStore();
const { tutorData } = storeToRefs(store);
const tabs = ref(1);
const tabContent = reactive({
  1: [
    { to: "/tutorPlatform", label: "行事曆" },
    { to: "/tutorPlatform/tutorSchedule", label: "時段設定" },
    { to: "/tutorPlatform/setPrice", label: "鐘點費設定" },
    { to: "/tutorPlatform/manageCourses", label: "課程管理" }
  ],
  2: [
    { to: "/tutorPlatform/profile", label: "個人檔案" },
    { to: "/tutorPlatform/tutorBackground", label: "講師簡介" },
    { to: "/tutorPlatform/incomeAnalyze", label: "營收分析" },
  ]
});
const currentTabContent = ref(tabContent[1]);

const router = useRouter();

const switchTabContent = (tab) => {
  currentTabContent.value = tabContent[tab];
  router.push(currentTabContent.value[0].to);
};
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
            <v-card-title class="text-h4 font-weight-black">
              你好，{{ tutorData.tutorId.name }}
            </v-card-title>
            <div class="d-flex mt-3">
              <v-btn
                class="rounded text-white mx-2"
                color="#F2813B"
                variant="elevated"
                @click="switchTabContent(1)"
              >
                我的課表
              </v-btn>
              <v-btn
                class="rounded text-white mx-2"
                color="#F2813B"
                variant="elevated"
                @click="switchTabContent(2)"
              >
                帳戶資訊
              </v-btn>
              <!-- <v-btn
                class="rounded text-white mx-2"
                color="#F2813B"
                variant="elevated"
                >課程軌跡</v-btn
              > -->
            </div>
          </div>
        </div>
        <div class="d-flex algin-center px-15 pt-5">
          <!-- <div class="d-flex flex-column align-center mx-3">
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
          </div> -->
        </div>
      </div>
      <v-card class="tab-position">
        <v-tabs v-model="tabs" bg-color="white" color="deep-orange-accent-2">
          <NuxtLink
            v-for="(tab, index) in currentTabContent"
            :key="index"
            :to="tab.to"
          >
            <v-tab :value="index + 1">{{ tab.label }}</v-tab>
          </NuxtLink>
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
a {
  color:black;
}
</style>
