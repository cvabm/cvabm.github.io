## activity
[[toc]]
```
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
## app自启动  
```
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

```
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
可以传递两种数据：

--1.一般的基本数据类型 Intent .putextra() intent.getStringextra();
--2. 数据的uri, intent.setData() intent.getData();


Android中Intent传递类对象提供了两种方式一种是 通过实现Serializable接口传递对象，一种是通过实现Parcelable接口传递对象。
要求被传递的对象必须实现上述2种接口中的一种才能通过Intent直接传递。
Intent中传递这2种对象的方法：

Bundle.putSerializable(Key,Object); //实现Serializable接口的对象

Bundle.putParcelable(Key, Object); //实现Parcelable接口的对象
以下以最常用的Serializable方式为例 ：
假设由登录界面（Login）跳转到主界面（MainActivity）传递的对象为登录的用户信息 User类
首先创建一个序列化类：User
```
import java.io.Serializable;public class User implements Serializable {
　 private int ID; private String UserName;
private String PWD;
public final void setID(int value)
{
ID = value;
} public final int getID()
{ return ID;
}
public final void setUserName(String value)
{
UserName = value;
} public final String getUserName()
{ return UserName;
}
public final void setPWD(String value)
{
PWD = value;
} public final String getPWD()
{ return PWD;
}
}
```
登录窗体登录后传递内容  
```
Intent intent = new Intent();
intent.setClass(Login.this, MainActivity.class);
Bundle bundle = new Bundle();
bundle.putSerializable("user", user);
intent.putExtras(bundle);this.startActivity(intent);
```
接收端  
```
Intent intent = this.getIntent();
user=(User)intent.getSerializableExtra("user");
```
以上就可以实现对象的传递。
补充：
```
如果传递的是List<Object>,可以把list强转成Serializable类型,而且object类型也必须实现了Serializable接口

Intent.putExtras(key, (Serializable)list)
接收
(List<YourObject>)getIntent().getSerializable(key)
```

## intent卸载软件  
```
//隐示意图根据卸载软件
public void removeInfo(PackageInfo info){
Intent intent = new Intent();
intent.setAction("android.intent.action.DELETE");
intent.addCategory(Intent.CATEGORY_DEFAULT);
intent.setData(Uri.parse("package:"+info.packageName));
startActivity(intent);

}
```

## 各种intent启动功能

```
1 根据联系人ID显示联系人信息

Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_VIEW);   //显示联系人信息
	3. 
intent.setData(Uri.parse("content://contacts/people/492"));
	4. 
startActivity(intent);



2 根据联系人ID显示拨号面板

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_DIAL);  //显示拨号面板
	3. 
intent.setData(Uri.parse("content://contacts/people/492"));
	4. 
startActivity(intent);



3 显示拨号面板， 并在拨号面板上将号码显示出来

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_VIEW);
	3. 
intent.setData(Uri.parse("tel://15216448315"));
	4. 
startActivity(intent);



4 显示拨号面板， 并在拨号面板上将号码显示出来

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_DIAL);   //显示拨号面板, 并在拨号面板上将号码显示出来
	3. 
intent.setData(Uri.parse("tel://15216448315"));
	4. 
startActivity(intent);



5 根据联系人的ID编辑联系人

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_EDIT);   //编辑联系人
	3. 
intent.setData(Uri.parse("content://contacts/people/492"));
	4. 
startActivity(intent);



6 显示通讯录联系人和其他账号联系人的列表

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_VIEW);
	3. 
intent.setData(Uri.parse("content://contacts/people/"));
	4. 
startActivity(intent);



7 启动HomeScreen

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_MAIN);     //启动HomeScreen
	3. 
intent.addCategory(Intent.CATEGORY_HOME);
	4. 
startActivity(intent);



8 选择某个联系人的号码，返回一个代表这个号码的uri，如:content://contacts/phones/982

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_GET_CONTENT);
	3. 
intent.setType("vnd.android.cursor.item/phone");
	4. 
startActivityForResult(intent, 1);



