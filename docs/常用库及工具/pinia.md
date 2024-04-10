---
title: pinia
---

# [pinia](https://pinia.vuejs.org/zh/getting-started.html)

Pinia 是 Vue 的专属状态管理库，可以跨组件或页面共享状态数据。

## 开始

### 安装

```bash
npm i pinia
# pnpm i pinia
# yarn add pinia
```

### 创建

```js
// @/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const app = createApp(App)

// 使用pinia
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
```

### 定义

```js
// @/store/User.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  // 其他配置...
})
```

### 使用

```js
// @/views/user/index.vue
import { useUserStore } from '@/store/User.js'
const userStore = useUserStore()
```

## Store

Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，**它承载着全局状态**。它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有**三个概念**，`state`、`getter` 和 `action`，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。在定义一个`Store`是应当遵循以下**命名规范**：

- 文件名：首字母一般大写，以具体单一业务名称/组件名称同名。例如：`Uer.js`。
- store唯一id：一般与文件名一致，首字母小写。例如：`user`。
- defineStore返回值：最好使用`store`的名字，同时以 `use` 开头且以 `Store` 结尾。例如：`useUserStore`。
- 数据名：`store`名字加上以 `Store` 结尾。例如：`const userStore = useUserStore()`。

以下示例代码，后面章节依次讲解：

```js
// @src/store/User.js
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

function mockToken() {
    return Promise.resolve({
        statusCode: 200,
        data: {
            code: 200,
            token: 'refresh mock token'
        }
    })
}
export const useUserStore = defineStore('user', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            nick: 'tom',
            birth: 834278400000,
            gender: 0,
            token: 'xxx',
            hobby: ['ball', 'book']
        }
    },
    actions: {
        async refreshToken() {
            // const { data } = await axios('xxxx', { ...options })
            const { data } = await mockToken()
            this.token = data.token
        }
    },
    getters: {
        genderText: state => state.gender ? '男' : '女',
        birthText() {
            return dayjs(this.birth).format('YYYY-MM-DD')
        }
    }
})
```

### State

`state` 是 `store` 的核心，用于存放（集中式管理的）共享数据。使用`pinia`提供的`defineStore()`方法创建。

默认情况下，可以通过 `store` 实例访问 `state`，直接对其进行读写。

```js
// @/store/User.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
	// 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            nick: 'tom',
            birth: 834278400000,
            gender: 0,
            token: 'xxx',
            hobby: ['ball', 'book']
        }
    }
})
```

#### 访问state

访问`state`的方式通常有3种：

- 直接通过实例访问：`userStore.nick`。
- 通过实例的`$state`属性进行访问：`store.$state()`进行重置。
- 通过`store`的`getter`函数访问。

```vue
<!-- @/pages/user.vue -->
<template>
	<div>userStore: {{ userStore }}</div>
</template>

<script setup>
import { useUserStore } from '@/store/User.js'
// userStore是`reactive`的响应式数据
const userStore = useUserStore()

// 访问state
console.log(userStore.nick)	// tom
console.log(userStore.$state.nick)	// tom
</script>
```

#### 修改state

改变`state`的方式通常有4种：

- 直接通过实例修改：`userStore.nick = 'jerry'`。
- 通过`store.$patch()`进行派发。
- 通过`store.$reset()`进行重置：使用**选项式语法**可以直接调用 `store` 的 `$reset()` 方法将 `state` 重置为初始值。**setup语法时**则需要创建自己的 `$reset()` 方法。
- 通过`store`对应的`action`进行修改。

```vue
<!-- @/pages/user.vue -->
<template>
    <div>userStore: {{ userStore }}</div>
</template>

<script setup>
import { useUserStore } from '@/store/User.js'
const userStore = useUserStore()

// 修改state
userStore.nick = 'jerry'
userStore.$patch({
    nick: 'jerry',
    birth: 834278400000,
    gender: 1,
    token: 'xxx',
    hobby: ['girl', 'ball']
})
userStore.$reset()  // { "nick": "tom", "birth": 834278400000, "gender": 0, "token": "xxx", "hobby": [ "ball", "book" ] }
</script>
```

