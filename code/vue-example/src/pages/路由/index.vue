<template>
    <div>
        <h1>路由</h1>
    </div>
</template>

<script setup>
// ## 基本
// 路由组件通常放在`pages`或者`views`文件夹下，一般的组价通常放在`components`文件夹下。
// 通过点击导航切换的路由组件默认是卸载的，需要的时候再去挂载。

// ## 参数
// query: 形如`detail?id=xx&read=xx`。
// parmas: 形如`/detail/:id/:read?`，需要使用路由占位符，并且`params`只能通过路由`name`跳转。
// props: 如果在路由配置中申明`props: true`，则会通过props的形式传递参数，通过`defineProps()`接收参数。
//   形如：
//   {
//       
//       component: () => import('@/pages/detail/index.vue'),
//       path: '/detail/:id/:read',
//       props: true,
//       // query必须使用函数
//       path: '/detail',
//       props: (route) => route.path,
//   }
//  ==> <Detail id="xxx" read="xxx">
</script>

<style scoped lang='scss'></style>