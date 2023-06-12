<script setup>
// import UserInfo  from '../components/userInfo';
import { onMounted, ref, provide } from 'vue'
const courses = ref(false);

const getCourses = async () => {
    const { value: token } = useCookie("token");
    const res = await $fetch(`/v1/tutor/courses`, {
        method: "GET",
        baseURL: "https://tutorgurus-backend.onrender.com",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const aryCourses = res.data;
    courses.value = aryCourses;
};

const deleteCourse = async (courseId) => {
    const { value: token } = useCookie("token");
    const res = await $fetch(`/v1/tutor/courses/${courseId}`, {
        method: "DELETE",
        baseURL: "https://tutorgurus-backend.onrender.com",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // 重新獲取課程列表，更新視圖
    getCourses();
}

onMounted(getCourses);

provide('getCourses', getCourses);
</script>

<template>
    <UserInfo />
    <v-container>
        <div class="mt-5 mb-5">
            <h2 class="text-h4 mb-3">所有開設的課程</h2>
            <Course />
        </div>
        <div class="d-flex justify-start" v-if="courses">
            <v-card
                max-width="344"
                v-for="course in courses" 
                :key="course._id"
                class="ma-2 pa-2"
            >
                <v-card-text>
                <span class="mb-2">
                    <span class="status-dot" :class="{ 'dot-green': course.is_publish, 'dot-gray': !course.is_publish }"></span>
                    {{ course.is_publish ? '已上架' : '未上架' }}
                </span>
                <h3 class="text-h6 text--primary mb-2">
                    {{ course.title }}
                </h3>
                <div class="mb-2">
                    <v-chip size="small"> {{ course.grade }}{{ course.category }}</v-chip>
                    <v-chip size="small" class="ml-2" color="#3BADEF"> {{ course.semester}}</v-chip>
                </div>
                <!-- <p>{{ course.introduction }}</p> -->
                <p v-if="course.introduction">課程簡介已填寫</p>
                <p v-else style="color:red">課程簡介尚未填寫</p>
                </v-card-text>
                <v-card-actions>
                <CourseEditCourse :course="course" />
                <v-btn
                    variant="outlined"
                    color="#F2813B"
                    @click="() => deleteCourse(course._id)"
                >
                    刪除
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
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