[[toc]]

## 手机暗码

> 目前移动平台实现了一些暗码功能，即在手机上通过拨号盘输入一些字符，可以显示手机的软件信息或者激活辅助调试功能。  
> 安卓原生暗码
>
> - **\*#06#** 查看 IMEI 号；
> - \*#07#：监管信息 （待确认）；
> - _#_#4636#_#_ ：显示手机信息、电池信息、电池记录、使用统计数据、WiFi 信息等基本信息；

> 高通平台上乐视自实现暗码如下：

    * *#5388#*：打开工厂测试APK；
    * *#*#8888#*#*：打开离线日志工具，配合问题反馈，获取更多日志；
    * *#*#46360000#*#*：设置USB的默认功能，供调试用；
    * *#*#76937#*#*：打开用于监控系统是否进入睡眠状态的呼吸灯；激活Download mode，手机死机不再重启，而是进入该模式；Enable all logs，提高日志的输出级别；
    * #02#：显示手机软件编译自哪个分支；
    * *#*#9439#*#* : 即中国电信的首字母，可以在公开版上激活电信网络功能；

> MTK 平台上乐视自实现暗码如下：

    * *#*#3646633#*#*：开发者模式，获取系统信息，可以配置一些模式 （MTK原生实现）；
    * *#5388#*：打开工厂测试APK；
    * *#*#8888#*#*：打开离线日志工具，配合问题反馈，获取更多日志；
    * *#02#：显示系统信息；

> 小米手机测试指令代码  
> _#_#64663#_#_ 综合测试指令
> _#_#4636#_#_ 显示手机信息、电池信息、电池记录、使用统计数据、WiFi 信息

## 版本全局统一管理

<http://wuxiaolong.me/2016/03/31/gradle4android2/>

## ConstraintLayout 属性详解 和 Chain 的使用
<https://juejin.cn/post/6949186887609221133#heading-15>  
## DrawerLayout 和 NavigationView 使用详解

<https://www.jianshu.com/p/d2b1689a23bf>

## Picture 详解

<https://www.jianshu.com/p/55026c9f6c5c>

## 图片压缩几种方式

<https://www.jianshu.com/p/08ed0e3c4e71>

## Camera2

<https://www.jianshu.com/p/73fed068a795>

## setPreviewCallbackWithBuffer

作用：减少 Camera 预览时内存占用

```java
使用步骤:
1 在打开摄像头预览前先分配一个buffer地址
camera.setPreviewCallbackWithBuffer(h264Encoder);
camera.addCallbackBuffer(mPreviewSize.width* mPreviewSize.height*3 / 2);
camera.startPreview();
```

### 获取摄像头所支持的所有分辨率

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TextureView textureView = new TextureView(this);
        textureView.setSurfaceTextureListener(new TextureView.SurfaceTextureListener() {
            @Override
            public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
                try {
                    Camera open = Camera.open();

                    Camera.Parameters params = open.getParameters();

                    List<Camera.Size> pictureSizes = params.getSupportedPictureSizes();
                    int length = pictureSizes.size();
                    for (int i = 0; i < length; i++) {
                        Log.e("SupportedPictureSizes", "SupportedPictureSizes : " + pictureSizes.get(i).width + "x" + pictureSizes.get(i).height);
                    }

                    List<Camera.Size> previewSizes = params.getSupportedPreviewSizes();
                    length = previewSizes.size();
                    for (int i = 0; i < length; i++) {
                        Log.e("SupportedPreviewSizes", "SupportedPreviewSizes : " + previewSizes.get(i).width + "x" + previewSizes.get(i).height);
                    }

                    open.setPreviewTexture(surface);
                    open.startPreview();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {

            }

            @Override
            public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
                return false;
            }

            @Override
            public void onSurfaceTextureUpdated(SurfaceTexture surface) {

            }
        });

        setContentView(textureView);
    }
}

