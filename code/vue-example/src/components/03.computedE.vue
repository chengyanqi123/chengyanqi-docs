<template>
    <div>
        <h1>03. computed</h1>
        <div>{{ fullName }}</div>
    </div>
</template>

<script setup>
console.log('↓↓↓↓↓↓↓↓↓↓↓ 03. computed ↓↓↓↓↓↓↓↓↓↓↓');
// 接受一个 getter 函数，返回一个只读的响应式 ref 对象。
// 该 ref 通过 .value 暴露 getter 函数的返回值。
// 它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。
import { ref, computed } from 'vue';
const lastName = ref('张');
const firstName = ref('三');

// // 默认情况下fullName是只读的响应式数据
// const fullName = computed(() => {
//     return lastName.value + firstName.value;
// })
// // [Vue warn] Write operation failed: computed value is readonly
// fullName.value = '王 五'
// console.log(fullName.value); // 张三

// 可读写的computed
const fullName = computed({
    get() {
        return lastName.value + firstName.value;
    },
    set(val) {
        const names = val.split('-');
        lastName.value = names[0];
        firstName.value = names[1];
    }
})
fullName.value = '王-五'
console.log(fullName.value); // 王五

setTimeout(() => {
    lastName.value = '李';
    firstName.value = '四';
}, 2000)

</script>

<style scoped lang='scss'></style>