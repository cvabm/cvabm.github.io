# 功能点

[[toc]]

## Android7.0 版本更新

```java
1：显示更新对话框
MyAutoUpdate dialog = new MyAutoUpdate(ConvenientEnergyMainActivity.this);
dialog.showUpdateDialog(downloadUrl, content, updateStatus);

2： 具体对话框类
package com.corerate.cep;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.corerate.cep.util.DialogPromptTools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class MyAutoUpdate {
    public Activity activity = null;
    public int versionCode = 0;
    public String versionName = "";
    private static final String TAG = "AutoUpdate";
    private String currentFilePath = "";
    private String currentTempFilePath = "";
    private String fileEx = "";
    private String fileNa = "";

    public MyAutoUpdate(Activity activity) {
        this.activity = activity;
        getCurrentVersion();
    }

    public void showUpdateDialog(final String downloadUrl, String content, String updateStatus) {
        if (updateStatus.equals("01")) {
            DialogPromptTools.showVersionDialog(this.activity, "发现新版本，是否需要更新？", content, "更新", "取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Log.i("tag", "down" + downloadUrl);
                    downloadTheFile(downloadUrl);
                    dialog.cancel();
                }
            }, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            });
        } else if (updateStatus.equals("02")) {
            DialogPromptTools.showVersionMustDialog(this.activity, "发现新版本，是否需要更新？", content, "更新", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    downloadTheFile(downloadUrl);
                    dialog.cancel();
                }
            });
        }

    }

    public String getCurrentVersion() {
        try {
            PackageInfo info = activity.getPackageManager().getPackageInfo(
                    activity.getPackageName(), 0);
            this.versionCode = info.versionCode;
            this.versionName = info.versionName;
        } catch (NameNotFoundException e) {
            e.printStackTrace();
        }
        return versionName;
    }

    private void downloadTheFile(final String strPath) {
        fileEx = strPath.substring(strPath.lastIndexOf(".") + 1, strPath.length())
                .toLowerCase();
        fileNa = strPath.substring(strPath.lastIndexOf("/") + 1,
                strPath.lastIndexOf("."));
        try {
            if (strPath.equals(currentFilePath)) {
                doDownloadTheFile(strPath);
            }
            currentFilePath = strPath;
            Runnable r = new Runnable() {
                public void run() {
                    try {
                        doDownloadTheFile(strPath);
                    } catch (Exception e) {
                        Log.e(TAG, e.getMessage(), e);
                    }
                }
            };
            new Thread(r).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void doDownloadTheFile(String strPath) throws Exception {
            URL myURL = new URL(strPath);
            URLConnection conn = myURL.openConnection();
            conn.connect();
            InputStream is = conn.getInputStream();
            if (is == null) {
                throw new RuntimeException("stream is null");
            }
            File myTempFile = File.createTempFile(fileNa, "." + fileEx);
            currentTempFilePath = myTempFile.getAbsolutePath();
            FileOutputStream fos = new FileOutputStream(myTempFile);
            byte buf[] = new byte[128];
            do {
                int numread = is.read(buf);
                if (numread <= 0) {
                    break;
                }
                fos.write(buf, 0, numread);
            } while (true);
            Process p = Runtime.getRuntime().exec("chmod 666 " + myTempFile);
            int status = p.waitFor();
            if (status == 0) {
                //chmod succeed
                Intent intent =new Intent(Intent.ACTION_VIEW);
                if(Build.VERSION.SDK_INT>= Build.VERSION_CODES.N) {
                    Uri contentUri = FileProvider.getUriForFile(activity,"com.corerate.cep.fileprovider",myTempFile);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    intent.setDataAndType(contentUri,"application/vnd.android.package-archive");
                }else{
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.setDataAndType(Uri.fromFile(myTempFile),"application/vnd.android.package-archive");
                }
                activity.startActivity(intent);
            } else {
                DialogPromptTools.showTextToast(this.activity, R.string.version_update_failed);
                //chmod failed
            }
            try {
                is.close();
            } catch (Exception ex) {
                Log.e(TAG, "getDataSource() error: " + ex.getMessage(), ex);
            }
        }

}
3：权限
配置文件加入：
<provider
    android:name="android.support.v4.content.FileProvider"
    android:authorities="com.corerate.cep.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
<meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths"/>
</provider>

res中新建：xml/file_paths文件
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <paths>
        <external-path path="" name="camera_photos" />
        <external-path path="Android/data/com.corerate.cep/" name="files_root"/>
        <external-path path="." name="external_storage_root"/>
        <files-path name="name1" path="." />
        <cache-path name="name2" path="." />
        <external-path name="name3" path="." />
        <external-files-path name="name4" path="." />
        <external-cache-path name="name5" path="." />
    </paths>
</resources>
```

