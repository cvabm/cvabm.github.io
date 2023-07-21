# 适配

[[toc]]

## Android7.0

```
http://blog.csdn.net/Wen_Demo/article/details/51943201?locationNum=1&fps=1

http://blog.csdn.net/axi295309066/article/details/52886948
http://blog.csdn.net/honjane/article/details/52057132
http://blog.csdn.net/Arlen6310/article/details/53638209
http://www.07net01.com/program/2016/09/1671780.html
```

```
华为市场不兼容android7.0解决办法：

build.grade文件中改：complieSdkVersion 为25
```

## Android 6.0 设备上动态获取权限

```java
例子：应用内调用拨打电话



final public static int REQUEST_CODE_ASK_CALL_PHONE = 123;

if (Build.VERSION.SDK_INT >= 23) {
    int checkCallPhonePermission = ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CALL_PHONE);
    if (checkCallPhonePermission != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE}, REQUEST_CODE_ASK_CALL_PHONE);
        return;
    } else {
        callDirectly("123");
    }
}



@Override
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    switch (requestCode) {
        case REQUEST_CODE_ASK_CALL_PHONE:
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission Granted
                callDirectly("111");
            } else {
                Toast.makeText(MainActivity.this, "CALL_PHONE Denied", Toast.LENGTH_SHORT)
                        .show();
            }
            break;
        default:
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}



private void callDirectly(String mobile) {
    Intent intent = new Intent();
    intent.setAction("android.intent.action.CALL");
    intent.setData(Uri.parse("tel:" + mobile));
    MainActivity.this.startActivity(intent);
}
```
## Android6.0 到 Android9.0 版本适配

<https://www.jianshu.com/p/23b8ae9d5a95>

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
```java
  <service
            android:name=".service.KeepAliveService"
            android:foregroundServiceType="mediaProjection" />
```