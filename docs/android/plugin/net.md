# 网络请求

[[toc]]

## eventbus

<https://github.com/greenrobot/EventBus>

## fast networking

[一行代码搞定]
<https://github.com/amitshekhariitbhu/Fast-Android-Networking>

## okhttp

okhttp 下载、断点续传<https://mp.weixin.qq.com/s?__biz=MzA5MzI3NjE2MA==&mid=2650238800&idx=1&sn=edf37925bc998ccb9d69912bb1f2cd2d&chksm=88639e3fbf141729a6a02d8feda0e12bea97aa17e6482d22e1d8b7b6cf0ed92889239549acee&mpshare=1&scene=23&srcid=0612r5ry9kRHyLRmUOakAKUR##>

### dns 问题

```java

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

```java
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

### Retrofit 自定义 GsonConverter 处理所有请求错误情况

<https://www.jianshu.com/p/5b8b1062866b>

### okhttp 几种用法

```java
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

### Okhttp 的 websocket 使用

```java
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

**具体的 websocket 源码实现**

**1、发送 http 请求进行握手**

```java
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

```java
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
通过 ping 和 pong

### httpclient

```java
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


## 下载

rxdownload  
<https://github.com/ssseasonnn/RxDownload/blob/master/README.ch.md>  
okdownload(支持断点续传)
<https://github.com/lingochamp/okdownload/blob/master/README-zh.md>  
安卓自带 DownloadManager

```java
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
