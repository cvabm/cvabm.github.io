# 网络请求
[[toc]]
## eventbus
<https://github.com/greenrobot/EventBus>
 ### 使用步骤  
    2）注册  
        EventBus.getDefault().register(this);
    3）解注册  
        EventBus.getDefault().unregister(this);  

    4）构造发送消息类  

    5）发布消息  
        EventBus.getDefault().post(new MessageEvent("dahaige","123456"));
    6）接收消息  
    必须重写接受消息的方法：
@Subscribe   //不要忘记注解
public void onEventMainThread(QuerryFingerEvent event) {
}
        ThreadMode.MAIN 表示这个方法在主线程中执行
        ThreadMode.BACKGROUND 表示该方法在后台执行，不能并发处理
        ThreadMode.ASYNC 也表示在后台执行，可以异步并发处理。
        ThreadMode.POSTING 表示该方法和消息发送方在同一个线程中执行

messageEventBus方法名随便自定义，只要有注解就行  

粘性事件
    之前说的使用方法, 都是需要先注册(register), 再post,才能接受到事件;  
如果你使用postSticky发送事件, 那么可以不需要先注册, 也能接受到事件.  
    1）构造发送信息类  
    2）发布消息  
        EventBus.getDefault().postSticky(new StickyEvent("我是粘性事件"));  

   3）接收消息

    4）在需要显示消息的时候注册，不能多次注册  
        EventBus.getDefault().register(CActivity.this);  
    5）解注册  



### 另一个例子

```
EventBus是一款针对Android优化的发布/订阅事件总线。主要功能是替代Intent,Handler,BroadCast在Fragment，Activity，Service，线程之间传递消息.优点是开销小，代码更优雅。以及将发送者和接收者解耦。
1、下载EventBus的类库
源码：https://github.com/greenrobot/EventBus


onEvent:如果使用onEvent作为订阅函数，那么该事件在哪个线程发布出来的，onEvent就会在这个线程中运行，也就是说发布事件和接收事件线程在同一个线程。使用这个方法时，在onEvent方法中不能执行耗时操作，如果执行耗时操作容易导致事件分发延迟。
onEventMainThread:如果使用onEventMainThread作为订阅函数，那么不论事件是在哪个线程中发布出来的，onEventMainThread都会在UI线程中执行，接收事件就会在UI线程中运行，这个在Android中是非常有用的，因为在android中只能在UI线程中跟新UI，所以在onEvnetMainThread方法中是不能执行耗时操作的。
onEventBackground:如果使用onEventBackgrond作为订阅函数，那么如果事件是在UI线程中发布出来的，那么onEventBackground就会在子线程中运行，如果事件本来就是子线程中发布出来的，那么onEventBackground函数直接在该子线程中执行。
onEventAsync：使用这个函数作为订阅函数，那么无论事件在哪个线程发布，都会创建新的子线程在执行onEventAsync.


先给大家看个例子：

当击btn_try按钮的时候，跳到第二个Activity，当点击第二个activity上面的First Event按钮的时候向第一个Activity发送消息，当第一个Activity收到消息后，一方面将消息Toast显示，一方面放入textView中显示。

MainActivity.java

	1. 
 
	2. 
public class MainActivity extends Activity {  
	3. 
  
	4. 
    Button btn;  
	5. 
    TextView tv;  
	6. 
    EventBus eventBus;  
	7. 
  
	8. 
    @Override  
	9. 
    protected void onCreate(Bundle savedInstanceState) {  
	10. 
        super.onCreate(savedInstanceState);  
	11. 
        setContentView(R.layout.activity_main);  
	12. 
  
	13. 
        EventBus.getDefault().register(this);  
	14. 
  
	15. 
        btn = (Button) findViewById(R.id.btn_try);  
	16. 
  
	17. 
        btn.setOnClickListener(new View.OnClickListener() {  
	18. 
  
	19. 
            @Override  
	20. 
            public void onClick(View v) {  
	21. 
                // TODO Auto-generated method stub  
	22. 
                Intent intent = new Intent(getApplicationContext(),  
	23. 
                        SecondActivity.class);  
	24. 
                startActivity(intent);  
	25. 
            }  
	26. 
        });  
	27. 
    }  
	28. 
  
	29. 
    public void onEventMainThread(FirstEvent event) {  
	30. 
  
	31. 
        Log.d("harvic", "onEventMainThread收到了消息：" + event.getMsg());  
	32. 
    }  
	33. 
  
	34. 
    //SecondEvent接收函数一  
	35. 
    public void onEventMainThread(SecondEvent event) {  
	36. 
  
	37. 
        Log.d("harvic", "onEventMainThread收到了消息：" + event.getMsg());  
	38. 
    }  
	39. 
    //SecondEvent接收函数二  
	40. 
    public void onEventBackgroundThread(SecondEvent event){  
	41. 
        Log.d("harvic", "onEventBackground收到了消息：" + event.getMsg());  
	42. 
    }  
	43. 
    //SecondEvent接收函数三  
	44. 
    public void onEventAsync(SecondEvent event){  
	45. 
        Log.d("harvic", "onEventAsync收到了消息：" + event.getMsg());  
	46. 
    }  
	47. 
  
	48. 
    public void onEvent(ThirdEvent event) {  
	49. 
        Log.d("harvic", "OnEvent收到了消息：" + event.getMsg());  
	50. 
    }  
	51. 
  
	52. 
    @Override  
	53. 
    protected void onDestroy() {  
	54. 
        // TODO Auto-generated method stub  
	55. 
        super.onDestroy();  
	56. 
        EventBus.getDefault().unregister(this);  
	57. 
    }  
	58. 
} 




SecondActivirty.java

	1. 
public class SecondActivity extends Activity {  
	2. 
    private Button btn_FirstEvent, btn_SecondEvent, btn_ThirdEvent;  
	3. 
  
	4. 
    @Override  
	5. 
    protected void onCreate(Bundle savedInstanceState) {  
	6. 
        super.onCreate(savedInstanceState);  
	7. 
        setContentView(R.layout.activity_second);  
	8. 
        btn_FirstEvent = (Button) findViewById(R.id.btn_first_event);  
	9. 
        btn_SecondEvent = (Button) findViewById(R.id.btn_second_event);  
	10. 
        btn_ThirdEvent = (Button) findViewById(R.id.btn_third_event);  
	11. 
  
	12. 
        btn_FirstEvent.setOnClickListener(new View.OnClickListener() {  
	13. 
  
	14. 
            @Override  
	15. 
            public void onClick(View v) {  
	16. 
                // TODO Auto-generated method stub  
	17. 
                EventBus.getDefault().post(  
	18. 
                        new FirstEvent("FirstEvent btn clicked"));  
	19. 
            }  
	20. 
        });  
	21. 
          
	22. 
        btn_SecondEvent.setOnClickListener(new View.OnClickListener() {  
	23. 
  
	24. 
            @Override  
	25. 
            public void onClick(View v) {  
	26. 
                // TODO Auto-generated method stub  
	27. 
                EventBus.getDefault().post(  
	28. 
                        new SecondEvent("SecondEvent btn clicked"));  
	29. 
            }  
	30. 
        });  
	31. 
  
	32. 
        btn_ThirdEvent.setOnClickListener(new View.OnClickListener() {  
	33. 
  
	34. 
            @Override  
	35. 
            public void onClick(View v) {  
	36. 
                // TODO Auto-generated method stub  
	37. 
                EventBus.getDefault().post(  
	38. 
                        new ThirdEvent("ThirdEvent btn clicked"));  
	39. 
  
	40. 
            }  
	41. 
        });  
	42. 
  
	43. 
    } 



```


