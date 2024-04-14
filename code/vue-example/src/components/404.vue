<template>
    <div class="notfound">
        <div class="container">
            <h1 class="title">404</h1>
            <h2 class="title2">Not Found
            </h2>
            <p class="desc"> The resource requested could not be found on this server!</p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang='scss'>
.notfound {
    height: auto;
    min-height: 100%;

    .container {
        text-align: center;
        width: 800px;
        margin-left: -400px;
        position: absolute;
        top: 30%;
        left: 50%;

        .title {
            margin: 0;
            font-size: 150px;
            line-height: 150px;
            font-weight: bold;
        }

        .title2 {
            margin-top: 20px;
            font-size: 30px;
        }
    }
}
</style>