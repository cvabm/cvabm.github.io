# UI相关框架

[[toc]]
<https://github.com/lygttpod/SuperTextView>  
<https://github.com/RuffianZhong/RWidgetHelper>  
<https://github.com/vdiskmobile/android-image-map>



  可伸缩布局：  
<http://www.cnblogs.com/huolongluo/p/6607877.html>    
<https://github.com/google/flexbox-layout>
## 圆形头像：  
<https://github.com/hdodenhof/CircleImageView>

## qmui：  
<https://github.com/Tencent/QMUI_Android>
## 图表：  
<https://github.com/lecho/hellocharts-android>
## dialog：
<https://github.com/orhanobut/dialogplus>  
7种形式的Android Dialog使用举例  
<https://www.jianshu.com/p/1801f323ba8a>  
<https://github.com/afollestad/material-dialogs>  
```
挪动dialog位置
Window mWindow = dialog.getWindow();  
WindowManager.LayoutParams lp = mWindow.getAttributes();  
lp.x = 10;   //新位置X坐标  
lp.y = -100; //新位置Y坐标  

dialog.onWindowAttributesChanged(lp);
```
## 选择器

[地址、颜色、民族、出生日期等等 选择器：](https://github.com/gzu-liyujiang/AndroidPicker)    

```
时间选择器

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="fill_parent"
              android:layout_height="fill_parent"
              android:orientation="vertical" >
    <DatePicker
        android:id="@+id/datePicker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal" />
    <TimePicker
        android:timePickerMode="spinner" // android6.0默认为圆盘模式，添加此选项改为上下滚动模式
        android:id="@+id/timePicker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal" />
    <EditText
        android:id="@+id/show"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:cursorVisible="false"
        android:editable="false" />
</LinearLayout>
```
```
package demo.fastvi.com.mytest;
import java.util.Calendar;
import android.app.Activity;
import android.os.Bundle;
import android.widget.DatePicker;
import android.widget.DatePicker.OnDateChangedListener;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.TimePicker.OnTimeChangedListener;
public class MainActivity extends Activity {
    private DatePicker mDatePicker;
    private TimePicker mTimePicker;
    private EditText mEditText;
    // 定义5个记录当前时间的变量
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
    }
    private void initView() {
        mDatePicker = (DatePicker) findViewById(R.id.datePicker);
        mTimePicker = (TimePicker) findViewById(R.id.timePicker);
        mEditText = (EditText) findViewById(R.id.show);
        // 获取当前的年、月、日、小时、分钟
        Calendar c = Calendar.getInstance();
        year = c.get(Calendar.YEAR);
        month = c.get(Calendar.MONTH);
        day = c.get(Calendar.DAY_OF_MONTH);
        hour = c.get(Calendar.HOUR);
        minute = c.get(Calendar.MINUTE);
        //初始化DatePicker组件，初始化时指定监听器
        mDatePicker.init(year, month, day, new OnDateChangedListener() {
            @Override
            public void onDateChanged(DatePicker arg0, int year, int month,
                                      int day) {
                MainActivity.this.year = year;
                MainActivity.this.month = month;
                MainActivity.this.day = day;
                // 显示当前日期、时间
                showDate(year, month, day, hour, minute);
            }
        });
        // 为TimePicker指定监听器
        mTimePicker.setOnTimeChangedListener(new OnTimeChangedListener() {
            @Override
            public void onTimeChanged(TimePicker arg0, int hour, int minute) {
                MainActivity.this.hour = hour;
                MainActivity.this.minute = minute;
                // 显示当前日期、时间
                showDate(year, month, day, hour, minute);
            }
        });
    }
    // 定义在EditText中显示当前日期、时间的方法
    private void showDate(int year, int month, int day, int hour, int minute) {
        mEditText.setText("日期为：" + year + "年" + month + "月" + day + "日  "
                + hour + "时" + minute + "分");
    }
}
```



[下拉刷新]( https://github.com/scwang90/SmartRefreshLayout)  
[alert弹框:](https://github.com/Tapadoo/Alerter)  
[一二三四级联动](https://www.ctolib.com/FourLevelLinkage.html)  
[Android多级树形列表](https://github.com/zhangke3016/MultilevelTreeList)  
 [多级列表树形图](https://github.com/TellH/RecyclerTreeView)

各种例子  
<https://www.diycode.cc/projects/afollestad/material-dialogs>

## 轮播图：  
<https://github.com/Jude95/RollViewPager>
## 进度条
自定义原型进度条（波浪型  
<https://github.com/MyLifeMyTravel/CircleProgress>
## 新手引导层  
<https://github.com/qiushi123/GuideView-master>  
## 图片相关：  
图片加载：<https://github.com/bumptech/glide>  
图片选择器    
<https://github.com/BravianZhao/MultiImageSelector/blob/master/README_zh.md>    
<https://github.com/crazycodeboy/TakePhoto>    
<https://github.com/BravianZhao/MultiImageSelector/blob/master/README_zh.md>  

查看大图，图片旋转，手势缩放：   
第一个是<https://github.com/chrisbanes/PhotoView>这个库，应用非常广泛，start数量极高。  
第二个是<https://github.com/bm-x/PhotoView>这个支持旋转功能，在我公司的项目也用的是这个库  


## xutils
xUtils 包含了很多实用的android工具。  
xUtils 支持大文件上传，更全面的http请求协议支持(10种谓词)，拥有更加灵活的ORM，更多的事件注解支持且不受混淆影响...  
xUitls 最低兼容android 2.2 (api level 8)  

目前xUtils主要有四大模块：  

DbUtils模块：

android中的orm框架，一行代码就可以进行增删改查；  
支持事务，默认关闭；  
可通过注解自定义表名，列名，外键，唯一性约束，NOT NULL约束，CHECK约束等（需要混淆的时候请注解表名和列名）；  
支持绑定外键，保存实体时外键关联实体自动保存或更新；  
自动加载外键关联实体，支持延时加载；  
支持链式表达查询，更直观的查询语义，参考下面的介绍或sample中的例子。


ViewUtils模块：  

android中的ioc框架，完全注解方式就可以进行UI，资源和事件绑定；  
新的事件绑定方式，使用混淆工具混淆后仍可正常工作；  
目前支持常用的20种事件绑定，参见ViewCommonEventListener类和包com.lidroid.xutils.view.annotation.event。  


HttpUtils模块：

支持同步，异步方式的请求；  
支持大文件上传，上传大文件不会oom；  
支持GET，POST，PUT，MOVE，COPY，DELETE，HEAD，OPTIONS，TRACE，CONNECT请求；  
下载支持301/302重定向，支持设置是否根据Content-Disposition重命名下载的文件；  
返回文本内容的请求(默认只启用了GET请求)支持缓存，可设置默认过期时间和针对当前请求的过期时间。  

BitmapUtils模块：
 
加载bitmap的时候无需考虑bitmap加载过程中出现的oom和android容器快速滑动时候出现的图片错位等现象；  
支持加载网络图片和本地图片；  
内存管理使用lru算法，更好的管理bitmap内存；  
可配置线程加载线程数量，缓存大小，缓存路径，加载显示动画等...  
## 选色控件 
<https://github.com/jaredrummler/ColorPicker>  
## 状态栏效果：
SystemBarTint沉浸式
<https://www.jianshu.com/p/8e5c4f64ede0>
## 弹幕：
<https://github.com/Bilibili/DanmakuFlameMaster>

## lottie 复杂动画效果
<https://juejin.im/post/5b62e2bae51d4534c34a65e3>  