#  webrtc
[[toc]]

## WebRTC端到端连接建立过程！！
**1. A获取媒体流(MediaStream)或数据流。**

```

一般通过MediaDevices.getUserMedia()获取媒体流，媒体流包含了请求媒体类型的（音视频）轨道(MediaStreamTrack)。
一个流可以包含视频轨道，音频轨道或其他。通过MediaStream的addTrack方法可以添加轨道。
 关于MediaDevices参考https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream。
```
**2. A生成一个RTCPeerConnection接口对象**
```
RTCPeerConnection接口代表一个由本地计算机到远端的WebRTC连接。该接口提供了创建，保持，监控，关闭连接的方法的实现。

pc = new RTCPeerConnection([RTCConfiguration dictionary]) //可选参数包括ice服务器等。
```
**3. A将流加入到RTCPeerConnection对象中**
```
pc.addStream(stream);//该方法已经不推荐使用，推荐使用addTrack

//或者加入轨道stream.getTracks().forEach(track => pc.addTrack(track, stream));
```
**4. A生成Offer信息**
```
pc.createOffer(function(offer)=>{//创建完成 TODO 5},error)
```
**5. A将生成的Offer设置为本地描述。**
```
pc.setLocalDescription(new RTCSessionDescription(offer),function(){

//设置完成 TODO 6},error);
```
**6. A将生成的Offer发给另一端B（服务器中转）**
```
send json.stringify(offer)
```
**7. B也生成RTCPeerConnection，并按需求设置流。**
```
new RTCPeerConnection()
```
**8. B将收到的Offer设置为远端描述。**
```
pc.setRemoteDescription(new RTCSessionDescription(Json.parse(offerString)),function(){//设置完成 TODO 9},error);
```
**9. B生成Answer，并设置为本地描述。**
```
pc.createAnswer(function(answer){pc.setLocalDescription(new RTCSessionDescription(answer),function(){ //设置完成，TODO 10 })},error)
```
**10. B把Answer发送给发起方A(服务器中转)**
```
send json.stringify(answer)
```
**11. A将Answer设置为远端描述。**
```
pc.setRemoteDescription(new RTCSessionDescription(Json.parse(answerString)),function(){//设置完成 TODO 9},error);
```
**12. 交换ICE 候选地址信息**
```
建立连接过程中，会回调onicecandidate事件，传递ICE候选地址，我们需要将其转发至另一端，并通过另一端的方法addIceCandidate方法设置对方的候选地址。
pc.onicecandidate = function(event) {if (event.candidate)
 { // 发送 let iceinfo = event.candidate 至另一端 }
  else
   { // All ICE candidates have been sent }}
   //另一端//接收到上面的iceinfopc.addIceCandidate(new RTCIceCandidate(iceinfo));理想情况下，现在已经建立连接了。

交换与使用媒体流

当一方addStream或addTrack后，另一方的RTCPeerConnection会触发onaddstream或addTrack事件回调，通过事件参数可以获取对面的流或轨道数据，
以此进行媒体显示等。当前版本的协议已经不再推荐addStream方法，应使用addTrack方法。

关于硬件流

硬件只能被一个流占用，多个RTCPeerConnection可以共享这一个流。
```


## 官网  
<https://webrtc.org/getting-started/overview>  
## webrtc APIs demo演示
<https://webrtc.github.io/samples/>

## android原生上使用webrtc
包括使用相机、屏幕共享、信令交互、多人视频  

<https://www.jianshu.com/p/eb5fd116e6c8>
## 基本概念

>- NAT  
>将内网与内网通信时怎么将内网私有IP地址转换为可在网络中传播的合法IP地址  
通过**UDP打洞**实现NAT穿越是一种在处于使用了NAT的私有网络中的Internet主机之间建立双向UDP连接的方法  
>
>- STUN  
STUN（Simple Traversal of UDP Through NATs）其作用是进行 NAT 类型判定，对于可以穿越的 NAT 类型进行UDP穿越。
>- TURN  
TURN（Traversal Using Relays around NAT），其主要作用是通过服务端进行数据转发。
>- ICE  
> ICE跟STUN和TURN不一样，ICE不是一种协议，而是一个framework，它整合了STUN和TURN。
>- REMB  
REMB （Receiver Estimated Maximum Bitrate ），用于估算网络带宽。
>- RTCP  
RTCP（The RTP Control Protocol ），RTP 控制协议。通常用于报告 RTP数据的接收与发送数据的统计报告。
>- RTP   
RTP（Real-time Transport Protocol ），一种网络传输协议，在 UDP 之上，通常用于音视频数据的传输。
>- GCC    
GCC（Google Congestion Control），google提出一套拥塞控制算法，主要有两种：一种是通过丢包率计算拥塞，另一种是通过时延计算拥塞。
*** 

