<template>
    <div class="children">
        <h2>我是子组件</h2>
    </div>
</template>

<script setup>
defineEmits([''])
</script>

<style scoped lang='scss'>
.children {
    width: 100%;
    height: 280px;
    background-color: yellow;
    border: 1px solid white;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
}
</style>