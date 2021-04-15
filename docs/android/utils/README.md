# 工具类
[[toc]]
## dp、sp、px转换
```
/** * dp、sp 转换为 px 的工具类 * *
@author fxsky 2012.11.12 * */
public class DisplayUtil {
/** * 将px值转换为dip或dp值，保证尺寸大小不变 * * @param pxValue * @param scale * （DisplayMetrics类中属性density） * @return */
public static int px2dip(Context context, float pxValue) {
final float scale = context.getResources().getDisplayMetrics().density;
return (int) (pxValue / scale + 0.5f);
}

/** * 将dip或dp值转换为px值，保证尺寸大小不变 * * @param dipValue * @param scale * （DisplayMetrics类中属性density） * @return */
public static int dip2px(Context context, float dipValue) {
final float scale = context.getResources().getDisplayMetrics().density;
return (int) (dipValue * scale + 0.5f);
}

/** * 将px值转换为sp值，保证文字大小不变 * * @param pxValue * @param fontScale * （DisplayMetrics类中属性scaledDensity） * @return */
public static int px2sp(Context context, float pxValue) {
final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
return (int) (pxValue / fontScale + 0.5f);
}

/** * 将sp值转换为px值，保证文字大小不变 * * @param spValue * @param fontScale * （DisplayMetrics类中属性scaledDensity） * @return */
public static int sp2px(Context context, float spValue) {
final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
return (int) (spValue * fontScale + 0.5f);
}
}
```
## 保留小数点后几位
```
DecimalFormat format = new DecimalFormat("#.###");
Log.d(TAG, "onCreate: " + format.format(1234.345346));
```

## 获取设备所有信息
获取sd卡总内存和剩余内存
```
public static String[] getSDCardInfo() {
    try {
        String tatalGB;
        String avaliGB;
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            File sdcardDir = Environment.getExternalStorageDirectory();
            StatFs sf = new StatFs(sdcardDir.getPath());
            long blockSize2 = sf.getBlockSize();
            long blockCount2 = sf.getBlockCount();
            long availCount2 = sf.getAvailableBlocks();
            java.text.DecimalFormat df = new java.text.DecimalFormat("0.00");
            double total = blockSize2 * blockCount2 / 1024 / 1024 / 1024d;
            double avail = availCount2 * blockSize2 / 1024 / 1024 / 1024d;
            tatalGB = df.format(total) + "GB";
            avaliGB = df.format(avail) + "GB";
            String[] size = new String[2];
            size[0] = tatalGB;
            size[1] = avaliGB;
            return size;
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return null;
}
```
获取设备arm架构信息（执行shell）   
```


public void click(View view) {
    String s = execCmd("getprop ro.product.cpu.abi");
    Log.d(TAG, "click: "+s);
}

public static String execCmd(String cmd) {
    DataOutputStream dos = null;
    String result = "";
    String lastline = " ";
    try {
        Process process = Runtime.getRuntime().exec(cmd);// 经过Root处理的android系统即有su命令
        //get the err line

        InputStream stderr = process.getErrorStream();
        InputStreamReader isrerr = new InputStreamReader(stderr);
        BufferedReader brerr = new BufferedReader(isrerr);

        //get the output line
        InputStream outs = process.getInputStream();
        InputStreamReader isrout = new InputStreamReader(outs);
        BufferedReader brout = new BufferedReader(isrout);
        String errline = null;


        // get the whole error message
        String line = "";

        while ((line = brerr.readLine()) != null) {
            result += line;
            result += "/n";
        }

        if (result != "") {
            // put the result string on the screen
            Log.i(TAG, " the str error message " + result.toString());
        }

        // get the whole standard output string
        while ((line = brout.readLine()) != null) {
            lastline = line;
            result += line;
            result += "/n";
        }
        if (result != "") {
            // put the result string on the screen
            Log.i(TAG, " the standard output message " + lastline.toString());
        }
    } catch (Throwable t) {
        t.printStackTrace();
    }
    return lastline.toString();
}
```
硬件信息  
```


    //获取总运行内存的大小
    private long getTotalMemory() {
//        MemTotal:         341780 kB
        try {
            FileInputStream fis = new FileInputStream(new File("/proc/meminfo"));
            //包装一个一行行读取的流
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fis));
            //取到所有的内存信息
            String memTotal = bufferedReader.readLine();

            StringBuffer sb = new StringBuffer();

            for (char c : memTotal.toCharArray()) {

                if (c >= '0' && c <= '9') {
                    sb.append(c);
                }
            }
            //为了方便格式化 所以乘以1024
            long totalMemory = Long.parseLong(sb.toString()) * 1024;
            Log.d(TAG, "总的运行内存单位 kb: " + memTotal);

            return totalMemory;

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }



    private void getAvailMemory(Context context) {
        // 获取android当前可用内存大小
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
        am.getMemoryInfo(mi);
        //mi.availMem; 当前系统的可用内存
        System.out.println("总内存---->>>" + mi.totalMem);
        System.out.println("可用内存---->>>" + mi.availMem);
        System.out.println("阈值内存---->>>" + mi.threshold);
    }
```


## 获取手机剩余空间    
 ```   
 public static long storageSize() {return Environment.getExternalStorageDirectory().getUsableSpace();}
 ```

## 获取手机信息
```

//获取手机号码  
TelephonyManager tm = (TelephonyManager)this.getSystemService(Context.TELEPHONY_SERVICE);  
 String deviceid = tm.getDeviceId();//获取智能设备唯一编号  
  String te1  = tm.getLine1Number();//获取本机号码  
  String imei = tm.getSimSerialNumber();//获得SIM卡的序号  
  String imsi = tm.getSubscriberId();//得到用户Id  
```
## 手机动态内存RAM的获取  
```


1.手机动态内存RAM的获取
//获取手机总动态内存ram大小
public  String getTotalRam() {
try {
File file = new File("/proc/meminfo");
FileInputStream fis = new FileInputStream(file);
BufferedReader br = new BufferedReader(new InputStreamReader(fis));
// MemTotal: 253604 kB
String result = br.readLine();
//提取一行里面的数字
StringBuffer sb = new StringBuffer();
char[] chars = result.toCharArray();
for (char c : chars) {
if (c >= '0' && c <= '9') {
sb.append(c);
}
}
//单位是kB,所以要转换成byte,方便用Formatter.formatFileSize方法格式化成字符串.
long number= Long.parseLong(sb.toString()) * 1024;
return Formatter.formatFileSize(this, number);
} catch (Exception e) {
e.printStackTrace();
return null;
}
}
//获取手机剩余动态内存ram大小


1.方式一:
public String getAvailRam(Context context) {
ActivityManager am = (ActivityManager) context
.getSystemService(Context.ACTIVITY_SERVICE);
ActivityManager.MemoryInfo outInfo = new MemoryInfo();
am.getMemoryInfo(outInfo);
 long number=outInfo.availMem;
return Formatter.formatFileSize(this, number);
}



2.方式二:
public String getInternalAvailSize() {
StatFs mDataFileStats = new StatFs("/data");
long freeStorage = (long) mDataFileStats.getAvailableBlocks()
* mDataFileStats.getBlockSize();
return Formatter.formatFileSize(this, freeStorage);
}



```

## 调用市场play    
 ```
Uri uri = Uri.parse("market://details?id=" + context.getPackageName());
Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
try {
startActivity(goToMarket);
} catch (ActivityNotFoundException e) {

}
```
## 动态切换全屏  
```
//切换到全屏
getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
//切换到非全屏
getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
getWindow().addFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
```

