# 资料 API 等检索

[[toc]]
## process.env设置
windows - cmd - set RN_WEBRTC_SKIP_DOWNLOAD=1  

## node.js 深入讲解

清除缓存  
npm cache verify

<https://yjhjstz.gitbooks.io/deep-into-node/>

### code search 代码搜索

<https://grep.app/>  
<https://codesearch.aixcoder.com/#/>  
<https://www.tabnine.com/code>  
<https://searchcode.com/>  
<https://cs.android.com/>

## api 查询

API 教程大全<https://devdocs.io/>  
库使用文档<https://js.coach/>  
<https://devhints.io/>

## 教程网站

<https://wangdoc.com>
trilium
java<http://www.jishuchi.com/read/java-interview/3346>  
菜鸟教程<https://m.runoob.com/>

廖雪峰<https://www.liaoxuefeng.com/>  
黑马程序员视频<http://yun.itheima.com/index/index.html>

## 开发规范

Android<https://github.com/Blankj/AndroidStandardDevelop>

### 开源许可协议区别

![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/843CBACC-9D58-4EA7-8CDB-6AC09B9BA30A_4_5005_c.jpeg)

## 数据结构

各类数据结构特点<https://blog.csdn.net/xiaolang85/article/details/10214981>  
二叉树的几种遍历方法 <http://blog.csdn.net/pony_maggie/article/details/38390513>

## Python

简明<https://bop.mol.uno/>  
<https://github.com/jackfrued/Python-Core-50-Courses>  
## 架设博客平台教程

hexo  
<https://hexo.io/zh-cn/>  
<https://www.zhihu.com/question/21193762>  
<https://www.jianshu.com/p/1c888a6b8297?utm_source=oschina-app>  
vuepress  
<https://segmentfault.com/a/1190000015237352?utm_source=tag-newest>  
<https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE>  
github pages 教程  
<https://www.cnblogs.com/jackyroc/p/7681938.html>

## algolia 搜索

[提交地址](https://docsearch.algolia.com/)  
`输入博客地址和邮箱即可`

**自己上传数据**

- 官网注册，获取 APPLICATION_ID 和 API_KEY
- 服务器安装 docker
- 下载 docker 镜像`docker pull algolia/docsearch-scraper`
- ,可能需安装 jq  
  centos：`yum install jq`
- 根据配置启动 dokcer 爬虫服务 **111.env 文件**

```txt
APPLICATION_ID=YOUR_APPLICATION_ID
API_KEY=YOUR_API_KEY
```

- 新建文件**config.json**

```json
{
  "index_name": "cvabm",
  "start_urls": ["https://cvabm.github.io/"],
  "stop_urls": [],
  "maxDepth": 2,
  "aggregateContent": true,
  "selectors": {
    "lvl0": {
      "selector": "h1",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "h1",
    "lvl2": "h2",
    "lvl3": "h3",
    "lvl4": "h4",
    "lvl5": "h5",
    "text": "p, li, code"
  },
  "js_render": true,
  "js_wait": 4
}
```

- 执行爬取命令

```sh
docker run -it --env-file=你的文件路径/.env -e "CONFIG=$(cat 你的文件路径/config.json)" algolia/docsearch-scraper

例：
docker run -it --env-file=/home/lighthouse/111.env -e "CONFIG=$(cat /home/lighthouse/config.json | jq -r tostring)" algolia/docsearch-scraper

```

https://docsearch.algolia.com/docs/legacy/run-your-own/
https://docsearch.algolia.com/docs/legacy/config-file/
<https://juejin.cn/post/7090866381712801828#heading-4>  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aad4a3bbacc543408af86b551d5e69c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

问题 1：
**出现 algoliasearch.exceptions.RequestException: Method not allowed with this API key 的解决方法**  
`env文件的API_KEY应该携程Admin API Key而不是Search Only Key`

- key 历史

```
  algolia: {
      apiKey: '53f4c247cfed7a6b18fb59c758312034',
      indexName: 'cvabm'
      // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    },
```

## Android 各版本源码查看

<https://cs.android.com/>  
<http://androidxref.com/>

## 命令速查
[wangchujiang](<https://wangchujiang.com/reference/index.html>)  
[quickref](https://quickref.me/)  
