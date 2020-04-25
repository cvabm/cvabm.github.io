# 计算机基础

[[toc]]
## 网络
### get和post的区别
```
get和post虽然本质都是tcp/ip，但两者除了在http层面外，在tcp/ip层面也有区别。

get会产生一个tcp数据包，post两个

具体就是：

get请求时，浏览器会把headers和data一起发送出去，服务器响应200（返回数据），
post请求时，浏览器先发送headers，服务器响应100 continue，浏览器再发送data，服务器响应200（返回数据）。
再说一点，这里的区别是specification（规范）层面，而不是implementation（对规范的实现）
```