```

### 使用系统相机拍照，获取照片

```java

在相机app的activity配置如下即可：

<intent-filter>
    <action android:name="android.media.action.IMAGE_CAPTURE" />
    <category android:name="android.intent.category.DEFAULT" />
</intent-filter>

启动系统相机：

获取压缩过的图：
Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
startActivityForResult(intent, 1);


获取原图
Intent intent1 = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
path= Environment.getExternalStorageDirectory().getPath()+"/temp.png";
Uri uri = Uri.fromFile(new File(path));
intent.putExtra(MediaStore.EXTRA_OUTPUT,uri);
startActivityForResult(intent1, 1);

@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //获取的是压缩过的图片
    if (resultCode == 1) {
        Bundle extras = data.getExtras();
        Bitmap data1 = (Bitmap) extras.get("data");
    }else if(resultCode==2){
        //获取原图
        try {
            FileInputStream inputStream = new FileInputStream(path);
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}

```

## Arraymap

<https://www.jianshu.com/p/1a14fc87b935>

## PowerManager 与 WakeLock

<https://www.jianshu.com/p/48ed37738a9e>

## aapt/dx 命令编译打包 APK

<https://blog.csdn.net/qq_32115439/article/details/55846094>

## Canvas 方法总结最全面详解 API

<https://www.jianshu.com/p/e12696e7b95d>

## Data Binding（数据绑定）用户指南

<http://www.jcodecraeer.com/a/anzhuokaifa/developer/2015/0606/3005.html>  
<https://zhuanlan.zhihu.com/p/34532561>

## selector 使用

<https://www.cnblogs.com/swxj/articles/3417086.html>

## 登录框

![](../../img/20230802154556.png)

```java
<?xml version="1.0" encoding="UTF-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle" >
    <gradient
        android:angle="90"
        android:endColor="#ffffff"
        android:startColor="#ffffff" />

    <corners
        android:bottomLeftRadius="20dp"
        android:bottomRightRadius="20dp"
        android:topLeftRadius="20dp"
        android:topRightRadius="20dp" />
    <stroke
        android:width="1dip"
        android:color="@color/cp_main_color" />
</shape>
```

## android:windowSoftInputMode 属性详解

```java
<activity Android:windowSoftInputMode="stateVisible|adjustResize". . . >
在这设置的值(除"stateUnspecified"和"adjustUnspecified"以外)将覆盖在主题中设置的值
各值的含义：
【A】stateUnspecified：软键盘的状态并没有指定，系统将选择一个合适的状态或依赖于主题的设置
【B】stateUnchanged：当这个activity出现时，软键盘将一直保持在上一个activity里的状态，无论是隐藏还是显示
【C】stateHidden：用户选择activity时，软键盘总是被隐藏
【D】stateAlwaysHidden：当该Activity主窗口获取焦点时，软键盘也总是被隐藏的
【E】stateVisible：软键盘通常是可见的
【F】stateAlwaysVisible：用户选择activity时，软键盘总是显示的状态
【G】adjustUnspecified：默认设置，通常由系统自行决定是隐藏还是显示
【H】adjustResize：该Activity总是调整屏幕的大小以便留出软键盘的空间
【I】adjustPan：当前窗口的内容将自动移动以便当前焦点从不被键盘覆盖和用户能总是看到输入内容的部分
```

## 设置透明度

```java

设置透明效果 大概有三种

1、用android系统的透明效果
Java代码
android:background="@android:color/transparent"

例如 设置按钮
Java代码
<Button android:background="@android:color/transparent"
  android:text="@+id/Button01"
  android:id="@+id/Button01"
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:textColor="#ffffff" />

2、用ARGB来控制
Java代码
半透明<Button android:background="#50000000" />
透明<Button android:background="#00000000" />

3、设置alpha

Java代码
View v = findViewById(R.id.content);//找到你要设透明背景的layout 的id
v.getBackground().setAlpha(100);//0~255透明度值

android 窗体透明的，黑暗度等的设置技巧
设置透明度（这是窗体本身的透明度，非背景）

WindowManager.LayoutParams lp=getWindow().getAttributes();
lp.alpha=0.3f;
getWindow().setAttributes(lp);

alpha在0.0f到1.0f之间。1.0完全不透明，0.0f完全透明

设置黑暗度

WindowManager.LayoutParams lp=getWindow().getAttributes();
lp.dimAmount=0.5f;
getWindow().setAttributes(lp);
getWindow().addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);

