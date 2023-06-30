<script setup>
const items = [
  {
    title: '搜尋教師',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: '國中',
    disabled: false,
    href: 'breadcrumbs_link_1',
  },
  {
    title: '數學',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },
  {
    title: 'Max 老師',
    disabled: true,
    href: 'breadcrumbs_link_3',
  },
];

import { ref } from 'vue';
import { startOfWeek, eachDayOfInterval, format, addDays, subDays } from 'date-fns';

const testfun = (date, timeSlot) => {
  console.log("date, timeSlot= ", date, timeSlot);
}

let currentWeekStart = ref(startOfWeek(new Date(), { weekStartsOn: 0 }));

const getCurrentWeekDates = () => {
  const end = new Date(currentWeekStart.value);
  end.setDate(currentWeekStart.value.getDate() + 6);
  return eachDayOfInterval({ start: currentWeekStart.value, end }).map((date) => format(date, 'd'));
}

const isAvailable = (timeSlot, date) => {
  return !exampleBookings.value.find(
    (booking) => booking.day === date && booking.timeSlot === timeSlot
  );
}

const nextWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, 7);
  currentWeekDates.value = getCurrentWeekDates();
  console.log(currentWeekDates.value);
}

const lastWeek = () => {
  currentWeekStart.value = subDays(currentWeekStart.value, 7);
  currentWeekDates.value = getCurrentWeekDates();
  console.log(currentWeekDates.value);

}

const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
const currentWeekDates = ref(getCurrentWeekDates());
const timeSlots = ref([
  '09:00',
  '10:00',
  '11:00',
  '12:00'
]);

const bookings = ref([]);
const exampleBookings = ref([{ day: '6/28', timeSlot: '09:00' }]);

</script>