## 判断是否是平板  
```
public static boolean isTablet(Context context) {
return (context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
}
```
## 截取当前屏幕截图  
```
public static Bitmap captureContent(Activity activity) {
View view = activity.getWindow().getDecorView();
view.setDrawingCacheEnabled(true);
view.buildDrawingCache();
Bitmap b1 = view.getDrawingCache();
Rect frame = new Rect();
activity.getWindow().getDecorView().getWindowVisibleDisplayFrame(frame);
int statusBarHeight = frame.top;
int width = activity.getWindowManager().getDefaultDisplay().getWidth();
int height = activity.getWindowManager().getDefaultDisplay().getHeight();
Bitmap b = Bitmap.createBitmap(b1, 0, statusBarHeight, width, height - statusBarHeight);
view.destroyDrawingCache();
return b;
}
```


## 一键退出app
```

1：activity控制类
public class ActivityControl {
    public static List<Activity> list = new ArrayList<Activity>();

    public static void addActivity(Activity activity) {
        list.add(activity);
    }

    public static void removeAcrtivity(Activity activity) {
        list.remove(activity);
    }

    public static void finishAll() {
        for (Activity activity : list) {
            if (!activity.isFinishing()) {
                activity.finish();
            }
        }
    }
}

2：
public class BaseActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState, PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        ActivityControl.addActivity(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ActivityControl.removeAcrtivity(this);
    }
}

其他每个类都继承baseactivity

3：
在需要退出app的事件：
ActivityControl.finishAll();

```
 
