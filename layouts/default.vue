<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()

const login = ref(false);
const isLogout = ref(false);

const handleLoginSuccess = () => {
  login.value = false; // 在登录成功后将layouts中的ref改为false
  isLogout.value = true
}

const logout = () => {
  sessionStorage.removeItem("user");
  isLogout.value = false
  alert("登出成功!");
  router.push("/");
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" title="TutorGurus">
      <v-btn to="/">首頁</v-btn>
      <v-btn to="/courses">課程一覽</v-btn>
      <v-btn to="/teachers">師資一覽</v-btn>
      <v-btn to="/user">個人頁面</v-btn>
      <v-btn to="/cart">購物車</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="login = true" v-if="!isLogout">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon v-else @click="logout">
        登出
      </v-btn>
      <v-dialog transition="dialog-top-transition" width="380" v-model="login">
        <LoginAndRegister :layoutsLogin="login" :onLoginSuccess="handleLoginSuccess" />
      </v-dialog>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
