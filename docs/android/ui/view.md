1、新建res/values/attrs.xml
```
<?xml version="1.0" encoding="utf-8" ?>
<resources>
    <declare-styleable name="PersonAttr">
        <attr name="name" format="reference" />
    </declare-styleable>
</resources>
```
2、新建Person类
```

@SuppressLint("AppCompatCustomView")
public class Person extends TextView {
    public Person(Context context, AttributeSet attrs) {
        super(context, attrs);
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.PersonAttr);
        String string = typedArray.getString(R.styleable.PersonAttr_name);
        typedArray.recycle();
        setText(string);
    }
}
```
3、布局中使用
```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:personattr="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.xiaoming.minio.Person
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        personattr:name="@string/myname" />
</RelativeLayout>
```
## 自定义view
- drawPoint
- drawLine
- drawRect
- drawBitmap
- drawCircle
- drawOval
- drawArc
- drawColor
- drawText
- drawPicture  录制canvas操作再显示出来
- drawPath
- matrix 用于对位图进行缩放、旋转、平移等变换操作


 - 画个心形
 ```
 float left = 100;  // 左侧弧线和下方线段的起始点 x 坐标
float top = 100;  // 弧线和下方线段的起始点 y 坐标
float radius = 100;  // 弧线的半径

// 创建一个 Path 对象
Path path = new Path();

// 定义心形的路径
RectF leftArc = new RectF(left, top, left + radius, top + radius);
RectF rightArc = new RectF(left + radius, top, left + 2 * radius, top + radius);

path.addArc(leftArc, -225, 225); // 左侧弧线
path.arcTo(rightArc, -180, 225, false); // 右侧弧线
path.lineTo(left + radius, top + 2 * radius); // 下方线段
path.close(); // 封闭路径

// 绘制路径
canvas.drawPath(path, paint);
 ```
# 渲染
- canvas 底层是skia 简单的2D图形绘制
- openGL 高性能复杂2d或3d绘制
