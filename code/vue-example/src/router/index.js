import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import NotFound from '@/components/404.vue'

const router = createRouter({
    history: createWebHistory('./'),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/index.vue'),
        },
        {
            path: '/reactive-core',
            component: () => import('@/pages/响应式核心/index.vue'),
        },
        {
            path: '/life-cycle',
            component: () => import('@/pages/生命周期/index.vue'),
        },
        {
            path: '/router',
            component: () => import('@/pages/路由/index.vue'),
        },
        {
            path: '/pinia',
            component: () => import('@/pages/pinia/index.vue'),
        },
        {
            path: '/component',
            component: () => import('@/pages/组件/index.vue'),
            children: [
                {
                    path: '组件通讯/',
                    component: () => import('@/pages/组件/组件通讯/index.vue'),
                    children: [
                        {
                            path: 'props/',
                            component: () => import('@/pages/组件/组件通讯/props/father.vue'),
                        },
                        {
                            path: 'emit/',
                            component: () => import('@/pages/组件/组件通讯/emit/father.vue'),
                        },
                        {
                            path: '发布订阅/',
                            component: () => import('@/pages/组件/组件通讯/发布订阅/father.vue'),
                        },
                        {
                            path: '依赖注入/',
                            component: () => import('@/pages/组件/组件通讯/依赖注入/father.vue'),
                        },
                        {
                            path: 'v-model/',
                            component: () => import('@/pages/组件/组件通讯/v-model/father.vue'),
                        },
                        {
                            path: '$attrs/',
                            component: () => import('@/pages/组件/组件通讯/$attrs/father.vue'),
                        },
                        {
                            path: '$refs和$parent/',
                            component: () => import('@/pages/组件/组件通讯/$refs和$parent/father.vue'),
                        },
                    ],
                },
            ],
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
})

export default router
