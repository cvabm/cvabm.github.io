# 多线程  
[[toc]]
## asynctask  
```java
 下载图片  
new MyAsyncTask().execute(url);  
class MyAsyncTask extends AsyncTask  
onPreExecute  //下载之前执行的方法  
onPostExecute  // 执行完毕后  
doInBackground   //后台执行  
String url = params[0];  //因传入一个参数 所以只取0  

更新进度条  
一个异步任务的执行一般包括以下几个步骤：  
1.execute(Params... params)，执行一个异步任务，需要我们在代码中调用此方法，触发异步任务的执行。  
2.onPreExecute()，在execute(Params... params)被调用后立即执行，一般用来在执行后台任务前对UI做一些标记。  
3.doInBackground(Params... params)，在onPreExecute()完成后立即执行，用于执行较为费时的操作，此方法将接收输入参数和返回计算结果。在执行过程中可以调用publishProgress(Progress... values)来更新进度信息。  
4.onProgressUpdate(Progress... values)，在调用publishProgress(Progress... values)时，此方法被执行，直接将进度信息更新到UI组件上。  
5.onPostExecute(Result result)，(UI线程)当后台操作结束时，此方法将会被调用，计算结果将做为参数传递到此方法中，直接将结果显示到UI组件上。  

在使用的时候，有几点需要格外注意：  
1.异步任务的实例必须在UI线程中创建。  
2.execute(Params... params)方法必须在UI线程中调用。  
3.不能在doInBackground(Params... params)中更改UI组件的信息。  
4.一个任务实例只能执行一次，如果执行第二次将会抛出异常。  

asyncTask.excute();  
doinbackground 中写  
for 循环 1 ---100  
publishprogress (i)  
在onprogressupdate 中  
pg.setprogress(valus[0]);  

Executor exec = new ThreadPoolExecutor(15, 200, 10,  
        TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());  
new DownloadTask().executeOnExecutor(exec);  

这样就可以使用我们自定义的一个Executor来执行任务，而不是使用SerialExecutor。上述代码的效果允许在同一时刻有15个任务正在执行，并且最多能够存储200个任务。  
```  

## 跨进程通信的四种方式  
<https://blog.csdn.net/HiJson/article/details/52896480>  
## 线程池  
几种不同的ExecutorService线程池对象   

1.newCachedThreadPool()    
-缓存型池子，先查看池中有没有以前建立的线程，如果有，就reuse.如果没有，就建一个新的线程加入池中  
-缓存型池子通常用于执行一些生存期很短的异步型任务  
 因此在一些面向连接的daemon型SERVER中用得不多。  
-能reuse的线程，必须是timeout IDLE内的池中线程，缺省timeout是60s,超过这个IDLE时长，线程实例将被终止及移出池。  
 &nbsp;注意，放入CachedThreadPool的线程不必担心其结束，超过TIMEOUT不活动，其会自动被终止。  

