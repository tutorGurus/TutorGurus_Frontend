<template>
  <div>
    <UserInfo />
    <div class="py-16">
      <v-container>
        <div>
          <client-only>
            <div>
              <Calendar :attributes="attributes" />
            </div>
          </client-only>
        </div>

        <div style="height: 20px;" />

        <div>
          <v-row v-for="(item, index) in cardInfo.specific" :key="index">
            <v-col cols="8">
              <v-card class="mb-2">
                <v-card-text class="d-flex align-center">
                  <div>
                    <span>{{ item[0] }}/{{ item[1] }}/{{ item[2] }} {{ item[3] }}~{{ item[4] }} {{ item[5] }}  </span>
                  </div>
                  <v-spacer />

                  <span v-if="item[7] === 0">課程已結束</span>
                  <span v-else-if="item[7] === 1">已取消/請假</span>
                  <span v-else-if="item[7] === 2">即將到課</span>
                </v-card-text>
                <v-card-text class="d-flex align-center">
                  <div>
                    <span>{{ item[6] }}</span>
                  </div>
                  <v-spacer />
                  <v-btn color="primary" text>
                    學生資訊
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'v-calendar'

const cardInfo = {
  specific: [
    [2023, 5, 17, '18:00', '20:00', 'Tony', '高一物理：質量守恆篇', 1],
    [2023, 5, 18, '19:00', '20:00', 'Kevin', '高三數學:微積分', 0],
    [2023, 5, 20, '3:00', '4:00', '學生名字', '課程名稱', 2]
  ]
}

const schedule = cardInfo.specific.map((item) => {
  return {
    dates: new Date(item[0], item[1] - 1, item[2]),
    start: item[3],
    end: item[4],
    desc: item[3]
  }
})

const attributes = computed(() => schedule.map((item) => {
  return {
    key: 'blue',
    dot: true,
    dates: item.dates,
    popover: {
      label: item.desc
    }
  }
}))

</script>