9  打开多个应用选取各种类型的数据,以uri返回。返回的uri可使用ContentResolver.openInputStream(Uri)打开

    该功能可用在邮件中附件的选取

    举例如下:

    选取一张图片, 返回的uri为 content://media/external/images/media/47

    选取一首歌, 返回的uri为 content://media/external/audio/media/51

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_GET_CONTENT);
	3. 
intent.setType("*/*");
	4. 
intent.addCategory(Intent.CATEGORY_OPENABLE);
	5. 
startActivityForResult(intent, 2);



10 自定义一个chooser，不使用系统的chooser

     该chooser可以有自己的标题(Title)

     并且不必让用户指定偏好

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_CHOOSER);
	3. 
intent.putExtra(Intent.EXTRA_TITLE, "my chooser");
	4. 
intent.putExtra(Intent.EXTRA_INTENT,



       
	1. 
new Intent(Intent.ACTION_GET_CONTENT)
	2. 
       .setType("*/*")
	3. 
       .addCategory(Intent.CATEGORY_OPENABLE)
	4. 
       );



	1. 
startActivityForResult(intent, 2);



11 选取activity，返回的activity可在返回的intent.getComponent()中得到

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_PICK_ACTIVITY);
	3. 
intent.putExtra( Intent.EXTRA_INTENT,



       
	1. 
new Intent(Intent.ACTION_GET_CONTENT)
	2. 
       .setType("*/*")
	3. 
       .addCategory(Intent.CATEGORY_OPENABLE)
	4. 
       );
	5. 
startActivityForResult(intent, 3);



12 启动搜索，在以下示例代码中，"ANDROID"为要搜索的字符串

     当执行这段代码后, 会在系统的Chooser中显示可以用于搜索的程序列表

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_SEARCH);     //启动搜索
	3. 
intent.putExtra(SearchManager.QUERY, "ANDROID");
	4. 
startActivity(intent);



13 启动WEB搜索，在以下示例代码中，"ANDROID"为要搜索的字符串

     当执行这段代码后, 会在系统的Chooser中显示可以用于搜索的程序列表，一般情况下系统中安装的浏览器都会显示出来

	1. 
Intent intent = new Intent();
	2. 
intent.setAction(Intent.ACTION_WEB_SEARCH);     //启动搜索
	3. 
intent.putExtra(SearchManager.QUERY, "ANDROID");
	4. 
startActivity(intent);




二  Android系统用于BroadcastReceiver的标准Intent

1 ACTION_TIME_TICK，系统时钟广播，系统每分钟都会发送一个这样的广播，
   如果在应用开发中，有些逻辑依赖于系统时钟，可以注册一个广播接收者
   这是一个受保护的action，只有系统才能发送这个广播
   并且，在manifest文件中注册的广播接收者不能接收到该广播，若要接收该广播，必须在代码中注册广播接收者

	1. 
