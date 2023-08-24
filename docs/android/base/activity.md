## activity

[[toc]]

### app 自启动

```
<uses-permission android:name="android.intent.action.BOOT_COMPLETED">
</uses-permission><uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"></uses-permission>

<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.HOME" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.MONKEY" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

<receiver android:name=".broadcast.BootBroadcastReceiver">
<intent-filter>
<action android:name="android.intent.action.PACKAGE_REPLACED" />
<action android:name="android.intent.action.PACKAGE_ADDED" />
<action android:name="android.intent.action.PACKAGE_REMOVED" />

<data android:scheme="package" />
</intent-filter>
</receiver>
```

```
package com.tmai.common.chongqingfaceapp.broadcast;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.tmai.common.chongqingfaceapp.MainActivity;

/**
 * Created by Administrator on 2018/2/26.
 */

public class BootBroadcastReceiver extends BroadcastReceiver {
    static final String ACTION = "android.intent.action.BOOT_COMPLETED";

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        if (intent.getAction().equals("android.intent.action.PACKAGE_REPLACED")) {
            Toast.makeText(context, "升级了一个安装包，重新启动此程序", Toast.LENGTH_SHORT).show();
            Intent intent2 = new Intent(context, MainActivity.class);
            intent2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent2);
        }
        //接收安装广播
        if (intent.getAction().equals("android.intent.action.PACKAGE_ADDED")) {
            String packageName = intent.getDataString();
            System.out.println("安装了:" + packageName + "包名的程序");
        }
        //接收卸载广播
        if (intent.getAction().equals("android.intent.action.PACKAGE_REMOVED")) {
            String packageName = intent.getDataString();
            System.out.println("卸载了:" + packageName + "包名的程序");

        }
    }
}

```


## 静默安装自启动

```
    <uses-permission android:name="android.permission.INSTALL_PACKAGES"/>
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>
```

```
package com.tmai.general.business.login;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import com.tmai.general.business.R;

import org.csr.core.util.ToastUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author zzc 更新安裝APK
 * @time 2016.09.18
 */
public class DownloadApp {
    private ProgressDialog mpDialog;// 创建进度条
    private Context mContext;
    private boolean isSelect = true;
    // APK的安装路径
    private static final String apkPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/updateApkFile/"; //保存下载文件的路径
    private String mUrl;
    private boolean isMust;

    //isSelect 是否强制升级 ，是的话就直接下载更新不弹框
    public DownloadApp(String url, Context ctx, boolean isMust) {
        this.mUrl = url;
        this.mContext = ctx;
        this.isMust = isMust;
    }

    /**
     * 提示用户更新
     *
     * @param content 更新内容
     */
    public void uploadApp(String content, boolean isSelect) {
        if (!isSelect) {
            downloadApk(false);
            return;
        }
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        builder.setMessage("有新版本升级，是否下载安装？\n" + content);
        builder.setTitle("系统版本更新");// str可以提示的内容显示
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                mpDialog = new ProgressDialog(mContext, R.style.activity_dialog);
                mpDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                mpDialog.setTitle("提示");
                mpDialog.setMessage("正在下载中，请稍后");
                mpDialog.setIndeterminate(false);// 进度条是否明确
                mpDialog.setCancelable(false);// 点击返回按钮的时候无法取消对话框
                mpDialog.setCanceledOnTouchOutside(false);// 点击对话框外部取消对话框显示
                mpDialog.setProgress(0);// 设置初始进度条为0
                mpDialog.incrementProgressBy(1);// 设置进度条增涨。
                mpDialog.show();
                downloadApk(true);
                dialog.dismiss();
            }
        });
        builder.setCancelable(false);
        if (!isMust) {
            builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {

                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });

        }
        builder.create().show();
    }

    /**
     * 下载apk
     */
    public void downloadApk(boolean isShow) {
        this.isSelect = isShow;
        //开启另一线程下载
        Thread downLoadThread = new Thread(downApkRunnable);
        downLoadThread.start();
    }

    /**
     * 从服务器下载新版apk的线程
     */
    private Runnable downApkRunnable = new Runnable() {
        @Override
        public void run() {
            if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
                //如果没有SD卡
                AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
                builder.setTitle("提示");
                builder.setMessage("当前设备无SD卡，数据无法下载");
                builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                builder.show();
            } else {
                InputStream is = null;
                FileOutputStream fos = null;
                try {
                    //服务器上新版apk地址
                    URL url = new URL(mUrl);
                    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                    httpURLConnection.setConnectTimeout(30000);
                    httpURLConnection.setReadTimeout(30000);
                    httpURLConnection.setDoInput(true);
                    httpURLConnection.connect();
                    int length = httpURLConnection.getContentLength();
                    if (isSelect) {
                        mpDialog.setMax(length);
                    }
                    is = httpURLConnection.getInputStream();
                    File file = new File(apkPath);
                    if (!file.exists()) {
                        //如果文件夹不存在,则创建
                        file.mkdir();
                    }
                    //下载服务器中新版本软件（写文件）
                    String path = apkPath + "detectionface.apk";
                    File apkFile = new File(path);
                    fos = new FileOutputStream(apkFile);
                    int count = 0;
                    byte buf[] = new byte[10240];
                    do {
                        int numRead = is.read(buf);
                        count += numRead;
                        //更新进度条
                        if (isSelect) {
                            mpDialog.setProgress(count);
                        }
                        if (numRead <= 0) {
                            //下载完成通知安装
                            sendMsg(2);
                            break;
                        }
                        fos.write(buf, 0, numRead);

                    } while (true);

                } catch (IOException e) {
                    e.printStackTrace();
                    sendMsg(-1);
                } finally {
                    try {
                        if (fos != null) {
                            fos.close();
                        }
                        if (is != null) {
                            is.close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    };

    // 安装apk方法
    private void installApk(String filename) {
        File file = new File(filename);
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.putExtra("SILENT_INSTALL", 2);
        String type = "application/vnd.android.package-archive";
        intent.setDataAndType(Uri.fromFile(file), type);
        mContext.startActivity(intent);
        if (mpDialog != null) {
            mpDialog.cancel();
        }
    }

    private void sendMsg(int flag) {
        Message msg = handler.obtainMessage();
        msg.what = flag;
        handler.sendMessage(msg);
    }

    private final Handler handler = new Handler(Looper.myLooper()) {
        public void handleMessage(Message msg) {
            if (!Thread.currentThread().isInterrupted()) {
                switch (msg.what) {
                    case 2:
                        if (isSelect) {
                            mpDialog.setMessage("文件下载完成");
                        }
                        String apkName = apkPath + "detectionface.apk";
                        installApk(apkName);
                        break;
                    case -1:
                        if (isSelect) {
                            mpDialog.setMessage("下载失败！");
                            mpDialog.setCanceledOnTouchOutside(true);
                        } else {
                            ToastUtil.toastShort(mContext, "app下载失败！");
                        }
                        break;
                    default:
                        break;
                }
            }
            super.handleMessage(msg);
        }
    };
}
```

