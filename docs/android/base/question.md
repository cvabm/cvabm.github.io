# 常见问题
[[toc]]

## AndroidManifest 合并出错 tools:replace="android:allowBackup"
解决方法：  
```
在application节点添加

<application tools:replace="android:allowBackup"

同样的还有

tools:replace="android:icon, android:theme,android:allowBackup" 
```
## Default Activity not found
>Yes, this is correct. This is an input manager, not an activity.  
You can get Android Studio not to complain by going to the "Edit Configurations" menu (tap "Shift" three times, type "Edit Configurations"), then change Launch Options > Launch to "Nothing".

## No toolchains found in the NDK toolchains folder for ABI with prefix

点击[这里](https://developer.android.com/ndk/downloads/?hl=zh-cn)通过浏览器单独下载NDK的包.  
解压之后打开“toolchains”文件夹,跟android-sdk->ndk-bundle->toolchains文件夹做对比,找到其缺少的文件夹,复制过去


## error: resource android:attr/lStar not found？
```
解决方法：方法1：全局搜索项目androidx.core:core-ktx，若没有设置具体版本的修改为具体版本就好，
方法2：若是第三方库使用没有设置具体版本，在app的build.gradle中添加如下，强制项目使用具体的版本，
解决问题configurations.all {resolutionStrategy {    force 'androidx.core:core-ktx:1.6.0'  }}

试试把-ktx去掉
configurations.all {
resolutionStrategy {
force 'androidx.core:core:1.6.0'
}
}

```
最后发现是RN官方更新出的一个坑  
https://github.com/facebook/react-native/issues/35210
