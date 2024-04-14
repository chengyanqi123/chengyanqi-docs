<template>
    <div class="buttons">
        <router-link class="link" to="/reactive-core" active-class="router-active">响应式:核心</router-link>
        <router-link class="link" to="/life-cycle" active-class="router-active">生命周期</router-link>
        <router-link class="link" to="/router" active-class="router-active">路由</router-link>
        <router-link class="link" to="/pinia" active-class="router-active">pina</router-link>
        <router-link class="link" to="/component" active-class="router-active">组件</router-link>
    </div>
</template>

<script setup>
</script>

<style scoped lang='scss'>
.buttons {
    display: flex;
    // width: 100vw;
    // height: 100vh;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .link {
        padding: 20px;
    }
}
</style>