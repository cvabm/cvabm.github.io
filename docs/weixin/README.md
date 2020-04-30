# 微信公众号、小程序
[[toc]]
## 公众号
```


https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login


https://mp.weixin.qq.com/wiki
http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95&form=%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95%E5%88%A0%E9%99%A4%E6%8E%A5%E5%8F%A3%20/menu/delete
http://www.imooc.com/video/7225/0
http://www.php100.com/html/php/api/2013/0909/6115.html###
http://www.imooc.com/search/course?words=%E5%85%AC%E4%BC%97%E5%8F%B7
http://www.cnblogs.com/liuhongfeng/p/5099149.html
```

## 映射、内网穿透
```
﻿http://ittun.com/
下载安装---
Step 3: 默认启动命令
linux: chmod 777 ngrok
./ngrok 端口
windows: 双击startup.bat文件
linux: ./ngrok [port] (tcp: ./ngrok -proto=tcp 22)
windows: ngrok [port] (tcp: ngrok -proto=tcp 22)
更多:ngrok --help
Step 4: 指定二级域名
./ngrok -subdomain [demo] [8080]
例子：ngrok -subdomain lijiangang 8080
Step 5: 指定配置文件
./ngrok -config ittun.yml start [proname]
```

[ngrok](https://ngrok.com/)
[内网穿透工具natapp](https://natapp.cn/) 
<https://www.lihail.cn/pages/article/tool/Natapp.html#natapp>  


## 配置本地服务器
```
1：myeclipse新建web项目2：http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index 注册微信开发者账号
3：配置微信token到项目中

URL
http://lijiangang.ittun.com/Demo/wx.do

Token
imooc

```
