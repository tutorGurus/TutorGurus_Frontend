<script setup>
import { ref, reactive } from 'vue'
const payment = ref()
</script>

<template>
  <div class="py-16">
    <v-container>
      <v-card
        class="mx-auto py-10 mb-14"
        max-width="650px"
        elevation="0"
        style="background-color: transparent"
      >
        <v-timeline direction="horizontal" truncate-line="both">
          <v-timeline-item dot-color="grey-lighten-2">
            <template v-slot:icon>
              <span class="text-grey-darken-2">1</span>
            </template>
            <template v-slot:opposite> 確認訂單 </template>
          </v-timeline-item>
          <v-timeline-item dot-color="grey-lighten-2">
            <template v-slot:icon>
              <span class="text-grey-darken-2">2</span>
            </template>
            確認付款
          </v-timeline-item>
          <v-timeline-item dot-color="#F2813B">
            <template v-slot:opposite> 訂單完成 </template>
            <template v-slot:icon>
              <span class="text-white">3</span>
            </template>
          </v-timeline-item>
          <v-timeline-item dot-color="grey-lighten-2">
            <template v-slot:icon>
              <span class="text-grey-darken-2">4</span>
            </template>
            課程預約
          </v-timeline-item>
        </v-timeline>
      </v-card>
      <div>
        <v-row>
          <v-col cols="12">
            <!-- 訂單詳情-->
            <v-card class="mx-auto rounded-lg mb-4">
              <v-table>
                <thead style="background-color: #rgb(224 224 224)">
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left font-weight-bold">購買課程</th>
                    <th class="text-left font-weight-bold">單價</th>
                    <th class="text-left font-weight-bold">價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <v-avatar class="ma-3" size="60" rounded="lg">
                        <v-img src="/avatar/02.png"></v-img>
                      </v-avatar>
                    </td>
                    <td>
                      Max 老師<br />
                      <v-chip class="mt-1 grey-lighten">國中 8 年級數學 </v-chip>
                    </td>
                    <td>NT500</td>
                    <td>NT500</td>
                  </tr>
                  <tr>
                    <td>
                      <v-avatar class="ma-3" size="60" rounded="lg">
                        <v-img src="/avatar/02.png"></v-img>
                      </v-avatar>
                    </td>
                    <td>
                      Max 老師<br />
                      <v-chip class="mt-1 grey-lighten">國中 8 年級數學 </v-chip>
                    </td>
                    <td>NT500</td>
                    <td>NT500</td>
                  </tr>
                </tbody>
              </v-table>
              <v-divider></v-divider>
              <v-card-text class="d-flex justify-end pa-5">
                <p>結帳總金額:</p>
                <p class="font-weight-bold mx-4">NT$ 10,000</p>
              </v-card-text>
            </v-card>
            <!-- 訂單須知 -->
            <v-card class="pa-3 mx-auto rounded-lg">
              <v-card-title class="font-weight-bold">購買課程後，即可向老師預約時間</v-card-title>
              <v-divider class="mx-4 mb-3"></v-divider>
              <v-card-text class="pt-0">
                <p class="mb-1 text-subtitle-2 text-grey-darken-1">
                  1. 購買課程後可依照教師行事曆的時間預約課程
                </p>
                <p class="mb-1 text-subtitle-2 text-grey-darken-1">
                  2. 如教師顯示「可即時授課」則可立即預約教師待會的時間
                </p>
                <p class="mb-1 text-subtitle-2 text-grey-darken-1">
                  3. 如教師未在線上最快可預約 24 小時之後的課程
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- 付款資訊 -->
          <v-col cols="12">
            <v-btn
              class="rounded-xl text-white mx-3"
              color="orange-darken-1"
              outlined
              variant="outlined"
              width="48%"
              to="/"
            >
              回到首頁
            </v-btn>
            <v-btn
              class="rounded-xl text-white mx-2"
              color="orange-darken-1"
              variant="flat"
              width="48%"
              to="/schedule"
            >
              課程預約
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
