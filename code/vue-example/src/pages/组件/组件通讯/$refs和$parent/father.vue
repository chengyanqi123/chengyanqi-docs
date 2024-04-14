<template>
    <div class="father">
        <h2>我是父组件</h2>
        <children />
    </div>
</template>

<script setup>
import children from './children.vue';
</script>

<style scoped lang='scss'>
.father {
    width: 100%;
    background-color: yellowgreen;
    padding: 10px;
    box-sizing: border-box;
}
</style>