<template>
    <div>
        <h1>05. watchEffect</h1>
        <table>
            <tr>
                <td>BMI指数</td>
                <td>结果</td>
            </tr>
            <tr>
                <td>BMI ＜ 18.5</td>
                <td>体重过轻</td>
            </tr>
            <tr>
                <td>18.5 ≦ BMI ＜ 24</td>
                <td>正常</td>
            </tr>
            <tr>
                <td>24≦BMI＜27</td>
                <td>过重</td>
            </tr>
            <tr>
                <td>27≦BMI＜30</td>
                <td>轻度肥胖</td>
            </tr>
            <tr>
                <td>30≦BMI＜35</td>
                <td>中度肥胖</td>
            </tr>
            <tr>
                <td>BMI≧35</td>
                <td>重度肥胖</td>
            </tr>
        </table>

        <div>
            身高：<input type="number" v-model="data.height" placeholder="请输入身高">CM
        </div>
        <div>
            体重：<input type="number" v-model="data.weight" placeholder="请输入体中">Kg
        </div>
        <div>BMI指数为: {{ result.bmi }}, 您的身材：{{ result.text }}</div>
    </div>
</template>

<script setup name="watchEffectE">
import { reactive, watch, watchEffect } from 'vue';
console.log('↓↓↓↓↓↓↓↓↓↓↓ 05. watchEffectE ↓↓↓↓↓↓↓↓↓↓↓');

// BMI指数	结果
// BMI ＜ 18.5	体中过轻
// 8.5 ≦ BMI ＜ 24	正常
// 24≦BMI＜27	过重
// 27≦BMI＜30	轻度肥胖
// 30≦BMI＜35	中度肥胖
// BMI≧35	重度肥胖
const data = reactive({
    height: 200,
    weight: 90,
})
const result = reactive({
    bmi: 0,
    text: ''
})

// 使用watchEffect，立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
// 无需制定监听内容，自动分析。
// 默认immediate: true。
// 但是无法获取到旧的值(oldValue)。
watchEffect(() => {
    result.bmi = (data.weight / (data.height / 100) ** 2).toFixed(2);
    if (result.bmi < 18.5) {
        result.text = '苗条'
    } else if (result.bmi < 24) {
        result.text = '正常'
    } else if (result.bmi < 27) {
        result.text = '过重'
    } else if (result.bmi < 30) {
        result.text = '轻度肥胖'
    } else if (result.bmi < 35) {
        result.text = '中度肥胖'
    } else if (result.bmi >= 35) {
        result.text = '重度肥胖'
    }
})

// watch([() => data.height, () => data.weight], () => {
//     result.bmi = (data.weight / (data.height / 100) ** 2).toFixed(2);
//     if (result.bmi < 18.5) {
//         result.text = '苗条'
//     } else if (result.bmi < 24) {
//         result.text = '正常'
//     } else if (result.bmi < 27) {
//         result.text = '过重'
//     } else if (result.bmi < 30) {
//         result.text = '轻度肥胖'
//     } else if (result.bmi < 35) {
//         result.text = '中度肥胖'
//     } else if (result.bmi >= 35) {
//         result.text = '重度肥胖'
//     }
// }, {
//     immediate: true
// })

</script>

<style scoped lang='scss'>
td {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: 2px 4px;
}

table {
    border-collapse: collapse;
}

div {
    margin: 6px 0;
}
</style>