## openvpn for android

https://github.com/schwabe/ics-openvpn
编译步骤介绍  
https://github.com/schwabe/ics-openvpn/blob/master/doc/README.txt

```java
- Install sdk, ndk, cmake (e.g. with Android studio), swig (3.0+), on
  Windows perl might be needed for mbedtls

git clone ....
 git submodule init
  git submodule update

```

Build the project using "gradle build" (Or use Android Studio).

最后需要改一下 Mainactivity，然后启动

## vpnservice 实现 vpn 初步连接

<http://www.demodashi.com/demo/15852.html>

## openvpn for ios

<https://medium.com/better-programming/how-to-build-an-openvpn-client-on-ios-c8f927c11e80>

## 引导页

<http://www.jcodecraeer.com/a/opensource/2015/0827/3373.html>

```java


package com.corerate.cep;

import com.corerate.cep.activity.ConvenientEnergyMainActivity;
import com.corerate.cep.container.HomeEnergyApplication;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

public class LaunchPageActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      if (!HomeEnergyApplication.data.sPreferences.getBoolean("guide", false))
        mHandler.sendEmptyMessageDelayed(0x02, 0);
      else
        mHandler.sendEmptyMessageDelayed(0x01, 0);
  }

  @SuppressLint("HandlerLeak")
  private Handler mHandler = new Handler() {
      public void handleMessage(Message msg) {
        switch (msg.what) {
        case 0x01:
            Intent mIntent = new Intent();
            mIntent.setClass(LaunchPageActivity.this,
                  ConvenientEnergyMainActivity.class);
            LaunchPageActivity.this.startActivity(mIntent);
            LaunchPageActivity.this.finish();
            break;
        case 0x02:
            mIntent = new Intent();
            mIntent.setClass(LaunchPageActivity.this,
                  GuidePageActivity.class);
            LaunchPageActivity.this.startActivity(mIntent);
            LaunchPageActivity.this.finish();
            break;
        }
        super.handleMessage(msg);
      }
  };
}

2:FrameLayout是最简单的布局了。所有放在布局里的控件，都按照层次堆叠在屏幕的左上角。后加进来的控件覆盖前面的控件。

cp_guide_page.xml

<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <android.support.v4.view.ViewPager
            android:id="@+id/guide_view_pager"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <RelativeLayout
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <LinearLayout
                android:id="@+id/view_points_ll"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_alignParentBottom="true"
                android:layout_marginBottom="40dp"
                android:gravity="center_horizontal"
                android:orientation="horizontal">
            </LinearLayout>
        </RelativeLayout>
    </LinearLayout>
</FrameLayout>

guidePageActivity.java
package com.corerate.cep;
import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.RelativeLayout;

import com.corerate.cep.R;
import com.corerate.cep.activity.ConvenientEnergyMainActivity;
import com.corerate.cep.adapter.GuidePageAdapter;
import com.corerate.cep.container.HomeEnergyApplication;

public class GuidePageActivity extends Activity {
    private ViewPager viewPager;
    private List<View> pageViews;
    private ImageView[] imgViews;
    private ViewGroup viewPoints; //包裹小圆点的LinearLayout

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.cp_guide_page);
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadPageControl();
        loadPageListening();
    }

    private void loadPageControl() {
        HomeEnergyApplication.data.sPreferences.edit().putBoolean("guide", true).commit();

        initGuidePage();

        viewPoints = (ViewGroup) findViewById(R.id.view_points_ll);
        viewPager = (ViewPager) findViewById(R.id.guide_view_pager);

        //添加小圆点的图片
        imgViews = new ImageView[pageViews.size()];
        for (int i = 0; i < pageViews.size(); i++) {
            ImageView imageView = new ImageView(this);
            LayoutParams lp = new LayoutParams(20, 20);
            lp.setMargins(10, 0, 10, 40);
            imageView.setLayoutParams(lp);
            imgViews[i] = imageView;

            if (i == 0) {
                imgViews[i].setBackgroundResource(R.drawable.guide_page_img_select);
            } else {
                imgViews[i].setBackgroundResource(R.drawable.guide_page_img);
            }

            viewPoints.addView(imgViews[i]);
        }

        GuidePageAdapter gpa = new GuidePageAdapter(pageViews);
        viewPager.setAdapter(gpa);
    }

    private void loadPageListening() {
        viewPager.setOnPageChangeListener(new OnPageChangeListener() {
            @Override
            public void onPageSelected(int pos) {
                for (int i = 0; i < imgViews.length; i++) {
                    imgViews[pos].setBackgroundResource(R.drawable.guide_page_img_select);
                    //不是当前选中的page，其小圆点设置为未选中的状态
                    if (pos != i) {
                        imgViews[i].setBackgroundResource(R.drawable.guide_page_img);
                    }
                }
            }

            @Override
            public void onPageScrolled(int arg0, float arg1, int arg2) {
            }

            @Override
            public void onPageScrollStateChanged(int arg0) {
            }
        });
    }


    private void initGuidePage() {
        pageViews = new ArrayList<View>();
        LinearLayout.LayoutParams llp = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

        LinearLayout ll1 = new LinearLayout(this);
        ll1.setLayoutParams(llp);
        ll1.setBackgroundResource(R.drawable.guide_page_1);
        pageViews.add(ll1);

        LinearLayout ll2 = new LinearLayout(this);
        ll2.setLayoutParams(llp);
        ll2.setBackgroundResource(R.drawable.guide_page_2);
        pageViews.add(ll2);

        RelativeLayout ll3 = new RelativeLayout(this);
        ll3.setLayoutParams(new RelativeLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        ll3.setBackgroundResource(R.drawable.guide_page_3);

        Button btn = new Button(ll3.getContext());
        RelativeLayout.LayoutParams rl = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        rl.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, RelativeLayout.TRUE);
        rl.addRule(RelativeLayout.CENTER_HORIZONTAL);
        rl.setMargins(0, 0, 0, 160);
        btn.setLayoutParams(rl);
        btn.setTextSize(22f);
        btn.setTextColor(getResources().getColor(android.R.color.white));
        btn.setText("我要充电");
        btn.setBackgroundResource(R.drawable.guide_page_btn);
        btn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(GuidePageActivity.this, ConvenientEnergyMainActivity.class));
                finish();
            }
        });

        ll3.addView(btn);
        pageViews.add(ll3);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
            startActivity(new Intent(GuidePageActivity.this, ConvenientEnergyMainActivity.class));
            finish();
        }
        return false;
    }
}
guide_page_btn ，
guide_page_img_select，
guide_page_img

```

