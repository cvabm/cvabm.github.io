[[toc]]

## 不同流媒体服务器对比

- Mediasoup  
  是性能最优秀的 WebRTC 流媒体服务器。它使用 C++ 作为开发语言，底层使用 libuv 处理 I/O 事件。  
  因为 Mediasoup 不关心应用层，它关注的是底层数据如何高效的流转，代码简洁、高效，性能极佳。
- janus  
  支持的信令协议比较多，如 HTTP、WebSocket、RabbitMQ 等  
  C 语言开发的，因此它的性能非常优秀。要说不足的话，janus 底层没有使用 epoll 这类异步 I/O 事件处理机制，这应该说是它的一大缺陷；  
  另外，Janus 还使用 glib 库，由于 glib 库对于国内的很多开发同学来说用的比较少，所以会有一定的学习成本  
   如果你们要做的业务种类比较多，变化比较快，那建议你选择使用 Janus 作为流媒体服务器。  
   将你的业务做成一个插件放到 Janus 上很快就能实现你们的业务需求。
- Medooze  
  如果你们的业务变化不大，除了追求性能外，还需要录制、推流之类的功能，那么你可以选择使用 Medooze，它可以很好的满足你们的需求。

作者：李超
链接：http://www.imooc.com/article/295301
来源：慕课网
本文原创发布于慕课网 ，转载请注明出处，谢谢合作

## janus-gateway demo

https://github.com/atyenoria/react-native-webrtc-janus-gateway  
https://janus.conf.meetecho.com/

### janus 介绍和基本开发

https://blog.csdn.net/sonysuqin/article/details/84988120

相关连接：

<https://janus.conf.meetecho.com/demos.html>  
源码<https://github.com/meetecho/janus-gateway>
