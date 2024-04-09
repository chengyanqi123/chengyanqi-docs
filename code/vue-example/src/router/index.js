import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import NotFound from '@/components/404.vue'

const router = createRouter({
    history: createWebHistory('./'),
    routes: [
        {
            path: '/reactive-core',
            component: () => import('@/pages/响应式核心/index.vue'),
        },
        {
            path: '/life-cycle',
            component: () => import('@/pages/生命周期/index.vue'),
        },
        {
            path: '/component-com',
            component: () => import('@/pages/组件通讯/index.vue'),
        },
        {
            path: '/router',
            component: () => import('@/pages/路由/index.vue'),
            meta: { transition: 'slide-left' },
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
})

export default router