## 判断服务是否启动
```
package com.vondear.rxtools;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;

import java.util.List;

/**
 * @author vondear
 * @date 2016/9/24
 */

public class RxServiceTool {

    /**
     * 获取服务是否开启
     *
     * @param context   上下文
     * @param className 完整包名的服务类名
     * @return {@code true}: 是<br>{@code false}: 否
     */
    public static boolean isRunningService(Context context, String className) {
        // 进程的管理者,活动的管理者
        ActivityManager activityManager = (ActivityManager)
                context.getSystemService(Context.ACTIVITY_SERVICE);
        // 获取正在运行的服务，最多获取1000个
        List<ActivityManager.RunningServiceInfo> runningServices = activityManager.getRunningServices(1000);
        // 遍历集合
        for (ActivityManager.RunningServiceInfo runningServiceInfo : runningServices) {
            ComponentName service = runningServiceInfo.service;
            if (className.equals(service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}

```
## 经纬度定位工具(转换)
```
package com.vondear.rxtools;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.vondear.rxtools.model.Gps;
import com.vondear.rxtools.view.RxToast;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Locale;

/**
 * @author vondear
 * @date 2016/11/13
 * @desc 定位相关工具类
 */
public class RxLocationTool {

    public static double pi = 3.1415926535897932384626;
    public static double a = 6378245.0;
    public static double ee = 0.00669342162296594323;
    private static OnLocationChangeListener mListener;
    private static MyLocationListener myLocationListener;
    private static LocationManager mLocationManager;

    /**
     * 判断Gps是否可用
     *
     * @return {@code true}: 是<br>{@code false}: 否
     */
    public static boolean isGpsEnabled(Context context) {
        LocationManager lm = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        return lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    /**
     * 判断定位是否可用
     *
     * @return {@code true}: 是<br>{@code false}: 否
     */
    public static boolean isLocationEnabled(Context context) {
        LocationManager lm = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        return lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER) || lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    /**
     * 打开Gps设置界面
     */
    public static void openGpsSettings(Context context) {
        Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * 注册
     * <p>使用完记得调用{@link #unRegisterLocation()}</p>
     * <p>需添加权限 {@code <uses-permission android:name="android.permission.INTERNET"/>}</p>
     * <p>需添加权限 {@code <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>}</p>
     * <p>需添加权限 {@code <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>}</p>
     * <p>如果{@code minDistance}为0，则通过{@code minTime}来定时更新；</p>
     * <p>{@code minDistance}不为0，则以{@code minDistance}为准；</p>
     * <p>两者都为0，则随时刷新。</p>
     *
     * @param minTime     位置信息更新周期（单位：毫秒）
     * @param minDistance 位置变化最小距离：当位置距离变化超过此值时，将更新位置信息（单位：米）
     * @param listener    位置刷新的回调接口
     * @return {@code true}: 初始化成功<br>{@code false}: 初始化失败
     */
    public static boolean registerLocation(Context context, long minTime, long minDistance, OnLocationChangeListener listener) {
        if (listener == null) return false;
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions((Activity) context, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            ActivityCompat.requestPermissions((Activity) context, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
            return false;
        }
        mLocationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        mListener = listener;
        if (!isLocationEnabled(context)) {
            RxToast.showToast(context, "无法定位，请打开定位服务", 500);
            return false;
        }
        String provider = mLocationManager.getBestProvider(getCriteria(), true);

        Location location = mLocationManager.getLastKnownLocation(provider);
        if (location != null) listener.getLastKnownLocation(location);
        if (myLocationListener == null) myLocationListener = new MyLocationListener();
        mLocationManager.requestLocationUpdates(provider, minTime, minDistance, myLocationListener);
        return true;
    }

    /**
     * 注销
     */
    public static void unRegisterLocation() {
        if (mLocationManager != null) {
            if (myLocationListener != null) {
                mLocationManager.removeUpdates(myLocationListener);
                myLocationListener = null;
            }
            mLocationManager = null;
        }
    }

    /**
     * 设置定位参数
     *
     * @return {@link Criteria}
     */
    private static Criteria getCriteria() {
        Criteria criteria = new Criteria();
        //设置定位精确度 Criteria.ACCURACY_COARSE比较粗略，Criteria.ACCURACY_FINE则比较精细
        criteria.setAccuracy(Criteria.ACCURACY_FINE);
        //设置是否要求速度
        criteria.setSpeedRequired(false);
        // 设置是否允许运营商收费
        criteria.setCostAllowed(false);
        //设置是否需要方位信息
        criteria.setBearingRequired(false);
        //设置是否需要海拔信息
        criteria.setAltitudeRequired(false);
        // 设置对电源的需求
        criteria.setPowerRequirement(Criteria.POWER_LOW);
        return criteria;
    }

    /**
     * 根据经纬度获取地理位置
     *
     * @param context   上下文
     * @param latitude  纬度
     * @param longitude 经度
     * @return {@link Address}
     */
    public static Address getAddress(Context context, double latitude, double longitude) {
        Geocoder geocoder = new Geocoder(context, Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (addresses.size() > 0) return addresses.get(0);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 根据经纬度获取所在国家
     *
     * @param context   上下文
     * @param latitude  纬度
     * @param longitude 经度
     * @return 所在国家
     */
    public static String getCountryName(Context context, double latitude, double longitude) {
        Address address = getAddress(context, latitude, longitude);
        return address == null ? "unknown" : address.getCountryName();
    }

    /**
     * 根据经纬度获取所在地
     *
     * @param context   上下文
     * @param latitude  纬度
     * @param longitude 经度
     * @return 所在地
     */
    public static String getLocality(Context context, double latitude, double longitude) {
        Address address = getAddress(context, latitude, longitude);
        return address == null ? "unknown" : address.getLocality();
    }

    /**
     * 根据经纬度获取所在街道
     *
     * @param context   上下文
     * @param latitude  纬度
     * @param longitude 经度
     * @return 所在街道
     */
    public static String getStreet(Context context, double latitude, double longitude) {
        Address address = getAddress(context, latitude, longitude);
        return address == null ? "unknown" : address.getAddressLine(0);
    }

    //------------------------------------------坐标转换工具start--------------------------------------

    /**
     * GPS坐标 转换成 角度
     * 例如 113.202222 转换成 113°12′8″
     *
     * @param location
     * @return
     */
    public static String gpsToDegree(double location) {
        double degree = Math.floor(location);
        double minute_temp = (location - degree) * 60;
        double minute = Math.floor(minute_temp);
//        double second = Math.floor((minute_temp - minute)*60);
        String second = new DecimalFormat("#.##").format((minute_temp - minute) * 60);
        return (int) degree + "°" + (int) minute + "′" + second + "″";
    }

    /**
     * 国际 GPS84 坐标系
     * 转换成
     * [国测局坐标系] 火星坐标系 (GCJ-02)
     * <p>
     * World Geodetic System ==> Mars Geodetic System
     *
     * @param lon 经度
     * @param lat 纬度
     * @return GPS实体类
     */
    public static Gps GPS84ToGCJ02(double lon, double lat) {
        if (outOfChina(lon, lat)) {
            return null;
        }
        double dLat = transformLat(lon - 105.0, lat - 35.0);
        double dLon = transformLon(lon - 105.0, lat - 35.0);
        double radLat = lat / 180.0 * pi;
        double magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        double sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        double mgLat = lat + dLat;
        double mgLon = lon + dLon;
        return new Gps(mgLon, mgLat);
    }

    /**
     * [国测局坐标系] 火星坐标系 (GCJ-02)
     * 转换成
     * 国际 GPS84 坐标系
     *
     * @param lon 火星经度
     * @param lat 火星纬度
     */
    public static Gps GCJ02ToGPS84(double lon, double lat) {
        Gps gps = transform(lon, lat);
        double lontitude = lon * 2 - gps.getLongitude();
        double latitude = lat * 2 - gps.getLatitude();
        return new Gps(lontitude, latitude);
    }

    /**
     * 火星坐标系 (GCJ-02)
     * 转换成
     * 百度坐标系 (BD-09)
     *
     * @param gg_lon 经度
     * @param gg_lat 纬度
     */
    public static Gps GCJ02ToBD09(double gg_lon, double gg_lat) {
        double x = gg_lon, y = gg_lat;
        double z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
        double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
        double bd_lon = z * Math.cos(theta) + 0.0065;
        double bd_lat = z * Math.sin(theta) + 0.006;
        return new Gps(bd_lon, bd_lat);
    }

    /**
     * 百度坐标系 (BD-09)
     * 转换成
     * 火星坐标系 (GCJ-02)
     *
     * @param bd_lon 百度*经度
     * @param bd_lat 百度*纬度
     * @return GPS实体类
     */
    public static Gps BD09ToGCJ02(double bd_lon, double bd_lat) {
        double x = bd_lon - 0.0065, y = bd_lat - 0.006;
        double z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
        double theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
        double gg_lon = z * Math.cos(theta);
        double gg_lat = z * Math.sin(theta);
        return new Gps(gg_lon, gg_lat);
    }

    /**
     * 百度坐标系 (BD-09)
     * 转换成
     * 国际 GPS84 坐标系
     *
     * @param bd_lon 百度*经度
     * @param bd_lat 百度*纬度
     * @return GPS实体类
     */
    public static Gps BD09ToGPS84(double bd_lon, double bd_lat) {
        Gps gcj02 = BD09ToGCJ02(bd_lon, bd_lat);
        Gps map84 = GCJ02ToGPS84(gcj02.getLongitude(), gcj02.getLatitude());
        return map84;

    }

    /**
     * 不在中国范围内
     *
     * @param lon 经度
     * @param lat 纬度
     * @return boolean值
     */
    public static boolean outOfChina(double lon, double lat) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        return lat < 0.8293 || lat > 55.8271;
    }

    /**
     * 转化算法
     *
     * @param lon
     * @param lat
     * @return
     */
    public static Gps transform(double lon, double lat) {
        if (outOfChina(lon, lat)) {
            return new Gps(lon, lat);
        }
        double dLat = transformLat(lon - 105.0, lat - 35.0);
        double dLon = transformLon(lon - 105.0, lat - 35.0);
        double radLat = lat / 180.0 * pi;
        double magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        double sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        double mgLat = lat + dLat;
        double mgLon = lon + dLon;
        return new Gps(mgLon, mgLat);
    }

    /**
     * 纬度转化算法
     *
     * @param x
     * @param y
     * @return
     */
    private static double transformLat(double x, double y) {
        double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
                + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    /**
     * 经度转化算法
     *
     * @param x
     * @param y
     * @return
     */
    private static double transformLon(double x, double y) {
        double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
                * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
                * pi)) * 2.0 / 3.0;
        return ret;
    }

    public interface OnLocationChangeListener {

        /**
         * 获取最后一次保留的坐标
         *
         * @param location 坐标
         */
        void getLastKnownLocation(Location location);

        /**
         * 当坐标改变时触发此函数，如果Provider传进相同的坐标，它就不会被触发
         *
         * @param location 坐标
         */
        void onLocationChanged(Location location);

        /**
         * provider的在可用、暂时不可用和无服务三个状态直接切换时触发此函数
         *
         * @param provider 提供者
         * @param status   状态
         * @param extras   provider可选包
         */
        void onStatusChanged(String provider, int status, Bundle extras);//位置状态发生改变
    }

    private static class MyLocationListener
            implements LocationListener {
        /**
         * 当坐标改变时触发此函数，如果Provider传进相同的坐标，它就不会被触发
         *
         * @param location 坐标
         */
        @Override
        public void onLocationChanged(Location location) {
            if (mListener != null) {
                mListener.onLocationChanged(location);
            }
        }

        /**
         * provider的在可用、暂时不可用和无服务三个状态直接切换时触发此函数
         *
         * @param provider 提供者
         * @param status   状态
         * @param extras   provider可选包
         */
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            if (mListener != null) {
                mListener.onStatusChanged(provider, status, extras);
            }
            switch (status) {
                case LocationProvider.AVAILABLE:
                    Log.d("onStatusChanged", "当前GPS状态为可见状态");
                    break;
                case LocationProvider.OUT_OF_SERVICE:
                    Log.d("onStatusChanged", "当前GPS状态为服务区外状态");
                    break;
                case LocationProvider.TEMPORARILY_UNAVAILABLE:
                    Log.d("onStatusChanged", "当前GPS状态为暂停服务状态");
                    break;
            }
        }

        /**
         * provider被enable时触发此函数，比如GPS被打开
         */
        @Override
        public void onProviderEnabled(String provider) {
        }

        /**
         * provider被disable时触发此函数，比如GPS被关闭
         */
        @Override
        public void onProviderDisabled(String provider) {
        }
    }
    //===========================================坐标转换工具end====================================
}
```
## 加密解密
```
package com.example.tmlibrary.utils;

import android.util.Base64;

import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class Crypto {
    public static final byte[] KEY = "]9$wDGx923PYgNWv".getBytes(StandardCharsets.UTF_8);

    /**
     * ECB安全性上不够好但不用IV加盐，可以方便加密查询
     *
     * @param plainText 明文
     * @return 加密后的文本
     * @throws NoSuchPaddingException    系统不支持PKCS5 Padding时
     * @throws NoSuchAlgorithmException  系统不支持AES时
     * @throws InvalidKeyException       输入加密KEY不符合算法要求，如长度不对
     * @throws BadPaddingException       Padding错误
     * @throws IllegalBlockSizeException 加密Block大小错误
     */
//    public static String ecbEncrypt(String plainText) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
//        Key key = new SecretKeySpec(KEY, "AES");
//        Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
//        c.init(Cipher.ENCRYPT_MODE, key);
//        return Base64.getEncoder().encodeToString(c.doFinal(plainText.getBytes(StandardCharsets.UTF_8)));
//    }

    /**
     * ECB安全性上不够好但不用IV加盐，可以方便加密查询
     *
     * @param encryptedContent 密文
     * @return 解密后的明文
     * @throws NoSuchPaddingException    系统不支持PKCS5 Padding时
     * @throws NoSuchAlgorithmException  系统不支持AES时
     * @throws InvalidKeyException       输入加密KEY不符合算法要求，如长度不对
     * @throws BadPaddingException       Padding错误
     * @throws IllegalBlockSizeException 加密Block大小错误
     */
//    public static String ecbDecrypt(String encryptedContent) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
//        Key key = new SecretKeySpec(KEY, "AES");
//        Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
//        c.init(Cipher.DECRYPT_MODE, key);
//        return new String(c.doFinal(Base64.getDecoder().decode(encryptedContent)), StandardCharsets.UTF_8);
//    }


//    public static String cbcEncrypt(String plainText) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
//        byte[] clean = plainText.getBytes();
//
//        // Generating IV.
//        int ivSize = 16;
//        byte[] iv = new byte[ivSize];
//        SecureRandom random = new SecureRandom();
//        random.nextBytes(iv);
//        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
//
//        // Hashing key.
//        MessageDigest digest = MessageDigest.getInstance("SHA-256");
//        digest.update(KEY);
//        byte[] keyBytes = new byte[16];
//        System.arraycopy(digest.digest(), 0, keyBytes, 0, keyBytes.length);
//        SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "AES");
//
//        // Encrypt.
//        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
//        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
//        byte[] encrypted = cipher.doFinal(clean);
//
//        // Combine IV and encrypted part.
//        byte[] encryptedIVAndText = new byte[ivSize + encrypted.length];
//        System.arraycopy(iv, 0, encryptedIVAndText, 0, ivSize);
//        System.arraycopy(encrypted, 0, encryptedIVAndText, ivSize, encrypted.length);
//
//        return Base64.getEncoder().encodeToString(encryptedIVAndText);
//    }

    public static String cbcDecrypt(String encryptedContent) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        byte[] encryptedIvTextBytes = new byte[0];
//        encryptedIvTextBytes = Base64.getDecoder().decode(encryptedContent);
        encryptedIvTextBytes = Base64.decode(encryptedContent, Base64.DEFAULT);

        int ivSize = 16;
        int keySize = 16;

        // Extract IV.
        byte[] iv = new byte[ivSize];
        System.arraycopy(encryptedIvTextBytes, 0, iv, 0, iv.length);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

        // Extract encrypted part.
        int encryptedSize = encryptedIvTextBytes.length - ivSize;
        byte[] encryptedBytes = new byte[encryptedSize];
        System.arraycopy(encryptedIvTextBytes, ivSize, encryptedBytes, 0, encryptedSize);

        // Hash key.
        byte[] keyBytes = new byte[keySize];
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(KEY);
        System.arraycopy(md.digest(), 0, keyBytes, 0, keyBytes.length);
        SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "AES");

        // Decrypt.
        Cipher cipherDecrypt = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipherDecrypt.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
        byte[] decrypted = cipherDecrypt.doFinal(encryptedBytes);

        return new String(decrypted, StandardCharsets.UTF_8);
    }

//    public static void main(String[] args) throws Exception {
//        testCbc();
//        testEcb();
//    }

//    private static void testEcb() throws Exception {
//        System.out.println("ecb mode test ============>: ");
//
//        String originText = "110727198808220838X";//"你好世界 hello word";
//        String encrypted = Crypto.ecbEncrypt(originText);
//        String decrypted = Crypto.ecbDecrypt(encrypted);
//        assert (originText.equals(decrypted));
//        System.out.println("encrypted: " + encrypted + " length: " + encrypted.length());
//        System.out.println("decrypted: " + decrypted);
//    }
//
//    private static void testCbc() throws Exception {
//        System.out.println("cbc mode test ============>: ");
//
//        String originText = "110727198808220838X";//"你好世界 hello word";
//        String encrypted = Crypto.cbcEncrypt(originText);
//        String decrypted = Crypto.cbcDecrypt(encrypted);
//        assert (originText.equals(decrypted));
//        System.out.println("encrypted: " + encrypted + " length: " + encrypted.length());
//        System.out.println("decrypted: " + decrypted);
//    }
}

```