## fast networking
[一行代码搞定]
<https://github.com/amitshekhariitbhu/Fast-Android-Networking>   


## okhttp
okhttp下载、断点续传<https://mp.weixin.qq.com/s?__biz=MzA5MzI3NjE2MA==&mid=2650238800&idx=1&sn=edf37925bc998ccb9d69912bb1f2cd2d&chksm=88639e3fbf141729a6a02d8feda0e12bea97aa17e6482d22e1d8b7b6cf0ed92889239549acee&mpshare=1&scene=23&srcid=0612r5ry9kRHyLRmUOakAKUR##>  
### dns问题
```

1:用okhttp自带的incepter
2：复写lookup()方法
https://www.jianshu.com/p/44122b58a8fe  //此方法没试过

https://garage.easytaxi.com/tag/dns-android-okhttp/ 即如下

new OkHttpClient.Builder()
        .dns(new EasyDns())
        .addNetworkInterceptor(new AuthInterceptor())
        .addInterceptor(logging)
        .authenticator(new TokenAuthenticator())

import okhttp3.Dns;

import static org.xbill.DNS.Address.getByName;

public class EasyDns implements Dns {

    private static final String LIVE_API_HOST = "tm.tianmain.com";   //先请求域名
    private static final String LIVE_API_IP = "39.105.107.3";   //利用以下三个服务器解析域名失败，会请求此ip

    private boolean mInitialized;
    private InetAddress mLiveApiStaticIpAddress;

    @Override
    public List<InetAddress> lookup(String hostname) throws UnknownHostException {
        // I'm initializing the DNS resolvers here to take advantage of this method being called in a background-thread managed by OkHttp
        init();
        try {
            return Collections.singletonList(getByName(hostname));
        } catch (UnknownHostException e) {
            // fallback to the API's static IP
            if (LIVE_API_HOST.equals(hostname) && mLiveApiStaticIpAddress != null) {
                return Collections.singletonList(mLiveApiStaticIpAddress);
            } else {
                throw e;
            }
        }
    }

    private void init() {
        if (mInitialized) return;
        else mInitialized = true;

        try {
            mLiveApiStaticIpAddress = InetAddress.getByName(LIVE_API_IP);
        } catch (UnknownHostException e) {
            Log.w("dns", "Couldn't initialize static IP address");
        }
        try {
            Resolver defaultResolver = Lookup.getDefaultResolver();
            Resolver firstAli = new SimpleResolver("223.6.6.6");
            Resolver second114 = new SimpleResolver("114.114.114.114");
            Resolver thirdBaidu = new SimpleResolver("180.76.76.76");
            Lookup.setDefaultResolver(new ExtendedResolver(new Resolver[]{
                    defaultResolver, firstAli, second114, thirdBaidu}));
        } catch (UnknownHostException e) {
            Log.w("dns", "Couldn't initialize custom resolvers");
        }
    }

}

```
### Interceptors
<https://github.com/square/okhttp/wiki/Interceptors>  
### 同时上传多个文件
```
// 文件转换
public static List<MultipartBody.Part> filesToMultipartBodyParts(List<File> files) {
List<MultipartBody.Part> parts = new ArrayList<>(files.size());
for (File file : files) {
RequestBody requestBody = RequestBody.create(MediaType.parse("image/png"), file);
MultipartBody.Part part = MultipartBody.Part.createFormData("multipartFiles", file.getName(), requestBody);
parts.add(part);
}
return parts;
}
```
### Retrofit自定义GsonConverter处理所有请求错误情况
<https://www.jianshu.com/p/5b8b1062866b>  

