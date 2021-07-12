# 功能点
[[toc]]
## Android7.0版本更新
```


1：显示更新对话框
MyAutoUpdate dialog = new MyAutoUpdate(ConvenientEnergyMainActivity.this);
dialog.showUpdateDialog(downloadUrl, content, updateStatus);

2： 具体对话框类
package com.corerate.cep;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.corerate.cep.util.DialogPromptTools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class MyAutoUpdate {
    public Activity activity = null;
    public int versionCode = 0;
    public String versionName = "";
    private static final String TAG = "AutoUpdate";
    private String currentFilePath = "";
    private String currentTempFilePath = "";
    private String fileEx = "";
    private String fileNa = "";

    public MyAutoUpdate(Activity activity) {
        this.activity = activity;
        getCurrentVersion();
    }

    public void showUpdateDialog(final String downloadUrl, String content, String updateStatus) {
        if (updateStatus.equals("01")) {
            DialogPromptTools.showVersionDialog(this.activity, "发现新版本，是否需要更新？", content, "更新", "取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Log.i("ljg", "down" + downloadUrl);
                    downloadTheFile(downloadUrl);
                    dialog.cancel();
                }
            }, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            });
        } else if (updateStatus.equals("02")) {
            DialogPromptTools.showVersionMustDialog(this.activity, "发现新版本，是否需要更新？", content, "更新", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    downloadTheFile(downloadUrl);
                    dialog.cancel();
                }
            });
        }

    }

    public String getCurrentVersion() {
        try {
            PackageInfo info = activity.getPackageManager().getPackageInfo(
                    activity.getPackageName(), 0);
            this.versionCode = info.versionCode;
            this.versionName = info.versionName;
        } catch (NameNotFoundException e) {
            e.printStackTrace();
        }
        return versionName;
    }

    private void downloadTheFile(final String strPath) {
        fileEx = strPath.substring(strPath.lastIndexOf(".") + 1, strPath.length())
                .toLowerCase();
        fileNa = strPath.substring(strPath.lastIndexOf("/") + 1,
                strPath.lastIndexOf("."));
        try {
            if (strPath.equals(currentFilePath)) {
                doDownloadTheFile(strPath);
            }
            currentFilePath = strPath;
            Runnable r = new Runnable() {
                public void run() {
                    try {
                        doDownloadTheFile(strPath);
                    } catch (Exception e) {
                        Log.e(TAG, e.getMessage(), e);
                    }
                }
            };
            new Thread(r).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void doDownloadTheFile(String strPath) throws Exception {
            URL myURL = new URL(strPath);
            URLConnection conn = myURL.openConnection();
            conn.connect();
            InputStream is = conn.getInputStream();
            if (is == null) {
                throw new RuntimeException("stream is null");
            }
            File myTempFile = File.createTempFile(fileNa, "." + fileEx);
            currentTempFilePath = myTempFile.getAbsolutePath();
            FileOutputStream fos = new FileOutputStream(myTempFile);
            byte buf[] = new byte[128];
            do {
                int numread = is.read(buf);
                if (numread <= 0) {
                    break;
                }
                fos.write(buf, 0, numread);
            } while (true);
            Process p = Runtime.getRuntime().exec("chmod 666 " + myTempFile);
            int status = p.waitFor();
            if (status == 0) {
                //chmod succeed
                Intent intent =new Intent(Intent.ACTION_VIEW);
                if(Build.VERSION.SDK_INT>= Build.VERSION_CODES.N) {
                    Uri contentUri = FileProvider.getUriForFile(activity,"com.corerate.cep.fileprovider",myTempFile);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    intent.setDataAndType(contentUri,"application/vnd.android.package-archive");
                }else{
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.setDataAndType(Uri.fromFile(myTempFile),"application/vnd.android.package-archive");
                }
                activity.startActivity(intent);
            } else {
                DialogPromptTools.showTextToast(this.activity, R.string.version_update_failed);
                //chmod failed
            }
            try {
                is.close();
            } catch (Exception ex) {
                Log.e(TAG, "getDataSource() error: " + ex.getMessage(), ex);
            }
        }

}
3：权限
配置文件加入：
<provider
    android:name="android.support.v4.content.FileProvider"
    android:authorities="com.corerate.cep.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
<meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths"/>
</provider>

res中新建：xml/file_paths文件
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <paths>
        <external-path path="" name="camera_photos" />
        <external-path path="Android/data/com.corerate.cep/" name="files_root"/>
        <external-path path="." name="external_storage_root"/>
        <files-path name="name1" path="." />
        <cache-path name="name2" path="." />
        <external-path name="name3" path="." />
        <external-files-path name="name4" path="." />
        <external-cache-path name="name5" path="." />
    </paths>
</resources>



```