## 限制点击速度
```
public static boolean isFastClick(int millisecond) {
long curClickTime = System.currentTimeMillis();
long interval = curClickTime - lastClickTime;
if (0L < interval && interval < (long)millisecond) {
return true;
} else {
lastClickTime = curClickTime;
return false;
}
}

```
## utc时间转换
```
package tmai.com.statistic.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Logger;

/**
 * 时间格式转换工具类(utc时间和本地时间两者的转换)
 *
 * @author guoyangyang
 */
public class TimeConverterUtil {


    /**
     * 函数功能描述:UTC时间转本地时间格式
     *
     * @param utcTime         UTC时间
     * @param utcTimePatten   UTC时间格式
     * @param localTimePatten 本地时间格式
     * @return 本地时间格式的时间
     * eg:utc2Local("2017-06-14 09:37:50.788+08:00", "yyyy-MM-dd HH:mm:ss.SSSXXX", "yyyy-MM-dd HH:mm:ss.SSS")
     */
    public static String utc2Local(String utcTime, String utcTimePatten, String localTimePatten) {
        SimpleDateFormat utcFormater = new SimpleDateFormat(utcTimePatten);
        utcFormater.setTimeZone(TimeZone.getTimeZone("UTC"));//时区定义并进行时间获取
        Date gpsUTCDate = null;
        try {
            gpsUTCDate = utcFormater.parse(utcTime);
        } catch (ParseException e) {
            e.printStackTrace();
            return utcTime;
        }
        SimpleDateFormat localFormater = new SimpleDateFormat(localTimePatten);
        localFormater.setTimeZone(TimeZone.getDefault());
        String localTime = localFormater.format(gpsUTCDate.getTime());
        return localTime;
    }

    /**
     * 函数功能描述:UTC时间转本地时间格式
     *
     * @param utcTime          UTC时间
     * @param localTimePattern 本地时间格式(要转换的本地时间格式)
     * @return 本地时间格式的时间
     */
    public static String utc2Local(String utcTime, String localTimePattern) {
        String utcTimePattern = "yyyy-MM-dd";
        String subTime = utcTime.substring(10);//UTC时间格式以 yyyy-MM-dd 开头,将utc时间的前10位截取掉,之后是含有多时区时间格式信息的数据

        //处理当后缀为:+8:00时,转换为:+08:00 或 -8:00转换为-08:00
        if (subTime.indexOf("+") != -1) {
            subTime = changeUtcSuffix(subTime, "+");
        }
        if (subTime.indexOf("-") != -1) {
            subTime = changeUtcSuffix(subTime, "-");
        }
        utcTime = utcTime.substring(0, 10) + subTime;

        //依据传入函数的utc时间,得到对应的utc时间格式
        //步骤一:处理 T
        if (utcTime.indexOf("T") != -1) {
            utcTimePattern = utcTimePattern + "'T'";
        }

        //步骤二:处理毫秒SSS
        if (utcTime.indexOf(".") != -1) {
            utcTimePattern = utcTimePattern + " HH:mm:ss.SSS";
        } else {
            utcTimePattern = utcTimePattern + " HH:mm:ss";
        }

        //步骤三:处理时区问题
        if (subTime.indexOf("+") != -1 || subTime.indexOf("-") != -1) {
            utcTimePattern = utcTimePattern + "XXX";
        } else if (subTime.indexOf("Z") != -1) {
            utcTimePattern = utcTimePattern + "'Z'";
        }

        if ("yyyy-MM-dd HH:mm:ss".equals(utcTimePattern) || "yyyy-MM-dd HH:mm:ss.SSS".equals(utcTimePattern)) {
            return utcTime;
        }

        SimpleDateFormat utcFormater = new SimpleDateFormat(utcTimePattern);
        utcFormater.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date gpsUtcDate = null;
        try {
            gpsUtcDate = utcFormater.parse(utcTime);
        } catch (Exception e) {
            return utcTime;
        }
        SimpleDateFormat localFormater = new SimpleDateFormat(localTimePattern);
        localFormater.setTimeZone(TimeZone.getDefault());
        String localTime = localFormater.format(gpsUtcDate.getTime());
        return localTime;
    }

    /**
     * 函数功能描述:修改时间格式后缀
     * 函数使用场景:处理当后缀为:+8:00时,转换为:+08:00 或 -8:00转换为-08:00
     *
     * @param subTime
     * @param sign
     * @return
     */
    private static String changeUtcSuffix(String subTime, String sign) {
        String timeSuffix = null;
        String[] splitTimeArrayOne = subTime.split("\\" + sign);
        String[] splitTimeArrayTwo = splitTimeArrayOne[1].split(":");
        if (splitTimeArrayTwo[0].length() < 2) {
            timeSuffix = "+" + "0" + splitTimeArrayTwo[0] + ":" + splitTimeArrayTwo[1];
            subTime = splitTimeArrayOne[0] + timeSuffix;
            return subTime;
        }
        return subTime;
    }

    /**
     * 函数功能描述:获取本地时区的表示(比如:第八区-->+08:00)
     *
     * @return
     */
    public static String getTimeZoneByNumExpress() {
        Calendar cal = Calendar.getInstance();
        TimeZone timeZone = cal.getTimeZone();
        int rawOffset = timeZone.getRawOffset();
        int timeZoneByNumExpress = rawOffset / 3600 / 1000;
        String timeZoneByNumExpressStr = "";
        if (timeZoneByNumExpress > 0 && timeZoneByNumExpress < 10) {
            timeZoneByNumExpressStr = "+" + "0" + timeZoneByNumExpress + ":" + "00";
        } else if (timeZoneByNumExpress >= 10) {
            timeZoneByNumExpressStr = "+" + timeZoneByNumExpress + ":" + "00";
        } else if (timeZoneByNumExpress > -10 && timeZoneByNumExpress < 0) {
            timeZoneByNumExpress = Math.abs(timeZoneByNumExpress);
            timeZoneByNumExpressStr = "-" + "0" + timeZoneByNumExpress + ":" + "00";
        } else if (timeZoneByNumExpress <= -10) {
            timeZoneByNumExpress = Math.abs(timeZoneByNumExpress);
            timeZoneByNumExpressStr = "-" + timeZoneByNumExpress + ":" + "00";
        } else {
            timeZoneByNumExpressStr = "Z";
        }
        return timeZoneByNumExpressStr;
    }

}
```


