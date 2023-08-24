# 工具类

[[toc]]

## 定时器

```
每隔三秒执行一次Timer timer = new Timer();timer.schedule(new TimerTask() {@Overridepublic void run() {Log.d("tag", "run: ");}}, 0, 3000);获取验证码倒计时public static void countDown(final TextView textView, long waitTime, long interval, final String hint) {textView.setEnabled(false);CountDownTimer timer = new CountDownTimer(waitTime, interval) {public void onTick(long millisUntilFinished) {textView.setText("剩下 " + millisUntilFinished / 1000L + " S");}public void onFinish() {textView.setEnabled(true);textView.setText(hint);}};timer.start();}
在Android开发中，定时器一般有以下3种实现方法：



一、采用Handler与线程的sleep(long)方法
二、采用Handler的postDelayed(Runnable, long)方法
三、采用Handler与timer及TimerTask结合的方法

下面逐一介绍：
一、采用Handle与线程的sleep(long)方法
Handler主要用来处理接受到的消息。这只是最主要的方法，当然Handler里还有其他的方法供实现，有兴趣的可以去查API，这里不过多解释。
1. 定义一个Handler类，用于处理接受到的Message。

复制代码 代码如下:


Handler handler = new Handler() {
    public void handleMessage(Message msg) {
        // 要做的事情
        super.handleMessage(msg);
    }
};


2. 新建一个实现Runnable接口的线程类，如下：
复制代码 代码如下:



public class MyThread implements Runnable {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        while (true) {
            try {
                Thread.sleep(10000);// 线程暂停10秒，单位毫秒
                Message message = new Message();
                message.what = 1;
                handler.sendMessage(message);// 发送消息
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}

3. 在需要启动线程的地方加入下面语句：
复制代码 代码如下:

new Thread(new MyThread()).start();
4. 启动线程后，线程每10s发送一次消息。二、采用Handler的postDelayed(Runnable, long)方法
这个实现比较简单一些。

1. 定义一个Handler类
复制代码 代码如下:

Handler handler=new Handler();
Runnable runnable=new Runnable() {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        //要做的事情
        handler.postDelayed(this, 2000);
    }
};
2. 启动计时器

复制代码 代码如下:



handler.postDelayed(runnable, 2000);//每两秒执行一次runnable

3. 停止计时器

复制代码 代码如下:


handler.removeCallbacks(runnable);

三、采用Handler与timer及TimerTask结合的方法
1. 定义定时器、定时器任务及Handler句柄

复制代码 代码如下:


private final Timer timer = new Timer();
private TimerTask task;
Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
        // TODO Auto-generated method stub
        // 要做的事情
        super.handleMessage(msg);
    }
};

2. 初始化计时器任务
复制代码 代码如下:

task = new TimerTask() {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        Message message = new Message();
        message.what = 1;
        handler.sendMessage(message);
    }
};

3. 启动定时器
复制代码 代码如下:

timer.schedule(task, 2000, 2000);

简要说一下上面三步提到的一些内容：
1. 定时器任务（TimerTask）顾名思义，就是说当定时器到达指定的时间时要做的工作，这里是想Handler发送一个消息，由Handler类进行处理。
2. java.util.Timer.schedule(TimerTask task, long delay):这个方法是说，dalay/1000秒后执行task.只执行一次。

java.util.Timer.schedule(TimerTask task, long delay, long period)：这个方法是说，delay/1000秒后执行task,然后进过period/1000秒再次执行task，这个用于循环任务，执行无数次，当然，你可以用timer.cancel();取消计时器的执行。


倒计时定时器：

final static Handler xxhandler = new Handler();
static Runnable xxtask = new Runnable() {
    @Override
    public void run() {
        Log.i("tag", "延迟30秒执行线程");

    }
};

static void showZoomButton() {
    zoomIn = (Button) mContainer.findViewById(R.id.zoomin);
    zoomOut = (Button) mContainer.findViewById(R.id.zoomout);
    zoomIn.setVisibility(View.VISIBLE);
    zoomOut.setVisibility(View.VISIBLE);


xxhandler.removeCallbacks(xxtask)；//第二次点击按钮的时候重新定时

xxhandler.postDelayed(xxtask, 3000);
}

定时广播
这种方式最少间隔时间为1分钟。


Intent intent = new Intent(MainActivity.this, CallAlarmReceiver.class);
PendingIntent pt = PendingIntent.getBroadcast(MainActivity.this, 1, intent, 0);
AlarmManager ar = (AlarmManager) getSystemService(ALARM_SERVICE);
Long time = Long.valueOf(1);
ar.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 60 * 1000, pt);

package com.soft.tm.recycletest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

/**
 * 自定义BroadcastReceiver 当闹钟设置的时间到了的时候，广播会被唤起,并运行onreceive方法
 *
 * @author CxLong
 */
public class CallAlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, Intent intent) {
        // TODO Auto-generated method stub

        Log.d("tag", "onReceive: ");

        Toast.makeText(context, "onrecieve", Toast.LENGTH_SHORT).show();

    }
}

<receiver
android:name="com.soft.tm.recycletest.CallAlarmReceiver"
android:process=":remote" />
```

## android 分段打印日志

```
package amplesky.com.telcontroller.utils;

import android.util.Log;

public class LogUtil {
    /**
     * 截断输出日志
     * @param msg
     */
    public static void v(String tag, String msg) {
        if (tag == null || tag.length() == 0
                || msg == null || msg.length() == 0)
            return;

        int segmentSize = 3 * 1024;
        long length = msg.length();
        if (length <= segmentSize ) {// 长度小于等于限制直接打印
             Log.v(tag, msg);
        }else {
            while (msg.length() > segmentSize ) {// 循环分段打印日志
                String logContent = msg.substring(0, segmentSize );
                msg = msg.replace(logContent, "");
                Log.v(tag, logContent);
            }
            Log.v(tag, msg);// 打印剩余日志
        }
    }
}
```

```
var MAX_LENGTH = 10;
/**
 * 分段打印较长的文本
 * @param tag 标志
 * @param content 内容
 */
function debugLarge(tag, content) {
  if (content.length > MAX_LENGTH) {
    var part = content.substring(0, MAX_LENGTH);
    console.log(tag, part);
    part = content.substring(MAX_LENGTH, content.length);
    if (content.length - MAX_LENGTH > MAX_LENGTH) {
      debugLarge(tag, part);
    } else {
      console.log(tag, part);
    }
  } else {
    console.log(tag, content);
  }
}
```
