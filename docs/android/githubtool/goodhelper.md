# 必备轮子
[[toc]]
## rxjava

### 总结
<https://zouzhberk.github.io/rxjava-study/>  
Rxbus<https://www.jianshu.com/p/2131c4088885>    
RxJava2<https://juejin.im/post/5b17560e6fb9a01e2862246f>    
<https://github.com/THEONE10211024/RxJavaSamples>    
<https://github.com/nanchen2251/RxJava2Examples>  
rxbinding<https://juejin.im/post/5afaa4726fb9a07ab458c732>  
简洁<https://github.com/Thor-jelly/StudyRxjava>  
```
Flowable & Observable
* Observable: 不支持背压；
* Flowable : Observable新的实现，支持背压，同时实现Reactive Streams 的 Publisher 接口。
* 什么时候用 Observable:
    * 一般处理最大不超过1000条数据，并且几乎不会出现内存溢出；
    * 如果式GUI 鼠标事件，频率不超过1000 Hz,基本上不会背压（可以结合 sampling/debouncing 操作）；
    * 如果处理的式同步流而你的Java平台又不支持Java Stream（如果有异常处理，Observable 比Stream也更适合）;
* 什么时候用 Flowable:
    * 处理以某种方式产生超过10K的元素；
    * 文件读取与分析，例如 读取指定行数的请求；
    * 通过JDBC 读取数据库记录， 也是一个阻塞的和基于拉取模式，并且由ResultSet.next() 控制；
    * 网络IO流;
    * 有很多的阻塞和/或 基于拉取的数据源，但是又想得到一个响应式非阻塞接口的。
```