### okhttp几种用法
```
1:在app模块的build.gradle文件中，加入下面的代码：
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.1.1'
    compile 'com.squareup.okhttp3:okhttp:3.2.0'

}



最简单的GET请求用法如下：
//简单的Get请求，不带参数
public void simpleGetClick(View view) {
    okHttpClient = new OkHttpClient();
    Request request = new Request.Builder()
            .url("http://192.168.1.170:8088/okhttp/test_simple_get.php")
            .build();
    okHttpClient.newCall(request).enqueue(callback);
}


如果请求中要添加Header头和参数，可以用下面的方式：


//带参数的Get请求
public void addParamGetClick(View view) {
    okHttpClient = new OkHttpClient();
    Request request = new Request.Builder()
            .addHeader("token", "asdlfjkasdljfaskdjfalsjkljalk")  //请求头中加入参数
            .url("http://192.168.1.170:8088/okhttp/test_param_get.php?username=zhangsan&phone=13888888888") //携带参数
            .build();
    okHttpClient.newCall(request).enqueue(callback);
}

需要注意的是，上面的代码中，callback是请求后的回调接口，代码如下：


 //请求后的回调接口
private Callback callback = new Callback() {
    @Override
    public void onFailure(Call call, IOException e) {
        setResult(e.getMessage(), false);
    }

    @Override
    public void onResponse(Call call, Response response) throws IOException {
        setResult(response.body().string(), true);
    }
};

2）POST请求

//简单的带参数和Header的post请求
public void simplePostClick(View view) {
    okHttpClient = new OkHttpClient();
    RequestBody requestBody = new FormBody.Builder()
            .add("username", "wangwu")
            .add("password", "hello12345")
            .add("gender", "female")
            .build();
    Request request = new Request.Builder()
            .url("http://192.168.1.170:8088/okhttp/test_simple_post.php")
            .post(requestBody)
            .addHeader("token", "helloworldhelloworldhelloworld")
            .build();
    okHttpClient.newCall(request).enqueue(callback);
}
这里我们需要先构造一个RequestBody，然后把需要携带的参数放到RequestBody中，然后使用这个RequestBody构建一个Request请求，最后将这个请求放入队列中执行
 

如果我们的POST请求稍微复杂点，比如携带的参数既有文本类型的，又有文件类型的，那么可以用下面的方式来请求：

//带文本参数和文件参数的post请求
public void filePostClick(View view) {
    RequestBody fileBody = RequestBody.create(MediaType.parse("text/plain; charset=utf-8"), tempFile);
    RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("username", "wangwu")
            .addFormDataPart("password", "hello12345")
            .addFormDataPart("gender", "female")
            .addFormDataPart("file", "info.txt", fileBody)
            .build();
    Request request = new Request.Builder()
            .url("http://192.168.1.170:8088/okhttp/test_param_post.php")
            .post(requestBody)
            .addHeader("token", "helloworldhelloworldhelloworld")
            .build();
    okHttpClient.newCall(request).enqueue(callback);
}
上面的代码中，tempFile是一个文本文件，为了POST提交文件和一些其他的参数，我们使用MultipartBody来构建一个请求体，需要注意的是，因为POST的内容含有文件，所以我们必须为这个请求体设置setType(MultipartBody.FORM)


文件的上传



package com.test.testokhttp;

import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.Buffer;
import okio.BufferedSink;
import okio.BufferedSource;
import okio.ForwardingSink;
import okio.ForwardingSource;
import okio.Okio;
import okio.Sink;
import okio.Source;

public class UploadActivity extends AppCompatActivity {

    private OkHttpClient okHttpClient;
    private TextView resultTextView;
    private ProgressBar progressBar;
    private File tempFile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);
        setTitle("上传文件并显示进度");

        resultTextView = (TextView) findViewById(R.id.result_textview);
        progressBar = (ProgressBar) findViewById(R.id.progress_bar);
        progressBar.setMax(100);

        okHttpClient = new OkHttpClient.Builder()
                .readTimeout(30, TimeUnit.SECONDS)
                .connectTimeout(10, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .build();
    }

    //点击按钮开始上传文件
    public void startUploadClick(View view) {
        tempFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "test.pdf");
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("file", "test.pdf", RequestBody.create(MediaType.parse("application/pdf; charset=utf-8"), tempFile))
                .build();
        ProgressRequestBody progressRequestBody = new ProgressRequestBody(requestBody, progressListener);
        Request request = new Request.Builder()
                .url("http://192.168.1.170:8088/okhttp/test_upload_file.php")
                .post(progressRequestBody)
                .build();
        okHttpClient.newCall(request).enqueue(callback);
    }

    //通过实现进度回调接口中的方法，来显示进度
    private ProgressListener progressListener = new ProgressListener() {
        @Override
        public void update(long bytesRead, long contentLength, boolean done) {
            int progress = (int) (100.0 * bytesRead / contentLength);
            progressBar.setProgress(progress);
        }
    };

    //请求后的回调方法
    private Callback callback = new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
            setResult(e.getMessage(), false);
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {
            setResult(response.body().string(), true);
        }
    };

    //显示请求返回的结果
    private void setResult(final String msg, final boolean success) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (success) {
                    Toast.makeText(UploadActivity.this, "请求成功", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(UploadActivity.this, "请求失败", Toast.LENGTH_SHORT).show();
                }
                resultTextView.setText(msg);
            }
        });
    }

    //自定义的RequestBody，能够显示进度
    public class ProgressRequestBody extends RequestBody {
        //实际的待包装请求体
        private final RequestBody requestBody;
        //进度回调接口
        private final ProgressListener progressListener;
        //包装完成的BufferedSink
        private BufferedSink bufferedSink;

        /**
         * 构造函数，赋值
         *
         * @param requestBody      待包装的请求体
         * @param progressListener 回调接口
         */
        public ProgressRequestBody(RequestBody requestBody, ProgressListener progressListener) {
            this.requestBody = requestBody;
            this.progressListener = progressListener;
        }

        /**
         * 重写调用实际的响应体的contentType
         *
         * @return MediaType
         */
        @Override
        public MediaType contentType() {
            return requestBody.contentType();
        }

        /**
         * 重写调用实际的响应体的contentLength
         *
         * @return contentLength
         * @throws IOException 异常
         */
        @Override
        public long contentLength() throws IOException {
            return requestBody.contentLength();
        }

        /**
         * 重写进行写入
         *
         * @param sink BufferedSink
         * @throws IOException 异常
         */
        @Override
        public void writeTo(BufferedSink sink) throws IOException {
            if (bufferedSink == null) {
                //包装
                bufferedSink = Okio.buffer(sink(sink));
            }
            //写入
            requestBody.writeTo(bufferedSink);
            //必须调用flush，否则最后一部分数据可能不会被写入
            bufferedSink.flush();

        }

        /**
         * 写入，回调进度接口
         *
         * @param sink Sink
         * @return Sink
         */
        private Sink sink(Sink sink) {
            return new ForwardingSink(sink) {
                //当前写入字节数
                long bytesWritten = 0L;
                //总字节长度，避免多次调用contentLength()方法
                long contentLength = 0L;

                @Override
                public void write(Buffer source, long byteCount) throws IOException {
                    super.write(source, byteCount);
                    if (contentLength == 0) {
                        //获得contentLength的值，后续不再调用
                        contentLength = contentLength();
                    }
                    //增加当前写入的字节数
                    bytesWritten += byteCount;
                    //回调
                    progressListener.update(bytesWritten, contentLength, bytesWritten == contentLength);
                }
            };
        }
    }

    //进度回调接口
    interface ProgressListener {
        void update(long bytesRead, long contentLength, boolean done);
    }

}

（4）文件的下载


import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.Buffer;
import okio.BufferedSource;
import okio.ForwardingSource;
import okio.Okio;
import okio.Source;

public class DownloadActivity extends AppCompatActivity {

    private OkHttpClient okHttpClient;
    private TextView resultTextView;
    private ProgressBar progressBar;
    private File tempFile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_download);
        setTitle("下载文件并显示进度");

        okHttpClient = new OkHttpClient.Builder()
                .addNetworkInterceptor(new Interceptor() {
                    @Override public Response intercept(Interceptor.Chain chain) throws IOException {
                        Response originalResponse = chain.proceed(chain.request());
                        return originalResponse.newBuilder()
                                .body(new ProgressResponseBody(originalResponse.body(), progressListener))
                                .build();
                    }
                })
                .connectTimeout(5, TimeUnit.SECONDS)
                .readTimeout(300, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .build();
        resultTextView = (TextView) findViewById(R.id.result_textview);
        progressBar = (ProgressBar) findViewById(R.id.progress_bar);
        tempFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + System.currentTimeMillis() + ".pdf");
    }

    //下载文件
    public void startDownloadClick(View view) {
        Request request = new Request.Builder()
                .url("http://192.168.1.170:8088/okhttp/test.pdf")
                .build();
        okHttpClient.newCall(request).enqueue(callback);
    }

    private ProgressListener progressListener = new ProgressListener() {
        @Override
        public void update(long bytesRead, long contentLength, boolean done) {
            int progress = (int) (100.0 * bytesRead / contentLength);
            progressBar.setProgress(progress);
        }
    };

    //请求后的回调方法
    private Callback callback = new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
            setResult(e.getMessage(), false);
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {
            if(response != null) {
                //下载完成，保存数据到文件
                InputStream is = response.body().byteStream();
                FileOutputStream fos = new FileOutputStream(tempFile);
                byte[] buf = new byte[1024];
                int hasRead = 0;
                while((hasRead = is.read(buf)) > 0) {
                    fos.write(buf, 0, hasRead);
                }
                fos.close();
                is.close();
                setResult("下载成功", true);
            }
        }
    };

    //显示请求返回的结果
    private void setResult(final String msg, final boolean success) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (success) {
                    Toast.makeText(DownloadActivity.this, "请求成功", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(DownloadActivity.this, "请求失败", Toast.LENGTH_SHORT).show();
                }
                resultTextView.setText(msg);
            }
        });
    }

    //自定义的ResponseBody，在其中处理进度
    private static class ProgressResponseBody extends ResponseBody {

        private final ResponseBody responseBody;
        private final ProgressListener progressListener;
        private BufferedSource bufferedSource;

        public ProgressResponseBody(ResponseBody responseBody, ProgressListener progressListener) {
            this.responseBody = responseBody;
            this.progressListener = progressListener;
        }

        @Override public MediaType contentType() {
            return responseBody.contentType();
        }

        @Override public long contentLength() {
            return responseBody.contentLength();
        }

        @Override public BufferedSource source() {
            if (bufferedSource == null) {
                bufferedSource = Okio.buffer(source(responseBody.source()));
            }
            return bufferedSource;
        }

        private Source source(Source source) {
            return new ForwardingSource(source) {
                long totalBytesRead = 0L;

                @Override public long read(Buffer sink, long byteCount) throws IOException {
                    long bytesRead = super.read(sink, byteCount);
                    // read() returns the number of bytes read, or -1 if this source is exhausted.
                    totalBytesRead += bytesRead != -1 ? bytesRead : 0;
                    progressListener.update(totalBytesRead, responseBody.contentLength(), bytesRead == -1);
                    return bytesRead;
                }
            };
        }
    }

    //进度回调接口
    interface ProgressListener {
        void update(long bytesRead, long contentLength, boolean done);
    }
}

```

