# webview

[[toc]]

<https://github.com/Justson/AgentWeb>

## 使用与优化

简单使用  
<https://www.tuicool.com/articles/rAr2umr>

当 activity 执行生命周期的时候，这里需要注意的是在 onDestroy 的时候，需要销毁 WebView，不然也会出现内存泄漏的。  
 判断网页加载是否成功

```
webview.setwebchromeclient(  );
重写  onProgressChanged（Webview webview， int newProgress ）方法
 if（newProgress == 100）  ---加载完成
else ： ProgressDialog 组件
dialog.setprogressStyle（）
dialog.setProgress（）
```

缓存的使用：  
优先使用缓存

```
webview。getsettings。setcacheMOde（Websettings.Load_Chache_else_network）
```

启动窗口特征，在 app 窗口顶部显示进度条

```
  requestWindowFeature(Window.FEATURE_PROGRESS);
```

在顶部右侧显示显示进度条

```
setProgressBarVisibility(true);
```

缓存的使用：  
优先使用缓存

```
webview。getsettings。setcacheMOde（Websettings.Load_Chache_else_network）
```

启动窗口特征，在 app 窗口顶部显示进度条

```
  requestWindowFeature(Window.FEATURE_PROGRESS);
```

在顶部右侧显示显示进度条

```
setProgressBarVisibility(true);
```

---

```
webView.loadUrl("www.baidu.com");//WebView加载的网页使用loadUrl
WebSettings webSettings = webView.getSettings();//获得WebView的设置
webSettings.setUseWideViewPort(true);// 设置此属性，可任意比例缩放
webSettings.setLoadWithOverviewMode(true);//适配
webSettings.setJavaScriptEnabled(true);  //支持js
webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);  //设置 缓存模式
webSettings.setDomStorageEnabled(true);// 开启 DOM storage API 功能
webSettings.setDatabaseEnabled(true);//开启 database storage API 功能
webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);//HTTPS，注意这个是在LOLLIPOP以上才调用的
webSettings.setAppCacheEnabled(true);//开启 Application Caches 功能
webSettings.setBlockNetworkImage(true);//关闭加载网络图片，在一开始加载的时候可以设置为true，当加载完网页的时候再设置为false
```

## 监听加载进度

```
webView.setWebChromeClient(new WebChromeClient() {
     @Override
     public void onProgressChanged(WebView view, int newProgress) {
         //加载的进度
     }
     @Override
     public void onReceivedTitle(WebView view, String title) {
         //获取WebView的标题
     }
    @Override
    public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
        return super.onJsAlert(view, url, message, result);
        //Js 弹框
    }
    @Override
    public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
        AlertDialog.Builder b = new AlertDialog.Builder(IllegalQueryActivity.this);
        b.setTitle("删除");
        b.setMessage(message);
        b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                result.confirm();
            }
        });
        b.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                result.cancel();
            }
        });
        b.create().show();
        return true;
    }
});
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
       //需要设置在当前WebView中显示网页，才不会跳到默认的浏览器进行显示
       return true;
    }
    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        super.onReceivedError(view, request, error);
        //加载出错了
    }
    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        //加载完成
    }
});
webView.setDownloadListener(new DownLoadListener());//下载监听
private class DownLoadListener implements DownloadListener {
    @Override
    public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimetype, long contentLength) {

    }
}
```

## webview 方问 https

```
   wvTest = (WebView) this.findViewById(R.id.wvTest);
         wvTest.setWebViewClient(new WebViewClient() {
             public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error){
                 //handler.cancel(); // Android默认的处理方式
                 handler.proceed();  // 接受所有网站的证书
                 //handleMessage(Message msg); // 进行其他处理
             }
         });
         wvTest.getSettings().setJavaScriptEnabled(true);
         wvTest.getSettings().setDefaultTextEncodingName("gb2312");
         wvTest.loadUrl("https://login.taobao.com/");

     }
```

## WebView 加载 https 和 http 混合，导致图片不显示问题

```
在webview加载页面之前
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
     webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
```

## webview 和 h5 交互

由来
如果界面上的数据大部分是由服务端获取，并且逻辑经常性变化，这样的页面比较适合使用 WebView 做实现

1. 将 WebView 写到布局里，然后需要一些设置

