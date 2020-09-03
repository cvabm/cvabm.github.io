module.exports = {
  base: '',
  title: '首页',
  description: '笔记',
  plugins: ['@vuepress/back-to-top'],
  themeConfig: {
  
    searchMaxSuggestions: 10,
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/cvabm/cvabm.github.io',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '导航', items: [
          { text: '日常工具', link: '/usefull/tool_guide/' },
          { text: '开发工具', link: '/usefull/develop/' },
          { text: '手机app', link: '/usefull/app/' },
          { text: 'API文档教程', link: '/usefull/learn/' },
          { text: '面试相关', link: '/usefull/interview/' },
          { text: '资源下载', link: '/usefull/datadownload/' },
          { text: '日常向', link: '/usefull/daily/' },
          { text: '娱乐向', link: '/usefull/play/' },
          { text: 'web前端', link: '/usefull/web' },
          { text: 'mac', link: '/usefull/mac' }     
        ]
      },
      {
        text: 'Java', items: [
          { text: '基础', link: '/java/basic/' },
          { text: '在线运行', link: '/java/online/' },
          { text: '后端服务器', link: '/java/bgserver/' },
          { text: '框架', link: '/java/java_pattern/' },
          { text: '知识总结', link: '/java/java_summary/' },
          { text: 'c++', link: '/java/c' }
        ]
      },
      {
        text: 'Android',
        items: [
          { text: '基础', link: '/android/basic/' },
          { text: '控件和动画', link: '/android/anim/' },
          { text: '框架', link: '/android/githubtool/' },
          { text: '工具类', link: '/android/utils/' },
          { text: '第三方服务', link: '/android/payservice/' },
          { text: '音视频媒体', link: '/android/media/' },
          { text: '数据存储', link: '/android/datasave/' },
          { text: '多线程', link: '/android/thread/' },
          { text: '设计模式', link: '/android/architectural_pattern/' },
          { text: 'JNI-NDK', link: '/android/ndk/' },
          { text: '常见问题', link: '/android/question' },
        ]
      },
      {
        text: 'RN/JS',items:[
          {text:'基础',link: '/react/basic/'},
          {text:'界面',link: '/react/view/'},
          {text:'网络',link: '/react/net/'},
          {text:'功能性',link: '/react/function/'},
          {text:'常见问题',link: '/react/error'},
          {text:'音视频媒体',link: '/react/media/'},
          {text:'JS',link: '/android/h5'}
        ]
      },
      { text: 'Linux', link: '/linux/' },
      { text: 'Kotlin', link: '/kotlin/' },
      { text: '微信小程序', link: '/weixin/' },
    ],
    sidebar:
    {
      '/android/basic/': [
        '',
        'activity/activity',
        'activity/fragment',
        'activity/handler',
        'service/service',
        'BroadcastReceiver/BroadcastReceiver',
        'build/build',
        'build/encrpy',
        'build/fit',
        'build/function',
      ],
      '/android/anim/': [
        '',
        'widget',
        'listview',
        'recyclerview',
        'selector',
        'webview',
      ],
      '/android/githubtool/': [
        '',
        'ui',
        'database',
        'net',
        'assist',
        'goodhelper',
        'media',
        'hardware',
      ],
      '/android/payservice/': [
        '',
      ],
      '/android/media/': [
        '',
        'ffmpeg',
        'ffmpeg-command',
      ],
      '/android/datasave/': [
        '',
      ],
      '/android/architectural_pattern/': [
        '',
        'design_pattern',
        'aop',
      ],
      '/android/thread/': [
        '',
      ],
      '/usefull/tool_guide/': [
        '',
        'pan',
        'imagebed',
        'filetool',
        'imagetool',
        'mediatool',
        'networktool',
        'colortool',
        'downloadtool',
        'remotetool',
        'windowstool',
        'chrometool',
        'websitetool',
      ],
      '/usefull/develop/': [
        '',
        'developtool',
        'studio',
        'markdown',
        'git',
      ],
      '/usefull/datadownload/': [
        '',
      ],
      '/usefull/app/': [
        '',
      ],
      '/usefull/learn/': [
        '',
        'teach',
      ],
      '/usefull/daily/': [
        '',
        'daily_first',
        'windows',
      ],
      '/usefull/play/': [
        '',
      ],
      '/usefull/interview/': [
        '',
      ],
      '/android/utils/': [
        '',
        'getdeviceinfo',
        'xmlutils',
        'screen',
        'fileutils',
        'network',
      ],
      '/react/function/':[
        '',
       'tv',
      ],
      '/react/view/': [
        '',
        'screen',
        'flatlist',
        'react-navigation'
      ],
      '/react/basic/': [
        '',
        'communication',
      ],
      '/react/media/':[
        '',
        'janus',
        'video-format',
        'media-base',
      ],
      '/linux/':[
        '',
      ],
      '/kotlin/':[
        '',
      ],
      '/weixin/':[
        '',
        'small',
      ],
      '/java/basic/':[
        '',
        'java_base',
        'different',
        'build',
        'java_myself',
        'java_net',
      ],
      '/java/online/':[
        '',
      ],
      '/java/bgserver/':[
        '',
      ],
      '/java/java_pattern/':[
        '',
      ],
      '/java/java_summary/':[
        '',
      ],
    },
    collapsable: false,
    sidebarDepth: 0,
    lastUpdated: 'Last Updated',
    displayAllHeaders: false // 默认值：false
  }
}