#### 订阅state

通过 store 的 `$subscribe()` 方法侦听 state 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 *subscriptions* 在 *patch* 后只触发一次。

默认情况下，*state subscription* 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 *state subscription* 从当前组件中*分离*：

```vue
<!-- @/pages/user.vue -->
<script setup>
import { useUserStore } from '@/store/User.js'
const userStore = useUserStore()

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
</script>
```

> :warning:TIP
>
> 可以在 `pinia` 实例上使用 `watch()` 函数侦听整个 state：
>
> ```js
> watch(
>     pinia.state,
>     (state) => {
>         // 每当状态发生变化时，将整个 state 持久化到本地存储。
>         localStorage.setItem('piniaState', JSON.stringify(state))
>     },
>     { deep: true }
> )
> ```

### Action

Action 相当于组件中的 `method`。它们可以通过 `defineStore()` 中的 `actions` 属性来定义，**并且它们也是定义业务逻辑的完美选择，**延用`State`示例代码：

```js
// @/store/User.js
import { defineStore } from 'pinia'
function mockToken() {
    return Promise.resolve({
        statusCode: 200,
        data: {
            code: 200,
            token: 'refresh mock token'
        }
    })
}
export const useUserStore = defineStore('user', {
    state: () => {
        // `State`示例代码逻辑
    },
    actions: {
         async refreshToken() {
            // const { data } = await axios('xxxx', { ...options })
            const { data } = await mockToken()
            this.token = data.token
        }
    }
})

// @/pages/user.vue
import { onMounted } from 'vue'
import { useUserStore } from '@/store/User.js'
const userStore = useUserStore()
onMounted(async () => {
    await userStore.refreshToken()
    console.log(userStore.token)	// refresh mock token
})
```

### Getter

Getter 完全等同于 store 的 state 的**计算属性**。可以通过 `defineStore()` 中的 `getters` 属性来定义它们。**推荐**使用箭头函数，并且它将接收 `state` 作为第一个参数，延用`State`示例代码：

```js
// @/store/User.js
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
export const useUserStore = defineStore('user', {
    state: () => {
        // `State`示例代码逻辑
    },
    getters: {
    	genderText: state => state.gender? '男': '女',
        birthText() {
			return dayjs(this.birth).format('YYYY-MM-DD')
        }
	}
})

// @/pages/user.vue
import { onMounted } from 'vue'
import { useUserStore } from '@/store/User.js'
const userStore = useUserStore()
console.log(userStore.genderText)   // 女
userStore.gender = 1
console.log(userStore.genderText)   // 男
console.log(userStore.birthText)    // 06-09
```

## 组合式Store

组合式 store 是可以相互使用。第二个参数从一个**对象**变成了一个**`getter`**函数。使用`setup store`改写`Store示例代码`：

```js
// @src/store/User.js
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { ref, computed } from 'vue'

function mockToken() {
    return Promise.resolve({
        statusCode: 200,
        data: {
            code: 200,
            token: 'refresh mock token'
        }
    })
}
export const useUserStore = defineStore('user', () => {
    const nick = ref('tom')
    const birth = ref(834278400000)
    const gender = ref(0)
    const token = ref('xxx')
    const hobby = ref(['ball', 'book'])

    // getter --> computed
    const genderText = computed(() => gender.value ? '男' : '女')
    const birthText = computed(() => dayjs(birth.value).format('YYYY-MM-DD'))

    // action --> method
    async function refreshToken() {
        // const { data } = await axios('xxxx', { ...options })
        const { data } = await mockToken()
        token.value = data.token
    }

    // 在组合式API中需要自定义$reset
    function $reset() {
        nick.value = 'tom'
        birth.value = 834278400000
        gender.value = 0
        token.value = 'xxx'
        hobby.value = ['ball', 'book']
    }
    return { nick, birth, gender, token, hobby, genderText, birthText, refreshToken, $reset }
})
```