dimAmount在0.0f和1.0f之间，0.0f完全不暗，1.0f全暗

设置背景模糊
getWindow().setFlags(WindowManager.LayoutParams.FLAG_BLUR_BEHIND,
WindowManager.LayoutParams.FLAG_BLUR_BEHIND);

以上设置对dialog对话框同样有效

Activity的透明、半透明效果的设置transparent
res/values/styles.xml


<resources>
 <style name="Transparent">
    <item name="android:windowBackground">
       @color/transparent_background
    </item>
    <item name="android:windowNoTitle">true</item>
    <item name="android:windowIsTranslucent">true</item>
    <item name="android:windowAnimationStyle">
         @+android:style/Animation.Translucent
   </item>
 </style>
</resources>

res/values/color.xml

<?xml version="1.0" encoding="utf-8"?>

<resources>
 <color name="transparent_background">#50000000</color>
</resources>

//注意：
//color.xml的#5000000前两位是透明的效果参数从00--99（透明--不怎么透明），
//后6位是颜色的设置

manifest.xml

<activity
android:name=".TransparentActivity"
android:theme="@style/Transparent">

</activity>

java代码

public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTheme(R.style.Transparent);
        setContentView(R.layout.transparent);
}

```

## 状态栏设置

```java
去掉状态栏：
//去除title
requestWindowFeature(Window.FEATURE_NO_TITLE);
//去掉Activity上面的状态栏
getWindow().setFlags(WindowManager.LayoutParams. FLAG_FULLSCREEN , WindowManager.LayoutParams. FLAG_FULLSCREEN);
  setContentView(R.layout.main);
}

或者

requestWindowFeature(Window.FEATURE_CUSTOM_TITLE);
getWindow().setFeatureInt(Window.FEATURE_CUSTOM_TITLE, R.layout.custom_title_1);


设置状态栏：
1：设置布局id为Mrlayout
2：mRLayout.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
    1. View.SYSTEM_UI_FLAG_VISIBLE：显示状态栏，Activity不全屏显示(恢复到有状态的正常情况)。

    2. View.INVISIBLE：隐藏状态栏，同时Activity会伸展全屏显示。

    3. View.SYSTEM_UI_FLAG_FULLSCREEN：Activity全屏显示，且状态栏被隐藏覆盖掉。

    4. View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN：Activity全屏显示，但状态栏不会被隐藏覆盖，状态栏依然可见，Activity顶端布局部分会被状态遮住。

    5. View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION：效果同View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN

    6. View.SYSTEM_UI_LAYOUT_FLAGS：效果同View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN

    7. View.SYSTEM_UI_FLAG_HIDE_NAVIGATION：隐藏虚拟按键(导航栏)。有些手机会用虚拟按键来代替物理按键。

    8. View.SYSTEM_UI_FLAG_LOW_PROFILE：状态栏显示处于低能显示状态(low profile模式)，状态栏上一些图标显示会被隐藏。


```

## aidl

<https://www.jianshu.com/p/67e490284587>

## contentprovider

```java
1. 写一个类继承ContentProvider,实现增删改查的方法

2. 在清单文件中配置内容提供者,指定  android:authorities="com.itheima.db"  包名

3. 在内容提供者代码的内部 声明uriMatcher

4. 通过uriMatcher 检查uri的路径是否正确 "content"//com.包名"

