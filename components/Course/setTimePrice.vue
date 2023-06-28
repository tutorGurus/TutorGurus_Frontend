<script setup>
import { ref } from 'vue'

const dialog = ref(false)

const teachingLevel = ref(null)
const grade = ref(null)
const courseCategory = ref(null)
const coursePrice = ref(null)
const priceList = ref({})
const btnType = ref(null)
const editingItem = ref(null)

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

const openDialog = (btn, item) => {
  btnType.value = btn
  if (btn == 'edit') {
    editingItem.value = item
    dialog.value = true
    teachingLevel.value = levelMap[item.grade]
    grade.value = item.grade
    courseCategory.value = item.category
    coursePrice.value = item.price
  } else {
    dialog.value = true
    teachingLevel.value = null
    grade.value = null
    courseCategory.value = null
    coursePrice.value = null
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

// 新增課程鐘點費
const addPrice = async () => {
  console.log('新增課程')
  const { value: token } = useCookie('token')
  $fetch(`v1/tutor/courses/classPrice`, {
    method: 'POST',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      category: courseCategory.value,
      grade: grade.value,
      price: coursePrice.value
    })
  }).then(async (response) => {
    console.log(response)
    if (response.status === false) {
      alert(response.Errormessage)
    } else {
      alert('新增課程鐘點費成功！')
      dialog.value = false // Close the dialog
      // 將欄位資料清空
      teachingLevel.value = null
      grade.value = null
      courseCategory.value = null
      coursePrice.value = null
      await getPriceList()
    }
  })
}

// 取得鐘點費列表
const getPriceList = async () => {
  const { value: token } = useCookie('token')
  const res = await $fetch(`/v1/tutor/courses/getPriceList`, {
    method: 'GET',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  priceList.value = res.data
}

// 編輯鐘點費
const editPrice = async (classId, price) => {
  console.log(classId, price)
  const { value: token } = useCookie('token')
  try {
    const res = await $fetch(`/v1/tutor/courses/edit/classPrice`, {
      method: 'PATCH',
      baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        classId: classId,
        price: price
      }
    })
    if (res.status === false) {
      alert(res.Errormessage)
    } else {
      alert('更新課程鐘點費成功！')
      await getPriceList()
    }
  } catch (err) {
    alert('編輯課程鐘點費出現錯誤！')
  }
}

// 刪除鐘點費項目
const deletePrice = async (classId) => {
  const { value: token } = useCookie('token')
  try {
    const res = await $fetch(`/v1/tutor/courses/delete/classPrice`, {
      method: 'DELETE',
      baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        classId: classId
      }
    })
    if (res.status === false) {
      alert(res.Errormessage)
    } else {
      await getPriceList()
    }
  } catch (err) {
    alert('刪除出現錯誤')
  }
}

const saveChange = async () => {
  if (btnType.value == 'edit') {
    await editPrice(editingItem.value._id, coursePrice.value)
  } else {
    await addPrice()
  }
  // 關閉視窗
  dialog.value = false
}

onMounted(getPriceList)
</script>

<template>
  <v-container>
    <!-- {{ priceList }} -->
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <v-btn
            class="mb-2 me-n1"
            color="orange-darken-2"
            v-bind="props"
            @click="() => openDialog('add', null)"
          >
            新增課程鐘點費
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="px-6">
            <span class="text-h6">{{
              btnType === 'edit' ? '編輯課程鐘點費' : '新增課程鐘點費'
            }}</span>
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
                  :items="courseItems"
                  label="授課科目*"
                  v-model="courseCategory"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="價錢*" v-model="coursePrice" required> </v-text-field>
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

  <v-main class="h-auto">
    <v-card rounded="lg">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">項目</th>
            <th class="text-left">授課年級</th>
            <th class="text-left">授課科目</th>
            <th class="text-left">鐘點費設定</th>
            <th class="text-left">編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in priceList" :key="item._id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.grade }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.price }}</td>
            <td>
              <div class="d-flex">
                <v-btn
                  variant="outlined"
                  class="text-button font-weight-black"
                  color="cyan-accent-4"
                  rounded="xl"
                  @click="() => openDialog('edit', item)"
                  >編輯</v-btn
                >
                <v-btn
                  variant="outlined"
                  class="ml-4 text-button font-weight-black"
                  color="pink-lighten-2"
                  rounded="xl"
                  @click="() => deletePrice(item._id)"
                  >刪除</v-btn
                >
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-main>
</template>

<style scoped></style>
