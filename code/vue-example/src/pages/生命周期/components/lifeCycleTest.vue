<template>
    <div ref="compo" class="compo">
        <h2>我是生命周期组件</h2>
        <p>
            日期:
            <span>{{ localDate }}</span>
            ，每秒自增一天
        </p>
        <button @click="incrementDate(10)">日期+10</button>
    </div>
</template>

<script setup name="lifeCycleComponent">
import { ref, computed } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const compo = ref()
const date = ref(new Date())
const localDate = computed(() => {
    return date.value.toLocaleString()
})
function incrementDate(day) {
    const oneDayTimestamp = 1000 * 60 * 60 * 24
    date.value = new Date(date.value.getTime() + oneDayTimestamp * day)
}

const interval = setInterval(() => {
    console.log("interval +1 day");
    incrementDate(1)
}, 1000)

// // 这种写法不会触发钩子，但是会得到一个警告
// // [Vue warn]: onMounted is called when there is no active component instance to be associated with.
// // Lifecycle injection APIs can only be used during execution of setup(). 
// // If you are using async setup(), make sure to register lifecycle hooks before the first await statement.
// setTimeout(() => {
//     onBeforeMount(() => {
//         console.log('挂载前 => onBeforeMount', compo.value);
//         debugger;
//     })
// })

onBeforeMount(() => {
    console.log('挂载前 => onBeforeMount', compo.value);
})

onMounted(() => {
    console.log('挂载后 => onMounted', compo.value);
})

onBeforeUpdate(() => {
    console.log('更新前 => onBeforeUpdate', compo.value);
})
onUpdated(() => {
    console.log('更新后 => onUpdated', compo.value);
})

onBeforeUnmount(() => {
    // 卸载前清除定时器，否则会一直执行。
    clearInterval(interval)
    console.log('卸载前 => onBeforeUnmount', compo.value);
})
onUnmounted(() => {
    console.log('卸载后 => onUnmounted', compo.value);
})
</script>

<style scoped lang='scss'>
.compo {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(219, 222, 128);
}
</style>