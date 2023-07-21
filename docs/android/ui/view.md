1、新建attrs.xml
```java
<?xml version="1.0" encoding="utf-8" ?>
<resources>
    <declare-styleable name="PersonAttr">
        <attr name="name" format="reference" />
    </declare-styleable>
</resources>
```
2、新建Person类
```java

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
```js
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