<script setup>
import { ref, inject } from "vue";
const getCourses = inject('getCourses');

const dialog = ref(false);
let grade = ref(props.course.grade);
const semester = ref(props.course.semester);
const courseName = ref(props.course.title);
const coursePrice = ref(props.course.price);
const courseIntro = ref(props.course.introduction);
// const coursePrep = ref(null);
const isPublishChoice = ref(props.course.is_publish);
const isPublish = computed(() => isPublishChoice.value === '上架');

const props = defineProps({
    course: {
        type: Object,
        required: true
    }
});

let teachingLevel = ref(props.course.education_stages);
let courseCategory = ref(props.course.category);

const gradeItems = computed(() => {
    switch (teachingLevel.value) {
        case '國小':
            return ['小一', '小二', '小三', '小四', '小五', '小六'];
        case '國中':
            return ['國一', '國二', '國三'];
        case '高中':
            return ['高一', '高二', '高三'];
        default:
            return [];
    }
});
const courseItems = computed(() => {
    switch (grade.value) {
        case '小一':
            return ['國語', '數學', '生活', '健體'];
        case '小二':
            return ['國語', '數學', '生活', '健體'];
        case '小三':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小四':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小五':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小六':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '國一':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '國二':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '國三':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '高一':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史', '公民'];
        case '高二':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史'];
        case '高三':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史'];
        default:
            return [];
    }
})

const body = JSON.stringify({
            education_stages: teachingLevel.value,
            grade: grade.value,
            category: courseCategory.value,
            semester: semester.value,
            title: courseName.value,
            introduction: courseIntro.value,
            // preparation: coursePrep.value,
            price: coursePrice.value,
            is_publish: isPublish.value
        })

const editCourse = (courseId) => {
    console.log(body)
    // const { value: token } = useCookie("token");
    // $fetch(`v1/tutor/courses/${courseId}`, {
    //     method: "patch",
    //     baseURL: "https://tutorgurus-backend.onrender.com",
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //         education_stages: teachingLevel.value,
    //         grade: grade.value,
    //         category: courseCategory.value,
    //         semester: semester.value,
    //         title: courseName.value,
    //         introduction: courseIntro.value,
    //         // preparation: coursePrep.value,
    //         price: coursePrice.value,
    //         is_publish: isPublish.value
    //     })
    // }).then((response) => {
    //         console.log(response);
    //         if (response.status === false) {
    //         // loading.value = false;
    //         alert(response.Errormessage);
    //     } else {
    //         // loading.value = false;
    //         alert("更新課程成功！");
    //         dialog.value = false; // Close the dialog
    //         getCourses();
    //     }
    // });
};

</script>

<template> 
    <v-container>
        <v-row justify="start">
            <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn 
                class="rounded text-white mx-2"
                color="#F2813B"
                variant="elevated" v-bind="props"> 編輯 </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">編輯課程</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="['國小', '國中', '高中']"
                        label="授課程度*"
                        v-model = "teachingLevel"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items=gradeItems
                        label="授課年級*"
                        v-model = "grade"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="['上學期', '下學期']"
                        label="授課學期*"
                        v-model="semester"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                        :items=courseItems
                        label="授課科目*"
                        v-model="props.course.category"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field 
                        label="價錢*" 
                        v-model="coursePrice"
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="['不上架', '上架']"
                        label="課程是否上架*"
                        v-model = "isPublishChoice"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field 
                        label="課程名稱*" 
                        v-model="courseName"
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="課程簡介"
                        v-model="courseIntro"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="課前準備"
                        model-value=""
                        ></v-textarea>
                    </v-col>
                    </v-row>
                </v-container>
                <small>*為必填欄位</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    取消
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="editCourse(props.course._id)">
                    儲存
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>
