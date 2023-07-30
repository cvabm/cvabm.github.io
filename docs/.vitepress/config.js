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
            appId:'1ACA58L96W',
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
            text: '上架应用商店',
            collapsible: true,
            items: [
                { text: '小米', link: '/android/app_store/xiaomi' }
            ]
        },
        {
            text: '设计模式',
            collapsible: true,
            items: [
                { text: '插桩', link: '/android/design/aop' },
                { text: '设计模式', link: '/android/design/design_pattern' },
                { text: 'mvp架构', link: '/android/design/mvp' }
            ]
        },
        {
            text: '音视频',
            collapsible: true,
            items: [
                { text: 'ffmpeg', link: '/android/media/ffmpeg' },
                { text: '音视频', link: '/android/media/media' }
            ]
        }, {
            text: '开源项目',
            collapsible: true,
            items: [
                { text: 'rustdesk', link: '/android/open_project/rustdesk' }
            ]
        }, {
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
        }, {
            text: '推送',
            collapsible: true,
            items: [
                { text: '华为推送', link: '/android/push/huawei' }
            ]
        }, {
            text: '存储',
            collapsible: true,
            items: [
                { text: 'minio', link: '/android/storage/minio' }
            ]
        }, {
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
                { text: 'windows', link: '/guide/daily/windows' },
            ]
        },
        {
            text: '开发工具',
            collapsible: true,
            items: [
                { text: 'git', link: '/guide/develop/git' },
                { text: 'markdown', link: '/guide/develop/markdown' },
                { text: 'studio', link: '/guide/develop/studio' },
                { text: 'vscode', link: '/guide/develop/vscode' },
                { text: 'developtool', link: '/guide/develop/developtool' },
                { text: 'jsdoc', link: '/guide/develop/jsdoc' },
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
                { text: 'app相关', link: '/guide/ofen/app' },
                { text: 'CHROME插件', link: '/guide/ofen/chrometool' },
                { text: '常用下载资源', link: '/guide/ofen/datadownload' },
                { text: '文件处理', link: '/guide/ofen/filetool' },
                { text: '图形图像', link: '/guide/ofen/imagetool' },
                { text: '面试', link: '/guide/ofen/interview' },
                { text: 'mac', link: '/guide/ofen/mac' },


                { text: '媒体工具', link: '/guide/ofen/mediatool' },
                { text: '网络工具', link: '/guide/ofen/networktool' },
                { text: '网盘空间', link: '/guide/ofen/pan' },
                { text: '娱乐', link: '/guide/ofen/play' },
                { text: '网页工具', link: '/guide/ofen/websitetool' },
                { text: 'WIN工具', link: '/guide/ofen/windowstool' }
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
                { text: 'kotlin', link: '/other/kotlin' },
                { text: 'linux', link: '/other/linux' },
                { text: 'rust', link: '/other/rust' },
                { text: 'server', link: '/other/server' },
                { text: 'typecho', link: '/other/typecho' },
                { text: 'weixin', link: '/other/weixin' },
                { text: 'shell', link: '/other/shell' }
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
                { text: '网络', link: '/react/net' },
                { text: '功能性', link: '/react/function' },
                { text: '常见问题', link: '/react/ask' },
                { text: 'JS', link: '/react/js' },
                { text: '常用三方库', link: '/react/plugin' },
                { text: 'hermes', link: '/react/hermes' },
            ]
        },
        {
            text: '界面',
            collapsible: true,
            items: [
                { text: 'flatlist', link: '/react/view/flatlist' },
                { text: 'navigation', link: '/react/view/navigation' },
                { text: 'view', link: '/react/view/view' }
            ]
        },
        {
            text: '音视频',
            collapsible: true,
            items: [
                { text: 'janus', link: '/react/media/janus' },
                { text: 'media_base', link: '/react/media/media_base' },
                { text: 'webrtc', link: '/react/media/webrtc' },
                { text: 'format', link: '/react/media/format' },
                { text: 'net', link: '/react/media/net' }
            ]
        },
    ]
}