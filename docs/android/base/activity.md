## activity

[[toc]]

```java
 1. 添加拨打电话的权限：
<uses-permission android:name="android.permission.CALL_PHONE" />
2. 第一种方法
/**
* 拨打电话（直接拨打电话）
* @param phoneNum 电话号码
*/public void callPhone(String phoneNum){
    Intent intent = new Intent(Intent.ACTION_CALL);
    Uri data = Uri.parse("tel:" + phoneNum);
    intent.setData(data);
    startActivity(intent);
}
3. 第二种方法
/**
* 拨打电话（跳转到拨号界面，用户手动点击拨打）
*
* @param phoneNum 电话号码
*/public void callPhone(String phoneNum) {
    Intent intent = new Intent(Intent.ACTION_DIAL);
    Uri data = Uri.parse("tel:" + phoneNum);
    intent.setData(data);
    startActivity(intent);
}
```

## app 自启动

```java
<uses-permission android:name="android.intent.action.BOOT_COMPLETED">
</uses-permission><uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"></uses-permission>

<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.HOME" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.MONKEY" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

<receiver android:name=".broadcast.BootBroadcastReceiver">
<intent-filter>
<action android:name="android.intent.action.PACKAGE_REPLACED" />
<action android:name="android.intent.action.PACKAGE_ADDED" />
<action android:name="android.intent.action.PACKAGE_REMOVED" />

<data android:scheme="package" />
</intent-filter>
</receiver>
```

```java
package com.tmai.common.chongqingfaceapp.broadcast;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.tmai.common.chongqingfaceapp.MainActivity;

/**
 * Created by Administrator on 2018/2/26.
 */

public class BootBroadcastReceiver extends BroadcastReceiver {
    static final String ACTION = "android.intent.action.BOOT_COMPLETED";

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        if (intent.getAction().equals("android.intent.action.PACKAGE_REPLACED")) {
            Toast.makeText(context, "升级了一个安装包，重新启动此程序", Toast.LENGTH_SHORT).show();
            Intent intent2 = new Intent(context, MainActivity.class);
            intent2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent2);
        }
        //接收安装广播
        if (intent.getAction().equals("android.intent.action.PACKAGE_ADDED")) {
            String packageName = intent.getDataString();
            System.out.println("安装了:" + packageName + "包名的程序");
        }
        //接收卸载广播
        if (intent.getAction().equals("android.intent.action.PACKAGE_REMOVED")) {
            String packageName = intent.getDataString();
            System.out.println("卸载了:" + packageName + "包名的程序");

        }
    }
}

```

## Intent

```java
import java.io.Serializable;
public class User implements Serializable {　
    private int ID;
    private String UserName;
    private String PWD;
    public final void setID(int value) {
        ID = value;
    }
    public final int getID() {
        return ID;
    }
    public final void setUserName(String value) {
        UserName = value;
    }
    public final String getUserName() {
        return UserName;
    }
    public final void setPWD(String value) {
        PWD = value;
    }
    public final String getPWD() {
        return PWD;
    }
}
```

登录窗体登录后传递内容

```java
Intent intent = new Intent();
intent.setClass(Login.this, MainActivity.class);
Bundle bundle = new Bundle();
bundle.putSerializable("user", user);
intent.putExtras(bundle);this.startActivity(intent);
```

接收端

```java
Intent intent = this.getIntent();
user=(User)intent.getSerializableExtra("user");
```

以上就可以实现对象的传递。
补充：

```java
如果传递的是List<Object>,可以把list强转成Serializable类型,而且object类型也必须实现了Serializable接口

Intent.putExtras(key, (Serializable)list)
接收
(List<YourObject>)getIntent().getSerializable(key)
```

## intent 卸载软件

```java
//隐示意图根据卸载软件
public void removeInfo(PackageInfo info) {
    Intent intent = new Intent();
    intent.setAction("android.intent.action.DELETE");
    intent.addCategory(Intent.CATEGORY_DEFAULT);
    intent.setData(Uri.parse("package:" + info.packageName));
    startActivity(intent);
}
```

