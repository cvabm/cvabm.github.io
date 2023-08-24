# 适配

[[toc]]

android6.0：
动态申请权限；权限分组；（只有危险权限需申请）

android7.0：
1： 限制私有目录文件访问权限；
2：应用之间共享文件，使用 File；
应对策略：若要在应用间共享文件，可以发送 content:// URI 类型的 Uri，并授予 URI 临时访问权限。 进行此授权的最简单方式是使用 FileProvider 类。 如需有关权限和共享文件的更多信息，请参阅共享文件。
3:签名方式 v2（更快安装，和保护 apk）

android8.0:
1：新增两个权限；
ANSWER_PHONE_CALLS：允许您的应用通过编程方式接听呼入电话。要在您的应用中处理呼入电话，您可以使用 acceptRingingCall() 函数。
READ_PHONE_NUMBERS ：权限允许您的应用读取设备中存储的电话号码。
2：用户可以根据渠道来屏蔽一些不想要的通知.
3：启动图标自适应（不同设备不同形状）

android9.0：
1：非加密的流量请求都会被系统禁止掉
## 如何解决Android10 屏幕录制报错
需增加一个包含Notification的前台服务：
```
  <service
            android:name=".service.KeepAliveService"
            android:foregroundServiceType="mediaProjection" />
```