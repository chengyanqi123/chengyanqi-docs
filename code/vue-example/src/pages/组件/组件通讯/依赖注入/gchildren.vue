<template>
    <div class="gchildren">
        <h2>我是孙组件</h2>
        <div>父组件数据：{{ data }}</div>
        <button @click="change">父亲变年轻</button>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const data = inject('fatherData')
function change() {
    data.age -= 1
}
</script>

<style scoped lang='scss'>
.gchildren {
    width: 100%;
    height: 200px;
    background-color: burlywood;
    border: 1px solid white;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
}
</style>