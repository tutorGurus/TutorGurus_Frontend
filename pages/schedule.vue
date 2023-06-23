<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
const tabs = ref(1)
// import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

// const isEditing = ref(false);
// const data = ref({});

// const update = () => {
//   const { value: token } = useCookie("token");
//   $fetch("/user/v1/profile", {
//     method: "PATCH",
//     // baseURL: "http://localhost:8000",
//     baseURL: "https://tutorgurus-backend.onrender.com",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data.value),
//   })
//     .then((response) => {
//       console.log(response);
//       if (response.status === "success") {
//         alert("修改成功!");
//         isEditing.value = false;
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const cancel = () => {
//   getUserData();
//   isEditing.value = false;
// };

// const getUserData = () => {
//   const { value: token } = useCookie("token");
//   $fetch(`/user/v1/profile`, {
//     // baseURL: "http://localhost:8000",
//     baseURL: "https://tutorgurus-backend.onrender.com",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     console.log(response);
//     if (response.status === "success") {
//       if (response.data.birthday !== "" || response.data.birthday !== null) {
//         response.data.birthday = response.data.birthday.substring(0, 10);
//       }
//       data.value = response.data;
//     }
//   });
// };

// onMounted(() => {
//   const { value: token } = useCookie("token");
//   if (!token) {
//     alert("請先登入會員");
//     router.push("/");
//   } else {
//     getUserData();
//   }
// });
</script>

<template>
  <UserInfo />
  <v-container>
    <!-- <v-card class="tab-position">
    <v-tabs v-model="tabs" bg-color="white" color="deep-orange-accent-2">
      <v-tab :value="1"> 行事曆 </v-tab>
      <v-tab :value="2"> 課程預約 </v-tab>
      <v-tab :value="3"> 課程請假 </v-tab>
      <v-tab :value="4"> 課程異動 </v-tab>
    </v-tabs>
  </v-card> -->
  </v-container>
  <div class="py-16">
    <v-container>
      <div>
        <v-row>
          <v-col cols="12">
            <h1>我的課表</h1>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.tab-position {
  position: absolute;
  top: 30%;
  min-width: 80%;
}
</style>

