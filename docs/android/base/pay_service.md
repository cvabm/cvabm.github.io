# 第三方服务

[[toc]]

### 极光推送

设置别名不能超过10台设备，注销或异地登录需取消别名设置
或推送 -配置管理-别名管理 -搜索相应的进行解除

```
1：注册极光推送 填写应用包名 、应用名、 即可

2：jcenter自动继承 ：
确认android studio的 Project 根目录的主 gradle 中配置了jcenter支持。（新建project默认配置就支持）
buildscript {
    repositories {
        jcenter()
    }
    ......
}
allprojects {
    repositories {
        jcenter()
    }
}
在 module 的 gradle 中添加依赖和AndroidManifest的替换变量。
android {
    ......
    defaultConfig {
        applicationId "com.xxx.xxx" //JPush上注册的包名.
        ......

        manifestPlaceholders = [
            JPUSH_PKGNAME : applicationId,
            JPUSH_APPKEY : "你的appkey", //JPush上注册的包名对应的appkey.
            JPUSH_CHANNEL : "developer-default", //暂时填写默认值即可.
        ]
        ......
    }
    ......
}
dependencies {
    ......

    compile 'cn.jiguang.sdk:jpush:3.0.0'  // 此处以JPush 3.0.0 版本为例。
    compile 'cn.jiguang.sdk:jcore:1.0.0'  // 此处以JCore 1.0.0 版本为例。
    ......
}
3：初始化jdk
init 只需要在应用程序启动时调用一次该 API 即可。
以下代码定制一个本应用程序 Application 类。需要在 AndoridManifest.xml 里配置。请参考上面 AndroidManifest.xml 片断，或者 example 项目。
public class ExampleApplication extends Application {
@Override
    public void onCreate() {
        super.onCreate();
        JPushInterface.setDebugMode(true);
        JPushInterface.init(this);
    }
}
4：在网站上点击发推送进行测试
```

## 测试

```python
monkey：
adb shell monkey -p com.amplesky.client.cdc -v 1000
停止：
linux : ps | grep monkey
windows top | grep monkey

存日志：
adb shell monkey -p com.corerate.cep -v --throttle 300 --pct-touch 30 --pct-motion 20 --pct-nav 20 --pct-majornav 15 --pct-appswitch 5 --pct-anyevent 5 --pct-trackball 0 --pct-syskeys 0 -p '%s' 1000 > d:\111.txt

windows停止monkey：

for /f "tokens=2" %a in ('adb shell ps ^|findstr "monkey" ') do adb shell kill %a
python停止：


- import StringIO
- import subprocess
-
-
- def main():
-     output = subprocess.check_output("adb shell ps")
-     buf = StringIO.StringIO(output)
-     for line in buf:
-         if "com.android.commands.monkey" in line:
-             fragments = line.split()
-             pid = fragments[1]
-             subprocess.call("adb shell kill -9 " + pid)
-             return
-
- if __name__ == '__main__':
-     main()
Kill 5037 （Windows CMD）

- @echo off
- for /f "tokens=5 delims= " %%i in ('netstat -aon ^|findstr "5037"') do (
-    for /f  "tokens=1 delims= " %%a in ('tasklist ^| findstr "%%i"') do (
-       taskkill /f /im %%a 2>nul
- )
- )
- pause

```

junit 单元测试  
<https://blog.csdn.net/a369414641/article/details/52912098>