### Okhttp的websocket使用
```
import android.util.Log;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;
public class WebsocketClient {
    private static final int NORMAL_CLOSURE_STATUS = 1000;
    private static OkHttpClient sClient;
    private static WebSocket sWebSocket;
    public static synchronized void startRequest() {
        if (sClient == null) {
            sClient = new OkHttpClient();
        }
        if (sWebSocket == null) {
            Request request = new Request.Builder().url("ws://echo.websocket.org").build();
            EchoWebSocketListener listener = new EchoWebSocketListener();
            sWebSocket = sClient.newWebSocket(request, listener);
        }
    }
    private static void sendMessage(WebSocket webSocket) {
        webSocket.send("Knock, knock!");
        webSocket.send("Hello!");
        webSocket.send(ByteString.decodeHex("deadbeef"));
    }
    public static void sendMessage() {
        WebSocket webSocket;
        synchronized (WebsocketClient.class) {
            webSocket = sWebSocket;
        }
        if (webSocket != null) {
            sendMessage(webSocket);
        }
    }
    public static synchronized void closeWebSocket() {
        if (sWebSocket != null) {
            sWebSocket.close(NORMAL_CLOSURE_STATUS, "Goodbye!");
            sWebSocket = null;
        }
    }
    public static synchronized void destroy() {
        if (sClient != null) {
            sClient.dispatcher().executorService().shutdown();
            sClient = null;
        }
    }
    private static void resetWebSocket() {
        synchronized (WebsocketClient.class) {
            sWebSocket = null;
        }
    }
    public static class EchoWebSocketListener extends WebSocketListener {
        private static final String TAG = "EchoWebSocketListener";
        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            sendMessage(webSocket);
        }
        @Override
        public void onMessage(WebSocket webSocket, String text) {
            Log.i(TAG, "Receiving: " + text);
        }
        @Override
        public void onMessage(WebSocket webSocket, ByteString bytes) {
            Log.i(TAG, "Receiving: " + bytes.hex());
        }
        @Override
        public void onClosing(WebSocket webSocket, int code, String reason) {
            webSocket.close(NORMAL_CLOSURE_STATUS, null);
            Log.i(TAG, "Closing: " + code + " " + reason);
            resetWebSocket();
        }
        @Override
        public void onClosed(WebSocket webSocket, int code, String reason) {
            Log.i(TAG, "Closed: " + code + " " + reason);
        }
        @Override
        public void onFailure(WebSocket webSocket, Throwable t, Response response) {
            t.printStackTrace();
            resetWebSocket();
        }
    }
}
```