5. 在另外一个应用程序里面 通过contentResolver 增删改查


package my.it.com.myapplication;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.Log;

/**
* Created by Administrator on 2017/3/17.
*/

public class ContentProviderImpl extends ContentProvider {
    private static final String TAG = "tag1";

    @Override
    public boolean onCreate() {
        Log.i(TAG, "onCreate: ");
        // 新建个数据库并插入一条数据
        SQLiteDatabase db = this.getContext().openOrCreateDatabase("test_db2.db", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE t_user (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL)");
        ContentValues values = new ContentValues();
        values.put("name", "liangjh2");
        db.insert("t_user", "id", values);
        return false;
    }

    @Nullable
    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        // 获取数据
        SQLiteDatabase db = this.getContext().openOrCreateDatabase("test_db2.db", Context.MODE_PRIVATE, null);
        Cursor c = db.query("t_user", null, null, null, null, null, null);
        Log.i(TAG, "query: ");
        return c;
    }

    @Nullable
    @Override
    public String getType(Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }
}

配置文件：


<provider android:name=".ContentProviderImpl" android:authorities="com.example.androidtestdemo" android:exported="true"/>


另一个应用中：


Context ctx = MainActivity.this;
ContentResolver resolver = ctx.getContentResolver();
Uri uri = Uri.parse("content://com.example.androidtestdemo");
Cursor c = resolver.query(uri, null, null, null, null);
c.moveToFirst();
while (!c.isAfterLast()) {
    for (int i = 0, j = c.getColumnCount(); i < j; i++) {
        Log.v("tag", "" + c.getString(i));
    }
    c.moveToNext();
}


关于uriMatcher：
有多个表需要不同的uri区分，uirMatcher就是过滤uri不同表的。
1：

- public static final Uri CONTENT_URI_A = Uri.parse("content://" + AUTHORITY  + "/" + TABLE_A);
- public static final Uri CONTENT_URI_B = Uri.parse("content://" + AUTHORITY  + "/" + TABLE_B);

2：定义urimatcher


- private static final UriMatcher URI_MATCHER;
- static {
-    URI_MATCHER = new UriMatcher(UriMatcher.NO_MATCH);
-    URI_MATCHER.addURI(AUTHORITY, TABLE_A, TABLE_A_MSG);
-    URI_MATCHER.addURI(AUTHORITY, TABLE_B, TABLE_B_MSG);
-
- }

3：查询中使用urimatcher：


- @Override
-   public Cursor query(Uri uri, String[] projection, String selection,
-         String[] selectionArgs, String sortOrder) {
-
-      String table = null;
-
-      switch (URI_MATCHER.match(uri)) {
-      case ALL_MESSAGES:
-         break;
-      case OXFORD_MSG:
-         table = TABLE_A;
-         break;
-      case CHENYU_MSG:
-         table = TABLE_B;
-         break;
-      default:
-         break;
-      }
-
-      Cursor resultCursor = mDB.query(table, projection, selection, selectionArgs, null, null, sortOrder);
-
-      return resultCursor;
-   }

