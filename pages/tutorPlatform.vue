<script setup>
const tutorStore = useTutorStore()

await useAsyncData('tutorInfo', async () => {
  const { value: token } = useCookie('token')
  const res = await $fetch(`/tutors/v1/profile/tutorBackground`, {
    method: 'GET',
    baseURL: 'https://tutorgurus-backend-l63x.onrender.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  tutorStore.setTutorData(res.data[0])

  return data
})
</script>

<template>
  <TutorInfo />
  <v-container class="py-10">
    <NuxtPage />
  </v-container>
</template>

<style></style>