## 获取软件版本号  
```


//app版本号的获取
private String getVersion() {
PackageManager pm=getPackageManager();
try {
PackageInfo packageInfo = pm.getPackageInfo(getPackageName(), 0);
return  packageInfo.versionName;
} catch (NameNotFoundException e) {
e.printStackTrace();
return "";
}
}

```

## 定时器
```
每隔三秒执行一次Timer timer = new Timer();timer.schedule(new TimerTask() {@Overridepublic void run() {Log.d("ljg", "run: ");}}, 0, 3000);获取验证码倒计时public static void countDown(final TextView textView, long waitTime, long interval, final String hint) {textView.setEnabled(false);CountDownTimer timer = new CountDownTimer(waitTime, interval) {public void onTick(long millisUntilFinished) {textView.setText("剩下 " + millisUntilFinished / 1000L + " S");}public void onFinish() {textView.setEnabled(true);textView.setText(hint);}};timer.start();}
在Android开发中，定时器一般有以下3种实现方法：



一、采用Handler与线程的sleep(long)方法
二、采用Handler的postDelayed(Runnable, long)方法
三、采用Handler与timer及TimerTask结合的方法

下面逐一介绍：
一、采用Handle与线程的sleep(long)方法
Handler主要用来处理接受到的消息。这只是最主要的方法，当然Handler里还有其他的方法供实现，有兴趣的可以去查API，这里不过多解释。
1. 定义一个Handler类，用于处理接受到的Message。

复制代码 代码如下:


Handler handler = new Handler() {
    public void handleMessage(Message msg) {
        // 要做的事情
        super.handleMessage(msg);
    }
};


2. 新建一个实现Runnable接口的线程类，如下：
复制代码 代码如下:



public class MyThread implements Runnable {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        while (true) {
            try {
                Thread.sleep(10000);// 线程暂停10秒，单位毫秒
                Message message = new Message();
                message.what = 1;
                handler.sendMessage(message);// 发送消息
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}

3. 在需要启动线程的地方加入下面语句：
复制代码 代码如下:




new Thread(new MyThread()).start();


4. 启动线程后，线程每10s发送一次消息。二、采用Handler的postDelayed(Runnable, long)方法
这个实现比较简单一些。







1. 定义一个Handler类
复制代码 代码如下:



Handler handler=new Handler();
Runnable runnable=new Runnable() {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        //要做的事情
        handler.postDelayed(this, 2000);
    }
};
2. 启动计时器

复制代码 代码如下:



handler.postDelayed(runnable, 2000);//每两秒执行一次runnable

3. 停止计时器

复制代码 代码如下:


handler.removeCallbacks(runnable);

三、采用Handler与timer及TimerTask结合的方法
1. 定义定时器、定时器任务及Handler句柄

复制代码 代码如下:


private final Timer timer = new Timer();
private TimerTask task;
Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
        // TODO Auto-generated method stub
        // 要做的事情
        super.handleMessage(msg);
    }
};

2. 初始化计时器任务
复制代码 代码如下:



task = new TimerTask() {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        Message message = new Message();
        message.what = 1;
        handler.sendMessage(message);
    }
};

3. 启动定时器
复制代码 代码如下:



timer.schedule(task, 2000, 2000);

简要说一下上面三步提到的一些内容：
1. 定时器任务（TimerTask）顾名思义，就是说当定时器到达指定的时间时要做的工作，这里是想Handler发送一个消息，由Handler类进行处理。
2. java.util.Timer.schedule(TimerTask task, long delay):这个方法是说，dalay/1000秒后执行task.只执行一次。

java.util.Timer.schedule(TimerTask task, long delay, long period)：这个方法是说，delay/1000秒后执行task,然后进过period/1000秒再次执行task，这个用于循环任务，执行无数次，当然，你可以用timer.cancel();取消计时器的执行。


倒计时定时器：

final static Handler xxhandler = new Handler();
static Runnable xxtask = new Runnable() {
    @Override
    public void run() {
        Log.i("ljg", "延迟30秒执行线程");

    }
};

static void showZoomButton() {
    zoomIn = (Button) mContainer.findViewById(R.id.zoomin);
    zoomOut = (Button) mContainer.findViewById(R.id.zoomout);
    zoomIn.setVisibility(View.VISIBLE);
    zoomOut.setVisibility(View.VISIBLE);


xxhandler.removeCallbacks(xxtask)；//第二次点击按钮的时候重新定时

xxhandler.postDelayed(xxtask, 3000);
}

定时广播  
这种方式最少间隔时间为1分钟。


Intent intent = new Intent(MainActivity.this, CallAlarmReceiver.class);
PendingIntent pt = PendingIntent.getBroadcast(MainActivity.this, 1, intent, 0);
AlarmManager ar = (AlarmManager) getSystemService(ALARM_SERVICE);
Long time = Long.valueOf(1);
ar.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 60 * 1000, pt);

package com.soft.tm.recycletest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

/**
 * 自定义BroadcastReceiver 当闹钟设置的时间到了的时候，广播会被唤起,并运行onreceive方法
 *
 * @author CxLong
 */
public class CallAlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, Intent intent) {
        // TODO Auto-generated method stub

        Log.d("ljg", "onReceive: ");

        Toast.makeText(context, "onrecieve", Toast.LENGTH_SHORT).show();

    }
}

<receiver
android:name="com.soft.tm.recycletest.CallAlarmReceiver"
android:process=":remote" />
```
## 第三方定时器