**具体的websocket源码实现**

**1、发送http请求进行握手**
```
  final Request request = originalRequest.newBuilder()
        .header("Upgrade", "websocket")
        .header("Connection", "Upgrade")
        .header("Sec-WebSocket-Key", key)
        .header("Sec-WebSocket-Version", "13")
        .build();

Upgrade 和 Connection header 向服务器表明，
请求的目的就是要将客户端和服务器端的通讯协议从 HTTP 协议升级到 WebSocket 协议，同时在请求处理完成之后，连接不要断开。


Sec-WebSocket-Key header值正是我们前面看到的key，
它是 WebSocket 客户端发送的一个 base64 编码的密文，要求服务端必须返回一个对应加密的 
“Sec-WebSocket-Accept” 应答，否则客户端会抛出 “Error during WebSocket handshake” 错误，并关闭连接。
```
**2、为数据收发做准备**
```
1.检查http响应
checkResponse(Response response)

2.初始化用于输入输出的 Source 和 Sink
public final class RealConnection extends Http2Connection.Listener implements Connection {
  . . . . . .
  public RealWebSocket.Streams newWebSocketStreams(final StreamAllocation streamAllocation) {
    return new RealWebSocket.Streams(true, source, sink) {
      @Override public void close() throws IOException {
        streamAllocation.streamFinished(true, streamAllocation.codec());
      }
    };
  }

```
**3、调用回调 onOpen()**
**4、初始化 Reader 和 Writer：**
```
OkHttp使用 WebSocketReader 和 WebSocketWriter 来处理数据的收发
```
**数据发送**
通过 WebSocket 接口的 send(String text) 和 send(ByteString bytes) 分别发送文本的和二进制格式的消息。
**数据保活**
通过ping和pong



