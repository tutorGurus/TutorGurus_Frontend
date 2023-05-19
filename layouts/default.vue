<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const login = ref(false);
const isLogout = ref(false);

const handleLoginSuccess = () => {
  login.value = false; // 在登录成功后将layouts中的ref改为false
  isLogout.value = true;
};

const logout = () => {
  sessionStorage.removeItem("user");
  isLogout.value = false;
  alert("登出成功!");
  router.push("/");
};
</script>

<template>
  <v-layout>
    <v-toolbar absolute fixed class="mt-4 d-none d-md-flex" ref="navbar">
      <v-toolbar-title>
        <v-img src="/LOGO.png" height="28px" width="auto"></v-img>
      </v-toolbar-title>
      <v-toolbar-title class="text-center">
        <v-btn class="text-button font-weight-black">搜尋教師</v-btn>
        <v-btn to="/courses" class="text-button font-weight-black">課程一覽</v-btn>
        <v-btn to="/teachers" class="text-button font-weight-black">師資一覽</v-btn>
      </v-toolbar-title>
      <v-toolbar-title class="text-end">
        <v-btn icon @click="login = true" v-if="!isLogout">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon v-else @click="logout"> 登出 </v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <v-dialog transition="dialog-top-transition" width="380" v-model="login">
      <LoginAndRegister :layoutsLogin="login" :onLoginSuccess="handleLoginSuccess" />
    </v-dialog>


    <v-main>
      <slot />
      <NuxtLayout name="footer"></NuxtLayout>
    </v-main>
  </v-layout>
</template>

<style scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0px 0px !important;
}

.v-toolbar.v-toolbar--absolute {
  width: 1600px;
  position: fixed;
  background-color: transparent;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}
</style>