```
Gradle
compile ‘com.github.iwgang:countdownview:2.1.6’
timeBgColor 时间背景颜色 默认为#444444
timeBgRadius 时间背景圆角大小 默认为0
timeBgDivisionLineColor 默认为#30FFFFFF
timeTextSize 时间文本大小 默认为12sp
isTimeTextBold 时间文本是否粗体 默认为false
isShowHour 是否显示小时
isShowSecond 是否显示秒 默认true
isConvertDaysToHours 是否转换天数到小时数 默认为false
suffixTextColor 分隔符文本颜色 默认为#000000
suffixGravity 分隔符位置 ‘top’ or ‘center’ or ‘bottom’
suffixDay 分隔符天 默认为null
suffixMinute 分隔符天 默认为null
suffixMillisecond 分隔符天 默认为null
suffixDayLeftMargin 分隔符天距离左边的margin 默认为0dp
suffixHourLeftMargin 分隔符小时距离左边的margin 默认为0dp
suffixMinuteLeftMargin 分隔符分距离左边的margin 默认为0dp
suffixSecondLeftMargin 分隔符秒距离左边的margin 默认为0dp
suffixMillisecondLeftMargin 分隔符毫秒距离左边的margin 默认为0dp
timeBgBorderColor 时间背景边框颜色 默认为#000000
timeBgBorderRadius　时间背景边框角度　默认为0dp
```
demo：   
//布局文件代码   

```
<!--?xml version="1.0" encoding="utf-8"?-->
 
    <cn.iwgang.countdownview.countdownview android:id="@+id/countdownView" android:layout_height="wrap_content" android:layout_width="wrap_content" app:ishidetimebackground="true" app:isshowday="false" app:isshowhour="false" app:isshowmillisecond="true" app:isshowminute="true" app:isshowsecond="true" app:istimetextbold="true" app:suffixgravity="bottom" app:suffixhour="时" app:suffixmillisecond="毫秒" app:suffixminute="分" app:suffixsecond="秒" app:suffixtextcolor="#000000" app:suffixtextsize="12sp" app:timetextcolor="#000000" app:timetextsize="22sp">
</cn.iwgang.countdownview.countdownview></android.support.constraint.constraintlayout>
 ```

//测试的Activity代码  
```
public class MainActivity extends AppCompatActivity {
    private CountdownView countdownView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        countdownView = findViewById(R.id.countdownView);
        countdownView.start(1000 * 60 * 60 * 5);//倒计时一小时
        countdownView.setOnCountdownEndListener(new CountdownView.OnCountdownEndListener() {
            @Override
            public void onEnd(CountdownView cv) {
                Log.e("CountdownView", "倒计时结束");
            }
        });
    }
}

```
重要的接口  
```
1.CountDownView倒计时完成的接口回调
2.CountDownView倒计时每隔一段时间的接口回调自定义属性介绍
isHideTimeBackground 是否隐藏时间背景 默认为true
timeBgSize 时间背景大小 默认为timeSize + 2dp * 4
isShowTimeBgDivisionLine 默认为true
timeBgDivisionLineSize 默认为0.5dp
timeTextColor 时间文本颜色 默认为#000000
isShowDay 是否显示天
isShowMinute 是否显示分 默认true
isShowMillisecond 是否显示毫秒 默认false
suffixTextSize 分隔符文本大小 默认为12sp
isSuffixTextBold 分隔符文本是否粗体　默认为false
suffix 分隔符 默认为:
suffixHour 分隔符天 默认为null
suffixSecond 分隔符天 默认为null
suffixLRMargin 分隔符距离左边和右边的margin 默认为3dp
suffixDayRightMargin 分隔符天距离右边的margin 默认为0dp
suffixHourRightMargin 分隔符小时距离右边的margin 默认为0dp
suffixMinuteRightMargin 分隔符分距离右边的margin 默认为0dp
suffixSecondRightMargin 分隔符秒距离右边的margin 默认为0dp
isShowTimeBgBorder 是否显示时间背景边框 默认为false
timeBgBorderSize 时间背景边框大小　默认为1dp　　
setOnCountdownEndListener(OnCountdownEndListener onCountdownEndListener);
setOnCountdownIntervalListener(long interval, OnCountdownIntervalListener onCountdownIntervalListener);

```
