## 横竖屏切换

```java
监听：
< activity
android:name="MyActivity"
android:configChanges="orientation|keyboardHidden">
public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
               //加入横屏要处理的代码

    }else if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                   //加入竖屏要处理的代码}}

切换横竖屏时生命周期变化：
1、不设置Activity的android:configChanges:
Onpause onstop ondestory oncreate onstart onresume
2、设置Activity的android:configChanges=”orientation|keyboardHidden”：
只会执行onConfigurationChanged

保存数据和恢复数据方法：onSaveInstanceState和onRestoreInstanceState方法
固定横竖屏：Android:screenOrientation=landscape/orientation
切换时不摧毁：Android:configChanges=orientation|keyboardHidden|screenSize

```
切换方法：
	
setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);  


| 参数 | 功能 |
| --- | --- |
| SCREEN\_ORIENTATION\_BEHIND | 继承Activity堆栈中当前Activity下面的那个Activity的方向 |
| SCREEN\_ORIENTATION\_FULL\_SENSOR | 由重力传感器决定0/90/180/270° |
| SCREEN\_ORIENTATION\_FULL\_USER |  |
| SCREEN\_ORIENTATION\_LANDSCAPE | 始终横屏 |
| SCREEN\_ORIENTATION\_PORTRAIT | 始终竖屏 |
| SCREEN\_ORIENTATION\_LOCKED | 锁定屏幕方向 |
| SCREEN\_ORIENTATION\_NOSENSOR | 关闭重力传感器对横/竖屏的影响 |
| SCREEN\_ORIENTATION\_REVERSE\_LANDSCAPE | 另一个方向的横屏 |
| SCREEN\_ORIENTATION\_REVERSE\_PORTRAIT | 另一个方向的竖屏（倒拿手机） |
| SCREEN\_ORIENTATION\_SENSOR | 重力传感器影响屏幕的方向0/90/270° |
| SCREEN\_ORIENTATION\_SENSOR\_LANDSCAPE | 始终横屏，由重力传感器决定是哪个方向的横屏 |
| SCREEN\_ORIENTATION\_SENSOR\_PORTRAIT | 始终竖屏，由重力传感器决定是哪个方向的竖屏 |
| SCREEN\_ORIENTATION\_UNSPECIFIED | 不指定方向，使用默认方向 |
| SCREEN\_ORIENTATION\_USER | 由用户和重力传感器共同决定，详见文本末端 |
| SCREEN\_ORIENTATION\_USER\_LANDSCAPE | 用户和重力传感器共同决定是哪个方向的横屏 |
| SCREEN\_ORIENTATION\_USER\_PORTRAIT | 用户和重力传感器共同决定是哪个方向的竖屏 |
| UIOPTION\_SPLIT\_ACTION\_BAR\_WHEN\_NARROW | 当屏幕较窄时导航栏有一部分会显示在底部 |


