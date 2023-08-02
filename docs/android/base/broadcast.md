[[toc]]

## 设置系统时间

```java
try {
    Intent time = new Intent("ismart.intent.action_set_curtime_millis"); //设置系统时间
    time.putExtra("millis", Long.valueOf(ltime));
    sendBroadcast(time);
} catch (Exception e) {
    e.printStackTrace();
}
```

## 监听时间 ACTION_TIME_TICK

```java
1：只能动态注册
2：每一分钟执行一次

IntentFilter filter = new IntentFilter();
filter.addAction(Intent.ACTION_TIME_TICK);
registerReceiver(new MYBroadcast(), filter);
private class MYBroadcast extends BroadcastReceiver {

    @ Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(Intent.ACTION_TIME_TICK)) {
            Log.i("tag", "onReceive: ");
        }
    }
}

```

## 监听 home 键和长按 home 键

```java
public class HomeKeyEventBroadcastReceiver extends BroadcastReceiver {
    static final String SYSTEM_REASON = "reason";
    static final String SYSTEM_HOME_KEY = "homekey";
    static final String SYSTEM_RECENT_APPS = "recentapps";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (action != null && action.equals(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)) {
            String reason = intent.getStringExtra(SYSTEM_REASON);
            if (reason != null) {
                if (reason.equals(SYSTEM_HOME_KEY)) {
                    Log.d("TAG", "收到Home键点击");
                } else if (reason.equals(SYSTEM_RECENT_APPS)) {
                    Log.d("TAG", "收到长按Home键或任务键点击");
                }
            }
        }
    }
}

public class MainActivity extends AppCompatActivity {
    private HomeKeyEventBroadcastReceiver receiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 创建广播接收器实例
        receiver = new HomeKeyEventBroadcastReceiver();

        // 注册广播接收器，监听系统关闭系统对话框的广播事件
        registerReceiver(receiver, new IntentFilter(Intent.ACTION_CLOSE_SYSTEM_DIALOGS));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // 在 Activity 销毁时，注销广播接收器
        unregisterReceiver(receiver);
    }
}

```

### 监听 home 键点击

```java
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    // TODO Auto-generated method stub
    if (KeyEvent.KEYCODE_HOME == keyCode) {
        android.os.Process.killProcess(android.os.Process.myPid());
    }
    return super.onKeyDown(keyCode, event);
}

@Override
public void onAttachedToWindow() {
    // TODO Auto-generated method stub
    this.getWindow().setType(WindowManager.LayoutParams.TYPE_KEYGUARD);
    super.onAttachedToWindow();
}

<uses-permission android:name="android.permission.DISABLE_KEYGUARD"></uses-permission>

```

### 监听双击

```java
1.点击监听之双击.
    //处理双击居中
iv_drag_view.setOnClickListener(new OnClickListener() {

    @
    Override
    public void onClick(View v) {
        //当第一个时间大于0,表示已经点击了一次了
        if (fristTime > 0) {
            long secondTime = System.currentTimeMillis();
            if (secondTime - fristTime < 500) {
                iv_drag_view.layout((screenWidth - iv_drag_view.getWidth()) / 2, iv_drag_view.getTop(), (screenWidth + iv_drag_view.getWidth()) / 2, iv_drag_view.getBottom());
                Editor editor = sp.edit();
                editor.putInt("lastx", iv_drag_view.getLeft());
                editor.putInt("lasty", iv_drag_view.getTop());
                editor.commit();
            }
            fristTime = 0; //只要二次点击完了,就让第一次的时间为0
        }
        fristTime = System.currentTimeMillis();
        //如果点完第一次后超时了,就自动清除第一次点击时间
        new Thread() {
            public void run() {
                SystemClock.sleep(500);
                fristTime = 0;
            };
        }.start();
    }
});

```

## 简单本地广播 dmeo