<template>
  <div class="py-16">
    <div class="tutor-bg h-banner">
      <v-container class="d-flex justify-center align-center h-100">
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex justify-start align-center">
              <v-avatar class="ma-3" size="120" rounded="lg">
                <v-img src="/avatar/02.png"></v-img>
              </v-avatar>
              <div class="ms-3">
                <v-card-title class="text-h5 text-white font-weight-black px-0">
                  Max 老師
                </v-card-title>
                <div class="text-start mb-2">
                  <v-chip class="me-2" color="orange"> 數學 </v-chip>
                  <v-chip class="me-2" color="blue"> 物理 </v-chip>
                </div>
                <div class="d-flex justify-center align-center">
                  <p class="text-white">已教學課堂數 ｜ <span class="font-weight-bold">8787 堂</span></p>
                  <div class="d-flex justify-start align-center">
                    <v-img :width="6" aspect-ratio="1/1" class="ma-3" src="/tutor/dot.png"></v-img>
                    <v-img :width="20" aspect-ratio="1/1" src="/comment/star.png"></v-img>
                    <span class="text-white ms-1"> 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <div class="mb-10">
            <div class="d-flex align-center mb-6">
              <span class="bar-left me-3"></span>
              <h2 class="text-h5 font-weight-bold">老師介紹</h2>
            </div>
            <v-card class="pa-8 mx-auto rounded-lg">
              <h3 class="text-h6 font-weight-bold mb-6">10 年數理家教經驗</h3>
              <v-card-text class="pa-3 bg-gray-light rounded-lg">
                <p>我有10年數學家教老師的經驗，精通多種數學領域，擅長解決學生數學問題，並且能夠有效地傳授知識和技能，提升學生的成績和自信心。
                  如果你對理化、物理感到挫折，Max老師會把科學內容教的淺顯易懂，讓你可以輕鬆理解與學習。將生活實例融入教學中，貼近生活科學，落實科普理念、化抽象的科學理論為具體，循序漸進。
                  並且透過實驗中觀察現象，幫助學生理解與記憶。</p>
              </v-card-text>
            </v-card>
          </div>

          <div class="mb-10">
            <div class="d-flex align-center mb-6">
              <span class="bar-left me-3"></span>
              <h2 class="text-h5 font-weight-bold">教學背景</h2>
            </div>
            <v-card class="pa-8 mx-auto rounded-lg">
              <h3 class="text-h6 font-weight-bold mb-6">10 年數理家教經驗</h3>
              <v-card-text class="pa-3">
                <v-row>
                  <v-col cols="2">
                    <div class="bg-black text-white text-center rounded-pill py-1">學歷</div>
                  </v-col>
                  <v-col>
                    <p>✦ 台灣大學數學系</p>
                    <p>✦ 臺灣師範大學數學應用碩士</p>
                    <p>✦ 台北大學數學士</p>
                  </v-col>
                </v-row>
                <v-divider class="my-8"></v-divider>
                <v-row>
                  <v-col cols="2">
                    <div class="bg-black text-white text-center rounded-pill py-1">經歷</div>
                  </v-col>
                  <v-col>
                    <p>✦ 2013 - 2018 學生一對一家教</p>
                    <p>✦ 2018 - 2023 私人補習班</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
          <div class="mb-10">
            <div class="d-flex align-center mb-6">
              <span class="bar-left me-3"></span>
              <h2 class="text-h5 font-weight-bold">課程簡介</h2>
            </div>
            <v-card class="pa-8 mx-auto rounded-lg">
              <h3 class="text-h6 font-weight-bold mb-6">10 年數理家教經驗</h3>
              <v-card-text class="pa-3">
                <v-row>
                  <v-col cols="3">
                    <div class="text-start mb-2">
                      <v-chip class="me-2"> 國中 </v-chip>
                      <v-chip class="me-2" color="orange"> 數學 </v-chip>
                    </div>
                  </v-col>
                  <v-col>
                    <Ul>
                      <li>整數的運算</li>
                      <li>分數的運算</li>
                      <li>一元一次方程式</li>
                      <li>二元一次聯立方程式</li>
                      <li>直角坐標與二元一次方程式的圖形</li>
                      <li>比與比例式</li>
                      <li>一元一次不等式</li>
                      <li>統計</li>
                      <li>生活中的幾何</li>
                    </Ul>
                  </v-col>
                </v-row>
                <v-divider class="my-8"></v-divider>
                <v-row>
                  <v-col cols="3">
                    <div class="text-start mb-2">
                      <v-chip class="me-2"> 高中 </v-chip>
                      <v-chip class="me-2" color="orange"> 數學 </v-chip>
                    </div>
                  </v-col>
                  <v-col>
                    <ul>
                      <li>數與式</li>
                      <li>指數、對數</li>
                      <li>直線與圓</li>
                      <li>數列與級數</li>
                      <li>排列、組合</li>
                      <li>機率</li>
                      <li>數據分析</li>
                    </ul>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>

          <div class="mb-10">
          <v-row justify="center" align="center" class="mt-5">
            <v-btn color="#fb8c00" @click="lastWeek">上一週</v-btn>
            <v-btn color="#fb8c00" @click="nextWeek">下一週</v-btn>
          </v-row>
          <v-table>
            <thead>
              <tr>
                <th v-for="(day, index) in days" :key="index">{{ day }}</th>
              </tr>
              <tr>
                <th v-for="(date, index) in currentWeekDates" :key="index">{{ date }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(timeSlot, i) in timeSlots" :key="i">
                <td v-for="(date, j) in currentWeekDates" :key="j">
                  <v-btn small outlined color="primary" variant="text" v-if="isAvailable(timeSlot, date)"
                    @click="testfun(date, timeSlot)">
                    {{ timeSlot }}
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          </div>

          <div class="mb-10">
            <div class="d-flex align-center mb-6">
              <span class="bar-left me-3"></span>
              <h2 class="text-h5 font-weight-bold">上課注意事項</h2>
            </div>
            <v-card class="pa-8 mx-auto rounded-lg">
              <p class="font-weight-bold mb-4">課程預約須知</p>
              <p>預約課程時段前，請先用「聯絡老師」跟老師先確認想上的課程內容後再預約時間。</p>
              <v-divider class="my-8"></v-divider>
              <p class="font-weight-bold mb-4">上課說明</p>
              <ol class="px-5">
                <li>開課前 10 分鐘進入網站，選擇『我的課程』找到該堂課並點選『進入教室』，即可開啟 ZOOM 教室開始上課。</li>
                <li>手機、電腦皆可使用 ZOOM 上課（手機請先下載 ZOOM 應用程式）</li>
              </ol>
            </v-card>
          </div>
        </v-col>

      </v-row>
    </v-container>
    <v-container>
      <h2 class="text-center mb-10">
        其他人也看了這些課程
      </h2>
      <div class="d-flex">
        <v-col cols="12" sm="4" lg="4" v-for="i in 3">
          <Card />
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.tutor-bg {
  background-color: rgba(0, 0, 0, .4);
  background-blend-mode: multiply;
  background-image: url("/tutor/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)); */
}

.comment-bg {
  background: linear-gradient(180deg,
      #fdf0e7 0%,
      #fdf0e7 59.9%,
      rgba(253, 240, 231, 0) 100%);
}

.comment-relative {
  position: relative;
}

.commet-description {
  position: relative;
  z-index: 1;
}

.comment-decorate {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.teacher-bg {
  background-image: url("/footer/bg.png");
  background-size: contain;
}

.h-banner {
  height: 306px;
}

.bg-gray-light {
  background-color: #F9F9F9;
}

.bg-black {
  background-color: black;
}

.bar-left {
  display: block;
  width: 6px;
  height: 24px;
  background-color: #F2813B;
  border-radius: 10px;
}

.border-gray {
  border: 1px solid #ECECEC;
  border-radius: 10px;
}
</style>
