[[toc]]

## removeCallbacksAndMessages

```java
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

## HandleThread 的用法

<https://www.jianshu.com/p/989980a9cdd6>

## 简单使用和介绍

1；发送消息，通过 Handler 调用 sendMessage 方法把消息发到队列中，Message 贴上了该 Handler 的标签。  
2；在 MessageQueue 中将 Message 入列，通过传入的时间进行排列  
3；Looper 不断的轮询消息队列，通过调用 queue 的 next 方法获取 Message。  
4；根据之前绑定的标签发给指定的 Handler，在 handleMessage 方法中进行消息处理。  
5；回收消息：用完消息，在 Looper.loop 方法中调动 msg.recycle 方法，回收初始化消息。

andriod 提供了 Handler 和 Looper 来满足线程间的通信。Handler 先进先出原则。Looper 类用来管理特定线程内对象之间的消息交换(Message Exchange)。

1)Looper: 一个线程可以产生一个 Looper 对象，由它来管理此线程里的 Message Queue(消息队列)。

2)Handler: 你可以构造 Handler 对象来与 Looper 沟通，以便 push 新消息到 Message Queue 里;或者接收 Looper 从 Message Queue 取出)所送来的消息。

3. Message Queue(消息队列):用来存放线程放入的消息。

4)线程：UI thread 通常就是 main thread，而 Android 启动程序时会替它建立一个 Message Queue。

```java
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

## handler 源码原理讲解

<https://zhuanlan.zhihu.com/p/94788063>

## AsyncQueryHandler

```java
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

## 阻塞唤醒机制

sendMessage 后，会激活 nativeWake（）方法

## Looper 是在主线程创建，同时其 loop 方法也是在主线程执行，为什么这样一个死循环却不会阻塞主线程呢？

```
ActivityThread 中，它实际上是有一个 handleMessage 方法，其实
ActivityThread 就是一个 Handler，我们在使用的过程中的很多事件（如
Activity、Service 的各种生命周期）都在这里的各种 Case 中，也就是说我们平
时说的主线程其实就是依靠这个 Looper 的 loop 方法来处理各种消息，从而实
现如 Activity 的声明周期的回调等等的处理，从而回调给我们使用者。


而这个问题的意思应该是为何这样一个死循环不会使得界面卡顿，这有两个原因：
1. 界面的绘制本身就是这个循环内的一个事件
2. 界面的绘制是通过了同步屏障保护下发送的异步消息，会被主线程优先处
理，因此使得界面绘制拥有了最高的优先级，不会因为 Handler 中事件太多而
造成卡顿。
```

## handler 的内存泄漏问题

```java
MainActivity.java

private Handler mHandler = new Handler() {
@Override
public void handleMessage(Message msg) {
// 一些处理
}


匿名内部类会持有外部类的引用，也就是说这里的 Handler 会持有其外部类 XXXActivity 的引用。

当handler内部执行后，关闭activity，handler内部持有这个activity导致activity无法被回收 导致内存泄漏


解决方法最好是设置handler为static，然后通过 WeakReference 来使其持有 Activity 的弱引用来访问其他的信息

```

## handler 怎么做到线程切换的

```
1.创建了一个Looper对象保存在ThreadLocal中。这个Looper同时持有一个MessageQueue对象。（ui线程）

2.创建Handler获取到Looper对象和MessageQueue对象。在调用sendMessage方法的时候在不同的线程（子线程）中把消息插入MessageQueue队列。

3.在主线程中（UI线程），调用Looper的loop()方法无限循环查询MessageQueue队列是否有消息保存了。有消息就取出来调用dispatchMessage()方法处理。这个方法最终调用了我们自己重写了消息处理方法handleMessage(msg);这样就完成消息从子线程到主线程的无声切换

```
