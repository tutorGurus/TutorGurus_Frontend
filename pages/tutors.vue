<template>
  <div class="tutors">
    <div class="tutor-deco-text-bg"></div>
    <div class="tutor-banner-bg py-16">
      <v-container>
        <div class="text-center banner-font">
          <p class="banner-title">找一位<br />合格的優質教師</p>
          <p class="banner-text">
            自由選擇上課科目、上課時間，一對一教學方式替您依照自身程度，<br />
            為您量身打造專屬的上課進度。
          </p>
        </div>
        <div
          class="rounded-pill bg-white w-50 mx-auto mt-12 d-flex justify-space-around"
        >
          <v-select
            class="my-2 mx-5"
            v-model="selectGrade"
            :items="itemsGrade"
            item-title="state"
            item-value="abbr"
            variant="underlined"
          ></v-select>
          <v-select
            class="my-2 mr-5"
            v-model="selectSubject"
            :items="itemsSubject"
            item-title="state"
            item-value="abbr"
            variant="underlined"
          ></v-select>
          <v-btn
            variant="tonal"
            class="mt-6 mr-5 rounded-pill bg-orange-darken-2"
          >
            搜尋
          </v-btn>
        </div>
      </v-container>
    </div>
    <v-container class="w-75">
      <div class="tutors-search-result">
        <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
        <h2 class="ml-4">{{ selectSubject.state }}</h2>
        <div class="d-flex my-6">
          <v-btn variant="tonal" class="mr-4 rounded-pill bg-black">
            高評價優先
          </v-btn>
          <v-btn variant="tonal" class="mr-4 rounded-pill bg-white">
            多教學課堂數優先
          </v-btn>
          <v-btn variant="tonal" class="mr-4 rounded-pill bg-white">
            低價格優先
          </v-btn>
          <v-btn variant="tonal" class="mr-4 rounded-pill bg-white">
            低價格優先
          </v-btn>
        </div>
        <div class="mt-5">
          <v-card>
            <v-row class="mx-auto">
              <v-col cols="2" class="text-center">
                <v-avatar class="ma-3" size="120" rounded="lg">
                  <v-img src="/avatar/02.png"></v-img>
                </v-avatar>
                <h3>Max 老師</h3>
              </v-col>
              <v-col cols="6" class="pt-8">
                <h3>10 年數理家教經驗</h3>
                <v-chip-group class="d-flex">
                  <v-chip>國一數學</v-chip>
                  <v-chip>高一數學</v-chip>
                  <v-chip>高一物理</v-chip>
                </v-chip-group>
                <p>已教課堂數｜1234 堂 • ⭐ 5.0</p>
                <div class="tutors-intro my-6">
                  <div class="tutors-intro-detail">
                    <p class="clamp-lines">
                      我有10年數學家教老師的經驗，精通多種數學領域，擅長解決學生數學問題，並且能夠有效地傳授知識和技能，提升學生的成績和自信心。如果你對理化、物理感到挫折，Max老師會把科學內容教的淺顯易懂，讓你可以輕鬆。
                    </p>
                  </div>
                  <a class="font-weight-black">顯示更多</a>
                </div>
              </v-col>
              <v-col cols="4" class="pt-8 mb-6">
                <v-card class="pa-6">
                  <h4>預約 Max 老師</h4>
                  <v-divider class="my-3"></v-divider>
                  <div class="d-flex align-center">
                    <v-chip color="light-blue-lighten-1">50 分鐘</v-chip>
                    <p class="ml-4">
                      <strong>NT$ 500</strong><small class="ml-1">起</small>
                    </p>
                  </div>
                  <v-btn
                    color="orange-darken-2"
                    class="mt-5 mr-4 w-100 rounded-pill"
                    variant="outlined"
                  >
                    聯絡老師
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    class="mt-2 w-100 rounded-pill bg-orange-darken-2"
                  >
                    立即預約
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div class="mt-5">
          <v-card>
            <v-row class="mx-auto">
              <v-col cols="2" class="text-center">
                <v-avatar class="ma-3" size="120" rounded="lg">
                  <v-img src="/avatar/01.png"></v-img>
                </v-avatar>
                <h3>Kiki 老師</h3>
              </v-col>
              <v-col cols="6" class="pt-8">
                <h3>拿下國中會考數學A++💕 輕鬆解題拿高分</h3>
                <v-chip-group class="d-flex">
                  <v-chip>國一數學</v-chip>
                  <v-chip>國二數學</v-chip>
                  <v-chip>國三數學</v-chip>
                </v-chip-group>
                <p>已教課堂數｜120 堂 • ⭐ 5.0</p>
                <div class="tutors-intro my-6">
                  <div class="tutors-intro-detail">
                    <p class="clamp-lines">
                      多年教學經驗，讓我開始思考，為什麼孩子對於數學的認知及學習程度會有落差？
                      要如何幫助孩子們不排斥數學、喜歡上數學、甚至愛上數學呢？
                      讓 Kiki 老師來告訴你！
                    </p>
                  </div>
                  <a class="font-weight-black">顯示更多</a>
                </div>
              </v-col>
              <v-col cols="4" class="pt-8 mb-6">
                <v-card class="pa-6">
                  <h4>預約 Max 老師</h4>
                  <v-divider class="my-3"></v-divider>
                  <div class="d-flex align-center">
                    <v-chip color="light-blue-lighten-1">50 分鐘</v-chip>
                    <p class="ml-4">
                      <strong>NT$ 600</strong><small class="ml-1">起</small>
                    </p>
                  </div>
                  <v-btn
                    color="orange-darken-2"
                    class="mt-5 mr-4 w-100 rounded-pill"
                    variant="outlined"
                  >
                    聯絡老師
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    class="mt-2 w-100 rounded-pill bg-orange-darken-2"
                  >
                    立即預約
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div class="mt-6 text-center">
          <v-btn
            color="orange-darken-2"
            class="mr-4 rounded-pill"
            variant="outlined"
          >
            查看更多
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const selectGrade = reactive({ state: "高中", abbr: "high" });
const itemsGrade = reactive([
  { state: "高中", abbr: "high" },
  { state: "國中", abbr: "senior" },
  { state: "國小", abbr: "element" },
]);
const selectSubject = reactive({ state: "國文", abbr: "chinese" });
const itemsSubject = reactive([
  { state: "國文", abbr: "chinese" },
  { state: "英文", abbr: "english" },
  { state: "數學", abbr: "math" },
  { state: "物理", abbr: "physics" },
  { state: "化學", abbr: "chemistry" },
  { state: "生物", abbr: "biology" },
]);
const breadCrumbs = reactive([
  {
    title: "搜尋教師",
    disabled: false,
    href: "/tutors",
  },
  {
    title: "國中",
    disabled: false,
    href: "/tutors",
  },
  {
    title: "數學",
    disabled: true,
    href: "/tutors",
  },
]);
</script>

<style scoped lang="scss">
.tutors {
  position: relative;
}
.tutor-banner-bg {
  background-image: url("/banner/tutorsBanner.png");
  background-size: cover;
  height: 800px;
  clip-path: ellipse(100% 100% at 50% 0);
}
/* .tutor-banner-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
} */
.tutor-deco-text-bg {
  position: absolute;
  top: 80px;
  left: 50px;
  z-index: 1;
  background-image: url("/banner/tutorsDecoText.png");
  background-size: contain;
  height: 500px;
  width: 300px;
}
.banner-font {
  font-weight: 600;
  line-height: 1.2;
  color: #ffffff;
}
.banner-title {
  font-size: 100px;
  margin: 32px 0;
}
.banner-text {
  font-size: 20px;
}
.tutors-intro {
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 8px;
  &-detail {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    .clamp-lines {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
