---
title: Vue
date: 2022-08-18 15:42:00
---
# Vue

## 单文件组件SFC

一个 Vue 单文件组件 (SFC)，通常使用 `*.vue` 作为文件扩展名，它是一种使用了类似 HTML 语法的自定义文件格式，用于定义 Vue 组件。一个 Vue 单文件组件在语法上是兼容 HTML 的。

每一个 `*.vue` 文件都由三种顶层语言块构成：`<template>`、`<script>` 和 `<style>`，以及一些其他的自定义块：

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

### [自定义块](https://cn.vuejs.org/api/sfc-spec.html#custom-blocks)

在一个 `*.vue` 文件中可以为任何项目特定需求使用额外的自定义块。举例来说，一个用作写文档的 `<docs>` 块。这里是一些自定义块的真实用例：

- [Gridsome：`page-query`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql：`gql`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n：`i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

自定义块的处理需要依赖工具链。如果你想要在构建中集成你的自定义语块，请参见 [SFC 自定义块集成工具链指南](https://cn.vuejs.org/guide/scaling-up/tooling.html#sfc-custom-block-integrations)获取更多细节。

### [`src` 导入](https://cn.vuejs.org/api/sfc-spec.html#src-imports)

如果你更喜欢将 `*.vue` 组件分散到多个文件中，可以为一个语块使用 `src` 这个 attribute 来导入一个外部文件：

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

请注意 `src` 导入和 JS 模块导入遵循相同的路径解析规则，这意味着：

- 相对路径需要以 `./` 开头
- 你也可以从 npm 依赖中导入资源

```vue
<!-- 从所安装的 "todomvc-app-css" npm 包中导入一个文件 -->
<style src="todomvc-app-css/index.css" />
```

`src` 导入对自定义语块也同样适用：

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

### `setup`语法糖

要启用该语法，需要在 `<script>` 代码块上添加 `setup` 属性，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import导入的内容) 都能在模板中直接使用，里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。

```vue
<script setup>
import { capitalize } from './helpers'
import MyComponent from './MyComponent.vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import * as Form from './form-components'

const someCondition = Math.random() > 0.5
const msg = 'Hello!'
function log() {
    console.log(msg)
}
</script>

<template>
    <!-- 单文件使用多个组件 -->
    <Form.Input>
        <Form.Label>label</Form.Label>
    </Form.Input>
    <!-- 动态组件 -->
    <component :is="someCondition ? Foo : Bar" />
    <!-- 使用普通组件 -->
    <MyComponent />
    <div>{{ capitalize('hello') }}</div>
    <button @click="log">{{ msg }}</button>
</template>
```

#### defineExpose()

在`options`写法中，如果不写`expose`，默认会暴露所有的属性。这样就可以在外部通过组件实例，可以访问和修改到暴露的属性，从而打破了单项数据流。

```vue
<script>
export default {
    // 通过配置项暴露属性
    expose: ['sayHello'],
    methods: {
        sayHello() {
            console.log('hello')
        }
    },
    setup(props, { expose }) {
        const msg = 'hello'
        const person = {
            name: '张三',
            age: 18,
        }
        // setup函数中对外暴露数据
        expose({
            msg,
            person
        })
        return {
            msg,
            person
        }
    }
}
</script>
```

而`setup`语法会自动调用`expose()`但不传递任何数据，默认外部是拿不到组件数据的。

> 使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。
>
> 可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性

```vue
<script setup>
function sayHello() {
    console.log('hello')
}
const msg = 'hello'
const person = {
    name: '张三',
    age: 18,
}
defineExpose({
    msg,
    person,
    sayHello
})
</script>
```

#### defineProps() 和 defineEmits()

为了在声明 `props` 和 `emits` 选项时获得完整的类型推导支持，我们可以使用 `defineProps` 和 `defineEmits` API，它们将自动地在 `<script setup>` 中可用：

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup 代码
</script>
```

- `defineProps` 和 `defineEmits` 都是只能在 `<script setup>` 中使用的**编译器宏**。他们不需要导入，且会随着 `<script setup>` 的处理过程一同被编译掉。
- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 接收与 `emits` 选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推导。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的作用域。因此，传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块作用域内。

props 和 emit 也可以通过给 `defineProps` 和 `defineEmits` 传递纯类型参数的方式来声明：

```typescript
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+：另一种更简洁的语法
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()
```

- `defineProps` 或 `defineEmits` 要么使用运行时声明，要么使用类型声明。同时使用两种声明方式会导致编译报错。

- 使用类型声明的时候，静态分析会自动生成等效的运行时声明，从而在避免双重声明的前提下确保正确的运行时行为。

  - 在开发模式下，编译器会试着从类型来推导对应的运行时验证。例如这里从 `foo: string` 类型中推断出 `foo: String`。如果类型是对导入类型的引用，这里的推导结果会是 `foo: null` (与 `any` 类型相等)，因为编译器没有外部文件的信息。
  - 在生产模式下，编译器会生成数组格式的声明来减少打包体积 (这里的 props 会被编译成 `['foo', 'bar']`)。

- 在 3.2 及以下版本中，`defineProps()` 的泛型类型参数只能使用类型字面量或者本地接口的引用。

  这个限制已经在 3.3 版本中解决。最新版本的 Vue 支持在类型参数的位置引用导入的和有限的复杂类型。然而，由于类型到运行时的转换仍然基于 AST，因此并不支持使用需要实际类型分析的复杂类型，例如条件类型等。你可以在单个 prop 的类型上使用条件类型，但不能对整个 props 对象使用。

针对类型的 `defineProps` 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，我们还提供了 `withDefaults` 编译器宏：

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

上面代码会被编译为等价的运行时 props 的 `default` 选项。此外，`withDefaults` 辅助函数提供了对默认值的类型检查，并确保返回的 `props` 的类型删除了已声明默认值的属性的可选标志。

#### useSlots() 和 useAttrs()

在 `<script setup>` 使用 `slots` 和 `attrs` 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 `$slots` 和 `$attrs` 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 `useSlots` 和 `useAttrs` 两个辅助函数：

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` 和 `useAttrs` 是真实的运行时函数，它的返回与 `setupContext.slots` 和 `setupContext.attrs` 等价。它们同样也能在普通的组合式 API 中使用。

#### 与普通的 `<script> `一起使用

`<script setup>` 可以和普通的`<script>` 一起使用。普通的`<script>`在有这些需要的情况下或许会被使用到：

- 声明无法在 `<script setup>` 中声明的选项，例如 `inheritAttrs` 或插件的自定义选项 (在 3.3+ 中可以通过 [`defineOptions`](https://cn.vuejs.org/api/sfc-script-setup.html#defineoptions) 替代)。
- 声明模块的具名导出 (named exports)。
- 运行只需要在模块作用域执行一次的副作用，或是创建单例对象。

```vue
<script>
// 普通 <script>, 在模块作用域下执行 (仅一次)
runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```

在同一组件中将 `<script setup>` 与 `<script>` 结合使用的支持仅限于上述情况。具体来说：

- **不要**为已经可以用 `<script setup>` 定义的选项使用单独的 `<script>` 部分，如 `props` 和 `emits`。
- 在 `<script setup>` 中创建的变量不会作为属性添加到组件实例中，这使得它们无法从选项式 API 中访问。我们强烈反对以这种方式混合 API。

如果你发现自己处于以上任一不被支持的场景中，那么你应该考虑切换到一个显式的 [`setup()`](https://cn.vuejs.org/api/composition-api-setup.html) 函数，而不是使用 `<script setup>`。

#### 使用限制

- 由于模块执行语义的差异，`<script setup>` 中的代码依赖单文件组件的上下文。当将其移动到外部的 `.js` 或者 `.ts` 文件中的时候，对于开发者和工具来说都会感到混乱。因此，**`<script setup>`** 不能和 `src` attribute 一起使用。
- `<script setup>` 不支持 DOM 内根组件模板。

## 指令

内置的指令包含有[v-text](https://cn.vuejs.org/api/built-in-directives.html#v-text)、[v-html](https://cn.vuejs.org/api/built-in-directives.html#v-html)、[v-show](https://cn.vuejs.org/api/built-in-directives.html#v-show)、[v-if](https://cn.vuejs.org/api/built-in-directives.html#v-if)、[v-else](https://cn.vuejs.org/api/built-in-directives.html#v-else)、[v-else-if](https://cn.vuejs.org/api/built-in-directives.html#v-else-if)、[v-for](https://cn.vuejs.org/api/built-in-directives.html#v-for)、[v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)、[v-bind](https://cn.vuejs.org/api/built-in-directives.html#v-bind)、[v-model](https://cn.vuejs.org/api/built-in-directives.html#v-model)、[v-slot](https://cn.vuejs.org/api/built-in-directives.html#v-slot)、[v-pre](https://cn.vuejs.org/api/built-in-directives.html#v-pre)、[v-once](https://cn.vuejs.org/api/built-in-directives.html#v-once)、[v-memo](https://cn.vuejs.org/api/built-in-directives.html#v-memo)、[v-cloak](https://cn.vuejs.org/api/built-in-directives.html#v-cloak)。使用简单且常见的指令便不再过多赘述。

### [v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)

给元素绑定事件监听器。

- **缩写：**`@`

- **期望的绑定值类型：**`Function | Inline Statement | Object (不带参数)`

- **参数：**`event` (使用对象语法则为可选项)

- **修饰符**

  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 在捕获模式添加事件监听器。
  - `.self` - 只有事件从元素本身发出才触发处理函数。
  - `.{keyAlias}` - 只在某些按键下触发处理函数。
  - `.once` - 最多触发一次处理函数。
  - `.left` - 只在鼠标左键事件触发处理函数。
  - `.right` - 只在鼠标右键事件触发处理函数。
  - `.middle` - 只在鼠标中键事件触发处理函数。
  - `.passive` - 通过 `{ passive: true }` 附加一个 DOM 事件。

- **详细信息**

  事件类型由参数来指定。表达式可以是一个方法名，一个内联声明，如果有修饰符则可省略。

  当用于普通元素，只监听[**原生 DOM 事件**](https://developer.mozilla.org/en-US/docs/Web/Events)。当用于自定义元素组件，则监听子组件触发的**自定义事件**。

  当监听原生 DOM 事件时，方法接收原生事件作为唯一参数。如果使用内联声明，声明可以访问一个特殊的 `$event` 变量：`v-on:click="handle('ok', $event)"`。

  `v-on` 还支持绑定不带参数的事件/监听器对的对象。请注意，当使用对象语法时，不支持任何修饰符。

- **示例**

  ```vue
  <!-- 方法处理函数 -->
  <button v-on:click="doThis"></button>
  
  <!-- 动态事件 -->
  <button v-on:[event]="doThis"></button>
  
  <!-- 内联声明 -->
  <button v-on:click="doThat('hello', $event)"></button>
  
  <!-- 缩写 -->
  <button @click="doThis"></button>
  
  <!-- 使用缩写的动态事件 -->
  <button @[event]="doThis"></button>
  
  <!-- 停止传播 -->
  <button @click.stop="doThis"></button>
  
  <!-- 阻止默认事件 -->
  <button @click.prevent="doThis"></button>
  
  <!-- 不带表达式地阻止默认事件 -->
  <form @submit.prevent></form>
  
  <!-- 链式调用修饰符 -->
  <button @click.stop.prevent="doThis"></button>
  
  <!-- 按键用于 keyAlias 修饰符-->
  <input @keyup.enter="onEnter" />
  
  <!-- 点击事件将最多触发一次 -->
  <button v-on:click.once="doThis"></button>
  
  <!-- 对象语法 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  监听子组件的自定义事件 (当子组件的“my-event”事件被触发，处理函数将被调用)：

  ```vue
  <MyComponent @my-event="handleThis" />
  
  <!-- 内联声明 -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **参考**

  - [事件处理](https://cn.vuejs.org/guide/essentials/event-handling.html)
  - [组件 - 自定义事件](https://cn.vuejs.org/guide/essentials/component-basics.html#listening-to-events)

### [v-bind](https://cn.vuejs.org/api/built-in-directives.html#v-bind)

动态的绑定一个或多个 attribute，也可以是组件的 prop。

- **缩写：**

  - `:` 或者 `.` (当使用 `.prop` 修饰符)
  - 值可以省略 (当 attribute 和绑定的值同名时) 3.4+

- **期望：**`any (带参数) | Object (不带参数)`

- **参数：**`attrOrProp (可选的)`

- **修饰符**

  - `.camel` - 将短横线命名的 attribute 转变为驼峰式命名。
  - `.prop` - 强制绑定为 DOM property。3.2+
  - `.attr` - 强制绑定为 DOM attribute。3.2+

- **用途**

  当用于绑定 `class` 或 `style` attribute，`v-bind` 支持额外的值类型如数组或对象。详见下方的指南链接。

  在处理绑定时，Vue 默认会利用 `in` 操作符来检查该元素上是否定义了和绑定的 key 同名的 DOM property。如果存在同名的 property，则 Vue 会将它作为 DOM property 赋值，而不是作为 attribute 设置。这个行为在大多数情况都符合期望的绑定值类型，但是你也可以显式用 `.prop` 和 `.attr` 修饰符来强制绑定方式。有时这是必要的，特别是在和[自定义元素](https://cn.vuejs.org/guide/extras/web-components.html#passing-dom-properties)打交道时。

  当用于组件 props 绑定时，所绑定的 props 必须在子组件中已被正确声明。

  当不带参数使用时，可以用于绑定一个包含了多个 attribute 名称-绑定值对的对象。

- **示例**

  ```vue
  <!-- 绑定 attribute -->
  <img v-bind:src="imageSrc" />
  
  <!-- 动态 attribute 名 -->
  <button v-bind:[key]="value"></button>
  
  <!-- 缩写 -->
  <img :src="imageSrc" />
  
  <!-- 缩写形式的动态 attribute 名 (3.4+)，扩展为 :src="src" -->
  <img :src />
  
  <!-- 动态 attribute 名的缩写 -->
  <button :[key]="value"></button>
  
  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName" />
  
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>
  
  <!-- style 绑定 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>
  
  <!-- 绑定对象形式的 attribute -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  
  <!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
  <MyComponent :prop="someThing" />
  
  <!-- 传递子父组件共有的 prop -->
  <MyComponent v-bind="$props" />
  
  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  `.prop` 修饰符也有专门的缩写，`.`：

  ```vue
  <div :someProperty.prop="someObject"></div>
  <!-- 等同于 -->
  <div .someProperty="someObject"></div>
  ```

  当在 DOM 内模板使用 `.camel` 修饰符，可以驼峰化 `v-bind` attribute 的名称，例如 SVG `viewBox`attribute：

  ```vue
  <svg :view-box.camel="viewBox"></svg>
  ```

  如果使用字符串模板或使用构建步骤预编译模板，则不需要 `.camel`。

- **参考**

  - [Class 与 Style 绑定](https://cn.vuejs.org/guide/essentials/class-and-style.html)
  - [组件 - Prop 传递细节](https://cn.vuejs.org/guide/components/props.html#prop-passing-details)

### [v-model](https://cn.vuejs.org/api/built-in-directives.html#v-model)

在表单输入元素或组件上创建双向绑定。

- **期望的绑定值类型**：根据表单输入元素或组件输出的值而变化
- **仅限：**
  - `<input>`
  - `<select>`
  - `<textarea>`
  - components
- **修饰符**
  - [`.lazy`](https://cn.vuejs.org/guide/essentials/forms.html#lazy) - 监听 `change` 事件而不是 `input`
  - [`.number`](https://cn.vuejs.org/guide/essentials/forms.html#number) - 将输入的合法字符串转为数字
  - [`.trim`](https://cn.vuejs.org/guide/essentials/forms.html#trim) - 移除输入内容两端空格
- **参考**
  - [表单输入绑定](https://cn.vuejs.org/guide/essentials/forms.html)
  - [组件事件 - 配合 `v-model` 使用](https://cn.vuejs.org/guide/components/v-model.html)

### [v-slot](https://cn.vuejs.org/api/built-in-directives.html#v-slot)

用于声明具名插槽或是期望接收 props 的作用域插槽。

- **缩写：**`#`

- **期望的绑定值类型**：能够合法在函数参数位置使用的 JavaScript 表达式。支持解构语法。绑定值是可选的——只有在给作用域插槽传递 props 才需要。

- **参数**：插槽名 (可选，默认是 `default`)

- **仅限：**

  - `<template>`
  - [components](https://cn.vuejs.org/guide/components/slots.html#scoped-slots) (用于带有 prop 的单个默认插槽)

- **示例**

  ```vue
  <!-- 具名插槽 -->
  <BaseLayout>
    <template v-slot:header>
      Header content
    </template>
  
    <template v-slot:default>
      Default slot content
    </template>
  
    <template v-slot:footer>
      Footer content
    </template>
  </BaseLayout>
  
  <!-- 接收 prop 的具名插槽 -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>
  
  <!-- 接收 prop 的默认插槽，并解构 -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **参考**

  - [组件 - 插槽](https://cn.vuejs.org/guide/components/slots.html)

### [v-pre](https://cn.vuejs.org/api/built-in-directives.html#v-pre)

跳过该元素及其所有子元素的编译。

- **无需传入**

- **详细信息**

  元素内具有 `v-pre`，所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容。

- **示例**

  ```vue
  <span v-pre>{{ this will not be compiled }}</span>
  ```

### [v-once](https://cn.vuejs.org/api/built-in-directives.html#v-once)

仅渲染元素和组件一次，并跳过之后的更新。

- **无需传入**

- **详细信息**

  在随后的重新渲染，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化更新时的性能。

  ```vue
  <!-- 单个元素 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 带有子元素的元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 组件 -->
  <MyComponent v-once :comment="msg" />
  <!-- `v-for` 指令 -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  从 3.2 起，你也可以搭配 [`v-memo`](https://cn.vuejs.org/api/built-in-directives.html#v-memo) 的无效条件来缓存部分模板。

- **参考**

  - [数据绑定语法 - 插值](https://cn.vuejs.org/guide/essentials/template-syntax.html#text-interpolation)
  - [v-memo](https://cn.vuejs.org/api/built-in-directives.html#v-memo)

###  [v-memo](https://cn.vuejs.org/api/built-in-directives.html#v-memo)

- **期望的绑定值类型：**`any[]`

- **详细信息**

  缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

```vue
<div v-memo="[valueA, valueB]">
...
</div>
```

  当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<div>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 DOM 的 vnode 创建也将被跳过，因为缓存的子树副本可以被重新使用。

  正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

  **与 `v-for` 一起使用**

  `v-memo` 仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)：

```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

  当组件的 `selected` 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的。`v-memo` 用在这里本质上是在说“只有当该项的被选中状态改变时才需要更新”。这使得每个选中状态没有变的项能完全重用之前的 vnode 并跳过差异比较。注意这里 memo 依赖数组中并不需要包含 `item.id`，因为 Vue 也会根据 item 的 `:key` 进行判断。

  **警告**

  当搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。**`v-memo` 不能用在 `v-for` 内部。**

  `v-memo` 也能被用于在一些默认优化失败的边际情况下，手动避免子组件出现不需要的更新。但是一样的，开发者需要负责指定正确的依赖数组以免跳过必要的更新。

- **参考**
- [v-once](https://cn.vuejs.org/api/built-in-directives.html#v-once)

### [v-cloak](https://cn.vuejs.org/api/built-in-directives.html#v-cloak)

用于隐藏尚未完成编译的 DOM 模板。

- **无需传入**

- **详细信息**

  **该指令只在没有构建步骤的环境下需要使用。**

  当使用直接在 DOM 中书写的模板时，可能会出现一种叫做“未编译模板闪现”的情况：用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容。

  `v-cloak` 会保留在所绑定的元素上，直到相关组件实例被挂载后才移除。配合像 `[v-cloak] { display: none }` 这样的 CSS 规则，它可以在组件编译完毕前隐藏原始模板。

- **示例**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue
  <div v-cloak>
    {{ message }}
  </div>
  ```

  直到编译完成前，`<div>` 将不可见。