## 手机通讯录相关  
### 读取联系人  
```
package read.service;

import java.util.ArrayList;
import java.util.List;

import read.domian.ContactPhone;
import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;

public class ContactService {
private Context context;
private ContentResolver cr;
private ContactPhone contact;

public ContactService(Context context) {
super();
this.context = context;
}

public List<ContactPhone> getContact() {
List<ContactPhone> list = new ArrayList<ContactPhone>();
cr = context.getContentResolver();
Uri rawContactsUri = Uri
.parse("content://com.android.contacts/raw_contacts");
Uri dataUri = Uri.parse("content://com.android.contacts/data");
Cursor rawContactsCursor = cr.query(rawContactsUri,
new String[] { "_id" }, null, null, null);
while (rawContactsCursor.moveToNext()) {
String id = rawContactsCursor.getString(0);
contact = new ContactPhone();
contact.setId(id);

Cursor dataCursor = cr.query(dataUri, new String[] { "data1",
"mimetype" }, "raw_contact_id=?", new String[] { id + "" },
null);
while (dataCursor.moveToNext()) {
String data1 = dataCursor.getString(0);
String mimetype = dataCursor.getString(1);
if ("vnd.android.cursor.item/name".equals(mimetype)) {
System.out.println("姓名: " + data1);
contact.setName(data1);
} else if ("vnd.android.cursor.item/phone_v2".equals(mimetype)) {
System.out.println("电话: " + data1);
contact.setPhone(data1);
}

}
list.add(contact);
}
return list;
}
}
```
### 联系人读写与批量操作
```
package com.itheima.contact;

import java.util.ArrayList;
import java.util.Collections;

import android.content.ContentProviderOperation;
//联系人在contacts2数据库中数据库以三张表存在:data,raw_contacts,mimetypes
//对地联系人而言,实际数据在data表示,但是受raw_contacts约束,有多个少联系人就多少行数据,里面raw_contacts里的contact_id列的每一个值对应一个联系人
//,data里的是联系人的所有数据,而通过mimetypes表示mimetype区别联系人的数据类型,是电话,还是名字....
public class ContactInfoProvider {
private static List<ContactInfo> list;//定义一个集合来存储联系人,ContactInfo是一个联系人对象

public static List<ContactInfo> getContactInfos(Context context) {
//获得内容提供者的操作类
ContentResolver resolver = context.getContentResolver();
list = new ArrayList<ContactInfo>();//初始化集合.
//用查寻方法查找id表raw_contacts
Uri uri=Uri.parse("content://com.android.contacts/raw_contacts");
//用id查找所有匹配的数据
Uri datauri = Uri.parse("content://com.android.contacts/data");
//删除联系人删除的是raw_contacts下的contact_id列的值
Cursor cursor = resolver.query(uri, new String[]{"contact_id"}, null, null, null);
//从结果集中获得id
while (cursor.moveToNext()) {
String id = cursor.getString(0);//因为只有一列,且是第一列,所以可以一直用0
if (id!=null) {
ContactInfo info = new ContactInfo();//每次开始查建立一个对象
//查到所有联系人数据
Cursor cursorData = resolver.query(datauri, new String[]{"mimetype", "data1"}, "raw_contact_id=?", new String[]{id}, null);
//遍历用数据类型筛选出需要的联系人数据保存入对象,
while(cursorData.moveToNext()) {
String mimetype = cursorData.getString(0);
String data1 = cursorData.getString(1);
//用数据类型表区分是姓名还是电话//查这个看到表来查
if("vnd.android.cursor.item/name".equals(mimetype)){
info.setName(data1);
}else if("vnd.android.cursor.item/phone_v2".equals(mimetype)){
info.setPhone(data1);
}
}
list.add(info);//将对象添加入集合.
cursorData.close();//关闭数据库连接
}
}
cursor.close();//关闭数据库连接
return list;
}
//联系人的批量写入
public void testWrite() {
ContentResolver resolver = getContext().getContentResolver();
ContentValues values = new ContentValues();
// 向raw_contacts表中插入一个id(自动生成)
Uri resultUri = resolver.insert(rawContactsUri, values);
long id = ContentUris.parseId(resultUri);
// 用刚刚插入的id作为raw_contact_id列的值, 向data表中插入3条数据
values.put("raw_contact_id", id);
values.put("mimetype", "vnd.android.cursor.item/name");
values.put("data1", "FLX");
resolver.insert(dataUri, values);
values.put("mimetype", "vnd.android.cursor.item/phone_v2");
values.put("data1", "18600056789");
resolver.insert(dataUri, values);
values.put("mimetype", "vnd.android.cursor.item/email_v2");
values.put("data1", "lkp@itcast.cn");
resolver.insert(dataUri, values);
}
public void testWriteBatch() throws Exception {
// 创建4个ContentProviderOperation, 代表4次insert操作
ContentProviderOperation operation1 = ContentProviderOperation.newInsert(rawContactsUri) //
.withValue("_id", null) //
.build();
ContentProviderOperation operation2 = ContentProviderOperation.newInsert(dataUri) //
.withValueBackReference("raw_contact_id", 0) // 用同组的0号操作得到的返回值作为值插入
.withValue("mimetype", "vnd.android.cursor.item/name") //
.withValue("data1", "ZZH") //
.build();
ContentProviderOperation operation3 = ContentProviderOperation.newInsert(dataUri) //
.withValueBackReference("raw_contact_id", 0) // 用同组的0号操作得到的返回值作为值插入
.withValue("mimetype", "vnd.android.cursor.item/phone_v2") //
.withValue("data1", "18600098765") //
.build();
ContentProviderOperation operation4 = ContentProviderOperation.newInsert(dataUri) //
.withValueBackReference("raw_contact_id", 0) // 用同组的0号操作得到的返回值作为值插入
.withValue("mimetype", "vnd.android.cursor.item/email_v2") //
.withValue("data1", "zzh@itcast.cn") //
.build();
// 将4个操作对象装入集合
ArrayList<ContentProviderOperation> operations = new ArrayList<ContentProviderOperation>();
Collections.addAll(operations, operation1, operation2, operation3, operation4);
ContentResolver resolver = getContext().getContentResolver();
resolver.applyBatch("com.android.contacts", operations);
}
}

```
### 联系人查找
```
/**
 * 查找手机里所有的联系人信息
 * @return 返回联系人集合map key表示名字,values表示这个名字表示的所有号码
*/
public HashMap<String,ArrayList<String>>  startQueryAll() {
ContentResolver cr = getContentResolver();
HashMap<String,ArrayList<String>> hs=new HashMap<String,ArrayList<String>>();
Cursor phone = cr.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, new String[] {
CommonDataKinds.Phone.NUMBER, CommonDataKinds.Phone.DISPLAY_NAME }, null, null, null);
while (phone.moveToNext()) {
String strPhoneNumber = phone.getString(phone.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
String name = phone.getString(phone.getColumnIndex(CommonDataKinds.Phone.DISPLAY_NAME)); //这里处理一个联系人有几个号码的情况:一个联系人有多个号码在数据库中是多条记录,这里先通过名字获取集合,如果之前已经存在联系人,那么就往value里的list添加号码就可以了.这样就处理了
ArrayList<String> ad=hs.get(name);
if(ad==null){
ad=new ArrayList<String>();
ad.add(strPhoneNumber);
hs.put(name, ad);
} else {
ad.add(strPhoneNumber);
}
}
phone.close();
return hs;
}
//通过电话号码查询联系人
public string  startQuery(String address) {
//联系人  所需字段
private  final String[] CONTACT_PROJECTION = new String[]{
PhoneLookup._ID,
PhoneLookup.DISPLAY_NAME,
PhoneLookup.NUMBER
};
//根据电话号码 查询联系人信息  （名称）
String name = null;
Uri uri = Uri.withAppendedPath(PhoneLookup.CONTENT_FILTER_URI, Uri.encode(address));
Cursor contact_Cursor = context.getContentResolver().query(uri, CONTACT_PROJECTION, null, null, null);
if(contact_Cursor.moveToFirst()){
//查询到联系人的信息
name = contact_Cursor.getString(DISPLAY_NAME_COLUMN_INDEX);
}
contact_Cursor.close();
return mame;
}
//查询通过号码模糊查询联系人,得到cursor
public Cursor startQueryVague(String constraint) {
//注意做非空判断
if(TextUtils.isEmpty(constraint)){
return null;
}
//通过输入的数据模糊查询数据库
Uri uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
//select * from sms where number like '%1%'
String selection = ContactsContract.CommonDataKinds.Phone.NUMBER + " like '%" + constraint + "%'";
Cursor c = context.getContentResolver().query(uri,
new String[]{ContactsContract.Contacts._ID,
ContactsContract.Contacts.DISPLAY_NAME,
ContactsContract.CommonDataKinds.Phone.NUMBER},
selection, null, null);
return c;
}
/**
     * 查询短信的数据
     * getContentResolver().query()与
     * managedQuery(uri, projection, selection, selectionArgs, sortOrder) 二者区别是:managedQuery不用手动的去管理cursor,让activity去帮我们管理
     * 如果直接查询，就是在主线程进行的。
     * 可以采用android提供的异步框架,
     * 使用范围：只能去访问我们的ContentProvider所提供的数据
     */
 //查找特定id的联系人.
    private void startQuery(String thread_ids) {
       String[] CONVERSATION_PROJECTION = new String[]{"sms.thread_id as _id",
     "snippet",
     "msg_count",
     "sms.address as address",
     "sms.date as date"};
     Uri uri = Uri.parse("content://sms/conversations");
     // select * from table where thread_id in (1,2,4)
     if(thread_ids != null){
     String where = Sms.THREAD_ID + " in " + thread_ids;
         mQueryHandler.startQuery(0, null, uri, CONVERSATION_PROJECTION, where, null, " date desc");
     }else{
         mQueryHandler.startQuery(0, null, uri, CONVERSATION_PROJECTION, null, null, " date desc");
     }

}
```

