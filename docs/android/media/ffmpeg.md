# ffmpeg
[[toc]]

### linux下编译.so
<https://juejin.im/post/5d831333f265da03c61e8a28>

注意：  
1、ffmpeg要下载linux版的  
2、用的是ffmpeg-4.2.4、android-ndk-r21b、




### 移植到android
1、cmake方式编译  
[FFmpeg4Android](https://github.com/alidili/FFmpeg4Android)[详细介绍](https://blog.csdn.net/kong_gu_you_lan/article/details/79707513)


2、android.mk方式编译  
[FFmpeg4Android-mkBuild](https://github.com/cvabm/FFmpeg4Android-mkBuild)


### gradle关联c++文件(编辑c文件代码提示)
```
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


### 





