# 常见报错
[[toc]]
## null is not an object (evaluating '_RNGestureHandlerModule.default.Direction')


起因：使用RN跨平台开发时使用react-navigation组件，需要链接原生库  
解决：react-native link
## Could not get unknown property ‘mergeResourcesProvider’  
```
解决办法：
更新gradle版本和gradle build tool版本
gradle最低为 4.10.1+ ，插件最低为 3.3.0 - 3.3.2
```

## 解决React Native 生成 released apk图片不显示  
<https://segmentfault.com/a/1190000008528838>  

## 运行时报错ENOENT: no such file or directory, open 'app/src/main/AndroidManifest.xml'  

默认主module名称为app，想自定义启动module，命令为：  

react-native run-android --appFolder (appFolder为自己定义的module名)

## 启动程序时报错，手动编译

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/


## 启动白屏，清理缓存  
进入android目录，执行 gradlew.bat clean。再重新启动  