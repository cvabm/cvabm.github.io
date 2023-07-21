# 动画
[[toc]]
## Android Transition Framework详解---超炫的动画框架  
<https://www.jianshu.com/p/e497123652b5>  
## 进出场动画  
![avatar](https://github.com/cvabm/FigureBed/raw/master/img/Image.png)
<!-- https://github.com/cvabm/FigureBed/blob/master/img/Image.png?raw=true -->

```
bt.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_in_left));
拷贝系统目录xml动画到项目的anim文件夹中即可调用。
```
<https://github.com/andkulikov/Transitions-Everywhere>  

```

compile "com.andkulikov:transitionseverywhere:1.6.5"

1：滑动动画 ，llyout为整个布局根布局

public void onFadeClick() {
Transition transition = new Slide(Gravity.LEFT);
transition.setDuration(1000);
TransitionManager.beginDelayedTransition(llyout, transition);
tv.setVisibility(tv.getVisibility() == View.GONE ? View.VISIBLE : View.GONE); }

2：渐变动画：


Transition transition = new Fade(Fade.IN);
transition.setDuration(1000);
TransitionManager.beginDelayedTransition(llyout, transition);
tv.setVisibility(tv.getVisibility() == View.GONE ? View.VISIBLE : View.GONE);



3：混合使用：

Transition transition = new TransitionSet()
.addTransition(new Slide())
.addTransition(new Fade());
transition.setDuration(200);
TransitionManager.beginDelayedTransition(llyout, transition);
tv.setVisibility(tv.getVisibility() == View.GONE ? View.VISIBLE : View.GONE);

4：文字渐变效果：
Use transition classes from package com.transitionseverywhere.* instead of android.transition.* from android framework Transitions API.


boolean colorTag;

public void add(View view) {
TransitionManager.beginDelayedTransition(llyout, new Recolor().setDuration(1000));
if (colorTag) {
tv.setTextColor(getResources().getColor(R.color.colorAccent));
tv.setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.colorPrimaryDark)));
} else {
tv.setTextColor(getResources().getColor(R.color.colorPrimary));
tv.setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.colorAccent)));
}
colorTag = !colorTag;
}


5：缩放动画：

Transition transition = new Scale(0.1f);
transition.setDuration(1000);
TransitionManager.beginDelayedTransition(llyout, transition);
tv.setVisibility(tv.getVisibility() == View.GONE ? View.VISIBLE : View.GONE);

6：修改文字：


boolean colorTag;

public void add(View view) {
TransitionManager.beginDelayedTransition(llyout, new ChangeText().setChangeBehavior(ChangeText
.CHANGE_BEHAVIOR_OUT_IN).setDuration(500));
colorTag = !colorTag;
if (colorTag) {
tv.setText("文字我改了");
} else {
tv.setText("文字又复原了");
}
}


7： 文字和控件翻转，旋转

boolean colorTag;

public void add(View view) {
TransitionManager.beginDelayedTransition(llyout, new Rotate().setDuration(1000));
colorTag = !colorTag;
if (colorTag) {
bt.setRotation(90);
tv.setRotation(180);
} else {
bt.setRotation(0);
tv.setRotation(0);
}
}

8：其他配置：
指定特定动画对象
配置 Transitions 也非常容易，你可以给一些特殊目标的 View 指定 Transitions，仅仅只有它们才能有动画增加动画目标
	* 
addTarget(View target) . view
	* 
addTarget(int targetViewId).  通过view 的id
	* 
addTarget(String targetName)  .与 TransitionManager
	* 
.setTransitionName 方法设定的标识符相对应。
	* 
addTarget(Class targetType) . 类的类型 ，比如android.
	* 
widget.TextView.class。

移除动画目标
	* 
removeTarget(View target)
	* 
removeTarget(int targetId)
	* 
removeTarget(String targetName)
	* 
removeTarget(Class target)

排除不想做动画的view
	* 
excludeTarget(View target, boolean exclude)
	* 
excludeTarget(int targetId, boolean exclude)
	* 
excludeTarget(Class type, boolean exclude)
	* 
excludeTarget(Class type, boolean exclude)

排除某个 ViewGroup 的所有子 View
	* 
excludeChildren(View target, boolean exclude)
	* 
excludeChildren(int targetId, boolean exclude)
	* 
excludeChildren(Class type, boolean exclude)


```
## drawableLeft使用
```
1.在XML中使用
android:drawableLeft="@drawable/icon"

2.代码中动态变化
Drawable drawable= getResources().getDrawable(R.drawable.drawable);
/// 这一步必须要做,否则不会显示.
drawable.setBounds(0, 0, drawable.getMinimumWidth(), drawable.getMinimumHeight());
editview.setCompoundDrawables(drawable,null,null,null);
```
### 更多使用  
<https://www.jianshu.com/p/ff634a3ce107>    

## view坐标相关
getX()和getY()获得的是相对view(父布局)的左上角的坐标（这两个值不会超过view的长度和宽度）。

getTranslationX() getTranslationY()
view相对于最初位置的变化量。始终是相对于最初的位置。
同时我们也可以使用set方法比如setTranslationX来动态改变view的位置。所以这一组坐标存在的意义就是为了view的位置变化使用的。

getLeft() getTop() getRight() getBottom()
这四个坐标是指一个view的边际距离父布局的距离。

getPivotX() getPivotY()
view旋转和缩放的时候的中心点

getRotationY
getRotationX， 
此方法用于获取View在X，y轴上的旋转角度


getrawx,getRawy
相对于屏幕左上角的坐标



TouchSlop
系统能识别出被认为滑动的最小距离，如果两次滑动小于这个常量，就不被认为滑动。
## TransitionDrawable实现渐变效果
```
private void setImageBitmap(ImageView imageView, Bitmap bitmap) {
final TransitionDrawable td = new TransitionDrawable(new Drawable[]{new ColorDrawable(R.color.colorAccent), new BitmapDrawable(imageView.getContext().getResources(), bitmap)});
imageView.setBackgroundDrawable(imageView.getDrawable());
imageView.setImageDrawable(td);
td.startTransition(200);
}
```

## 高斯模糊
```
public Bitmap getBlurBitmap(Bitmap bmp) {
    Bitmap bitmap = bmp.copy(bmp.getConfig(), true);
    final RenderScript rs = RenderScript.create(MineUserPersonageActivity.this);
    final Allocation input = Allocation.createFromBitmap(rs, bmp, Allocation.MipmapControl.MIPMAP_NONE,
            Allocation.USAGE_SCRIPT);
    final Allocation output = Allocation.createTyped(rs, input.getType());
    final ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(rs, Element.U8_4(rs));
    script.setRadius(10 /* e.g. 3.f */);
    script.setInput(input);
    script.forEach(output);
    output.copyTo(bitmap);
    return bitmap;
}
```
RenderScript处理方式（效率高一点）：    
https://github.com/mmin18/RealtimeBlurView  

## 切换app图标
```
   <activity-alias
        android:name=".SplashAliasActivity"  //可以不存在
        android:enabled="false"
        android:icon="@mipmap/icon_logo"
        android:targetActivity=".MainActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity-alias>



// 禁用原图标
        ComponentName old = new ComponentName(getApplicationContext(), MainActivity.class);
        getApplicationContext().getPackageManager().setComponentEnabledSetting(old, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
// 启用新图标
        ComponentName newCom = new ComponentName(getApplicationContext(), "com.soft.learndemo.SplashAliasActivity");
        getApplicationContext().getPackageManager().setComponentEnabledSetting(newCom, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);

```