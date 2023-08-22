[[toc]]

## 免费生成 app 不同分辨率图标

<http://bingoicon.com/>

## 免费素材
png 转 svg<https://www.aconvert.com/cn/image/png-to-svg>  
Android SVG to VectorDrawable  
<http://inloop.github.io/svg2android/>  
material design icons  
<https://www.materialpalette.com/icons>  
<https://thenounproject.com/>  
Android 图标生成  
<https://romannurik.github.io/AndroidAssetStudio/index.html>  
<https://fontawesome.com/>
<https://www.appicon.co/>   
音效  
<https://www.aigei.com/>  
icon  
<https://www.iconfinder.com/>  
### 图片格式转换 png->svg

https://vectormagic.com/
png->ico  
<https://www.aconvert.com/cn/icon/png-to-ico/>

### 可商用视频

<https://www.pexels.com/video>

<https://www.videezy.com/>(大部分是几十秒的高质量视频)

## 图片压缩

<https://tinypng.com/>  
<http://isparta.github.io/>  
google 出品<https://squoosh.app/>

## 截图

简单但强大的电脑端截图工具，堪称真正的截图神器，适用于 Windows 系统、Mac 系统  
<https://zh.snipaste.com/index.html>

截长图  
<https://www.faststone.org/>

## 图片编辑

<http://www.imagemagick.com.cn/>

## 图片去除背景

<https://www.fococlipping.com/>

## 显示图片的 exif 信息

```java


package com.hyzhou.pngexifdemo;

import android.media.ExifInterface;
import android.os.Bundle;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.Menu;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends Activity {

    private ImageView img;
    String path="sdcard/DCIM/Camera/IMG_20130924_134616.jpg";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        img=(ImageView)findViewById(R.id.imageView1);
        Bitmap bitmap=BitmapFactory.decodeFile(path);
        try {
            img.setImageBitmap(bitmap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        /*
         * 目前Android SDK定义的Tag有:
        TAG_DATETIME 时间日期
        TAG_FLASH 闪光灯
        TAG_GPS_LATITUDE 纬度
        TAG_GPS_LATITUDE_REF 纬度参考
        TAG_GPS_LONGITUDE 经度
        TAG_GPS_LONGITUDE_REF 经度参考
        TAG_IMAGE_LENGTH 图片长
        TAG_IMAGE_WIDTH 图片宽
        TAG_MAKE 设备制造商
        TAG_MODEL 设备型号
        TAG_ORIENTATION 方向
        TAG_WHITE_BALANCE 白平衡
        */

        try {
            //android读取图片EXIF信息
            ExifInterface exifInterface=new ExifInterface(path);
            String smodel=exifInterface.getAttribute(ExifInterface.TAG_MODEL);
            String width=exifInterface.getAttribute(ExifInterface.TAG_IMAGE_WIDTH);
            String height=exifInterface.getAttribute(ExifInterface.TAG_IMAGE_LENGTH);
            Toast.makeText(MainActivity.this, smodel+"  "+width+"*"+height, Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

}

```

## 免费图标/图片
<https://www.flaticon.com/>  
<https://www.iconfont.cn/>  
<https://icon.kitchen>  

<https://iconpark.oceanengine.com>

<https://www.flaticon.com>  
<https://thenounproject.com>  
<https://pixabay.com/>
<https://iconfinder.com>

## 无版权图片网站

<https://pixabay.com/>  
<https://www.logosc.cn/so/>

## 在线ps

<https://www.uupoop.com/>】

## svg 相关

[img to svg](https://www.visioncortex.org/vtracer/)  
[rn 使用 svg](https://blog.csdn.net/zdluoa/article/details/79951005)  
svg 转换  
<https://react-svgr.com/playground/>  
svg2android  
<http://inloop.github.io/svg2android/>  
SVG 转 PNG/JPG 工具 - 图标工场  
<https://icon.wuruihong.com/tools/svg2png>

### ico 转换

<https://www.wyzda.com/helper/favicon_text.html>