```

## Android URI 总结

<https://www.jianshu.com/p/7690d93bb1a1>

## exception 异常

```java
异常捕获
创建一个捕获异常类继承android.app.Application，该类代表的当前的应用程序。维护的是应用程序全部的状态信息，
一个应用程序只会实例化一个Application类，单一实例，单态模式，singletons，
注意：需要再清单文件中配置，找到application的节点，在子节点name里配置该类
实现未实现的方法
public void onCreate()方法：应用程序进程在第一次被创建的时候调用的方法，在任何其他对象创建之前执行的逻辑，开天地的
{ //设置未捕获的异常处理器
Thread.currentThread().setUncaughtExceptionHandler(new MyExceptionHandler());
}
//创建一个类实现未捕获异常处理器
private class MyExceptionHandler implements UncaughtExceptionHandler{
//实现未实现的方法，当线程出现了未捕获异常的方法时调用
//虽然捕获到了异常，但是不能阻止java虚拟机退出，应用程序不报异常但还是会卡住，只是留了一点时间写个遗言而已
public void uncaughtException(Thread thread,Throwable ex){
//获取异常字段（getName和get()获取name和值 ），将异常打印成日志保存到SDK卡中
ex.printStackTrace()
System.out.println("异常被捕获");
//调用killProcess方法传一个自己的进程ID 杀死进程，不会出现程序未响应，原地复活，提高用户体验
android.os.Process.killProcess(android.os.Process.myPid());
}
}
当异常信息被保存到SDK中 可以提示用户是否提交错误信息，或者偷偷把异常错误信息提交到服务器，按公司需求而定
//onTerminate方法（模拟器上才会使用到）：终止之前进行一些调试的逻辑，配置清单文件Debuggable改为true（是否被调试，开发中用，放到市场上时就改成false）
//onLowMemory方法（当内存不足时调用的方法）：把不必要的资源和缓存给释放掉，开个服务，或者提高自己的优先级，避免因为内存不足自己被干掉。
```

### 异常捕获完整 demo

```java
1：在MyApplication类中初始化

CrashHandler.getInstance().init(getApplicationContext());

2：具体类