### httpclient
```
HttpClient client = new DefaultHttpClient();
// 创建一个Post请求HttpPost post = new HttpPost(url);// 将参数设置到Post请求里面
}

List<NameValuePair> params = new ArrayList<NameValuePair>();
params.add(new BasicNameValuePair("username", name));
params.add(new BasicNameValuePair("pwd", pwd));
         HttpEntity entity = new UrlEncodedFormEntity(params);    
              post.setEntity(entity);
              //       执行一个Post请求   
                    HttpResponse response = client.execute(post); 
                            if (response.getStatusLine().getStatusCode()==200) 
                            {            InputStream is = response.getEntity().getContent(); 
                                       BufferedReader reader=new BufferedReader(new InputStreamReader(is));  
                                                 return reader.readLine(); 
                                                         }

```


## glide
<https://github.com/bumptech/glide>  
```
1、使用步骤
    1）在build.gradle中添加依赖：
        compile 'com.github.bumptech.glide:glide:3.7.0'
    2）如果你的项目没有support-v4库，还需要添加support-v4依赖：
         compile 'com.android.support:support-v4:23.3.0'
    3）如果使用变换，可以添加一个自定义的变换库
        github网址：
https://github.com/wasabeef/glide-transformations
        添加依赖：
            compile 'jp.wasabeef:glide-transformations:2.0.1'
                // If you want to use the GPU Filters
compile 'jp.co.cyberagent.android.gpuimage:gpuimage-library:1.3.0'   
```

