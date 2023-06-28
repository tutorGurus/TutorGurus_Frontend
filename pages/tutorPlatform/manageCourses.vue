<script setup>
import SetCourses from '../../components/Course/setCourses.vue'

import { onMounted, ref, provide } from 'vue'
const courses = ref(false)

const getCourses = async () => {
  const { value: token } = useCookie('token')
  const res = await $fetch(`/v1/tutor/courses`, {
    method: 'GET',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const aryCourses = res.data
  courses.value = aryCourses
}

const deleteCourse = async (courseId) => {
  const { value: token } = useCookie('token')
  // 先驗證此課程 ID 是否已被預約中，若預約中則不可刪除
  const res = await $fetch(`/v1/tutor/courses/${courseId}`, {
    method: 'DELETE',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  // 重新獲取課程列表，更新視圖
  getCourses()
}

onMounted(getCourses)

provide('getCourses', getCourses)
</script>

<template>
  <h2>管理您的課程</h2>
  <SetCourses />
  <v-row class="justify-start" v-if="courses">
    <v-col cols="12" sm="6" md="3" v-for="course in courses" :key="course._id">
      <v-card max-width="344">
        <v-card-text>
          <span class="mb-2">
            <span
              class="status-dot"
              :class="{ 'dot-green': course.is_publish, 'dot-gray': !course.is_publish }"
            ></span>
            {{ course.is_publish ? '已上架' : '未上架' }}
          </span>
          <h3 class="text-h6 text--primary mb-2">
            {{ course.title }}
          </h3>
          <div class="mb-2">
            <v-chip size="small"> {{ course.grade }}{{ course.category }}</v-chip>
            <v-chip size="small" class="ml-2" color="#3BADEF"> {{ course.semester }}</v-chip>
          </div>
          <p v-if="course.introduction">課程簡介已填寫</p>
          <p v-else style="color: red">課程簡介尚未填寫</p>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-center align-center">
            <SetCourses :course="course" />
            <v-btn
              variant="outlined"
              color="pink-lighten-2"
              @click="() => deleteCourse(course._id)"
            >
              刪除
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.status-dot {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
.dot-green {
  background-color: green;
}
.dot-gray {
  background-color: gray;
}
</style>