```
mWebView = (WebView) findViewById(R.id.web_view);
 mWebView.setBackgroundColor(Color.TRANSPARENT);
 WebSettings webSettings = mWebView.getSettings();
 webSettings.setJavaScriptEnabled(true);
 webSettings.setSupportZoom(true);
 mWebView.setWebViewClient(new WebViewClient(){
     @Override
     public boolean shouldOverrideUrlLoading(WebView view, String url) {
         view.loadUrl(url);
         return true;
     }
     @Override
     public void onPageStarted(WebView view, String url, Bitmap favicon) {
         super.onPageStarted(view, url, favicon);
     }
     @Override
     public void onPageFinished(WebView view, String url) {
         super.onPageFinished(view, url);
     }
     @Override
     public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
         super.onReceivedHttpError(view, request, errorResponse);
         Log.i(TAG,"http error: request="+request +" errorResponse:" + errorResponse);
         showErrorAlertDialog(getString(R.string.url_disable));
     }
     @Override
     public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
         super.onReceivedSslError(view, handler, error);
         Log.i(TAG,"receiver ssl error :"+error);
         handler.proceed();
         showErrorAlertDialog(getString(R.string.url_disable));
     }
     @Override
     public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
         super.onReceivedError(view, request, error);
         Log.i(TAG,"server error:"+error.toString());
         showErrorAlertDialog(getString(R.string.url_disable));
     }
 });
mWebView.loadUrl(xxxxxxx);
```

WebView 默认有个白色的背景需要去掉，然后就是 WebView 支持 JS 代码，支持缩放

2)本地代码和服务端交互
服务端调用本地代码(以网页显示 Toast 提示为例)：

```
public final class Contact{
    protected VipIndexWebViewActivity activity;
    protected WebView webView;
    public  Contact(VipIndexWebViewActivity _activity,WebView _mwebview){
        this.activity = _activity;
        this.webView = _mwebview;
    }
    @JavascriptInterface
    public void showToast(String str){
        Log.i(TAG,"showToast");
        Toast.makeText(VipIndexWebViewActivity.this, str, Toast.LENGTH_LONG).show();
    }
}
```

需要定义交互类 Contact，并且实现 showToast 方法，要特别注意要加上@JavascriptInterface 的注解
在 loadUrl 之前,需要将交互类对象传到 WebView 中供 HTML 调用

```
mWebView.addJavascriptInterface(new Contact(TestActivity.this, mWebView), "contact");
```

HTML 中简单 JS 示例

```

<html>
<body>
<script language="javascript">
  function toast() {
    window.contant.testToast("tip");
  }
</script>

<style type="text/css">
</style>

<a href="#" onClick="toast()">testToast</a>
</body>
```

本地代码调用服务端代码(网页响应遥控器按键)

```
@Override
public boolean onKeyDown(int keyCode,KeyEvent event){
    Log.i(TAG,"onkey="+event.toString());
    switch (keyCode){
        case KeyEvent.KEYCODE_DPAD_UP:
            mWebView.loadUrl("javascript:move("+1+")");
            return true;
        case KeyEvent.KEYCODE_DPAD_RIGHT:
            mWebView.loadUrl("javascript:move("+2+")");
            return true;
        case KeyEvent.KEYCODE_DPAD_DOWN:
            mWebView.loadUrl("javascript:move("+3+")");
            return true;
        case KeyEvent.KEYCODE_DPAD_LEFT:
            mWebView.loadUrl("javascript:move("+4+")");
            return true;
        case KeyEvent.KEYCODE_DPAD_CENTER:
            return true;
    }
    return false;
}
```

HTML 做出响应，基本能模拟出遥控器的效果

需要注意的问题
1）关于网页端对屏幕大小的计算，这个和 WebView 的配置有关，不一定和实际的物理分辨率相同，所以一般整个网页都需要交给 HTML 显示即可
2）关于混淆文件，@JavascriptInterface 的注解不能混淆，不然 WebView 找不到相应的方法

```
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```

3）关于 https 的证书错误，onReceivedSslError 方法会有打印，有可能服务端的证书不受信

## 页面缩放

```
        // mMainView.getSettings().setDefaultZoom(WebSettings.ZoomDensity.CLOSE);
        mMainView.canZoomIn();
        mMainView.zoomIn();
//支持javascript
        web.getSettings().setJavaScriptEnabled(true);
// 设置可以支持缩放
        web.getSettings().setSupportZoom(true);
// 设置出现缩放工具
        web.getSettings().setBuiltInZoomControls(true);
//扩大比例的缩放
        web.getSettings().setUseWideViewPort(true);
//自适应屏幕
        web.getSettings().setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN);
        web.getSettings().setLoadWithOverviewMode(true);

禁止缩放
网页源码：meta标签
user-scalable : 用户是否可以手动缩放，值可以是：
①yes、 true允许用户缩放；②no、false不允许用户缩放
```