```java
public class MainActivity extends AppCompatActivity {
    LocalBroadcastManager manager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Receiver receiver = new Receiver();
        manager =LocalBroadcastManager.getInstance(this);
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("demo.fastvi.com.mytest.LOCAL_BROADCAST");
        manager.registerReceiver(receiver, intentFilter);
    }

    public void click(View view) {
        Intent intent = new Intent("demo.fastvi.com.mytest.LOCAL_BROADCAST");
        manager.sendBroadcast(intent);
    }
}

  public class Receiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "收到reciver", Toast.LENGTH_SHORT).show();
    }
}

配置文件：
<receiver android:name=".Receiver">
    <intent-filter>
        <action android:name="demo.fastvi.com.mytest.Receiver"/>
    </intent-filter>
</receiver>
```

## Android 常用系统广播

```java
//关闭或打开飞行模式时的广播
Intent.ACTION_AIRPLANE_M;

//充电状态，或者电池的电量发生变化;//电池的充电状态、电荷级别改变，不能通过组建声;
Intent.ACTION_BATTERY_CH;

//表示电池电量低
Intent.ACTION_BATTERY_LO;

//表示电池电量充足
Intent.ACTION_BATTERY_OK;

//关闭或打开飞行模式时的广播
Intent.ACTION_AIRPLANE_MODE_CHANGED;

//充电状态，或者电池的电量发生变化//电池的充电状态、电荷级别改变，不能通过组建声明接收这个广播，只有通过Context.registerReceiver()注册
Intent.ACTION_BATTERY_CHANGED;

//表示电池电量低
Intent.ACTION_BATTERY_LOW;

//表示电池电量充足，即从电池电量低变化到饱满时会发出广播
Intent.ACTION_BATTERY_OKAY;

//在系统启动完成后，这个动作被广播一次（只有一次）。
Intent.ACTION_BOOT_COMPLETED;

//按下照相时的拍照按键(硬件按键)时发出的广播
Intent.ACTION_CAMERA_BUTTON;

//当屏幕超时进行锁屏时,当用户按下电源按钮,长按或短按(不管有没跳出话框)，进行锁屏时,android系统都会广播此Action消息
Intent.ACTION_CLOSE_SYSTEM_DIALOGS;

//设备当前设置被改变时发出的广播(包括的改变:界面语言，设备方向，等，请参考Configuration.java)
Intent.ACTION_CONFIGURATION_CHANGED;

//设备日期发生改变时会发出此广播
Intent.ACTION_DATE_CHANGED;

//设备内存不足时发出的广播,此广播只能由系统使用，其它APP不可用
Intent.ACTION_DEVICE_STORAGE_LOW;

//设备内存从不足到充足时发出的广播,此广播只能由系统使用，其它APP不可用
Intent.ACTION_DEVICE_STORAGE_OK;

//发出此广播的地方frameworks\base\services\java\com\android\server\DockObserver.java
Intent.ACTION_DOCK_EVENT;

//移动APP完成之后，发出的广播(移动是指:APP2SD)
Intent.ACTION_EXTERNAL_APPLICATIONS_AVAILABLE;

//正在移动APP时，发出的广播(移动是指:APP2SD)
Intent.ACTION_EXTERNAL_APPLICATIONS_UNAVAILABLE;

//Gtalk已建立连接时发出的广播
Intent.ACTION_GTALK_SERVICE_CONNECTED;

//Gtalk已断开连接时发出的广播
Intent.ACTION_GTALK_SERVICE_DISCONNECTED;

//在耳机口上插入耳机时发出的广播
Intent.ACTION_HEADSET_PLUG;

//改变输入法时发出的广播
Intent.ACTION_INPUT_METHOD_CHANGED;

//设备当前区域设置已更改时发出的广播
Intent.ACTION_LOCALE_CHANGED;

//表示用户和包管理所承认的低内存状态通知应该开始。
Intent.ACTION_MANAGE_PACKAGE_STORAGE;

//未正确移除SD卡(正确移除SD卡的方法:设置--SD卡和设备内存--卸载SD卡)，但已把SD卡取出来时发出的广播 ,扩展介质（扩展卡）已经从 SD 卡插槽拔出，但是挂载点 (mount point) 还没解除 (unmount)
Intent.ACTION_MEDIA_BAD_REMOVAL;

//按下"Media Button" 按键时发出的广播,假如有"Media Button" 按键的话(硬件按键)
Intent.ACTION_MEDIA_BUTTON;

//插入外部储存装置，比如SD卡时，系统会检验SD卡，此时发出的广播?
Intent.ACTION_MEDIA_CHECKING;

//已拔掉外部大容量储存设备发出的广播（比如SD卡，或移动硬盘）,不管有没有正确卸载都会发出此广播, 用户想要移除扩展介质（拔掉扩展卡）。
Intent.ACTION_MEDIA_EJECT;

//插入SD卡并且已正确安装（识别）时发出的广播, 扩展介质被插入，而且已经被挂载。
Intent.ACTION_MEDIA_MOUNTED;

//拓展介质存在，但使用不兼容FS（或为空）的路径安装点检查介质包含在Intent.mData领域。
Intent.ACTION_MEDIA_NOFS;

//外部储存设备已被移除，不管有没正确卸载,都会发出此广播， 扩展介质被移除。
Intent.ACTION_MEDIA_REMOVED;

//广播：已经扫描完介质的一个目录
Intent.ACTION_MEDIA_SCANNER_FINISHED;

//请求媒体扫描仪扫描文件并将其添加到媒体数据库。
Intent.ACTION_MEDIA_SCANNER_SCAN_FILE;

//广播：开始扫描介质的一个目录
Intent.ACTION_MEDIA_SCANNER_STARTED;

// 广播：扩展介质的挂载被解除 (unmount)，因为它已经作为 USB 大容量存储被共享。
Intent.ACTION_MEDIA_SHARED;

Intent.ACTION_MEDIA_UNMOUNTABLE;//

// 广播：扩展介质存在，但是还没有被挂载 (mount)
Intent.ACTION_MEDIA_UNMOUNTED

Intent.ACTION_NEW_OUTGOING_CALL;

//成功的安装APK之后//广播：设备上新安装了一个应用程序包。//一个新应用包已经安装在设备上，数据包括包名（最新安装的包程序不能接收到这个广播）
Intent.ACTION_PACKAGE_ADDED;

//一个已存在的应用程序包已经改变，包括包名
Intent.ACTION_PACKAGE_CHANGED;

//清除一个应用程序的数据时发出的广播(在设置－－应用管理－－选中某个应用，之后点清除数据时?)//用户已经清除一个包的数据，包括包名（清除包程序不能接收到这个广播）
Intent.ACTION_PACKAGE_DATA_CLEARED;

//触发一个下载并且完成安装时发出的广播，比如在电子市场里下载应用？
Intent.ACTION_PACKAGE_INSTALL;

//成功的删除某个APK之后发出的广播, 一个已存在的应用程序包已经从设备上移除，包括包名（正在被安装的包程序不能接收到这个广播）
Intent.ACTION_PACKAGE_REMOVED;

//替换一个现有的安装包时发出的广播（不管现在安装的APP比之前的新还是旧，都会发出此广播？）
Intent.ACTION_PACKAGE_REPLACED;
当设备是在API12以上的版本可以直接使用MY_PACKAGE_REPLACED

        <receiver android:name=".app.AppUpdateReceiver">
            <intent-filter>
                <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
            </intent-filter>
        </receiver>

//用户重新开始一个包，包的所有进程将被杀死，所有与其联系的运行时间状态应该被移除，包括包名（重新开始包程序不能接收到这个广播）
Intent.ACTION_PACKAGE_RESTARTED;

//插上外部电源时发出的广播
Intent.ACTION_POWER_CONNECTED;

//已断开外部电源连接时发出的广播
Intent.ACTION_POWER_DISCONNECTED;

Intent.ACTION_PROVIDER_CHANGED;//

//重启设备时的广播
Intent.ACTION_REBOOT;

//屏幕被关闭之后的广播
Intent.ACTION_SCREEN_OFF;

//屏幕被打开之后的广播
Intent.ACTION_SCREEN_ON;

//关闭系统时发出的广播
Intent.ACTION_SHUTDOWN;

//时区发生改变时发出的广播
Intent.ACTION_TIMEZONE_CHANGED;

//时间被设置时发出的广播
Intent.ACTION_TIME_CHANGED;

//广播：当前时间已经变化（正常的时间流逝）， 当前时间改变，每分钟都发送，不能通过组件声明来接收
，只有通过Context.registerReceiver()方法来注册
Intent.ACTION_TIME_TICK;

//一个用户ID已经从系统中移除发出的广播
Intent.ACTION_UID_REMOVED;

//设备已进入USB大容量储存状态时发出的广播？
Intent.ACTION_UMS_CONNECTED;

//设备已从USB大容量储存状态转为正常状态时发出的广播？
Intent.ACTION_UMS_DISCONNECTED;

Intent.ACTION_USER_PRESENT;//

//设备墙纸已改变时发出的广播
Intent.ACTION_WALLPAPER_CHANGED;


开机广播注意点：
Intent.ACTION_BOOT_COMPLETED表示boot启动完毕后，系统会发送一个广播过来，理论上确实可以接收到，大部分手机估计也都是可以的，但是就是有那么些手机rom被改得不可思议，非要加上个android.media.AudioManager.ACTION_AUDIO_BECOMING_NOISY才可以在开机的时候让系统执行Intent.ACTION_BOOT_COMPLETED广播的发送，根据LOG可以看出，以OPPO1107为例，系统是先发送了ACTION_AUDIO_BECOMING_NOISY后发送了ACTION_BOOT_COMPLETED
也就是说广播的注册需要这样多加一句：

<receiver android:name="where.com.whereareyou.BootBroadcastReceiver">
<intent-filter>
<action android:name="android.intent.action.BOOT_COMPLETED" /> //启动完成的广播
<action android:name="android.media.AUDIO_BECOMING_NOISY" />
</intent-filter>
</receiver>

 开机权限：<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

1.网络状态改变
<action android:name="android.net.conn.CONNECTIVITY_CHANGE"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
//添加网络状态Action
intentFilter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
2.拦截电话号码,广播
0.权限 <uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS"/>
1.
<intent-filter>
<action android:name="android.intent.action.NEW_OUTGOING_CALL" />
</intent-filter>
2.获取电话号码
// 获取拨出电话号码
Bundle b = intent.getExtras();
String num = b.getString(Intent.EXTRA_PHONE_NUMBER);
Log.i("NUM", "____" + num);

3.监听电话状态
<receiver android:name="com.phone.day22_systembroadcastcallphone.SystemCallPhoneReceiver" >
<intent-filter>
<action android:name="android.intent.action.PHONE_STATE" />
</intent-filter>
</receiver>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
1.获取信息
// 获取电话状态管理者
TelephonyManager manager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
// 获取电话状态
int state = manager.getCallState();
Bundle b = intent.getExtras();
//获取手机号码
String num = b.getString(TelephonyManager.EXTRA_INCOMING_NUMBER);
switch (state) {
case TelephonyManager.CALL_STATE_RINGING:
// 响铃

Log.d("TAG", "___ 响铃" + num);
break;
case TelephonyManager.CALL_STATE_IDLE:
// 挂断
Log.d("TAG", "___ 挂断");
break;
case TelephonyManager.CALL_STATE_OFFHOOK:
// 接听
Log.d("TAG", "___ 接听");
break;

default:
break;
}

```
