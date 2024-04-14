<template>
    <div class="component">
        <h1>组件</h1>
        <div class="links">
            <router-link to="/component/组件通讯">组件通讯</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
</script>

<style scoped lang='scss'>
h1 {
    text-align: center;
    background-color: rgb(137, 205, 231);
}

.links {
    border-bottom: 1px solid black;
    background-color: rgb(137, 205, 231);
    padding: 12px;
    display: flex;
    justify-content: space-evenly;
}
</style>