<template>
    <div class="children">
        <h2>我是子组件</h2>
        <div>英语{{ score }}分</div>
        <div v-show="money">父亲的资产: {{ money }}万</div>
        <button @click="mitter.emit('children', score)">把成绩给父亲</button>
    </div>
</template>

<script setup>
import mitter from './mitt'
import { ref } from 'vue'

const money = ref(0)
const score = ref(60)
mitter.on('father', (_money) => {
    money.value = _money
})
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