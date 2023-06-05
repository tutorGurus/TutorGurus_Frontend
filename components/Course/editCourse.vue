<script setup>
import { ref } from "vue";

const dialog = ref(false);
const teachingLevel = ref(null);
const courseCategory = ref(null);

const props = withDefaults(defineProps(), {
    course: {
        type: Object,
        required: true
    }
});

const gradeItems = computed(() => {
    switch (teachingLevel.value) {
        case '國小':
            return ['小一', '小二', '小三', '小四', '小五', '小六'];
        case '國中':
            return ['國一', '國二', '國三'];
        case '高中':
            return ['高一', '高二', '高三'];
        default:
            return [];
    }
});
const courseItems = computed(() => {
    switch (courseCategory.value) {
        case '小一':
            return ['國語', '數學', '生活', '健體'];
        case '小二':
            return ['國語', '數學', '生活', '健體'];
        case '小三':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小四':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小五':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '小六':
            return ['國語', '數學', '自然', '社會', '藝文','綜合','健體'];
        case '國一':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '國二':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '國三':
            return ['國文', '英語', '數學', '自然', '科技', '社會', '藝文', '綜合', '健體'];
        case '高一':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史', '公民'];
        case '高二':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史'];
        case '高三':
            return ['國文', '英語','數學', '生物', '物理', '化學', '地科', '地理', '歷史'];
        default:
            return [];
    }
})

</script>

<template>
    <v-container>
        <v-row justify="start">
            <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn 
                class="rounded text-white mx-2"
                color="#F2813B"
                variant="elevated" v-bind="props"> 編輯 </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">編輯課程</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="['國小', '國中', '高中']"
                        label="授課程度*"
                        v-model = "teachingLevel"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items=gradeItems
                        label="授課年級*"
                        v-model = "courseCategory"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="['上學期', '下學期']"
                        label="授課學期*"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                        :items=courseItems
                        label="授課科目*"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field 
                        label="課程名稱*" 
                        :model-value="course ? course.title : ''"
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="課程簡介"
                        model-value=""
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="課前準備"
                        model-value=""
                        ></v-textarea>
                    </v-col>
                    </v-row>
                </v-container>
                <small>*為必填欄位</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>
