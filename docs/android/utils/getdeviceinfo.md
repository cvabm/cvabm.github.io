## DeviceInfo
[[toc]]
### 获取sd卡状态
```
1、<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>    
2、private String getLocalMacAddress() {  
    WifiManager wifi = (WifiManager) getSystemService(Context.WIFI_SERVICE);  
    WifiInfo info = wifi.getConnectionInfo();  
    return info.getMacAddress();  

  }  
```

读取设备信息，如cpu版本32位64位  
```

String s = execCmd("getprop");

public static String execCmd(String cmd) {
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
        String line;

        while ((line = brerr.readLine()) != null) {
            result += line;
            result += "\n";
        }
        while ((line = brout.readLine()) != null) {
            lastline = line;
            result += line;
            result += "\n";
        }
        if (result != "") {
            return result;
        }
    } catch (Throwable t) {
        t.printStackTrace();
    }
    return lastline;
}



一、方法一，读取"/proc/cpuinfo"文件的第一行。
cat /proc/cpuinfo

二、方法二，读取Android 的system/build.prop文件("ro.product.cpu.abilist64"）

三、方法三，通过读取libc.so文件的ELF头部e_indent[]数组，根据数组第e_indent[4]的取值来判断，参考代码如下，没有亲自测试。
    public static final String CPU_ARCHITECTURE_TYPE_32 = "32";
    public static final String CPU_ARCHITECTURE_TYPE_64 = "64";
    /** ELF文件头 e_indent[]数组文件类标识索引 */
    private static final int EI_CLASS = 4;
    /** ELF文件头 e_indent[EI_CLASS]的取值：ELFCLASS32表示32位目标 */
    private static final int ELFCLASS32 = 1;
    /** ELF文件头 e_indent[EI_CLASS]的取值：ELFCLASS64表示64位目标 */
    private static final int ELFCLASS64 = 2;
    
    /** The system property key of CPU arch type */
    private static final String CPU_ARCHITECTURE_KEY_64 = "ro.product.cpu.abilist64";
    
    /** The system libc.so file path */
    private static final String SYSTEM_LIB_C_PATH = "/system/lib/libc.so";
    private static final String SYSTEM_LIB_C_PATH_64 = "/system/lib64/libc.so";
    private static final String PROC_CPU_INFO_PATH = "/proc/cpuinfo";
    private static boolean LOGENABLE = false;
    /**
     * Check if the CPU architecture is x86
     */
    public static boolean checkIfCPUx86() {
        //1. Check CPU architecture: arm or x86
        if (getSystemProperty("ro.product.cpu.abi", "arm").contains("x86")) {
            //The CPU is x86
            return true;
        } else {
            return false;
        }
    }
    /**
     * Get the CPU arch type: x32 or x64
     */
    public static String getArchType(Context context) {
        if (getSystemProperty(CPU_ARCHITECTURE_KEY_64, "").length() > 0) {
            if (LOGENABLE) {
                Log.d("###############getSystemProperty","CPU arch is 64bit");
            }
            return CPU_ARCHITECTURE_TYPE_64;
        } else if (isCPUInfo64()) {
            return CPU_ARCHITECTURE_TYPE_64;
        } else if (isLibc64()) {
            return CPU_ARCHITECTURE_TYPE_64;
        } else {
            if (LOGENABLE) {
                Log.d("###############getArchType()","return cpu DEFAULT 32bit!");
            }
            return CPU_ARCHITECTURE_TYPE_32;
        }
    }
    
    private static String getSystemProperty(String key, String defaultValue) {
        String value = defaultValue;
        try {
            Class<?> clazz= Class.forName("android.os.SystemProperties");
            Method get = clazz.getMethod("get", String.class, String.class);
            value = (String)(get.invoke(clazz, key, ""));
        } catch (Exception e) {
            if (LOGENABLE) {
                Log.d("getSystemProperty", "key = " + key + ", error = " + e.getMessage());
            }
        }
        if (LOGENABLE) {
            Log.d("getSystemProperty",  key + " = " + value);
        }
        return value;
    }
    /**
     * Read the first line of "/proc/cpuinfo" file, and check if it is 64 bit.
     */
    private static boolean isCPUInfo64() {
        File cpuInfo = new File(PROC_CPU_INFO_PATH);
        if (cpuInfo != null && cpuInfo.exists()) {
            InputStream inputStream = null;
            BufferedReader bufferedReader = null;
            try {
                inputStream = new FileInputStream(cpuInfo);
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream), 512);
                String line = bufferedReader.readLine();
                if (line != null && line.length() > 0 && line.toLowerCase(Locale.US).contains("arch64")) {
                    if (LOGENABLE) {
                        Log.d("###############isCPUInfo64()", PROC_CPU_INFO_PATH + " contains is arch64");
                    }
                    return true;
                } else {
                    if (LOGENABLE) {
                        Log.d("###############isCPUInfo64()", PROC_CPU_INFO_PATH + " is not arch64");
                    }
                }
            } catch (Throwable t) {
                if (LOGENABLE) {
                    Log.d("###############isCPUInfo64()","read " + PROC_CPU_INFO_PATH + " error = " + t.toString());
                }
            } finally {
                try {
                    if (bufferedReader != null) {
                        bufferedReader.close();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                
                try {
                    if (inputStream != null) {
                        inputStream.close();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }
    
    /**
     * Check if system libc.so is 32 bit or 64 bit
     */
    private static boolean isLibc64() {
        File libcFile = new File(SYSTEM_LIB_C_PATH);
        if (libcFile != null && libcFile.exists()) {
            byte[] header = readELFHeadrIndentArray(libcFile);
            if (header != null && header[EI_CLASS] == ELFCLASS64) {
                if (LOGENABLE) {
                    Log.d("###############isLibc64()", SYSTEM_LIB_C_PATH + " is 64bit");
                }
                return true;
            }
        }
        
        File libcFile64 = new File(SYSTEM_LIB_C_PATH_64);
        if (libcFile64 != null && libcFile64.exists()) {
            byte[] header = readELFHeadrIndentArray(libcFile64);
            if (header != null && header[EI_CLASS] == ELFCLASS64) {
                if (LOGENABLE) {
                    Log.d("###############isLibc64()", SYSTEM_LIB_C_PATH_64 + " is 64bit");
                }
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * ELF文件头格式是固定的:文件开始是一个16字节的byte数组e_indent[16]
     * e_indent[4]的值可以判断ELF是32位还是64位
     */
    private static byte[] readELFHeadrIndentArray(File libFile) {
        if (libFile != null && libFile.exists()) {
            FileInputStream inputStream = null;
            try {
                inputStream = new FileInputStream(libFile);
                if (inputStream != null) {
                    byte[] tempBuffer = new byte[16];
                    int count = inputStream.read(tempBuffer, 0, 16);
                    if (count == 16) {
                        return tempBuffer;
                    } else {
                        if (LOGENABLE) {
                            Log.e("readELFHeadrIndentArray", "Error: e_indent lenght should be 16, but actual is " +  count);
                        }
                    }
                }
            } catch (Throwable t) {
                if (LOGENABLE) {
                    Log.e("readELFHeadrIndentArray", "Error:" + t.toString());
                }
            } finally {
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        
        return null;
    }

---
通过发射获取  
/**
* 获取指定字段信息
* @return
*/
private String getDeviceInfo(){
StringBuffer sb =new StringBuffer();
sb.append("主板："+Build.BOARD);
sb.append("\n系统启动程序版本号："+ Build.BOOTLOADER);
sb.append("\n系统定制商："+Build.BRAND);
sb.append("\ncpu指令集："+Build.CPU_ABI);
sb.append("\ncpu指令集2："+Build.CPU_ABI2);
sb.append("\n设置参数："+Build.DEVICE);
sb.append("\n显示屏参数："+Build.DISPLAY);
sb.append("\n无线电固件版本："+Build.getRadioVersion());
sb.append("\n硬件识别码："+Build.FINGERPRINT);
sb.append("\n硬件名称："+Build.HARDWARE);
sb.append("\nHOST:"+Build.HOST);
sb.append("\n修订版本列表："+Build.ID);
sb.append("\n硬件制造商："+Build.MANUFACTURER);
sb.append("\n版本："+Build.MODEL);
sb.append("\n硬件序列号："+Build.SERIAL);
sb.append("\n手机制造商："+Build.PRODUCT);
sb.append("\n描述Build的标签："+Build.TAGS);
sb.append("\nTIME:"+Build.TIME);
sb.append("\nbuilder类型："+Build.TYPE);
sb.append("\nUSER:"+Build.USER);
return sb.toString();
}
/**
* 通过反射获取所有的字段信息
* @return
*/
public String getDeviceInfo2(){
StringBuilder sbBuilder = new StringBuilder();
Field[] fields = Build.class.getDeclaredFields();
for(Field field:fields){
field.setAccessible(true);
try {
sbBuilder.append("\n"+field.getName()+":"+field.get(null).toString());
} catch (IllegalArgumentException e) {
e.printStackTrace();
} catch (IllegalAccessException e) {
e.printStackTrace();
}
}
return sbBuilder.toString();
}

```