## 各种 intent 启动功能

```java
根据联系人ID显示联系人信息

Intent intent = new Intent();
intent.setAction(Intent.ACTION_VIEW);   //显示联系人信息
intent.setData(Uri.parse("content://contacts/people/492"));
startActivity(intent);


2 根据联系人ID显示拨号面板

Intent intent = new Intent();
intent.setAction(Intent.ACTION_DIAL);  //显示拨号面板
intent.setData(Uri.parse("content://contacts/people/492"));
startActivity(intent);


3 显示拨号面板， 并在拨号面板上将号码显示出来

Intent intent = new Intent();
intent.setAction(Intent.ACTION_VIEW);
intent.setData(Uri.parse("tel://15216448315"));
startActivity(intent);

4 显示拨号面板， 并在拨号面板上将号码显示出来
Intent intent = new Intent();
intent.setAction(Intent.ACTION_DIAL);   //显示拨号面板, 并在拨号面板上将号码显示出来
intent.setData(Uri.parse("tel://15216448315"));
startActivity(intent);

5 根据联系人的ID编辑联系人
Intent intent = new Intent();
intent.setAction(Intent.ACTION_EDIT);   //编辑联系人
intent.setData(Uri.parse("content://contacts/people/492"));
startActivity(intent);

6 显示通讯录联系人和其他账号联系人的列表

Intent intent = new Intent();
intent.setAction(Intent.ACTION_VIEW);
intent.setData(Uri.parse("content://contacts/people/"));
startActivity(intent);

7 启动HomeScreen

Intent intent = new Intent();
intent.setAction(Intent.ACTION_MAIN);     //启动HomeScreen
intent.addCategory(Intent.CATEGORY_HOME);
startActivity(intent);


8 选择某个联系人的号码，返回一个代表这个号码的uri，如:content://contacts/phones/982

Intent intent = new Intent();
intent.setAction(Intent.ACTION_GET_CONTENT);
intent.setType("vnd.android.cursor.item/phone");
startActivityForResult(intent, 1);

9  打开多个应用选取各种类型的数据,以uri返回。返回的uri可使用ContentResolver.openInputStream(Uri)打开
该功能可用在邮件中附件的选取

举例如下:
选取一张图片, 返回的uri为 content://media/external/images/media/47
选取一首歌, 返回的uri为 content://media/external/audio/media/51

Intent intent = new Intent();
intent.setAction(Intent.ACTION_GET_CONTENT);
intent.setType("*/*");
intent.addCategory(Intent.CATEGORY_OPENABLE);
startActivityForResult(intent, 2);

10 自定义一个chooser，不使用系统的chooser,该chooser可以有自己的标题(Title)
并且不必让用户指定偏好

Intent intent = new Intent();
intent.setAction(Intent.ACTION_CHOOSER);
intent.putExtra(Intent.EXTRA_TITLE, "my chooser");
intent.putExtra(Intent.EXTRA_INTENT,

new Intent(Intent.ACTION_GET_CONTENT)
.setType("*/*")
.addCategory(Intent.CATEGORY_OPENABLE));
startActivityForResult(intent, 2);

11 选取activity，返回的activity可在返回的intent.getComponent()中得到

Intent intent = new Intent();
intent.setAction(Intent.ACTION_PICK_ACTIVITY);
intent.putExtra( Intent.EXTRA_INTENT,

12 启动搜索，在以下示例代码中，"ANDROID"为要搜索的字符串
当执行这段代码后, 会在系统的Chooser中显示可以用于搜索的程序列表

Intent intent = new Intent();
intent.setAction(Intent.ACTION_SEARCH);     //启动搜索
intent.putExtra(SearchManager.QUERY, "ANDROID");
startActivity(intent);

13 启动WEB搜索，在以下示例代码中，"ANDROID"为要搜索的字符串

当执行这段代码后, 会在系统的Chooser中显示可以用于搜索的程序列表，一般情况下系统中安装的浏览器都会显示出来

Intent intent = new Intent();
intent.setAction(Intent.ACTION_WEB_SEARCH);     //启动搜索
intent.putExtra(SearchManager.QUERY, "ANDROID");
startActivity(intent);


二  Android系统用于BroadcastReceiver的标准Intent

1 ACTION_TIME_TICK，系统时钟广播，系统每分钟都会发送一个这样的广播，
   如果在应用开发中，有些逻辑依赖于系统时钟，可以注册一个广播接收者
   这是一个受保护的action，只有系统才能发送这个广播
   并且，在manifest文件中注册的广播接收者不能接收到该广播，若要接收该广播，必须在代码中注册广播接收者

registerReceiver(new BroadcastReceiver(){
@Override
public void onReceive(Context context, Intent intent) {
       Log.i("xxxx", "TIME_TICK");
   }
},

new IntentFilter(Intent.ACTION_TIME_TICK));

2 在官方文档中，列出了以下标准的广播action
	*
ACTION_TIME_TICK               系统时钟广播
	*
ACTION_TIME_CHANGED            时间被重新设置
	*
ACTION_TIMEZONE_CHANGED        时区改变
	*
ACTION_BOOT_COMPLETED          系统启动完成
	*
ACTION_PACKAGE_ADDED           系统中安装了新的应用
	*
ACTION_PACKAGE_CHANGED         系统中已存在的app包被更改
	*
ACTION_PACKAGE_REMOVED         系统中已存在的app被移除
	*
ACTION_PACKAGE_RESTARTED       用户重启了一个app，这个app的所有进程被杀死
	*
ACTION_PACKAGE_DATA_CLEARED    用户清除了一个app的数据
	*
ACTION_UID_REMOVED             系统中的一个user ID被移除
	*
ACTION_BATTERY_CHANGED         电池状态改变，这是一个sticky广播
	*
ACTION_POWER_CONNECTED         设备连接了外部电源
	*
ACTION_POWER_DISCONNECTED      外部电源被移除
	*
ACTION_SHUTDOWN                设备正在关机

```

