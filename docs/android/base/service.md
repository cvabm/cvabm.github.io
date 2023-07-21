[[toc]]

## Service、IntentService、Thread 的区别和联系

<https://www.jianshu.com/p/f9d3c3ee5d67>

## 两种方式启动 service

```java
第一种
写一个类继承service，并重写方法 oncreate onstartComment ondestroy onbind
在配置文件中添加service
Intent startIntent = new Intent(this, MyService.class);
    startService(startIntent);
销毁service
  stopService(intent);
启动：oncreate onstarComment（）
停止：onDestroy（）
```

```java
第二种
2.Context.bindService()启动
    private ServiceConnection conn= new ServiceConnection() {
         @Override
     public void onServiceDisconnected(ComponentName name) {
         }

         @Override
         public void onServiceConnected(ComponentName name, IBinder service) {
             myBinder = (MyService.MyBinder) service;
             myBinder.startDownload();
         }
     };

    Intent intent = new Intent(DemoActivity.this, DemoService.class);
    bindService(intent, conn, Context.BIND_AUTO_CREATE);
   //unbindService(conn);//解除绑定
```

## 提升 service 优先级

```java
在AndroidManifest.xml文件中对于intent-filter可以通过android:priority = "1000"这个属性设置最高优先级，1000是最高值，如果数字越小则优先级越低，同时适用于广播。
<service
    android:name="com.dbjtech.acbxt.waiqin.UploadService"
    android:enabled="true" >
    <intent-filter android:priority="1000" >
        <action android:name="com.dbjtech.myservice" />
    </intent-filter>
</service>

```
