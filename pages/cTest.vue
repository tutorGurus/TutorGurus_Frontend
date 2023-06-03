<template>
    <div> 
        <client-only>
            <div>
                <Calendar :attributes="attributes" @click:date="showDate"  />
                <p>    
                    <v-text-field
                    label="Selected Date"
                    v-model="selectedDate"
                    readonly
                    />
                </p>
            </div>
            <div>
                <VDatePicker v-model="date" :select-attribute="selectAttribute" />
                <p> {{ date  }}</p>
            </div>
        </client-only>
    </div>
</template>


<script setup>
import { Calendar } from 'v-calendar';

const date = ref(new Date());
const selectAttribute = ref({ dot: true });

const scheduleData = {
    specific: [
        [2023, 5, 17, "18:00" , "20:00" ],
        [2023, 5, 18, "19:00" , "20:00" ]
    ]
}
const schedule = scheduleData.specific.map(item => {
    return {
        dates: new Date(item[0], item[1] - 1, item[2]),
        start: item[3],
        end: item[4]
    }
})

const selectedDate = ref('');
const attributes = computed(() => schedule.map(item => {
    return {
        key: 'blue',
        dot: true,
        dates: item.dates
    }
}));

function showDate(e) {
    selectedDate.value = e.date.toLocaleDateString();
}

</script>