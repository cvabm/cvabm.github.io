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