```
RTC(Real Time Communication): 实时通信
WebRTC: 基于web的实时通信
Signaling: 信令, 一些描述媒体或网络的字符串
```


>WebRTC逻辑相关  
在WebRTC中包括了 Stream, Track 和 channel 的概念。  
>- **Track**  
Track（轨）, 轨是 WebRTC 中借鉴了其它多媒体相关的概念。轨的特性大家都非常清楚，两条轨是永远不会相交的。轨用在多媒体中，表式的是每条 "轨" 数据都是独立存在的，不会与其它 "轨" 相交。如音频轨，视频轨。
>- **Stream**  
在 WebRTC中分为媒流（MediaStream）和数据流（DataStream）。对于 MediaStream是一个多条轨的集合，在它里面包括了一个终端的音频转和视频轨。
>- **Channel**    
Channel 是传输层面的概念，也就是音视频数据最终要交由 channel 传送出去。而 channel 最终会交由socket将数据发送出来。了为解耦 stream与socket，所以增加了channel 的概念。  
>- **sdp**  
SDP(Session Description Protocol) 的目的是在媒体会话中传递媒体信息。SDP在很多地方使用，WebRTC也会使用它做媒体信息交换。  

## SDP详细介绍  
**SDP主要包括以下信息：**  
```
>会话的名称与目的  
>会话的存活时间  
>会话中的媒体信息，这是最主要的，它又包括以下内容：   
>   - 媒体类型  
>   - 媒体格式  
>   - 传输协议  
>   - 传输的IP和端口
```
**SDP的格式**
```
SDP是由多个<type>=<value>组成的。  
其中<type>是一个字符， <value>是一个字符串。需要特别注意的是，=两边是不能有空格的。  

SDP会话描述由一个会话级描述（session_level description）和多个媒体级描述（media_level description）组成。

会话级（session_level）的作用域是整个会话。其位置是从’v=’行开始到第一个媒体描述为止。

媒体级（media_level）描述是对单个的媒体流进行描述，其位置是从’m=’行开始到下一个媒体描述为止。

总之，除非媒体部分重载，会话级的值是各个媒体的缺省默认值。

```
**参数结构**
```
Version（必选）
v=0 SDP的版本号，不包括次版本号。

origion（必选）
o=<username> <session id> <version> <network type> <address type> <address>

“o=”项对会话的发起者进行了描述。
<username>是用户的登录名。如果主机不支持<username>，则为 ”－” 。
注意：<username>不能含空格。

<session id>：是一个数字串。在整个会话中，必须是唯一的。为了确保其唯一，建议使用NTP(Network Time Protocol) timestamp。
<version>：该会话公告的版本,供公告代理服务器检测同一会话的若干个公告中哪个是最新公告。基本要求是会话数据修改后该版本值递增,建议用NTP时戳。
<network type>：网络类型，一般为”IN”,表示”internet”
<address type>：地址类型，一般为IP4
<address>：地址
Session Name（必选）
s=<session name> 会话名，在整个会话中有且只有一个”s=”。


Connection Data（可选）
c=<network type> <address type> <connection address>

表示媒体连接信息。 一个会话声明中，会话级描述中必须有”c=”项或者在每个媒体级描述中有一个”c=”项。
可能在会话级描述和每个媒体级描述中都有”c=”项。

<network type>：网络类型，一般为”IN”,表示”internet”
<address type>：地址类型，一般为IP4。
<connection address>：应用程序必须处理域名和ip地址两种情形。
单播时，为域名或ip地址，推荐使用域名；
多播时，为ip地址，且ip后面必须有TTL（取值范围是0－255）。地址和TTL决定了多播包被传播的范围，例： c=IN IP4 224.2.1.1/127。分层编码方案是一个数据流被分为多层，接受者能够通过申请不同层的流选择流的质量。如下：<base multicast address>/<ttl>/<number of addresses> 如果<number of addresses>没有给定，则默认为1。 c=IN IP4 224.2.1.1/127/3 等价于： c=IN IP4 224.2.1.1/127 c=IN IP4 224.2.1.2/127 c=IN IP4 224.2.1.3/127

Bandwidth（可选）
b=<modifier>:<bandwidth-value>

描述了建议的带宽，单位kilobits per second，可选。

<modifier>：包括两种CT和AS。CT：Conference Total，总带宽。AS：Application-Specific Maximum，单个媒体带宽的最大值。 扩展机制：<modifier>以”X－”开始。建议modifier越短越好。例 b=X-YZ:128
Times（必选）
t=<start time> <stop time>

描述了会话的开始时间和结束时间。 <start time> 和<stop time> 为NTP时间，单位是秒。假如<stop time>为零表示过了<start time>时间后会话一直持续。当<start time> 和<stop time>均为零时表示持久会话。

建议start time和stop time不要设为0。因为不知道此会话的开始和结束时间，增加了调度（scheduling）的难度。

Media Announcements （必选）
m=<media> <port> <transport> <fmt list>

一个会话描述包括几个媒体描述。一个媒体描述以”m=”开始到下一个”m=”结束。

<media>：表示媒体类型。有"audio", "video", "application"（例白板信息）, "data"（不向用户显示的数据） 和"control"（描述额外的控制通道）。

<port>：媒体流发往传输层的端口。取决于c=行规定的网络类型和接下来的传送层协议：对UDP为1024-65535；对于RTP为偶数。

当分层编码流被发送到一个单播地址时，需要列出多个端口。方式如下： m=<media> <port>/<number of ports> <transport> <fmt list> 对于RTP，偶数端口被用来传输数据，奇数端口用来传输RTCP包。例： m=video 49170/2 RTP/AVP 31 端口49170和49171为第一对RTP/RTCP端口，49172和49173为第二对的端口。传输协议是RTP/AVP，媒体格式为31。

<transport>：传输协议，与c=行的地址类型有关。两种： RTP/AVP，表示Realtime Transport Protocol using the Audio/Video profile carried over UDP；UDP。

<fmt list>：媒体格式。对于音频和视频就是在RTP Audio/Video Profile定义的负载类型(payload type)。但第一个为缺省值，分为静态绑定和动态绑定：静态绑定即媒体编码方式与RTP负载类型有确定的一一对应关系，动态绑定即媒体编码方式（如时钟频率，音频信道数等）没有完全确定，需要进一步的属性说明（用rtpmap）。

分别举例如下：
静态绑定的例子：u_law的PCM编码单信道Audio，采样率8KHZ。在RTP Audio/Video profile中对应的payload type为0。即： m=audio 49232 RTP/AVP 0

动态绑定的例子：16位线形编码，采样率为16KHZ，假如我们希望动态RTP/AVP 类型98表示此此流，写法如下： m=video 49232 RTP/AVP 98 a=rtpmap:98 L16/16000/2

rtpmap（可选）
a=rtpmap:<payload type> <encoding name>/<clock rate>[/<encodingparameters>]

a=rtpmap:<负载类型><编码名>/<时钟速率>[/<编码参数>]

对于音频流，<编码参数>说明了音频的通道数。通道数默认缺省值为1。
对于视频流，现阶段没有<编码参数>。
m=audio 49230 RTP/AVP 96 97 98 a=rtpmap:96 L8/8000 a=rtpmap:97 L16/8000 a=rtpmap:98 L16/11025/2

在rtpmap中，实验性的编码方案也可以用。其格式名前一定为”X－”例：一种新的实验性的被称为GSMLPC的音频流，使用的动态负载类型为99。 m=video 49232 RTP/AVP 99 a=rtpmap:99 X-GSMLPC/8000 9．Suggested Attributes（可选） a=<TYPE>或 a=<TYPE>:<VALUES> a=framerate:<帧速率>//单位:帧/秒 a=lang:<语言标记>//会话描述的缺省语言或媒体描述的语言

注： 如果SDP语法分析器不能识别某一类型(Type),则整个描述丢失。 如果”a=”的某属性值不理解,则予以丢失此属性。 会话级的描述就是媒体级描述的。
```
```
Session description

v= (protocol version)
o= (owner/creator and session identifier).
s= (session name)
i=* (session information)
u=* (URI of description)
e=* (email address)
p=* (phone number)
c=* (connection information - not required if included in all media)
b=* (bandwidth information)
z=* (time zone adjustments)
k=* (encryption key)
a=* (zero or more session attribute lines)

Time description
t= (time the session is active)
r=* (zero or more repeat times)

Media description
m= (media name and transport address)
i=* (media title)
c=* (connection information - optional if included at session-level)
b=* (bandwidth information)
k=* (encryption key)
a=* (zero or more media attribute lines)


```