registerReceiver(new BroadcastReceiver(){




   
	1. 
@Override



   
	1. 
public void onReceive(Context context, Intent intent) {
	2. 
       Log.i("xxxx", "TIME_TICK");
	3. 
   }



	1. 
},
	2. 
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



三  Android中的标准类别（category）

类别（category）一般配合action使用，以下为系统中的标准类别，由于数量过多，只能在使用到时再详细研究
	* 
CATEGORY_DEFAULT
	* 
CATEGORY_BROWSABLE
	* 
CATEGORY_TAB
	* 
CATEGORY_ALTERNATIVE
	* 
CATEGORY_SELECTED_ALTERNATIVE
	* 
CATEGORY_LAUNCHER
	* 
CATEGORY_INFO
	* 
CATEGORY_HOME
	* 
CATEGORY_PREFERENCE
	* 
CATEGORY_TEST
	* 
CATEGORY_CAR_DOCK
	* 
CATEGORY_DESK_DOCK
	* 
CATEGORY_LE_DESK_DOCK
	* 
CATEGORY_HE_DESK_DOCK
	* 
CATEGORY_CAR_MODE
	* 
CATEGORY_APP_MARKET



四  Android中的标准Extra键值

这些常量用于在调用Intent.putExtra(String, Bundle)时作为键值传递数据，同样由于数量较多，在此只列出索引
	* 
EXTRA_ALARM_COUNT
	* 
EXTRA_BCC
	* 
EXTRA_CC
	* 
EXTRA_CHANGED_COMPONENT_NAME
	* 
EXTRA_DATA_REMOVED
	* 
EXTRA_DOCK_STATE
	* 
EXTRA_DOCK_STATE_HE_DESK
	* 
EXTRA_DOCK_STATE_LE_DESK
	* 
EXTRA_DOCK_STATE_CAR
	* 
EXTRA_DOCK_STATE_DESK
	* 
EXTRA_DOCK_STATE_UNDOCKED
	* 
EXTRA_DONT_KILL_APP
	* 
EXTRA_EMAIL
	* 
EXTRA_INITIAL_INTENTS
	* 
EXTRA_INTENT
	* 
EXTRA_KEY_EVENT
	* 
EXTRA_ORIGINATING_URI
	* 
EXTRA_PHONE_NUMBER
	* 
EXTRA_REFERRER
	* 
EXTRA_REMOTE_INTENT_TOKEN
	* 
EXTRA_REPLACING
	* 
EXTRA_SHORTCUT_ICON
	* 
EXTRA_SHORTCUT_ICON_RESOURCE
	* 
EXTRA_SHORTCUT_INTENT
	* 
EXTRA_STREAM
	* 
EXTRA_SHORTCUT_NAME
	* 
EXTRA_SUBJECT
	* 
EXTRA_TEMPLATE
	* 
EXTRA_TEXT
	* 
EXTRA_TITLE
	* 
EXTRA_UID



五  Intent中的标志（FLAG）

Intent类中定义了一些以FLAG_开头的标志位，这些标志位中有的非常重要，会影响app中Activity和BroadcastReceiver等的行为。
以下为这些标志位的索引，是从官方文档上的截图。之后会对重要的标志加以详细分析



```


## activity启动模式

在配置文件中 activity节点 设置     android:lauchMode="xxx"  

standared（默认）创建activity的实例，就会在任务栈中创建这个实例，退出时，任务栈也会销毁这个activity实例  

singletop：栈顶模式：当需要的activity的实力存在在任务栈的栈顶，如果处于栈顶就无需创建，否则会重新创建  
例如：
若我有两个Activity名为B1,B2,两个Activity内容功能完全相同，都有两个按钮可以跳到B1或者B2，唯一不同的是B1为standard，B2为singleTop。  
若我意图打开的顺序为B1->B2->B2，则实际打开的顺序为B1->B2（后一次意图打开B2，实际只调用了前一个的onNewIntent方法）  
若我意图打开的顺序为B1->B2->B1->B2，则实际打开的顺序与意图的一致，为B1->B2->B1->B2。  

singletask：单一任务栈：当需要的activity的实例存在在任务栈中，会把该activity实例以上的activity全部移除掉，  
调用newInstance方法重用这个activity，使该实例处于栈顶，否则就重新创建（整个任务站只允许存在一个activity）  

singleInstance：当需要的activity实例存在在任务栈中，只要激活的是该类型的activity 都会调用newInstance方法来重用这个activity  
此模式一般用于加载较慢比较耗性能的activity 这样不用重新创建

singleinstance详解：{分配单独一个任务站}  
getTaskId()； 获取当前activity栈id

使用singleinstance时，会新建一个taskid ，按back键时，放在一个单独的返回栈里

举例：firstActivity （默认），secondActivity（singleinstance），thirdActivity（默认）

   在thirdActivity中按返回 -- 直接跳到firstActivity ---然后再跳到secondActivity --- 再按 退出( 因为1first和third处于同一栈)

## 判断当前activity
```
在Android开发过程中，我们有时候需要获取当前的Activity实例，比如弹出Dialog操作，必须要用到这个。关于如何实现由很多种思路，这其中有的简单，有的复杂，这里简单总结一下个人的一些经验吧。
反射
反射是我们经常会想到的方法，思路大概为
	* 
获取ActivityThread中所有的ActivityRecord
	* 
从ActivityRecord中获取状态不是pause的Activity并返回


一个使用反射来实现的代码大致如下


public static Activity getActivity() {
Class activityThreadClass = null;
try {
activityThreadClass = Class.forName("android.app.ActivityThread");
Object activityThread = activityThreadClass.getMethod("currentActivityThread").invoke(null);
Field activitiesField = activityThreadClass.getDeclaredField("mActivities");
activitiesField.setAccessible(true);
Map activities = (Map) activitiesField.get(activityThread);
for (Object activityRecord : activities.values()) {
Class activityRecordClass = activityRecord.getClass();
Field pausedField = activityRecordClass.getDeclaredField("paused");
pausedField.setAccessible(true);
if (!pausedField.getBoolean(activityRecord)) {
Field activityField = activityRecordClass.getDeclaredField("activity");
activityField.setAccessible(true);
Activity activity = (Activity) activityField.get(activityRecord);
return activity;
}
}
} catch (ClassNotFoundException e) {
e.printStackTrace();
} catch (NoSuchMethodException e) {
e.printStackTrace();
} catch (IllegalAccessException e) {
e.printStackTrace();
} catch (InvocationTargetException e) {
e.printStackTrace();
} catch (NoSuchFieldException e) {
e.printStackTrace();
}
return null;
}
然而这种方法并不是很推荐，主要是有以下的不足：
	* 
反射通常会比较慢
	* 
不稳定性，这个才是不推荐的原因，Android框架代码存在修改的可能性，谁要无法100%保证mActivities，paused固定不变。所以可靠性不是完全可靠。


Activity基类
既然反射不是很可靠，那么有一种比较可靠的方式，就是使用Activity基类。
在Activity的onResume方法中，将当前的Activity实例保存到一个变量中。


public class BaseActivity extends Activity{

@Override
protected void onResume() {
super.onResume();
MyActivityManager.getInstance().setCurrentActivity(this);
}
}

然而，这一种方法也不仅完美，因为这种方法是基于约定的，所以必须每个Activity都继承BaseActivity，如果一旦出现没有继承BaseActivity的就可能有问题。
回调方法
介绍了上面两种不是尽善尽美的方法，这里实际上还是有一种更便捷的方法，那就是通过Framework提供的回调来实现。
Android自 API 14开始引入了一个方法，即Application的registerActivityLifecycleCallbacks方法，用来监听所有Activity的生命周期回调，比如onActivityCreated,onActivityResumed等。
So，一个简单的实现如下



public class MyApplication extends Application {


@Override
public void onCreate() {
super.onCreate();
registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
@Override
public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

}

@Override
public void onActivityStarted(Activity activity) {

}

@Override
public void onActivityResumed(Activity activity) {
MyActivityManager.getInstance().setCurrentActivity(activity);
}

@Override
public void onActivityPaused(Activity activity) {

}

@Override
public void onActivityStopped(Activity activity) {

}

@Override
public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

}

@Override
public void onActivityDestroyed(Activity activity) {

}
});
}
}

