[[toc]]

## 混淆

```java
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}

默认混淆模板路径
ANDROID_SDK\tools\proguard\proguard-android.txt

进一步压缩代码
getDefaultProguardFile("proguard-android-optimize.txt")

自定义的配置
proguard-rules.pro

如果报错 ，在混淆文件末端加上：
-ignorewarnings
-keep
```

## 使用 keytool 生成密钥文件

`keytool -genkey -alias 【别名】-keyalg 【加密算法】-keystore 【密钥文件名/密钥完整路径】`  
`keytool -genkey -alias TestAlias -keyalg RSA -keystore test.jks`

## 查看 shar1

`keytool -v -list -keystore keystore文件路径`

## debug 版本证书（获取 shar1 值)

默认路径：C:\Users\Administrator\.android\debug.keystore  
默认密码：android  
第一步、打开 Android Studio 的 Terminal 工具  
第二步、输入命令：keytool -v -list -keystore keystore 文件路径  
第三步、输入 Keystore 密码  
即可获取编译的 shar1 值

## 加快编译速度

```java
写到build.gradle文件中。
android {
    ...
    tasks.whenTaskAdded {
        task - >
            if (task.name.contains("lint")
                //如果instant run不生效，把clean这行干掉
                || task.name.equals("clean")
                //如果项目中有用到aidl则不可以舍弃这个任务
                || task.name.contains("Aidl")
                //用不到测试的时候就可以先关闭
                || task.name.contains("mockableAndroidJar") || task.name.contains("UnitTest") || task.name.contains("AndroidTest")
                //用不到NDK和JNI的也关闭掉
                || task.name.contains("Ndk") || task.name.contains("Jni")
            ) {
                task.enabled = false
            }
    }
}
```

## gradle 命令

```

./gradlew -v 版本号，首次运行，没有gradle的要下载的哦。
./gradlew clean 删除HelloWord/app目录下的build文件夹
./gradlew build 检查依赖并编译打包
./gradlew assembleDebug 编译并打Debug包
./gradlew assembleRelease 编译并打Release的包
./gradlew installRelease Release模式打包并安装
./gradlew uninstallRelease 卸载Release模式包
```

## 动态加载 so，jar 包

```java
import java.lang.reflect.Method;

public class DexLoader {
    public static void loadDex(String dexPath, String dexOutputDir, String optimizedDir, ClassLoader parentClassLoader) {
        DexClassLoader dexClassLoader = new DexClassLoader(dexPath, dexOutputDir, optimizedDir, parentClassLoader);
        try {
            // 加载需要调用的类
            Class<?> loadedClass = dexClassLoader.loadClass("com.example.MyClass");

            // 获取方法
            Method myMethod = loadedClass.getMethod("myMethod", String.class);

            // 创建类实例
            Object instance = loadedClass.newInstance();

            // 调用方法
            String result = (String) myMethod.invoke(instance, "Hello, Reflection!");

            // 输出结果
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

String dexPath = "/sdcard/your_dex_file.dex"; // DEX 文件路径
String dexOutputDir = getDir("dex", 0).getAbsolutePath(); // DEX 输出目录
String optimizedDir = getDir("opt", 0).getAbsolutePath(); // 优化后的 DEX 输出目录
ClassLoader parentClassLoader = getClassLoader(); // 父 ClassLoader

//optimizedDir可传null
DexLoader.loadDex(dexPath, dexOutputDir, optimizedDir, parentClassLoader);


```

```java
import java.net.URL;
import java.net.URLClassLoader;

public class JarLoader {
    public static void loadJar(String jarPath) {
        try {
            URL jarUrl = new URL("file://" + jarPath);
            URLClassLoader classLoader = new URLClassLoader(new URL[] {jarUrl});

            // 加载需要调用的类
            Class<?> loadedClass = classLoader.loadClass("com.example.MyClass");

            // 创建类实例
            Object instance = loadedClass.newInstance();

            // 调用方法
            // ...

            // 关闭ClassLoader
            classLoader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 静默安装自启动

```java
    <uses-permission android:name="android.permission.INSTALL_PACKAGES"/>
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>
```

```java
package com.tmai.general.business.login;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import com.tmai.general.business.R;

import org.csr.core.util.ToastUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author zzc 更新安裝APK
 * @time 2016.09.18
 */
public class DownloadApp {
    private ProgressDialog mpDialog;// 创建进度条
    private Context mContext;
    private boolean isSelect = true;
    // APK的安装路径
    private static final String apkPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/updateApkFile/"; //保存下载文件的路径
    private String mUrl;
    private boolean isMust;

    //isSelect 是否强制升级 ，是的话就直接下载更新不弹框
    public DownloadApp(String url, Context ctx, boolean isMust) {
        this.mUrl = url;
        this.mContext = ctx;
        this.isMust = isMust;
    }

