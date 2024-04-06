<template>
    <div>
        <h1 ref="h1">06.definExposeE</h1>
        <h1>----------------------</h1>
        <definExposeE2 ref="exp" />
    </div>
</template>

<script setup>
import definExposeE2 from './06.definExposeE2.vue'
console.log('↓↓↓↓↓↓↓↓↓↓↓ 06. definExposeE ↓↓↓↓↓↓↓↓↓↓↓');
import { ref, onMounted } from 'vue'

const h1 = ref()
const exp = ref()
onMounted(() => {
    // 在普通标签上使用ref则可以获取到对应的DOM
    console.log("h1: ", h1.value)       // h1:  <h1>​06.definExposeE2​</h1>​
    // 在组件上使用ref可以获取组件实例，以及组件实例主动暴露的数据
    console.log("exp: ", exp.value)     // Proxy(Object) {data: RefImpl, __v_skip: true}
    console.log(exp.value.data)         // 主动暴露的数据
    setTimeout(() => {
        exp.value.data += ' -> 破坏单向数据流'
    }, 2000);
})
</script>

<style scoped lang='scss'></style>