音视频通话控制  
<https://github.com/react-native-webrtc/react-native-incall-manager>  
视频播放  
<https://github.com/react-native-community/react-native-video>  
webrtc  
<https://github.com/react-native-webrtc/react-native-webrtc>  
webrtc+janus手机端  
<https://github.com/atyenoria/react-native-webrtc-janus-gateway>  
## 强制WebRTC使用转发(relay)模式
<https://blog.csdn.net/foruok/article/details/72677338>

webrtc服务器<https://blog.csdn.net/bvngh3247/article/details/80746640>   

NAT<https://www.cnblogs.com/whyandinside/archive/2010/12/08/1900492.html>  

## 基本网络概念 
>- 网关  
网关通常用来表示一个概念，作为内网和外网的接入点，一般我们称为网关。它的具体介质是路由器  
>- 路由器  
是连接[因特网]、[广域网]的设备，它处于网络层，主要用来寻址。它会根据信道的情况自动选择和设定路由，以最佳路径，按前后顺序发送信号  
>- 交换机  
在局域网（LAN）中，交换机类似于城市中的立交桥，它的主要功能是桥接其他网络设备（路由器、防火墙和无线接入点），并连接客户端设备（计算机、服务器、网络摄像机和IP打印机）。简而言之，交换机可以为网络上所有的不同设备提供一个中心连接点。

