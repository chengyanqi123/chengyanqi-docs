export default {
    '/语言基础/': {
        text: '语言基础',
        items: [
            {
                text: 'HTML',
                link: '/语言基础/HTML',
            },
            {
                text: 'CSS',
                link: '/语言基础/CSS',
            },
            {
                text: 'JavaScript',
                link: '/语言基础/JavaScript',
            },
            {
                text: 'Nodejs',
                link: '/语言基础/Nodejs',
            },
            {
                text: 'TypeScript',
                link: '/语言基础/TypeScript',
            },
        ],
    },
    '/微信小程序/': {
        text: '微信小程序',
        items: [
            {
                text: '基础',
                // link: '/微信小程序/小程序基础/01-小程序基础',
                items: [
                    { text: '开始', link: '/微信小程序/小程序基础/01-小程序基础.md' },
                    { text: '配置文件', link: '/微信小程序/小程序基础/02-小程序配置文件.md' },
                    { text: '样式与组件', link: '/微信小程序/小程序基础/03-小程序样式与组件.md' },
                    { text: '事件系统', link: '/微信小程序/小程序基础/04-小程序事件系统.md' },
                    { text: '模板语法', link: '/微信小程序/小程序基础/05-小程序模板语法.md' },
                    { text: '生命周期', link: '/微信小程序/小程序基础/06-小程序生命周期.md' },
                    { text: '原生 API', link: '/微信小程序/小程序基础/07-小程序原生 API.md' },
                    { text: '自定义组件', link: '/微信小程序/小程序基础/08-小程序自定义组件.md' },
                    { text: 'npm 使用', link: '/微信小程序/小程序基础/09-小程序 npm 使用.md' },
                    { text: '分包加载', link: '/微信小程序/小程序基础/10-小程序分包加载.md' },
                    { text: '开放能力', link: '/微信小程序/小程序基础/11-小程序开放能力.md' },
                    { text: '补充与拓展', link: '/微信小程序/小程序基础/12-小程序补充与拓展.md' },
                    { text: '上线发布', link: '/微信小程序/小程序基础/13-上线发布.md' },
                ],
            },
            {
                text: '项目实战',
                link: '/微信小程序/慕尚花坊项目',
                items: [
                    { text: '项目介绍', link: '/微信小程序/慕尚花坊项目/01-项目介绍.md' },
                    { text: '申请开发权限', link: '/微信小程序/慕尚花坊项目/02-申请开发权限.md' },
                    { text: '项目初始化', link: '/微信小程序/慕尚花坊项目/03-项目初始化.md' },
                    { text: '通用模块封装', link: '/微信小程序/慕尚花坊项目/04-通用模块封装.md' },
                    { text: '网络请求封装', link: '/微信小程序/慕尚花坊项目/05-网络请求封装.md' },
                    { text: '项目首页', link: '/微信小程序/慕尚花坊项目/06-项目首页.md' },
                    { text: '商品分类', link: '/微信小程序/慕尚花坊项目/07-商品分类.md' },
                    { text: '框架扩展', link: '/微信小程序/慕尚花坊项目/08-框架扩展.md' },
                    { text: '用户管理', link: '/微信小程序/慕尚花坊项目/09-用户管理.md' },
                    { text: '地址管理', link: '/微信小程序/慕尚花坊项目/10-地址管理.md' },
                    { text: '商品管理', link: '/微信小程序/慕尚花坊项目/11-商品管理.md' },
                    { text: '购物车', link: '/微信小程序/慕尚花坊项目/12-购物车.md' },
                    { text: '结算支付', link: '/微信小程序/慕尚花坊项目/13-结算支付.md' },
                    { text: '订单列表', link: '/微信小程序/慕尚花坊项目/14-订单列表.md' },
                    { text: '代码优化', link: '/微信小程序/慕尚花坊项目/15-代码优化.md' },
                ],
            },
        ],
    },
    '/工程化/': {
        text: '工程化',
        items: [
            {
                text: '打包工具',
                items: [
                    { text: 'webpack', link: '/工程化/打包工具/webpack.md' },
                    { text: 'rollup', link: '/工程化/打包工具/rollup.md' },
                    { text: 'vite', link: '/工程化/打包工具/vite.md' },
                ],
            },
            {
                text: '包管理器',
                items: [
                    { text: 'npm', link: '/工程化/包管理器/npm.md' },
                    { text: 'pnpm', link: '/工程化/包管理器/pnpm.md' },
                    { text: 'yarn', link: '/工程化/包管理器/yarn.md' },
                ],
            },
        ],
    },
    '/进阶后端': {
        text: '进阶后端',
        items: [
            {
                text: 'Nginx',
                link: '/进阶后端/Nginx',
            },
            {
                text: 'Mysql',
                link: '/进阶后端/Mysql',
            },
            {
                text: 'Redis',
                link: '/进阶后端/Redis',
            },
        ],
    },
    '/框架/': {
        text: '框架',
        items: [
            {
                text: 'Vue',
                // link: '/框架/Vue',
                items: [
                    {
                        text: '基础入门',
                        // link: '/框架/Vue/基础入门',
                        items: [
                            {
                                text: '响应式',
                                link: '/框架/Vue/基础入门/响应式',
                            },
                            {
                                text: '生命周期',
                                link: '/框架/Vue/基础入门/生命周期',
                            },
                            {
                                text: '内置属性',
                                link: '/框架/Vue/基础入门/内置属性',
                            },
                            {
                                text: '指令',
                                link: '/框架/Vue/基础入门/指令',
                            },
                            {
                                text: '组件',
                                link: '/框架/Vue/基础入门/组件',
                            },
                        ],
                    },
                    {
                        text: '深入原理',
                        link: '/框架/Vue/深入原理',
                    },
                    {
                        text: 'Vue生态',
                        items: [
                            {
                                text: 'vue-router',
                                link: '/常用库及工具/vue-router',
                                target: '_blank',
                            },
                            {
                                text: 'pinia',
                                link: '/常用库及工具/pinia',
                                target: '_blank',
                            },
                        ],
                    },
                ],
            },
            {
                text: 'Electron',
                link: '/框架/Electron',
            },
        ],
    },
    '/面试题/': {
        text: '面试题',
        items: [
            {
                text: 'CSS面试题',
                link: '/面试题/CSS面试题',
            },
            {
                text: 'HTML面试题',
                link: '/面试题/HTML面试题',
            },
            {
                text: 'Vue面试题',
                link: '/面试题/Vue面试题',
            },
            {
                text: 'JavaScript面试题',
                link: '/面试题/JavaScript面试题',
            },
            {
                text: 'webpack面试题',
                link: '/面试题/webpack面试题',
            },
        ],
    },
    '/常用库及工具/': {
        text: '常用库及工具',
        // link: '/常用库及工具',
        items: [
            {
                text: '通用',
                items: [
                    {
                        text: 'dayjs',
                        link: 'https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md',
                    },
                ],
            },
            {
                text: '前端',
                items: [
                    {
                        text: 'vue-router',
                        link: '/常用库及工具/vue-router',
                    },
                    {
                        text: 'pinia',
                        link: '/常用库及工具/pinia',
                    },
                    {
                        text: 'element-plus',
                        link: 'https://element-plus.org/zh-CN/guide/installation.html',
                    },
                ],
            },
            {
                text: 'Nodejs',
                items: [],
            },
            {
                text: 'cli',
                items: [],
            },
        ],
    },
}
