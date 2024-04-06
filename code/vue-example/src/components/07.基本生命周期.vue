<template>
    <div>
        <h1>07. 基本生命周期</h1>
        <p>日期: {{ localDate }}</p>
        <button @click="incrementDate">日期+1</button>
        <button @click="remove">销毁自身</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
console.log('↓↓↓↓↓↓↓↓↓↓↓ 07. 基本生命周期 ↓↓↓↓↓↓↓↓↓↓↓')

const date = ref(new Date())
const localDate = computed(() => {
    return date.value.toLocaleString()
})
function incrementDate() {
    date.value = new Date(date.value.getTime() + 1000 * 60 * 60 * 24)
}
function remove() {
    show.value = false
}

onBeforeMount(() => {
    console.log('挂载前 => onBeforeMount');
})
onMounted(() => {
    console.log('挂载后 => onMounted');
})

onBeforeUpdate(() => {
    console.log('更新前 => onBeforeUpdate');
})
onUpdated(() => {
    console.log('更新后 => onUpdated');
})

onBeforeUnmount(() => {
    console.log('卸载前 => onBeforeUnmount');
})
onUnmounted(() => {
    console.log('卸载后 => onUnmounted');
})
</script>

<style scoped lang='scss'></style>