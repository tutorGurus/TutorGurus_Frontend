import { defineStore } from 'pinia';

export const useTutorStore = defineStore('tutor', () => {
    const tutorData = ref({});

    const isFetch = ref(false);

    const setTutorData = (data) => {
        tutorData.value = data;
        console.log(tutorData);
    }
    
    return { isFetch, tutorData, setTutorData };
})