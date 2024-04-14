<template>
    <div class="father">
        <h2>我是父组件</h2>
        <div>我的数据：{{ data }}</div>
        <children />
    </div>
</template>

<script setup>
import children from './children.vue';
import { provide, reactive } from 'vue'
const data = reactive({
    name: 'father',
    age: 40,
    money: "100w"
})
provide('fatherData', data)
</script>

<style scoped lang='scss'>
.father {
    width: 100%;
    background-color: yellowgreen;
    padding: 10px;
    box-sizing: border-box;
}
</style>