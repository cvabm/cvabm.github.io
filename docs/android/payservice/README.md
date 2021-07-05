# 第三方服务
[[toc]]
## 推送统计  
友盟<https://www.umeng.com/>  
阿里云推送  
<https://help.aliyun.com/knowledge_detail/68655.html?spm=a2c4g.11186623.4.6.137d7fa8Vw4lj5>   
<https://help.aliyun.com/document_detail/94843.html?spm=a2c4g.11186623.6.857.4a2e76faB3fF0j>  
腾讯推送  
<https://cloud.tencent.com/product/tpns>  
极光推送  
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

## 华为收不到推送问题
https://club.huawei.com/thread-18527641-1-1.html  




## 测试
```
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
百度云测、testin
自动化测试框架  
<https://www.cnblogs.com/zeo-to-one/p/6618611.html>  
junit单元测试  
<https://blog.csdn.net/a369414641/article/details/52912098> 

## 验证码  
<http://www.mob.com/#/index>   

## 高德
高德开放平台<https://lbs.amap.com/>  
### 其他坐标转高德坐标
1、在线接口：
https://lbs.amap.com/api/webservice/guide/api/convert 
2、离线方法:
```
   let wgsToGcj = this.WgsToGcj(longitude, latitude);
            longitude = wgsToGcj.Lon;
            latitude = wgsToGcj.Lat;
            console.log("gps转换成高德坐标：" + longitude + " -- " + latitude)

    /*********WGS-84 to GCJ-02  *******/
    WgsToGcj(Longitude, Latitude) {
        var Dev = this.CalDev(Longitude, Latitude);
        var RetLat = Latitude - Dev.Lat;
        var RetLon = Longitude - Dev.Lon;
        Dev = this.CalDev(RetLon, RetLat);
        RetLat = Latitude + Dev.Lat;
        RetLon = Longitude + Dev.Lon;
        return {Lon: RetLon, Lat: RetLat};
    }

 /****** 计算纬度******/
    CalLat(X, Y) {
        var ResultLat = -100.0 + 2.0 * X + 3.0 * Y + 0.2 * Y * Y + 0.1 * X * Y + 0.2 * Math.sqrt(Math.abs(X));
        ResultLat += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLat += (20.0 * Math.sin(Y * Math.PI) + 40.0 * Math.sin(Y / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLat += (160.0 * Math.sin(Y / 12.0 * Math.PI) + 320 * Math.sin(Y * Math.PI / 30.0)) * 2.0 / 3.0;
        return ResultLat;
    }

    /******计算经度******/
    CalLon(X, Y) {
        var ResultLon = 300.0 + X + 2.0 * Y + 0.1 * X * X + 0.1 * X * Y + 0.1 * Math.sqrt(Math.abs(X));
        ResultLon += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLon += (20.0 * Math.sin(X * Math.PI) + 40.0 * Math.sin(X / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLon += (150.0 * Math.sin(X / 12.0 * Math.PI) + 300.0 * Math.sin(X / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ResultLon;
    }

    CalDev(WgLon, WgLat) {
        var ee = 0.00669342162296594323;
        var a = 6378245.0;
        var Lat = this.CalLat(WgLon - 105.0, WgLat - 35.0);
        var Lon = this.CalLon(WgLon - 105.0, WgLat - 35.0);
        var RadLat = WgLat / 180.0 * Math.PI;
        var Magic = Math.sin(RadLat);
        Magic = 1 - ee * Magic * Magic;
        var sqrtMagic = Math.sqrt(Magic);
        Lat = (Lat * 180.0) / ((a * (1 - ee)) / (Magic * sqrtMagic) * Math.PI);
        Lon = (Lon * 180.0) / (a / sqrtMagic * Math.cos(RadLat) * Math.PI);
        return {Lon: Lon, Lat: Lat};
    }

    
```




```
地球坐标系——WGS84：常见于 GPS 设备，Google 地图等国际标准的坐标体系。
火星坐标系——GCJ-02：中国国内使用的被强制加密后的坐标体系，高德坐标就属于该种坐标体系。
百度坐标系——BD-09：百度地图所使用的坐标体系，是在火星坐标系的基础上又进行了一次加密处理。
因此在使用不同坐标系前，我们需要使用 AMap.convertFrom() 方法将这些非高德坐标系进行转换。

JavaScript
var gps = [116.3, 39.9];
AMap.convertFrom(gps, 'gps', function (status, result) {
  if (result.info === 'ok') {
    var lnglats = result.locations; // Array.<LngLat>
  }
});
```





