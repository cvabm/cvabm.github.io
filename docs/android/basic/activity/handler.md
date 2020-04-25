# handler
[[toc]]
## removeCallbacksAndMessages
```
Handler handler = new Handler() {
@Override
public void handleMessage(Message msg) {
super.handleMessage(msg);
Log.d(TAG, "handleMessage: " + msg.arg1);
if (msg.arg1 == 15) {
removeCallbacksAndMessages(null);
}
}
};
```
## HandleThread的用法
<https://www.jianshu.com/p/989980a9cdd6>  

##  简单使用和介绍
1；发送消息，通过Handler调用sendMessage方法把消息发到队列中，Message贴上了该Handler的标签。  
2；在MessageQueue中将Message入列，通过传入的时间进行排列  
3；Looper不断的轮询消息队列，通过调用queue的next方法获取Message。  
4；根据之前绑定的标签发给指定的Handler，在handleMessage方法中进行消息处理。  
5；回收消息：用完消息，在Looper.loop方法中调动msg.recycle方法，回收初始化消息。  

　　andriod提供了 Handler 和 Looper 来满足线程间的通信。Handler 先进先出原则。Looper类用来管理特定线程内对象之间的消息交换(Message Exchange)。  

　　1)Looper: 一个线程可以产生一个Looper对象，由它来管理此线程里的Message Queue(消息队列)。  

　　2)Handler: 你可以构造Handler对象来与Looper沟通，以便push新消息到Message Queue里;或者接收Looper从Message Queue取出)所送来的消息。  

　　3) Message Queue(消息队列):用来存放线程放入的消息。  

　　4)线程：UI thread 通常就是main thread，而Android启动程序时会替它建立一个Message Queue。  


```
Handler与子线程协作实例
1、创建Handler实现类，在主UI所在类中的内部类
 class MyHandler extends Handler {
 public MyHandler() {
 }
 public MyHandler(Looper L) {
 super(L);
 }
 // 重写handleMessage方法,接受数据并更新UI
 @Override
 public void handleMessage(Message msg) {
 super.handleMessage(msg);
 //此处根据msg内容进行UI操作
     }
 }
、子线程的实现
 class MyThread implements Runnable {
 public void run() {
         Message msg = new Message();
         Bundle b = new Bundle();
         b.putString("cmd", "update");
         msg.setData(b);
         MainActivity.this.myHandler.sendMessage(msg);//通知Handler更新UI
     }
 }
通过以上的两个实现，我们只需要在MainActivity中声明MyHandler实例对象就可以完成线程之间的通讯和界面的更新操作。
MyHandler myHandler = newMyHandler();



Message msg = handler.obtainMessage();  
   msg.arg1 = i;  
   msg.sendToTarget();    
Message msg=new Message();  
   msg.arg1=i;  
   handler.sendMessage(msg);

obtainmessage（）是从消息池中拿来一个msg 不需要另开辟空间new
new需要重新申请，效率低，obtianmessage可以循环利用；
```

## 源码原理讲解
<https://zhuanlan.zhihu.com/p/94788063>  
## AsyncQueryHandler
```
2)AsyncQueryHandler：
①AsyncQueryHandler概述：
a、AsyncQueryHandler继承于Handler
②AsyncQueryHandler的作用：
对ContentProvider提供的数据进行增删改查。
③AsyncQueryHandler的工作机制：
注：AsyncQueryHandler内部需要Handler、Looper、Message、HandlerThread、WorkerHandler和WorkerArgs配合使用完成异步任务
a、创建AsyncQueryHandler对象时，会调用系统的AsyncQueryHandler构造方法，在AsyncQueryHandler构造方法里，
   系统会进行如下操作：
创建并开启一个HandlerThread、同时初始化Looper对象和Handler对象
b、当调用AsyncQueryHandler的startQuery、startInsert、startUpdate或者startDelete方法时
   就会执行相应的增删改查方法，在AsyncQueryHandler的增删改查方法里面先通过Handler对象初始化Message对象，
   然后再初始化一个WorkerArgs对象，将任务参数信息封装到WorkerArgs对象中，
   最后再通过Handler对象的sengMessage方法将异步任务的消息发送出去
c、WorkerHandler收到消息后调用其handleMessage方法，在该方法里对异步任务的操作类型进行判断，然后执行与之对应的处理
d、最后回调指定的异步任务执行完成的回调方法，该回调方法系统是空实现，需要用户自己根据自己的业务去重写
④AsyncQueryHandler的使用注意事项：

大数据时会出现ANR异常，故需要优化。
```

## handler各种问题
### handler的警告Handler Class Should be Static or Leaks Occur
```

	1. public class SampleActivity extends Activity {
	2. 
/**
	3. 
* Instances of static inner classes do not hold an implicit
	4. 
* reference to their outer class.
	5. 
*/
	6. 
private static class MyHandler extends Handler {
	7. 
private final WeakReference<SampleActivity> mActivity;
	8. 
public MyHandler(SampleActivity activity) {
	9. 
mActivity = new WeakReference<SampleActivity>(activity);
	10. 
}
	11. 
@Override
	12. 
public void handleMessage(Message msg) {
	13. 
SampleActivity activity = mActivity.get();
	14. 
if (activity != null) {
	15. 
// ...
	16. 
}
	17. 
}
	18. 
}
	19. 
private final MyHandler mHandler = new MyHandler(this);
	20. 
/**
	21. 
* Instances of anonymous classes do not hold an implicit
	22. 
* reference to their outer class when they are "static".
	23. 
*/
	24. 
private static final Runnable sRunnable = new Runnable() {
	25. 
@Override
	26. 
public void run() { }
	27. 
};
	28. 
@Override
	29. 
protected void onCreate(Bundle savedInstanceState) {
	30. 
super.onCreate(savedInstanceState);
	31. 
// Post a message and delay its execution for 10 minutes.
	32. 
mHandler.postDelayed(sRunnable, 60 * 10 * 1000);
	33. 
// Go back to the previous Activity.
	34. 
finish();
	35. 
}
	36. 
}


```