```
Glide.with()使用
    （1）with(Context context).
        使用Application上下文，Glide请求将不受Activity/Fragment生命周期控制。
    （2）with(Activity activity).
        使用Activity作为上下文，Glide的请求会受到Activity生命周期控制。
    （3）with(FragmentActivity activity).
        Glide的请求会受到FragmentActivity生命周期控制。
    （4）with(android.app.Fragment fragment).
        Glide的请求会受到Fragment 生命周期控制。
    （5）with(android.support.v4.app.Fragment fragment).
        Glide的请求会受到Fragment生命周期控制。
```
```
3）load()使用
    Glide基本可以load任何可以拿到的媒体资源
    SD卡资源：load("file://"+ Environment.getExternalStorageDirectory().getPath()+"/test.jpg")
    assets资源：load("file:///android_asset/f003.gif")
    raw资源：load("Android.resource://com.frank.glide/raw/raw_1")或load("android.resource://com.frank.glide/raw/"+R.raw.raw_1)
    drawable资源：load("android.resource://com.frank.glide/drawable/news")或load("android.resource://com.frank.glide/drawable/"+R.drawable.news)
    ContentProvider资源：load("content://media/external/images/media/139469")
    http资源：load("http://img.my.csdn.NET/uploads/201508/05/1438760757_3588.jpg")
    https资源：load("https://img.alicdn.com/tps/TB1uyhoMpXXXXcLXVXXXXXXXXXX-476-538.jpg_240x5000q50.jpg_.webp")
    注意：
        load不限于String类型
            还可以是：load(Uri uri)，load(File file)，load(Integer resourceId)，load(URL url)，load(byte[] model)，load(T model)，loadFromMediaStore(Uri uri)。
```
加载小视频  
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/4665843459.png)
```
（5）获取缓存大小：
    new GetDiskCacheSizeTask(textView).execute(new File(getCacheDir(), DiskCache.Factory.DEFAULT_DISK_CACHE_DIR));
```
```
（1）禁止内存缓存：
     .skipMemoryCache(true)
（2）清除内存缓存：
     // 必须在UI线程中调用
    Glide.get(context).clearMemory();
（3）禁止磁盘缓存：
     .diskCacheStrategy(DiskCacheStrategy.NONE)
（4）清除磁盘缓存：
     // 必须在后台线程中调用，建议同时clearMemory()
   Glide.get(applicationContext).clearDiskCache();
```
指定资源的优先加载顺序  
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/345346456.png)
先显示缩略图，再显示原图  
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/43468764.png)
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/65598735934.png)
```
api方法说明：

5）API方法说明
    （1）thumbnail(float sizeMultiplier).
        请求给定系数的缩略图。如果缩略图比全尺寸图先加载完，就显示缩略图，否则就不显示。系数sizeMultiplier必须在(0,1)之间，可以递归调用该方法。
    （2）sizeMultiplier(float sizeMultiplier).
        在加载资源之前给Target大小设置系数。
    （3）diskCacheStrategy(DiskCacheStrategy strategy).
        设置缓存策略。DiskCacheStrategy.SOURCE：缓存原始数据，DiskCacheStrategy.RESULT：缓存变换(如缩放、裁剪等)后的资源数据，DiskCacheStrategy.NONE：什么都不缓存，DiskCacheStrategy.ALL：缓存SOURC和RESULT。默认采用DiskCacheStrategy.RESULT策略，对于download only操作要使用DiskCacheStrategy.SOURCE。
    （4）priority(Priority priority).
        指定加载的优先级，优先级越高越优先加载，但不保证所有图片都按序加载。枚举Priority.IMMEDIATE，Priority.HIGH，Priority.NORMAL，Priority.LOW。默认为Priority.NORMAL。
    （5）dontAnimate().
        移除所有的动画。
    （6）animate(int animationId).
        在异步加载资源完成时会执行该动画。
    （7）animate(ViewPropertyAnimation.Animator animator).
        在异步加载资源完成时会执行该动画。
    （8）placeholder(int resourceId).
        设置资源加载过程中的占位Drawable。
    （9）placeholder(Drawable drawable).
        设置资源加载过程中的占位Drawable。
    （10）fallback(int resourceId).
        设置model为空时要显示的Drawable。如果没设置fallback，model为空时将显示error的Drawable，如果error的Drawable也没设置，就显示placeholder的Drawable。
    （11）fallback(Drawable drawable).
        设置model为空时显示的Drawable。
    （12）error(int resourceId).
        设置load失败时显示的Drawable。
    （13）error(Drawable drawable).
        设置load失败时显示的Drawable。
    （14）listener(RequestListener<? super ModelType, TranscodeType> requestListener).
        监听资源加载的请求状态，可以使用两个回调：onResourceReady(R resource, T model, Target<R> target, boolean isFromMemoryCache, boolean isFirstResource)和onException(Exception e, T model, Target&lt;R&gt; target, boolean isFirstResource)，但不要每次请求都使用新的监听器，要避免不必要的内存申请，可以使用单例进行统一的异常监听和处理。
    （15）skipMemoryCache(boolean skip).
        设置是否跳过内存缓存，但不保证一定不被缓存（比如请求已经在加载资源且没设置跳过内存缓存，这个资源就会被缓存在内存中）。
    （16）override(int width, int height).
        重新设置Target的宽高值（单位为pixel）。
    （17）into(Y target).
        设置资源将被加载到的Target。
    （18）into(ImageView view).
        设置资源将被加载到的ImageView。取消该ImageView之前所有的加载并释放资源。
    （19）into(int width, int height).
        后台线程加载时要加载资源的宽高值（单位为pixel）。
    （20）preload(int width, int height).
        预加载resource到缓存中（单位为pixel）。
    （21）asBitmap().
        无论资源是不是gif动画，都作为Bitmap对待。如果是gif动画会停在第一帧。
    （22）asGif().
        把资源作为GifDrawable对待。如果资源不是gif动画将会失败，会回调.error()。
```