**后台时监听横竖屏**

```
一、写一个service然后重写onConfigurationChanged，即使程序退到后台，但是屏幕旋转的时候service的监听任然还是会回调

二、动态注册一个广播

这个广播只能在java代码中动态注册，不能在xml文件中注册,否则不会起作用

通过动态注册广播监听


IntentFilter intentFilter = new IntentFilter();

intentFilter.addAction("android.intent.action.CONFIGURATION_CHANGED");

registerReceiver(mOrientationReciver,intentFilter);

然后在广播里面判断屏幕的旋转角度


private class orientationReciverextends BroadcastReceiver
{
@Override
    public void onReceive(Context context, Intent intent) {
Log.i(TAG, "onReceive: "+MainActivity.this.getWindowManager().getDefaultDisplay().getRotation()*90);
    }
}

作者：自由的小鱼儿
链接：https://www.jianshu.com/p/e49964b6cc0f
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 后台保活
<http://www.52im.net/thread-3033-1-1.html>  
<https://blog.yorek.xyz/android/paid/zsxq/week16-keep-app-alive/#21-activity>  
<https://lightingsui.github.io/2021/01/28/Android%E8%BF%9B%E7%A8%8B%E4%BF%9D%E6%B4%BB/#%E9%80%9A%E8%BF%87%E5%B9%BF%E6%92%AD%E4%BF%9D%E6%B4%BB>  

<https://juejin.im/post/5dfaeccbf265da33910a441d>  
<http://lastwarmth.win/2019/09/06/keepalive/>  
<https://blog.csdn.net/u014418171/article/details/98874962/>

###  RN后台保活
```js
AppRegistry.registerHeadlessTask('BackgroundKeepAlive', () => async () => {
    new wsClient().heartBeat();
});
```
```java
package com.amplesky.client.service;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class MyTaskService extends HeadlessJsTaskService {

   @Override
   protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
      Bundle extras = intent.getExtras();
      if (extras != null) {
         return new HeadlessJsTaskConfig(
                 "BackgroundKeepAlive",
                 Arguments.fromBundle(extras),
                 5000, // 任务的超时时间
                 false // 可选参数：是否允许任务在前台运行，默认为false
         );
      }
      return null;
   }
}