package com.soft.tm.handler;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Environment;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
* 全局的捕获异常
*
* Created by Administrator on 2016/8/16.
*/
public class CrashHandler implements Thread.UncaughtExceptionHandler {
public static final String TAG = "TEST";
// CrashHandler 实例
private static CrashHandler INSTANCE = new CrashHandler();
// 程序的 Context 对象
private Context mContext;
// 系统默认的 UncaughtException 处理类
private Thread.UncaughtExceptionHandler mDefaultHandler;
// 用来存储设备信息和异常信息
private Map<String, String> infos = new HashMap<String, String>();
// 用来显示Toast中的信息
private static String error = "正在维护中，请稍后再试";
private static final Map<String, String> regexMap = new HashMap<String, String>();
// 用于格式化日期,作为日志文件名的一部分
private DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss", Locale.CHINA);

/**
* 保证只有一个 CrashHandler2 实例
*/
private CrashHandler() {
//
}

/**
* 获取 CrashHandler 实例 ,单例模式
*/
public static CrashHandler getInstance() {
// initMap();
return INSTANCE;
}

/**
* 初始化
*
* @param context
*/
public void init(Context context) {
mContext = context;
// 获取系统默认的 UncaughtException 处理器
mDefaultHandler = Thread.getDefaultUncaughtExceptionHandler();
// 设置该 CrashHandler 为程序的默认处理器
Thread.setDefaultUncaughtExceptionHandler(this);
Log.d("TEST", "Crash:init");
}

/**
* 当 UncaughtException 发生时会转入该函数来处理
*/
@Override
public void uncaughtException(Thread thread, Throwable ex) {
if (!handleException(ex) && mDefaultHandler != null) {
// 如果用户没有处理则让系统默认的异常处理器来处理
mDefaultHandler.uncaughtException(thread, ex);
Log.d("TEST", "defalut");
} else {
try {
Thread.sleep(3000);
} catch (InterruptedException e) {
Log.e(TAG, "error : ", e);
}
// 退出程序
android.os.Process.killProcess(android.os.Process.myPid());
// mDefaultHandler.uncaughtException(thread, ex);
System.exit(10);
}
}

/**
* 自定义错误处理，收集错误信息，发送错误报告等操作均在此完成
*
* @param ex
* @return true：如果处理了该异常信息；否则返回 false
*/
private boolean handleException(Throwable ex) {
if (ex == null) {
return false;
}
// 收集设备参数信息
// collectDeviceInfo(mContext);
// 保存日志文件
saveCrashInfoFile(ex);
// 使用 Toast 来显示异常信息
new Thread() {
@Override
public void run() {
Looper.prepare();
Toast.makeText(mContext, error, Toast.LENGTH_LONG).show();
Looper.loop();
}
}.start();
return true;
}

/**
* 收集设备参数信息
*
* @param ctx
*/
public void collectDeviceInfo(Context ctx) {
try {
PackageManager pm = ctx.getPackageManager();
PackageInfo pi = pm.getPackageInfo(ctx.getPackageName(), PackageManager.GET_ACTIVITIES);
if (pi != null) {
String versionName = pi.versionName == null ? "null"
: pi.versionName;
String versionCode = pi.versionCode + "";
infos.put("versionName", versionName);
infos.put("versionCode", versionCode);
}
} catch (PackageManager.NameNotFoundException e) {
Log.e(TAG, "an error occured when collect package info", e);
}
Field[] fields = Build.class.getDeclaredFields();
for (Field field : fields) {
try {
field.setAccessible(true);
infos.put(field.getName(), field.get(null).toString());
Log.d(TAG, field.getName() + " : " + field.get(null));
} catch (Exception e) {
Log.e(TAG, "an error occured when collect crash info", e);
}
}
}

/**
* 保存错误信息到文件中 *
*
* @param ex
* @return 返回文件名称, 便于将文件传送到服务器
*/
private String saveCrashInfoFile(Throwable ex) {
StringBuffer sb = getTraceInfo(ex);
Writer writer = new StringWriter();
PrintWriter printWriter = new PrintWriter(writer);
ex.printStackTrace(printWriter);
Throwable cause = ex.getCause();
while (cause != null) {
cause.printStackTrace(printWriter);
cause = cause.getCause();
}
printWriter.close();
String result = writer.toString();
sb.append(result);
try {
long timestamp = System.currentTimeMillis();
String time = formatter.format(new Date());
String fileName = "crash-" + time + "-" + timestamp + ".txt";
if (Environment.getExternalStorageState().equals(
Environment.MEDIA_MOUNTED)) {
String path = Environment.getExternalStorageDirectory()
+ "/crash程序崩溃异常/";
File dir = new File(path);
if (!dir.exists()) {
dir.mkdirs();
}
FileOutputStream fos = new FileOutputStream(path + fileName);
fos.write(sb.toString().getBytes());
fos.close();
}
return fileName;
} catch (Exception e) {
Log.e(TAG, "an error occured while writing file...", e);
}
return null;
}

/**
* 整理异常信息
*
* @param e
* @return
*/
public static StringBuffer getTraceInfo(Throwable e) {
StringBuffer sb = new StringBuffer();
Throwable ex = e.getCause() == null ? e : e.getCause();
StackTraceElement[] stacks = ex.getStackTrace();
for (int i = 0; i < stacks.length; i++) {
if (i == 0) {
setError(ex.toString());
}
sb.append("class: ").append(stacks[i].getClassName())
.append("; method: ").append(stacks[i].getMethodName())
.append("; line: ").append(stacks[i].getLineNumber())
.append("; Exception: ").append(ex.toString() + "\n");
}
Log.d(TAG, sb.toString());
return sb;
}

/**
* 设置错误的提示语
*
* @param e
*/
public static void setError(String e) {
Pattern pattern;
Matcher matcher;
for (Map.Entry<String, String> m : regexMap.entrySet()) {
Log.d(TAG, e + "key:" + m.getKey() + "; value:" + m.getValue());
pattern = Pattern.compile(m.getKey());
matcher = pattern.matcher(e);
if (matcher.matches()) {
error = m.getValue();
break;
}
}
}

/**
* 初始化错误的提示语
*/
private static void initMap() {
regexMap.put(".*NullPointerException.*", "嘿，无中生有~Boom!");
regexMap.put(".*ClassNotFoundException.*", "你确定你能找得到它？");
regexMap.put(".*ArithmeticException.*", "我猜你的数学是体育老师教的，对吧？");
regexMap.put(".*ArrayIndexOutOfBoundsException.*", "恩，无下限=无节操，请不要跟我搭话");
regexMap.put(".*IllegalArgumentException.*", "你的出生就是一场错误。");
regexMap.put(".*IllegalAccessException.*", "很遗憾，你的信用卡账号被冻结了，无权支付");
regexMap.put(".*SecturityException.*", "死神马上降临");
regexMap.put(".*NumberFormatException.*", "想要改变一下自己形象？去泰国吧，包你满意");
regexMap.put(".*OutOfMemoryError.*", "或许你该减减肥了");
regexMap.put(".*StackOverflowError.*", "啊，啊，憋不住了！");
regexMap.put(".*RuntimeException.*", "你的人生走错了方向，重来吧");
}
}

