<template>
    <div class="father">
        <h2>我是父组件</h2>
        <div>我有{{ money }}万</div>
        <button @click="foo">把钱给儿子</button>
        <div v-show="score">儿子成绩: {{ score }}</div>
        <children />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import children from './children.vue';
import mitter from './mitt'

const money = ref(100)
const score = ref(0)

// 触发事件，数据给子组件
function foo() {
    mitter.emit('father', money)
}

// 订阅子组件事件接收数据
mitter.on('children', (_score) => {
    score.value = _score
})

</script>

<style scoped lang='scss'>
.father {
    width: 100%;
    background-color: yellowgreen;
    padding: 10px;
    box-sizing: border-box;
}
</style>