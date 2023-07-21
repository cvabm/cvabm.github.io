# webrtc

[[toc]]

## 源码
<https://github.com/DrKLO/Telegram/blob/master/TMessagesProj/jni/voip/webrtc/media/engine/webrtc_video_engine.cc#L1254>  
<https://webrtc.googlesource.com/src/+/50cfe1fda7f2b4a6a449fe7234f4c1aa2a475c61/webrtc/media/engine/webrtcvideoengine2.cc>  

## 开启日志
`Logging.enableLogToDebugOutput(Logging.Severity.LS_VERBOSE)`
## webrtc-android源码编译
<https://juejin.cn/post/6956379281907777572>  
<https://blog.jianchihu.net/webrtc-android-build-guide.html>  

**depot_tools/ninja.py: Could not find Ninja in the third_party of the current project, nor in your PATH.  **  
新版本问题，需手动安装ninja  
`sudo apt install ninja-build`
## WebRTC 端到端连接建立过程！！

**1. A 获取媒体流(MediaStream)或数据流。**

```

一般通过MediaDevices.getUserMedia()获取媒体流，媒体流包含了请求媒体类型的（音视频）轨道(MediaStreamTrack)。
一个流可以包含视频轨道，音频轨道或其他。通过MediaStream的addTrack方法可以添加轨道。
 关于MediaDevices参考https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream。
```

**2. A 生成一个 RTCPeerConnection 接口对象**

```
RTCPeerConnection接口代表一个由本地计算机到远端的WebRTC连接。该接口提供了创建，保持，监控，关闭连接的方法的实现。

pc = new RTCPeerConnection([RTCConfiguration dictionary]) //可选参数包括ice服务器等。
```

**3. A 将流加入到 RTCPeerConnection 对象中**

```
pc.addStream(stream);//该方法已经不推荐使用，推荐使用addTrack

//或者加入轨道stream.getTracks().forEach(track => pc.addTrack(track, stream));
```

**4. A 生成 Offer 信息**

```
pc.createOffer(function(offer)=>{//创建完成 TODO 5},error)
```

**5. A 将生成的 Offer 设置为本地描述。**

```
pc.setLocalDescription(new RTCSessionDescription(offer),function(){

//设置完成 TODO 6},error);
```

**6. A 将生成的 Offer 发给另一端 B（服务器中转）**

```
send json.stringify(offer)
```

**7. B 也生成 RTCPeerConnection，并按需求设置流。**

```
new RTCPeerConnection()
```

**8. B 将收到的 Offer 设置为远端描述。**

```
pc.setRemoteDescription(new RTCSessionDescription(Json.parse(offerString)),function(){//设置完成 TODO 9},error);
```

**9. B 生成 Answer，并设置为本地描述。**

```
pc.createAnswer(function(answer){pc.setLocalDescription(new RTCSessionDescription(answer),function(){ //设置完成，TODO 10 })},error)
```

**10. B 把 Answer 发送给发起方 A(服务器中转)**

```
send json.stringify(answer)
```

**11. A 将 Answer 设置为远端描述。**

```
pc.setRemoteDescription(new RTCSessionDescription(Json.parse(answerString)),function(){//设置完成 TODO 9},error);
```

**12. 交换 ICE 候选地址信息**

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

## 一些 demo 和相关网站

<https://webrtc.org/getting-started/overview>  
**webrtc APIs demo 演示**  
<https://webrtc.github.io/samples/>

**android 原生上使用 webrtc**
包括使用相机、屏幕共享、信令交互、多人视频

<https://www.jianshu.com/p/eb5fd116e6c8>

## 基本概念

> - NAT  
>   将内网与内网通信时怎么将内网私有 IP 地址转换为可在网络中传播的合法 IP 地址  
>   通过**UDP 打洞**实现 NAT 穿越是一种在处于使用了 NAT 的私有网络中的 Internet 主机之间建立双向 UDP 连接的方法
>
> - STUN  
>   STUN（Simple Traversal of UDP Through NATs）其作用是进行 NAT 类型判定，对于可以穿越的 NAT 类型进行 UDP 穿越。
> - TURN  
>   TURN（Traversal Using Relays around NAT），其主要作用是通过服务端进行数据转发。
> - ICE  
>   ICE 跟 STUN 和 TURN 不一样，ICE 不是一种协议，而是一个 framework，它整合了 STUN 和 TURN。
> - REMB  
>   REMB （Receiver Estimated Maximum Bitrate ），用于估算网络带宽。
> - RTCP  
>   RTCP（The RTP Control Protocol ），RTP 控制协议。通常用于报告 RTP 数据的接收与发送数据的统计报告。
> - RTP  
>   RTP（Real-time Transport Protocol ），一种网络传输协议，在 UDP 之上，通常用于音视频数据的传输。
> - GCC  
>   GCC（Google Congestion Control），google 提出一套拥塞控制算法，主要有两种：一种是通过丢包率计算拥塞，另一种是通过时延计算拥塞。

---

```
RTC(Real Time Communication): 实时通信
WebRTC: 基于web的实时通信
Signaling: 信令, 一些描述媒体或网络的字符串
```

> WebRTC 逻辑相关  
> 在 WebRTC 中包括了 Stream, Track 和 channel 的概念。
>
> - **Track**  
>   Track（轨）, 轨是 WebRTC 中借鉴了其它多媒体相关的概念。轨的特性大家都非常清楚，两条轨是永远不会相交的。轨用在多媒体中，表式的是每条 "轨" 数据都是独立存在的，不会与其它 "轨" 相交。如音频轨，视频轨。
> - **Stream**  
>   在 WebRTC 中分为媒流（MediaStream）和数据流（DataStream）。对于 MediaStream 是一个多条轨的集合，在它里面包括了一个终端的音频转和视频轨。
> - **Channel**  
>   Channel 是传输层面的概念，也就是音视频数据最终要交由 channel 传送出去。而 channel 最终会交由 socket 将数据发送出来。了为解耦 stream 与 socket，所以增加了 channel 的概念。
> - **sdp**  
>   SDP(Session Description Protocol) 的目的是在媒体会话中传递媒体信息。SDP 在很多地方使用，WebRTC 也会使用它做媒体信息交换。

## webrtc 视频方向的设置

```
sdp信息中包装有个a=extmap:7 urn:3gpp:video-orientation 参数

视频发送方将其视频方向进行封装（具体方式见9.3），封装以后，放在视频数据帧的一个扩展位置，然后随视频帧一起打包后通过rtp/rtcp/udp发送给接收方。
接收方收到视频帧数据后，可以在帧的扩展位置将视频方向获取出来，然后，在实时的调整到surface view上面


视频方向格式及编解码

定义在rtp帧中的扩展数据，该数据是用一个8位字节进行编码的。前面四位是预留位，用于其他将来用途，
后面四位中，从高到低，第一位是视频发送方camera的选项，可编码出2种camera选项；后三位是视频数据的方向，可以编码出8种视频方向

编码：

将camera选项位和视频方向位四位编码后的数据映射成十进制数字，就是该帧方向编码后的整数值了。
比如发送方当前是后置摄像头并且视频顺时针旋转了90度，那么四位编码则是1011，转换成十进制就是11，那么接收方通过帧中的扩展位数据得到的就是11。

位运算法则：total = (camera << 3) | orientation。

 

解码：

接收方的到11后，对应的转换成二进制就是1011，获取第四位就是发送方camera的选项，获取后三位就是视频的方向。

位运算法则：

Camera = (total & 0x08) >> 3;

Orientation = total & 0x07;
————————————————
版权声明：本文为CSDN博主「晓昏行者」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/liangguangxiang/java/article/details/48526219


```

## SDP 详细介绍

**SDP 主要包括以下信息：**

```
>会话的名称与目的
>会话的存活时间
>会话中的媒体信息，这是最主要的，它又包括以下内容：
>   - 媒体类型
>   - 媒体格式
>   - 传输协议
>   - 传输的IP和端口
```

**SDP 的格式**

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

## 强制 WebRTC 使用转发(relay)模式

<https://blog.csdn.net/foruok/article/details/72677338>

webrtc 服务器<https://blog.csdn.net/bvngh3247/article/details/80746640>

NAT<https://www.cnblogs.com/whyandinside/archive/2010/12/08/1900492.html>

## 基本网络概念

> - 网关  
>   网关通常用来表示一个概念，作为内网和外网的接入点，一般我们称为网关。它的具体介质是路由器
> - 路由器  
>   是连接[因特网]、[广域网]的设备，它处于网络层，主要用来寻址。它会根据信道的情况自动选择和设定路由，以最佳路径，按前后顺序发送信号
> - 交换机  
>   在局域网（LAN）中，交换机类似于城市中的立交桥，它的主要功能是桥接其他网络设备（路由器、防火墙和无线接入点），并连接客户端设备（计算机、服务器、网络摄像机和 IP 打印机）。简而言之，交换机可以为网络上所有的不同设备提供一个中心连接点。

> - **TCP/UDP/HTTP/SOCKET**  
>   tcp/udp 传输层  
>   http 是基于应用层，基于 tcp 协议  
>   socket 是 tcpip 中运输层 tcp 和 udp 协议中的一个实现寻址的重要实现
> - **websocket/http**  
>   目的是取代 HTTP 在双向通信场景下的使用，而且它的实现方式有些也是基于 HTTP 的（WS 的默认端口是 80 和 443）  
>   **相同点**  
>   都是基于 TCP 的应用层协议。  
>   都使用 Request/Response 模型进行连接的建立。  
>   在连接的建立过程中对错误的处理方式相同，在这个阶段 WS 可能返回和 HTTP 相同的返回码。  
>   都可以在网络中传输数据。  
>   **不同点**  
>   WS 使用 HTTP 来建立连接，但是定义了一系列新的 header 域，这些域在 HTTP 中并不会使用。  
>   WS 的连接不能通过中间人来转发，它必须是一个直接连接。  
>   WS 连接建立之后，通信双方都可以在任何时刻向另一方发送数据。  
>   WS 连接建立之后，数据的传输使用帧来传递，不再需要 Request 消息。  
>   WS 的数据帧有序。

**webrtc 调试工具 chrome://webrtc-internals 的使用手册**

查看远端的视频编码

Read Stats From 改为 Legacy non-standard(callback-based) getstats api

ssrc_2181152470_recv (ssrc)  
googCodecName 即可看到 vp8 还是 h264

```js
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

## android 编解码

```
软解码器：通常以OMX.google开头，或者不以OMX开头的也为软解码器
硬解码器：通常以OMX.[hardware_vendor]开头
```

```java

高通软编解码
OMX.google.aac.decoder
OMX.google.amrnb.decoder
OMX.google.flac.decoder
OMX.google.g711.alaw.decoder
OMX.google.g711.mlaw.decoder
OMX.google.gsm.decoder
OMX.google.mp3.decoder
OMX.google.opus.decoder
OMX.google.raw.decoder
OMX.google.vorbis.decoder
OMX.google.aac.encoder
OMX.google.amrnb.encoder
OMX.google.amrwb.encoder
OMX.google.flac.encoder
OMX.google.h264.decoder
OMX.google.h263.decoder
OMX.google.hevc.decoder
OMX.google.mpeg4.decoder
OMX.google.vp8.decoder
OMX.google.vp9.decoder
OMX.google.h264.encoder
OMX.google.h263.encoder
OMX.google.mpeg4.encoder
OMX.google.vp8.encoder
OMX.google.aac.decoder
OMX.google.amrwb.decoder

c2.android.vp8.decoder - 2048
c2.android.vp8.encoder -2048
c2.android.vp9.decoder - 2048
c2.android.vp9.encoder -2048
OMX.qti.audio.decoder.flac
OMX.qti.video.decoder.divxsw
OMX.qti.video.decoder.divx4sw
OMX.qti.video.decoder.h263sw
OMX.qti.video.decoder.mpeg4sw
OMX.qti.video.decoder.vc1sw
```

```

高通硬解
OMX.qcom.video.decoder.avc - 264
OMX.qcom.video.decoder.hevc -265
OMX.qcom.video.decoder.mpeg2
OMX.qcom.video.decoder.vp8 -2304
OMX.qcom.video.decoder.vp9 -4320
高通硬编
OMX.qcom.video.encoder.heic
OMX.qcom.video.encoder.avc -h264
OMX.qcom.video.encoder.h263sw
OMX.qcom.video.encoder.hevc -h265
OMX.qcom.video.encoder.hevc.cq
OMX.qcom.video.encoder.mpeg4sw -720
OMX.qcom.video.encoder.vp8 -2304
海思硬编
OMX.hisi.video.encoder.avc
OMX.hisi.video.encoder.hevc
海思硬解
OMX.hisi.video.decoder.avc
OMX.hisi.video.decoder.hevc
OMX.hisi.video.decoder.mpeg2
OMX.hisi.video.decoder.mpeg4
OMX.hisi.video.decoder.vp8  -1088
```

判断是否为软解

```java
frameworks/av/media/libstagefright/MediaCodecList.cpp

 bool MediaCodecList::isSoftwareCodec(const AString &componentName) {
    return componentName.startsWithIgnoreCase("OMX.google.")
            || componentName.startsWithIgnoreCase("c2.android.")
            || (!componentName.startsWithIgnoreCase("OMX.")
                    && !componentName.startsWithIgnoreCase("c2."));
}

```

相关文档  
<https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/data/media_codecs_google_c2_video.xml>

## 获取手机最大解码数量

```java

public static void printMediaCodecInfo() {

	int CodecCount = 0;
	try {
		CodecCount = MediaCodecList.getCodecCount();
	}catch (Exception e) {
		Log.e(TAG, "#### Failed to get codec count!");
		e.printStackTrace();
		return;
	}

	for (int i = 0; i < CodecCount; ++i) {
		MediaCodecInfo info = null;
		try {
			info = MediaCodecList.getCodecInfoAt(i);
		} catch (IllegalArgumentException e) {
			Log.e(TAG, "Cannot retrieve decoder codec info", e);
		}
		if (info == null) {
			continue;
		}

		String codecInfo = "MediaCodec, name="+info.getName()+", [";

		for (String mimeType : info.getSupportedTypes()) {
			codecInfo += mimeType + ",";
			MediaCodecInfo.CodecCapabilities capabilities;
			try {
				capabilities = info.getCapabilitiesForType(mimeType);
			} catch (IllegalArgumentException e) {
				Log.e(TAG, "Cannot retrieve decoder capabilities", e);
				continue;
			}

			codecInfo += " max inst:"+capabilities.getMaxSupportedInstances()+",";

			String strColorFormatList = "";
			for (int colorFormat : capabilities.colorFormats) {
				strColorFormatList += " 0x" + Integer.toHexString(colorFormat);
			}
			codecInfo += strColorFormatList + "] [";
		}

		Log.w(TAG, codecInfo);
	}

	boolean bSupportHwVP8 = MediaCodecVideoEncoder.isVp8HwSupported();
	boolean bSupportHwVP9 = MediaCodecVideoEncoder.isVp9HwSupported();
	boolean bSupportHwH264 = MediaCodecVideoEncoder.isH264HwSupported();

	String webrtcCodecInfo = "WebRTC codec support: HwVP8=" + bSupportHwVP8 + ", HwVP9=" + bSupportHwVP9
			+ ", Hw264=" + bSupportHwH264;

	if(bSupportHwH264) {
		webrtcCodecInfo += ", Hw264HighProfile=" + MediaCodecVideoEncoder.isH264HighProfileHwSupported();
	}

	Log.w(TAG, webrtcCodecInfo);
}
```

### 华为对 h264 的支持

```java
webrtc内部h264只支持两种 OMX.qcom. 和 OMX.Exynos.需改以下配置即可
HardwareVideoEncoderFactory.java

   private boolean isHardwareSupportedInCurrentSdkH264(MediaCodecInfo info) {
        if (H264_HW_EXCEPTION_MODELS.contains(Build.MODEL)) {
            return false;
        } else {
            String name = info.getName();
            return name.startsWith("OMX.qcom.") && VERSION.SDK_INT >= 19 || name.startsWith("OMX.Exynos.") && VERSION.SDK_INT >= 21 || name.startsWith("OMX.google.") && VERSION.SDK_INT >= 19;
        }
    }


```

## webrtc 媒体信息含义

<https://docs.google.com/document/d/1z-D4SngG36WPiMuRvWeTMN7mWQXrf1XKZwVl3Nf1BIE/edit#>
<https://w3c.github.io/webrtc-stats/>

### webrtc 中的 SurfaceViewRender 及 EglRender 详解

<https://blog.csdn.net/blueair_ren/article/details/108163151>
<https://blog.piasy.com/2018/05/24/WebRTC-Video-Native-Journey/index.html>

## 关于 H.264 profile-level-id

<https://blog.csdn.net/epubcn/article/details/102802108>

### webrtc 安卓屏幕旋转问题

<https://blog.csdn.net/epubcn/article/details/101451547>

## webrtc 修改带宽

<https://webrtc.org.cn/modify-sdp/>

### SDP Profile-level-id 解析

<https://blog.csdn.net/liang12360640/article/details/52096499>
### sdp packetization-mode
```
packetization-mode:
表示支持的封包模式.
1 、packetization-mode 值为 0 时或不存在时, 必须使用单一 NALU 单元模式.
2、 packetization-mode 值为 1 时使用非交错(non-interleaved)封包模式.
3、 packetization-mode 值为 2 时使用交错(interleaved)封包模式.
```

### sdp

<https://www.cnblogs.com/chyingp/p/sdp-in-webrtc.html>

### h264 的支持

```java
./src/webrtc/sdk/android/api/org/webrtc/MediaCodecVideoEncoder.java
./src/webrtc/sdk/android/api/org/webrtc/MediaCodecVideoDecoder.java

private static final String[] supportedH264HwCodecPrefixes = {
    "OMX.qcom.", "OMX.Intel.", "OMX.Exynos."
    ,"OMX.Nvidia.H264."     /*Nexus 7(2012), Nexus 9, Tegra 3, Tegra K1*/
    ,"OMX.ittiam.video."    /*Xiaomi Mi 1s*/
    ,"OMX.SEC.avc."         /*Exynos 3110, Nexus S*/
    ,"OMX.IMG.MSVDX."       /*Huawei Honor 6, Kirin 920*/
    ,"OMX.k3.video."        /*Huawei Honor 3C, Kirin 910*/
    ,"OMX.hisi."            /*Huawei Premium Phones, Kirin 950*/
    ,"OMX.TI.DUCATI1."      /*Galaxy Nexus, Ti OMAP4460*/
    ,"OMX.MTK.VIDEO."       /*no sense*/
    ,"OMX.LG.decoder."      /*no sense*/
    //,"OMX.rk.video_decoder."/*Youku TVBox. our service doesn't need this */
    //,"OMX.amlogic.avc"      /*MiBox1, 1s, 2. our service doesn't need this */
};
```

### webbrtc 切换编解码

```java
1、拷贝libwebrtc.jar并引用
2、as打开jar包里需要修改的文件MediaCodecVideoDecoderFactory.class，复制内容并新建文件到相同路径下;如：
java/org/webrtc/MediaCodecVideoDecoderFactory.java
3、修改MediaCodecVideoDecoderFactory代码内容如(过滤img硬解改为软解)：

    private boolean isSupportedCodec(MediaCodecInfo info, VideoCodecType type) {
        String name = info.getName();
        if (!MediaCodecUtils.codecSupportsType(info, type)) {
            return false;
        } else if (!checkScreenIsPhone(ContextUtils.getApplicationContext()) && name.contains("OMX.MS.VP8.Decoder")) {
            Log.d(TAG, "isSupportedCodec: 小米电视此解码器只支持2路");
            return false;
        }else if(name.contains("OMX.IMG")){
            Log.d(TAG, "isSupportedCodec: 过滤硬解");
            return  false;
        }
        else {
            return MediaCodecUtils.selectColorFormat(MediaCodecUtils.DECODER_COLOR_FORMATS, info.getCapabilitiesForType(type.mimeType())) == null ? false : this.isCodecAllowed(info);
        }
    }
4、编译
5、拷贝build/intermediates/javac/debug/classes/org/webrtc/MediaCodecVideoDecoderFactory.class
6、将以上文件拷贝到libwebrtc.zip中替换源文件，再改为.jar即可

```

### 获取手机支持的编解码信息

```java
   if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            MediaCodecList list = new MediaCodecList(MediaCodecList.REGULAR_CODECS);
            MediaCodecInfo[] supportCodes = list.getCodecInfos();
            Log.i(TAG, "解码器列表：");
            for (MediaCodecInfo codec : supportCodes) {
                if (!codec.isEncoder()) {
                    String name = codec.getName();
                    if (name.startsWith("OMX.google")) {
                        Log.i(TAG, "软解->" + name);
                    }
                }
            }
            for (MediaCodecInfo codec : supportCodes) {
                if (!codec.isEncoder()) {
                    String name = codec.getName();
                    if (!name.startsWith("OMX.google")) {
                        Log.i(TAG, "硬解->" + name);
                    }
                }
            }
            Log.i(TAG, "编码器列表：");
            for (MediaCodecInfo codec : supportCodes) {
                if (codec.isEncoder()) {
                    String name = codec.getName();
                    if (name.startsWith("OMX.google")) {
                        Log.i(TAG, "软编->" + name);
                    }
                }
            }
            for (MediaCodecInfo codec : supportCodes) {
                if (codec.isEncoder()) {
                    String name = codec.getName();
                    if (!name.startsWith("OMX.google")) {
                        Log.i(TAG, "硬编->" + name);
                    }
                }
            }
        }
```

### webrtc 安卓源码

<https://webrtc.googlesource.com/src/+/refs/heads/main/sdk/android/api/org/webrtc>

### 华为解码 H264-720p 分辨率问题

```java
AndroidVideoDecoder.java中deliverDecodedFrame方法增加：
if ((long)decodeTimeMs > 200L) {
Logging.e("AndroidVideoDecoder", "Very high decode time: " + decodeTimeMs + "ms. Q size: . Might be caused by resuming H264 decoding after a pause.");
decodeTimeMs = 200;
}
```
### 华为平板h264失败
```
## webrtc编解码过程
DefaultVideoEncoderFactory - createEncoder ：
华为平板softwareEncoder是null，在HardwareVideoEncoderFactory中执行isHardwareSupportedInCurrentSdkH264
除了华为平板其他设备：
DefaultVideoDecoderFactory - createDecoder
HardwareVideoDecoderFactory- 
MediaCodecVideoDecoderFactory - createDecoder
AndroidVideoDecoder - 
后执行：
DefaultVideoEncoderFactory -- 

    private boolean isHardwareSupportedInCurrentSdk(MediaCodecInfo info, VideoCodecMimeType type) {
        if (VERSION.SDK_INT >= 29) {
		//大于android10的系统都进入此方法
		//返回true,支持硬件加速的都判断为支持当前编码？比如华为只有omx.hisi会进入这个方法
            return info.isHardwareAccelerated();
        } else {
            switch(type) {
                case VP8:
                    return this.isHardwareSupportedInCurrentSdkVp8(info);
                case VP9:
                    return this.isHardwareSupportedInCurrentSdkVp9(info);
                case H264:
				//华为平板版本android9，所以进入此方法
                    return this.isHardwareSupportedInCurrentSdkH264(info);
                case AV1:
                    return false;
                default:
                    return false;
            }
        }
    }

