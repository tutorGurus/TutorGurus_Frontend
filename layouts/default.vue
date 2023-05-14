<script setup>
import { ref } from "vue";

const login = ref(false);
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" title="TutorGurus">
      <v-spacer></v-spacer>
      <v-btn icon @click="login = true">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-dialog transition="dialog-top-transition" width="380" v-model="login">
        <LoginAndRegister />
      </v-dialog>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
