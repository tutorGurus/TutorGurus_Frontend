<template>
  <div>
    <UserInfo />
    <div class="py-16">
      <v-container>

        <h3>每週固定課表</h3>
        <!-- <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
          class="elevation-1">
        </v-data-table> -->
<!-- 
        <v-data-table :headers="headers" :items="desserts" class="elevation-1" disable-pagination
          hide-default-footer="true">
        </v-data-table> -->

        <v-row>
          <v-col cols="6">
            <v-data-table :headers="headers" :items="desserts" class="elevation-1" disable-pagination
            hide-default-footer="true">
          </v-data-table>
          </v-col>
        </v-row>


        <div>
          <h3>授課行事曆</h3>
          <client-only>
            <div>
              <Calendar :attributes="attributes" />
            </div>
          </client-only>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'v-calendar'
import { VDataTable } from 'vuetify/labs/VDataTable'


const dialog = ref(false);
// const headers = ref([
//   { title: 'Monday', align: 'end', key: 'monday' },
//   { title: 'Tuesday', align: 'end', key: 'tue' },
//   { title: 'Wednesday', align: 'end', key: 'wed' },
//   { title: 'Thursday', align: 'end', key: 'thur' },
//   { title: 'Friday', align: 'end', key: 'fri' },
//   { title: 'Saturday', align: 'end', key: 'sat' },
//   { title: 'Sunday', align: 'end', key: 'sun' },
// ])

const headers = ref([
  { title: 'Week', align: 'end', key: 'week' },
  { title: 'TimeSlot', align: 'end', key: 'timeslot' },
])


const desserts = ref([
  {
    week: 'Monday',
    timeslot: '20:00~22:00',
  },
  {
    week: 'Tuesday',
    timeslot: '20:00~22:00',
  },
  {
    week: 'Wednesday',
    timeslot: '20:00~22:00',
  },
  {
    week: 'Thursday',
    timeslot: '',
  },
  {
    week: 'Friday',
    timeslot: '20:00~22:00',
  },
  {
    week: 'Saturday',
    timeslot: '20:00~22:00',
  },
  {
    week: 'Sunday',
    timeslot: '20:00~22:00',
  },
]);

const timeslots = ref([
  { timeslot: '18:00~20:00' },
  { timeslot: '20:00~21:00' },
  { timeslot: '21:00~22:00' },
  { timeslot: '22:00~23:00' },
  { timeslot: '23:00~24:00' },
  { timeslot: '00:00~01:00' },
  { timeslot: '01:00~02:00' },
]);


</script>