### 操作符
```

create（创建被观察者，并向观察者发消息）

Observable.create(new ObservableOnSubscribe<Integer>() {
    @Override
    public void subscribe(ObservableEmitter<Integer> emitter) throws Exception {
        emitter.onNext(123);
        emitter.onNext(345);
        emitter.onComplete();
    }
}).subscribe(new Observer<Integer>() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(Integer integer) {
        Log.d(TAG, "onNext: " + integer);
    }
    @Override
    public void onError(Throwable e) {
    }
    @Override
    public void onComplete() {
    }
});
Just（//将某个对象转化为Observable对象，并且将其发射出去，可以是一个数字、一个字符串、数组、Iterate对象等）
发送的事件不可以超过10个以上

String[] s = {"你好啊", "helo", "再见"};
Observable.just(s).subscribe(new Action1<String[]>() {
@Override
public void call(String[] strings) {
for (int i = 0; i < strings.length; i++) {
Log.e(TAG, "call: " + strings[i]);
}
}
});
concat

可以将多个观察者组合在一起，然后按照之前发送顺序发送事件。需要注意的是，concat() 最多只可以发送4个事件
Observable.concat(Observable.just("123"), Observable.just("23523ge")).subscribe(new Observer<String>() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(String s) {
        Log.d(TAG, "onNext: " + s);
    }
    @Override
    public void onError(Throwable e) {
    }
    @Override
    public void onComplete() {
    }
});

concatArray

与 concat() 作用一样，不过 concatArray() 可以发送多于 4 个被观察者
concatArrayDelayError() & mergeArrayDelayError()

在 concatArray() 和 mergeArray() 两个方法当中，如果其中有一个被观察者发送了一个 Error 事件，那么就会停止发送事件，如果你想 onError() 事件延迟到所有被观察者都发送完事件后再执行的话，就用这个delay方法
fromArray

这个方法和 just() 类似，只不过 fromArray 可以传入多于10个的变量，并且可以传入一个数组。
empty(),never() ,error()

1. empty() ： 直接发送 onComplete() 事件
2. never()：不发送任何事件
3. error()：发送 onError() 事件
range()

同时发送一定范围的事件序列。
Observable.range(100,3)
        .subscribe(new Observer<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "==============onSubscribe ");
            }
            @Override
            public void onNext(Integer aLong) {
                Log.d(TAG, "==============onNext " + aLong);
            }
            @Override
            public void onError(Throwable e) {
            }
            @Override
            public void onComplete() {
            }
        });
结果：
02-18 15:27:11.806 16002-16002/com.soft.tm1 D/ljg: ==============onSubscribe
02-18 15:27:11.806 16002-16002/com.soft.tm1 D/ljg: ==============onNext 100
02-18 15:27:11.806 16002-16002/com.soft.tm1 D/ljg: ==============onNext 101
02-18 15:27:11.806 16002-16002/com.soft.tm1 D/ljg: ==============onNext 102
rangeLong()

作用与 range() 一样，只是数据类型为 Long
interval(),

每隔一段时间执行一次，循环。
Observable.interval(3,TimeUnit.SECONDS).subscribe(new Consumer<Long>() {
    @Override
    public void accept(Long aLong) throws Exception {
        Log.d(TAG, "accept: "+aLong);
    }
});
timer()

 延迟一段时间再执行。

fromCallable()

跟runable接口类似，只是多一个返回值。
amb()

amb() 要传入一个 Observable 集合，但是只会发送最先发送事件的 Observable 中的事件，其余 Observable 将会被丢弃,
最先发送的事件无序，不确定谁先发。
ArrayList< Observable < Long >> list = new ArrayList < > ();
list.add(Observable.intervalRange(20, 5, 2, 1, TimeUnit.SECONDS));
list.add(Observable.intervalRange(6, 5, 0, 1, TimeUnit.SECONDS));
Observable.amb(list)
        .subscribe(new Consumer < Long > () {
            @Override
            public void accept(Long aLong) throws Exception {
                Log.d(TAG, "========================aLong " + aLong);
            }
        });
defer

这个方法的作用就是直到被观察者被订阅后才会创建被观察者
future()

参数中的 Future 是 java.util.concurrent 中的 Future，
Future 的作用是增加了 cancel() 等方法操作 Callable，它可以通过 get() 方法来获取 Callable 返回的值。

FutureTask < String > futureTask = new FutureTask < > (new Callable < String > () {
    @Override
    public String call() throws Exception {
        Log.d(TAG, "CallableDemo is Running");
        return "返回结果";
    }
});

Observable.fromFuture(futureTask)
    .doOnSubscribe(new Consumer < Disposable > () {
    @Override
    public void accept(Disposable disposable) throws Exception {
        futureTask.run();
    }
})
.subscribe(new Consumer < String > () {
    @Override
    public void accept(String s) throws Exception {
        Log.d(TAG, "================accept " + s);
    }
});

doOnSubscribe() 的作用就是只有订阅时才会发送事件，具体会在下面讲解。
打印结果：
05-26 13:54:00.470 14429-14429/com.example.rxjavademo D/chan: CallableDemo is Running
================accept 返回结果

fromIterable()

直接发送一个 List 集合数据给观察者,onNext一个个接收。
generate（）
merge()

这个方法月 concat() 作用基本一样，只是 concat() 是串行发送事件，而 merge() 并行发送事件。
sequenceEqual（）

判断两个 Observable 发送的事件是否相同。

Observable.sequenceEqual(Observable.just(1, 2, 3), Observable.just(1, 2, 3)
) .subscribe(new Consumer < Boolean > ()
 { @Override public void accept(Boolean aBoolean) throws Exception 
{ Log.d(TAG, "========================onNext " + aBoolean); } });

switchOnNext

将一个发射Observables的Observable转换成另一个Observable，后者发射这些Observables最近发射的数据
zip()

 通过一个函数将多个Observable发送的事件结合到一起，然后发送这些组合到一起的事件. 它按照严格的顺序应用这个函数。它只发射与发射数据项最少的那个Observable一样多的数据）

比如一个界面需要展示用户的一些信息, 而这些信息分别要从两个服务器接口中获取, 而只有当两个都获取到了之后才能进行展示, 这个时候就可以用Zip了
口:
public interface Api {
    @GET
    Observable<UserBaseInfoResponse> getUserBaseInfo(@Body UserBaseInfoRequest request);


    @GET
    Observable<UserExtraInfoResponse> getUserExtraInfo(@Body UserExtraInfoRequest request);


}
接着用Zip来打包请求:
Observable<UserBaseInfoResponse> observable1 =                                            
        api.getUserBaseInfo(new UserBaseInfoRequest()).subscribeOn(Schedulers.io());      
                                                                                          
Observable<UserExtraInfoResponse> observable2 =                                           
        api.getUserExtraInfo(new UserExtraInfoRequest()).subscribeOn(Schedulers.io());    
                                                                                          
Observable.zip(observable1, observable2,                                                  
        new BiFunction<UserBaseInfoResponse, UserExtraInfoResponse, UserInfo>() {         
            @Override                                                                     
            public UserInfo apply(UserBaseInfoResponse baseInfo,                          
                                  UserExtraInfoResponse extraInfo) throws Exception {     
                return new UserInfo(baseInfo, extraInfo);                                 
            }                                                                             
        }).observeOn(AndroidSchedulers.mainThread())                                      
        .subscribe(new Consumer<UserInfo>() {                                             
            @Override                                                                     
            public void accept(UserInfo userInfo) throws Exception {                      
                //do something;                                                           
            }                                                                             
        });    
Repeat（ 会将一个Observable对象重复发射，我们可以指定其发射的次数）

Observable.just(1,2).repeat(10).subscribe(new Action1<Integer>() {
@Override
public void call(Integer integer) {
Log.d(TAG, "call: " + integer);
}
});

filter（添加過濾條件）

Observable obs = Observable.just(1, 2, 3, 4, 5, 6, 7, 8, 9).filter(new Func1<Integer, Boolean>() {
@Override
public Boolean call(Integer integer) {
return integer < 5;
}
});
obs.subscribe(new Action1() {
@Override
public void call(Object o) {
Log.d(TAG, "call: "+o);
}
});
distinct（）

过滤事件序列中的重复事件。

skip(long count)

跳过几个事件不执行。
map() 

转换数据的格式

flatMap()

flatMap包含两个操作：会将每一个输入对象输入映射为一个新集合，然后把这些新集合连成一个大集合。 ,如多层循环

concatMap()

和 flatMap() 基本上是一样的，只不过 concatMap() 转发出来的事件是有序的，而 flatMap() 是无序的
buffer()

从需要发送的事件当中获取一定数量的事件，并将这些事件放到缓冲区当中一并发出。

Observable.just(1, 2, 3, 4, 5).buffer(2).subscribe(new Consumer<List<Integer>>() {
    @Override
    public void accept(List<Integer> integers) throws Exception {
        for (int i = 0; i < integers.size(); i++) {
            Log.d(TAG, i + "accept: " + integers.get(i));
        }
    }
});
打印： 12 , 34, 5 

Scan()

将不同数据聚合起来
Observable.just(1, 2, 3, 4, 5) .scan(new BiFunction < Integer, Integer, Integer > () 
{ @Override public Integer apply(Integer integer, Integer integer2) throws Exception 
{ Log.d(TAG, "====================apply ");
 Log.d(TAG, "====================integer " + integer);
 Log.d(TAG, "====================integer2 " + integer2);
 return integer + integer2; } 
})
 .subscribe(new Consumer < Integer > ()
 { @Override public void accept(Integer integer) throws Exception 
{ Log.d(TAG, "====================accept " + integer); } });


collect()

将数据收集到数据结构当中。
Observable.just(1, 2, 3, 4) .collect(new Callable < ArrayList < Integer >> () 
{ @Override public ArrayList < Integer > call() throws Exception
 { return new ArrayList < > (); } },
 new BiConsumer < ArrayList < Integer > , Integer > () 
{ @Override public void accept(ArrayList < Integer > integers, Integer integer) 
throws Exception { integers.add(integer); } }) ‘’
.subscribe(new Consumer < ArrayList < Integer >> ()
 { @Override public void accept(ArrayList < Integer > integers) 
throws Exception { Log.d(TAG, "===============accept " + integers); } });

startWith() & startWithArray()


方法预览：
public final Observable<T> startWith(T item)
public final Observable<T> startWithArray(T... items)

在发送事件之前追加事件，startWith() 追加一个事件，startWithArray() 可以追加多个事件。追加的事件会先发出。
怎么用？
Observable.just(5, 6, 7)
.startWithArray(2, 3, 4)
.startWith(1)
.subscribe(new Consumer < Integer > () {
    @Override
    public void accept(Integer integer) throws Exception {
        Log.d(TAG, "================accept " + integer);
    }
});
打印结果：
05-22 17:08:21.282 4505-4505/com.example.rxjavademo D/chan: ================accept 1
================accept 2
================accept 3
================accept 4
================accept 5
================accept 6
================accept 7


count()

count()
方法预览：
public final Single<Long> count()
复制代码
有什么用？
返回被观察者发送事件的数量。
怎么用？
Observable.just(1, 2, 3)
.count()
.subscribe(new Consumer < Long > () {
    @Override
    public void accept(Long aLong) throws Exception {
        Log.d(TAG, "=======================aLong " + aLong);
    }
});



delay()
方法预览：
public final Observable<T> delay(long delay, TimeUnit unit)
复制代码
有什么用？
延迟一段事件发送事件。
怎么用？
Observable.just(1, 2, 3)
.delay(2, TimeUnit.SECONDS)
.subscribe(new Observer < Integer > () {
    @Override
    public void onSubscribe(Disposable d) {
        Log.d(TAG, "=======================onSubscribe");
    }


    @Override
    public void onNext(Integer integer) {
        Log.d(TAG, "=======================onNext " + integer);
    }


    @Override
    public void onError(Throwable e) {


    }


    @Override
    public void onComplete() {
        Log.d(TAG, "=======================onSubscribe");
    }
});

doOnEach()
Observable 每发送一件事件之前都会先回调这个方法。



doOnNext()
Observable 每发送 onNext() 之前都会先回调这个方法。
doAfterNext()
Observable 每发送 onNext() 之后都会回调这个方法

doOnComplete
Observable 每发送 onComplete() 之前都会回调这个方法。
doOnError
doOnSubscribe
doOnDispose
当调用 Disposable 的 dispose() 之后回调该方法


retry
如果出现错误事件，则会重新发送所有事件序列。times 是代表重新发的次数。

retryUntil
出现错误事件之后，可以通过此方法判断是否继续发送事件。
retryWhen    
当被观察者接收到异常或者错误事件时会回调该方法，这个方法会返回一个新的被观察者。如果返回的被观察者发送 Error 事件则之前的被观察者不会继续发送事件，如果发送正常事件则之前的被观察者会继续不断重试发送事件。
怎么用？
subscribeOn
指定被观察者的线程，要注意的时，如果多次调用此方法，只有第一次有效。
observeOn
指定观察者的线程，每指定一次就会生效一次。
ofType()
可以过滤不符合该类型事件
？
Observable.just(1, 2, 3, "chan", "zhide")
.ofType(Integer.class)
.subscribe(new Observer < Integer > () {
    @Override
    public void onSubscribe(Disposable d) {
        Log.d(TAG, "==================onSubscribe ");
    }


    @Override
    public void onNext(Integer integer) {
        i += integer;
        Log.d(TAG, "==================onNext " + integer);
    }


    @Override
    public void onError(Throwable e) {
        Log.d(TAG, "==================onError ");
    }


    @Override
    public void onComplete() {
        Log.d(TAG, "==================onComplete ");
    }
});

take()
控制观察者接收的事件的数量。
debounce()
如果两件事件发送的时间间隔小于设定的时间间隔则前一件事件就不会发送给观察者。x
all()
判断事件序列是否全部满足某个事件，如果都满足则返回 true，反之则返回 false。

Observable.just(1, 2, 3, 4)
.all(new Predicate < Integer > () {
    @Override
    public boolean test(Integer integer) throws Exception {
        return integer < 5;
    }
})
.subscribe(new Consumer < Boolean > () {
    @Override
    public void accept(Boolean aBoolean) throws Exception {
        Log.d(TAG, "==================aBoolean " + aBoolean);
    }
});
takeWhile()
可以设置条件，当某个数据满足条件时就会发送该数据，反之则不发送。

contains()
判断事件序列中是否含有某个元素，如果有则返回 true，如果没有则返回 false。
isEmpty()
判断事件序列是否为空。





```