## openvpn for android
https://github.com/schwabe/ics-openvpn 

编译步骤介绍  
https://github.com/schwabe/ics-openvpn/blob/master/doc/README.txt  

```
- Install sdk, ndk, cmake (e.g. with Android studio), swig (3.0+), on
  Windows perl might be needed for mbedtls

git clone ....
 git submodule init
  git submodule update

```
Build the project using "gradle build" (Or use Android Studio).  

最后需要改一下Mainactivity，然后启动

## vpnservice实现vpn初步连接
<http://www.demodashi.com/demo/15852.html>

## openvpn for ios
<https://medium.com/better-programming/how-to-build-an-openvpn-client-on-ios-c8f927c11e80>

## 引导页 
<http://www.jcodecraeer.com/a/opensource/2015/0827/3373.html>  
```


package com.corerate.cep;

import com.corerate.cep.activity.ConvenientEnergyMainActivity;
import com.corerate.cep.container.HomeEnergyApplication;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

public class LaunchPageActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      if (!HomeEnergyApplication.data.sPreferences.getBoolean("guide", false))
        mHandler.sendEmptyMessageDelayed(0x02, 0);
      else
        mHandler.sendEmptyMessageDelayed(0x01, 0);
  }

  @SuppressLint("HandlerLeak")
  private Handler mHandler = new Handler() {
      public void handleMessage(Message msg) {
        switch (msg.what) {
        case 0x01:
            Intent mIntent = new Intent();
            mIntent.setClass(LaunchPageActivity.this,
                  ConvenientEnergyMainActivity.class);
            LaunchPageActivity.this.startActivity(mIntent);
            LaunchPageActivity.this.finish();
            break;
        case 0x02:
            mIntent = new Intent();
            mIntent.setClass(LaunchPageActivity.this,
                  GuidePageActivity.class);
            LaunchPageActivity.this.startActivity(mIntent);
            LaunchPageActivity.this.finish();
            break;
        }
        super.handleMessage(msg);
      }
  };
}





2:FrameLayout是最简单的布局了。所有放在布局里的控件，都按照层次堆叠在屏幕的左上角。后加进来的控件覆盖前面的控件。

cp_guide_page.xml

<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <android.support.v4.view.ViewPager
            android:id="@+id/guide_view_pager"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <RelativeLayout
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <LinearLayout
                android:id="@+id/view_points_ll"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_alignParentBottom="true"
                android:layout_marginBottom="40dp"
                android:gravity="center_horizontal"
                android:orientation="horizontal">
            </LinearLayout>
        </RelativeLayout>
    </LinearLayout>
</FrameLayout>




guidePageActivity.java


package com.corerate.cep;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.RelativeLayout;

import com.corerate.cep.R;
import com.corerate.cep.activity.ConvenientEnergyMainActivity;
import com.corerate.cep.adapter.GuidePageAdapter;
import com.corerate.cep.container.HomeEnergyApplication;

public class GuidePageActivity extends Activity {
    private ViewPager viewPager;
    private List<View> pageViews;
    private ImageView[] imgViews;
    private ViewGroup viewPoints; //包裹小圆点的LinearLayout

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.cp_guide_page);
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadPageControl();
        loadPageListening();
    }

    private void loadPageControl() {
        HomeEnergyApplication.data.sPreferences.edit().putBoolean("guide", true).commit();

        initGuidePage();

        viewPoints = (ViewGroup) findViewById(R.id.view_points_ll);
        viewPager = (ViewPager) findViewById(R.id.guide_view_pager);

        //添加小圆点的图片
        imgViews = new ImageView[pageViews.size()];
        for (int i = 0; i < pageViews.size(); i++) {
            ImageView imageView = new ImageView(this);
            LayoutParams lp = new LayoutParams(20, 20);
            lp.setMargins(10, 0, 10, 40);
            imageView.setLayoutParams(lp);
            imgViews[i] = imageView;

            if (i == 0) {
                imgViews[i].setBackgroundResource(R.drawable.guide_page_img_select);
            } else {
                imgViews[i].setBackgroundResource(R.drawable.guide_page_img);
            }

            viewPoints.addView(imgViews[i]);
        }

        GuidePageAdapter gpa = new GuidePageAdapter(pageViews);
        viewPager.setAdapter(gpa);
    }

    private void loadPageListening() {
        viewPager.setOnPageChangeListener(new OnPageChangeListener() {
            @Override
            public void onPageSelected(int pos) {
                for (int i = 0; i < imgViews.length; i++) {
                    imgViews[pos].setBackgroundResource(R.drawable.guide_page_img_select);
                    //不是当前选中的page，其小圆点设置为未选中的状态
                    if (pos != i) {
                        imgViews[i].setBackgroundResource(R.drawable.guide_page_img);
                    }
                }
            }

            @Override
            public void onPageScrolled(int arg0, float arg1, int arg2) {
            }

            @Override
            public void onPageScrollStateChanged(int arg0) {
            }
        });
    }


    private void initGuidePage() {
        pageViews = new ArrayList<View>();
        LinearLayout.LayoutParams llp = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

        LinearLayout ll1 = new LinearLayout(this);
        ll1.setLayoutParams(llp);
        ll1.setBackgroundResource(R.drawable.guide_page_1);
        pageViews.add(ll1);

        LinearLayout ll2 = new LinearLayout(this);
        ll2.setLayoutParams(llp);
        ll2.setBackgroundResource(R.drawable.guide_page_2);
        pageViews.add(ll2);

        RelativeLayout ll3 = new RelativeLayout(this);
        ll3.setLayoutParams(new RelativeLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        ll3.setBackgroundResource(R.drawable.guide_page_3);

        Button btn = new Button(ll3.getContext());
        RelativeLayout.LayoutParams rl = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        rl.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, RelativeLayout.TRUE);
        rl.addRule(RelativeLayout.CENTER_HORIZONTAL);
        rl.setMargins(0, 0, 0, 160);
        btn.setLayoutParams(rl);
        btn.setTextSize(22f);
        btn.setTextColor(getResources().getColor(android.R.color.white));
        btn.setText("我要充电");
        btn.setBackgroundResource(R.drawable.guide_page_btn);
        btn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(GuidePageActivity.this, ConvenientEnergyMainActivity.class));
                finish();
            }
        });

        ll3.addView(btn);
        pageViews.add(ll3);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
            startActivity(new Intent(GuidePageActivity.this, ConvenientEnergyMainActivity.class));
            finish();
        }
        return false;
    }
}
guide_page_btn ，
guide_page_img_select，
guide_page_img

```