```
### 各型号手机编解码大全
<https://videoprocessing.ai/benchmarks/mobile-video-codec-benchmark.html>  
```
- - -

[Home](/benchmarks/mobile-video-codec-benchmark.html)[Benchmarking Methodology](/benchmarks/mobile-video-codec-benchmark-methodology.html)[Mobile Video Codec Ranking](/benchmarks/mobile-video-codec-benchmark.html#ranking)[How to Benchmark New Device](/benchmarks/mobile-video-codec-benchmark.html#how_to_benchmark)[Cite Us](/benchmarks/mobile-video-codec-benchmark.html#cite)[Contact us](/benchmarks/mobile-video-codec-benchmark.html#contacts)

|          | Type a model to search        | all  | all      | Type a decoder to search          | all  |        |              |                                         |
| -------- | ----------------------------- | ---- | -------- | --------------------------------- | ---- | ------ | ------------ | --------------------------------------- |
| rank     | model                         | year | standard | video-decoder                     | type | υ, fps | δscreen, %/h | δplay - playback power consumption, %/h |
| **1**    | ZTE BLADE V9                  | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 133    | 0.74\*       | 1.84                                    |
| **2**    | ZTE Blade 20 Smart            | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 135    | 0.92         | 1.92                                    |
| **3**    | Xiaomi POCO X3                | 2020 | AV1      | c2.android.av1.decoder            | sw   | 1069   | 1.64         | 1.93                                    |
| **4**    | Xiaomi Mi A2 Lite             | 2018 | AV1      | c2.android.av1.decoder            | sw   | 750    | 1.72         | 2.04                                    |
| **5**    | ZTE Blade 20 Smart            | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 184    | 0.92         | 2.04                                    |
| **6**    | vivo Y11                      | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 169    | 1.2          | 2.06                                    |
| **7**    | Samsung Galaxy A21s           | 2020 | H.264    | omx.exynos.avc.dec                | hw   | 144    | 1.3          | 2.08                                    |
| **8**    | Xiaomi Redmi 5 Plus           | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 145\*  | 1.0\*        | 2.25\*                                  |
| **9**    | ZTE BLADE V9                  | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 119\*  | 0.83\*       | 2.29                                    |
| **10**   | Realme XT                     | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 159    | 1.32         | 2.29                                    |
| **11**   | vivo Y11                      | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 162    | 1.44\*       | 2.29                                    |
| **12**   | ASUS ZenFone Max Pro M1       | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 142    | 1.95         | 2.31                                    |
| **13**   | SANTIN halove                 | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 106    | 0.65         | 2.33                                    |
| **14**   | ZTE BLADE V9                  | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 110\*  | 0.83\*       | 2.34\*                                  |
| **15**   | Samsung Galaxy A21s           | 2020 | VP8      | omx.exynos.vp8.dec                | hw   | 170    | 1.3          | 2.34                                    |
| **16**   | Xiaomi Mi A2 Lite             | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 192    | 1.72         | 2.36                                    |
| **17**   | Xiaomi Redmi 5                | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 139    | 1.2          | 2.36                                    |
| **18**   | Xiaomi Redmi 5                | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 135    | 1.2          | 2.37                                    |
| **19**   | Realme XT                     | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 157    | 1.32         | 2.38                                    |
| **20**   | ZTE Blade 20 Smart            | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 178    | 0.92         | 2.39                                    |
| **21**   | Xiaomi POCO X3                | 2020 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 208    | 1.63         | 2.44                                    |
| **22**   | Realme XT                     | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 145    | 1.32         | 2.46                                    |
| **23**   | ZTE Blade 20 Smart            | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 143    | 0.92         | 2.47                                    |
| **24**   | Xiaomi POCO X3                | 2020 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 196\*  | 1.63         | 2.49                                    |
| **25**   | ZTE BLADE V9                  | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 88\*   | 0.83\*       | 2.49\*                                  |
| **26**   | Xiaomi POCO X3                | 2020 | H.264    | c2.qti.avc.decoder                | hw   | 162    | 1.63         | 2.49                                    |
| **27**   | Xiaomi Redmi 9C               | 2020 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 94     | 1.35         | 2.5                                     |
| **28**   | Realme XT                     | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 143    | 1.32         | 2.5                                     |
| **29**   | Xiaomi Redmi 7A               | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 164    | 1.42         | 2.52                                    |
| **30**   | Xiaomi POCO X3                | 2020 | H.264    | omx.qcom.video.decoder.avc        | hw   | 182    | 1.63         | 2.52                                    |
| **31**   | Huawei Honor 20 Pro           | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 244    | 1.87\*       | 2.56\*                                  |
| **32**   | Xiaomi POCO X3                | 2020 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 175    | 1.63         | 2.57                                    |
| **33**   | Xiaomi Redmi 9C               | 2020 | H.264    | omx.mtk.video.decoder.avc         | hw   | 94     | 1.35         | 2.58                                    |
| **34**   | Xiaomi Redmi 9C               | 2020 | H.264    | omx.mtk.video.decoder.avc.l3      | hw   | 94     | 1.35         | 2.62                                    |
| **35**   | Xiaomi Redmi 9                | 2020 | H.264    | omx.mtk.video.decoder.avc         | hw   | 109    | 1.41         | 2.65                                    |
| **36**   | ZTE BLADE V9                  | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 89\*   | 0.83\*       | 2.65\*                                  |
| **37**   | Xiaomi Redmi 9C               | 2020 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 95     | 1.35         | 2.66                                    |
| **38**   | Huawei Honor 20 Pro           | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 232    | 1.87\*       | 2.68                                    |
| **39**   | Xiaomi Redmi 9                | 2020 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 108    | 1.41         | 2.72                                    |
| **40**   | vivo Y19                      | 2019 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 104    | 1.5          | 2.72                                    |
| **41**   | Xiaomi Redmi 9                | 2020 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 110    | 1.51         | 2.73                                    |
| **42**   | Google Pixel 3a               | 2019 | VP9      | c2.qti.vp9.decoder                | hw   | 117    | 1.3          | 2.74                                    |
| **43**   | Xiaomi Redmi Note 4           | 2017 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 112    | 1.29         | 2.75                                    |
| **44**   | Huawei Honor 20               | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 232    | 1.94         | 2.75                                    |
| **45**   | Xiaomi Redmi 9                | 2020 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 96     | 1.41         | 2.77                                    |
| **46**   | Xiaomi Redmi 9                | 2020 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 146    | 1.41         | 2.77                                    |
| **47**   | Huawei Honor 20               | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 243    | 1.94         | 2.78                                    |
| **48**   | Xiaomi Redmi 9                | 2020 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 145    | 1.41         | 2.78                                    |
| **49**   | Huawei Honor 20 Pro           | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 206    | 1.87\*       | 2.78                                    |
| **50**   | LG X Power                    | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 86     | 1.24         | 2.79\*                                  |
| **51**   | ASUS ZenFone Max Pro M1       | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 131    | 1.85         | 2.82                                    |
| **52**   | Google Pixel 3a               | 2019 | H.264    | c2.qti.avc.decoder                | hw   | 137    | 1.3          | 2.85                                    |
| **53**   | Xiaomi Pocophone F1           | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 250    | 2.04\*       | 2.86\*                                  |
| **54**   | vivo Y19                      | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 102    | 1.5          | 2.86                                    |
| **55**   | Huawei Honor 20               | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 208    | 1.94         | 2.87                                    |
| **56**   | Huawei Honor 8S               | 2019 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 179    | 1.52         | 2.87                                    |
| **57**   | Huawei Honor 20 Pro           | 2019 | VP9      | omx.hisi.video.decoder.vp9        | hw   | 203    | 1.87\*       | 2.88                                    |
| **58**   | vivo Y19                      | 2019 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 93     | 1.5          | 2.89                                    |
| **59**   | vivo Y19                      | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 99     | 1.5          | 2.89                                    |
| **60**   | ZTE Blade 20 Smart            | 2019 | H.264    | omx.google.h264.decoder           | sw   | 198    | 0.92         | 2.9                                     |
| **61**   | Huawei Honor 20               | 2019 | VP9      | omx.hisi.video.decoder.vp9        | hw   | 205    | 1.94         | 2.91                                    |
| **62**   | ASUS ZenFone Max Pro M1       | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 135    | 1.85         | 2.91                                    |
| **63**   | LG X Power                    | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 87     | 1.24         | 2.92\*                                  |
| **64**   | ZTE BLADE V9                  | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 74     | 0.9          | 2.92                                    |
| **65**   | vivo Y19                      | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 106    | 1.5          | 2.93                                    |
| **66**   | Xiaomi Redmi Note 8T          | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 155    | 1.97         | 2.95                                    |
| **67**   | Huawei P30                    | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 232    | 2.09         | 2.96                                    |
| **68**   | Huawei Honor 8S               | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 175    | 1.52         | 2.98                                    |
| **69**   | Huawei Honor 8S               | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 179    | 1.52         | 2.98                                    |
| **70**   | Huawei P30                    | 2019 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 237    | 2.09         | 2.99                                    |
| **71**   | Huawei P30                    | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 241    | 2.09         | 2.99                                    |
| **72**   | Xiaomi Redmi Note 8 Pro       | 2019 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 117    | 1.66         | 3.01                                    |
| **73**   | Samsung Galaxy J6             | 2018 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 213    | 1.82         | 3.01                                    |
| **74**   | Samsung Galaxy S20            | 2020 | H.264    | omx.exynos.avc.dec                | hw   | 149    | 2.02         | 3.02                                    |
| **75**   | vivo Y19                      | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 171    | 1.5          | 3.03                                    |
| **76**   | Sony Xperia XA1 Plus          | 2017 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 68     | 1.21\*       | 3.04\*                                  |
| **77**   | Asus Google Nexus 7           | 2012 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 203    | 1.38         | 3.04                                    |
| **78**   | Asus Zenfone Max (M1) ZB555KL | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 159    | 1.91         | 3.05                                    |
| **79**   | ZTE Blade 20 Smart            | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 158    | 0.92         | 3.05                                    |
| **80**   | Xiaomi Redmi 9C               | 2020 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 107    | 1.33         | 3.05                                    |
| **81**   | Xiaomi Redmi 5                | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 130    | 1.57\*       | 3.06\*                                  |
| **82**   | Xiaomi Redmi Note 8T          | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 152    | 1.82         | 3.06                                    |
| **83**   | Xiaomi Pocophone F1           | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 230    | 2.04\*       | 3.07\*                                  |
| **84**   | Huawei Honor 20               | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 216    | 1.88         | 3.09                                    |
| **85**   | Xiaomi Mi A3                  | 2019 | AV1      | c2.android.av1.decoder            | sw   | 622    | 2.8          | 3.09                                    |
| **86**   | Xiaomi Redmi 9C               | 2020 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 108    | 1.33         | 3.09                                    |
| **87**   | Samsung Galaxy S20            | 2020 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 150    | 2.02         | 3.1                                     |
| **88**   | ASUS ZenFone Max Pro M1       | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 134    | 1.95         | 3.11                                    |
| **89**   | ZTE Blade A5 (2019)           | 2019 | VP9      | omx.sprd.vp9.decoder              | hw   | 180    | 1.69         | 3.12                                    |
| **90**   | Xiaomi Redmi 5 Plus           | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 127\*  | 2.09\*       | 3.12\*                                  |
| **91**   | Xiaomi Redmi Note 7           | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 135    | 2.19         | 3.12                                    |
| **92**   | Xiaomi Redmi 9C               | 2020 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 97     | 1.35         | 3.12                                    |
| **93**   | Sony Xperia E5                | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 113    | 1.01         | 3.13                                    |
| **94**   | Samsung Galaxy J2 Prime       | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 118    | 0.76         | 3.13                                    |
| **95**   | Samsung Galaxy S20            | 2020 | VP8      | omx.exynos.vp8.dec                | hw   | 122    | 2.02         | 3.14                                    |
| **96**   | Samsung Galaxy J6             | 2018 | VP8      | omx.exynos.vp8.dec                | hw   | 171    | 1.82         | 3.14                                    |
| **97**   | Xiaomi Mi A2 Lite             | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 176    | 1.72         | 3.14                                    |
| **98**   | Xiaomi Redmi 5 Plus           | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 123\*  | 2.09\*       | 3.15\*                                  |
| **99**   | Huawei P30                    | 2019 | VP9      | omx.hisi.video.decoder.vp9        | hw   | 206    | 2.09         | 3.15                                    |
| **100**  | Huawei Honor 20               | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 219    | 1.88         | 3.16                                    |
| **101**  | Huawei Y9 Prime (2019)        | 2019 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 134    | 1.93         | 3.16                                    |
| **102**  | Xiaomi Redmi Note 7           | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 137    | 2.19         | 3.16                                    |
| **103**  | ZTE Blade 20 Smart            | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 185    | 0.92         | 3.16                                    |
| **104**  | Samsung Galaxy A6+            | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 150\*  | 1.83\*       | 3.16\*                                  |
| **105**  | Samsung Galaxy A21s           | 2020 | VP8      | omx.sec.vp8.dec                   | hw   | 90     | 1.3          | 3.16                                    |
| **106**  | Xiaomi Redmi 5                | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 124    | 1.57\*       | 3.17\*                                  |
| **107**  | Motorola Moto Z2 Play         | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 187    | 1.83         | 3.17                                    |
| **108**  | Huawei P30                    | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 207    | 2.09         | 3.18                                    |
| **109**  | Xiaomi Redmi 9                | 2020 | VP8      | c2.android.vp8.decoder            | sw   | 121    | 1.41         | 3.19                                    |
| **110**  | Huawei Y9 Prime (2019)        | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 133    | 1.93         | 3.2                                     |
| **111**  | Xiaomi Redmi Note 7           | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 138    | 2.19         | 3.21                                    |
| **112**  | vivo Y11                      | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 136    | 1.44\*       | 3.21                                    |
| **113**  | ZTE Blade A5 (2019)           | 2019 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 203    | 1.77         | 3.23                                    |
| **114**  | vivo S1                       | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 98     | 1.66         | 3.23                                    |
| **115**  | Samsung Galaxy Tab A 10.1     | 2019 | HEVC     | omx.exynos.hevc.dec               | hw   | 186    | 2.29         | 3.23                                    |
| **116**  | Samsung Galaxy A5             | 2017 | HEVC     | omx.exynos.hevc.dec               | hw   | 135    | 1.87         | 3.23                                    |
| **117**  | ZTE BLADE V9                  | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 82     | 0.9          | 3.24                                    |
| **118**  | vivo Y11                      | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 101    | 1.44\*       | 3.24                                    |
| **119**  | vivo S1 Pro                   | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 201    | 2.35         | 3.24                                    |
| **120**  | ASUS ZenFone Max Pro M1       | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 131    | 1.85         | 3.24                                    |
| **121**  | Xiaomi Redmi 9                | 2020 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 109    | 1.41         | 3.25                                    |
| **122**  | Xiaomi Redmi 9                | 2020 | VP8      | omx.google.vp8.decoder            | sw   | 121    | 1.41         | 3.25                                    |
| **123**  | Huawei Y9 Prime (2019)        | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 132    | 1.93         | 3.27                                    |
| **124**  | Huawei Honor 20 Pro           | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 220    | 2.13         | 3.27                                    |
| **125**  | Samsung Galaxy S20            | 2020 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 258    | 2.02         | 3.28                                    |
| **126**  | Xiaomi Mi 9 Lite              | 2019 | AV1      | c2.android.av1.decoder            | sw   | 617    | 3.03         | 3.3                                     |
| **127**  | vivo S1                       | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 105    | 1.66         | 3.31                                    |
| **128**  | Samsung Galaxy Tab A 10.1     | 2019 | VP9      | omx.exynos.vp9.dec                | hw   | 160    | 2.23         | 3.31                                    |
| **129**  | Xiaomi Redmi 9C               | 2020 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 90     | 1.35         | 3.31                                    |
| **130**  | Samsung Galaxy J2 Prime       | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 124    | 0.76         | 3.31                                    |
| **131**  | Samsung Galaxy Note9          | 2018 | HEVC     | omx.exynos.hevc.dec               | hw   | 248    | 1.94         | 3.32                                    |
| **132**  | Samsung Galaxy A8             | 2018 | H.264    | omx.exynos.avc.dec                | hw   | 158    | 1.82\*       | 3.32                                    |
| **133**  | Xiaomi Redmi 7A               | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 138    | 1.54         | 3.33                                    |
| **134**  | Samsung Galaxy A6+            | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 153\*  | 1.83\*       | 3.33\*                                  |
| **135**  | Huawei Honor 20 Pro           | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 233    | 2.13         | 3.34                                    |
| **136**  | vivo S1 Pro                   | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 182    | 2.35         | 3.34                                    |
| **137**  | Huawei Honor 20               | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 188    | 1.88         | 3.35                                    |
| **138**  | OnePlus 5 (A5000)             | 2017 | AV1      | c2.android.av1.decoder            | sw   | 702    | 2.93         | 3.35                                    |
| **139**  | Samsung Galaxy A3             | 2017 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 148    | 1.99         | 3.35                                    |
| **140**  | vivo Y11                      | 2019 | H.264    | omx.google.h264.decoder           | sw   | 94     | 1.44\*       | 3.36                                    |
| **141**  | Xiaomi Pocophone F1           | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 230    | 2.04\*       | 3.36                                    |
| **142**  | Huawei Honor 20               | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 186    | 1.88         | 3.37                                    |
| **143**  | vivo S1 Pro                   | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 208    | 2.35         | 3.38                                    |
| **144**  | Samsung Galaxy J7             | 2016 | HEVC     | omx.exynos.hevc.dec               | hw   | 136    | 2.08         | 3.39                                    |
| **145**  | Huawei Y9 Prime (2019)        | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 113    | 1.93         | 3.39                                    |
| **146**  | Google Pixel 3a               | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 137    | 1.3          | 3.39                                    |
| **147**  | Honor 9X                      | 2019 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 131    | 2.02         | 3.4                                     |
| **148**  | Samsung Galaxy S20            | 2020 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 388    | 2.02         | 3.43                                    |
| **149**  | Samsung Galaxy A8             | 2018 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 161    | 1.82\*       | 3.45\*                                  |
| **150**  | Samsung Galaxy S20            | 2020 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 259    | 2.02         | 3.47                                    |
| **151**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 102    | 1.81         | 3.47                                    |
| **152**  | LG X Power                    | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 67     | 1.26         | 3.47                                    |
| **153**  | Samsung Galaxy A6+            | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 131\*  | 1.83\*       | 3.48\*                                  |
| **154**  | ZTE Blade A5 (2019)           | 2019 | H.264    | omx.sprd.h264.decoder             | hw   | 131    | 1.77         | 3.49                                    |
| **155**  | ZTE Blade A5 (2019)           | 2019 | VP8      | omx.sprd.vpx.decoder              | hw   | 182    | 1.77         | 3.49                                    |
| **156**  | Samsung Galaxy A8             | 2018 | HEVC     | omx.exynos.hevc.dec               | hw   | 157    | 2.0          | 3.49                                    |
| **157**  | Samsung Galaxy A3             | 2017 | H.264    | omx.exynos.avc.dec                | hw   | 141    | 1.99         | 3.49                                    |
| **158**  | Xiaomi Redmi Note 6 Pro       | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 195    | 2.79         | 3.51                                    |
| **159**  | Xiaomi Redmi 9                | 2020 | H.264    | omx.google.h264.decoder           | sw   | 79     | 1.41         | 3.51                                    |
| **160**  | Huawei Honor 8S               | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 108    | 1.52         | 3.51                                    |
| **161**  | Samsung Galaxy J7             | 2016 | H.264    | omx.exynos.avc.dec                | hw   | 138    | 2.09         | 3.52                                    |
| **162**  | Samsung Galaxy A8             | 2018 | VP9      | omx.exynos.vp9.dec                | hw   | 144    | 2.0          | 3.52                                    |
| **163**  | vivo Y19                      | 2019 | H.264    | omx.google.h264.decoder           | sw   | 127    | 1.5          | 3.52                                    |
| **164**  | Samsung Galaxy A51            | 2019 | HEVC     | omx.exynos.hevc.dec               | hw   | 123    | 2.11         | 3.55                                    |
| **165**  | Google Pixel 3a               | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 140    | 1.3          | 3.55                                    |
| **166**  | Huawei P30                    | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 211    | 2.29         | 3.56                                    |
| **167**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 150    | 2.49         | 3.57                                    |
| **168**  | vivo Y19                      | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 121    | 1.5          | 3.57                                    |
| **169**  | Samsung Galaxy A7             | 2018 | H.264    | omx.exynos.avc.dec                | hw   | 164    | 2.29\*       | 3.58\*                                  |
| **170**  | vivo S1 Pro                   | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 183    | 2.35         | 3.58                                    |
| **171**  | Xiaomi Redmi 7A               | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 101    | 1.42         | 3.61                                    |
| **172**  | Nokia 2.2                     | 2019 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 118    | 1.91         | 3.61                                    |
| **173**  | Xiaomi Redmi 5 Plus           | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 135\*  | 2.09\*       | 3.62\*                                  |
| **174**  | Samsung Galaxy S20            | 2020 | VP8      | omx.google.vp8.decoder            | sw   | 236    | 2.02         | 3.64                                    |
| **175**  | Samsung Galaxy A7             | 2018 | VP9      | omx.exynos.vp9.dec                | hw   | 145    | 2.29\*       | 3.64\*                                  |
| **176**  | Samsung Galaxy J3             | 2017 | H.264    | omx.exynos.avc.dec                | hw   | 185    | 2.33         | 3.64                                    |
| **177**  | Sony Xperia XA1 Plus          | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 64     | 1.69         | 3.64                                    |
| **178**  | Xiaomi Pocophone F1           | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 244    | 2.04\*       | 3.65                                    |
| **179**  | Huawei Honor 20 Pro           | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 180    | 2.13         | 3.66                                    |
| **180**  | Xiaomi Mi A2 Lite             | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 144\*  | 2.58\*       | 3.67\*                                  |
| **181**  | vivo S1                       | 2019 | H.264    | omx.google.h264.decoder           | sw   | 109    | 1.66         | 3.67                                    |
| **182**  | Huawei P30                    | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 211    | 2.29         | 3.67                                    |
| **183**  | Huawei Y9                     | 2018 | HEVC     | omx.img.msvdx.decoder.hevc        | hw   | 169    | 2.27         | 3.67                                    |
| **184**  | Samsung Galaxy A51            | 2019 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 123    | 2.11         | 3.68                                    |
| **185**  | Xiaomi Redmi 9                | 2020 | H.264    | c2.android.avc.decoder            | sw   | 78     | 1.51         | 3.68                                    |
| **186**  | Samsung Galaxy A7             | 2018 | VP8      | omx.exynos.vp8.dec                | hw   | 144    | 2.29\*       | 3.69\*                                  |
| **187**  | Huawei Y6 Pro                 | 2015 | H.264    | omx.mtk.video.decoder.avc         | hw   | 136    | 1.81         | 3.69                                    |
| **188**  | Samsung Galaxy J7             | 2015 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 156    | 2.44\*       | 3.7\*                                   |
| **189**  | vivo Y19                      | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 146    | 1.5          | 3.7                                     |
| **190**  | Samsung Galaxy A3             | 2017 | VP8      | omx.exynos.vp8.dec                | hw   | 128    | 1.99         | 3.7                                     |
| **191**  | Samsung Galaxy A51            | 2019 | H.264    | omx.exynos.avc.dec                | hw   | 123    | 2.11         | 3.71                                    |
| **192**  | Huawei Y6 Pro                 | 2015 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 134    | 1.81         | 3.71                                    |
| **193**  | Huawei Honor 20 Pro           | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 190    | 2.13         | 3.71                                    |
| **194**  | Samsung Galaxy J7 Prime       | 2016 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 176\*  | 2.09\*       | 3.72                                    |
| **195**  | Sony Xperia XA1 Ultra         | 2017 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 70     | 1.45         | 3.73                                    |
| **196**  | Xiaomi Redmi 9C               | 2020 | VP8      | c2.android.vp8.decoder            | sw   | 69     | 1.33         | 3.73                                    |
| **197**  | Sony Xperia XA1 Plus          | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 84     | 1.21\*       | 3.74\*                                  |
| **198**  | Honor 9X                      | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 147    | 2.02         | 3.74                                    |
| **199**  | ASUS ZenFone Max Pro M1       | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 62     | 1.95         | 3.74                                    |
| **200**  | Huawei Honor 20               | 2019 | H.264    | omx.google.h264.decoder           | sw   | 162    | 1.88         | 3.75                                    |
| **201**  | Samsung Galaxy A8             | 2018 | VP8      | omx.exynos.vp8.dec                | hw   | 143    | 1.82\*       | 3.75                                    |
| **202**  | Samsung Galaxy J6+            | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 160    | 2.0          | 3.76                                    |
| **203**  | Huawei Honor 20 Pro           | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 189    | 1.87\*       | 3.76                                    |
| **204**  | Huawei nova 3                 | 2018 | H.264    | omx.hisi.video.decoder.avc        | hw   | 145    | 2.29         | 3.76                                    |
| **205**  | Xiaomi Redmi Note 5           | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 199    | 2.91\*       | 3.77\*                                  |
| **206**  | Honor 7X                      | 2017 | HEVC     | omx.img.msvdx.decoder.hevc        | hw   | 178    | 2.34         | 3.77                                    |
| **207**  | Xiaomi Redmi Note 4           | 2017 | HEVC     | c2.android.hevc.decoder           | sw   | 88     | 1.29         | 3.79                                    |
| **208**  | Honor 20s                     | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 134    | 2.42         | 3.79                                    |
| **209**  | Samsung Galaxy A7             | 2018 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 178    | 2.29\*       | 3.8\*                                   |
| **210**  | Huawei Honor 20               | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 189    | 1.94         | 3.8                                     |
| **211**  | Samsung Galaxy A20s           | 2019 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 162    | 2.81         | 3.8                                     |
| **212**  | Huawei Y9                     | 2018 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 176    | 2.44         | 3.81                                    |
| **213**  | Xiaomi Redmi 9C               | 2020 | VP8      | omx.google.vp8.decoder            | sw   | 69     | 1.33         | 3.81                                    |
| **214**  | Nokia 2.2                     | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 143    | 1.91         | 3.81                                    |
| **215**  | Huawei P30                    | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 167    | 2.29         | 3.82                                    |
| **216**  | Google Pixel 3a               | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 117    | 1.3          | 3.83                                    |
| **217**  | vivo Y19                      | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 178    | 1.5          | 3.83                                    |
| **218**  | Honor 20s                     | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 134    | 2.42         | 3.84                                    |
| **219**  | Xiaomi Redmi 9                | 2020 | VP9      | c2.android.vp9.decoder            | sw   | 123    | 1.41         | 3.84                                    |
| **220**  | Samsung Galaxy A20            | 2019 | H.264    | omx.exynos.avc.dec                | hw   | 205    | 2.54         | 3.84                                    |
| **221**  | Samsung Galaxy S8+            | 2017 | H.264    | omx.exynos.avc.dec                | hw   | 133    | 2.19         | 3.85                                    |
| **222**  | vivo Y11                      | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 92     | 1.44\*       | 3.85                                    |
| **223**  | Samsung Galaxy J3             | 2017 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 206    | 2.33         | 3.86                                    |
| **224**  | vivo Y11                      | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 117    | 1.44\*       | 3.87                                    |
| **225**  | Honor 9X                      | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 128    | 2.4\*        | 3.87\*                                  |
| **226**  | SANTIN halove                 | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 49     | 0.65         | 3.88                                    |
| **227**  | Honor 9X                      | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 130    | 2.4\*        | 3.88\*                                  |
| **228**  | Honor 20 lite                 | 2019 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 135    | 2.41         | 3.89                                    |
| **229**  | Xiaomi Redmi 5                | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 131    | 1.57\*       | 3.89                                    |
| **230**  | Honor 9X                      | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 147    | 2.02         | 3.89                                    |
| **231**  | Xiaomi Redmi 9C               | 2020 | VP9      | omx.google.vp9.decoder            | sw   | 76     | 1.33         | 3.89                                    |
| **232**  | Honor 7X                      | 2017 | H.264    | omx.img.msvdx.decoder.avc         | hw   | 172    | 2.31         | 3.9                                     |
| **233**  | ZTE BLADE V9                  | 2018 | H.264    | omx.google.h264.decoder           | sw   | 115    | 0.74\*       | 3.9                                     |
| **234**  | Sony Xperia XA1 Plus          | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 65     | 1.69         | 3.9                                     |
| **235**  | Samsung Galaxy Grand Prime    | 2014 | VP8      | omx.sprd.vpx.decoder              | hw   | 187    | 2.21         | 3.91                                    |
| **236**  | Huawei Honor 20 Pro           | 2019 | H.264    | omx.google.h264.decoder           | sw   | 153    | 2.13         | 3.91                                    |
| **237**  | Asus Zenfone 3 Max            | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 134    | 2.04         | 3.91                                    |
| **238**  | Huawei Y9                     | 2018 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 155    | 2.44         | 3.91                                    |
| **239**  | Huawei MediaPad T5            | 2018 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 206    | 2.7          | 3.92                                    |
| **240**  | Nokia 2.2                     | 2019 | H.264    | omx.mtk.video.decoder.avc.l3      | hw   | 142    | 1.91         | 3.92                                    |
| **241**  | Samsung Galaxy J7 Prime       | 2016 | VP8      | omx.exynos.vp8.dec                | hw   | 146\*  | 2.09\*       | 3.93\*                                  |
| **242**  | Samsung Galaxy A7             | 2018 | HEVC     | omx.exynos.hevc.dec               | hw   | 180    | 2.63         | 3.93                                    |
| **243**  | Huawei Honor 8X               | 2018 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 127    | 2.29         | 3.94                                    |
| **244**  | Huawei Y9                     | 2018 | H.264    | omx.img.msvdx.decoder.avc         | hw   | 169    | 2.44         | 3.94                                    |
| **245**  | Huawei nova 3                 | 2018 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 134    | 2.29         | 3.95                                    |
| **246**  | Asus Zenfone 3 Max            | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 135    | 2.04         | 3.95                                    |
| **247**  | vivo S1                       | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 176    | 1.66         | 3.98                                    |
| **248**  | Huawei Honor 20               | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 168    | 1.94         | 3.98                                    |
| **249**  | Samsung Galaxy S20            | 2020 | VP8      | c2.android.vp8.decoder            | sw   | 227    | 2.02         | 3.99                                    |
| **250**  | Honor 20s                     | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 116    | 2.42         | 4.0                                     |
| **251**  | Honor 7X                      | 2017 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 179    | 2.31         | 4.0                                     |
| **252**  | Huawei nova 3                 | 2018 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 151    | 2.29         | 4.0                                     |
| **253**  | Honor 9X                      | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 110    | 2.4\*        | 4.0                                     |
| **254**  | Xiaomi Mi A3                  | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 154    | 2.8          | 4.01                                    |
| **255**  | Honor 20 lite                 | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 133    | 2.41         | 4.01                                    |
| **256**  | Huawei MediaPad T5            | 2018 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 191    | 2.7          | 4.01                                    |
| **257**  | Samsung Galaxy A20            | 2019 | VP9      | omx.exynos.vp9.dec                | hw   | 182    | 2.54         | 4.01                                    |
| **258**  | Xiaomi Redmi 9                | 2020 | HEVC     | c2.android.hevc.decoder           | sw   | 101    | 1.41         | 4.03                                    |
| **259**  | Xiaomi Mi A3                  | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 148    | 2.8          | 4.03                                    |
| **260**  | Samsung Galaxy J7             | 2015 | VP8      | omx.exynos.vp8.dec                | hw   | 133    | 2.44\*       | 4.04\*                                  |
| **261**  | Xiaomi Redmi Note 8T          | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 150    | 3.17\*       | 4.04\*                                  |
| **262**  | Xiaomi Redmi Note 7           | 2019 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 142    | 2.19         | 4.04                                    |
| **263**  | Samsung Galaxy S8+            | 2017 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 131    | 2.19         | 4.04                                    |
| **264**  | Huawei Honor 20 Pro           | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 168    | 1.87\*       | 4.04                                    |
| **265**  | Samsung Galaxy A3             | 2017 | HEVC     | omx.exynos.hevc.dec               | hw   | 148    | 1.99         | 4.04                                    |
| **266**  | Honor 20 lite                 | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 134    | 2.41         | 4.05                                    |
| **267**  | Xiaomi Redmi Note 4           | 2017 | VP8      | c2.android.vp8.decoder            | sw   | 75     | 1.29         | 4.05                                    |
| **268**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 155    | 2.49         | 4.05                                    |
| **269**  | Huawei Honor 8X               | 2018 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 127    | 2.29         | 4.05                                    |
| **270**  | Xiaomi Mi A3                  | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 152    | 2.8          | 4.05                                    |
| **271**  | Xiaomi Mi A3                  | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 147    | 2.8          | 4.05                                    |
| **272**  | Xiaomi Redmi 7A               | 2019 | H.264    | omx.google.h264.decoder           | sw   | 93     | 1.42         | 4.07                                    |
| **273**  | Huawei Honor 8X               | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 144    | 2.29         | 4.07                                    |
| **274**  | Samsung Galaxy Grand Prime    | 2014 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 199    | 2.21         | 4.08                                    |
| **275**  | Samsung Galaxy J6             | 2018 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 126    | 1.82         | 4.09                                    |
| **276**  | Samsung Galaxy A8             | 2018 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 149\*  | 1.82\*       | 4.09\*                                  |
| **277**  | vivo S1                       | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 150    | 1.66         | 4.09                                    |
| **278**  | Samsung Galaxy A70            | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 206    | 2.64         | 4.09                                    |
| **279**  | Sony Xperia E5                | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 124    | 1.01         | 4.09                                    |
| **280**  | Xiaomi Pocophone F1           | 2018 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 258    | 2.38         | 4.09                                    |
| **281**  | Samsung Galaxy A20            | 2019 | VP8      | omx.exynos.vp8.dec                | hw   | 198    | 2.54         | 4.09                                    |
| **282**  | Honor 10                      | 2018 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 158    | 2.52         | 4.11                                    |
| **283**  | Xiaomi Redmi 9                | 2020 | HEVC     | omx.google.hevc.decoder           | sw   | 100    | 1.41         | 4.11                                    |
| **284**  | Huawei nova 3                 | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 117    | 2.15         | 4.11                                    |
| **285**  | ASUS ZenFone Max Pro M1       | 2018 | H.264    | omx.google.h264.decoder           | sw   | 92     | 1.85         | 4.11\*                                  |
| **286**  | Samsung Galaxy S20            | 2020 | VP8      | omx.sec.vp8.dec                   | hw   | 214    | 2.02         | 4.12                                    |
| **287**  | Samsung Galaxy A70            | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 134    | 2.85         | 4.12                                    |
| **288**  | Huawei P30                    | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 162    | 2.29         | 4.12                                    |
| **289**  | Huawei nova 3                 | 2018 | VP9      | omx.hisi.video.decoder.vp9        | hw   | 112    | 2.15         | 4.12                                    |
| **290**  | Nokia 2.2                     | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 143    | 1.91         | 4.12                                    |
| **291**  | Xiaomi Redmi Note 8T          | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 157    | 3.17\*       | 4.13\*                                  |
| **292**  | Samsung Galaxy A6+            | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 119\*  | 2.61\*       | 4.13\*                                  |
| **293**  | Huawei Honor 8S               | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 94     | 1.52         | 4.13                                    |
| **294**  | Xiaomi Redmi Note 4           | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 116\*  | 2.63\*       | 4.15\*                                  |
| **295**  | Honor 7X                      | 2017 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 158    | 2.31         | 4.15                                    |
| **296**  | Huawei P30                    | 2019 | H.264    | c2.android.avc.decoder            | sw   | 150    | 2.29         | 4.15                                    |
| **297**  | Xiaomi Mi A2 Lite             | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 144\*  | 2.58\*       | 4.16\*                                  |
| **298**  | LG X Power                    | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 61     | 1.26         | 4.16                                    |
| **299**  | Huawei Honor 20               | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 164    | 1.94         | 4.17                                    |
| **300**  | Samsung Galaxy J7 Prime       | 2016 | HEVC     | omx.exynos.hevc.dec               | hw   | 130    | 2.37         | 4.17                                    |
| **301**  | Xiaomi Redmi Note 5           | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 179\*  | 3.28\*       | 4.17\*                                  |
| **302**  | Huawei Mate 10 Lite           | 2017 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 184    | 2.67         | 4.18                                    |
| **303**  | Xiaomi Redmi Note 4           | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 110\*  | 2.78\*       | 4.19\*                                  |
| **304**  | Xiaomi Redmi Note 6 Pro       | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 197    | 2.79         | 4.19                                    |
| **305**  | Honor 10                      | 2018 | H.264    | omx.hisi.video.decoder.avc        | hw   | 153    | 2.52         | 4.19                                    |
| **306**  | OnePlus 5 (A5000)             | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 222    | 2.93         | 4.19                                    |
| **307**  | Samsung Galaxy A51            | 2019 | VP8      | omx.exynos.vp8.dec                | hw   | 95     | 2.11         | 4.19                                    |
| **308**  | Xiaomi Redmi Note 6 Pro       | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 197    | 2.79         | 4.21                                    |
| **309**  | Samsung Galaxy A50            | 2019 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 110    | 2.5          | 4.22                                    |
| **310**  | Samsung Galaxy J7 Prime       | 2016 | H.264    | omx.exynos.avc.dec                | hw   | 131    | 2.37         | 4.22                                    |
| **311**  | Samsung Galaxy A70            | 2019 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 175    | 2.64         | 4.23                                    |
| **312**  | OnePlus 5 (A5000)             | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 230    | 2.93         | 4.23                                    |
| **313**  | Honor 10                      | 2018 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 163    | 2.52         | 4.24                                    |
| **314**  | Dexp Ursus N570               | 2019 | H.264    | omx.sprd.h264.decoder             | hw   | 190    | 2.74         | 4.24                                    |
| **315**  | Samsung Galaxy C5 Pro         | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 133    | 2.13         | 4.24                                    |
| **316**  | Samsung Galaxy A20s           | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 145    | 2.81         | 4.24                                    |
| **317**  | OnePlus 5 (A5000)             | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 214    | 2.93         | 4.24                                    |
| **318**  | Huawei P30                    | 2019 | H.264    | omx.google.h264.decoder           | sw   | 151    | 2.29         | 4.24                                    |
| **319**  | OnePlus 5T                    | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 213    | 2.87         | 4.26                                    |
| **320**  | Honor 20 lite                 | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 114    | 2.41         | 4.26                                    |
| **321**  | Sony XPERIA XZ1 Compact       | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 259    | 3.59         | 4.26                                    |
| **322**  | OnePlus 5T                    | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 200    | 2.87         | 4.26                                    |
| **323**  | Sony Xperia XA1 Ultra         | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 67     | 1.45         | 4.26                                    |
| **324**  | Google Pixel 3a               | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 114    | 1.3          | 4.26                                    |
| **325**  | OnePlus 5T                    | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 203    | 2.87         | 4.28                                    |
| **326**  | Xiaomi Redmi 7A               | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 72     | 1.54         | 4.28                                    |
| **327**  | LG X Power                    | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 63     | 1.24         | 4.28                                    |
| **328**  | ZTE BLADE V9                  | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 78     | 0.74\*       | 4.28                                    |
| **329**  | vivo Y11                      | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 69     | 1.44\*       | 4.28                                    |
| **330**  | OnePlus 5 (A5000)             | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 216    | 2.93         | 4.29                                    |
| **331**  | Honor 8 Pro                   | 2017 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 136    | 2.64         | 4.29                                    |
| **332**  | Honor 20 lite                 | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 145    | 2.27         | 4.3                                     |
| **333**  | Samsung Galaxy A70            | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 131    | 2.85         | 4.3                                     |
| **334**  | Huawei Honor 20 Pro           | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 163    | 1.87\*       | 4.3                                     |
| **335**  | Xiaomi Redmi 4 (4X)           | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 118    | 3.14         | 4.3                                     |
| **336**  | Xiaomi Redmi 7A               | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 109    | 1.42         | 4.32                                    |
| **337**  | Xiaomi Redmi Note 4           | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 128\*  | 2.85\*       | 4.32\*                                  |
| **338**  | Samsung Galaxy A8             | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 91\*   | 1.82\*       | 4.32                                    |
| **339**  | Huawei Y7                     | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 90     | 3.25         | 4.32                                    |
| **340**  | Huawei Mate 10 Lite           | 2017 | H.264    | omx.img.msvdx.decoder.avc         | hw   | 186    | 2.67         | 4.33                                    |
| **341**  | Samsung Galaxy A20s           | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 185    | 2.81         | 4.33                                    |
| **342**  | Huawei P30                    | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 168    | 2.09         | 4.33                                    |
| **343**  | Huawei Honor 8X               | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 144    | 2.29         | 4.33                                    |
| **344**  | Samsung Galaxy A5             | 2017 | H.264    | omx.exynos.avc.dec                | hw   | 145    | 2.25\*       | 4.34\*                                  |
| **345**  | Xiaomi Redmi Note 5           | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 176\*  | 3.28\*       | 4.34\*                                  |
| **346**  | Xiaomi Mi A2 Lite             | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 140\*  | 2.58\*       | 4.34\*                                  |
| **347**  | Sony Xperia E5                | 2016 | H.264    | omx.google.h264.decoder           | sw   | 82     | 1.01         | 4.34                                    |
| **348**  | Samsung Galaxy A51            | 2019 | VP9      | omx.exynos.vp9.dec                | hw   | 97     | 2.11         | 4.34                                    |
| **349**  | Xiaomi Redmi Note 8 Pro       | 2019 | H.264    | omx.google.h264.decoder           | sw   | 105    | 1.97         | 4.34                                    |
| **350**  | OnePlus 5T                    | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 198    | 2.87         | 4.36                                    |
| **351**  | Honor 10                      | 2018 | VP9      | omx.hisi.video.decoder.vp9        | hw   | 132    | 2.52         | 4.36                                    |
| **352**  | Xiaomi Redmi 5 Plus           | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 114    | 2.09\*       | 4.36\*                                  |
| **353**  | Samsung Galaxy A5             | 2017 | VP8      | omx.exynos.vp8.dec                | hw   | 142    | 2.25\*       | 4.36\*                                  |
| **354**  | Sony Xperia XA1 Ultra         | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 69     | 1.45         | 4.36                                    |
| **355**  | Asus Google Nexus 7           | 2012 | VP9      | omx.google.vp9.decoder            | sw   | 68     | 1.38         | 4.36                                    |
| **356**  | Asus Zenfone Max (M1) ZB555KL | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 68     | 1.91         | 4.37                                    |
| **357**  | OnePlus 5T                    | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 214    | 2.87         | 4.37                                    |
| **358**  | Honor 20s                     | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 149    | 2.42         | 4.37                                    |
| **359**  | Samsung Galaxy A50            | 2019 | VP9      | omx.exynos.vp9.dec                | hw   | 97     | 2.7          | 4.38\*                                  |
| **360**  | Xiaomi Pocophone F1           | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 211    | 2.38         | 4.38                                    |
| **361**  | Nokia 2.2                     | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 107    | 1.91         | 4.38                                    |
| **362**  | Samsung Galaxy J6             | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 101    | 1.82         | 4.38                                    |
| **363**  | Samsung Galaxy A50            | 2019 | HEVC     | omx.exynos.hevc.dec               | hw   | 122    | 2.84         | 4.4                                     |
| **364**  | Realme XT                     | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 99     | 1.32         | 4.4                                     |
| **365**  | Honor 10                      | 2018 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 135    | 2.52         | 4.41                                    |
| **366**  | Huawei Honor 20 Pro           | 2019 | HEVC     | omx.hisi.video.decoder.hevc       | hw   | 232    | 3.04         | 4.41                                    |
| **367**  | Huawei Mate 10 Lite           | 2017 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 191    | 2.67         | 4.43                                    |
| **368**  | OnePlus 5 (A5000)             | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 216    | 2.93         | 4.43                                    |
| **369**  | Xiaomi Redmi Note 7           | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 129    | 2.19         | 4.43                                    |
| **370**  | Motorola Moto Z2 Play         | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 174    | 1.83         | 4.43                                    |
| **371**  | ASUS ZenFone Max Pro M1       | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 77     | 1.85         | 4.43\*                                  |
| **372**  | Huawei Honor 8S               | 2019 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 105    | 1.52         | 4.43                                    |
| **373**  | Samsung Galaxy A5             | 2017 | VP9      | omx.exynos.vp9.dec                | hw   | 139\*  | 2.11\*       | 4.44\*                                  |
| **374**  | Samsung Galaxy C5 Pro         | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 120    | 2.13         | 4.45                                    |
| **375**  | Sony Xperia XZ                | 2016 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 178    | 2.69         | 4.45                                    |
| **376**  | Realme XT                     | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 98     | 1.32         | 4.45                                    |
| **377**  | Nokia 2.2                     | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 107    | 1.91         | 4.45                                    |
| **378**  | Sony XPERIA XZ1 Compact       | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 220    | 3.59         | 4.46                                    |
| **379**  | Realme XT                     | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 70     | 1.32         | 4.46                                    |
| **380**  | Sony Xperia XA1 Plus          | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 75     | 1.69         | 4.47                                    |
| **381**  | Huawei P30                    | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 168    | 2.09         | 4.47                                    |
| **382**  | Honor 8 Pro                   | 2017 | H.264    | omx.hisi.video.decoder.avc        | hw   | 130    | 2.64         | 4.47                                    |
| **383**  | Samsung Galaxy A50            | 2019 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 123    | 2.73         | 4.48                                    |
| **384**  | Samsung Galaxy A5             | 2017 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 134    | 2.64\*       | 4.48\*                                  |
| **385**  | Samsung Galaxy A51            | 2019 | VP8      | omx.sec.vp8.dec                   | hw   | 104    | 2.11         | 4.48                                    |
| **386**  | Samsung Galaxy A20s           | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 167    | 2.81         | 4.49                                    |
| **387**  | Samsung Galaxy A70            | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 108    | 2.85         | 4.5\*                                   |
| **388**  | Honor 9X                      | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 134    | 2.02         | 4.5                                     |
| **389**  | Honor 20 lite                 | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 145    | 2.27         | 4.51                                    |
| **390**  | Xiaomi Redmi Note 7           | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 133    | 2.19         | 4.51                                    |
| **391**  | Samsung Galaxy A50            | 2019 | H.264    | omx.exynos.avc.dec                | hw   | 123    | 2.7          | 4.54                                    |
| **392**  | Kruger & Matz FLOW 7          | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 110    | 2.15         | 4.54                                    |
| **393**  | Huawei Y9                     | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 104    | 2.27         | 4.54                                    |
| **394**  | Sony XPERIA XZ1 Compact       | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 210    | 3.59         | 4.55                                    |
| **395**  | Honor 8 Pro                   | 2017 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 135    | 2.73         | 4.55                                    |
| **396**  | Xiaomi Redmi 5                | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 100    | 1.57\*       | 4.55\*                                  |
| **397**  | Honor 20s                     | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 124    | 2.42         | 4.55                                    |
| **398**  | Xiaomi Redmi Note 5           | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 172\*  | 3.28\*       | 4.55\*                                  |
| **399**  | Huawei Y7                     | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 93     | 3.25         | 4.55                                    |
| **400**  | Sony Xperia XA1 Ultra         | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 85     | 1.45         | 4.57                                    |
| **401**  | Realme XT                     | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 69     | 1.32         | 4.58                                    |
| **402**  | Motorola Moto Z2 Play         | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 185    | 1.83         | 4.59                                    |
| **403**  | Xiaomi Redmi Note 8 Pro       | 2019 | H.264    | omx.mtk.video.decoder.avc         | hw   | 121    | 3.07\*       | 4.59\*                                  |
| **404**  | Honor 9X                      | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 134    | 2.02         | 4.61                                    |
| **405**  | Honor 8 Pro                   | 2017 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 123    | 2.73         | 4.62                                    |
| **406**  | Sony Xperia XA1 Plus          | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 82     | 1.69         | 4.63                                    |
| **407**  | Xiaomi Redmi Note 4           | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 105\*  | 2.63\*       | 4.63\*                                  |
| **408**  | Samsung Galaxy A70            | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 203    | 2.64         | 4.67                                    |
| **409**  | Xiaomi Redmi Note 7           | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 119    | 2.19         | 4.68                                    |
| **410**  | Samsung Galaxy J3             | 2017 | VP8      | omx.exynos.vp8.dec                | hw   | 187    | 2.33         | 4.68                                    |
| **411**  | Xiaomi Mi MIX 2S              | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 410    | 3.49         | 4.68                                    |
| **412**  | Samsung Galaxy S20            | 2020 | H.264    | omx.google.h264.decoder           | sw   | 105    | 2.02         | 4.69                                    |
| **413**  | Samsung Galaxy A50            | 2019 | VP8      | omx.exynos.vp8.dec                | hw   | 93     | 2.7          | 4.69                                    |
| **414**  | Samsung Galaxy A50            | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 109    | 2.57         | 4.69                                    |
| **415**  | Samsung Galaxy A70            | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 105    | 2.85         | 4.69                                    |
| **416**  | Samsung Galaxy J6             | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 102    | 1.82         | 4.69                                    |
| **417**  | Samsung Galaxy J7 Prime       | 2016 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 157    | 2.37         | 4.72                                    |
| **418**  | Xiaomi Pocophone F1           | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 145    | 2.38         | 4.73                                    |
| **419**  | Xiaomi Redmi 9C               | 2020 | H.264    | c2.android.avc.decoder            | sw   | 37     | 1.33         | 4.73                                    |
| **420**  | Xiaomi Redmi 5 Plus           | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 86     | 1.76         | 4.74                                    |
| **421**  | Sony Xperia XA1 Ultra         | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 95     | 1.45         | 4.74                                    |
| **422**  | Kruger & Matz FLOW 7          | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 111    | 2.15         | 4.74                                    |
| **423**  | Huawei P30                    | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 169    | 2.29         | 4.74                                    |
| **424**  | Samsung Galaxy A6+            | 2018 | H.264    | omx.google.h264.decoder           | sw   | 93     | 2.09         | 4.74                                    |
| **425**  | Honor 20s                     | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 100    | 2.42         | 4.75                                    |
| **426**  | Samsung Galaxy C5 Pro         | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 94     | 2.13         | 4.75                                    |
| **427**  | Honor 20 lite                 | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 132    | 2.27         | 4.76                                    |
| **428**  | Motorola Moto G               | 2013 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 173    | 2.52         | 4.76                                    |
| **429**  | Huawei P20 lite               | 2018 | HEVC     | omx.img.msvdx.decoder.hevc        | hw   | 169    | 3.07\*       | 4.78\*                                  |
| **430**  | Xiaomi Redmi 7A               | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 83     | 1.42         | 4.79                                    |
| **431**  | SANTIN halove                 | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 105    | 0.65         | 4.79                                    |
| **432**  | Samsung Galaxy J2 Prime       | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 78     | 0.76         | 4.79                                    |
| **433**  | Samsung Galaxy S20            | 2020 | H.264    | c2.android.avc.decoder            | sw   | 100    | 2.02         | 4.8                                     |
| **434**  | Xiaomi Redmi 5 Plus           | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 130\*  | 2.09\*       | 4.8\*                                   |
| **435**  | Honor 9 Lite                  | 2017 | HEVC     | omx.img.msvdx.decoder.hevc        | hw   | 167    | 2.96         | 4.8                                     |
| **436**  | Huawei Honor 8X               | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 129    | 2.29         | 4.82                                    |
| **437**  | Xiaomi Redmi 9C               | 2020 | H.264    | omx.google.h264.decoder           | sw   | 37     | 1.33         | 4.82                                    |
| **438**  | Xiaomi Mi 9 Lite              | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 162    | 3.55\*       | 4.83\*                                  |
| **439**  | Honor 20s                     | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 99     | 2.42         | 4.87                                    |
| **440**  | Xiaomi Mi MIX 2S              | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 319    | 3.49         | 4.87                                    |
| **441**  | Samsung Galaxy J2 Prime       | 2016 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 117    | 0.76         | 4.87                                    |
| **442**  | Samsung Galaxy A7             | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 112    | 2.29\*       | 4.88\*                                  |
| **443**  | Xiaomi Redmi Note 7           | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 129    | 2.19         | 4.88                                    |
| **444**  | Xiaomi Mi MIX 2S              | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 334    | 3.49         | 4.88                                    |
| **445**  | BQ Mobile BQS-5520 Mercury    | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 93     | 2.22         | 4.88                                    |
| **446**  | LG X Power                    | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 90     | 1.24         | 4.88                                    |
| **447**  | Micromax Q3551                | 2017 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 157    | 2.59         | 4.9                                     |
| **448**  | Xiaomi Redmi Note 5           | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 64     | 4.82         | 4.91                                    |
| **449**  | Xiaomi Redmi Note 6 Pro       | 2018 | H.264    | omx.google.h264.decoder           | sw   | 92     | 2.79         | 4.93                                    |
| **450**  | Sony Xperia XA1 Ultra         | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 89     | 1.45         | 4.93                                    |
| **451**  | vivo S1 Pro                   | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 114    | 2.35         | 4.93                                    |
| **452**  | Digma CITI 8588 3G CS8205PG   | 2019 | H.264    | omx.sprd.h264.decoder             | hw   | 98     | 2.72         | 4.93                                    |
| **453**  | Honor 9 Lite                  | 2017 | H.264    | omx.img.msvdx.decoder.avc         | hw   | 165    | 3.05         | 4.94                                    |
| **454**  | Xiaomi Mi Max 2               | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 103    | 3.58         | 4.95                                    |
| **455**  | Honor 10                      | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 127\*  | 2.52         | 4.95                                    |
| **456**  | Huawei P20 lite               | 2018 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 175    | 3.11\*       | 4.96\*                                  |
| **457**  | Xiaomi Redmi 5 Plus           | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 83     | 4.26         | 4.96                                    |
| **458**  | Xiaomi Mi MIX 2S              | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 404    | 3.49         | 4.96                                    |
| **459**  | Samsung Galaxy S20            | 2020 | HEVC     | c2.android.hevc.decoder           | sw   | 128    | 2.02         | 4.97                                    |
| **460**  | SANTIN halove                 | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 72     | 0.65         | 4.97                                    |
| **461**  | Samsung Galaxy A50            | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 82     | 2.57         | 4.97                                    |
| **462**  | Sony Xperia XA1 Ultra         | 2017 | H.264    | omx.google.h264.decoder           | sw   | 88     | 1.45         | 4.97                                    |
| **463**  | Xiaomi Redmi 6A               | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 93     | 2.43\*       | 4.98\*                                  |
| **464**  | Huawei P20 lite               | 2018 | H.264    | omx.img.msvdx.decoder.avc         | hw   | 169    | 3.11\*       | 4.98\*                                  |
| **465**  | Samsung Galaxy A70            | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 184    | 2.64         | 4.98                                    |
| **466**  | BQ Mobile BQS-5520 Mercury    | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 94     | 2.22         | 4.99                                    |
| **467**  | Nokia 2.2                     | 2019 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 75     | 1.91         | 4.99                                    |
| **468**  | Sony Xperia Z5 Compact        | 2015 | H.264    | omx.qcom.video.decoder.avc        | hw   | 135    | 3.21         | 5.01                                    |
| **469**  | Honor 20 lite                 | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 133    | 2.27         | 5.01                                    |
| **470**  | Xiaomi Mi 9 Lite              | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 181    | 3.55\*       | 5.01                                    |
| **471**  | Huawei nova 3                 | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 118\*  | 2.29         | 5.01                                    |
| **472**  | Honor 9 Lite                  | 2017 | MPEG-4   | omx.img.msvdx.decoder.mpeg4       | hw   | 172    | 3.18\*       | 5.03\*                                  |
| **473**  | Samsung Galaxy A8             | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 146\*  | 1.82\*       | 5.03                                    |
| **474**  | Honor 9X                      | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 129    | 2.02         | 5.03                                    |
| **475**  | Kruger & Matz FLOW 7          | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 101    | 2.15         | 5.04                                    |
| **476**  | Xiaomi Pocophone F1           | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 213    | 2.38         | 5.04                                    |
| **477**  | Xiaomi Redmi 4 (4X)           | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 113    | 3.46\*       | 5.05\*                                  |
| **478**  | Samsung Galaxy A50            | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 108    | 2.57         | 5.05                                    |
| **479**  | Sony Xperia E5                | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 43     | 1.01         | 5.07                                    |
| **480**  | Huawei P20 lite               | 2018 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 159    | 3.11\*       | 5.08\*                                  |
| **481**  | LG X Power                    | 2016 | H.264    | omx.google.h264.decoder           | sw   | 87\*   | 1.24         | 5.08                                    |
| **482**  | Honor 10                      | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 127\*  | 2.52         | 5.08                                    |
| **483**  | Dexp Ursus N570               | 2019 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 167    | 2.74         | 5.09                                    |
| **484**  | Motorola Moto Z2 Play         | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 99     | 1.83         | 5.09                                    |
| **485**  | Xiaomi Redmi 6A               | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 94     | 2.57\*       | 5.12\*                                  |
| **486**  | Samsung Galaxy J5 Prime       | 2016 | H.264    | omx.exynos.avc.dec                | hw   | 137    | 3.27         | 5.12                                    |
| **487**  | Samsung Galaxy J3             | 2016 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 167    | 3.0          | 5.12                                    |
| **488**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 152    | 2.49         | 5.12                                    |
| **489**  | Doogee BL5000 Smartphone      | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 99     | 2.12         | 5.12                                    |
| **490**  | Xiaomi Redmi Note 4           | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 104\*  | 2.63\*       | 5.13\*                                  |
| **491**  | Samsung Galaxy J3             | 2016 | H.264    | omx.vpu.video\_decoder.avc        | hw   | 143    | 3.0          | 5.14                                    |
| **492**  | Samsung Galaxy J6             | 2018 | H.264    | omx.google.h264.decoder           | sw   | 79     | 1.82         | 5.15                                    |
| **493**  | ZTE BLADE V9                  | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 85\*   | 0.83\*       | 5.16\*                                  |
| **494**  | Samsung Galaxy A5             | 2014 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 172    | 3.13         | 5.16                                    |
| **495**  | Nokia 2.2                     | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 77     | 1.91         | 5.16                                    |
| **496**  | Samsung Galaxy A50            | 2019 | VP8      | omx.sec.vp8.dec                   | hw   | 100    | 2.7          | 5.17                                    |
| **497**  | Xiaomi Mi 9 Lite              | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 159    | 4.46\*       | 5.17\*                                  |
| **498**  | Xiaomi Mi A3                  | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 161    | 2.8          | 5.18                                    |
| **499**  | Nokia 2.2                     | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 85     | 1.91         | 5.19                                    |
| **500**  | Xiaomi Redmi Go               | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 142    | 3.07         | 5.2                                     |
| **501**  | Xiaomi Mi Max 2               | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 115    | 3.58         | 5.21\*                                  |
| **502**  | Sony Xperia XA1 Ultra         | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 75     | 1.45         | 5.22                                    |
| **503**  | Samsung Galaxy A70            | 2019 | VP8      | omx.sec.vp8.dec                   | hw   | 180    | 2.85         | 5.23                                    |
| **504**  | Xiaomi Redmi Note 4           | 2017 | H.264    | c2.android.avc.decoder            | sw   | 93     | 1.29         | 5.24                                    |
| **505**  | Samsung Galaxy A70            | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 112    | 2.64         | 5.25                                    |
| **506**  | Asus Zenfone Live ZB501KL     | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 133    | 2.99         | 5.25                                    |
| **507**  | Nokia 2.2                     | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 77     | 1.91         | 5.25                                    |
| **508**  | Xiaomi Redmi 5                | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 80     | 1.94         | 5.26                                    |
| **509**  | Samsung Galaxy J3             | 2016 | VP8      | omx.sprd.vpx.decoder              | hw   | 155    | 3.0          | 5.27                                    |
| **510**  | Sony Xperia XA1 Plus          | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 102    | 1.69         | 5.27                                    |
| **511**  | Honor 9 Lite                  | 2017 | VP8      | omx.img.msvdx.decoder.vp8         | hw   | 151    | 3.18\*       | 5.28\*                                  |
| **512**  | Samsung Galaxy J2 Core        | 2020 | H.264    | omx.qcom.video.decoder.avc        | hw   | 156    | 2.97         | 5.28                                    |
| **513**  | Huawei Y6 Prime               | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 198    | 3.54         | 5.28                                    |
| **514**  | Xiaomi Redmi Note 6 Pro       | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 143    | 2.79         | 5.29                                    |
| **515**  | Samsung Galaxy A6+            | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 77     | 2.09         | 5.29                                    |
| **516**  | Samsung Galaxy A50            | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 90     | 2.57         | 5.3                                     |
| **517**  | Samsung Galaxy A50            | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 81     | 2.57         | 5.3                                     |
| **518**  | Nokia 2.2                     | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 69     | 1.91         | 5.31                                    |
| **519**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 154    | 2.49         | 5.32                                    |
| **520**  | Xiaomi Mi MIX 2S              | 2018 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 239    | 3.49         | 5.33                                    |
| **521**  | Samsung Galaxy A8             | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 126\*  | 1.82\*       | 5.33                                    |
| **522**  | PSP5545DUO                    | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 82     | 2.54         | 5.34                                    |
| **523**  | Samsung Galaxy J5             | 2015 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 132\*  | 2.49         | 5.34                                    |
| **524**  | Huawei Honor 8X               | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 133    | 2.29         | 5.34                                    |
| **525**  | Nokia 2.2                     | 2019 | H.264    | c2.android.avc.decoder            | sw   | 76     | 1.91         | 5.34                                    |
| **526**  | Samsung Galaxy A7             | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 89     | 1.64         | 5.35                                    |
| **527**  | Samsung Galaxy A7             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 90     | 1.64         | 5.35                                    |
| **528**  | Samsung Galaxy A20s           | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 84     | 2.81         | 5.36                                    |
| **529**  | Samsung Galaxy S20            | 2020 | HEVC     | omx.google.hevc.decoder           | sw   | 134    | 2.02         | 5.37                                    |
| **530**  | Honor 7X                      | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 104    | 2.43         | 5.37\*                                  |
| **531**  | Xiaomi Redmi 9C               | 2020 | HEVC     | omx.google.hevc.decoder           | sw   | 47     | 1.33         | 5.37                                    |
| **532**  | Huawei Y5                     | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 108    | 2.31         | 5.37                                    |
| **533**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 95     | 2.49         | 5.38                                    |
| **534**  | vivo S1 Pro                   | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 97     | 2.35         | 5.38                                    |
| **535**  | Samsung Galaxy J1             | 2016 | VP8      | omx.exynos.vp8.dec                | hw   | 65     | 2.23         | 5.38                                    |
| **536**  | Honor 9X                      | 2019 | H.264    | omx.google.h264.decoder           | sw   | 58     | 2.02         | 5.38                                    |
| **537**  | Nokia 2.2                     | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 69     | 1.91         | 5.38                                    |
| **538**  | Huawei nova 3                 | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 87     | 2.29         | 5.4                                     |
| **539**  | Samsung Galaxy A8             | 2018 | H.264    | omx.google.h264.decoder           | sw   | 104    | 1.79         | 5.43                                    |
| **540**  | Xiaomi Redmi Note 4           | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 85     | 2.87\*       | 5.44\*                                  |
| **541**  | Digma Citi ATL 4G             | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 93     | 2.5          | 5.44                                    |
| **542**  | Sony Xperia XA1               | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 66     | 2.66         | 5.44                                    |
| **543**  | Samsung Galaxy J6             | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 70     | 1.82         | 5.44                                    |
| **544**  | Xiaomi Redmi 9C               | 2020 | HEVC     | c2.android.hevc.decoder           | sw   | 46     | 1.35         | 5.44                                    |
| **545**  | Nokia 2.2                     | 2019 | H.264    | omx.google.h264.decoder           | sw   | 75     | 1.91         | 5.44                                    |
| **546**  | Xiaomi Redmi Note 7           | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 62     | 2.19         | 5.45                                    |
| **547**  | Huawei MediaPad T5            | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 111    | 2.7          | 5.45                                    |
| **548**  | Huawei Honor 8X               | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 121    | 2.29         | 5.45                                    |
| **549**  | Samsung Galaxy A70            | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 110    | 2.64         | 5.46                                    |
| **550**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 151    | 3.77\*       | 5.46\*                                  |
| **551**  | Samsung Galaxy A6+            | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 70     | 1.83\*       | 5.46                                    |
| **552**  | Xiaomi Mi 9 Lite              | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 211    | 3.55\*       | 5.46\*                                  |
| **553**  | Honor 9X                      | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 127    | 2.02         | 5.46                                    |
| **554**  | Samsung Galaxy J2 Prime       | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 67     | 0.76         | 5.46                                    |
| **555**  | Asus Zenfone Max (M1) ZB555KL | 2018 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 110    | 1.91         | 5.49                                    |
| **556**  | Sony Xperia E5                | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 53     | 1.01         | 5.49                                    |
| **557**  | Sony XPERIA XZ1 Compact       | 2017 | H.264    | omx.google.h264.decoder           | sw   | 134    | 3.59         | 5.5                                     |
| **558**  | Xiaomi Redmi Note 8 Pro       | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 191    | 3.77\*       | 5.5\*                                   |
| **559**  | Xiaomi Redmi 4 (4X)           | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 121    | 3.75\*       | 5.51\*                                  |
| **560**  | Honor 20s                     | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 123    | 2.42         | 5.51                                    |
| **561**  | Samsung Galaxy J5 Prime       | 2016 | HEVC     | omx.exynos.hevc.dec               | hw   | 132    | 3.27         | 5.51                                    |
| **562**  | Xiaomi Redmi Note 8 Pro       | 2019 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 127    | 3.77\*       | 5.52\*                                  |
| **563**  | Samsung Galaxy J5             | 2016 | H.264    | omx.qcom.video.decoder.avc        | hw   | 108    | 2.64         | 5.52                                    |
| **564**  | Xiaomi Redmi Note 8 Pro       | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 191    | 3.77\*       | 5.53\*                                  |
| **565**  | Huawei nova 3                 | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 90     | 2.29         | 5.53                                    |
| **566**  | Huawei Y5                     | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 140\*  | 3.05\*       | 5.53\*                                  |
| **567**  | Huawei Y9                     | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 113    | 2.44         | 5.53                                    |
| **568**  | BLACKVIEW BV9000 PRO          | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 61     | 3.13         | 5.54                                    |
| **569**  | Huawei Y6 Pro                 | 2015 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 53     | 1.81         | 5.54                                    |
| **570**  | Xiaomi Mi 9 Lite              | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 146    | 4.46\*       | 5.54\*                                  |
| **571**  | Sony Xperia XA1 Plus          | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 95     | 1.69         | 5.56                                    |
| **572**  | Asus Zenfone 3 Max            | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 80     | 2.04         | 5.56                                    |
| **573**  | Xiaomi Mi A3                  | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 135    | 2.8          | 5.57                                    |
| **574**  | Xiaomi Redmi S2               | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 164    | 4.3\*        | 5.58\*                                  |
| **575**  | Samsung Galaxy A51            | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 108    | 2.11         | 5.58                                    |
| **576**  | Honor 10                      | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 102\*  | 2.52         | 5.58                                    |
| **577**  | Doogee BL5000 Smartphone      | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 89     | 2.12         | 5.58                                    |
| **578**  | Google Pixel 3a               | 2019 | VP8      | c2.qti.vp8.decoder                | hw   | 114    | 1.3          | 5.59                                    |
| **579**  | Samsung Galaxy A6+            | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 85     | 1.7          | 5.59                                    |
| **580**  | Huawei Y6 Prime               | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 195    | 3.54         | 5.59                                    |
| **581**  | Samsung Galaxy A70            | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 140    | 2.64         | 5.6                                     |
| **582**  | LG X Power                    | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 66     | 1.24         | 5.6                                     |
| **583**  | Xiaomi Mi A3                  | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 134    | 2.8          | 5.6                                     |
| **584**  | Honor 20 lite                 | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 127    | 2.41         | 5.61                                    |
| **585**  | Xiaomi Mi Max 2               | 2017 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 107    | 3.58         | 5.61\*                                  |
| **586**  | Huawei nova 2s                | 2017 | H.264    | omx.hisi.video.decoder.avc        | hw   | 125    | 3.42\*       | 5.61                                    |
| **587**  | Huawei Y9                     | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 127    | 2.44         | 5.62                                    |
| **588**  | Samsung Galaxy A50            | 2019 | H.264    | omx.google.h264.decoder           | sw   | 118    | 2.57         | 5.63                                    |
| **589**  | Samsung Galaxy J7 Prime       | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 81     | 2.37         | 5.63                                    |
| **590**  | Digma CITI 8588 3G CS8205PG   | 2019 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 98     | 2.72         | 5.63                                    |
| **591**  | Huawei Honor 8X               | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 121    | 2.29         | 5.63                                    |
| **592**  | Huawei P smart 2019           | 2019 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 133    | 3.69         | 5.64                                    |
| **593**  | Xiaomi Mi 9 Lite              | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 182    | 3.55\*       | 5.66                                    |
| **594**  | Huawei nova 3                 | 2018 | H.264    | omx.google.h264.decoder           | sw   | 72     | 2.29         | 5.66                                    |
| **595**  | Samsung Galaxy S20            | 2020 | H.264    | omx.sec.avc.sw\.dec               | sw   | 193    | 2.02         | 5.67                                    |
| **596**  | Samsung Galaxy C5 Pro         | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 91     | 2.13         | 5.67                                    |
| **597**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 110    | 3.77\*       | 5.67\*                                  |
| **598**  | Xiaomi Mi 8 Lite              | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 125    | 4.36         | 5.67                                    |
| **599**  | Honor 20s                     | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 123    | 2.42         | 5.68                                    |
| **600**  | Samsung Galaxy J1             | 2016 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 67     | 2.23         | 5.68                                    |
| **601**  | Huawei nova 2s                | 2017 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 128    | 3.42\*       | 5.68                                    |
| **602**  | Huawei P20 lite               | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 104    | 2.79\*       | 5.69                                    |
| **603**  | Honor 7X                      | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 112    | 2.31         | 5.69                                    |
| **604**  | Huawei nova 2s                | 2017 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 127    | 3.42\*       | 5.7                                     |
| **605**  | Xiaomi Mi 9 Lite              | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 144    | 4.46\*       | 5.71\*                                  |
| **606**  | OnePlus 5 (A5000)             | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 196    | 2.93         | 5.72                                    |
| **607**  | Huawei Y9                     | 2018 | H.264    | omx.google.h264.decoder           | sw   | 103    | 2.44         | 5.72                                    |
| **608**  | Sony Xperia XA1 Ultra         | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 97     | 1.45         | 5.73                                    |
| **609**  | Samsung Galaxy S8             | 2017 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 166\*  | 3.99\*       | 5.73\*                                  |
| **610**  | Xiaomi Mi A3                  | 2019 | H.264    | c2.android.avc.decoder            | sw   | 61     | 2.8          | 5.73                                    |
| **611**  | Asus Zenfone 3 Max            | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 60     | 2.04         | 5.73                                    |
| **612**  | Samsung Galaxy A50            | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 97     | 2.5          | 5.74                                    |
| **613**  | Xiaomi Redmi S2               | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 170    | 4.3\*        | 5.74\*                                  |
| **614**  | Samsung Galaxy S8             | 2017 | H.264    | omx.exynos.avc.dec                | hw   | 154    | 3.99\*       | 5.74\*                                  |
| **615**  | Honor 10                      | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 102\*  | 2.52         | 5.74                                    |
| **616**  | Honor 8 Pro                   | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 101    | 2.83         | 5.74                                    |
| **617**  | Samsung Galaxy A3             | 2017 | VP8      | omx.sec.vp8.dec                   | hw   | 75     | 1.99         | 5.74                                    |
| **618**  | ASUS ZenFone Max Pro M1       | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 142    | 1.85         | 5.75\*                                  |
| **619**  | Samsung Galaxy J5             | 2015 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 130\*  | 2.64         | 5.76                                    |
| **620**  | Huawei P smart 2019           | 2019 | H.264    | omx.hisi.video.decoder.avc        | hw   | 132    | 3.69         | 5.76                                    |
| **621**  | Huawei Mate 10 Lite           | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 90     | 2.67         | 5.77                                    |
| **622**  | Samsung Galaxy J7             | 2015 | VP8      | omx.sec.vp8.dec                   | hw   | 72     | 2.44\*       | 5.77                                    |
| **623**  | Huawei MediaPad T5            | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 90     | 2.7          | 5.78                                    |
| **624**  | Xiaomi Pocophone F1           | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 78     | 1.71         | 5.78                                    |
| **625**  | Honor 10                      | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 122    | 2.54         | 5.78                                    |
| **626**  | Honor 20 lite                 | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 123    | 2.27         | 5.79                                    |
| **627**  | Kruger & Matz FLOW 7          | 2019 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 75     | 2.15         | 5.79                                    |
| **628**  | Samsung Galaxy J1             | 2016 | H.264    | omx.exynos.avc.dec                | hw   | 61     | 2.23         | 5.79                                    |
| **629**  | Xiaomi Mi A3                  | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 124    | 2.8          | 5.79                                    |
| **630**  | ZTE Blade A5 (2019)           | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 88     | 1.77         | 5.8                                     |
| **631**  | Samsung Galaxy A70            | 2019 | H.264    | c2.android.avc.decoder            | sw   | 70     | 2.64         | 5.8                                     |
| **632**  | Samsung Galaxy A70            | 2019 | H.264    | omx.google.h264.decoder           | sw   | 70     | 2.64         | 5.8                                     |
| **633**  | Sony Xperia XZ                | 2016 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 176    | 2.69         | 5.8                                     |
| **634**  | Samsung Galaxy S8             | 2017 | VP9      | omx.exynos.vp9.dec                | hw   | 135    | 3.99\*       | 5.8\*                                   |
| **635**  | Samsung Galaxy J2 Prime       | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 81     | 0.76         | 5.8                                     |
| **636**  | Samsung Galaxy S8+            | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 115    | 2.19         | 5.81                                    |
| **637**  | Huawei Y6 Pro                 | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 63     | 1.81         | 5.81                                    |
| **638**  | Huawei Y6 Prime               | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 197    | 3.54         | 5.81                                    |
| **639**  | Sony Xperia XA1               | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 63     | 2.66         | 5.82                                    |
| **640**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 166    | 2.49         | 5.83                                    |
| **641**  | Huawei P smart 2019           | 2019 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 125    | 3.69         | 5.83                                    |
| **642**  | Xiaomi Redmi 6A               | 2018 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 85     | 2.02         | 5.84                                    |
| **643**  | Xiaomi Redmi 5 Plus           | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 86     | 2.09\*       | 5.84\*                                  |
| **644**  | Samsung Galaxy J2 Prime       | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 68     | 0.76         | 5.84                                    |
| **645**  | Samsung Galaxy J6             | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 71     | 1.82         | 5.85                                    |
| **646**  | Huawei Honor 8S               | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 88     | 1.52         | 5.85                                    |
| **647**  | Xiaomi Mi A3                  | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 122    | 2.8          | 5.86                                    |
| **648**  | Samsung Galaxy J6             | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 71     | 1.82         | 5.87                                    |
| **649**  | Digma Citi ATL 4G             | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 97     | 2.5          | 5.88                                    |
| **650**  | Sony Xperia XA1 Plus          | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 98     | 1.69         | 5.88                                    |
| **651**  | Samsung Galaxy J7 Prime       | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 77     | 2.37         | 5.89                                    |
| **652**  | Samsung Galaxy A6+            | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 68     | 1.62         | 5.89                                    |
| **653**  | Honor 4C                      | 2015 | H.264    | omx.k3.video.decoder.avc          | hw   | 206    | 3.59         | 5.89                                    |
| **654**  | Huawei Y5                     | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 109\*  | 3.05\*       | 5.89\*                                  |
| **655**  | Xiaomi Redmi S2               | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 97     | 4.3\*        | 5.91\*                                  |
| **656**  | BLACKVIEW BV9000 PRO          | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 63     | 3.13         | 5.91                                    |
| **657**  | Motorola Moto Z2 Play         | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 113    | 1.83         | 5.92                                    |
| **658**  | Kruger & Matz FLOW 7          | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 89     | 2.15         | 5.93                                    |
| **659**  | Huawei P smart 2019           | 2019 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 116    | 3.69         | 5.93                                    |
| **660**  | Huawei Y9                     | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 101    | 2.44         | 5.93                                    |
| **661**  | Samsung Galaxy J7 Prime       | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 104    | 2.09\*       | 5.94                                    |
| **662**  | Xiaomi Redmi Note 6 Pro       | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 192    | 2.79         | 5.95                                    |
| **663**  | Samsung Galaxy A20s           | 2019 | VP8      | omx.sec.vp8.dec                   | hw   | 67     | 2.81         | 5.95                                    |
| **664**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 156    | 3.77\*       | 5.95\*                                  |
| **665**  | Xiaomi Redmi S2               | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 166    | 4.3\*        | 5.96\*                                  |
| **666**  | Xiaomi Mi 8 Lite              | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 134    | 4.36         | 5.96                                    |
| **667**  | Huawei Y9 Prime (2019)        | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 75     | 1.93         | 5.98                                    |
| **668**  | Huawei MediaPad T5            | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 104    | 2.7          | 5.98                                    |
| **669**  | Samsung Galaxy A8             | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 129    | 1.63         | 5.98                                    |
| **670**  | Samsung Galaxy S20            | 2020 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 143    | 2.02         | 5.99                                    |
| **671**  | Huawei Honor 4X               | 2014 | MPEG-4   | omx.k3.video.decoder.mpeg4        | hw   | 212    | 3.49         | 6.01                                    |
| **672**  | Xiaomi Redmi Note 8T          | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 155    | 3.17\*       | 6.01\*                                  |
| **673**  | Sony Xperia Z2                | 2014 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 109    | 3.34         | 6.01                                    |
| **674**  | OnePlus 5T                    | 2017 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 147    | 2.87         | 6.02                                    |
| **675**  | LG X Power                    | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 76     | 1.24         | 6.04                                    |
| **676**  | Huawei MediaPad T5            | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 114    | 2.7          | 6.04                                    |
| **677**  | OnePlus 5T                    | 2017 | H.264    | c2.android.avc.decoder            | sw   | 78     | 2.87         | 6.05                                    |
| **678**  | Sony Xperia XZ                | 2016 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 144    | 2.69         | 6.05                                    |
| **679**  | Xiaomi Pocophone F1           | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 83     | 2.04\*       | 6.05\*                                  |
| **680**  | Samsung Galaxy J2 Prime       | 2016 | VP8      | omx.sec.vp8.dec                   | hw   | 59     | 0.76         | 6.05                                    |
| **681**  | Sony Xperia XA1 Ultra         | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 100    | 1.45         | 6.06                                    |
| **682**  | Sony Xperia XA1               | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 75     | 2.66         | 6.06                                    |
| **683**  | Samsung Galaxy J7             | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 122    | 2.44\*       | 6.07\*                                  |
| **684**  | Samsung Galaxy A5             | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 77\*   | 2.25\*       | 6.08\*                                  |
| **685**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 146    | 3.77\*       | 6.08\*                                  |
| **686**  | Xiaomi Redmi S2               | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 170    | 4.3\*        | 6.09                                    |
| **687**  | Samsung Galaxy A70            | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 181    | 2.64         | 6.1                                     |
| **688**  | Sony Xperia XZ                | 2016 | H.264    | omx.qcom.video.decoder.avc        | hw   | 184    | 2.69         | 6.1                                     |
| **689**  | PSP5545DUO                    | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 64     | 2.54         | 6.11                                    |
| **690**  | Samsung Galaxy J7 Prime       | 2016 | VP8      | omx.sec.vp8.dec                   | hw   | 69     | 2.09\*       | 6.12                                    |
| **691**  | Huawei P smart 2019           | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 134    | 3.69         | 6.12                                    |
| **692**  | Xiaomi Redmi Note 6 Pro       | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 148    | 2.79         | 6.15                                    |
| **693**  | BLACKVIEW BV9000 PRO          | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 97     | 3.13         | 6.15                                    |
| **694**  | Xiaomi Pocophone F1           | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 81     | 2.04\*       | 6.15\*                                  |
| **695**  | Honor 8 Pro                   | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 115    | 2.73         | 6.15                                    |
| **696**  | Xiaomi Pocophone F1           | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 80     | 2.04\*       | 6.16                                    |
| **697**  | Xiaomi Redmi 3S               | 2016 | H.264    | omx.qcom.video.decoder.avc        | hw   | 128    | 4.78         | 6.16                                    |
| **698**  | Xiaomi Mi 8 Lite              | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 142    | 4.36         | 6.16                                    |
| **699**  | Xiaomi Redmi Note 5           | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 137    | 3.83\*       | 6.16\*                                  |
| **700**  | Samsung Galaxy A70            | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 177    | 2.64         | 6.17                                    |
| **701**  | OnePlus 5T                    | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 148    | 2.87         | 6.18                                    |
| **702**  | Yandex Smartphone             | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 182    | 4.97         | 6.18                                    |
| **703**  | Huawei Y9 Prime (2019)        | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 75     | 1.93         | 6.18                                    |
| **704**  | OnePlus 5 (A5000)             | 2017 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 186    | 2.93         | 6.18                                    |
| **705**  | Samsung Galaxy A6+            | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 85     | 1.62         | 6.18                                    |
| **706**  | Samsung Galaxy A50            | 2019 | H.264    | c2.android.avc.decoder            | sw   | 120    | 2.57         | 6.19                                    |
| **707**  | Sony XPERIA XZ1 Compact       | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 184    | 3.59         | 6.2                                     |
| **708**  | Samsung Galaxy S8+            | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 130    | 2.19         | 6.2                                     |
| **709**  | Sony Xperia Z3                | 2014 | H.264    | omx.qcom.video.decoder.avc        | hw   | 106    | 3.28         | 6.2                                     |
| **710**  | Honor 9X                      | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 79     | 2.02         | 6.2                                     |
| **711**  | Xiaomi Redmi 6A               | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 82     | 2.43\*       | 6.21                                    |
| **712**  | Huawei Honor 4X               | 2014 | VP8      | omx.k3.video.decoder.vp8          | hw   | 198    | 3.49         | 6.21                                    |
| **713**  | Xiaomi Redmi 5                | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 78     | 1.57\*       | 6.21\*                                  |
| **714**  | Huawei P smart 2019           | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 104    | 3.69         | 6.21                                    |
| **715**  | Honor 9X                      | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 79     | 2.02         | 6.21                                    |
| **716**  | Honor 7X                      | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 116    | 2.31         | 6.22                                    |
| **717**  | Huawei Mate 10 Lite           | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 95     | 2.67         | 6.23                                    |
| **718**  | Samsung Galaxy J7 Prime       | 2016 | H.264    | omx.google.h264.decoder           | sw   | 107    | 2.09\*       | 6.24                                    |
| **719**  | Sony Xperia XZ                | 2016 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 181    | 2.69         | 6.24                                    |
| **720**  | Honor 7X                      | 2017 | H.264    | omx.google.h264.decoder           | sw   | 98     | 2.31         | 6.25                                    |
| **721**  | Huawei Honor 8S               | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 84     | 1.52         | 6.25                                    |
| **722**  | Nokia 2.2                     | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 72     | 1.91         | 6.25                                    |
| **723**  | Samsung Galaxy C5 Pro         | 2017 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 171    | 2.13         | 6.26                                    |
| **724**  | Samsung Galaxy Tab A 8.0      | 2015 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 123    | 3.52         | 6.27                                    |
| **725**  | Xiaomi Redmi Note 8T          | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 157    | 3.17\*       | 6.27\*                                  |
| **726**  | Huawei MediaPad T5            | 2018 | H.264    | omx.google.h264.decoder           | sw   | 95     | 2.7          | 6.27                                    |
| **727**  | Honor 4C                      | 2015 | VP8      | omx.k3.video.decoder.vp8          | hw   | 206    | 3.59         | 6.27                                    |
| **728**  | Xiaomi Mi 8 Lite              | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 138    | 4.36         | 6.29                                    |
| **729**  | Honor 20s                     | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 79     | 2.42         | 6.31                                    |
| **730**  | Samsung Galaxy A5             | 2015 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 146\*  | 2.87\*       | 6.31\*                                  |
| **731**  | Huawei Y5 lite                | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 82     | 2.66         | 6.31                                    |
| **732**  | Samsung Galaxy S7             | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 111    | 4.87         | 6.31                                    |
| **733**  | Samsung Galaxy S7             | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 111    | 4.87         | 6.31                                    |
| **734**  | Xiaomi Redmi Note 4           | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 91\*   | 2.46\*       | 6.32\*                                  |
| **735**  | Samsung Galaxy S8+            | 2017 | VP8      | omx.sec.vp8.dec                   | hw   | 105    | 2.19         | 6.32                                    |
| **736**  | Honor 10                      | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 78     | 2.5          | 6.32                                    |
| **737**  | Xiaomi Pocophone F1           | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 144    | 2.38         | 6.33                                    |
| **738**  | Yandex Smartphone             | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 188    | 4.97         | 6.34                                    |
| **739**  | Xiaomi Redmi Note 7           | 2019 | H.264    | omx.google.h264.decoder           | sw   | 76     | 2.19         | 6.34                                    |
| **740**  | Samsung Galaxy S7             | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 124    | 4.87         | 6.34                                    |
| **741**  | Huawei P8lite                 | 2015 | MPEG-4   | omx.k3.video.decoder.mpeg4        | hw   | 225    | 4.33         | 6.35                                    |
| **742**  | Huawei Honor 8X               | 2018 | H.264    | omx.google.h264.decoder           | sw   | 56     | 2.29         | 6.35                                    |
| **743**  | Samsung Galaxy J3             | 2016 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 105    | 3.0          | 6.36                                    |
| **744**  | Samsung Galaxy S8             | 2017 | VP8      | omx.exynos.vp8.dec                | hw   | 135    | 3.99\*       | 6.36\*                                  |
| **745**  | Xiaomi Redmi Note 7           | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 63     | 2.19         | 6.38                                    |
| **746**  | Doogee BL5000 Smartphone      | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 71     | 2.12         | 6.38                                    |
| **747**  | Xiaomi Redmi 4 (4X)           | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 58     | 2.29         | 6.39                                    |
| **748**  | Xiaomi Redmi Note 8T          | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 178    | 4.57\*       | 6.41\*                                  |
| **749**  | Kruger & Matz FLOW 7          | 2019 | H.264    | omx.google.h264.decoder           | sw   | 98     | 2.15         | 6.41                                    |
| **750**  | Huawei Mate 10 Lite           | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 108    | 2.67         | 6.42                                    |
| **751**  | BQ Mobile BQS-5520 Mercury    | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 58     | 2.22         | 6.42                                    |
| **752**  | Xiaomi Mi A3                  | 2019 | H.264    | omx.google.h264.decoder           | sw   | 63     | 2.8          | 6.42                                    |
| **753**  | Xiaomi Redmi Note 4           | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 115\*  | 2.7\*        | 6.43\*                                  |
| **754**  | Honor 8 Pro                   | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 160\*  | 2.73         | 6.43\*                                  |
| **755**  | Huawei P smart 2019           | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 113    | 3.69         | 6.44                                    |
| **756**  | Honor 7X                      | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 94\*   | 2.31         | 6.46                                    |
| **757**  | Kruger & Matz FLOW 7          | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 97     | 2.15         | 6.46                                    |
| **758**  | Huawei Mate 10 Lite           | 2017 | H.264    | omx.google.h264.decoder           | sw   | 80     | 2.67         | 6.47                                    |
| **759**  | Huawei nova 2s                | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 142    | 3.42\*       | 6.47                                    |
| **760**  | Samsung Galaxy J2 Prime       | 2016 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 106    | 0.76         | 6.47                                    |
| **761**  | Xiaomi Redmi Note 8 Pro       | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 139    | 3.77\*       | 6.48\*                                  |
| **762**  | Honor 4C                      | 2015 | MPEG-4   | omx.k3.video.decoder.mpeg4        | hw   | 227    | 3.59         | 6.48                                    |
| **763**  | OnePlus 5T                    | 2017 | H.264    | omx.google.h264.decoder           | sw   | 78     | 2.87         | 6.49                                    |
| **764**  | Samsung Galaxy J2 Core        | 2020 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 121    | 2.97         | 6.49                                    |
| **765**  | Motorola Moto Z2 Play         | 2017 | H.264    | omx.google.h264.decoder           | sw   | 108    | 1.83         | 6.5                                     |
| **766**  | Samsung Galaxy Tab A 8.0      | 2015 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 113    | 3.52         | 6.52                                    |
| **767**  | Xiaomi Redmi Note 4           | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 97\*   | 1.88\*       | 6.52\*                                  |
| **768**  | Samsung Galaxy S7             | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 102    | 4.87         | 6.53                                    |
| **769**  | Honor 8 Pro                   | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 103\*  | 2.73         | 6.55                                    |
| **770**  | Xiaomi Redmi 3S               | 2016 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 129    | 5.71\*       | 6.56\*                                  |
| **771**  | Sony Xperia Z3                | 2014 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 107    | 3.28         | 6.58                                    |
| **772**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 117    | 2.49         | 6.58                                    |
| **773**  | vivo S1                       | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 173    | 1.66         | 6.59                                    |
| **774**  | Xiaomi Redmi Note 8 Pro       | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 140    | 3.77\*       | 6.59\*                                  |
| **775**  | Micromax Q3551                | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 44     | 2.59         | 6.59                                    |
| **776**  | vivo S1 Pro                   | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 98     | 2.35         | 6.59                                    |
| **777**  | Xiaomi Redmi 3S               | 2016 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 112    | 4.78         | 6.59                                    |
| **778**  | Doogee BL5000 Smartphone      | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 96     | 2.12         | 6.59                                    |
| **779**  | Samsung Galaxy A6+            | 2018 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 72     | 2.09         | 6.59                                    |
| **780**  | Samsung Galaxy A50            | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 111    | 2.57         | 6.6\*                                   |
| **781**  | Sony Xperia Z2                | 2014 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 107    | 3.34         | 6.6                                     |
| **782**  | Samsung Galaxy J6             | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 68     | 1.82         | 6.61                                    |
| **783**  | Samsung Galaxy J6             | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 68     | 1.82         | 6.63                                    |
| **784**  | Xiaomi Mi 9 Lite              | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 128\*  | 3.55\*       | 6.64                                    |
| **785**  | Samsung Galaxy A8             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 138    | 1.82\*       | 6.65                                    |
| **786**  | OnePlus 5T                    | 2017 | VP8      | c2.android.vp8.decoder            | sw   | 120    | 2.87         | 6.68                                    |
| **787**  | Samsung Galaxy A70            | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 138    | 2.85         | 6.68\*                                  |
| **788**  | Xiaomi Redmi S2               | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 116    | 4.3\*        | 6.69\*                                  |
| **789**  | Huawei Mate 10 Lite           | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 95     | 2.67         | 6.7                                     |
| **790**  | Samsung Galaxy S8+            | 2017 | H.264    | omx.google.h264.decoder           | sw   | 72     | 2.19         | 6.71                                    |
| **791**  | Honor 9 Lite                  | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 99     | 3.38\*       | 6.72\*                                  |
| **792**  | Xiaomi Mi MIX 2S              | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 123    | 3.49         | 6.72                                    |
| **793**  | Xiaomi Redmi Note 4           | 2017 | VP9      | c2.android.vp9.decoder            | sw   | 79     | 1.29         | 6.73                                    |
| **794**  | Sony Xperia XA1               | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 85     | 2.66         | 6.73                                    |
| **795**  | Xiaomi Mi 8 Lite              | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 129    | 4.36         | 6.73                                    |
| **796**  | Xiaomi Redmi 5                | 2017 | H.264    | omx.google.h264.decoder           | sw   | 110    | 1.57\*       | 6.74                                    |
| **797**  | Xiaomi Redmi Note 5           | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 104\*  | 3.28\*       | 6.75\*                                  |
| **798**  | Xiaomi Mi MIX 2S              | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 180    | 3.49         | 6.75                                    |
| **799**  | Xiaomi Mi MIX 2S              | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 181    | 3.49         | 6.75                                    |
| **800**  | Xiaomi Mi 9 Lite              | 2019 | VP8      | c2.android.vp8.decoder            | sw   | 119    | 3.03         | 6.75                                    |
| **801**  | BLACKVIEW BV9000 PRO          | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 71     | 3.13         | 6.77\*                                  |
| **802**  | Huawei Y5                     | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 75\*   | 3.05\*       | 6.78                                    |
| **803**  | Kruger & Matz FLOW 7          | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 83     | 2.15         | 6.79                                    |
| **804**  | Xiaomi Mi 9 Lite              | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 71     | 4.46\*       | 6.8\*                                   |
| **805**  | Xiaomi Redmi Note 5           | 2018 | H.264    | omx.google.h264.decoder           | sw   | 78\*   | 3.54\*       | 6.8                                     |
| **806**  | Honor 10                      | 2018 | H.264    | c2.android.avc.decoder            | sw   | 62     | 2.52         | 6.8                                     |
| **807**  | Huawei P20 lite               | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 110    | 3.11\*       | 6.81\*                                  |
| **808**  | Samsung Galaxy A50            | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 110    | 2.73         | 6.81                                    |
| **809**  | Yandex Smartphone             | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 175    | 4.97         | 6.82                                    |
| **810**  | Samsung Galaxy S8+            | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 106    | 2.19         | 6.82                                    |
| **811**  | Xiaomi Mi A3                  | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 92     | 2.8          | 6.82                                    |
| **812**  | BQ Mobile BQS-5520 Mercury    | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 62     | 2.22         | 6.83                                    |
| **813**  | Samsung Galaxy J5             | 2015 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 127    | 2.64         | 6.84                                    |
| **814**  | Xiaomi Mi A3                  | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 91     | 2.8          | 6.84                                    |
| **815**  | Sony XPERIA XZ1 Compact       | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 200    | 3.59         | 6.85                                    |
| **816**  | Xiaomi Redmi 5 Plus           | 2018 | H.264    | omx.google.h264.decoder           | sw   | 118    | 3.01\*       | 6.86\*                                  |
| **817**  | OnePlus 5 (A5000)             | 2017 | H.264    | c2.android.avc.decoder            | sw   | 91     | 2.93         | 6.89                                    |
| **818**  | OnePlus 5 (A5000)             | 2017 | H.264    | omx.google.h264.decoder           | sw   | 92     | 2.93         | 6.9                                     |
| **819**  | Xiaomi Redmi 6A               | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 87     | 2.43\*       | 6.93\*                                  |
| **820**  | OnePlus 5 (A5000)             | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 151    | 2.93         | 6.93                                    |
| **821**  | BLACKVIEW BV9000 PRO          | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 94     | 3.44         | 6.93                                    |
| **822**  | BLACKVIEW BV9000 PRO          | 2017 | H.264    | omx.google.h264.decoder           | sw   | 79     | 3.13         | 6.93                                    |
| **823**  | Xiaomi Redmi 6A               | 2018 | H.264    | omx.google.h264.decoder           | sw   | 84     | 2.43\*       | 6.94\*                                  |
| **824**  | Yota YotaPhone 2              | 2014 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 205    | 4.34         | 6.94                                    |
| **825**  | Xiaomi Redmi Note 4           | 2017 | H.264    | omx.google.h264.decoder           | sw   | 108    | 2.7\*        | 6.96\*                                  |
| **826**  | Oukitel C8 4G                 | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 95     | 3.43         | 6.96                                    |
| **827**  | Xiaomi Redmi Note 5           | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 182\*  | 5.86\*       | 6.97\*                                  |
| **828**  | Doogee BL5000 Smartphone      | 2017 | H.264    | omx.google.h264.decoder           | sw   | 85     | 2.12         | 6.99                                    |
| **829**  | Samsung Galaxy J7             | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 77     | 2.44\*       | 7.0                                     |
| **830**  | Xiaomi Mi MIX 2S              | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 112    | 3.49         | 7.0                                     |
| **831**  | Xiaomi Mi A2 Lite             | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 91     | 1.72         | 7.01                                    |
| **832**  | OnePlus 5T                    | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 118    | 2.87         | 7.03                                    |
| **833**  | Honor 20 lite                 | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 78     | 2.41         | 7.04                                    |
| **834**  | Honor 9 Lite                  | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 104\*  | 3.18\*       | 7.04                                    |
| **835**  | Sony XPERIA XZ1 Compact       | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 193    | 3.59         | 7.05                                    |
| **836**  | Yandex Smartphone             | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 180    | 4.97         | 7.05                                    |
| **837**  | Honor 20 lite                 | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 77     | 2.41         | 7.06                                    |
| **838**  | Sony Xperia Z3                | 2014 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 109    | 3.28         | 7.08                                    |
| **839**  | Honor 20s                     | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 86     | 2.42         | 7.09                                    |
| **840**  | Samsung Galaxy J7 Prime       | 2016 | H.264    | omx.sec.avc.sw\.dec               | sw   | 92     | 2.37         | 7.09                                    |
| **841**  | Xiaomi Redmi Note 8T          | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 166    | 4.63\*       | 7.13\*                                  |
| **842**  | Oukitel C8 4G                 | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 95     | 3.43         | 7.14                                    |
| **843**  | Honor 10                      | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 71     | 2.52         | 7.16                                    |
| **844**  | Samsung Galaxy J2 Core        | 2020 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 110    | 2.97         | 7.16                                    |
| **845**  | Huawei Y5                     | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 82\*   | 3.05\*       | 7.16                                    |
| **846**  | BQ Mobile BQS-5520 Mercury    | 2016 | H.264    | omx.google.h264.decoder           | sw   | 89     | 2.22         | 7.16                                    |
| **847**  | Samsung Galaxy J6             | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 85     | 1.82         | 7.17                                    |
| **848**  | Sony Xperia E5                | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 69     | 1.01         | 7.18                                    |
| **849**  | Samsung Galaxy J6             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 84     | 1.82         | 7.18                                    |
| **850**  | PSP5545DUO                    | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 61     | 2.54         | 7.19                                    |
| **851**  | OnePlus 5 (A5000)             | 2017 | VP8      | c2.android.vp8.decoder            | sw   | 157    | 2.93         | 7.2                                     |
| **852**  | Huawei Honor 8X               | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 78     | 2.29         | 7.2                                     |
| **853**  | Sony XPERIA XZ1 Compact       | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 84     | 3.59         | 7.21                                    |
| **854**  | Xiaomi Mi A2 Lite             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 109    | 3.44         | 7.22                                    |
| **855**  | Huawei Y5                     | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 70     | 3.05\*       | 7.22\*                                  |
| **856**  | Honor 8 Pro                   | 2017 | H.264    | omx.google.h264.decoder           | sw   | 61     | 2.73         | 7.23                                    |
| **857**  | ZTE Blade A5 (2019)           | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 82     | 1.77         | 7.24                                    |
| **858**  | Huawei nova 2s                | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 110    | 3.42\*       | 7.24                                    |
| **859**  | Xiaomi Redmi Note 8T          | 2019 | H.264    | omx.google.h264.decoder           | sw   | 116    | 4.74\*       | 7.25\*                                  |
| **860**  | Xiaomi Mi 8 Lite              | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 71     | 4.36         | 7.26                                    |
| **861**  | Xiaomi Redmi 6                | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 119    | 2.81         | 7.26                                    |
| **862**  | Xiaomi Redmi 6A               | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 81     | 2.62         | 7.27                                    |
| **863**  | Honor 10                      | 2018 | H.264    | omx.google.h264.decoder           | sw   | 62     | 2.52         | 7.28                                    |
| **864**  | Samsung Galaxy S8+            | 2017 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 97     | 2.19         | 7.31                                    |
| **865**  | Yandex Smartphone             | 2018 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 187    | 4.87         | 7.32                                    |
| **866**  | Samsung Galaxy C5 Pro         | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 102    | 2.13         | 7.32                                    |
| **867**  | Xiaomi Mi MIX 2S              | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 122    | 3.49         | 7.35                                    |
| **868**  | PSP5545DUO                    | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 56     | 2.54         | 7.36                                    |
| **869**  | Samsung Galaxy S8             | 2017 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 164\*  | 4.94\*       | 7.37\*                                  |
| **870**  | Motorola Moto Z2 Play         | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 81     | 1.83         | 7.38                                    |
| **871**  | Xiaomi Redmi 6A               | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 80     | 2.43\*       | 7.4                                     |
| **872**  | Dexp Ursus N570               | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 71     | 2.74         | 7.4                                     |
| **873**  | Samsung Galaxy J7 Prime       | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 70     | 2.09\*       | 7.4                                     |
| **874**  | OnePlus 5 (A5000)             | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 93     | 2.93         | 7.41                                    |
| **875**  | Xiaomi Redmi Note 8 Pro       | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 147    | 5.58         | 7.41                                    |
| **876**  | OnePlus 5 (A5000)             | 2017 | VP9      | c2.android.vp9.decoder            | sw   | 93     | 2.93         | 7.42                                    |
| **877**  | Digma Citi ATL 4G             | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 57     | 2.5          | 7.44                                    |
| **878**  | Samsung Galaxy C5 Pro         | 2017 | VP8      | omx.sec.vp8.dec                   | hw   | 84     | 2.13         | 7.46                                    |
| **879**  | SANTIN halove                 | 2019 | H.264    | omx.google.h264.decoder           | sw   | 86     | 0.65         | 7.49                                    |
| **880**  | PSP5545DUO                    | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 65     | 2.54         | 7.5                                     |
| **881**  | Samsung Galaxy J1             | 2016 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 62     | 2.43         | 7.5                                     |
| **882**  | Samsung Galaxy J6+            | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 69     | 2.0          | 7.52                                    |
| **883**  | Samsung Galaxy J4+            | 2018 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 70     | 2.25         | 7.53                                    |
| **884**  | Sony Xperia XA1               | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 101    | 2.66         | 7.53                                    |
| **885**  | Irbis TZ969                   | 2019 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 136    | 4.34         | 7.53                                    |
| **886**  | Sony Xperia Z5 Compact        | 2015 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 141    | 3.21         | 7.55                                    |
| **887**  | Asus Zenfone Max (M1) ZB555KL | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 60     | 1.91         | 7.56                                    |
| **888**  | ASUS ZenFone Max Pro M1       | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 126    | 1.85         | 7.56\*                                  |
| **889**  | Huawei P20 lite               | 2018 | H.264    | omx.google.h264.decoder           | sw   | 92     | 3.11\*       | 7.57\*                                  |
| **890**  | Honor 9 Lite                  | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 103\*  | 3.18\*       | 7.57                                    |
| **891**  | Honor 10                      | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 71     | 2.52         | 7.58                                    |
| **892**  | Xiaomi Redmi 3S               | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 69     | 6.65         | 7.61                                    |
| **893**  | Samsung Galaxy A5             | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 78\*   | 2.72\*       | 7.61\*                                  |
| **894**  | Xiaomi Mi 8 Lite              | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 129    | 4.36         | 7.61                                    |
| **895**  | Samsung Galaxy Note 4         | 2014 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 186    | 4.13         | 7.61                                    |
| **896**  | BQ Mobile BQS-5520 Mercury    | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 78     | 2.22         | 7.63                                    |
| **897**  | Samsung Galaxy A20s           | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 83     | 2.81         | 7.65                                    |
| **898**  | Samsung Galaxy Tab A 8.0      | 2015 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 100    | 3.52         | 7.67                                    |
| **899**  | Sony Xperia XZ                | 2016 | H.264    | omx.google.h264.decoder           | sw   | 97     | 2.69         | 7.69                                    |
| **900**  | Motorola Moto G               | 2013 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 75     | 2.52         | 7.69                                    |
| **901**  | Yandex Smartphone             | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 76     | 5.05         | 7.72                                    |
| **902**  | Honor 9                       | 2017 | MPEG-4   | omx.hisi.video.decoder.mpeg4      | hw   | 133    | 5.18         | 7.72                                    |
| **903**  | Xiaomi Mi A2 Lite             | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 84     | 3.44         | 7.73                                    |
| **904**  | Xiaomi Redmi Note 7           | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 74     | 2.19         | 7.73                                    |
| **905**  | Samsung Galaxy S8+            | 2017 | H.264    | omx.sec.avc.sw\.dec               | sw   | 99     | 2.19         | 7.74                                    |
| **906**  | Irbis TZ969                   | 2019 | H.264    | omx.vpu.video\_decoder.avc        | hw   | 128    | 4.34         | 7.74                                    |
| **907**  | Samsung Galaxy J3             | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 54     | 3.0          | 7.77                                    |
| **908**  | BQ Mobile BQS-5520 Mercury    | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 58     | 2.22         | 7.77                                    |
| **909**  | Sony Xperia XA1               | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 97     | 2.66         | 7.78                                    |
| **910**  | Xiaomi Mi MIX 2S              | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 125    | 3.49         | 7.78                                    |
| **911**  | Huawei Honor 8X               | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 78     | 2.29         | 7.81                                    |
| **912**  | Xiaomi Mi A1 (Mi 5X)          | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 87     | 2.49         | 7.83                                    |
| **913**  | Samsung Galaxy Note 4         | 2014 | VP8      | omx.exynos.vp8.dec                | hw   | 176    | 4.13         | 7.83                                    |
| **914**  | Samsung Galaxy J1             | 2016 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 58     | 2.43         | 7.84                                    |
| **915**  | Sony Xperia Z5 Compact        | 2015 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 120    | 3.21         | 7.87                                    |
| **916**  | Huawei P20 lite               | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 91     | 3.11\*       | 7.87\*                                  |
| **917**  | Honor 9 Lite                  | 2017 | H.264    | omx.google.h264.decoder           | sw   | 90\*   | 3.18\*       | 7.87                                    |
| **918**  | Asus Zenfone Live ZB501KL     | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 77     | 2.99         | 7.87                                    |
| **919**  | Xiaomi Mi 9 Lite              | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 87     | 4.46\*       | 7.87\*                                  |
| **920**  | Xiaomi Mi 9 Lite              | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 71     | 4.46\*       | 7.87\*                                  |
| **921**  | Samsung Galaxy A5             | 2017 | VP8      | omx.sec.vp8.dec                   | hw   | 69\*   | 2.72\*       | 7.91\*                                  |
| **922**  | Xiaomi Pocophone F1           | 2018 | H.264    | omx.google.h264.decoder           | sw   | 69     | 2.38         | 7.91                                    |
| **923**  | Irbis TZ969                   | 2019 | VP8      | omx.sprd.vpx.decoder              | hw   | 122    | 4.34         | 7.91                                    |
| **924**  | Samsung Galaxy Grand Prime    | 2014 | VP8      | omx.sec.vp8.dec                   | hw   | 49     | 2.21         | 7.93                                    |
| **925**  | Xiaomi Pocophone F1           | 2018 | H.264    | c2.android.avc.decoder            | sw   | 69     | 2.38         | 7.93                                    |
| **926**  | Samsung Galaxy J6+            | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 58     | 2.0          | 7.95                                    |
| **927**  | Samsung Galaxy J5             | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 82     | 2.64         | 7.95                                    |
| **928**  | Honor 9                       | 2017 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 121    | 5.18         | 7.96                                    |
| **929**  | Huawei P20 lite               | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 98\*   | 3.11\*       | 7.99\*                                  |
| **930**  | Xiaomi Mi 8 Lite              | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 71     | 4.36         | 7.99                                    |
| **931**  | Samsung Galaxy J3             | 2016 | VP8      | omx.sec.vp8.dec                   | hw   | 56\*   | 2.66\*       | 8.01                                    |
| **932**  | Asus Google Nexus 7           | 2012 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 108    | 1.38         | 8.01                                    |
| **933**  | Nokia 5                       | 2017 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 161    | 5.17         | 8.01                                    |
| **934**  | Samsung Galaxy J2 Prime       | 2016 | H.264    | omx.google.h264.decoder           | sw   | 80     | 0.76         | 8.01                                    |
| **935**  | Xiaomi Redmi S2               | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 91     | 4.3\*        | 8.06\*                                  |
| **936**  | UMiDIGI C Note 2              | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 89     | 4.16         | 8.06                                    |
| **937**  | Xiaomi Mi A2 Lite             | 2018 | H.264    | omx.google.h264.decoder           | sw   | 107    | 3.44         | 8.07                                    |
| **938**  | Dexp Ursus N570               | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 89     | 2.74         | 8.08                                    |
| **939**  | Digma Citi ATL 4G             | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 59     | 2.5          | 8.09                                    |
| **940**  | BLACKVIEW BV9000 PRO          | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 98     | 3.13         | 8.1\*                                   |
| **941**  | Digma Citi ATL 4G             | 2017 | H.264    | omx.google.h264.decoder           | sw   | 56     | 2.5          | 8.11                                    |
| **942**  | Xiaomi Mi 9 Lite              | 2019 | H.264    | c2.android.avc.decoder            | sw   | 64     | 3.03         | 8.11                                    |
| **943**  | Huawei Y5 lite                | 2018 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 65     | 2.66         | 8.14                                    |
| **944**  | Samsung Galaxy A8             | 2018 | H.264    | omx.sec.avc.sw\.dec               | sw   | 109\*  | 2.0          | 8.15\*                                  |
| **945**  | OnePlus 5T                    | 2017 | VP9      | c2.android.vp9.decoder            | sw   | 65     | 2.87         | 8.16                                    |
| **946**  | Xiaomi Mi 9 Lite              | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 82     | 4.46\*       | 8.16                                    |
| **947**  | Huawei P smart 2019           | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 93     | 3.69         | 8.16                                    |
| **948**  | Huawei Y5 lite                | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 70     | 2.66         | 8.18                                    |
| **949**  | OnePlus 5T                    | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 56     | 2.87         | 8.21                                    |
| **950**  | Samsung Galaxy J7             | 2015 | H.264    | omx.google.h264.decoder           | sw   | 110    | 2.54\*       | 8.21\*                                  |
| **951**  | Samsung Galaxy Grand Prime    | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 62     | 2.21         | 8.21                                    |
| **952**  | Xiaomi Mi 9 Lite              | 2019 | H.264    | omx.google.h264.decoder           | sw   | 64     | 4.08         | 8.21                                    |
| **953**  | Xiaomi Redmi Note 8T          | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 100    | 7.2\*        | 8.22\*                                  |
| **954**  | Asus Google Nexus 7           | 2012 | HEVC     | omx.google.hevc.decoder           | sw   | 108    | 1.38         | 8.24                                    |
| **955**  | Samsung Galaxy J4             | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 56     | 5.19         | 8.25                                    |
| **956**  | Samsung Galaxy J2 Prime       | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 66     | 0.76         | 8.27                                    |
| **957**  | Samsung Galaxy C5 Pro         | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 88     | 2.13         | 8.28                                    |
| **958**  | SANTIN halove                 | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 84     | 0.65         | 8.3                                     |
| **959**  | Samsung Galaxy J1             | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 53     | 2.43         | 8.3                                     |
| **960**  | Honor 9 Lite                  | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 86\*   | 3.18\*       | 8.31\*                                  |
| **961**  | Samsung Galaxy S8             | 2017 | VP8      | omx.sec.vp8.dec                   | hw   | 107    | 3.99\*       | 8.35\*                                  |
| **962**  | Honor 9                       | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 105    | 5.18         | 8.35                                    |
| **963**  | SANTIN halove                 | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 71     | 0.65         | 8.36                                    |
| **964**  | Asus Zenfone 3 Max            | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 73     | 2.04         | 8.36                                    |
| **965**  | LG X Power                    | 2016 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 85     | 1.24         | 8.36\*                                  |
| **966**  | Huawei P smart 2019           | 2019 | VP9      | c2.android.vp9.decoder            | sw   | 98     | 3.69         | 8.38                                    |
| **967**  | Xiaomi Mi MIX 2S              | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 88     | 3.49         | 8.39                                    |
| **968**  | UMiDIGI C Note 2              | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 83     | 4.16         | 8.4                                     |
| **969**  | Xiaomi Redmi 4 (4X)           | 2017 | H.264    | omx.google.h264.decoder           | sw   | 74\*   | 4.24\*       | 8.41\*                                  |
| **970**  | VERTEX Impress Wolf           | 2018 | VP8      | omx.sprd.vpx.decoder              | hw   | 135    | 4.34         | 8.42                                    |
| **971**  | Xiaomi Mi Max 2               | 2017 | H.264    | omx.google.h264.decoder           | sw   | 104    | 3.58         | 8.44                                    |
| **972**  | Doogee BL5000 Smartphone      | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 66     | 2.12         | 8.44                                    |
| **973**  | Huawei nova 2s                | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 84     | 3.42\*       | 8.44\*                                  |
| **974**  | Huawei Y5 lite                | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 68     | 2.66         | 8.51                                    |
| **975**  | VERTEX Impress Wolf           | 2018 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 154    | 4.34         | 8.52                                    |
| **976**  | Sony Xperia Z5 Compact        | 2015 | H.264    | omx.google.h264.decoder           | sw   | 76     | 3.21         | 8.52                                    |
| **977**  | Doogee BL5000 Smartphone      | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 69     | 2.12         | 8.52                                    |
| **978**  | Xiaomi Mi 8 Lite              | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 114    | 4.36         | 8.55                                    |
| **979**  | Xiaomi Mi A2 Lite             | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 91     | 3.44         | 8.56                                    |
| **980**  | Huawei P30                    | 2019 | AV1      | c2.android.av1.decoder            | sw   | 34     | 1.89         | 8.57                                    |
| **981**  | Huawei nova 2s                | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 92     | 3.42\*       | 8.57                                    |
| **982**  | Lenovo Vibe Shot              | 2015 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 110    | 5.3          | 8.6                                     |
| **983**  | Samsung Galaxy S8             | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 119    | 4.94\*       | 8.61\*                                  |
| **984**  | Xiaomi Mi 8 Lite              | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 114    | 4.36         | 8.61                                    |
| **985**  | OnePlus 5T                    | 2017 | HEVC     | c2.android.hevc.decoder           | sw   | 56     | 2.87         | 8.63                                    |
| **986**  | Dexp Ursus N570               | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 67     | 2.74         | 8.63                                    |
| **987**  | Xiaomi Redmi S2               | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 95     | 2.7          | 8.63                                    |
| **988**  | Lenovo Vibe Shot              | 2015 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 108    | 5.3          | 8.67                                    |
| **989**  | Xiaomi Redmi Note 5           | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 119\*  | 3.28\*       | 8.68\*                                  |
| **990**  | Digma CITI 8588 3G CS8205PG   | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 48     | 2.72         | 8.68                                    |
| **991**  | Huawei Y5                     | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 65\*   | 3.05\*       | 8.68\*                                  |
| **992**  | Samsung Galaxy S8             | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 68     | 4.94\*       | 8.69\*                                  |
| **993**  | Oukitel C8 4G                 | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 58     | 3.43         | 8.69                                    |
| **994**  | Asus Google Nexus 7           | 2012 | VP8      | omx.google.vp8.decoder            | sw   | 97     | 1.38         | 8.72                                    |
| **995**  | UMiDIGI C Note 2              | 2017 | H.264    | omx.google.h264.decoder           | sw   | 81     | 4.16         | 8.75                                    |
| **996**  | Samsung Galaxy J4             | 2018 | MPEG-4   | omx.exynos.mpeg4.dec              | hw   | 194    | 7.03\*       | 8.76\*                                  |
| **997**  | Xiaomi Mi Max 2               | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 87     | 3.58         | 8.77\*                                  |
| **998**  | Samsung Galaxy J7             | 2015 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 69     | 2.44\*       | 8.83\*                                  |
| **999**  | Samsung Galaxy J7 Prime       | 2016 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 60     | 2.09\*       | 8.86                                    |
| **1000** | Digma CITI 8588 3G CS8205PG   | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 49     | 2.72         | 8.86                                    |
| **1001** | Xiaomi Redmi 4 (4X)           | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 59     | 4.24\*       | 8.86\*                                  |
| **1002** | Xiaomi Mi 8 Lite              | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 129    | 4.36         | 8.86                                    |
| **1003** | Samsung Galaxy J6+            | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 55     | 2.0          | 8.9                                     |
| **1004** | VERTEX Impress Wolf           | 2018 | H.264    | omx.vpu.video\_decoder.avc        | hw   | 140    | 4.34         | 8.91                                    |
| **1005** | Samsung Galaxy J2 Core        | 2020 | VP8      | omx.google.vp8.decoder            | sw   | 57     | 2.97         | 8.92                                    |
| **1006** | Xiaomi Mi A1 (Mi 5X)          | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 91     | 2.49         | 8.94                                    |
| **1007** | Huawei Y5 lite                | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 62     | 2.66         | 9.01                                    |
| **1008** | vivo S1                       | 2019 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 122    | 1.66         | 9.02                                    |
| **1009** | Samsung Galaxy J2 Core        | 2020 | H.264    | omx.google.h264.decoder           | sw   | 69     | 2.97         | 9.02                                    |
| **1010** | Samsung Galaxy A5             | 2014 | H.264    | omx.google.h264.decoder           | sw   | 80\*   | 2.91         | 9.03\*                                  |
| **1011** | Xiaomi Redmi 8                | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 94     | 8.94         | 9.07                                    |
| **1012** | BLACKVIEW BV9000 PRO          | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 99     | 3.13         | 9.07\*                                  |
| **1013** | Xiaomi Redmi 8                | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 81     | 8.94         | 9.08                                    |
| **1014** | Samsung Galaxy Grand Prime    | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 46     | 2.21         | 9.1                                     |
| **1015** | Xiaomi Redmi 8                | 2019 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 78     | 8.94         | 9.1                                     |
| **1016** | Honor 4C                      | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 70     | 3.59         | 9.1                                     |
| **1017** | Samsung Galaxy J4             | 2018 | VP8      | omx.exynos.vp8.dec                | hw   | 164    | 7.03\*       | 9.11\*                                  |
| **1018** | Samsung Galaxy Tab A 8.0      | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 60     | 3.52         | 9.11                                    |
| **1019** | Sony Xperia Z5 Compact        | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 61     | 3.21         | 9.13                                    |
| **1020** | Huawei P smart 2019           | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 60     | 3.69         | 9.13                                    |
| **1021** | Samsung Galaxy J5             | 2015 | VP8      | omx.sec.vp8.dec                   | hw   | 59     | 2.49         | 9.19\*                                  |
| **1022** | Xiaomi Mi Max 2               | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 96     | 3.58         | 9.21\*                                  |
| **1023** | OnePlus 5 (A5000)             | 2017 | HEVC     | c2.android.hevc.decoder           | sw   | 62     | 2.93         | 9.23                                    |
| **1024** | Xiaomi Redmi 8                | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 204    | 8.94         | 9.23                                    |
| **1025** | LG Nexus 5                    | 2013 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 197    | 6.55         | 9.23                                    |
| **1026** | Samsung Galaxy J3             | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 70\*   | 2.66\*       | 9.24\*                                  |
| **1027** | Samsung Galaxy S8             | 2017 | H.264    | omx.google.h264.decoder           | sw   | 73     | 5.86\*       | 9.24\*                                  |
| **1028** | Huawei nova 2s                | 2017 | H.264    | omx.google.h264.decoder           | sw   | 62     | 3.42\*       | 9.26                                    |
| **1029** | Xiaomi Redmi 4 (4X)           | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 77\*   | 4.24\*       | 9.27\*                                  |
| **1030** | Huawei Honor 4X               | 2014 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 82     | 3.49         | 9.3                                     |
| **1031** | Xiaomi Mi 9T                  | 2019 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 145    | 9.18         | 9.3                                     |
| **1032** | Xiaomi Mi MIX 2S              | 2018 | H.264    | omx.google.h264.decoder           | sw   | 73     | 3.49         | 9.31                                    |
| **1033** | Xiaomi Mi A2                  | 2018 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 139    | 9.07         | 9.35                                    |
| **1034** | Digma Citi ATL 4G             | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 47     | 2.5          | 9.36                                    |
| **1035** | Xiaomi Redmi 3S               | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 52     | 5.71\*       | 9.36\*                                  |
| **1036** | Samsung Galaxy S9+            | 2018 | HEVC     | omx.exynos.hevc.dec               | hw   | 117    | 5.63         | 9.36                                    |
| **1037** | Xiaomi Mi 8 Lite              | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 64     | 4.36         | 9.36                                    |
| **1038** | Nokia 5                       | 2017 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 164    | 5.17         | 9.39                                    |
| **1039** | UMiDIGI C Note 2              | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 81     | 4.16         | 9.41                                    |
| **1040** | Samsung Galaxy J4+            | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 53     | 2.25         | 9.44                                    |
| **1041** | Xiaomi Mi 9T                  | 2019 | AV1      | c2.android.av1.decoder            | sw   | 715    | 9.4          | 9.44                                    |
| **1042** | Samsung Galaxy Note 4         | 2014 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 121    | 4.13         | 9.44                                    |
| **1043** | Lenovo Vibe Shot              | 2015 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 112    | 5.3          | 9.46                                    |
| **1044** | Xiaomi Mi A2                  | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 149    | 9.07         | 9.47                                    |
| **1045** | Samsung Galaxy S8             | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 106    | 3.03         | 9.49\*                                  |
| **1046** | Samsung Galaxy S7             | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 86     | 4.87         | 9.49                                    |
| **1047** | Xiaomi Redmi 8                | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 96     | 8.94         | 9.5                                     |
| **1048** | Huawei Y5                     | 2017 | H.264    | omx.google.h264.decoder           | sw   | 93\*   | 3.05\*       | 9.5\*                                   |
| **1049** | Samsung Galaxy S8             | 2017 | H.264    | omx.sec.avc.sw\.dec               | sw   | 117    | 4.94\*       | 9.52\*                                  |
| **1050** | Lenovo Vibe Shot              | 2015 | H.264    | omx.qcom.video.decoder.avc        | hw   | 110    | 5.3          | 9.53                                    |
| **1051** | PSP5545DUO                    | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 83     | 2.54         | 9.55                                    |
| **1052** | OnePlus 5 (A5000)             | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 62     | 2.93         | 9.57                                    |
| **1053** | Oukitel C8 4G                 | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 72     | 3.43         | 9.63                                    |
| **1054** | Samsung Galaxy J2 Core        | 2020 | VP9      | omx.google.vp9.decoder            | sw   | 44     | 2.97         | 9.66                                    |
| **1055** | Digma Citi ATL 4G             | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 48     | 2.5          | 9.66                                    |
| **1056** | LG Nexus 5                    | 2013 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 198    | 6.55         | 9.67                                    |
| **1057** | Xiaomi Mi 9T                  | 2019 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 153    | 9.4          | 9.69                                    |
| **1058** | Huawei Y6 Prime               | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 77     | 3.54         | 9.69                                    |
| **1059** | Samsung Galaxy Grand Prime    | 2014 | H.264    | omx.sec.avc.sw\.dec               | sw   | 50     | 2.21         | 9.69                                    |
| **1060** | Xiaomi Redmi 8                | 2019 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 187    | 8.94         | 9.72                                    |
| **1061** | Irbis SP05                    | 2016 | H.264    | omx.sprd.h264.decoder             | hw   | 111    | 5.16         | 9.73                                    |
| **1062** | Xiaomi Mi Max 2               | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 116    | 3.58         | 9.76\*                                  |
| **1063** | Oukitel C8 4G                 | 2017 | H.264    | omx.google.h264.decoder           | sw   | 88     | 3.43         | 9.83                                    |
| **1064** | Huawei P8lite                 | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 82     | 4.33         | 9.86                                    |
| **1065** | Xiaomi Redmi 4 (4X)           | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 77     | 4.24\*       | 9.88\*                                  |
| **1066** | Samsung Galaxy J4             | 2018 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 113    | 7.03\*       | 9.89\*                                  |
| **1067** | Samsung Galaxy J1             | 2016 | VP8      | omx.sec.vp8.dec                   | hw   | 49     | 2.23         | 9.9                                     |
| **1068** | Samsung Galaxy S8             | 2017 | HEVC     | omx.exynos.hevc.dec               | hw   | 109    | 8.63         | 9.92                                    |
| **1069** | Xiaomi Mi A1 (Mi 5X)          | 2017 | H.264    | omx.google.h264.decoder           | sw   | 124    | 2.49         | 9.94                                    |
| **1070** | Samsung Galaxy S7             | 2016 | H.264    | omx.google.h264.decoder           | sw   | 87     | 4.87         | 9.97                                    |
| **1071** | Huawei P smart 2019           | 2019 | HEVC     | c2.android.hevc.decoder           | sw   | 59     | 3.69         | 9.98                                    |
| **1072** | Xiaomi Redmi 3S               | 2016 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 131    | 6.65         | 9.99                                    |
| **1073** | Xiaomi Mi 9T                  | 2019 | H.264    | omx.qcom.video.decoder.avc        | hw   | 161    | 9.18         | 9.99                                    |
| **1074** | Xiaomi Mi 8 Lite              | 2018 | H.264    | omx.google.h264.decoder           | sw   | 74     | 4.36         | 10.02                                   |
| **1075** | Samsung Galaxy S8             | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 129\*  | 3.99\*       | 10.06\*                                 |
| **1076** | Huawei Honor 4X               | 2014 | VP8      | omx.google.vp8.decoder            | sw   | 71     | 3.49         | 10.07                                   |
| **1077** | Yandex Smartphone             | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 98     | 4.97         | 10.08                                   |
| **1078** | LG Nexus 5                    | 2013 | H.264    | omx.qcom.video.decoder.avc        | hw   | 180    | 6.55         | 10.09                                   |
| **1079** | Samsung Galaxy J2 Prime       | 2016 | H.264    | omx.sec.avc.sw\.dec               | sw   | 66     | 0.76         | 10.09                                   |
| **1080** | Xiaomi Redmi 3S               | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 68     | 5.71\*       | 10.1\*                                  |
| **1081** | Xiaomi Mi A2                  | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 109    | 9.07         | 10.11                                   |
| **1082** | Micromax Q3551                | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 52     | 2.59         | 10.11                                   |
| **1083** | Samsung Galaxy J2 Core        | 2020 | HEVC     | omx.google.hevc.decoder           | sw   | 58     | 2.97         | 10.13                                   |
| **1084** | Samsung Galaxy S7             | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 94     | 4.87         | 10.13                                   |
| **1085** | Samsung Galaxy J4             | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 80\*   | 7.03\*       | 10.18                                   |
| **1086** | Samsung Galaxy J4+            | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 55     | 2.25         | 10.19                                   |
| **1087** | Xiaomi Mi A2                  | 2018 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 151    | 9.07         | 10.29                                   |
| **1088** | Samsung Galaxy J4             | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 59     | 5.19         | 10.31                                   |
| **1089** | Huawei P8lite                 | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 65     | 4.33         | 10.32                                   |
| **1090** | Samsung Galaxy J4             | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 91     | 5.19         | 10.33                                   |
| **1091** | Xiaomi Redmi 4 (4X)           | 2017 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 100    | 3.96\*       | 10.33\*                                 |
| **1092** | Motorola Moto G               | 2013 | VP8      | omx.google.vp8.decoder            | sw   | 50     | 2.52         | 10.33                                   |
| **1093** | Xiaomi Redmi 8                | 2019 | H.264    | omx.google.h264.decoder           | sw   | 94     | 8.94         | 10.34                                   |
| **1094** | Samsung Galaxy J5             | 2016 | H.264    | omx.google.h264.decoder           | sw   | 62     | 2.18         | 10.34                                   |
| **1095** | Honor 9                       | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 117    | 5.18         | 10.34                                   |
| **1096** | Huawei Y6 Prime               | 2018 | H.264    | omx.google.h264.decoder           | sw   | 97     | 3.54         | 10.34                                   |
| **1097** | Xiaomi Mi A2                  | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 137    | 9.07         | 10.4                                    |
| **1098** | Xiaomi Redmi 6                | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 106    | 2.81         | 10.4                                    |
| **1099** | Honor 4C                      | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 60     | 3.59         | 10.41                                   |
| **1100** | Xiaomi Mi A2                  | 2018 | H.264    | omx.google.h264.decoder           | sw   | 75     | 9.07         | 10.46                                   |
| **1101** | UMiDIGI C Note 2              | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 71     | 4.16         | 10.56                                   |
| **1102** | Xiaomi Redmi 6                | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 86     | 2.81         | 10.57                                   |
| **1103** | Huawei Y5 lite                | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 81     | 2.66         | 10.61                                   |
| **1104** | Huawei Y6 Prime               | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 67     | 3.54         | 10.63                                   |
| **1105** | Asus Zenfone Live ZB501KL     | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 56     | 2.99         | 10.67                                   |
| **1106** | Oukitel C8 4G                 | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 57     | 3.43         | 10.71                                   |
| **1107** | Yota YotaPhone 2              | 2014 | VP8      | omx.google.vp8.decoder            | sw   | 99     | 4.34         | 10.73                                   |
| **1108** | Huawei Y9 Prime (2019)        | 2019 | AV1      | c2.android.av1.decoder            | sw   | 21     | 1.93         | 10.81                                   |
| **1109** | Xiaomi Mi 9T                  | 2019 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 150    | 9.28         | 10.81                                   |
| **1110** | Samsung Galaxy S7             | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 73     | 4.87         | 10.84                                   |
| **1111** | Digma CITI 8588 3G CS8205PG   | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 38     | 2.72         | 10.86                                   |
| **1112** | Yandex Smartphone             | 2018 | H.264    | omx.google.h264.decoder           | sw   | 115    | 5.05         | 10.9                                    |
| **1113** | Sony Xperia Z2                | 2014 | VP8      | omx.google.vp8.decoder            | sw   | 100    | 3.34         | 10.91                                   |
| **1114** | Samsung Galaxy A3             | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 61     | 1.99         | 10.96                                   |
| **1115** | Samsung Galaxy J4             | 2018 | H.264    | omx.exynos.avc.dec                | hw   | 175    | 8.86         | 11.02                                   |
| **1116** | Xiaomi Mi 8 Lite              | 2018 | H.264    | c2.android.avc.decoder            | sw   | 74     | 4.36         | 11.07                                   |
| **1117** | Nokia 5                       | 2017 | H.264    | omx.qcom.video.decoder.avc        | hw   | 169    | 5.17         | 11.08                                   |
| **1118** | Xiaomi Mi MIX 2S              | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 83     | 3.49         | 11.11                                   |
| **1119** | Yota YotaPhone 2              | 2014 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 117    | 4.34         | 11.12                                   |
| **1120** | PSP5545DUO                    | 2018 | H.264    | omx.google.h264.decoder           | sw   | 75     | 2.54         | 11.15                                   |
| **1121** | Samsung Galaxy J6+            | 2018 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 41     | 2.0          | 11.21                                   |
| **1122** | Samsung Galaxy C5 Pro         | 2017 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 76     | 2.13         | 11.21                                   |
| **1123** | Oukitel C8 4G                 | 2017 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 66     | 3.43         | 11.21                                   |
| **1124** | Samsung Galaxy C5 Pro         | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 62     | 2.13         | 11.27                                   |
| **1125** | Xiaomi Mi A2                  | 2018 | VP8      | c2.android.vp8.decoder            | sw   | 129    | 9.07         | 11.33                                   |
| **1126** | Xiaomi Redmi 6                | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 75     | 2.81         | 11.39                                   |
| **1127** | Samsung Galaxy Tab A 10.1     | 2019 | AV1      | c2.android.av1.decoder            | sw   | 24     | 2.36         | 11.43                                   |
| **1128** | Huawei P8lite                 | 2015 | H.264    | omx.google.h264.decoder           | sw   | 63     | 4.33         | 11.47                                   |
| **1129** | Samsung Galaxy J4             | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 59     | 5.19         | 11.51                                   |
| **1130** | Xiaomi Mi A2                  | 2018 | MPEG-4   | c2.android.mpeg4.decoder          | sw   | 109    | 9.07         | 11.61                                   |
| **1131** | Samsung Galaxy S9+            | 2018 | VP9      | omx.exynos.vp9.dec                | hw   | 116    | 5.63         | 11.65                                   |
| **1132** | Honor 9                       | 2017 | H.264    | omx.google.h264.decoder           | sw   | 60     | 5.18         | 11.65                                   |
| **1133** | Motorola Moto G               | 2013 | HEVC     | omx.google.hevc.decoder           | sw   | 63     | 2.52         | 11.71                                   |
| **1134** | Oukitel C8 4G                 | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 54     | 3.43         | 11.79                                   |
| **1135** | Xiaomi Mi A2                  | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 128    | 9.07         | 11.87                                   |
| **1136** | Samsung Galaxy Grand Prime    | 2014 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 39     | 2.21         | 11.89                                   |
| **1137** | Samsung Galaxy J1             | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 46     | 2.23         | 11.89                                   |
| **1138** | Huawei Honor 8X               | 2018 | H.264    | omx.hisi.video.decoder.avc        | hw   | 124    | 2.29         | 11.92                                   |
| **1139** | Xiaomi Redmi S2               | 2018 | H.264    | omx.google.h264.decoder           | sw   | 117    | 5.9          | 11.97                                   |
| **1140** | Honor 9                       | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 118    | 5.18         | 11.98                                   |
| **1141** | Xiaomi Mi A2                  | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 62     | 9.07         | 11.99                                   |
| **1142** | Xiaomi Mi 8 Lite              | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 64     | 4.36         | 12.02                                   |
| **1143** | UMiDIGI C Note 2              | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 68     | 4.16         | 12.02                                   |
| **1144** | Samsung Galaxy Note 4         | 2014 | VP8      | omx.google.vp8.decoder            | sw   | 63     | 4.13         | 12.03                                   |
| **1145** | Samsung Galaxy S8             | 2017 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 107\*  | 3.99\*       | 12.1\*                                  |
| **1146** | UMiDIGI C Note 2              | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 82     | 4.16         | 12.15                                   |
| **1147** | Samsung Galaxy J1             | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 63     | 2.23         | 12.16\*                                 |
| **1148** | Samsung Galaxy J4             | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 56     | 7.03\*       | 12.19\*                                 |
| **1149** | Samsung Galaxy Tab A 8.0      | 2015 | VP8      | omx.sec.vp8.dec                   | hw   | 59     | 3.52         | 12.21                                   |
| **1150** | Asus Zenfone Max (M1) ZB555KL | 2018 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 67     | 1.91         | 12.23                                   |
| **1151** | Samsung Galaxy J4             | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 59     | 7.03\*       | 12.23                                   |
| **1152** | Honor 4C                      | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 47     | 3.59         | 12.23                                   |
| **1153** | Xiaomi Redmi 3S               | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 59     | 5.71\*       | 12.25\*                                 |
| **1154** | Nokia 5                       | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 86     | 5.17         | 12.27                                   |
| **1155** | Yota YotaPhone 2              | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 82     | 4.34         | 12.3                                    |
| **1156** | Samsung Galaxy A8             | 2018 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 77     | 1.82\*       | 12.3\*                                  |
| **1157** | Samsung Galaxy J4             | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 65     | 5.19         | 12.32                                   |
| **1158** | Asus Zenfone Live ZB501KL     | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 45     | 2.99         | 12.4                                    |
| **1159** | Xiaomi Mi A2                  | 2018 | HEVC     | c2.android.hevc.decoder           | sw   | 62     | 9.07         | 12.42                                   |
| **1160** | Irbis SP05                    | 2016 | VP8      | omx.sprd.vpx.decoder              | hw   | 117    | 5.16         | 12.46                                   |
| **1161** | Sony Xperia E5                | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 58     | 1.01         | 12.47                                   |
| **1162** | Samsung Galaxy Note 4         | 2014 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 167    | 4.13         | 12.48                                   |
| **1163** | Samsung Galaxy A50            | 2019 | AV1      | c2.android.av1.decoder            | sw   | 21     | 2.62         | 12.65                                   |
| **1164** | Yota YotaPhone 2              | 2014 | H.264    | omx.google.h264.decoder           | sw   | 95     | 4.34         | 12.67                                   |
| **1165** | Lenovo Vibe Shot              | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 83     | 5.3          | 12.7                                    |
| **1166** | Highscreen Power Rage         | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 118    | 8.08         | 12.72                                   |
| **1167** | Huawei P8lite                 | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 63     | 4.33         | 12.74                                   |
| **1168** | Samsung Galaxy J4             | 2018 | H.264    | omx.sec.avc.sw\.dec               | sw   | 53     | 8.86         | 12.76                                   |
| **1169** | Doogee X30                    | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 63     | 12.39        | 12.76                                   |
| **1170** | Asus Zenfone 2 Laser ZE550KL  | 2015 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 118    | 11.24        | 12.8                                    |
| **1171** | VERTEX Impress Wolf           | 2018 | H.264    | omx.google.h264.decoder           | sw   | 66     | 4.34         | 12.8                                    |
| **1172** | Xiaomi Redmi 6                | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 77     | 2.81         | 12.81                                   |
| **1173** | Samsung Galaxy Note 4         | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 57     | 4.13         | 12.81                                   |
| **1174** | Huawei Y5 lite                | 2018 | H.264    | omx.google.h264.decoder           | sw   | 75     | 2.66         | 12.82                                   |
| **1175** | Irbis SP05                    | 2016 | MPEG-4   | omx.sprd.mpeg4.decoder            | hw   | 92     | 5.16         | 12.85                                   |
| **1176** | Xiaomi Mi A2                  | 2018 | VP9      | c2.android.vp9.decoder            | sw   | 69     | 9.07         | 12.87                                   |
| **1177** | Huawei Y5II                   | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 39     | 9.02         | 12.87                                   |
| **1178** | Samsung Galaxy J4+            | 2018 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 36     | 2.25         | 12.87                                   |
| **1179** | Samsung Galaxy Note9          | 2018 | AV1      | c2.android.av1.decoder            | sw   | 41     | 1.94         | 12.95                                   |
| **1180** | Doogee X30                    | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 40     | 12.39        | 12.99                                   |
| **1181** | Sony Xperia XZ                | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 85     | 2.69         | 13.04                                   |
| **1182** | Nokia 5                       | 2017 | MPEG-4   | omx.qti.video.decoder.mpeg4sw     | sw   | 146    | 5.17         | 13.06                                   |
| **1183** | Samsung Galaxy Note 4         | 2014 | H.264    | omx.sec.avc.sw\.dec               | sw   | 55     | 4.13         | 13.06                                   |
| **1184** | Huawei Honor 4X               | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 53     | 3.49         | 13.15                                   |
| **1185** | Samsung Galaxy Tab A 8.0      | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 42     | 3.52         | 13.29                                   |
| **1186** | Huawei P8lite                 | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 71     | 4.33         | 13.33                                   |
| **1187** | Irbis TZ969                   | 2019 | VP8      | omx.google.vp8.decoder            | sw   | 45     | 4.34         | 13.45                                   |
| **1188** | ASUS ZenFone 3                | 2016 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 142    | 12.87        | 13.51                                   |
| **1189** | Samsung Galaxy J4             | 2018 | HEVC     | omx.exynos.hevc.dec               | hw   | 166    | 8.86         | 13.51                                   |
| **1190** | Irbis TZ969                   | 2019 | H.264    | omx.google.h264.decoder           | sw   | 47     | 4.34         | 13.53                                   |
| **1191** | Samsung Galaxy J4             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 65     | 7.03\*       | 13.55                                   |
| **1192** | Xiaomi Redmi 3S               | 2016 | H.264    | omx.google.h264.decoder           | sw   | 68     | 6.65         | 13.62                                   |
| **1193** | ASUS ZenFone 3                | 2016 | H.264    | omx.qcom.video.decoder.avc        | hw   | 154    | 12.87        | 13.62                                   |
| **1194** | Samsung Galaxy J4             | 2018 | H.264    | omx.google.h264.decoder           | sw   | 78     | 8.86         | 13.66                                   |
| **1195** | Samsung Galaxy Note 4         | 2014 | VP8      | omx.sec.vp8.dec                   | hw   | 67     | 4.13         | 13.7                                    |
| **1196** | Motorola Moto G               | 2013 | VP9      | omx.google.vp9.decoder            | sw   | 39     | 2.52         | 13.71                                   |
| **1197** | Sony Xperia Z2                | 2014 | HEVC     | omx.qcom.video.decoder.hevchybrid | hr   | 65     | 3.58         | 13.78                                   |
| **1198** | Honor 4C                      | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 64     | 3.59         | 13.82                                   |
| **1199** | Samsung Galaxy J4+            | 2018 | H.264    | omx.sec.avc.sw\.dec               | sw   | 45     | 2.25         | 13.86                                   |
| **1200** | Huawei Y5II                   | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 42     | 9.02         | 13.87                                   |
| **1201** | Asus Zenfone 2 Laser ZE550KL  | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 70     | 11.24        | 13.87                                   |
| **1202** | LG Nexus 5                    | 2013 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 144    | 6.55         | 13.92                                   |
| **1203** | Xiaomi Mi 6                   | 2017 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 106    | 6.97         | 14.16                                   |
| **1204** | Asus Zenfone 2 Laser ZE550KL  | 2015 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 113    | 11.24        | 14.16                                   |
| **1205** | VERTEX Impress Wolf           | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 50     | 4.34         | 14.16                                   |
| **1206** | LG Nexus 5                    | 2013 | VP9      | omx.google.vp9.decoder            | sw   | 57     | 6.55         | 14.19                                   |
| **1207** | Asus Google Nexus 7           | 2012 | H.264    | omx.google.h264.decoder           | sw   | 117    | 1.38         | 14.19                                   |
| **1208** | Nokia 5                       | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 80     | 5.17         | 14.27                                   |
| **1209** | Irbis TZ969                   | 2019 | HEVC     | omx.google.hevc.decoder           | sw   | 39     | 4.34         | 14.31                                   |
| **1210** | Samsung Galaxy A5             | 2017 | H.264    | omx.sec.avc.sw\.dec               | sw   | 83\*   | 2.72\*       | 14.34\*                                 |
| **1211** | Huawei Honor 4X               | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 75     | 3.49         | 14.35                                   |
| **1212** | ASUS ZenFone 3                | 2016 | VP9      | omx.qcom.video.decoder.vp9        | hw   | 152    | 12.87        | 14.36                                   |
| **1213** | Samsung Galaxy Tab A 8.0      | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 49     | 3.52         | 14.56                                   |
| **1214** | Xiaomi Redmi 6                | 2018 | H.264    | omx.google.h264.decoder           | sw   | 92     | 2.81         | 14.59                                   |
| **1215** | Samsung Galaxy J5             | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 57\*   | 2.49         | 14.6                                    |
| **1216** | Xiaomi Redmi 9C               | 2020 | AV1      | c2.android.av1.decoder            | sw   | 20     | 1.37         | 14.64                                   |
| **1217** | Samsung Galaxy A7             | 2018 | AV1      | c2.android.av1.decoder            | sw   | 27     | 2.63         | 14.7                                    |
| **1218** | Sony Xperia Z2                | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 66     | 3.34         | 14.73\*                                 |
| **1219** | Sony Xperia Z5 Compact        | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 70     | 3.21         | 14.77                                   |
| **1220** | Samsung Galaxy Tab A 8.0      | 2015 | H.264    | omx.sec.avc.sw\.dec               | sw   | 36     | 3.52         | 14.89                                   |
| **1221** | Samsung Galaxy J5             | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 50\*   | 2.49         | 14.89                                   |
| **1222** | ASUS ZenFone 3                | 2016 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 150    | 12.87        | 14.91                                   |
| **1223** | Sony Xperia XA1               | 2017 | H.264    | omx.google.h264.decoder           | sw   | 87     | 2.66         | 14.91                                   |
| **1224** | Samsung Galaxy Note 4         | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 59     | 4.13         | 15.06                                   |
| **1225** | ASUS ZenFone 3                | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 92     | 12.87        | 15.12                                   |
| **1226** | Huawei Y5II                   | 2016 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 86     | 9.02         | 15.16                                   |
| **1227** | Highscreen Power Rage         | 2016 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 65     | 11.84\*      | 15.17\*                                 |
| **1228** | Irbis SP05                    | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 32     | 5.16         | 15.17                                   |
| **1229** | Yota YotaPhone 2              | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 72     | 4.34         | 15.37                                   |
| **1230** | VERTEX Impress Wolf           | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 58     | 4.34         | 15.44                                   |
| **1231** | Samsung Galaxy J1             | 2016 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 41     | 2.23         | 15.45                                   |
| **1232** | Nokia 5                       | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 71     | 5.17         | 15.91                                   |
| **1233** | Xiaomi Redmi 6                | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 65     | 2.81         | 15.94                                   |
| **1234** | Samsung Galaxy A70            | 2019 | AV1      | c2.android.av1.decoder            | sw   | 18     | 2.85         | 16.01                                   |
| **1235** | Samsung Galaxy A5             | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 65\*   | 2.72\*       | 16.12\*                                 |
| **1236** | Sony Xperia Z5 Compact        | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 56     | 3.21         | 16.2                                    |
| **1237** | Asus Zenfone Max (M1) ZB555KL | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 33     | 1.91         | 16.21                                   |
| **1238** | Asus Zenfone 2 Laser ZE550KL  | 2015 | VP8      | omx.google.vp8.decoder            | sw   | 67     | 11.24        | 16.29                                   |
| **1239** | Doogee X30                    | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 49     | 12.39        | 16.29                                   |
| **1240** | VERTEX Impress Wolf           | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 41     | 4.34         | 16.32                                   |
| **1241** | Lenovo Vibe Shot              | 2015 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 56     | 5.3          | 16.41                                   |
| **1242** | Huawei Y5                     | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 73\*   | 3.05\*       | 16.68\*                                 |
| **1243** | LG Nexus 5                    | 2013 | HEVC     | omx.google.hevc.decoder           | sw   | 83     | 6.55         | 16.86                                   |
| **1244** | Doogee X30                    | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 41     | 12.39        | 16.89                                   |
| **1245** | Huawei Y6 Prime               | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 44     | 3.54         | 16.92                                   |
| **1246** | Samsung Galaxy A5             | 2017 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 61\*   | 2.72\*       | 17.39\*                                 |
| **1247** | Highscreen Power Rage         | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 46     | 11.84\*      | 17.39\*                                 |
| **1248** | Sony Xperia Z2                | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 86     | 3.34         | 17.61\*                                 |
| **1249** | Irbis TZ969                   | 2019 | VP9      | omx.google.vp9.decoder            | sw   | 29     | 4.34         | 17.85                                   |
| **1250** | Doogee X30                    | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 120    | 12.39        | 18.23                                   |
| **1251** | ASUS ZenFone 3                | 2016 | H.264    | omx.google.h264.decoder           | sw   | 124    | 12.87        | 18.29                                   |
| **1252** | alcatel 1V                    | 2020 | AV1      | c2.android.av1.decoder            | sw   | 16     | 1.21         | 18.39                                   |
| **1253** | Samsung Galaxy J4             | 2018 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 38     | 8.86         | 18.51                                   |
| **1254** | ASUS ZenFone 3                | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 57     | 12.87        | 18.67                                   |
| **1255** | Irbis SP05                    | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 26     | 5.16         | 18.89                                   |
| **1256** | Yandex Smartphone             | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 112    | 4.97         | 18.94\*                                 |
| **1257** | Asus Zenfone Live ZB501KL     | 2017 | H.264    | omx.google.h264.decoder           | sw   | 66     | 2.99         | 19.14                                   |
| **1258** | LG Nexus 5                    | 2013 | H.264    | omx.google.h264.decoder           | sw   | 97     | 6.55         | 19.88                                   |
| **1259** | Samsung Galaxy A5             | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 71\*   | 3.47\*       | 20.17\*                                 |
| **1260** | Highscreen Power Rage         | 2016 | VP8      | omx.google.vp8.decoder            | sw   | 58     | 11.84\*      | 20.23                                   |
| **1261** | Nokia 5                       | 2017 | H.264    | omx.google.h264.decoder           | sw   | 78     | 5.17         | 20.41                                   |
| **1262** | Lenovo Vibe Shot              | 2015 | VP9      | omx.google.vp9.decoder            | sw   | 56     | 5.3          | 21.19                                   |
| **1263** | Asus Zenfone 2 Laser ZE550KL  | 2015 | HEVC     | omx.qcom.video.decoder.hevcswvdec | sw   | 65     | 11.24        | 21.2                                    |
| **1264** | Samsung Galaxy A51            | 2019 | AV1      | c2.android.av1.decoder            | sw   | 18     | 2.11         | 21.23                                   |
| **1265** | Asus Zenfone 2 Laser ZE550KL  | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 65     | 11.24        | 21.24                                   |
| **1266** | Huawei Y5II                   | 2016 | H.264    | omx.mtk.video.decoder.avc         | hw   | 87     | 9.02         | 21.3                                    |
| **1267** | Samsung Galaxy Note 3         | 2013 | MPEG-4   | omx.qcom.video.decoder.mpeg4      | hw   | 182\*  | 17.78\*      | 21.34\*                                 |
| **1268** | Sony Xperia XZ                | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 50     | 2.69         | 21.53                                   |
| **1269** | Samsung Galaxy Tab A 8.0      | 2015 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 28     | 3.52         | 21.63                                   |
| **1270** | Lenovo Vibe Shot              | 2015 | H.264    | omx.google.h264.decoder           | sw   | 52     | 5.3          | 21.94                                   |
| **1271** | Highscreen Power Rage         | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 74     | 11.84\*      | 22.15\*                                 |
| **1272** | BQ BQ-7081G                   | 2017 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 130    | 16.04        | 22.23                                   |
| **1273** | Samsung Galaxy J5             | 2015 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 31\*   | 2.49         | 22.31\*                                 |
| **1274** | Asus Zenfone Live ZB501KL     | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 57     | 2.99         | 22.42                                   |
| **1275** | Sony Xperia Z2                | 2014 | H.264    | omx.qcom.video.decoder.avc        | hw   | 96     | 3.34         | 22.49\*                                 |
| **1276** | Doogee X30                    | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 66     | 12.39        | 22.77                                   |
| **1277** | Doogee X30                    | 2017 | H.264    | omx.google.h264.decoder           | sw   | 67     | 12.39        | 22.95                                   |
| **1278** | LG Nexus 5                    | 2013 | VP8      | omx.google.vp8.decoder            | sw   | 74     | 6.55         | 23.0                                    |
| **1279** | Samsung Galaxy Note 3         | 2013 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 120    | 20.29        | 23.37                                   |
| **1280** | Samsung Galaxy Note 3         | 2013 | VP8      | omx.qcom.video.decoder.vp8        | hw   | 132    | 17.78\*      | 23.62\*                                 |
| **1281** | alcatel 1                     | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 79\*   | 11.56\*      | 23.81\*                                 |
| **1282** | Samsung Galaxy J5             | 2015 | H.264    | omx.sec.avc.sw\.dec               | sw   | 44\*   | 2.49         | 24.25\*                                 |
| **1283** | alcatel 1                     | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 63     | 6.35         | 24.48                                   |
| **1284** | Asus Zenfone Max (M1) ZB555KL | 2018 | H.264    | omx.qcom.video.decoder.avc        | hw   | 157    | 1.91         | 25.12                                   |
| **1285** | Lenovo Vibe Shot              | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 69     | 5.3          | 25.19                                   |
| **1286** | Sony Xperia Z5 Compact        | 2015 | HEVC     | omx.google.hevc.decoder           | sw   | 33     | 3.21         | 25.42                                   |
| **1287** | Samsung Galaxy Note 3         | 2013 | H.264    | omx.qcom.video.decoder.avc        | hw   | 138    | 17.78\*      | 25.54                                   |
| **1288** | Samsung Galaxy Note 3         | 2013 | MPEG-4   | omx.sec.mpeg4.sw\.dec             | sw   | 179    | 20.29        | 25.63                                   |
| **1289** | Sony Xperia Z2                | 2014 | H.264    | omx.google.h264.decoder           | sw   | 85     | 3.34         | 26.25\*                                 |
| **1290** | BQ BQ-7081G                   | 2017 | H.264    | omx.google.h264.decoder           | sw   | 84     | 16.04        | 26.58                                   |
| **1291** | alcatel 1                     | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 72\*   | 11.56\*      | 27.61\*                                 |
| **1292** | BQ BQ-7081G                   | 2017 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 74     | 16.04        | 28.04                                   |
| **1293** | Samsung Galaxy J4+            | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 18     | 2.25         | 28.27                                   |
| **1294** | Honor 9                       | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 154    | 5.18         | 28.65                                   |
| **1295** | Irbis SP05                    | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 26     | 5.16         | 28.88                                   |
| **1296** | Doogee X30                    | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 42     | 12.39        | 28.97                                   |
| **1297** | Huawei Honor 8X               | 2018 | VP8      | omx.hisi.video.decoder.vp8        | hw   | 107    | 2.29         | 29.04                                   |
| **1298** | Samsung Galaxy Note 3         | 2013 | VP8      | omx.google.vp8.decoder            | sw   | 112    | 20.29        | 29.15                                   |
| **1299** | BQ BQ-7081G                   | 2017 | HEVC     | omx.mtk.video.decoder.hevc        | hw   | 67     | 15.98        | 29.29                                   |
| **1300** | BQ BQ-7081G                   | 2017 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 66     | 16.04        | 29.48                                   |
| **1301** | Huawei Y5II                   | 2016 | HEVC     | omx.google.hevc.decoder           | sw   | 51     | 9.02         | 29.49                                   |
| **1302** | Samsung Galaxy J3             | 2016 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 41\*   | 2.66\*       | 31.15\*                                 |
| **1303** | BQ BQ-7081G                   | 2017 | MPEG-4   | omx.google.mpeg4.decoder          | sw   | 57     | 15.98        | 31.44                                   |
| **1304** | BQ BQ-7081G                   | 2017 | HEVC     | omx.google.hevc.decoder           | sw   | 55     | 16.04        | 32.4                                    |
| **1305** | BQ BQ-7081G                   | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 51     | 16.11        | 33.35                                   |
| **1306** | Samsung Galaxy J4+            | 2018 | VP8      | omx.sec.vp8.dec                   | hw   | 14     | 2.25         | 34.03                                   |
| **1307** | Samsung Galaxy Note 3         | 2013 | VP9      | omx.google.vp9.decoder            | sw   | 60     | 17.78\*      | 34.5                                    |
| **1308** | alcatel 1                     | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 42\*   | 11.56\*      | 35.56\*                                 |
| **1309** | Samsung Galaxy Note 3         | 2013 | HEVC     | omx.google.hevc.decoder           | sw   | 99     | 17.78\*      | 36.15\*                                 |
| **1310** | BQ BQ-7081G                   | 2017 | VP9      | omx.google.vp9.decoder            | sw   | 43     | 15.98        | 36.68                                   |
| **1311** | BQ BQ-7081G                   | 2017 | H.264    | omx.mtk.video.decoder.avc         | hw   | 43     | 16.04        | 36.75                                   |
| **1312** | Huawei Y5II                   | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 37     | 9.02         | 37.68                                   |
| **1313** | Samsung Galaxy Note 3         | 2013 | HEVC     | omx.qcom.video.decoder.hevc       | hw   | 44     | 17.78\*      | 41.6                                    |
| **1314** | Samsung Galaxy Note 3         | 2013 | VP8      | omx.sec.vp8.dec                   | hw   | 110    | 17.78\*      | 41.91                                   |
| **1315** | Samsung Galaxy J3             | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 34     | 3.0          | 44.61                                   |
| **1316** | Sony Xperia Z3                | 2014 | VP9      | omx.google.vp9.decoder            | sw   | 66     | 3.28         | 46.57                                   |
| **1317** | Samsung Galaxy J4+            | 2018 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 9      | 2.25         | 49.81                                   |
| **1318** | Samsung Galaxy Note 3         | 2013 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 64     | 17.78\*      | 50.67\*                                 |
| **1319** | alcatel 1                     | 2018 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 21     | 13.3\*       | 55.01                                   |
| **1320** | Samsung Galaxy J1             | 2016 | H.264    | omx.sec.avc.sw\.dec               | sw   | 54     | 2.23         | 56.68                                   |
| **1321** | Samsung Galaxy Note 4         | 2014 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 76     | 4.13         | 62.25                                   |
| **1322** | Samsung Galaxy J2 Prime       | 2016 | HEVC     | omx.sec.hevc.sw\.dec              | sw   | 46     | 0.76         | 64.45                                   |
| **1323** | alcatel 1                     | 2018 | H.264    | omx.google.h264.decoder           | sw   | 33\*   | 11.56\*      | 65.86\*                                 |
| **1324** | alcatel 1                     | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 27\*   | 11.56\*      | 79.64\*                                 |
| **1325** | Asus Zenfone 3 Max            | 2016 | H.264    | omx.google.h264.decoder           | sw   | 111    | 2.04         | 82.51                                   |
| **1326** | alcatel 1                     | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 28\*   | 11.56\*      | 92.88\*                                 |
| **1327** | Sony Xperia E5                | 2016 | VP9      | omx.mtk.video.decoder.vp9         | hw   | 79     | 1.01         | 113.33                                  |
| **1328** | LEAGOO T8s                    | 2018 | HEVC     | omx.google.hevc.decoder           | sw   | 79     | 0.45         | 129.8                                   |
| **1329** | UMiDIGI C Note 2              | 2017 | VP8      | omx.google.vp8.decoder            | sw   | 70     | 4.16         | 130.34                                  |
| **1330** | LEAGOO T8s                    | 2018 | H.264    | omx.mtk.video.decoder.avc         | hw   | 67     | 0.45         | 133.02                                  |
| **1331** | LEAGOO T8s                    | 2018 | MPEG-4   | omx.mtk.video.decoder.mpeg4       | hw   | 65     | 0.45         | 140.24                                  |
| **1332** | Sony Xperia Z3                | 2014 | HEVC     | omx.google.hevc.decoder           | sw   | 89     | 3.28         | 152.36                                  |
| **1333** | LEAGOO T8s                    | 2018 | VP8      | omx.google.vp8.decoder            | sw   | 53     | 0.45         | 166.6                                   |
| **1334** | LEAGOO T8s                    | 2018 | VP8      | omx.mtk.video.decoder.vpx         | hw   | 52     | 0.45         | 169.4                                   |
| **1335** | LEAGOO T8s                    | 2018 | VP9      | omx.google.vp9.decoder            | sw   | 51     | 0.45         | 180.95                                  |
| **1336** | Sony Xperia Z3                | 2014 | VP8      | omx.google.vp8.decoder            | sw   | 108    | 3.28         | 255.32                                  |
| **1337** | LEAGOO T8s                    | 2018 | H.264    | omx.google.h264.decoder           | sw   | 70     | 0.45         | 443.64                                  |
| **1338** | Sony Xperia Z3                | 2014 | H.264    | omx.google.h264.decoder           | sw   | 88     | 3.28         | 893.44                                  |
| **1339** | Asus Zenfone 3 Max            | 2016 | VP9      | omx.google.vp9.decoder            | sw   | 68     | 2.04         | 90001.29                                |
```