## okio


<https://github.com/square/okio>


把设备号写入文件  
```
private static void writeToFile(String imei) {
    File file = DiskManager.getCachedImeiFile(AppService.getInstance().getAppContext());
    try (Sink fileSink = Okio.sink(file);
         BufferedSink bufferedSink = Okio.buffer(fileSink)) {
        bufferedSink.writeUtf8(imei);
    } catch (IOException e) {
        log.error("Failed to write imei to file: " + e.getMessage(), e);
    }
}
```

读取设备号  
```
private static String readFromFile() {
    File file = DiskManager.getCachedImeiFile(AppService.getInstance().getAppContext());
    StringBuilder stringBuilder = new StringBuilder();
    try (Source fileSource = Okio.source(file);
         BufferedSource bufferedSource = Okio.buffer(fileSource)) {

        while (true) {
            String line = bufferedSource.readUtf8Line();
            if (line == null) break;
            stringBuilder.append(line);
        }
    } catch (IOException e) {
        log.error("Failed to read imei from file: " + e.getMessage(), e);
        return null;
    }

    String content = stringBuilder.toString().trim();
    if (isValidImei(content)) {
        return content;
    }

    return null;
}
```


## butterknife

使用方法总结<https://www.jianshu.com/p/3678aafdabc7>

<https://github.com/JakeWharton/butterknife/blob/master/README.md>  
### 使用：
在本activity中 ButterKnife.bind(this)  