package com.amplesky.client.service;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleObserver;
import androidx.lifecycle.OnLifecycleEvent;
import androidx.lifecycle.ProcessLifecycleOwner;

import com.amplesky.client.receiver.TickAlarmReceiver;
import com.blankj.utilcode.util.LogUtils;

import java.util.Timer;
import java.util.TimerTask;

import de.blinkt.openvpn.R;

public class KeepAliveService extends Service {
    private static final String TAG = "KeepAliveService";
    protected PendingIntent tickPendIntent;
    private WakeLock wakeLock;

    public KeepAliveService() {
    }

    private static final String CHANNEL_ID = "KeepAliveService";

    @Override
    public void onCreate() {
        super.onCreate();
        showNotification();
        initWakeLock();
        setTickAlarm();
        listenLifecycle();
    }

    private void initWakeLock() {
        PowerManager pm = (PowerManager) this.getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "KeepAliveService");
    }

    private void showNotification() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            NotificationChannel Channel = new NotificationChannel(CHANNEL_ID, "主服务", NotificationManager.IMPORTANCE_HIGH);
            Channel.enableLights(true);//设置提示灯
            Channel.setLightColor(Color.RED);//设置提示灯颜色
            Channel.setShowBadge(true);//显示logo
            Channel.setDescription("KeepAliveService");//设置描述
            Channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC); //设置锁屏可见 VISIBILITY_PUBLIC=可见
            manager.createNotificationChannel(Channel);

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("主服务")//标题
                    .setContentText("运行中...")//内容
                    .setWhen(System.currentTimeMillis())
                    .setSmallIcon(R.mipmap.ic_launcher)//小图标一定需要设置,否则会报错(如果不设置它启动服务前台化不会报错,但是你会发现这个通知不会启动),如果是普通通知,不设置必然报错
                    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher))
                    .build();
            startForeground(1, notification);//服务前台化只能使用startForeground()方法,不能使用 notificationManager.notify(1,notification); 这个只是启动通知使用的,使用这个方法你只需要等待几秒就会发现报错了
        } else {
            Notification notification = new Notification.Builder(this)
                    .setContentTitle("主服务")//设置标题
                    .setContentText("运行中...")//设置内容
                    .setWhen(System.currentTimeMillis())//设置创建时间
                    .setSmallIcon(R.mipmap.ic_launcher)//设置状态栏图标
                    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher))//设置通知栏图标
                    .build();
            startForeground(1, notification);
        }
    }

    private void listenLifecycle() {
        ProcessLifecycleOwner.get().getLifecycle().addObserver(new LifecycleObserver() {
            @OnLifecycleEvent(Lifecycle.Event.ON_START)
            public void onForeground() {
                startBackGroundHeartBeat(false);
            }

            @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
            public void onBackground() {
                startBackGroundHeartBeat(true);
            }
        });
    }

    public Timer timer;
    public TimerTask timerTask;

    public void startBackGroundHeartBeat(boolean isBackGround) {
        stopTimer();
        if (isBackGround) {
            if (timer == null) {
                timer = new Timer();
            }
            timerTask = new TimerTask() {
                @Override
                public void run() {
                    LogUtils.d(TAG, "心跳了 BackgroundKeepAlive");
                    Intent service = new Intent(getApplicationContext(), MyTaskService.class);
                    Bundle bundle = new Bundle();
                    bundle.putString("foo", "bar");
                    service.putExtras(bundle);
                    getApplicationContext().startService(service);
                }
            };
            //ProcessLifecycleOwner获取的虽然是后台，执行时会提示not allowed foreground，延迟1秒
            timer.schedule(timerTask, 1000, 30000);
        }
    }

    public void stopTimer() {
        if (timer != null) {
            timer.cancel();
            timer.purge();
            timer = null;

        }
        if (timerTask != null) {
            timerTask.cancel();
            timerTask = null;
        }
    }

    @Override
    public int onStartCommand(Intent param, int flags, int startId) {
        if (param == null) {
            return START_STICKY;
        }
        String cmd = param.getStringExtra("CMD");
        if (cmd == null) {
            cmd = "";
        }
        if (cmd.equals("TICK")) {
            LogUtils.eTag(TAG, "TICK");
            if (wakeLock != null && wakeLock.isHeld() == false) {
                LogUtils.eTag(TAG, "TICK222");
                wakeLock.acquire();
            }
        }
        if (cmd.equals("RESET")) {
            if (wakeLock != null && wakeLock.isHeld() == false) {
                wakeLock.acquire();
            }
        }
        if (cmd.equals("TOAST")) {
            String text = param.getStringExtra("TEXT");
            if (text != null && text.trim().length() != 0) {
                Toast.makeText(this, text, Toast.LENGTH_LONG).show();
            }
        }
        return START_STICKY;
    }

    protected void tryReleaseWakeLock() {
        if (wakeLock != null && wakeLock.isHeld() == true) {
            wakeLock.release();
        }
    }

    protected void setTickAlarm() {
        AlarmManager alarmMgr = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, TickAlarmReceiver.class);
        int requestCode = 0;
        tickPendIntent = PendingIntent.getBroadcast(this, requestCode, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        //小米2s的MIUI操作系统，目前最短广播间隔为5分钟，少于5分钟的alarm会等到5分钟再触发！2014-04-28
        long triggerAtTime = System.currentTimeMillis();
        int interval = 5 * 1000;
        alarmMgr.setRepeating(AlarmManager.RTC_WAKEUP, triggerAtTime, interval, tickPendIntent);
    }

    protected void cancelTickAlarm() {
        AlarmManager alarmMgr = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        alarmMgr.cancel(tickPendIntent);
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "stopService:onDestroy ");
        this.cancelTickAlarm();
        this.tryReleaseWakeLock();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

}

