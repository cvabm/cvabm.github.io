[[toc]]

> - **五个流程**
>
> - **实时性不高的采用 RTMP**  
>   **实时性比较高的必须使用 UDP**  
>   一般会选用 RUDP（可靠性 UDP），既可以保证传输速度，又可以防止丢包。

> - 五个流程  
>   数据采集，编码，传输，解码和渲染
>
>   - 数据采集  
>     音频 PCM 格式，视频 YUV 格式。
>   - 编码  
>     音频编码格式有 speex, AAC, OPUS, G.711 等，常用 AAC  
>     视频编码格式有 H.264, H.265, VP8, VP9 等,常用 H264
>   - 传输  
>     RTSP：基于 UDP 协议，传输效率高  
>     RPMP：基于 TCP 协议，效率低，延迟高，传输质量好  
>      -解码  
>     音频：AAC 转为 PCM 数据  
>     视频：H264 转为 YUV 数据
>   - 播放和渲染  
>     音频：直接将 PCM 数据放入到音频驱动缓冲驱，驱动程序就会将音频播放出来。  
>     视频：一般会通过 opengl 利用 GPU 进行图像渲染
>
> - **播放器：vl 或者 ffplay**

## Android 下视频渲染

> - **Surface**  
>   可以把它理解为一个 Buffer，它是一块屏幕缓冲区。每个 Window(窗口)对应一个 Surface，任何 View 都是画在 Surface 上的
> - **SurfaceHolder**  
>   是 Surface 的抽象接口，它使你可以控制 Surface 的大小和格式
> - **SurfaceView**  
>   渲染在单独的线程进行  
>   它也不会像普通 View 那样可以通过 View 属性控制进行平移，缩放等变换，也不能放在其它 ViewGroup 中

> - **GLSurfaceView**  
>   在 SurfaceView 的基础上，它加入了 EGL 的管理，并自带了渲染线程。另外它定义了用户需要实现的 Render 接口，提供了用 Strategy pattern 更改具体 Render 行为的灵活性。

## TextureView

```
不包含Surface，所以其实就是一个普通的View，可以和其它普通View一样进行移动，旋转，缩放，动画等变化
```

TextureView 简单例子  
<http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2014/1213/2153.html>

> - **SurfaceTexture**
>   从 Camera 中采集的数据或从解码器中取出的数据可以放到 SurfaceTexture 里进行二次处理，然后再交给 View 去展示

## Android 获取视频原始数据

1.向 Camera 设置预览 Callback 来读取原始数据  
2.通过 MediaCodec 的 Surface 获取数据  
mediacodec 可以用来获得安卓底层的多媒体编码，可以用来编码和解码

### mediacodec

[MediaCodec 硬解码详解](https://blog.csdn.net/LinChengChun/article/details/80219503)
[官方解释](https://developer.android.com/reference/android/media/MediaCodec)

mimetype 选择解码器

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

## 屏幕共享(基于 webrtc)

Android 5.0 版本之后，支持使用 MediaProjection 的方式获取屏幕视频流

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

[参考 1](https://blog.csdn.net/liwenlong_only/article/details/88942046)  
[参考 2](https://www.cnblogs.com/Jason-Jan/p/9120849.html)

## 录屏 demo

<https://github.com/yrom/ScreenRecorder>
