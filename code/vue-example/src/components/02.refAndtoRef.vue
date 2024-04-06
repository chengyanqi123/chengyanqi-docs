<template>
    <div>
        <h1>02. ref和toRef(s)</h1>
        <h2>name: {{ person.name }}</h2>
        <h2>age: {{ person.age }}</h2>
        <h2>jobs: {{ person.jobs }}</h2>
        <button @click="updatePersonName">修改名字</button>
        <button @click="updatePersonAge">修改年龄</button>
        <button @click="updatePersonJobs">增加薪水</button>
    </div>
</template>

<script setup>
import { reactive, ref, toRef, toRefs } from 'vue';
console.log('↓↓↓↓↓↓↓↓↓↓↓ 02. refAndtoRef ↓↓↓↓↓↓↓↓↓↓↓');

// 在使用一个函数返回一个响应式对象，而此定义的“响应式对象”却失去了响应式，这时候就可以使用的 toRef 或是 toRefs 保持他的响应式。
const person = reactive({
    name: '张三',
    age: 18,
    jobs: {
        dirver: {
            salary: 10
        },
        teacher: {
            salary: 20
        },
        doctor: {
            salary: 30
        }
    },
});

// 此时解构出来的name和age将失去响应式
// let { name, age, jobs } = person;
// console.log(person, name, age, jobs);   // Proxy, {name: '张三', age: 18, jobs: {…}}, '张三', 18

// 使用toRef保持响应式
// let name = toRef(person, 'name');
// let age = toRef(person, 'age');
// let jobs = toRef(person, 'jobs');
// console.log(person, name, age, jobs);   // Proxy, ObjectRefImpl, ObjectRefImpl, ObjectRefImpl

// 使用toRefs保持响应式
let { name, age, jobs } = toRefs(person);
console.log(person, name, age, jobs);   // Proxy, ObjectRefImpl, ObjectRefImpl, ObjectRefImpl

function updatePersonAge() {
    console.log(age.value++);
}
function updatePersonName() {
    console.log(name.value += '-');
}
function updatePersonJobs() {
    Object.keys(jobs.value).forEach(key => jobs.value[key].salary += 100)
}
</script>

<script>
export default {
}
</script>

<style scoped lang='scss'></style>