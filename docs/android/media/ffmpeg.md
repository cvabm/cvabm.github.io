[[toc]]

### linux 下编译.so

<https://juejin.im/post/5d831333f265da03c61e8a28>

注意：  
1、ffmpeg 要下载 linux 版的  
2、用的是 ffmpeg-4.2.4、android-ndk-r21b、

### 移植到 android

1、cmake 方式编译  
[FFmpeg4Android](https://github.com/alidili/FFmpeg4Android)[详细介绍](https://blog.csdn.net/kong_gu_you_lan/article/details/79707513)  
<https://github.com/byhook/ffmpeg4android>

2、android.mk 方式编译  
[FFmpeg4Android-mkBuild](https://github.com/cvabm/FFmpeg4Android-mkBuild)

### gradle 关联 c++文件(编辑 c 文件代码提示)

```java
Look for a file called "build.gradle"( Module: app ) in "Gradle Scripts" folder.

 defaultConfig {
 ...
 }
 buildTypes {
 ...
 }
Add:

externalNativeBuild {

}
Save and Sync Now

Then right click on "app" and you will see "Link C++ Project with Gradle"
```

### 相关博客
<https://ffmpeg.xianwaizhiyin.net/>  
<https://github.com/FFmpeg/FFmpeg>  
<https://ffmpeg.org/download.html#releases>  
Android 中集成 FFmpeg 及 NDK 基础知识  
<https://juejin.im/post/5b631145e51d45162679f09e>  
android 移植 ffmpeg 播放 rtsp  
<https://github.com/shufanhao/FFmegClient>  
<https://github.com/xufuji456/FFmpegAndroid>  
<https://github.com/WritingMinds/ffmpeg-android-java>

## ffmpeg 常用命令

[[toc]]

## 官方地址

<https://ffmpeg.org/ffmpeg-all.html>

### 常用命令总结

<https://hacpai.com/article/1595480295489>

### 通用参数解释

[更多请参考](http://blog.csdn.net/maopig/article/details/6610257)

```js
-f fmt 指定格式(音频或视频格式)
-i filename 指定输入文件名，在 linux 下当然也能指定:0.0(屏幕录制)或摄像头
-y 覆盖已有文件
-t duration 记录时长为
-fs limit_size 设置文件大小上限
-ss time_off 从指定的时间(s)开始， [-]hh:mm:ss[.xxx]的格式也支持
-re 代表按照帧率发送,作为推流工具一定要加入参数,否则 ffmpeg 会按照最高速率向流媒体服务器不停发送数据

视频参数
-b 指定比特率(bits/s)，似乎 ffmpeg 是自动 VBR 的，指定了就大概是平均比特率
-bitexact 使用标准比特率
-vb 指定视频比特率(bits/s)
-vframes number 设置转换多少桢(frame)的视频
-r rate 帧速率(fps) （可以改，确认非标准桢率会导致音画不同步，所以只能设定为 15 或者 29.97）
-s size 指定分辨率 (320x240)
-aspect aspect 设置视频长宽比(4:3, 16:9 or 1.3333, 1.7777)
-croptop size 设置顶部切除尺寸(in pixels)
-cropbottom size 设置底部切除尺寸(in pixels)
-cropleft size 设置左切除尺寸 (in pixels)
-cropright size 设置右切除尺寸 (in pixels)
-padtop size 设置顶部补齐尺寸(in pixels)
-padbottom size 底补齐(in pixels)
-padleft size 左补齐(in pixels)
-padright size 右补齐(in pixels)
-padcolor color 补齐带颜色(000000-FFFFFF)
-vn 取消视频
-vcodec codec 强制使用 codec 编解码方式('copy' to copy stream)
-sameq 使用同样视频质量作为源（VBR）
-pass n 选择处理遍数（1 或者 2）。两遍编码非常有用。第一遍生成统计信息，第二遍生成精确的请求的码率
-passlogfile file 选择两遍的纪录文件名为 file
-newvideo 在现在的视频流后面加入新的视频流

高级视频选项
-pix_fmt format set pixel format, 'list' as argument shows all the pixel formats supported
-intra 仅适用帧内编码
-qscale q 以<数值>质量为基础的 VBR，取值 0.01-255，约小质量越好
-loop_input 设置输入流的循环数(目前只对图像有效)
-loop_output 设置输出视频的循环数，比如输出 gif 时设为 0 表示无限循环
-g int 设置图像组大小
-cutoff int 设置截止频率
-qmin int 设定最小质量，与-qmax（设定最大质量）共用，比如-qmin 10 -qmax 31
-qmax int 设定最大质量
-qdiff int 量化标度间最大偏差 (VBR)
-bf int 使用 frames B 帧，支持 mpeg1,mpeg2,mpeg4

音频参数
-ab 设置比特率(单位：bit/s，也许老版是 kb/s)前面-ac 设为立体声时要以一半比特率来设置，比如 192kbps 的就设成 96，转换 默认比特率都较小，要听到较高品质声音的话建议设到 160kbps（80）以上。
-aframes number 设置转换多少桢(frame)的音频
-aq quality 设置音频质量 (指定编码)
-ar rate 设置音频采样率 (单位：Hz)，PSP 只认 24000
-ac channels 设置声道数，1 就是单声道，2 就是立体声，转换单声道的 TVrip 可以用 1（节省一半容量），高品质的 DVDrip 就可以用 2
-an 取消音频
-acodec codec 指定音频编码('copy' to copy stream)
-vol volume 设置录制音量大小(默认为 256) <百分比> ，某些 DVDrip 的 AC3 轨音量极小，转换时可以用这个提高音量，比如 200 就是原来的 2 倍
-newaudio 在现在的音频流后面加入新的音频流

字幕参数
-sn 取消字幕
-scodec codec 设置字幕编码('copy' to copy stream)
-newsubtitle 在当前字幕后新增
-slang code 设置字幕所用的 ISO 639 编码(3 个字母)
Audio/Video 抓取选项:
-vc channel 设置视频捕获通道(只对 DV1394)
-tvstd standard 设置电视标准 NTSC PAL(SECAM)

下面会来举一些例子
列出 ffmpeg 支持的所有格式
ffmpeg -formats

剪切一段媒体文件
ffmpeg -i input.mp4 -ss 00:00:50.0 -codec copy -t 20 output,mp4

将文件从 50 秒开始剪切 20 秒,输入到新文件,-ss 是指定时间,-t 是指定时长
提取一个视频中的音频文件
ffmpeg -i input.mp4 -vn -acodec copy output.m4a

使一个视频中的音频静音
ffmpeg -i input.mp4 -an -vcodec copy output.mp4

从 MP4 文件中到处 H264 裸流
ffmpeg -i output.mp4 -an -vcodec copy -bsf:v h264_mp4toannexb output.h264

使用 aac 和 h264 文件生成 mp4 文件
ffmpeg -i input.aac -i input.h264 -acodec copy -bsf:a aac_adtstoasc -vcodec copy -f mp4 output.mp4

对音频文件的编码做转换
ffmpeg -i input.wav -acodec libfdk_aac output.aac

从 wav 文件导出 pcm 裸数据
ffmpeg -i input.wav -acodec pcm_s16le -f s16le output.pcm

将 mp4 导出为 gif,参数设置为宽度 100,帧率 10,只处理前五秒
ffmpeg -i input.mp4 -vf sacle=100:-1 -t 5 -r 10 output.gif

将视频画面生成图片,参数为每四秒截取一张,生成缩略图
ffmpeg -i input.mp4 -r 0.25 frames\_%04d.png

将两路声音合并,例如添加背景音乐,输出时间是以较短的为准
ffmpeg -i input.wav -i bgm.wav -filter_complex amix=inputs=2:deration=shortest output.wav

视频添加水印,视频宽度为 100,水印宽度为 20
ffmpeg -i input.mp4 -i image.png -filter_complex '[0:v][1:v]overlay=100-20-10:10:1[out]' -map '[out]' output.mp4

将视频推送到流媒体服务器(-re 表示实际速度)
ffmpeg -re -i input.mp4 -acodec copy-vcodec copy -f flv rtmp://xxx

将流媒体服务器的流 dump 到本地
ffmpeg -i http://xxx.flv -acodec copy -vcodec copy -f flv output.flv

作者：Link913
链接：https://juejin.im/post/5a59993cf265da3e4f0a1e4b
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 查看音视频信息

```
ffmpeg -i xxx.mp4
```

### 水印

图片水印

```js
两种方式：
ffmpeg -i in.mp4 -i xxx.png -filter_complex "overlay=5:5"  out.mp4

-i ：一般表示输入
in.mp4  视频源文件

xxx.png  要打水印的图片

overlay  设置水印图片的位置

out.mp4 水印后的视频输出

-----

ffmpeg -i 仓库实景.mp4 -vf "movie=wenzi.png[watermark];[in][watermark] overlay=main_w-overlay_w-10:main_h-overlay_h-10[out] " output.mp4

-i ：一般表示输入
仓库实景.mp4:这里表示要处理的视频源
-vf:滤镜相关，视频裁剪，水印等等操作都需要它完成
wenzi.png: 要添加的水印图片地址
overlay:水印参数
main_w-overlay_w-10 : 水印在x轴的位置，也可以写成x=main_w-overlay_w-10
main_h-overlay_h-10：水印在y轴的位置

```

文字水印

```js
ffmpeg -i input.mp4 -vf "drawtext=fontfile=simhei.ttf: text=‘技术是第一生产力’:x=10:y=10:fontsize=24:fontcolor=white:shadowy=2" output.mp4
fontfile:字体类型
text:要添加的文字内容
fontsize:字体大小
fontcolor：字体颜色

```

### 视频截取

```js
ffmpeg -i test.mp4 -ss 60 -t 35 -codec copy cut1.mp4
-i : 视频source

-ss : start time 时间格式可以 为S  或  00:00:00

-t : duration  持续，持久，连续时间，切记这里不是结束时间

-c :视频的音频，视频的编码方式

ffmpeg -ss 00:01:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4
ffmpeg -i video.mp4 -ss 00:01:00 -to 00:02:00 -c copy cut.mp4
ffmpeg -ss 00:01:00 -i video.mp4 -to 00:02:00 -c copy -copyts cut.mp4
第一种方式是从视频的 00:01:00 到 00:03:00      使用更快的查找

第二种方式是从视频的 00:01:00 到 00:02:00      使用较慢的查找

第二种方式是从视频的 00:01:00 到 00:02:00       使用更快的查找

```

### 音视频分离和合成

```js
分离:
ffmpeg -i in.mp4 -vcodec copy -an out.mp4
ffmpeg -i in.mp4 -acodec copy -vn out.aac
合成：
ffmpeg -i out.mp4 -i out.aac -vcodec copy -acodec copy output.mp4
```

### 视频截图

```java
1.每一秒截取一张图片

ffmpeg -i test.mp4 -r 1 image%d.jpg
2.指定时间位置截图 -ss 后面参数是秒

ffmpeg -i test.mp4 -y -f image2 -ss 08.010 -t 0.001 -s 352x240 b.jpg
3.将视频前30视频帧制作成GIF

ffmpeg -i test.MP4 -vframes 30 -y -f gif a.gif
5.ffmpeg 获取视频的时间（linux）

ffmpeg -i video/vvvv.mp4 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//
6.转换格式

ffmpeg -i test.avi -codec copy  test.ts   avi转ts    (转换过程需要放到同一个文件夹)

```

## ffplay

### 循环播放

ffplay GALA.mp4 -loop 10

### 播放 pcm

```java
ffplay song.pcm -f s16le -channels 2 -ar 44100
播放指定流
音频
ffplay 文件路径 -ast 流数字
//视频
ffplay 文件路径 -vst 流数字

播放裸数据
音频
ffplay 原始文件(pcm 文件) -f 格式 -channels 声道数 -ar 采样率
视频
ffplay 原始格式(例如-f rawvideo) 格式(例如-pixel_format yuv420p) 宽高(例如-s 480*480) 原始文件(yuv)
RGB
ffplay -f rawvideo -pixel_format rgb24 -s 480*480 texture.rgb

上面的参数必须设置正确否则无法播放
ffplay 对齐方式(音画同步)的设置
ffpaly 文件路径 -sync audio //以音频为基准
ffpaly 文件路径 -sync video //视频
ffpaly 文件路径 -sync ext //外部时钟
```

## ffprobe

输出文件的格式信息(包括时长,文件大小,格式信息等等)
ffprobe -show_format 文件路径

以 json 格式输出每个流最详细的信息,例如视频宽高信息,是否有 B 帧,视频帧的总数目,编码格式,显示比例,音频的省道,编码格式等等.
ffprobe -print_format json -show_streams 文件路径

显示帧信息
ffprobe -show_frames 文件路径

查看包信息
ffprobe -show_packets 文件路径