然而，金无足赤人无完人，这种方法唯一的遗憾就是只支持API 14即其以上。不过还在现在大多数设备都满足了这个要求。
为什么是弱引用
可能有人会带着疑问看到这里，MyActivityManager是个什么鬼，好，我们现在看一下这个类的实现


public class MyActivityManager {
private static MyActivityManager sInstance = new MyActivityManager();
private WeakReference<Activity> sCurrentActivityWeakRef;


private MyActivityManager() {

}

public static MyActivityManager getInstance() {
return sInstance;
}

public Activity getCurrentActivity() {
Activity currentActivity = null;
if (sCurrentActivityWeakRef != null) {
currentActivity = sCurrentActivityWeakRef.get();
}
return currentActivity;
}

public void setCurrentActivity(Activity activity) {
sCurrentActivityWeakRef = new WeakReference<Activity>(activity);
}


}

这个类，实现了当前Activity的设置和获取。
那么为什么要使用弱引用持有Activity实例呢？
其实最主要的目的就是避免内存泄露，因为使用默认的强引用会导致Activity实例无法释放，导致内存泄露的出现。
```

## Context

```

如何获取Context

通常我们想要获取Context对象，主要有以下四种方法
1：View.getContext,返回当前View对象的Context对象，通常是当前正在展示的Activity对象。
2：Activity.getApplicationContext,获取当前Activity所在的(应用)进程的Context对象，通常我们使用Context对象时，要优先考虑这个全局的进程Context。
3：ContextWrapper.getBaseContext():用来获取一个ContextWrapper进行装饰之前的Context，可以使用这个方法，这个方法在实际开发中使用并不多，也不建议使用。
4：Activity.this 返回当前的Activity实例，如果是UI控件需要使用Activity作为Context对象，但是默认的Toast实际上使用ApplicationContext也可以。

