[[toc]]

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
## 开机广播
```java
有些机型需加上AUDIO_BECOMING_NOISY

<receiver android:name="where.com.whereareyou.BootBroadcastReceiver">
<intent-filter>
<action android:name="android.intent.action.BOOT_COMPLETED" /> //启动完成的广播
<action android:name="android.media.AUDIO_BECOMING_NOISY" />
</intent-filter>
</receiver>

 开机权限：<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

```