### 缓存
<https://www.jianshu.com/p/a5f1d662e053>  
```
DiskCacheStrategy.NONE 不缓存文件
DiskCacheStrategy.SOURCE 只缓存原图
DiskCacheStrategy.RESULT 只缓存最终加载的图（默认的缓存略）
DiskCacheStrategy.ALL 同时缓存原图和结果图
```
### 图片裁剪
<https://www.jianshu.com/p/1f246811de42>  
### 添加请求header
```
GlideUrl glideUrl = new GlideUrl(url, new LazyHeaders.Builder()
.addHeader(“Cookie”, mToken)
.build());
Glide.with(this)
.load(glideUrl)
.error(R.mipmap.report_im)
.into(viewHolderAttr.reort_icon);
```
### 加载gif
```
Glide.with(this).load(imageUrl).asBitmap().into(imageView);//显示gif静态图片
Glide.with(this).load(imageUrl).asGif().into(imageView);//显示gif动态图片
```
### 清理glide缓存
```
缓存的动态清理Glide.get(this).clearDiskCache();
//清理磁盘缓存 需要在子线程中执行
Glide.get(this).clearMemory();
//清理内存缓存 可以在UI主线程中进行
```
<https://www.cnblogs.com/whoislcj/p/5558168.html>  



## 下载
rxdownload  
<https://github.com/ssseasonnn/RxDownload/blob/master/README.ch.md>  
okdownload(支持断点续传)
<https://github.com/lingochamp/okdownload/blob/master/README-zh.md>  
安卓自带DownloadManager
```
顶部显示进度条
// String url = "https://imtt.dd.qq.com/16891/E79991943FADFCDD05A18F993CCFBBA6.apk?fsname=com.tencent.mm_6.7.2_1340.apk&csr=1bbd";
// DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
// request.setDescription("Some descrition");
// request.setTitle("Some title");
//// in order for this if to run, you must use the android 3.2 to compile your app
// if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
// request.allowScanningByMediaScanner();
// request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
// }
// request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "name-of-the-file.apk");
//
//// get download service and enqueue file
// DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
// manager.enqueue(request);
```

## okhttp-digest
<https://github.com/rburgst/okhttp-digest>


