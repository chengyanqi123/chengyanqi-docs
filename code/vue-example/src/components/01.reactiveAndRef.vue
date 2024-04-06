<template>
    <div>
        <h1>01. reactive和Ref</h1>
        <h2>---- reactive ----</h2>
        <div>{{ obj }}</div>
        <h2>---- ref ----</h2>
        <div>{{ obj2 }}</div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
console.log('↓↓↓↓↓↓↓↓↓↓↓ 01. reactiveAndRef ↓↓↓↓↓↓↓↓↓↓↓');

// ## reactive只能代理对象，不能代理基本数据类型。直接使用Proxy进行代理，不需要额外包装。
// ## ref可以代理基本数据类型，也可以代理对象。Vue会将数据进行包装。

// ## 总结和用法
// 作者：白瑞德
// 链接：https://juejin.cn/post/7211055301205934138
//   1. ref可以存储原始类型，而reactive不能。
//   2. ref需要通过<ref>.value访问数据，而reactive()可以直接用作常规对象。
//   3. 可以重新分配一个全新的对象给ref的value属性，而reactive()不能。
//   4. ref类型为Ref<T>，而reactive返回的反应类型为原始类型本身。
//   5. 基于第四条，ref可以自身管理依赖而reactive则借助全局变量以键值对的形式进行管理。
//   6. watch默认只观察ref的value，而对reactive则执行深度监听。
//   7. ref默认会用reactive对象类型的原始值进行深层响应转换。
const obj = reactive({
    name: '张三',
    age: 18
})

const obj2 = ref({
    name: '李四',
    age: 19
})
console.log(obj, obj2); // Proxy  RefImpl
console.log(obj.name, obj2.value.name); // 张三 李四

// ## ref自动解包
// 1. 将一个 ref 赋值给一个 reactive 属性时，该 ref 会被自动解包
const count = ref(1)
const obj3 = reactive({ count })
// 或者
// const obj3 = reactive({ })
// obj3.count = count
// ref 会被解包
console.log(obj3.count === count.value) // true
// 会更新 `obj3.count`
count.value++
console.log(count.value) // 2
console.log(obj3.count) // 2
// 也会更新 `count` ref
obj3.count++
console.log(obj3.count) // 3
console.log(count.value) // 3

// 2. 将访问数组或者map原生集合类型中的 ref 元素时，不会执行 ref 的解包：
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)
const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)

// ref使用在普通标签上
// ref使用在组件上
</script>

<style scoped lang='scss'></style>