<template>
  <div>
    <div class="py-16">
      <v-container>
        <v-row>
          <client-only>
            <Calendar :attributes="attributes" />
          </client-only>
        </v-row>

        <v-row v-for="(item, index) in bookedInfo" :key="index">
          <v-col cols="4">
            <v-card class="mb-2">
              <v-card-text class="d-flex align-center">
                <div>
                  <span>{{ item[0] }}/{{ item[1] }}/{{ item[2] }} {{ item[3] }}~{{ item[4] }} {{ item[5] }} </span>
                </div>
                <v-spacer />
                <span v-if="item[7] === 'cancel'">課程已取消</span>
                <span v-else-if="item[7] === 'leave'">課程已請假</span>
                <span v-else-if="item[7] === 'booked'">即將到課</span>
              </v-card-text>
              <v-card-text class="d-flex align-center">
                <div>
                  <span>{{ item[6] }}</span>
                </div>
                <v-spacer />
                <v-btn color="primary" text @click="showDialog(index)">
                  學生資訊
                </v-btn>

                <v-dialog v-model="dialog" width="auto">
                  <v-card>
                    <v-card-title class="headline">學生資訊</v-card-title>
                    <v-card-text>
                      <div>姓名: {{ collectstuInfo[currentIndex].name }}</div>
                      <div>Email:{{ collectstuInfo[currentIndex].email }} </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'v-calendar'
let studentInfo = ref({})
let book_status = ref('')
let courseInfo = ref({})
let bookedInfo = reactive([])


let schedule = reactive([]);
let attributes = reactive([]);

let dialog = ref(false);

let collectstuInfo = ref([])
let currentIndex = ref(0)

function showDialog(index) {
  this.currentIndex = index;
  this.dialog = true;
}


function update() {

  schedule = bookedInfo.map((item) => {
    return {
      dates: new Date(item[0], item[1] - 1, item[2]),
      start: item[3],
      end: item[4],
      desc: item[3]
    }
  })

  attributes = computed(() => schedule.map((item) => {
    return {
      key: 'blue',
      dot: true,
      dates: item.dates,
      popover: {
        label: item.desc
      }
    }
  }))
}

function booked_time(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  return [
    startDate.getUTCFullYear(),
    startDate.getUTCMonth() + 1,  // JS month starts from 0
    startDate.getUTCDate(),
    startDate.toISOString().substr(11, 5),
    endDate.toISOString().substr(11, 5),
  ];
}

function getUserData() {
  const { value: token } = useCookie("token");
  let arrayData = [];
  let bookInfoPre = [];
  $fetch(`/v1/booking/booked`, {
    // baseURL: "http://localhost:8000",
    baseURL: "https://tutorgurus-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    // console.log(response);
    // console.log(response.data[0]);
    // const data = response.data[0];

    const collectData = response.data.map(data => {
      // const data = response.data[0];
      let timeRange = booked_time(data.startTime, data.endTime);
      arrayData = [...timeRange];

      studentInfo = {
        name: data.booking_user_id.name,
        email: data.booking_user_id.email,
      }
      // console.log('studentInfo', studentInfo);
      arrayData.push(studentInfo.name);
      collectstuInfo.value.push(studentInfo);

      courseInfo = {
        grade: data.course_id.grade,
        category: data.course_id.category,
        title: data.course_id.title
      }
      const courseNameStr = `${courseInfo.grade}${courseInfo.category}:${courseInfo.title}`
      arrayData.push(courseNameStr);

      book_status = data.status
      arrayData.push(book_status);
      bookedInfo.push(arrayData);

      return arrayData;
    })
    update();

    // console.log('collectData', collectData);
    // console.log('bookedInfo', bookedInfo);
    // console.log('collectstuInfo', collectstuInfo);
  });
};

onMounted(() => {
  const { value: token } = useCookie("token");
  if (!token) {
    alert("請先登入會員");
    router.push("/");
  } else {
    getUserData();
  }

});

</script>