1：绑定控件：
@BindView(R.id.tv)
ImageView tv;

2：绑定其他：
```
class ExampleActivity extends Activity { 
@BindString(R.string.title) String title;
 @BindDrawable(R.drawable.graphic) Drawable graphic; 
@BindColor(R.color.red) int red; // int or ColorStateList field 
@BindDimen(R.dimen.spacer) Float spacer; 
// int (for pixel size) or float (for exact value) field // ... }
```
3：同时操作多个view：
```
@BindViews({R.id.tv1, R.id.tv2})
List<TextView> list;

ButterKnife.apply(list, ENABLED, true);


static final ButterKnife.Action<View> DISABLE = new ButterKnife.Action<View>() {
@Override
public void apply(View view, int index) {
view.setEnabled(false);
}
};
static final ButterKnife.Setter<View, Boolean> ENABLED = new ButterKnife.Setter<View, Boolean>() {
@Override
public void set(View view, Boolean value, int index) {
view.setEnabled(value);
TextView tv = (TextView) view;
if (index == 0) {
tv.setText("hello");
} else {
tv.setText("world");
}
}
};
```



## dagger2
<https://www.jianshu.com/c/52e23631636d>  
<http://square.github.io/dagger/>  
<https://blog.csdn.net/briblue/article/details/75578459>  
