## 控件

[[toc]]

### AppCompatActivity

```
2：和toolbar的结合：
布局中加入：
<android.support.v7.widget.Toolbar
    android:id="@+id/activity_main_toolbar"
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    android:minHeight="?attr/actionBarSize"
    android:background="?attr/colorPrimary">

</android.support.v7.widget.Toolbar>

    修改apptheme为：
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">

在activity中加入方法：


public void initActionBar() {
     setTitle("123"); // 设置标题
    Toolbar toolbar = (Toolbar) findViewById(R.id.activity_main_toolbar);

//设置标题另一种方法
toolbar.setTitle("345");
toolbar.setTitleTextColor(this.getResources().getColor(R.color.colorAccent));

    setSupportActionBar(toolbar);

     //设置返回键背景图和点击事件
     toolbar.setNavigationIcon(R.mipmap.ic_launcher);
     toolbar.setNavigationOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        finish();
    }
});
}

```

### EditText

- `android:focusableInTouchMode="true"`不自动获取焦点

### 变下划线颜色

```
<resources>
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
<item name="colorAccent">@color/colorPrimary</item>
<!-- AppCompatEditText默认状态状态设置底线颜色 -->
<item name="colorControlNormal">#3F51b5</item>
<!-- AppCompatEditText选择的底线颜色 -->
<item name="colorControlActivated">#c61</item>
</style>

</resources>
```

### 取输入焦点

```
<EditText
    android:id="@+id/editTextName"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <requestFocus/>
</EditText>
```

## gridview

```
1：新建数据源
2：新建适配器（SimpleAdatper
3：Gridveiw加载适配器
4：gridview配置事件监听器（onoIttemclicklistiner）

private List<Map> dataList;
SimpleAdapter adapter;
三个重要属性
   android:horizontalSpacing="5dp"  两列间距

        android:numColumns="3"  列数

        android:verticalSpacing="5dp"  两行间距
```

## ImageView、ImageButton、Button 区别

```
1.继承不同：java.lang.Object ↳ android.view.View ↳android.widget.ImageView ↳ android.widget.ImageButton Java.lang.Object ↳ Android.view.View ↳ android.widget.TextView ↳android.widget.Button
因而ImageButton 不支持setText﻿，而Button支持。反之，ImageButton 支持setImageURI﻿，而Button不支持。Button和ImageButton有Button的状态，但是ImageView没有。

2.显示差异：
imageView 加上可点击的属性同样实现button的点击功能，这样看来没啥区别，可是可是，最近我做的listView，一个imagebutton，一个imageView 显示圆角图片的时候，imageBotton 居然显示不出来.
ImageButton 拥有默认背景：
<style name="Widget.ImageButton">
     <item name="android:focusable">true</item>
     <item name="android:clickable">true</item>
     <item name="android:scaleType">center</item>
     <item name="android:background">@android:drawable/btn_default</item>
 </style>
3.支持图片：
别人说 ：ImageButton支持9.png 吧~imangeView就不行了。
```

## progressbar 进度条

<https://www.cnblogs.com/liqw/p/3995794.html>

## PopupWindow 和 AlertDialog 区别

本质区别为：AlertDialog 是非阻塞式对话框：AlertDialog 弹出时，后台还可以做事情；  
而 PopupWindow 是阻塞式对话框：PopupWindow 弹出时，程序会等待，在 PopupWindow 退出前，程序一直等待，只有当我们调用了 dismiss 方法的后，PopupWindow 退出，程序才会向下执行。  
它们的不同点在于：AlertDialog 的位置固定，而 PopupWindow 的位置可以随意

PopupWindow 的位置按照有无偏移分，可以分为偏移和无偏移两种；按照参照物的不同，可以分为相对于某个控件（Anchor 锚）和相对于父控件。具体如下

