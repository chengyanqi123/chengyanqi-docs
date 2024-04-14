<template>
    <div class="children">
        <h2>我是子组件</h2>
        <h2>我是子组件，我的考试成绩：</h2>
        <div v-for="item in scores" :key="item.id">{{ item.subject }}: {{ item.score }} </div>
        <button @click="emit('get-scores', scores)">把成绩给父亲看</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['get-scores'])
const scores = ref([
    {
        id: 'A001',
        subject: '数学',
        score: 90
    },
    {
        id: 'A002',
        subject: '英语',
        score: 60
    }
])
</script>

<style scoped lang='scss'>
.children {
    width: 100%;
    height: 280px;
    background-color: yellow;
    border: 1px solid white;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
}
</style>