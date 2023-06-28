<template>
  <div>
    <div class="py-16">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-row>
              <h3>每週固定課表</h3>
              <v-data-table
                :headers="headers"
                :items="result"
                disable-sort
                disable-pagination
                hide-default-footer
              >
                <template #bottom></template>
              </v-data-table>
            </v-row>
            <v-row justify="end">
              <v-btn color="primary" @click="dialog = true">Edit</v-btn>
              <!-- <v-btn color="primary" @click="getUserData">Test</v-btn> -->
            </v-row>

            <v-dialog v-model="dialog" width="800px">
              <v-card width="800px">
                <v-card-title class="headline">Weekly Schedule</v-card-title>
                <v-card-text>
                  <div v-for="(day, name) in weeklySchedule" :key="day">
                    <v-row>
                      <v-col cols="3">
                        <v-checkbox v-model="day.open" :label="name"></v-checkbox>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="day.startTime"
                          :items="hours_list"
                          :disabled="!day.open"
                          label="Start"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="day.endTime"
                          :items="hours_list"
                          :disabled="!day.open"
                          label="End"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="green darken-1" text @click="updateWeekSchedule">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col>
            <h3>特定日期課表</h3>
            <client-only>
              <Calendar @dayclick="showDate" />
            </client-only>

            <v-row>
              <v-col cols="6">
                <v-text-field label="Selected Date" v-model="selectedDate" readonly />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select v-model="startTime" :items="hours_list" label="StartTime"></v-select>
              </v-col>

              <v-col cols="3">
                <v-select v-model="endTime" :items="hours_list" label="EndTime"></v-select>
              </v-col>
              <v-btn color="primary" @click="schedule_date">Save</v-btn>
            </v-row>

            <!--v-card show specific date-->
            <v-row v-for="(item, index) in getspec_date" :key="index">
              <v-col>
                <v-card class="mb-2">
                  <v-card-text class="d-flex align-center">
                    <!-- {{ item }} -->
                    Date: {{ item.datestr }} Time: {{ item.time }}
                    <v-spacer />
                    <v-btn color="primary" @click="remove_specific_date(index)">Delete</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'v-calendar'
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
  { title: 'Week', align: 'end', key: 'week' },
  { title: 'TimeSlot', align: 'end', key: 'timeslot' }
])

const week_str = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let respRoutineTime = reactive([])
let result = reactive([])

let weeklySchedule = reactive({
  Monday: { open: false, startTime: '', endTime: '' },
  Tuesday: { open: false, startTime: '', endTime: '' },
  Wednesday: { open: false, startTime: '', endTime: '' },
  Thursday: { open: false, startTime: '', endTime: '' },
  Friday: { open: false, startTime: '', endTime: '' },
  Saturday: { open: false, startTime: '', endTime: '' },
  Sunday: { open: false, startTime: '', endTime: '' }
})

let selectedDate = ref('')
let dialog = ref(false)
const hours_list = ref([])
const startTime = ref(null)
const endTime = ref(null)
let getspec_date = reactive([])
const valid = ref(true)

function showDate(e) {
  selectedDate.value = e.date.toLocaleDateString()
}

function schedule_date() {
  if (!startTime.value || !endTime.value) {
    alert('Please select both start time and end time.')
    return
  }

  if (endTime.value <= startTime.value) {
    alert('End time must be later than start time.')
    return
  }

  // console.log('Booking made from ' + startTime.value + ' to ' + endTime.value);

  let part = selectedDate._rawValue.split('/').map(Number)
  part.push(startTime.value)
  part.push(endTime.value)

  let data = {
    dates: []
  }

  data.dates.push(part)

  const { value: token } = useCookie('token')
  $fetch('/tutors/v1/scheduleV', {
    method: 'PATCH',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: data
  }).catch((error) => console.log('Error: ', error))
}

function OpenWeekDialog() {
  dialog = true
}

function updateWeekSchedule() {
  console.log('weeklySchedule', weeklySchedule)
  // logSchedule(weeklySchedule);

  /*
  let data = {
    "year": 2023,
    "month": 6,
    "data": [
      [0, "08:00", "12:00"],
      [1, "13:00", "15:00"],
      [2, "", ""],
      [3, "", ""],
      [4, "", ""],
      [5, "", ""],
      [6, "", ""]
    ]
  }

  //patch setup routine time
  const { value: token } = useCookie("token");
  $fetch('/tutors/v1/scheduleV/routine', {
    method: 'PATCH',
    baseURL: "https://tutorgurus-backend-l63x.onrender.com/",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data
  })
    .catch((error) => console.log('Error: ', error))
  */
}

function logSchedule(schedule) {
  Object.entries(schedule).forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${JSON.stringify(value)}`)
  })
}

function remove_specific_date(index) {
  const date_str = getspec_date[index].datestr
  let input = date_str
  let parts = input.split('/').map(Number)

  let data = {
    dates: []
  }
  data.dates.push(parts)
  const { value: token } = useCookie('token')
  $fetch('/tutors/v1/scheduleV/pull', {
    method: 'PATCH',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: data
  }).catch((error) => console.log('Error: ', error))
}

function getUserData() {
  const { value: token } = useCookie('token')

  $fetch(`/tutors/v1/scheduleV?year=2023&startMonth=6&endMonth=6`, {
    // baseURL: "http://localhost:8000",
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    for (let i = 0; i < response.data.dates.length; i++) {
      let input = response.data.dates[i]
      let output = {
        datestr: `${input[0]}/${input[1]}/${input[2]}`,
        time: `${input[3]}~${input[4]}`
      }
      getspec_date.push(output)
    }

    for (let i = 0; i < 7; i++) {
      let input = response.data.routine_dayTime[i]
      respRoutineTime.push(input)
    }
    // console.log('respRoutineTime', respRoutineTime);
    Object.entries(respRoutineTime).map(([key, value]) => {
      let timeslot = value[0][0] && value[0][1] ? `${value[0][0]}~${value[0][1]}` : 'close'
      let output = {
        week: week_str[key],
        timeslot: timeslot
      }
      result.push(output)
    })
  })
}

onMounted(() => {
  for (let i = 1; i <= 24; i++) {
    let hour = i < 10 ? '0' + i : i.toString()
    hours_list.value.push(hour + ':00')
  }

  const { value: token } = useCookie('token')
  if (!token) {
    alert('請先登入會員')
    router.push('/')
  } else {
    getUserData()
  }
})
</script>