## activity 启动模式

在配置文件中 activity 节点 设置 android:lauchMode="xxx"

- standared（默认）创建 activity 的实例，就会在任务栈中创建这个实例，退出时，任务栈也会销毁这个 activity 实例

- singletop：栈顶模式：当需要的 activity 的实力存在在任务栈的栈顶，如果处于栈顶就无需创建，否则会重新创建  
  例如：
  若我有两个 Activity 名为 B1,B2,两个 Activity 内容功能完全相同，都有两个按钮可以跳到 B1 或者 B2，唯一不同的是 B1 为 standard，B2 为 singleTop。  
  若我意图打开的顺序为 B1->B2->B2，则实际打开的顺序为 B1->B2（后一次意图打开 B2，实际只调用了前一个的 onNewIntent 方法）  
  若我意图打开的顺序为 B1->B2->B1->B2，则实际打开的顺序与意图的一致，为 B1->B2->B1->B2。

- singletask：单一任务栈：当需要的 activity 的实例存在在任务栈中，会把该 activity 实例以上的 activity 全部移除掉，  
  调用 newInstance 方法重用这个 activity，使该实例处于栈顶，否则就重新创建（整个任务站只允许存在一个 activity）

- singleInstance：当需要的 activity 实例存在在任务栈中，只要激活的是该类型的 activity 都会调用 newInstance 方法来重用这个 activity  
  此模式一般用于加载较慢比较耗性能的 activity 这样不用重新创建
  singleinstance 详解：{分配单独一个任务站}  
  getTaskId()； 获取当前 activity 栈 id

使用 singleinstance 时，会新建一个 taskid ，按 back 键时，放在一个单独的返回栈里

举例：firstActivity （默认），secondActivity（singleinstance），thirdActivity（默认）

在 thirdActivity 中按返回 -- 直接跳到 firstActivity ---然后再跳到 secondActivity --- 再按 退出( 因为 1first 和 third 处于同一栈)

## Context