## NetworkListener
```
前者为实时监听，后者为一次监听


package tmai.com.myapplication;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

public class WifiReceiver extends BroadcastReceiver{
@Override
public void onReceive(Context context, Intent intent) {
// TODO Auto-generated method stub
if(intent.getAction().equals(WifiManager.RSSI_CHANGED_ACTION)){
//signal strength changed
}
else if(intent.getAction().equals(WifiManager.NETWORK_STATE_CHANGED_ACTION)){//wifi连接上与否
System.out.println("网络状态改变");
NetworkInfo info = intent.getParcelableExtra(WifiManager.EXTRA_NETWORK_INFO);
if(info.getState().equals(NetworkInfo.State.DISCONNECTED)){
System.out.println("wifi网络连接断开");
}
else if(info.getState().equals(NetworkInfo.State.CONNECTED)){

WifiManager wifiManager = (WifiManager)context.getSystemService(Context.WIFI_SERVICE);
WifiInfo wifiInfo = wifiManager.getConnectionInfo();

//获取当前wifi名称
System.out.println("连接到网络 " + wifiInfo.getSSID());

}

}
else if(intent.getAction().equals(WifiManager.WIFI_STATE_CHANGED_ACTION)){//wifi打开与否
int wifistate = intent.getIntExtra(WifiManager.EXTRA_WIFI_STATE, WifiManager.WIFI_STATE_DISABLED);

if(wifistate == WifiManager.WIFI_STATE_DISABLED){
System.out.println("系统关闭wifi");
}
else if(wifistate == WifiManager.WIFI_STATE_ENABLED){
System.out.println("系统开启wifi");
}
}
}
}


<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>


<receiver android:name=".WifiReceiver">
<intent-filter >
<action android:name="android.NET.wifi.RSSI_CHANGED"/>
<action android:name="android.net.wifi.STATE_CHANGE"/>
<action android:name="android.Net.wifi.WIFI_STATE_CHANGED"/>
</intent-filter>
</receiver>






点击操作监听：

public static boolean isWifiConnected(Context context)
{
ConnectivityManager connectivityManager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
NetworkInfo wifiNetworkInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
if(wifiNetworkInfo.isConnected())
{
return true ;
}

return false ;
}
```
## 判断网络是否可用/wifi还是流量

```
使用broadcastreceiver：

public class MainActivity extends AppCompatActivity {
    IntentFilter filter;
    InternetReceiver receiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        filter = new IntentFilter();
        filter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        receiver = new InternetReceiver();
        registerReceiver(receiver, filter);
    }

    class InternetReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            ConnectivityManager manage = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo info = manage.getActiveNetworkInfo();
            if (info != null && info.isAvailable()) {
                if (info.getType() == ConnectivityManager.TYPE_WIFI) {
                    Toast.makeText(context, "wifi", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(context, "流量", Toast.LENGTH_SHORT).show();
                }
            } else {
                Toast.makeText(context, "网络不可用", Toast.LENGTH_SHORT).show();
            }
        }
    }
}


配置文件：
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```



