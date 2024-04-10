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