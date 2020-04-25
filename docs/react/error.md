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