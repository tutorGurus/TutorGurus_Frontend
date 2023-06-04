<template>
  <div class="py-16">
    <v-container>
      <div class="mx-auto w-75">
        <v-card class="mb-8 pa-5 rounded-xl">
          <h2 class="mb-8">教師申請 - 基本資料填寫</h2>
          <v-text-field
            v-model="data.name"
            label="姓名"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-select
            :items="['男', '女']"
            v-model="data.gender"
            label="性別"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-select>
          <v-text-field
            v-model="data.phone"
            label="聯絡電話"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.address"
            label="居住地址"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.birthday"
            type="date"
            label="生日"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-select
            :items="['學士', '碩士', '博士']"
            v-model="data.degree"
            label="最高學歷"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-select>
          <v-text-field
            v-model="schoolName"
            label="學校名稱"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="major"
            label="科系名稱"
            variant="outlined"
            :rules="requiredRules"
            required
          ></v-text-field>
          <v-select
            :items="[
              '國文',
              '數學',
              '英文',
              '物理',
              '化學',
              '生物',
              '地球科學',
              '歷史',
              '地理',
            ]"
            v-model="data.teaching_category"
            label="教授科目"
            variant="outlined"
            multiple
            :rules="requiredRules"
            required
          ></v-select>
          <v-btn color="success" class="w-100" @click="register">送出 </v-btn>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const data = ref({});
const schoolName = ref("");
const major = ref("");

const requiredRules = [(v) => !!v || "請填寫相關資訊！"];

const register = () => {
  const userData = sessionStorage.getItem("user");
  const _user = JSON.parse(userData);

  const dataPayload = data.value;
  console.log(JSON.stringify(dataPayload));
  const schoolNamePayload = schoolName.value;
  const majorPayload = major.value;
  if (!dataPayload.name) {
    console.log("name");
    return;
  }
  if (!dataPayload.gender) {
    console.log("gender");
    return;
  }
  if (!dataPayload.phone) {
    console.log("phone");
    return;
  }
  if (!dataPayload.address) {
    console.log("address");
    return;
  }
  if (!dataPayload.birthday.trim()) {
    console.log("birthday");
    return;
  }
  if (!dataPayload.degree) {
    console.log("degree");
    return;
  }
  if (!dataPayload.teaching_category) {
    console.log("teaching_category");
    return;
  }
  if (!schoolNamePayload) {
    console.log("school name");
    return;
  }
  if (!majorPayload) {
    console.log("major");
    return;
  }
  const params = {
    ...dataPayload,
    school: schoolNamePayload,
    major: majorPayload,
  };
  $fetch("/tutors/v1/register", {
    method: "POST",
    // baseURL: "http://localhost:8000",
    baseURL: "https://tutorgurus-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${_user.token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log(response);
      if (response.status === "success") {
        alert("教師註冊成功!");
      }
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
    });
};

const getUserData = () => {
  const userData = sessionStorage.getItem("user");
  const _user = JSON.parse(userData);
  $fetch(`/user/v1/profile`, {
    // baseURL: "http://localhost:8000",
    baseURL: "https://tutorgurus-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${_user.token}`,
    },
  }).then((response) => {
    console.log(response);
    if (response.status === "success") {
      if (response.data.birthday !== "" || response.data.birthday !== null) {
        response.data.birthday = response.data.birthday.substring(0, 10);
      }
      data.value = response.data;
      schoolName.value = response.data.school.schoolName;
      major.value = response.data.school.major;
    }
  });
};

onMounted(() => {
  const userData = sessionStorage.getItem("user");
  console.log(userData);
  if (userData === null) {
    alert("請先登入會員");
    router.push("/");
  } else {
    getUserData();
  }
});
</script>

<style scoped></style>