```

如何获取Context

通常我们想要获取Context对象，主要有以下四种方法
1：View.getContext,返回当前View对象的Context对象，通常是当前正在展示的Activity对象。
2：Activity.getApplicationContext,获取当前Activity所在的(应用)进程的Context对象，通常我们使用Context对象时，要优先考虑这个全局的进程Context。
3：ContextWrapper.getBaseContext():用来获取一个ContextWrapper进行装饰之前的Context，可以使用这个方法，这个方法在实际开发中使用并不多，也不建议使用。
4：Activity.this 返回当前的Activity实例，如果是UI控件需要使用Activity作为Context对象，但是默认的Toast实际上使用ApplicationContext也可以。

正确使用Context

一般Context造成的内存泄漏，几乎都是当Context销毁的时候，却因为被引用导致销毁失败，而Application的Context对象可以理解为随着进程存在的，所以我们总结出使用Context的正确姿势：
1：当Application的Context能搞定的情况下，并且生命周期长的对象，优先使用Application的Context。
2：不要让生命周期长于Activity的对象持有到Activity的引用。
3：尽量不要在Activity中使用非静态内部类，因为非静态内部类会隐式持有外部类实例的引用，如果使用静态内部类，将外部实例引用作为弱引用持有。

```

## 查看当前是哪个界面

```
onresume中：
Log.i("tag", "2--" + getClass().getSimpleName());

```

## 透明

```java
<style name="TransparentActivity" parent="Theme.AppCompat.Light.DarkActionBar">
<item name="android:windowBackground">@android:color/transparent</item>
<item name="android:colorBackgroundCacheHint">@null</item>
<item name="android:windowIsTranslucent">true</item>
<item name="android:windowNoTitle">true</item>
<item name="android:windowContentOverlay">@null</item>
</style>
```

## 关闭指定的 activity

```java
1： 在每个acitivy添加此代码。

private void registReC() {
IntentFilter filter = new IntentFilter();
filter.addAction("finish2");
registerReceiver(new Main2Rec(), filter);
}

private class Main2Rec extends BroadcastReceiver {

@Override
public void onReceive(Context context, Intent intent) {
finish();
}
}
2：在需要的关闭其他activity时：

sendBroadcast(new Intent("finish2"));  即可

```

## 两个 actvitiy 间传递 bitmap

系统限制了传递大小，传递图片过大会报错，解决办法：  
把 bitmap 存储为 byte 数组，然后再通过 Intent 传递。

发送：

```java
      ReceiptPreviewTrans receiptPreviewTrans = new ReceiptPreviewTrans();
        Bitmap bitmap = receiptPreviewTrans.preview(transData);
        Intent intent = new Intent(context, PrintPreviewActivity.class);
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte [] bitmapByte =baos.toByteArray();
        intent.putExtra("bitmap", bitmapByte);
        context.startActivity(intent);

```

接收：

```java

private byte [] bis;

bis=intent.getByteArrayExtra("bitmap");
bitmap= BitmapFactory.decodeByteArray(bis, 0, bis.length);
```

## 内存溢出/内存泄漏

产生原因

```
1.  数据库的 cursor 没有关闭
2.  构造 adapter 时，没有使用缓存contentview
3.  Bitmap 对象不使用时采用recycle() 释放内存
4.  Activity 中的对象的生命周期大于Activity
```

<https://github.com/square/leakcanary>

```java
使用方法
在build.gradle添加依赖：
dependencies {
debugCompile 'com.squareup.leakcanary:leakcanary-android:1.5.2'
releaseCompile 'com.squareup.leakcanary:leakcanary-android-no-op:1.5.2'
}
在Application类添加如下初始化代码：

public class ExampleApplication extends Application {

@Override
public void onCreate() {
super.onCreate();
if (LeakCanary.isInAnalyzerProcess(this)) {
  // This process is dedicated to LeakCanary for heap analysis.
  // You should not init your app in this process.
  return;
}
LeakCanary.install(this);
// Normal app init code...
}
}
然后运行APP并测试，如果测试过程中出现内存溢出，会在通知栏显示Notification提示。
```

