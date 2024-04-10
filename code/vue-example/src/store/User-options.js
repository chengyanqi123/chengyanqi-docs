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