```

## 全局 dialog（在 receiver 中弹出）

```java
<receiver android:name="com.soft.tm.receiver.WifiReceiver">
<intent-filter >
<action android:name="android.NET.wifi.RSSI_CHANGED"/>
<action android:name="android.net.wifi.STATE_CHANGE"/>
<action android:name="android.Net.wifi.WIFI_STATE_CHANGED"/>
</intent-filter>
</receiver>


package com.soft.tm.receiver;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.util.Log;

import com.fastdevelopframework.app.ActivityController;
import com.fastdevelopframework.app.GeniusApplication;

public class WifiReceiver extends BroadcastReceiver {

@Override
public void onReceive(Context context, Intent intent) {
Activity activity = ActivityController.getCurrentActivity();
if (GeniusApplication.dialog == null) {
Log.d("tag", "创建 ---- ");
AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
dialog.setTitle("Warning")
.setMessage("断开WIFI后此窗口自动消失")
.setCancelable(false);
GeniusApplication.dialog = dialog.create();
}
if (intent.getAction().equals(WifiManager.RSSI_CHANGED_ACTION)) {
} else if (intent.getAction().equals(WifiManager.NETWORK_STATE_CHANGED_ACTION)) {//wifi连接上与否
NetworkInfo info = intent.getParcelableExtra(WifiManager.EXTRA_NETWORK_INFO);
if (info.getState().equals(NetworkInfo.State.DISCONNECTED)) {
Log.d("tag", "wifi断开 ");
GeniusApplication.isCheck = false;

if (GeniusApplication.dialog != null) {
Log.d("tag", "dismiss ");
if (GeniusApplication.dialog.isShowing()) {
Log.d("tag", "dialog is show ");
}
GeniusApplication.dialog.dismiss();
GeniusApplication.dialog = null;
} else {
Log.d("tag", "dialog is null ");
}

} else if (info.getState().equals(NetworkInfo.State.CONNECTED)) {

WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
WifiInfo wifiInfo = wifiManager.getConnectionInfo();

// Log.d("tag", "连接到网络 " + wifiInfo.getSSID());

if (!wifiInfo.getSSID().equals("<unknown ssid>") && GeniusApplication.isCheck == false) {
Log.d("tag", "跳转 ");

if (GeniusApplication.dialog != null) {
Log.d("tag", "show");
if (activity != null) {
if (!activity.isFinishing()) {
GeniusApplication.dialog.show();
}
}
}
GeniusApplication.isCheck = true;
}
}

} else if (intent.getAction().equals(WifiManager.WIFI_STATE_CHANGED_ACTION)) {//wifi打开与否
int wifistate = intent.getIntExtra(WifiManager.EXTRA_WIFI_STATE, WifiManager.WIFI_STATE_DISABLED);

if (wifistate == WifiManager.WIFI_STATE_DISABLED) {
System.out.println("系统关闭wifi");
} else if (wifistate == WifiManager.WIFI_STATE_ENABLED) {
System.out.println("系统开启wifi");
}
}
}
}


