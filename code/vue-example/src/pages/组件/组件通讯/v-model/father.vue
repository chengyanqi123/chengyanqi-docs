<template>
    <div class="father">
        <h2>我是父组件</h2>
        <div>{{ car }}</div>
        <button @click="car.price += 10">add</button>
        <!-- <input type="text" v-model="name"> -->
        <!-- 等同于 -->
        <!-- <input type="text" v-bind:value="name" @input="input($event)"> -->
        <!-- <input type="text" :value="name" @input="name = $event.target.value"> -->

        <!-- 在组件上使用v-model -->
        <!-- <children v-model="name" /> -->
        <!-- 等同于 -->
        <!-- <children v-bind:modelValue="name" @update:modelValue=""/> -->
    </div>
</template>

<script setup>
import children from './children.vue';
import { ref, markRaw } from 'vue';
const name = ref('erick')
function input(e) {
    name.value = e.target.value
}

let car = { pp: 'audio', price: 30 }
car = ref(car)

</script>

<style scoped lang='scss'>
.father {
    width: 100%;
    background-color: yellowgreen;
    padding: 10px;
    box-sizing: border-box;
}
</style>