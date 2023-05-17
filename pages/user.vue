<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const isEditing = ref(false);
const data = ref({});

const update = () => {
  const userData = sessionStorage.getItem("user");
  const _user = JSON.parse(userData);
  console.log(_user.token);
  console.error('data',data)
  $fetch("https://tutorgurus-backend.onrender.com/student/v1/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_user.token}`,
    },
    body: JSON.stringify(data.value),
  })
    .then((response) => {
      console.log(response);
      if (response.status === "success") {
        alert("修改成功!");
        isEditing.value = false;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const cancel = () => {
  getUserData();
  isEditing.value = false;
};

const getUserData = () => {
  const userData = sessionStorage.getItem("user");
  const _user = JSON.parse(userData);
  console.log(_user.token);
  $fetch(`/student/v1/profile`, {
    baseURL: "https://tutorgurus-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${_user.token}`,
    },
  }).then((response) => {
    console.log(response);
    if (response.status === "success") {
      console.log("ye");
      data.value = response.data;
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

<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="1200" elevation="0">
      <div class="d-flex py-1">
        <h2>個人資料</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" icon="mdi-pencil" size="small" @click="isEditing = !isEditing" v-if="!isEditing">
        </v-btn>
        <v-btn color="success" icon="mdi-check-bold" size="small" @click="update" v-else-if="isEditing">
        </v-btn>
        <v-btn class="ms-2" color="grey" icon="mdi-close-thick" size="small" @click="cancel" v-if="isEditing">
        </v-btn>
      </div>
    </v-card>
    <v-card class="mb-8 mx-auto py-8 px-5" max-width="1200">
      <div>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.name" label="姓名" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.birthday" type="date" label="生日"
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="!isEditing" :items="['男', '女']" v-model="data.gender" label="性別"
              variant="outlined"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.email" label="信箱" type="email"
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.phone" label="電話" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="!isEditing" :items="['學士', '碩士', '博士']" v-model="data.degree" label="最高學歷"
              variant="outlined"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.school" label="學校名稱" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="!isEditing" v-model="data.country" label="城市" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped></style>
