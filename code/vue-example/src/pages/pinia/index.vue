<template>
    <div>userStore: {{ userStore }}</div>
    <div>gender: {{ userStore.genderText }}</div>
    <div>nick: {{ nick }}</div>
    <div>hobby: {{ hobby }}</div>
    <div>token: {{ token }}</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/User-composition.js'
// userStore是`reactive`的响应式数据
const userStore = useUserStore()

// 访问state
console.log("userStore", userStore)     // Proxy(Object) {$id: 'user', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
console.log("userStore.nick", userStore.nick)	// tom
console.log("userStore.$state.nick", userStore.$state.nick)	// tom
// 单个访问比较繁琐，可以使用`pinia`提供的`storeToRefs`方法，不同于`toRefs`的是，`storeToRefs`只会将`state`数据进行转换。
const { nick, hobby, token } = storeToRefs(userStore)

// 修改state
userStore.nick = 'jerry'
userStore.$patch({
    nick: 'jerry',
    birth: 834278400000,
    gender: 1,
    token: 'xxx',
    hobby: ['girl', 'ball']
})
userStore.$reset()  //  { "nick": "tom", "birth": 834278400000, "gender": 0, "token": "xxx", "hobby": [ "ball", "book" ] }

// 订阅state
userStore.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    mutation.type // 'direct' | 'patch object' | 'patch function'
    // 和 cartStore.$id 一样
    mutation.storeId // 'user'
    // 只有 mutation.type === 'patch object'的情况下才可用
    mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('user', JSON.stringify(state))
}, { detached: true })

onMounted(async () => {
    await userStore.refreshToken()
    console.log(userStore.token)    // refresh mock token
})

console.log(userStore.genderText)   // 女
userStore.gender = 1
console.log(userStore.genderText)   // 男
console.log(userStore.birthText)    // 06-09
</script>

<style scoped lang='scss'></style>