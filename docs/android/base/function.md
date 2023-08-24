# 功能点

[[toc]]

## Android7.0 版本更新

```
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

## 引导页

<http://www.jcodecraeer.com/a/opensource/2015/0827/3373.html>

```


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
## 后台保活
<http://www.52im.net/thread-3033-1-1.html>  
<https://blog.yorek.xyz/android/paid/zsxq/week16-keep-app-alive/#21-activity>  
<https://lightingsui.github.io/2021/01/28/Android%E8%BF%9B%E7%A8%8B%E4%BF%9D%E6%B4%BB/#%E9%80%9A%E8%BF%87%E5%B9%BF%E6%92%AD%E4%BF%9D%E6%B4%BB>  

<https://juejin.im/post/5dfaeccbf265da33910a441d>  
<http://lastwarmth.win/2019/09/06/keepalive/>  
<https://blog.csdn.net/u014418171/article/details/98874962/>

###  RN后台保活
```
AppRegistry.registerHeadlessTask('BackgroundKeepAlive', () => async () => {
    new wsClient().heartBeat();
});
```
```
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
```
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
