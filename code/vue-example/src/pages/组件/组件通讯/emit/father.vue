<template>
    <div class="father">
        <h2>我是父组件</h2>
        <div>儿子成绩: {{ childrenScores }}</div>
        <children @get-scores="getScores" />
    </div>
</template>

<script setup>
import children from './children.vue';
import { ref } from 'vue'

const asset = ref([
    {
        id: 'A001',
        name: '房子',
        number: 2,
        unit: '栋'
    },
    {
        id: 'A002',
        name: '汽车',
        number: 3,
        unit: '辆'
    },
    {
        id: 'A003',
        name: '存款',
        number: 600,
        unit: '万'
    }
])
const childrenScores = ref({})
const getScores = (scores) => {
    childrenScores.value = scores
}
</script>

<style scoped lang='scss'>
.father {
    width: 100%;
    background-color: yellowgreen;
    padding: 10px;
    box-sizing: border-box;
}
</style>