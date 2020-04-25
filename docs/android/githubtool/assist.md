# 辅助类
[[toc]]
## bugly

### 崩溃日志收集
注意：  
1：版本更新后台增加后，需要等待5 - 10分钟才会起效  
2：后台apk需要包名一致，versioncode、versionname需要提高  
3：证书不用一致

<https://bugly.qq.com/v2/crash-reporting/dashboard/4e987c1111?pid=1>

```
1：申请账号，新建项目 ，获取appid  

2:
implementation 'com.tencent.bugly:crashreport:latest.release' 
//其中latest.release指代最新Bugly NDK版本号，也可以指定明确的版本号，例如3.0  

收集native层日志需添加此项
implementation 'com.tencent.bugly:nativecrashreport:latest.release'
```
3：在application内初始化：

 CrashReport.initCrashReport(getApplicationContext(), "f7b76b8463", false); 
 
 //添加此句话 f7b76b8463 为App Id

 如果是包括升级功能则是如下：
Bugly.init(getApplicationContext(), "4e987c1111", false);

4：
```
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
 <uses-permission android:name="android.permission.INTERNET" /> 
 <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.READ_LOGS" />
```


出错解决：
```
Cannot merge new index 66221 into a non-jumbo instruction（Android studio）
'''
<code>android {
    .....
    //解决问题的代码
    dexOptions {
        jumboMode true
    }
 
}</code>
```
如果还有错误：
```
defaultConfig {

    ndk {
//设置支持的SO库架构
abiFilters 'armeabi' //, 'x86', 'armeabi-v7a', 'x86_64', 'arm64-v8a'
    }
}
```




## logger

<https://www.jianshu.com/p/e044cab4f530>


### studio的logcat一闪而过问题
把Show only selected application下拉框，选择No filters 就可以看到了  



### log打印超长log
```
private static final String TAG = "okhttp";
private static final String TAG2 = "okhttpjson";

HttpLoggingInterceptor logInterceptor = new HttpLoggingInterceptor(new HttpLogger());
logInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
mOkHttpClient = new OkHttpClient.Builder()
.addNetworkInterceptor(new AuthInterceptor())
.addInterceptor(logInterceptor)
// .addInterceptor(logging)
.authenticator(new TokenAuthenticator())
.build();


static class HttpLogger implements HttpLoggingInterceptor.Logger {
@Override
public void log(String message) {
// 以{}或者[]形式的说明是响应结果的json数据，需要进行格式化
if ((message.startsWith("{") && message.endsWith("}"))
|| (message.startsWith("[") && message.endsWith("]"))) {
formatJson(message);
} else {
Log.d(TAG, message);
}
}
}

public static void formatJson(String jsonStr) {
if (null == jsonStr) {
Log.d(TAG2, "后台返回null");

} else if (jsonStr.equals("")) {
Log.d(TAG2, "后台返回空string");

} else {
StringBuilder sb = new StringBuilder();
char current = '\0';
for (int i = 0; i < jsonStr.length(); i++) {
// last = current;
current = jsonStr.charAt(i);
sb.append(current);
if (i != 0 && i % 200 == 0) {
sb.append("\n");
}
}
if (sb.length() > 4000) {
Log.d(TAG, "sb.length = " + sb.length());
int chunkCount = sb.length() / 4000; // integer division
for (int i = 0; i <= chunkCount; i++) {
int max = 4000 * (i + 1);
if (max >= sb.length()) {
Log.d(TAG2, "part " + i + " of " + chunkCount + ":\n" + sb.substring(4000 * i));
} else {
Log.d(TAG2, "part " + i + " of " + chunkCount + ":\n" + sb.substring(4000 * i, max));
}
}
} else {
Log.d(TAG2, sb.toString());
}
}
}
```
### crash日志收集：
<https://github.com/simplepeng/SpiderMan>  
### 打印log  
<https://github.com/ZhaoKaiQiang/KLog>  

### logback  
<https://github.com/XXApple/AndroidLibs>  
<https://blog.csdn.net/angcyo/article/details/51405301>  
<https://blog.csdn.net/xmtblog/article/details/38063139>  
<https://github.com/tony19/logback-android>  
<https://github.com/orhanobut/logger>  
<https://www.jianshu.com/p/e044cab4f530>  
```
private OkHttpClient okhttpclient() 
{ if (mOkHttpClient == null) 
{ 
HttpLoggingInterceptor logInterceptor = new HttpLoggingInterceptor(new HttpLogger());
 logInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY); 
mOkHttpClient = new OkHttpClient.Builder()
 .connectTimeout(15, TimeUnit.SECONDS) 
.addNetworkInterceptor(logInterceptor) 
.build();
 }
 return mOkHttpClient; }
```


## stetho



把compile 'com.facebook.stetho:stetho:1.4.2'添加到项目中。   

在Application中初始化：   

```
public class MyApplication extends Application {
public void onCreate() {
super.onCreate();
Stetho.initializeWithDefaults(this);
}
}
```

安装运行你的app（保持你的手机与电脑是连接着的）。  
在chrome网址栏中输入chrome://inspect/#devices，点击确定后会见到inspect，点击后会弹出Developer Tools，点击Web SQL 后就会见到你的项目的数据库了。