Context引起的内存泄露:

但Context并不能随便乱用，用的不好有可能会引起内存泄露的问题，下面就示例两种错误的引用方式。

1:错误的单例模式

public class Singleton {
  private static Singleton instance;
  private Context mContext;

  private Singleton(Context context) {
        this.mContext = context;
    }

  public static Singleton getInstance(Context context) {
      if (instance == null) {
          instance = new Singleton(context);
        }
      return instance;
    }
}

这是一个非线程安全的单例模式，instance作为静态对象，其生命周期要长于普通的对象，其中也包含Activity，假如Activity A去getInstance获得instance对象，传入this，常驻内存的Singleton保存了你传入的Activity A对象，并一直持有，即使Activity被销毁掉，但因为它的引用还存在于一个Singleton中，就不可能被GC掉，这样就导致了内存泄漏。


三、使用DCL(Double-Check Locking)双检查锁机制---（推荐）




[java] view plain copy

	1. 
public class Singleton {  
	2. 
    private static volatile Singleton instance = null;  
	3. 
    private Singleton(){}  
	4. 
      
	5. 
    public static Singleton getInstance(){  
	6. 
        if(instance == null){  
	7. 
            synchronized(Singleton.class){  
	8. 
                if(instance == null){  
	9. 
                    instance = new Singleton();  
	10. 
                }  
	11. 
            }  
	12. 
        }  
	13. 
        return instance;  
	14. 
    }  
	15. 
}  



这里为什么要用volatile修饰instance？
原因：在于instance = new Singleton()的时候，在内存中实际上是分3步执行的：
1）分配对象的内存空间：memory = allocate();
2）初始化对象：ctorInstance(memory);
3）指向分配的地址：instance =memory
多线程在执行的时候，2 3可能发生重排序。即有可能线程A执行到第3步的时候，读取到instance不为null，就返回。实际上此时还未执行第二部即未初始化。
加上volatile就可以避免2 3步重排序来保证线程安全。


2:View持有Activity引用

public class MainActivity extends Activity {
    private static Drawable mDrawable;

    @Override
    protected void onCreate(Bundle saveInstanceState) {
        super.onCreate(saveInstanceState);
        setContentView(R.layout.activity_main);
        ImageView iv = new ImageView(this);
        mDrawable = getResources().getDrawable(R.drawable.ic_launcher);
        iv.setImageDrawable(mDrawable);
    }
}


有一个静态的Drawable对象当ImageView设置这个Drawable时，ImageView保存了mDrawable的引用，而ImageView传入的this是MainActivity的mContext，因为被static修饰的mDrawable是常驻内存的，MainActivity是它的间接引用，MainActivity被销毁时，也不能被GC掉，所以造成内存泄漏。

正确使用Context

一般Context造成的内存泄漏，几乎都是当Context销毁的时候，却因为被引用导致销毁失败，而Application的Context对象可以理解为随着进程存在的，所以我们总结出使用Context的正确姿势：
1：当Application的Context能搞定的情况下，并且生命周期长的对象，优先使用Application的Context。
2：不要让生命周期长于Activity的对象持有到Activity的引用。
3：尽量不要在Activity中使用非静态内部类，因为非静态内部类会隐式持有外部类实例的引用，如果使用静态内部类，将外部实例引用作为弱引用持有。

```


## 查看当前是哪个界面
```
onresume中：
Log.i("ljg", "2--" + getClass().getSimpleName());