## 横竖屏切换
```
监听：
< activity 
android:name="MyActivity"
android:configChanges="orientation|keyboardHidden">
public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
               //加入横屏要处理的代码
               
    }else if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                   //加入竖屏要处理的代码}}

切换横竖屏时生命周期变化：
1、不设置Activity的android:configChanges: 
Onpause onstop ondestory oncreate onstart onresume
2、设置Activity的android:configChanges=”orientation|keyboardHidden”：
只会执行onConfigurationChanged

保存数据和恢复数据方法：onSaveInstanceState和onRestoreInstanceState方法
固定横竖屏：Android:screenOrientation=landscape/orientation
切换时不摧毁：Android:configChanges=orientation|keyboardHidden|screenSize

```
**后台时监听横竖屏**
```
一、写一个service然后重写onConfigurationChanged，即使程序退到后台，但是屏幕旋转的时候service的监听任然还是会回调

二、动态注册一个广播

这个广播只能在java代码中动态注册，不能在xml文件中注册,否则不会起作用

通过动态注册广播监听


IntentFilter intentFilter = new IntentFilter();

intentFilter.addAction("android.intent.action.CONFIGURATION_CHANGED");

registerReceiver(mOrientationReciver,intentFilter);

然后在广播里面判断屏幕的旋转角度


private class orientationReciverextends BroadcastReceiver
{
@Override
    public void onReceive(Context context, Intent intent) {
Log.i(TAG, "onReceive: "+MainActivity.this.getWindowManager().getDefaultDisplay().getRotation()*90);
    }
}

作者：自由的小鱼儿
链接：https://www.jianshu.com/p/e49964b6cc0f
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


## 后台保活 

<https://juejin.im/post/5dfaeccbf265da33910a441d>  



## android多渠道、多版本打包
 -- 不同包名、不同签名、不同版本号、替换string、icon等  
1、app/build.gradle 文件的修改，增加：productFlavors
1.1、defaultConfig注释掉原本的applicationId，不然会和多渠道内的包名有冲突
1.2、versionCode和versionName也可以配置进productFlavors中去，不多说
1.3、buildTypes暂时就用默认的
1.4、productFlavors下一般有这几部分组成

2、修改工程的目录
在app目录同级增加其他的Flavors文件夹，  
比如替换app_name，原本app下values中string.xml的app_name注释掉   

注： 配置文件里用通配符引用例如： android:authorities="${applicationId}.provider"   


例：  

```

