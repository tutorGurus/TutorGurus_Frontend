<script setup>
import { ref, onMounted } from "vue";

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
  });
};

onMounted(() => {
  const userData = sessionStorage.getItem("user");
  console.log(userData);
  if (userData === null) {
    alert("請先登入會員");
  } else {
    getUserData();
  }
});
</script>

<template>
  <!-- <h1>{{ data }}</h1> -->
  <div>
    <v-container>
      <!-- <v-card>
        <v-card-text>
          <div class="pa-4">
            <v-text-field
              v-model="data.name"
              label="姓名"
              variant="underlined"
            ></v-text-field>
            <v-text-field
              v-model="data.email"
              label="信箱"
              type="email"
              variant="underlined"
            ></v-text-field>
            <v-text-field
              v-model="data.birthday"
              label="生日"
              type="password"
              variant="underlined"
            ></v-text-field>
            <v-text-field
              v-model="data.phone"
              label="連絡電話"
              variant="underlined"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card> -->
    </v-container>
  </div>
</template>

<style scoped></style>