    /**
     * 提示用户更新
     *
     * @param content 更新内容
     */
    public void uploadApp(String content, boolean isSelect) {
        if (!isSelect) {
            downloadApk(false);
            return;
        }
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        builder.setMessage("有新版本升级，是否下载安装？\n" + content);
        builder.setTitle("系统版本更新");// str可以提示的内容显示
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                mpDialog = new ProgressDialog(mContext, R.style.activity_dialog);
                mpDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                mpDialog.setTitle("提示");
                mpDialog.setMessage("正在下载中，请稍后");
                mpDialog.setIndeterminate(false);// 进度条是否明确
                mpDialog.setCancelable(false);// 点击返回按钮的时候无法取消对话框
                mpDialog.setCanceledOnTouchOutside(false);// 点击对话框外部取消对话框显示
                mpDialog.setProgress(0);// 设置初始进度条为0
                mpDialog.incrementProgressBy(1);// 设置进度条增涨。
                mpDialog.show();
                downloadApk(true);
                dialog.dismiss();
            }
        });
        builder.setCancelable(false);
        if (!isMust) {
            builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {

                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });

        }
        builder.create().show();
    }

    /**
     * 下载apk
     */
    public void downloadApk(boolean isShow) {
        this.isSelect = isShow;
        //开启另一线程下载
        Thread downLoadThread = new Thread(downApkRunnable);
        downLoadThread.start();
    }

    /**
     * 从服务器下载新版apk的线程
     */
    private Runnable downApkRunnable = new Runnable() {
        @Override
        public void run() {
            if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
                //如果没有SD卡
                AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
                builder.setTitle("提示");
                builder.setMessage("当前设备无SD卡，数据无法下载");
                builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                builder.show();
            } else {
                InputStream is = null;
                FileOutputStream fos = null;
                try {
                    //服务器上新版apk地址
                    URL url = new URL(mUrl);
                    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                    httpURLConnection.setConnectTimeout(30000);
                    httpURLConnection.setReadTimeout(30000);
                    httpURLConnection.setDoInput(true);
                    httpURLConnection.connect();
                    int length = httpURLConnection.getContentLength();
                    if (isSelect) {
                        mpDialog.setMax(length);
                    }
                    is = httpURLConnection.getInputStream();
                    File file = new File(apkPath);
                    if (!file.exists()) {
                        //如果文件夹不存在,则创建
                        file.mkdir();
                    }
                    //下载服务器中新版本软件（写文件）
                    String path = apkPath + "detectionface.apk";
                    File apkFile = new File(path);
                    fos = new FileOutputStream(apkFile);
                    int count = 0;
                    byte buf[] = new byte[10240];
                    do {
                        int numRead = is.read(buf);
                        count += numRead;
                        //更新进度条
                        if (isSelect) {
                            mpDialog.setProgress(count);
                        }
                        if (numRead <= 0) {
                            //下载完成通知安装
                            sendMsg(2);
                            break;
                        }
                        fos.write(buf, 0, numRead);

                    } while (true);

                } catch (IOException e) {
                    e.printStackTrace();
                    sendMsg(-1);
                } finally {
                    try {
                        if (fos != null) {
                            fos.close();
                        }
                        if (is != null) {
                            is.close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    };

    // 安装apk方法
    private void installApk(String filename) {
        File file = new File(filename);
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.putExtra("SILENT_INSTALL", 2);
        String type = "application/vnd.android.package-archive";
        intent.setDataAndType(Uri.fromFile(file), type);
        mContext.startActivity(intent);
        if (mpDialog != null) {
            mpDialog.cancel();
        }
    }

    private void sendMsg(int flag) {
        Message msg = handler.obtainMessage();
        msg.what = flag;
        handler.sendMessage(msg);
    }

    private final Handler handler = new Handler(Looper.myLooper()) {
        public void handleMessage(Message msg) {
            if (!Thread.currentThread().isInterrupted()) {
                switch (msg.what) {
                    case 2:
                        if (isSelect) {
                            mpDialog.setMessage("文件下载完成");
                        }
                        String apkName = apkPath + "detectionface.apk";
                        installApk(apkName);
                        break;
                    case -1:
                        if (isSelect) {
                            mpDialog.setMessage("下载失败！");
                            mpDialog.setCanceledOnTouchOutside(true);
                        } else {
                            ToastUtil.toastShort(mContext, "app下载失败！");
                        }
                        break;
                    default:
                        break;
                }
            }
            super.handleMessage(msg);
        }
    };
}
```

## 调用系统浏览器下载避免权限无法安装的问题

```java
  Intent intent = new Intent();
//                            intent.setAction("android.intent.action.VIEW");
//                            Uri content_url = Uri.parse(downloadUrl);
//                            intent.setData(content_url);
//                            startActivity(intent);

```

```java
protected void installApk(File file) {
Intent intent = new Intent();
intent.setAction("android.intent.action.VIEW");
intent.addCategory("android.intent.category.DEFAULT");
//注意:这两个要一起设两个参数,一个是uri,一个是type,因为单独设的话会出现.清空前一个的设置.
intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
startActivity(intent);
}



//传递一个Apk的file就可以
protected void installApk(File file) {
//参照需要启动的Activity的filter配置去进行Intent设制就可以
// <action android:name="android.intent.action.VIEW" />
//        <category android:name="android.intent.category.DEFAULT" />
//        <data android:scheme="content" />
//        <data android:scheme="file" />
//        <data android:mimeType="application/vnd.android.package-archive" />
Intent intent = new Intent();
intent.setAction("android.intent.action.VIEW");
intent.addCategory("android.intent.category.DEFAULT");
// intent.setType("application/vnd.android.package-archive");
// intent.setData(Uri.fromFile(file));
//注意:这两个要一起设两个参数,一个是uri,一个是type,因为单独设的话会出现清空前一个的设置.
intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
startActivity(intent);
}
```

## 打 jar 包

```
打jar包
在app下添加依赖 compile project(':core')
Jar包位置：build--libs
```

### 打 aar 包

```java
位置：build -- outputs -- aar
引用：
project的gradle：
flatDir {
  dirs 'libs'
 }
app的gradle：
compile(name: 'common-debug', ext: 'aar')
```

## 修改 jar 包内容

1、studio 打开 jar 包,复制要修改的.class 文件内容，，新建一个同名文件，拷贝内容进去，然后 rebuild  
(注：按需添加缺失的依赖文件，只保证此.java 文件编译正常即可)  
2、拷贝编译出的.class 文件，路径例：app/build/intermediates/javac/debug/classes/org/webrtc/DefaultVideoDecoderFactory.class  
3、jar 改为 zip 解压，将刚才.class 文件覆盖，重新改为.jar 即可

## android 将 so 打到 jar 包中并运行

<https://blog.csdn.net/s569646547/article/details/51822014>

## 生成.so 文件

<https://www.jianshu.com/p/3494741f0ad1>  
步骤：  
1：配置 ndk 路径  
1：写一个 java 类，编译生成.class  
2：用命令把.class 转编译成.h 文件  
3：在 jniutil.c 中我们需要导入上边的.h 文件，然后实现具体的 test 方法。

## ndk 开发

<https://www.cnblogs.com/yejiurui/p/3476565.html>

##　封装 sdk

```java
1、将 apply plugin: 'com.android.application'修改成apply plugin: 'com.android.library'
2、去掉applicationId "com.mg.axe.helloworld"
3、删除自定义的Application和在AndroidManifest.xml的配置
4、去点入口的Activity，否则在Android Studio接入时会生成两个图标入口
5、在build下的assembleRelease和assembleDebug都可以生成aar包
6、aar解压即可得到jar
7、引入：
repositories{
        flatDir {
            dirs 'libs'
        }
    }

      // implementation(name: 'aar包的名字', ext: 'aar')
  implementation(name: 'game_sdk', ext: 'aar')
```

## android 多渠道、多版本打包

-- 不同包名、不同签名、不同版本号、替换 string、icon 等  
1、app/build.gradle 文件的修改，增加：productFlavors
1.1、defaultConfig 注释掉原本的 applicationId，不然会和多渠道内的包名有冲突
1.2、versionCode 和 versionName 也可以配置进 productFlavors 中去，不多说
1.3、buildTypes 暂时就用默认的
1.4、productFlavors 下一般有这几部分组成

2、修改工程的目录
在 app 目录同级增加其他的 Flavors 文件夹，  
比如替换 app_name，原本 app 下 values 中 string.xml 的 app_name 注释掉

注： 配置文件里用通配符引用例如： android:authorities="${applicationId}.provider"

例：

```java

gradle.properties：

MYAPP_RELEASE_STORE_FILE=danbing_release.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=tdyg123
MYAPP_RELEASE_KEY_PASSWORD=tdyg123

MYAPP_RELEASE_STORE_FILE2=claireye_release.jks
MYAPP_RELEASE_KEY_ALIAS2=claireye_release


android{}内：

    signingConfigs {
        normalRelease {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }

        claireyeRelease {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE2')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE2)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS2
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }


      buildTypes {
    release {
      // 省略其他配置...
        signingConfig null  // 置空
    }

    debug {
      // 省略其他配置...
        signingConfig null // 置空
    }
    }
    productFlavors {
        normal {
            applicationId "com.amplesky.client.cdc"
            versionCode 13
            versionName "1.0.12"
            dimension "implementation"
            buildConfigField 'boolean', 'openvpn3', 'true'
            signingConfig = signingConfigs.normalRelease
            manifestPlaceholders = [
                    VpnfileProvider: "com.amplesky.client.cdc.provider"
            ]
        }

        claireye {
            applicationId "com.amplesky.client.claireye"
            versionCode 13
            versionName "1.0.12"
            dimension "implementation"
            buildConfigField 'boolean', 'openvpn3', 'true'
            signingConfig = signingConfigs.claireyeRelease
            manifestPlaceholders = [
                    VpnfileProvider: "com.amplesky.client.claireye.provider"
            ]

        }

    }

    applicationVariants.all {
        //判断是release还是debug版本
        def buildType = it.buildType.name
        def fileName
        //获取当前时间的"YYYY-MM-dd"格式。
        def createTime = new Date().format("YYYYMMddHHmm", TimeZone.getTimeZone("GMT+08:00"))
        //只对Release包起作用，如果不是Release包则不变更输出路径，否则可能导致AS无法自动安装debug包。
        if (buildType == "release") {
            it.getPackageApplication().outputDirectory = new File(project.rootDir.absolutePath + "/apks")
        }
        def channel = it.productFlavors[0].name
        it.outputs.each {
            //只对Release包起作用，如果不是Release包则不变更名称。
            if (buildType == "release") {
                //我此处的命名规则是：渠道名_项目名_版本名_创建时间_构建类型.apk
                fileName = "danbing_v${defaultConfig.versionName}-${buildType}_${createTime}.apk"
                fileName = "${channel}_danbing_v${defaultConfig.versionName}_${createTime}-${buildType}.apk"
                //将名字打印出来，以便及时查看是否满意。
                println "file name：-----------------${fileName}"
                //重新对apk命名。(适用于Gradle4.0（含）以上版本)如果你Gradle版本是4.0以下版本则将上面的一行代码放开并注释下面的这一行。
                it.outputFileName = fileName
            }
        }
    }
```

## 一些问题

apk 安装遇到问题  
1：Package couldn't be install... & provider is already used by  
配置文件中的 content provider 设置 authorities 为不相同的

## 编译报错 Invalid keystore format

更换 android studio 的 jdk

## 编译脚本

- 生成证书,拷贝到 app 路径下

```
keytool -genkey -v -keystore test.jks -alias myalias  -storepass 1234 -keypass 1234 -keyalg RSA -validity 14000

14000为天数
```

- 项目根目录新建 build.bat

```
echo  " **************************package start ************************** "
gradle clean&gradle assembleRelease
echo -e "**************************package complete************************** "
```

- gradle.properties 新增内容

```
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456
MYAPP_RELEASE_STORE_FILE=test.jks
MYAPP_RELEASE_KEY_ALIAS=my-alias
```

- 修改 app/build.gradle

```js
    signingConfigs {
        config {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.config
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    applicationVariants.all {
        //判断是release还是debug版本
        def buildType = it.buildType.name
        def fileName
        //获取当前时间的"YYYY-MM-dd"格式。
        def createTime = new Date().format("YYYYMMddHHmm", TimeZone.getTimeZone("GMT+08:00"))
        //只对Release包起作用，如果不是Release包则不变更输出路径，否则可能导致AS无法自动安装debug包。
        if (buildType == "release") {
            it.getPackageApplication().outputDirectory = new File(project.rootDir.absolutePath + "/apks")
        }
//        def channel = it.productFlavors[0].name
        it.outputs.each {
            //只对Release包起作用，如果不是Release包则不变更名称。
            if (buildType == "release") {
                //我此处的命名规则是：渠道名_项目名_版本名_创建时间_构建类型.apk
                fileName = "appcenter_v${defaultConfig.versionName}_${createTime}-${buildType}.apk"
                //将名字打印出来，以便及时查看是否满意。
                println "file name：-----------------${fileName}"
                //重新对apk命名。(适用于Gradle4.0（含）以上版本)如果你Gradle版本是4.0以下版本则将上面的一行代码放开并注释下面的这一行。
                it.outputFileName = fileName
            }
        }
    }
```

- 执行 build.bat，生成路径为根目录/apks/

## 编译 aar/jar

```
aar: studio新建module - Android Library - 命名mylib - 在mylib目录执行gradle assembleRelease

jar: 编辑mylib内的build.gradle

android{
  task makeJar(type: Copy) {
        //删除存在的
        delete 'build/libs/myjar.jar'
        //设置拷贝的文件
        from('build/intermediates/aar_main_jar/release/')
        //打进jar包后的文件目录
        into('build/libs/')
        //将classes.jar放入build/libs/目录下
        //include ,exclude参数来设置过滤
        include('classes.jar')
        //重命名
        rename ('classes.jar', 'myjar.jar')
    }
    makeJar.dependsOn(build)
}

```
