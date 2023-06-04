<template>
  <v-row class="align-center mx-auto mt-12">
    <v-col cols="12">
      <v-layout>
        <v-navigation-drawer>
          <v-list-item
            style="font-size: 32px; background-color: #e0e0e0"
            title="管理使用者"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list density="compact" nav active-color="#FB8C00">
            <v-list-item
              title="學生管理"
              value="students"
              style="font-size: 24px"
            ></v-list-item>
            <v-list-item title="教師管理" value="tutors" active></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list-item
            style="font-size: 32px; background-color: #e0e0e0"
            title="管理課程"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item title="課程管理" value="courses"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="ml-4" style="height: 800px">
          <h2>教師管理</h2>
          <v-text-field
            clearable
            label="搜尋教師"
            class="mt-4"
            prepend-icon="mdi-magnify"
          ></v-text-field>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">No.</th>
                <th class="text-left">帳號</th>
                <th class="text-left">學號</th>
                <th class="text-left">全名</th>
                <th class="text-left">電子郵件</th>
                <th class="text-left">申請日期</th>
                <th class="text-left">狀態</th>
                <th class="text-left">備註</th>
                <th class="text-left">動作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tutorsInfo" :key="item.name">
                <td>{{ item.serialNumber }}</td>
                <td>{{ item.account }}</td>
                <td>{{ item.studentID }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.createdAt }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.remark }}</td>
                <td>
                  <div class="d-flex">
                    <v-btn
                      class="mx-2 text-button font-weight-black"
                      color="blue"
                      rounded="xl"
                      >通過</v-btn
                    >
                    <v-btn
                      class="mx-2 text-button font-weight-black"
                      color="pink"
                      rounded="xl"
                      >失敗</v-btn
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-main>
      </v-layout></v-col
    >
  </v-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
// 假資料 等串API
const tutorsInfo = reactive([
  {
    serialNumber: "20230402002",
    account: "MeiChen123",
    studentID: 2,
    name: "陳小美",
    email: "mei_chen@gmail.com",
    createdAt: "2023-04-02 13:31",
    status: "待審核",
    remark: "",
  },
  {
    serialNumber: "20230402001",
    account: "MinWang123",
    studentID: 1,
    name: "王小明",
    email: "min_wang@gmail.com",
    createdAt: "2023-04-02 09:41",
    status: "待審核",
    remark: "外籍",
  },
]);
</script>
