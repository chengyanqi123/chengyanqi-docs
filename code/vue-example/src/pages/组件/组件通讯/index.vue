<template>
    <div class="component-com">
        <h1>组件通信</h1>
        <div class="container">
            <div class="left">
                <router-link class="item" to="/component/组件通讯/props" active-class="active">props</router-link>
                <router-link class="item" to="/component/组件通讯/emit" active-class="active">emit</router-link>
                <router-link class="item" to="/component/组件通讯/发布订阅" active-class="active">发布订阅</router-link>
                <router-link class="item" to="/component/组件通讯/依赖注入" active-class="active">依赖注入</router-link>
                <router-link class="item" to="/component/组件通讯/v-model" active-class="active">v-model</router-link>
                <router-link class="item" to="/component/组件通讯/$attrs" active-class="active">$attrs</router-link>
                <router-link class="item" to="/component/组件通讯/$refs和$parent" active-class="active">$refs和$parent</router-link>
            </div>
            <router-view class="right"></router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang='scss'>
.component-com {
    h1 {
        width: 100%;
        text-align: center;
        background-color: skyblue;
        color: white;
    }

    .container {
        display: flex;

        .left {
            width: 200px;

            .item {
                display: block;
                border-bottom: 1px solid black;
                list-style: none;
                background-color: skyblue;
                color: white;
                padding: 16px 0;
                text-align: center;
                cursor: pointer;
                text-decoration: none;
            }

            .active {
                background-color: sandybrown;
            }
        }

        .right {
            width: 600px;
            padding: 20px;
            box-sizing: border-box;
        }
    }


}
</style>