## 短信操作 
```
短信的读取与写入
//在com..android.provider.telephony下的databases下的mmsmms.db.有两张比较重要的表:threads表和sms表
//threads表对应的是联系人,每一行数据代表一个联系人,其中message_count表示有多少条短信,用thread_id约束sms表,每个thread_id对应多条sms数据
//其是sms表中:address表示号码 person列1表示在联系人中已存,0表示这个号没有存,date表示收到的时间,read列中1表示已读,0表示未读,
//type中1表示收短信,2表示发短信,body表示短信内容.
public class SmsUtils {
private Context context;

public SmsUtils(Context context) {
this.context = context;
}
/**
 *定义一个接口 ,把ui里需要的数据定义为接口里方法的参数
 *在把接口的对象作为工具类的参数,并里工具类里调用两个接口方法,把工具类里的数据当方法的参数.
 *在把接口的对象作为工具类的参数,并里工具类里调用两个接口方法,把工具类里的数据当方法的参数.
 *使用者可以作为progressbar,也可以作其它用,这样藕合性就低了,复用性就高了.
 * @author fada
 *
 */
public interface BackUpProcessListener{
void beforeBackup(int max);
void onProcessUpdate(int process);
}
//OutputStream表示需要一个输出流,定义xml文件写放的位置.
public void backUpSms(OutputStream os, BackUpProcessListener listener) throws Exception{
Uri uri = Uri.parse("content://sms/");
XmlSerializer  serializer = Xml.newSerializer();
serializer.setOutput(os, "utf-8");
serializer.startDocument("utf-8", true);
serializer.startTag(null, "smss");
Cursor cursor = context.getContentResolver().query(uri, new String[]{"address","date","type","body"} , null, null, null);
listener.beforeBackup(cursor.getCount());
int total = 0;
while(cursor.moveToNext()){
String address = cursor.getString(0);
String date  =cursor.getString(1);
String type  =cursor.getString(2);
String body  =cursor.getString(3);
serializer.startTag(null, "sms");
serializer.startTag(null, "address");
serializer.text(address);
serializer.endTag(null, "address");

serializer.startTag(null, "date");
serializer.text(date);
serializer.endTag(null, "date");
serializer.startTag(null, "type");
serializer.text(type);
serializer.endTag(null, "type");
serializer.startTag(null, "body");
serializer.text(body);
serializer.endTag(null, "body");
serializer.endTag(null, "sms");
os.flush();
total++;
listener.onProcessUpdate(total);
Thread.sleep(1000);
}
cursor.close();
serializer.endTag(null, "smss");
serializer.endDocument();
os.flush();
os.close();
}
public void restoreSms(){
//读取xml文件. 把每一条短信的数据获取出来,插入到系统的数据库
}
}

```
## uri相关 
### android 根据uri获取路径
```


public static String getRealFilePath( final Context context, final Uri uri ) {

if ( null == uri ) return null;

final String scheme = uri.getScheme();
String data = null;

if ( scheme == null )
data = uri.getPath();
else if ( ContentResolver.SCHEME_FILE.equals( scheme ) ) {
data = uri.getPath();
} else if ( ContentResolver.SCHEME_CONTENT.equals( scheme ) ) {
Cursor cursor = context.getContentResolver().query( uri, new String[] { ImageColumns.DATA }, null, null, null );
if ( null != cursor ) {
if ( cursor.moveToFirst() ) {
int index = cursor.getColumnIndex( ImageColumns.DATA );
if ( index > -1 ) {
data = cursor.getString( index );
}
}
cursor.close();
}
}
return data;
}
真实路径：



Uri uri = data.getData();

String[] proj = { MediaStore.Images.Media.DATA };

Cursor actualimagecursor = managedQuery(uri,proj,null,null,null);

int actual_image_column_index = actualimagecursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);

actualimagecursor.moveToFirst();

String img_path = actualimagecursor.getString(actual_image_column_index);

File file = new File(img_path);


获取真实路径：

public static String getRealFilePath( final Context context, final Uri uri ) {

if ( null == uri ) return null;

final String scheme = uri.getScheme();
String data = null;

if ( scheme == null )
data = uri.getPath();
else if ( ContentResolver.SCHEME_FILE.equals( scheme ) ) {
data = uri.getPath();
} else if ( ContentResolver.SCHEME_CONTENT.equals( scheme ) ) {
Cursor cursor = context.getContentResolver().query( uri, new String[] { ImageColumns.DATA }, null, null, null );
if ( null != cursor ) {
if ( cursor.moveToFirst() ) {
int index = cursor.getColumnIndex( ImageColumns.DATA );
if ( index > -1 ) {
data = cursor.getString( index );
}
}
cursor.close();
}
}
return data;
}

```
## 乱码
```

request.setCharacterEncoding("utf-8");
response.setContentType("text/html;charset=utf-8");
某个页面中文乱码：通过记事本打开这个文件，另存为utf-8即可
```
## 防止快速连续点击
```
class ClickUtils {
    public static void fastClickChecked(View v, View.OnClickListener listener) {
        listener.onClick(v);
        v.setClickable(false);
        v.postDelayed(() -> v.setClickable(true), 500);
    }
}


ClickUtils.fastClickChecked(view, view1 -> {
    System.out.println("");
});
```
## android分段打印日志
```
JAVA:

package amplesky.com.telcontroller.utils;

import android.util.Log;

public class LogUtil {
    /**
     * 截断输出日志
     * @param msg
     */
    public static void v(String tag, String msg) {
        if (tag == null || tag.length() == 0
                || msg == null || msg.length() == 0)
            return;

        int segmentSize = 3 * 1024;
        long length = msg.length();
        if (length <= segmentSize ) {// 长度小于等于限制直接打印
             Log.v(tag, msg);
        }else {
            while (msg.length() > segmentSize ) {// 循环分段打印日志
                String logContent = msg.substring(0, segmentSize );
                msg = msg.replace(logContent, "");
                Log.v(tag, logContent);
            }
            Log.v(tag, msg);// 打印剩余日志
        }
    }
}
```
```
JS
var MAX_LENGTH = 10;
/**
     * 分段打印较长的文本
     * @param tag 标志
     * @param content 内容
     */
function debugLarge(tag, content) {
    if (content.length > MAX_LENGTH) {
        var part = content.substring(0, MAX_LENGTH);
        console.log(tag, part)
         part = content.substring(MAX_LENGTH, content.length);
        if ((content.length - MAX_LENGTH) > MAX_LENGTH) {
            debugLarge(tag, part);
        } else {
            console.log(tag, part)
        }
    } else {
        console.log(tag,content)
    }
}
```