package com.fastdevelopframework.app;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

/**
* Created by Administrator on 2017/9/1.
*/

public class ActivityController {
public static List<Activity> mActivityList = new ArrayList<>();
private static Activity mCurrentActivity;

public static void addActivity(Activity activity) {
mActivityList.add(activity);
}
public static void removeActivity(Activity activity) {
mActivityList.remove(activity);
}

public static void setCurrentActivity(Activity activity) {
mCurrentActivity = activity;
}

public static Activity getCurrentActivity() {
return mCurrentActivity;
}
public static void finishAll() {
for (Activity activity : mActivityList) {
if (!activity.isFinishing()) {
activity.finish();
}
}
}
}


在BaseActivity中oncreate加入：

ActivityController.setCurrentActivity(this);
所有的actfviity都继承Baseactvity


package com.fastdevelopframework.app;

import android.app.Application;
import android.app.Dialog;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public class GeniusApplication extends Application {
public static GeniusApplication mInstance;
public static boolean isCheck = false;
public static Dialog dialog; //全局dialog

@Override
public void onCreate() {
super.onCreate();
mInstance = this;
}

public static synchronized GeniusApplication getInstance() {
return mInstance;
}
public static boolean isWifiConnected(Context context) {
ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
NetworkInfo wifiNetworkInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
if (wifiNetworkInfo.isConnected()) {
return true;
}

return false;
}
}



```

## Android 中 SimpleAdapter，ArrayAdapter 和 BaseAdapter 详解

<https://www.open-open.com/lib/view/open1376969095803.html>

## 查看 apk 是否签名

```
keytool -list -printcert -jarfile C:\project\release.apk
```

## 序列化和反序列化

```



反序列化对象.对象要实现Serializeable接口 且原对象类的结构不可以变化,包名,类名都必须一样,
File file=new File("C:/sms.dat");
ObjectInputStream in = new ObjectInputStream(new FileInputStream(file.getAbsolutePath()));
Object object = in.readObject();
List<SmsName> sms=(List<SmsName>) object;
for (int i = 0; i < sms.size(); i++) {
System.out.println(sms);
}



对象的序列化是把Java对象转化为字节序列并存储至一个存储媒介（硬盘或者内存）的过程，反序列化则是把字节序列恢复为Java对象的过程，但它们仅处理Java变量而不处理方法。



两种序列化的区别：
* Serializable只需要对某个类以及它的属性实现Serializable接口即可，它的缺点是使用了反射，序列化的过程比较慢，这种机制会在序列化的时候创建许多的临时对象，容易引发频繁的gc。
* 而Parcelable是Android平台特有的，在使用内存的时候性能更好，但Parcelable不能使用在要将数据存储在磁盘的情况下，因为Parcelable不能很好的保证数据的持续性在外界有变化的情况。

```

**关于 serialVersionUID**

```
提示：尽量显示地定义serialVersionUID

Java的序列化机制是通过判断类的serialVersionUID来验证版本一致性的。
在进行反序列化时，JVM会把传来的字节流中的serialVersionUID与本地相应实体类的serialVersionUID进行比较，
如果相同就认为是一致的，可以进行反序列化，否则就会出现序列化版本不一致的异常，即是InvalidCastException。

serialVersionUID有两种显示的生成方式：
一是默认的1L，比如：private static final long serialVersionUID = 1L;
二是根据类名、接口名、成员方法及属性等来生成一个64位的哈希字段，比如：
private static final  long   serialVersionUID = xxxxL;

当实现java.io.Serializable接口的类没有显式地定义一个serialVersionUID变量时候，
Java序列化机制会根据编译的Class自动生成一个serialVersionUID作序列化版本比较用，这种情况下，
如果Class文件(类名，方法明等)没有发生变化(增加空格，换行，增加注释等等)，就算再编译多次，serialVersionUID也不会变化的。
```
