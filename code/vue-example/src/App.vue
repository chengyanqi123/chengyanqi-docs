<template>
  <div class="app">
    <div class="nav">
      <button>
        <router-link to="/">&lt;回到首页</router-link>
      </button>
      <button @click="goHome" v-show="showBack">&lt;返回</button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const [route, router] = [useRoute(), useRouter()];
const showBack = ref(true)

// console.log("route: ", route);
// console.log("router: ", router);
// watch(() => route.path, newPath => {
//   console.log("newPath: ", newPath);
//   showBack.value = newPath !== '/'
// }, {
//   immediate: true
// })

function goHome() {
  router.back()
}

</script>

<style lang="scss">
$nav-height: 40px;

* {
  margin: 0;
  padding: 0;
}

.app {
  &::before {
    display: block;
    content: "";
    width: 100vw;
    height: $nav-height;
  }

  >.nav {
    width: 100vw;
    height: $nav-height;
    position: fixed;
    left: 0;
    top: 0;
  }

  >a {
    display: block;
    padding: 40px 20px;
    color: #00f;
    text-decoration: underline;
  }

  >.router-active {
    color: #f00;
    text-decoration: underline;
  }
}
</style>