```
showAsDropDown(View anchor)：相对某个控件的位置（正左下方），无偏移
showAsDropDown(View anchor, int xoff, int yoff)：相对某个控件的位置，有偏移
showAtLocation(View parent, int gravity, int x, int y)：相对于父控件的位置（例如正中央Gravity.CENTER，下方Gravity.BOTTOM等），可以设置偏移或无偏移
PopupWindow pw = new PopupWindow(view,width,height);
pw.setContentView(popupconten);//重新设置PopupWindow的内容
pw.setFocusable(true);//默认是false，为false时，PopupWindow没有获得焦点能力，如果这是PopupWindow的内容中有EidtText，需要输入，这是是无法输入的；只有为true的时候，PopupWindow才具有获得焦点能力，EditText才是真正的EditText。
pw.setAsDropDown(View view);//设置PopupWindow弹出的位置。
```

## ratingbar

```
<RatingBar
    android:id="@+id/star_num"
    style="@style/foodRatingBar"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:isIndicator="false"
    android:numStars="5"
    android:rating="5"
    android:stepSize="1.0"/>


style.xml：
<style name="foodRatingBar" parent="@android:style/Widget.RatingBar">
    <!--指向star_rating_bar_full.xml文件 -->
    <item name="android:progressDrawable">@drawable/star_rating_bar_full</item>
    <item name="android:minHeight">15dip</item>
    <item name="android:maxHeight">15dip</item>
    <!-- 是否不支持用户交互，只应作为指标。 -->
    <item name="android:isIndicator">true</item>
</style>


star_rating_bar_full.xml
<?xml version="1.0" encoding="UTF-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">
    <!-- 背景色 -->
    <item
        android:id="@android:id/background"
        android:layout_height="wrap_content"
        android:drawable="@drawable/star_n"/>
    <!-- 没选中状态 -->
    <!-- 选中状态 -->
    <item
        android:id="@android:id/progress"
        android:layout_height="wrap_content"
        android:drawable="@drawable/star"/>
</layer-list>


private RatingBar bar;
bar = (RatingBar) findViewById(R.id.star_num);
bar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
    @Override
    public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
        Log.i("tag",String.valueOf((int) (bar.getRating())));
    }
});
```

## RelativeLayout 中实现控件平分屏幕

```
<RelativeLayout
    android:layout_width="fill_parent"
    android:layout_height="wrap_content">
    <View
     android:id="@+id/placeholder"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_centerHorizontal="true"/>
    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_alignRight="@id/placeholder"
        android:layout_alignParentLeft="true"
        android:text="Left"/>
    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_alignLeft="@id/placeholder"
        android:layout_alignParentRight="true"
        android:text="Right"/></RelativeLayout>
```

## scrollview

ScrollView 内部只能有一个子元素，即不能并列两个子元素，
所以需要把所有的子元素放到一个 LinearLayout 内部或 RelativeLayout 等其他布局方式。

不显示滚动条
android:scrollbars="none"
水平滚动条
HorizontalScrollView

scrollTo -- 滚动一次
scrollBy --- 连续滚动

## snackebar

```
前提条件：


compile 'com.android.support:appcompat-v7:25.1.0'
compile 'com.android.support:support-v4:25.1.0'
compile 'com.android.support:design:25.1.0'
版本号必须一致。


1：布局中加入：


<android.support.design.widget.CoordinatorLayout
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"/>


2：代码：
CoordinatorLayout container;
container = (CoordinatorLayout) findViewById(R.id.container);

点击事件加入：


Snackbar.make(container, "This is a Snackbar", Snackbar.LENGTH_SHORT)
        .setAction("Cancel", new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            }
        })
        .show();


3：报错解决：

修改主题：

<style name="AppTheme" parent="Base.AppTheme" type="text/css"><!-- Customize your theme here. --></style>
<!-- Base application theme. -->
<style name="Base.AppTheme" parent="Theme.AppCompat.Light.DarkActionBar" type="text/css">
    <item name="colorPrimary">#673AB7</item>
    <item name="colorPrimaryDark">#512DA8</item>
    <item name="colorAccent">#FF4081</item>
</style>


```

## spinner

```
简单使用

        ArrayList arrayList = new ArrayList();
        arrayList.add("警务通");
        arrayList.add("执法记录仪");
        arrayList.add("会议系统");
        arrayList.add("pc端");
        arrayList.add("对讲机");
        arrayList.add("电话");
        ArrayAdapter arrayAdapter = new ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, arrayList);
        this.spinner.setAdapter(arrayAdapter);
        this.spinner2.setAdapter(arrayAdapter);
        this.spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onNothingSelected(AdapterView<?> adapterView) {
            }

            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long j) {
                callee1_device_type = (i + 1) + "";
                adapterView.setVisibility(View.VISIBLE);
            }
        });
```