## 调用系统浏览器下载避免权限无法安装的问题

```
Intent intent = new Intent();
intent.setAction("android.intent.action.VIEW");
Uri content_url = Uri.parse(downloadUrl);
intent.setData(content_url);
startActivity(intent);

```

```
protected void installApk(File file) {
Intent intent = new Intent();
intent.setAction("android.intent.action.VIEW");
intent.addCategory("android.intent.category.DEFAULT");
//注意:这两个要一起设两个参数,一个是uri,一个是type,因为单独设的话会出现.清空前一个的设置.
intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
startActivity(intent);
}



//传递一个Apk的file就可以
protected void installApk(File file) {
//参照需要启动的Activity的filter配置去进行Intent设制就可以
// <action android:name="android.intent.action.VIEW" />
//        <category android:name="android.intent.category.DEFAULT" />
//        <data android:scheme="content" />
//        <data android:scheme="file" />
//        <data android:mimeType="application/vnd.android.package-archive" />
Intent intent = new Intent();
intent.setAction("android.intent.action.VIEW");
intent.addCategory("android.intent.category.DEFAULT");
// intent.setType("application/vnd.android.package-archive");
// intent.setData(Uri.fromFile(file));
//注意:这两个要一起设两个参数,一个是uri,一个是type,因为单独设的话会出现清空前一个的设置.
intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
startActivity(intent);
}
```


## 查看当前是哪个界面

```
onresume中：
Log.i("tag", "2--" + getClass().getSimpleName());

```

## 透明

```
<style name="TransparentActivity" parent="Theme.AppCompat.Light.DarkActionBar">
<item name="android:windowBackground">@android:color/transparent</item>
<item name="android:colorBackgroundCacheHint">@null</item>
<item name="android:windowIsTranslucent">true</item>
<item name="android:windowNoTitle">true</item>
<item name="android:windowContentOverlay">@null</item>
</style>
```

## 关闭指定的 activity

```
1： 在每个acitivy添加此代码。

private void registReC() {
IntentFilter filter = new IntentFilter();
filter.addAction("finish2");
registerReceiver(new Main2Rec(), filter);
}

private class Main2Rec extends BroadcastReceiver {

@Override
public void onReceive(Context context, Intent intent) {
finish();
}
}
2：在需要的关闭其他activity时：

sendBroadcast(new Intent("finish2"));  即可

```

## 两个 actvitiy 间传递 bitmap

系统限制了传递大小，传递图片过大会报错，解决办法：  
把 bitmap 存储为 byte 数组，然后再通过 Intent 传递。

发送：

```
      ReceiptPreviewTrans receiptPreviewTrans = new ReceiptPreviewTrans();
        Bitmap bitmap = receiptPreviewTrans.preview(transData);
        Intent intent = new Intent(context, PrintPreviewActivity.class);
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte [] bitmapByte =baos.toByteArray();
        intent.putExtra("bitmap", bitmapByte);
        context.startActivity(intent);

```

接收：

```

private byte [] bis;

bis=intent.getByteArrayExtra("bitmap");
bitmap= BitmapFactory.decodeByteArray(bis, 0, bis.length);
```