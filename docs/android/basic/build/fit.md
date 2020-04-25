# 适配
[[toc]]
## Android7.0
```
http://blog.csdn.net/Wen_Demo/article/details/51943201?locationNum=1&fps=1

http://blog.csdn.net/axi295309066/article/details/52886948
http://blog.csdn.net/honjane/article/details/52057132
http://blog.csdn.net/Arlen6310/article/details/53638209
http://www.07net01.com/program/2016/09/1671780.html
```

```
华为市场不兼容android7.0解决办法：

build.grade文件中改：complieSdkVersion 为25
```

## Android 6.0 设备上动态获取权限

```
例子：应用内调用拨打电话



final public static int REQUEST_CODE_ASK_CALL_PHONE = 123;

if (Build.VERSION.SDK_INT >= 23) {
    int checkCallPhonePermission = ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CALL_PHONE);
    if (checkCallPhonePermission != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE}, REQUEST_CODE_ASK_CALL_PHONE);
        return;
    } else {
        callDirectly("123");
    }
}



@Override
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    switch (requestCode) {
        case REQUEST_CODE_ASK_CALL_PHONE:
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission Granted
                callDirectly("111");
            } else {
                Toast.makeText(MainActivity.this, "CALL_PHONE Denied", Toast.LENGTH_SHORT)
                        .show();
            }
            break;
        default:
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}



private void callDirectly(String mobile) {
    Intent intent = new Intent();
    intent.setAction("android.intent.action.CALL");
    intent.setData(Uri.parse("tel:" + mobile));
    MainActivity.this.startActivity(intent);
}
```