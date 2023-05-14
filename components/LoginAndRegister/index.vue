<script setup>
import { ref, reactive } from "vue";

const isRegister = ref(false);
const user = reactive({
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const toRegister = () => {
  isRegister.value = true;
};

const register = () => {
  $fetch(`/student/v1/register`, {
    method: "post",
    baseURL: "https://tutorgurus-backend.onrender.com",
    body: user,
  }).then((response) => {
    console.log(response);
    if (response.status === false) {
      alert(response.Errormessage);
    } else {
      alert("註冊成功!");
    }
  });
};

const login = () => {
  $fetch(`/student/v1/login`, {
    method: "post",
    baseURL: "https://tutorgurus-backend.onrender.com",
    body: user,
  }).then((response) => {
    console.log(response);
    if (response.status === false) {
      alert(response.Errormessage);
    } else {
      const user = {};
      user.token = response.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      alert("登入成功!");
    }
  });
};
</script>

<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>{{
        isRegister === false ? "登入" : "註冊"
      }}</v-toolbar-title>
      <template v-slot:append>
        <p v-if="!isRegister">
          沒有帳號，<span
            class="text-decoration-underline cursor-point"
            @click="toRegister"
            >快速註冊</span
          >
        </p>
        <p v-else>
          已經註冊，<span
            class="text-decoration-underline cursor-point"
            @click="isRegister = false"
            >登入</span
          >
        </p>
      </template>
    </v-toolbar>
    <v-card-text>
      <div class="pa-4">
        <v-text-field
          v-show="isRegister"
          v-model="user.userName"
          label="帳號"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          label="信箱"
          placeholder="johndoe@gmail.com"
          type="email"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          label="密碼"
          type="password"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-show="isRegister"
          v-model="user.confirmPassword"
          label="再次輸入密碼"
          type="password"
          variant="underlined"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!isRegister"
        class="mx-auto mb-3"
        color="primary"
        width="90%"
        variant="flat"
        @click="login"
        >登入</v-btn
      >
      <v-btn
        v-else
        class="mx-auto mb-3"
        color="primary"
        width="90%"
        variant="flat"
        @click="register"
        >註冊</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.cursor-point {
  cursor: pointer;
}
</style>
