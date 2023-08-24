export default {
    text: 'cvabm',
    description: 'Just playing around.',
    lang: 'en-US',

    lastUpdated: true,
    cleanUrls: 'without-subfolders',

    head: [['meta', { name: 'theme-color', content: '#3c8772' }]],

    markdown: {
        headers: {
            level: [0, 0]
        },
        linkify: false
    },

    themeConfig: {
        nav: nav(),
        sidebar: {
            '/android/': sidebarAndroid(),
            '/guide/': sidebarGuide(),
            '/java/': sidebarJava(),
            '/other/': sidebarOther(),
            '/react/': sidebarReact()
        },
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/',
            text: 'Edit this page on GitHub'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        },

        algolia: {
            appId: '1ACA58L96W',
            apiKey: '96a09aa53b332e95474e4924bdbba67a',
            indexName: 'cvabm'
        },

        carbonAds: {
            code: 'CEBDT27Y',
            placement: 'vuejsorg'
        }
    }
}

function nav() {
    return [
        { text: 'Android', link: '/android/base/first', activeMatch: '/android/' },
        { text: 'Guide', link: '/guide/daily/first', activeMatch: '/guide/' },
        { text: 'Java', link: '/java/java_basic', activeMatch: '/java/' },
        { text: 'React', link: '/react/base', activeMatch: '/react/' },
        { text: 'Other', link: '/other/docker', activeMatch: '/other/' },
        {
            text: '版本号1.0.0',
            items: [
                {
                    text: 'Changelog',
                    link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
                },
                {
                    text: 'Contributing',
                    link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
                }
            ]
        }
    ]
}

function sidebarAndroid() {
    return [
        {
            text: '基础',
            collapsible: true,
            items: [
                { text: '基础', link: '/android/first' },
                { text: 'activity', link: '/android/base/activity' },
                { text: 'broadcast', link: '/android/base/broadcast' },
                { text: '编译', link: '/android/base/build' },
                { text: '存储', link: '/android/base/data_store' },
                { text: '适配', link: '/android/base/fit' },
                { text: 'fragment', link: '/android/base/fragment' },
                { text: '功能点', link: '/android/base/function' },
                { text: 'handler', link: '/android/base/handler' },
                { text: 'jni', link: '/android/base/jni' },
                { text: '支付', link: '/android/base/pay_service' },
                { text: '常见问题', link: '/android/base/question' },
                { text: 'service', link: '/android/base/service' },
                { text: '线程', link: '/android/base/thread' }
            ]
        },
         {
            text: '轮子',
            collapsible: true,
            items: [
                { text: '硬件', link: '/android/plugin/hardware' },
                { text: '图片', link: '/android/plugin/image' },
                { text: 'log日志', link: '/android/plugin/log' },
                { text: '音视频', link: '/android/plugin/media' },
                { text: '必备', link: '/android/plugin/must' },
                { text: '网络', link: '/android/plugin/net' },
                { text: '常用', link: '/android/plugin/ofen' },
                { text: 'UI界面', link: '/android/plugin/ui' }
            ]
        },
         {
            text: 'UI界面',
            collapsible: true,
            items: [
                { text: '动画', link: '/android/ui/anim' },
                { text: 'listview', link: '/android/ui/listview' },
                { text: 'recyclerview', link: '/android/ui/recyclerview' },
                { text: '高刷', link: '/android/ui/refresh' },
                { text: 'selector', link: '/android/ui/selector' },
                { text: 'view', link: '/android/ui/view' },
                { text: 'webview', link: '/android/ui/webview' },
                { text: 'widget', link: '/android/ui/widget' }
            ]
        }, {
            text: '工具类',
            collapsible: true,
            items: [
                { text: 'gps定位', link: '/android/utils/gps' },
                { text: '网络', link: '/android/utils/network' },
                { text: '其他', link: '/android/utils/other' },
                { text: '屏幕类', link: '/android/utils/screen' }
            ]
        }
    ]
}

function sidebarGuide() {
    return [
        {
            text: '日常向',
            collapsible: true,
            items: [
                { text: '日常', link: '/guide/daily/first' },
            ]
        },
        {
            text: '开发工具',
            collapsible: true,
            items: [
                { text: 'git', link: '/guide/develop/git' },
                { text: 'studio', link: '/guide/develop/studio' },
                { text: 'vscode', link: '/guide/develop/vscode' },
                { text: 'developtool', link: '/guide/develop/developtool' },
            ]
        },
        {
            text: 'API文档教程',
            collapsible: true,
            items: [
                { text: 'vuepress', link: '/guide/doc/vuepress' },
                { text: '资料API等检索', link: '/guide/doc/api' },
            ]
        },
        {
            text: '日常工具',
            collapsible: true,
            items: [
                { text: 'aaa', link: '/guide/ofen/aaa' },
            ]
        },
    ]
}


function sidebarJava() {
    return [
        {
            text: 'Java',
            collapsible: true,
            items: [
                { text: 'JAVA基础', link: '/java/java_basic' },
                { text: '博客收藏', link: '/java/java_blog' },
                { text: '常用代码', link: '/java/java_code' },
                { text: '反编译', link: '/java/java_decompile' },
                { text: 'x和y区别', link: '/java/java_diff' },
                { text: '自我总结', link: '/java/java_myself' },
                { text: '网络相关', link: '/java/java_net' },
                { text: '在线工具', link: '/java/java_online' },
                { text: '插件/框架', link: '/java/java_plugin' },
                { text: '后台服务', link: '/java/java_server' }
            ]
        },
        {
            text: 'C语言',
            collapsible: true,
            items: [
                { text: 'c', link: '/java/c' },
            ]
        }
    ]
}
function sidebarOther() {
    return [
        {
            text: '其他',
            collapsible: true,
            items: [
                { text: 'docker', link: '/other/docker' },
                { text: 'linux', link: '/other/linux' },
                { text: 'server', link: '/other/server' },
                { text: 'typecho', link: '/other/typecho' },
                { text: 'weixin', link: '/other/weixin' },
            ]
        },

    ]
}
function sidebarReact() {
    return [
        {
            text: '基础',
            collapsible: true,
            items: [
                { text: '基础', link: '/react/base' },
                { text: '常见问题', link: '/react/ask' },
                { text: '常用三方库', link: '/react/plugin' },
            ]
        },
        {
            text: '音视频',
            collapsible: true,
            items: [
                { text: 'webrtc', link: '/react/media/webrtc' },
            ]
        },
    ]
}