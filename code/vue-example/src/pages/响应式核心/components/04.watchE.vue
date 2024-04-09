<template>
    <div>
        <h1>04. watch</h1>
        <audio ref="audio">
            <source src="@/assets/medias/18year.mp3" type="audio/mpeg">
        </audio>
        <audio ref="audio2">
            <source src="@/assets/medias/60year.mp3" type="audio/mpeg">
        </audio>
        <div>我是{{ person.name }}，人家刚满{{ age }}岁，是{{ type }}人</div>
        <div>
            变化值: <input type="number" v-model="increment">
        </div>
        <button @click="changeAge(-1)">减少年龄</button>
        <button @click="changeAge(1)">增加年龄</button>
    </div>
</template>

<script setup name="watchE">
console.log('↓↓↓↓↓↓↓↓↓↓↓ 04. watch ↓↓↓↓↓↓↓↓↓↓↓');
import { watch, reactive, ref, toRefs, defineExpose } from 'vue';
// ## watch() 可以侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
// 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。
// 侦听器的源可以是以下几种：
// 1. 一个函数，返回一个值
// 2. 一个 ref
// 3. 一个响应式对象
// 4. 或是由以上类型的值组成的数组

let person = reactive({
    name: '喵喵球~',
    age: 16,
    type: '成年'
})
let { age, type } = toRefs(person)
const increment = ref(1)
const changeAge = (type = 1) => age.value += increment.value * type;
const audio = ref();
const audio2 = ref();
const watchAgeHelper = (age) => {
    // 注意：如果侦听内容包含type的话，就会触发两次该函数。如3所示
    type.value = age >= 18 ? '成年' : '未成年'
    if (!audio.value) return void 0
    if (age === 18) {
        audio.value.currentTime = 0
        audio.value.play()
        console.log("刚满十八岁~~");
    } else if (age === 60) {
        audio2.value.currentTime = 0
        audio2.value.play()
        console.log("我满60岁就转运了~~");
    } else {
        audio.value.pause()
        audio2.value.pause()
    }
}

// 1. 侦听一个getter函数
// 当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。
// 如果你想让回调在深层级变更时也能触发，你需要使用 { deep: true } 强制侦听器进入深层级模式。
// 在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。
// watch(() => person.age, (newVal, oldVal) => {
//     watchAgeHelper(newVal)
// }, {
//     immediate: true,
// })

// 2. 侦听一个ref
// 如果ref是一个对象，那么默认值监视对象的内存地址变化。
// 若需要监视里面单独属性的变化，则需要配置选项depp: true。
// 注意：若不修改整个响应式数据，则oldval还是指向的同一个地址。newVal == oldVal
// watch(age, (newVal, oldVal) => {
//     watchAgeHelper(newVal)
// }, {
//     immediate: true
// })

// 3. 侦听一个响应式对象
// 默认就是深度监听
// 若果直接修改整个reactive对象，则将失去响应式，可以使用Object.assign()来修改。
// 如：Object.assign(person, { age: 18, type: '成年' })
watch(person, (newVal, oldVal) => {
    console.log("person变化了", newVal, oldVal)
    watchAgeHelper(newVal.age)
}, {
    immediate: true,
})

// 4. 侦听由以上类型的值组成的数组
// watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
//     /* ... */
// })

// 总结：
// 1. 若监听的是(ref、reactive)响应式对象
//   - ref对象默认只会侦听一层数据，若需要深度侦听需要开启deep。reactive对象默认是深度监听。
//   - 若直接修改整个响应式数据，ref可直接.value修改。但reactive则将失去响应式，可以使用Object.assign()来修改。
// 2. 若监听的是(ref、reactive)响应式对象中的某个属性
//   - 若属性是一个普通数据，需要使用getter函数。
//   - 如属性是一个对象，则直接可以监听，但是不会监听自身的地址变化。
//   - 如属性是一个对象，也可以使用getter函数，同时建议使用getter函数+deep来深度监听。既可以够监听地址变化，对象值的变化。
defineExpose({ person })
</script>

<style scoped lang='scss'></style>