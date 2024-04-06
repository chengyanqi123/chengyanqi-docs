import { defineConfig } from 'vitepress'
import nav from './config/nav'
import sidebar from './config/sidebar'
import themeConfigLocalText from './config/themeConfigLocalText'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: "大前端文档",
  description: "清晰详尽且易于理解的大前端文档库",
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/docs/favicon.ico' }]],
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    ...themeConfigLocalText,
    i18nRouting: false,
    logo: '/images/cyq-logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chengyanqi123' },
      {
        icon: {
          svg: '<svg t="1711988942235" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4398" width="256" height="256"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4399"></path></svg>'
        },
        link: 'https://gitee.com/chengyanqi123',
      }
    ],
    nav,
    sidebar,
    footer: {
      // message: '创作不易 · 未经允许 · 禁止转载',
      message: '开源共享 · 合作共创 · 引用分享请注明出处',
      copyright: 'Copyright © 2024-present Chengyanqi'
    },
  }
})
