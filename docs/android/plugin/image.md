## glide

<https://github.com/bumptech/glide>

```java
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

```java
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

```java
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

### 添加请求 header

```java
GlideUrl glideUrl = new GlideUrl(url, new LazyHeaders.Builder()
.addHeader(“Cookie”, mToken)
.build());
Glide.with(this)
.load(glideUrl)
.error(R.mipmap.report_im)
.into(viewHolderAttr.reort_icon);
```

### 加载 gif

```java
Glide.with(this).load(imageUrl).asBitmap().into(imageView);//显示gif静态图片
Glide.with(this).load(imageUrl).asGif().into(imageView);//显示gif动态图片
```

### 清理 glide 缓存

```java
缓存的动态清理Glide.get(this).clearDiskCache();
//清理磁盘缓存 需要在子线程中执行
Glide.get(this).clearMemory();
//清理内存缓存 可以在UI主线程中进行
```

<https://www.cnblogs.com/whoislcj/p/5558168.html>

### glide 圆角

```java
    //设置图片圆角角度
        RoundedCorners roundedCorners = new RoundedCorners(10);//px
        placeholderOptions.optionalTransform(roundedCorners);

       Glide.with(fragment)
                .load(imagePath)
                .thumbnail(thumbnailRequest)
                .apply(placeholderOptions)
                .into(imageView);
```


## fresco
##  android-gif-drawable
