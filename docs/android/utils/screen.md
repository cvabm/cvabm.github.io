# ScreenUtils


[[toc]]



## 调节屏幕亮度
```
系统级亮度：


/**
* 设置当前屏幕亮度的模式
*
* @param mode 1 为自动调节屏幕亮度,0 为手动调节屏幕亮度
*/
public static void setScreenMode(int mode) {
try {
Settings.System.putInt(APP.getInstance().getContentResolver(),
Settings.System.SCREEN_BRIGHTNESS_MODE, mode);
Uri uri = Settings.System
.getUriFor("screen_brightness_mode");
APP.getInstance().getContentResolver().notifyChange(uri, null);
} catch (Exception e) {
e.printStackTrace();
}
}


/**
* 保存当前的屏幕亮度值，并使之生效
*
* @param paramInt 0-255
*/
public static void setScreenBrightness(int paramInt) {
Settings.System.putInt(APP.getInstance().getContentResolver(),
Settings.System.SCREEN_BRIGHTNESS, paramInt);
Uri uri = Settings.System
.getUriFor("screen_brightness");
APP.getInstance().getContentResolver().notifyChange(uri, null);
}

只在当前页面最亮：


1. public class activityBrightnessManager{  
2.   
3.    /**
4.      * 设置当前activity的屏幕亮度
5.      *
6.      * @param paramFloat 0-1.0f
7.      * @param activity   需要调整亮度的activity
8.      */  
9.     public static void setActivityBrightness(float paramFloat, Activity activity) {  
10.         Window localWindow = activity.getWindow();  
11.         WindowManager.LayoutParams params = localWindow.getAttributes();  
12.         params.screenBrightness = paramFloat;  
13.         localWindow.setAttributes(params);  
14.     }  
15.   
16.     /**
17.      * 获取当前activity的屏幕亮度
18.      *
19.      * @param activity 当前的activity对象
20.      * @return 亮度值范围为0-0.1f，如果为-1.0，则亮度与全局同步。
21.      */  
22.     public static float getActivityBrightness(Activity activity) {  
23.         Window localWindow = activity.getWindow();  
24.         WindowManager.LayoutParams params = localWindow.getAttributes();  
25.         return params.screenBrightness;  
26.     }  
27. }
---
最大亮度  

<uses-permission android:name="android.permission.READ_PHONE_STATE" />
if (Build.VERSION.SDK_INT < 23) {
Settings.System.putInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE, 0);//设置为手动亮度
Settings.System.putInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, 255);//设置亮度最大
}

大于23：
设置单个界面
getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

禁止休眠：
1、在Manifest.xml文件里面用user-permission声明。代码如下：
 <uses-permission android:name=”android.permission.WAKE_LOCK”>
 </uses-permission>
 　　这种方法，在安装apk时，系统会提示安装人是否允许使用禁止休眠功能。

```
## 监听手指上下左右滑动
```


//手指按下的点为(x1, y1)手指离开屏幕的点为(x2, y2)
float x1 = 0;
float x2 = 0;
float y1 = 0;
float y2 = 0;

@Override
public boolean onTouchEvent(MotionEvent event) {
//继承了Activity的onTouchEvent方法，直接监听点击事件
if(event.getAction() == MotionEvent.ACTION_DOWN) {
//当手指按下的时候
x1 = event.getX();
y1 = event.getY();
}
if(event.getAction() == MotionEvent.ACTION_UP) {
//当手指离开的时候
x2 = event.getX();
y2 = event.getY();
if(y1 - y2 > 50) {
Toast.makeText(MainActivity.this, "向上滑", Toast.LENGTH_SHORT).show();
} else if(y2 - y1 > 50) {
Toast.makeText(MainActivity.this, "向下滑", Toast.LENGTH_SHORT).show();
} else if(x1 - x2 > 50) {
Toast.makeText(MainActivity.this, "向左滑", Toast.LENGTH_SHORT).show();
} else if(x2 - x1 > 50) {
Toast.makeText(MainActivity.this, "向右滑", Toast.LENGTH_SHORT).show();
}
}
return super.onTouchEvent(event);
}

```
## 调用显示触摸位置功能  
```
android.provider.Settings.System.putInt(getContentResolver(), "show_touches", 1);

<uses-permission android:name="android.permission.WRITE_SETTINGS"/>
```

## 获取屏幕尺寸

·
 ### //取得窗口属性
 ```

        getWindowManager().getDefaultDisplay().getMetrics(dm);

        //窗口的宽度
        int screenWidth = dm.widthPixels;
        //窗口高度
        int screenHeight = dm.heightPixels;
        textView = (TextView)findViewById(R.id.textView01);
        textView.setText("屏幕宽度: " + screenWidth + "\n屏幕高度： " + screenHeight);
```

### 获取状态栏高度
```

decorView是window中的最顶层view，可以从window中获取到decorView，然后decorView有个getWindowVisibleDisplayFrame方法可以获取到程序显示的区域，包括标题栏，但不包括状态栏。
于是，我们就可以算出状态栏的高度了。
view plain

Rect frame = new Rect();
getWindow().getDecorView().getWindowVisibleDisplayFrame(frame);
int statusBarHeight = frame.top;
```
### 获取标题栏高度
```
getWindow().findViewById(Window.ID_ANDROID_CONTENT)这个方法获取到的view就是程序不包括标题栏的部分，然后就可以知道标题栏的高度了。
view plain

int contentTop = getWindow().findViewById(Window.ID_ANDROID_CONTENT).getTop();
//statusBarHeight是上面所求的状态栏的高度
int titleBarHeight = contentTop - statusBarHeight
```


## 屏幕适配

今日头条方案
<https://github.com/JessYanCoding/AndroidAutoSize>  
smallWidth限定符方案
<https://juejin.im/post/5ba197e46fb9a05d0b142c62>


<https://www.jianshu.com/p/98c0cf6bd373>  

<https://www.jianshu.com/p/5d5494dd6dbe>  
<https://blog.csdn.net/u011200604/article/details/52786880>  

图片适配：将不同尺寸的图片放入不同的drawable文件夹下
大小顺序：ldpi < drawable < mdpi < hdpi < xhdpi < xxhdpi
找图原则：自己尺寸下的找不到先往大的找再往小的找；mdpi手机例外找完自己先找drawable，再按规律找。

dimens适配：根据不同尺寸在values文件夹中定义dimens常量
xhdpi 1280*720
xxhdpi  1920*1080

基准线：mdpi，160dp = 160px；ldpi，0.75x；hdpi，1.5x；xhdpi，2.0x
计算：px = dp * 密度比
获得密度比：getResources().getDisplayMetrice().density

布局适配：创建一个layout-1280x720文件夹，会被该尺寸的手机默认调用。
注意大尺寸的layout放上面

代码适配：
获取屏幕宽高，获取其父控件，然后再给子控件设置相应规则getWindowManager().getDefaultDisplay().getWidth()/.getHeigth();
设置控件：view.setLayoutParams(new LayoutParams(width,heigth))
可以防反编译获取layout

权重适配
该属性的作用是决定控件在其父布局中的显示权重，一般用于线性布局中。其值越小，则对应的layout_width或layout_height的优先级就越高（一般到100作用就不太明显了）；
于是就有了现在最为流行的0px设值法。看似让人难以理解的layout_height=0px的写法，结合layout_weight，却可以使控件成正比例显示，轻松解决了当前Android开发最为头疼的碎片化问题之一。
：在布局文件中通过weight和weightSum来适配屏幕
使用9patch图
```
public class DensityUtil {

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }
}
```

