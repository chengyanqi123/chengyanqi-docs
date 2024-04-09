<template>
    <div>
        <h1>06.definExposeE2</h1>
        <h3>privateData: {{ privateData }}</h3>
        <h3>data: {{ data }}</h3>
    </div>
</template>

<script setup name="definExposeE2">
import { reactive, ref } from 'vue'
console.log('↓↓↓↓↓↓↓↓↓↓↓ 06. definExposeE2 ↓↓↓↓↓↓↓↓↓↓↓')

const data = ref('主动暴露的数据')
const privateData = reactive({
    name: 'erick',
    brith: new Date('1996-10-01').toLocaleDateString()
})
// 使用setup语法糖需要使用defineExpose向外暴露数据。
defineExpose({
    data
})
</script>

<style scoped lang='scss'></style>