---

对于内存溢出的问题，我一般会从五个方面进行入手：
一是在内存引用上做些处理，比如说使用软引用，强化引用，弱引用
二是可以在内存中加载图片的时候直接在内存中做处理，比如：边界的压缩
三是动态的回收内存
四是优化 Dalvik 虚拟机的堆内存的分配

五是自定义堆内存大小

大图片处理引起的内存不足解决办法

可以说出现 OutOfMemory 问题的绝大多数人，都是因为 Bitmap 的问题。因为 Bitmap 占用的内存实在是太多了，它是一个“超级大胖子”，特别是分辨率大的图片，如果要显示多张那问题就更显著了。
如何解决 Bitmap 带给我们的内存问题?
一:及时的销毁。
　　虽然，系统能够确认 Bitmap 分配的内存最终会被销毁，但是由于它占用的内存过多，所以很可能会超过 java 堆的限制。因此，在用完 Bitmap 时，要及时的 recycle 掉。recycle 并不能确定立即就会将 Bitmap 释放掉，但是会给虚拟机一个暗示：“该图片可以释放了”。
二: 设置一定的采样率。
　　有时候，我们要显示的区域很小，没有必要将整个图片都加载出来，而只需要记载一个缩小过的图片，这时候可以设置一定的采样率，那么就可以大大减小占用的内存。如下面的代码：
三 :巧妙的运用软引用（SoftRefrence）

有些时候，我们使用 Bitmap 后没有保留对它的引用，因此就无法调用 Recycle 函数。这时候巧妙的运用软引用，可以使 Bitmap 在内存快不足时得到有效的释放。如下例：
/\*_本例子为博主随手一写，来说明用法，并未验证_/

避免 oom 的产生（内存优化 5r 法则，腾讯工程师胡凯总结）：
1：bitmap，选择合适的分辨率，不用帧动画，用代码实现；重采样和复用,回收；

2：池化策略，避免重复创建对象，减小 gc 压力，慎用 static，软引用等; context 的传递；
(尽量多使用内部类 提高程序效率;合理的使用缓存)

3：主动销毁、结束；生命周期闭环,输入输出流都要关闭流；取消广播等，数据库关闭；

4：使用合适的数据结构，譬如 hashmap 和 arraymap，（元素个数大于 1 千、增删频繁用前者），避免使用枚举，enum 占 24byte，int 占 4bytes；

5：谨慎使用多进程/large heap/第三方框架

## anr

出现 ANR 会在/data/anr 下创建 traces.text 文件，分析此文件中的 log
$adb pull data/anr/traces.txt .

点击或输入操作超过 10s，广播超过 5s；

优化方法：
1：主线程不做耗时操作，并且不要调用 sleep 和 wait；
2： 新建子 thread，
使用 asysnctask;
使用 intentservice；
使用 handlerthread；

## 内存优化

- （1）bitmap 设置图片大小（优化内存溢出）
  BitmapFactory.Option option = new BitmapFactory.Option();
  option.inSampleSize = 2; //将视图宽、高都变为原来的 1/2
- （2）bitmap 对象销毁，可以借助 recycle（）方法让 GC 回收 bitmap 对象。
- （3）尽量避免 static 成员变量引用资源消耗过多的实例，如：context
- （4）使用 Application 的 context
- （5）及时关闭资源，如在查询数据库时需要及时关闭 cursor
- （6）对经常使用的图片使用软引用保存
- （7）线程也是造成内存泄露的一个重要原因，在于线程的生命周期不可控制，解决方法： 1.将线程内部类改为静态内部类 2.用弱引用来保存 context 引用
  （8）使用.9 图片
  尽量多使用内部类 提高程序效率
  合理的使用缓存
  合理设置变量的作用范围 application 对象

## 生命周期

HOME 键的执行顺序：onPause->onStop->onRestart->onStart->onResume  
BACK 键的顺序： onPause->onStop->onDestroy->onCreate->onStart->onResume  
锁屏顺序：onPause -> onStop -> onStart onResume