## textview

### 加下划线

静态

```
android:autoLink="all"
```

动态

```
tvTest.getPaint().setFlags(Paint.UNDERLINE_TEXT_FLAG); //下划线
tvTest.getPaint().setAntiAlias(true);//抗锯齿
```

<https://www.cnblogs.com/popfisher/p/5191242.html>

### 框

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle" >
   <solid android:color="#ffffff" />
   <stroke android:width="1dip" android:color="#4fa5d5"/>
</shape>
```

<https://blog.csdn.net/jwzhangjie/article/details/9404823>

### 个 TextView 里显示不同样式的字体

```
不同颜色
public static SpannableStringBuilder getHomeTitlePageType(String text, String suffix) {
SpannableStringBuilder mText = new SpannableStringBuilder("#" + text + "#" + suffix);
ForegroundColorSpan foregroundColorSpan = new ForegroundColorSpan(ContextCompat.getColor(App.getContext(), R.color.colorPrimary));
mText.setSpan(foregroundColorSpan, 0, mText.length() - suffix.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
return mText;
}
不同字体
textSpan.setSpan(new AbsoluteSizeSpan(20),0,start,Spannable.SPAN_INCLUSIVE_INCLUSIVE);
textSpan.setSpan(new AbsoluteSizeSpan(12),start,end,Spannable.SPAN_INCLUSIVE_INCLUSIVE);
```

<https://blog.csdn.net/mp624183768/article/details/78873547>

### 粗

```
tv.setTypeface(Typeface.defaultFromStyle(Typeface.BOLD));
tv.getPaint().setFakeBoldText(true);

```

### 行文字多个变量

```
<string name="textname">你%1$s好%2$s嗎</string>
String a = getString(R.string.textname,"hello","world");

a可打印出 ：你hello好world吗

```

## toast

自定义 toast 布局  
<https://blog.csdn.net/u014752325/article/details/51691070#>  
多次点击只显示一次

```
public class Util {
    private static Toast toast;
    public static void showToast(Context context,
        String content) {
        if (toast == null) {
            toast = Toast.makeText(context,
                         content,
                         Toast.LENGTH_SHORT);
        } else {
            toast.setText(content);
        }
        toast.show();
    }
}
```

### android 启动白屏

```
   <style name="AppTheme.Splash" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="android:windowBackground">@drawable/splash</item>
    </style>

配置文件：android:theme="@style/AppTheme.Splash"

MainActivity的onCreate加入：
final Window win = getWindow();
win.setBackgroundDrawable(null);
super.onCreate(savedInstanceState);

```

## 要判断控件是否绘制完成，可以使用以下两种方法：

1. 使用 ViewTreeObserver：

```
ViewTreeObserver viewTreeObserver = yourView.getViewTreeObserver();
viewTreeObserver.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
    @Override
    public void onGlobalLayout() {
        // 在该回调方法中，可以执行控件绘制完成后的操作
        // 可以获取控件的宽高等属性
        // 注意：如果只需要监听一次绘制完成事件，需要在适当的时候移除监听器
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            yourView.getViewTreeObserver().removeOnGlobalLayoutListener(this);
        } else {
            yourView.getViewTreeObserver().removeGlobalOnLayoutListener(this);
        }
    }
});
```

2. 使用 View 的 post 方法：

```
yourView.post(new Runnable() {
    @Override
    public void run() {
        // 在该Runnable中，可以执行控件绘制完成后的操作
        // 可以获取控件的宽高等属性
    }
});
```

这两种方法都可以在控件绘制完成后执行相应的操作。注意，如果控件的绘制发生改变（如布局重新绘制或尺寸改变），可能会再次触发绘制完成的事件。

选择哪种方法取决于具体情况和需求。`ViewTreeObserver`适用于对控件绘制状态进行长期观察，而`View`的`post`方法则适合于一次性的操作。
