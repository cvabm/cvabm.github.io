# selector

## selector使用
```
分为drawalbe-selector和color-selector

<?xml version="1.0" encoding="utf-8"?>
<selectorxmlns:android="http://schemas.android.com/apk/res/android">
<item android:drawable="@drawable/login_blue_pressed" android:state_pressed="true"/>
<item android:drawable="@drawable/login_blue_pressed"android:state_focused="true"/>
<item android:drawable="@drawable/login_blue_normal" />

<itemandroid:color="#ffffff" android:state_pressed="true"/>
</selector>
```
可和<shape>和<layer-list>(图层效果)配合使用