>- **TCP/UDP/HTTP/SOCKET**  
tcp/udp传输层  
http是基于应用层，基于tcp协议  
socket是tcpip中运输层tcp和udp协议中的一个实现寻址的重要实现  
>- **websocket/http**  
目的是取代HTTP在双向通信场景下的使用，而且它的实现方式有些也是基于HTTP的（WS的默认端口是80和443）  
> **相同点**  
都是基于TCP的应用层协议。  
都使用Request/Response模型进行连接的建立。  
在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码。   
都可以在网络中传输数据。    
>**不同点**  
WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用。  
WS的连接不能通过中间人来转发，它必须是一个直接连接。  
WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据。  
WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息。  
WS的数据帧有序。  


## chrome调试

查看webrtc信息  
**chrome://webrtc-internals/**  

查看远端的视频编码  

Read Stats From改为Legacy non-standard(callback-based) getstats api    

ssrc_2181152470_recv (ssrc)    
googCodecName即可看到vp8还是h264     

**webrtc调试工具chrome://webrtc-internals的使用手册**  

```
音频统计数据
aecDivergentFilterFraction：TBD（后续会补全）

audioInputLevel：发送端采集的音频能量大小。

bitsSentPerSecond：每秒发送出去的比特数。

packetsSentPerSecond：每秒发送出去的音频包数。

googEchoCancellationQualityMin：TBD（后续会补全）

googEchoCancellationReturnLoss：TBD（后续会补全）

googEchoCancellationReturnLossEnhancement：TBD（后续会补全）

googResidualEchoLikelihood：Chrome 56中新增的，主要用来标识是否存在回声，范围为0 （没有回声）- 1（有回声），当值大于0.5时表明存在回声。

视频统计数据
bitsSentPerSecond：每秒发送出去的比特数，根据当前网络情况会进行动态调整。

framesEncoded：累计编码出来的视频帧数，没有异常情况的话会一直增长。

packetsLost：发送端从接收端发送过来的RTCP Receiver Report中得到的累积丢包数量，可以和googNacksReceived数据进行对照。

googRtt：Rtt全称为Round-trip time，是发送端从接受端发送过来的RTCP Receiver Report中得到的时间戳通过计算得到的往返时延。

packetsSentPerSecond：Chrome 56中新增的，每秒发送出去的视频包数量。

qpSum：发送端编码出的带有QP值的帧的数量，QP全称为Quantization Parameter。

googAdaptationChanges：发送端因为CPU的负载变化导致的分辨变高或者变低的次数，需要设置googCpuOveruseDetection。

googAvgEncodeMs：发送端平均编码时间，越小越好。

googEncodeUsagePercent：发送端（平均每帧编码时间）／（平均每帧采集时间），反应编码效率。

googFirsReceived：发送端收到的关键帧请求数量，FIR全称为Full Intra Request，一般来说在video conference模式下，有新的参与者进来会发出。

googPlisReceived：发送端收到的关键帧请求数量，PLI全称为Picture Loss Indication，一般来说在解码失败时会发出。

googNacksReceived：发送端收到的重传包请求数量，Nack全称为Negative ACKnowledgement可以和packetsLost数据进行对照。

googFrameHeightSent：发送端发送的分辨率高度，根据当前网络会进行动态调整。

googFrameWidthSent：发送端发送的分辨率宽度，根据当前网络会进行动态调整。

googFrameRateInput：发送端设置的初始帧率。

googFrameRateSent：发送端实际发送的帧率，根据当前网络会进行动态调整。
编辑于 2017-03-10
```




## chrome书签同步问题
chrome://sync/    

about - getUpdates  