```
## 自己实现Android的HOME键和BACK键
<http://www.voidcn.com/article/p-astjvhdt-ben.html>  
## 透明
```
<style name="TransparentActivity" parent="Theme.AppCompat.Light.DarkActionBar">
<item name="android:windowBackground">@android:color/transparent</item>
<item name="android:colorBackgroundCacheHint">@null</item>
<item name="android:windowIsTranslucent">true</item>
<item name="android:windowNoTitle">true</item>
<item name="android:windowContentOverlay">@null</item>
</style>
```
## 关闭指定的activity
```
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
## LayoutInflater原理
<https://blog.csdn.net/guolin_blog/article/details/12921889>  
## 两个actvitiy间传递bitmap
系统限制了传递大小，传递图片过大会报错，解决办法：  
把bitmap存储为byte数组，然后再通过Intent传递。  

发送：
```
      ReceiptPreviewTrans receiptPreviewTrans = new ReceiptPreviewTrans();
        Bitmap bitmap = receiptPreviewTrans.preview(transData);
        Intent intent = new Intent(context, PrintPreviewActivity.class);
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte [] bitmapByte =baos.toByteArray();
        intent.putExtra("bitmap", bitmapByte);
        context.startActivity(intent);

```
接受：
```

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

```
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
四是优化Dalvik虚拟机的堆内存的分配

五是自定义堆内存大小

 
大图片处理引起的内存不足解决办法

可以说出现OutOfMemory问题的绝大多数人，都是因为Bitmap的问题。因为Bitmap占用的内存实在是太多了，它是一个“超级大胖子”，特别是分辨率大的图片，如果要显示多张那问题就更显著了。
如何解决Bitmap带给我们的内存问题?
一:及时的销毁。
　　虽然，系统能够确认Bitmap分配的内存最终会被销毁，但是由于它占用的内存过多，所以很可能会超过java堆的限制。因此，在用完Bitmap时，要及时的recycle掉。recycle并不能确定立即就会将Bitmap释放掉，但是会给虚拟机一个暗示：“该图片可以释放了”。
二: 设置一定的采样率。
　　有时候，我们要显示的区域很小，没有必要将整个图片都加载出来，而只需要记载一个缩小过的图片，这时候可以设置一定的采样率，那么就可以大大减小占用的内存。如下面的代码：
三 :巧妙的运用软引用（SoftRefrence）

　　有些时候，我们使用Bitmap后没有保留对它的引用，因此就无法调用Recycle函数。这时候巧妙的运用软引用，可以使Bitmap在内存快不足时得到有效的释放。如下例：
/**本例子为博主随手一写，来说明用法，并未验证*/ 
 
避免oom的产生（内存优化5r法则，腾讯工程师胡凯总结）：
1：bitmap，选择合适的分辨率，不用帧动画，用代码实现；重采样和复用,回收；

2：池化策略，避免重复创建对象，减小gc压力，慎用static，软引用等; context的传递；
   (尽量多使用内部类 提高程序效率;合理的使用缓存)

3：主动销毁、结束；生命周期闭环,输入输出流都要关闭流；取消广播等，数据库关闭；

4：使用合适的数据结构，譬如hashmap和arraymap，（元素个数大于1千、增删频繁用前者），避免使用枚举，enum占24byte，int占4bytes；

5：谨慎使用多进程/large heap/第三方框架

## anr
出现ANR会在/data/anr 下创建traces.text文件，分析此文件中的log
$adb pull data/anr/traces.txt .


点击或输入操作超过10s，广播超过5s；


优化方法：
1：主线程不做耗时操作，并且不要调用sleep和wait；
2： 新建子thread，
       使用asysnctask;
      使用intentservice； 
      使用handlerthread；

## 内存优化
（1）bitmap设置图片大小（优化内存溢出）
BitmapFactory.Option option = new BitmapFactory.Option();
option.inSampleSize = 2; //将视图宽、高都变为原来的1/2
（2）bitmap对象销毁，可以借助recycle（）方法让GC回收bitmap对象。
（3）尽量避免static成员变量引用资源消耗过多的实例，如：context
（4）使用Application的context
（5）及时关闭资源，如在查询数据库时需要及时关闭cursor
（6）对经常使用的图片使用软引用保存
（7）线程也是造成内存泄露的一个重要原因，在于线程的生命周期不可控制，解决方法：
1.将线程内部类改为静态内部类
2.用弱引用来保存context引用
（8）使用.9图片
尽量多使用内部类 提高程序效率
合理的使用缓存
合理设置变量的作用范围 application 对象


