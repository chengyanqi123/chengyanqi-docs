// 搜索
const search = {
    provider: 'local',
    options: {
        translations: {
            button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
            },
            modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询结果",
                footer: {
                    selectText: "选择",
                    navigateText: "切换",
                    closeText: "关闭",
                },
            },
        },
    }
}
// 导航
const outline = {
    level: "deep", // 右侧大纲标题层级
    label: "本页导航", // 右侧大纲标题文本配置
}
const lastUpdatedText = '上次更新'
const sidebarMenuLabel = '导航目录'
const returnToTopLabel = '返回顶部'
// 主题切换文字
const darkModeSwitchLabel = '明亮/暗黑模式'
const docFooter = {
    prev: '上一页',
    next: '下一页'
}
// 文章更新
const lastUpdated = {
    text: '更新于',
    format: 'YYYY-MM-DD HH:mm:ss',
    formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
    }
}

export default {
    search,
    outline,
    lastUpdatedText,
    sidebarMenuLabel,
    returnToTopLabel,
    darkModeSwitchLabel,
    docFooter,
    lastUpdated,
}
