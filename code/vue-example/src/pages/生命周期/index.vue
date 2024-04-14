<template>
    <div class="content">
        <h1>生命周期</h1>
        <lifeCycleTest v-if="show" />
        <button @click="show = !show">{{ buttonText }}</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import lifeCycleTest from './components/lifeCycleTest.vue';
const show = ref(true)
const buttonText = computed(() => show.value ? "卸载组件" : "挂载组件")
</script>

<style scoped lang='scss'>
.content {
    width: 600px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(128, 196, 222);
    button {
        margin-top: 10px;
    }
}
</style>