gradle.properties：

MYAPP_RELEASE_STORE_FILE=danbing_release.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=tdyg123
MYAPP_RELEASE_KEY_PASSWORD=tdyg123

MYAPP_RELEASE_STORE_FILE2=claireye_release.jks
MYAPP_RELEASE_KEY_ALIAS2=claireye_release


android{}内：  

    signingConfigs {
        normalRelease {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }

        claireyeRelease {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE2')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE2)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS2
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }


      buildTypes {
    release {
      // 省略其他配置...
        signingConfig null  // 置空
    }

    debug {
      // 省略其他配置...
        signingConfig null // 置空
    }
    }
    productFlavors {
        normal {
            applicationId "com.amplesky.client.cdc"
            versionCode 13
            versionName "1.0.12"
            dimension "implementation"
            buildConfigField 'boolean', 'openvpn3', 'true'
            signingConfig = signingConfigs.normalRelease
            manifestPlaceholders = [
                    VpnfileProvider: "com.amplesky.client.cdc.provider"
            ]
        }

        claireye {
            applicationId "com.amplesky.client.claireye"
            versionCode 13
            versionName "1.0.12"
            dimension "implementation"
            buildConfigField 'boolean', 'openvpn3', 'true'
            signingConfig = signingConfigs.claireyeRelease
            manifestPlaceholders = [
                    VpnfileProvider: "com.amplesky.client.claireye.provider"
            ]

        }

    }

    applicationVariants.all {
        //判断是release还是debug版本
        def buildType = it.buildType.name
        def fileName
        //获取当前时间的"YYYY-MM-dd"格式。
        def createTime = new Date().format("YYYYMMddHHmm", TimeZone.getTimeZone("GMT+08:00"))
        //只对Release包起作用，如果不是Release包则不变更输出路径，否则可能导致AS无法自动安装debug包。
        if (buildType == "release") {
            it.getPackageApplication().outputDirectory = new File(project.rootDir.absolutePath + "/apks")
        }
        def channel = it.productFlavors[0].name
        it.outputs.each {
            //只对Release包起作用，如果不是Release包则不变更名称。
            if (buildType == "release") {
                //我此处的命名规则是：渠道名_项目名_版本名_创建时间_构建类型.apk
                fileName = "danbing_v${defaultConfig.versionName}-${buildType}_${createTime}.apk"
                fileName = "${channel}_danbing_v${defaultConfig.versionName}_${createTime}-${buildType}.apk"
                //将名字打印出来，以便及时查看是否满意。
                println "file name：-----------------${fileName}"
                //重新对apk命名。(适用于Gradle4.0（含）以上版本)如果你Gradle版本是4.0以下版本则将上面的一行代码放开并注释下面的这一行。
                it.outputFileName = fileName
            }
        }
    }


```

---

apk安装遇到问题  
1：Package couldn't be install... & provider is already used by    
配置文件中的content provider设置authorities为不相同的  


## 悬浮窗

https://blog.csdn.net/dongzhong1990/article/details/80512706  



## deeplink
官网：https://developer.android.com/training/app-links  
https://juejin.cn/post/6844903477571928071  