```
```java
  <service android:name=".service.KeepAliveService" />

     ServiceUtils.startService(KeepAliveService.class);

MainActivity.java

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        final Window win = getWindow();
        win.setBackgroundDrawable(null);
        super.onCreate(savedInstanceState);

        win.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED //锁屏状态下显示

                | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD //解锁

                | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON //保持屏幕长亮

                | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);//打开屏幕
```







### AlarmManager




## 悬浮窗

<https://blog.csdn.net/dongzhong1990/article/details/80512706>  
<https://github.com/huanglinqing123/RemoteView>
## deeplink

官网：https://developer.android.com/training/app-links  
https://juejin.cn/post/6844903477571928071

### 切换到后台(执行 home 键功能)

```java
Android 开发 监听back并且执行home键功能
方法一：

在activity中重写onBackPressed()方法 ，注意此处一定要注释或者删除 super.onBackPressed();方法

 @Override
    public void onBackPressed() {
//        super.onBackPressed();
        Intent home = new Intent(Intent.ACTION_MAIN);
        home.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        home.addCategory(Intent.CATEGORY_HOME);
        startActivity(home);
    }

 方法二：

个人更推荐使用这个方法，activity上提供的原始api。使用的时候一样需要注释 super.onBackPressed();


/**
     * 重新返回键功能，将返回键功能替换成home功能
     */
    @Override
    public void onBackPressed() {
//        super.onBackPressed();
        moveTaskToBack(true);
    }

参数说明：
参数为false——代表只有当前activity是task根，指应用启动的第一个activity时，才有效;
参数为true——则忽略这个限制，任何activity都可以有效。
说明：判断Activity是否是task根，Activity本身给出了相关方法：isTaskRoot()
```
