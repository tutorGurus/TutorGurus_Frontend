<template>
  <div>
    <UserInfo />
    <div class="py-16">
      <v-container>
        <!-- <div>
          <p> 每週固定課表 </p>
          <v-data-table :headers="headers" :items="items" />
        </div> -->

        <v-data-table :headers="headers" :items="items" />

        <v-data-table
          :headers="headers"
          :items="days"
          item-key="day"
          class="elevation-1"
        >
          <template #item.action="{ item }">
            <v-btn @click="openModal(item)">
              Select time
            </v-btn>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">
              Select time for {{ selectedDay }}
            </v-card-title>

            <v-card-text>
              <v-time-picker v-model="startTime" />
              <v-time-picker v-model="endTime" />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div />

        <div>
          <p> 授課行事曆</p>
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



</script>
