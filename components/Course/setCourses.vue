<script setup>
import { ref, inject, watchEffect } from 'vue'
// import { QuillEditor } from "../../plugins/vueQuill";

const getCourses = inject('getCourses')
const dialog = ref(false)
const teachingLevel = ref(null)
const grade = ref(null)
const courseCategory = ref(null)
const semester = ref(null)
const courseName = ref(null)
const courseIntro = ref(null)
const coursePrep = ref(null)
const isPublish = ref(null)
const isPublishChoice = computed({
  get: () => {
    return isPublish.value ? '上架' : '不上架'
  },
  set: (newValue) => {
    isPublish.value = newValue === '上架'
  }
})
const btnType = ref(null)
const editingItem = ref(null)

/* 點擊編輯傳來的資料 ...strat */
const props = defineProps({
  course: {
    type: Object,
    required: false
  }
})

const courseRef = ref(null)

//
watchEffect(() => {
  courseRef.value = props.course
})
/* 點擊編輯傳來的資料 ...end */

const levelMap = {
  小一: '國小',
  小二: '國小',
  小三: '國小',
  小四: '國小',
  小五: '國小',
  小六: '國小',
  國一: '國中',
  國二: '國中',
  國三: '國中',
  高一: '高中',
  高二: '高中',
  高三: '高中'
}

const openDialog = (btn, course) => {
  btnType.value = btn
  if (btn == 'edit') {
    editingItem.value = course
    dialog.value = true
    teachingLevel.value = levelMap[course.grade]
    grade.value = course.grade
    courseCategory.value = course.category

    semester.value = course.semester
    courseName.value = course.title
    courseIntro.value = course.introduction
    coursePrep.value = course.preparation
    isPublish.value = course.is_publish
  } else {
    dialog.value = true
    teachingLevel.value = null
    grade.value = null
    courseCategory.value = null

    semester.value = null
    courseName.value = null
    courseIntro.value = null
    coursePrep.value = null
    isPublishChoice.value = null
  }
}

const gradeItems = computed(() => {
  switch (teachingLevel.value) {
    case '國小':
      return ['小一', '小二', '小三', '小四', '小五', '小六']
    case '國中':
      return ['國一', '國二', '國三']
    case '高中':
      return ['高一', '高二', '高三']
    default:
      return []
  }
})
const courseItems = computed(() => {
  switch (grade.value) {
    case '小一':
      return ['國語', '數學', '生活', '健體']
    case '小二':
      return ['國語', '數學', '生活', '健體']
    case '小三':
      return ['國語', '數學', '自然', '社會', '藝文', '綜合', '健體']
    case '小四':
      return ['國語', '數學', '自然', '社會', '藝文', '綜合', '健體']
    case '小五':
      return ['國語', '數學', '自然', '社會', '藝文', '綜合', '健體']
    case '小六':
      return ['國語', '數學', '自然', '社會', '藝文', '綜合', '健體']
    case '國一':
      return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體']
    case '國二':
      return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體']
    case '國三':
      return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體']
    case '高一':
      return ['國文', '英語', '數學', '生物', '物理', '化學', '地科', '地理', '歷史', '公民']
    case '高二':
      return ['國文', '英語', '數學', '生物', '物理', '化學', '地科', '地理', '歷史']
    case '高三':
      return ['國文', '英語', '數學', '生物', '物理', '化學', '地科', '地理', '歷史']
    default:
      return []
  }
})

const saveCourse = () => {
  const { value: token } = useCookie('token')
  $fetch(`v1/tutor/courses`, {
    method: 'post',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      education_stages: teachingLevel.value,
      grade: grade.value,
      category: courseCategory.value,
      semester: semester.value,
      title: courseName.value,
      introduction: courseIntro.value,
      preparation: coursePrep.value,
      is_publish: isPublish.value
    })
  }).then(async (response) => {
    // console.log(response);
    if (response.status === false) {
      alert(response.Errormessage)
    } else {
      alert('新增課程成功！')
      dialog.value = false // Close the dialog
      await getCourses()
      // 將欄位資料清空
      teachingLevel.value = null
      grade.value = null
      courseCategory.value = null
      semester.value = null
      courseName.value = null
      courseIntro.value = null
      coursePrep.value = null
      isPublishChoice.value = '不上架'
    }
  })
}

const editCourse = (courseId) => {
  const body = {
    education_stages: teachingLevel.value,
    grade: grade.value,
    category: courseCategory.value,
    semester: semester.value,
    title: courseName.value,
    introduction: courseIntro.value,
    is_publish: isPublish.value
  }
  // console.log(body);
  const { value: token } = useCookie('token')
  $fetch(`v1/tutor/courses/${courseId}`, {
    method: 'PATCH',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(async (response) => {
    // console.log(response);
    if (response.status === false) {
      // loading.value = false;
      alert(response.Errormessage)
    } else {
      // loading.value = false;
      alert('更新課程成功！')
      dialog.value = false // Close the dialog
      await getCourses()
    }
  })
}

const saveChange = async () => {
  if (btnType.value == 'edit') {
    await editCourse(editingItem.value._id)
  } else {
    await saveCourse()
  }
  // 關閉視窗
  dialog.value = false
}
</script>

<template>
  <v-container>
    <!-- {{ courseRef }} -->
    <v-row justify="start">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <v-btn
            v-if="courseRef"
            variant="outlined"
            color="cyan-accent-4"
            v-bind="props"
            @click="openDialog('edit', courseRef)"
          >
            編輯
          </v-btn>
          <v-btn
            v-else
            color="orange-darken-2"
            v-bind="props"
            class="mb-2 ml-n1"
            @click="openDialog('add', null)"
          >
            新增課程
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="ml-2">
            <span class="text-h6">{{ btnType === 'edit' ? '編輯課程' : '建立新課程' }}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="['國小', '國中', '高中']"
                  label="授課程度*"
                  v-model="teachingLevel"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select :items="gradeItems" label="授課年級*" v-model="grade" required></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="['上學期', '下學期']"
                  label="授課學期*"
                  v-model="semester"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="courseItems"
                  label="授課科目*"
                  v-model="courseCategory"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="['不上架', '上架']"
                  label="課程是否上架*"
                  v-model="isPublishChoice"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="課程名稱*" v-model="courseName" required> </v-text-field>
              </v-col>
              <v-col cols="12">
                <p>課程簡介</p>
                <div>
                  <ClientOnly>
                    <QuillEditor v-model:content="courseIntro" theme="snow" content-type="html" />
                  </ClientOnly>
                </div>
              </v-col>
              <v-col cols="12">
                <p>課前準備</p>
                <div>
                  <ClientOnly>
                    <QuillEditor v-model:content="coursePrep" theme="snow" content-type="html" />
                  </ClientOnly>
                </div>
              </v-col>
            </v-row>
            <small>*為必填欄位</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> 取消 </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveChange">
              <span v-if="btnType == 'edit'">更新</span>
              <span v-else>新增</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<style scoped></style>
