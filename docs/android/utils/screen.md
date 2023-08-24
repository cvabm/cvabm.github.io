# ScreenUtils

[[toc]]

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

## 屏幕适配

今日头条方案
<https://github.com/JessYanCoding/AndroidAutoSize>  
smallWidth 限定符方案
<https://juejin.im/post/5ba197e46fb9a05d0b142c62>

<https://www.jianshu.com/p/98c0cf6bd373>

<https://www.jianshu.com/p/5d5494dd6dbe>  
<https://blog.csdn.net/u011200604/article/details/52786880>

图片适配：将不同尺寸的图片放入不同的 drawable 文件夹下
大小顺序：ldpi < drawable < mdpi < hdpi < xhdpi < xxhdpi
找图原则：自己尺寸下的找不到先往大的找再往小的找；mdpi 手机例外找完自己先找 drawable，再按规律找。

dimens 适配：根据不同尺寸在 values 文件夹中定义 dimens 常量
xhdpi 1280*720
xxhdpi 1920*1080

基准线：mdpi，160dp = 160px；ldpi，0.75x；hdpi，1.5x；xhdpi，2.0x
计算：px = dp \* 密度比
获得密度比：getResources().getDisplayMetrice().density

布局适配：创建一个 layout-1280x720 文件夹，会被该尺寸的手机默认调用。
注意大尺寸的 layout 放上面

代码适配：
获取屏幕宽高，获取其父控件，然后再给子控件设置相应规则 getWindowManager().getDefaultDisplay().getWidth()/.getHeigth();
设置控件：view.setLayoutParams(new LayoutParams(width,heigth))
可以防反编译获取 layout

权重适配
该属性的作用是决定控件在其父布局中的显示权重，一般用于线性布局中。其值越小，则对应的 layout_width 或 layout_height 的优先级就越高（一般到 100 作用就不太明显了）；
于是就有了现在最为流行的 0px 设值法。看似让人难以理解的 layout_height=0px 的写法，结合 layout_weight，却可以使控件成正比例显示，轻松解决了当前 Android 开发最为头疼的碎片化问题之一。
：在布局文件中通过 weight 和 weightSum 来适配屏幕
使用 9patch 图

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