2. newFixedThreadPool  
-newFixedThreadPool与cacheThreadPool差不多，也是能reuse就用，但不能随时建新的线程  
-其独特之处:任意时间点，最多只能有固定数目的活动线程存在，此时如果有新的线程要建立，只能放在另外的队列中等待，直到当前的线程中某个线程终止直接被移出池子  
-和cacheThreadPool不同，FixedThreadPool没有IDLE机制（可能也有，但既然文档没提，肯定非常长，类似依赖上层的TCP或UDP IDLE机制之类的），所以FixedThreadPool多数针对一些很稳定很固定的正规并发线程，多用于服务器  
-从方法的源代码看，cache池和fixed 池调用的是同一个底层池，只不过参数不同:  
fixed池线程数固定，并且是0秒IDLE（无IDLE）  
cache池线程数支持0-Integer.MAX_VALUE(显然完全没考虑主机的资源承受能力），60秒IDLE  


3.ScheduledThreadPool    
-调度型线程池    
-这个池子里的线程可以按schedule依次delay执行，或周期执行    

4.SingleThreadExecutor    
-单例线程，任意时间池中只能有一个线程    
-用的是和cache池和fixed池相同的底层池，但线程数目是1-1,0秒IDLE（无IDLE）  

上面四种线程池，都使用Executor的缺省线程工厂建立线程，也可单独定义自己的线程工厂  
下面是缺省线程工厂代码:  
```java
  static class DefaultThreadFactory implements ThreadFactory {  
        static final AtomicInteger poolNumber = new AtomicInteger(1);  
        final ThreadGroup group;  
        final AtomicInteger threadNumber = new AtomicInteger(1);  
        final String namePrefix;  

        DefaultThreadFactory() {  
            SecurityManager s = System.getSecurityManager();  
            group = (s != null)? s.getThreadGroup() :Thread.currentThread().getThreadGroup();  

            namePrefix = "pool-" + poolNumber.getAndIncrement() + "-thread-";  
        }  

        public Thread newThread(Runnable r) {  
            Thread t = new Thread(group, r,namePrefix + threadNumber.getAndIncrement(),0);  
            if (t.isDaemon())  
                t.setDaemon(false);  
            if (t.getPriority() != Thread.NORM_PRIORITY)  
                t.setPriority(Thread.NORM_PRIORITY);  
            return t;  
        }  
    }  
```  
也可自己定义ThreadFactory，加入建立池的参数中  
```java
 public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {  
Executor的execute()方法  
execute() 方法将Runnable实例加入pool中,并进行一些pool size计算和优先级处理  
execute() 方法本身在Executor接口中定义,有多个实现类都定义了不同的execute()方法  
如ThreadPoolExecutor类（cache,fiexed,single三种池子都是调用它）的execute方法如下：  
    public void execute(Runnable command) {  
        if (command == null)  
            throw new NullPointerException();  
        if (poolSize >= corePoolSize || !addIfUnderCorePoolSize(command)) {  
            if (runState == RUNNING && workQueue.offer(command)) {  
                if (runState != RUNNING || poolSize == 0)  
                    ensureQueuedTaskHandled(command);  
            }  
            else if (!addIfUnderMaximumPoolSize(command))  
                reject(command); // is shutdown or saturated  
        }  
    }  
```  
## 多进程  
```java
process分私有进程和全局进程：  
* 私有进程的名称前面有冒号，例如：  

<service android:name=".MusicService"   
           android:process=":musicservice"/>  

* 全局进程的名称前面没有冒号，例如：  

<service android:name=".MusicService"   
           android:process="com.trampcr.musicdemo.service"/>  

为了节省系统内存，在退出该Activity的时候可以将其杀掉（如果没有人为杀掉该进程，在程序完全退出时该进程会被系统杀掉）。  

```  
多个进程会使Application执行多次！

```java
@Override
public void onCreate() {
        super.onCreate();
    String processName = getProcessName(this, android.os.Process.myPid());
    if (processName != null) {
    boolean defaultProcess = processName.equals(Constants.REAL_PACKAGE_NAME);
    // 默认的主进程启动时初始化应用
    if (defaultProcess) {
	    initAppForMainProcess();
    }
    // 其他进程启动时初始化对应内容
    else if (processName.contains(":webbrowser")) {

    } else if (processName.contains(":bgmusic")) {

    }  
}

/**
 * @return null may be returned if the specified process not found
 */
public static String getProcessName(Context cxt, int pid) {
    ActivityManager am = (ActivityManager) cxt.getSystemService(Context.ACTIVITY_SERVICE);
    List<RunningAppP.rocessInfo> runningApps = am.getRunningAppProcesses();
    if (runningApps == null) {
        return null;
    }
    for (RunningAppProcessInfo procInfo : runningApps) {
        if (procInfo.pid == pid) {
            return procInfo.processName;
        }
    }
    return null;
}
```




