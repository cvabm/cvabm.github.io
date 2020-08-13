# 基础
[[toc]]

>- **五个流程**  
>  
>- **实时性不高的采用RTMP**   
>**实时性比较高的必须使用UDP**  
一般会选用RUDP（可靠性UDP），既可以保证传输速度，又可以防止丢包。  

>- 五个流程  
>数据采集，编码，传输，解码和渲染  
>   - 数据采集  
> 音频PCM格式，视频YUV格式。  
>   - 编码  
> 音频编码格式有speex, AAC, OPUS, G.711等，常用AAC  
> 视频编码格式有H.264, H.265, VP8, VP9等,常用H264 
>   - 传输  
> RTSP：基于UDP协议，传输效率高  
> RPMP：基于TCP协议，效率低，延迟高，传输质量好  
>   -解码  
> 音频：AAC转为PCM数据  
> 视频：H264转为YUV数据  
>   - 播放和渲染  
> 音频：直接将PCM数据放入到音频驱动缓冲驱，驱动程序就会将音频播放出来。  
> 视频：一般会通过 opengl利用 GPU进行图像渲染  
> 
>- **播放器：vl或者ffplay**  


## Android下视频渲染

>- **Surface**  
可以把它理解为一个Buffer，它是一块屏幕缓冲区。每个Window(窗口)对应一个Surface，任何View都是画在Surface上的  
>- **SurfaceHolder**  
是 Surface 的抽象接口，它使你可以控制Surface的大小和格式  
>- **SurfaceView**  
渲染在单独的线程进行  
它也不会像普通View那样可以通过View属性控制进行平移，缩放等变换，也不能放在其它ViewGroup中  

>- **GLSurfaceView**  
在 SurfaceView 的基础上，它加入了EGL的管理，并自带了渲染线程。另外它定义了用户需要实现的Render接口，提供了用Strategy pattern更改具体Render行为的灵活性。  
>- **TextureView**  
不包含Surface，所以其实就是一个普通的View，可以和其它普通View一样进行移动，旋转，缩放，动画等变化  
>- **SurfaceTexture**
从Camera中采集的数据或从解码器中取出的数据可以放到SurfaceTexture里进行二次处理，然后再交给View去展示  

## Android获取视频原始数据  
1.向Camera设置预览Callback来读取原始数据  
2.通过MediaCodec的Surface获取数据  
mediacodec可以用来获得安卓底层的多媒体编码，可以用来编码和解码  

### mediacodec
[MediaCodec硬解码详解](https://blog.csdn.net/LinChengChun/article/details/80219503)
[官方解释](https://developer.android.com/reference/android/media/MediaCodec)


mimetype选择解码器
```
"video/x-vnd.on2.vp8" - VP8 video (i.e. video in .webm)
"video/x-vnd.on2.vp9" - VP9 video (i.e. video in .webm)
"video/avc" - H.264/AVC video
"video/hevc" - H.265/HEVC video
"video/mp4v-es" - MPEG4 video
"video/3gpp" - H.263 video
"audio/3gpp" - AMR narrowband audio
"audio/amr-wb" - AMR wideband audio
"audio/mpeg" - MPEG1/2 audio layer III
"audio/mp4a-latm" - AAC audio (note, this is raw AAC packets, not packaged in LATM!)
"audio/vorbis" - vorbis audio
"audio/g711-alaw" - G.711 alaw audio
"audio/g711-mlaw" - G.711 ulaw audio


```


音频格式  
```
G711分两种pcmu、pcma  
webrtc的音频压缩格式主要包含 G711、G722、ILBC、ISAC、opus。
CN/32000 可能是降噪

```






## 屏幕共享(基于webrtc)  

Android 5.0版本之后，支持使用MediaProjection的方式获取屏幕视频流  
```
MediaProjectionManager mediaProjectionManager = (MediaProjectionManager)getSystemService(Context.MEDIA_PROJECTION_SERVICE);
Intent captureIntent = mediaProjectionManager.createScreenCaptureIntent();
startActivityForResult(captureIntent, 1002);
```
```

protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    if(requestCode == REQ_REMOTE_HELP && resultCode == RESULT_OK){
        captureIntent = data; //在这里保存data
    }
}

```

```
/创建VideoCapture
VideoCapturer videoCapturer = new ScreenCapturerAndroid(captureIntent, new MediaProjection.Callback() {
      @Override
      public void onStop() {
           super.onStop();
      }
});
```
```
VideoSource videoSource = peerConnectionFactory.createVideoSource(videoCapturer.isScreencast());
 
videoCapturer.initialize(surfaceTextureHelper, getApplicationContext(),videoSource.getCapturerObserver());
 
videoCapturer.startCapture(480, 640, 30);
```

[参考1](https://blog.csdn.net/liwenlong_only/article/details/88942046)  
[参考2](https://www.cnblogs.com/Jason-Jan/p/9120849.html)

## 录屏demo
<https://github.com/yrom/ScreenRecorder>