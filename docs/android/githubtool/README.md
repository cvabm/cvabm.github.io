## 常用
[[toc]]
[laobie/StatusBarUtil: A util for setting status bar style on Android App](https://github.com/laobie/StatusBarUtil)  
qmui<https://qmuiteam.com/>  
WebSocket库<https://socket.io/>  

<https://github.com/Tamsiree/RxTool>  


## 二维码
<https://github.com/yipianfengye/android-zxingLibrary>  
<https://github.com/bingoogolapple/BGAQRCode-Android>

## booster质量优化  
<https://github.com/didi/booster/blob/master/README.md>  



## ipv6

[Android 通过Java方法获取所有IPv6地址 - Amosstan的博客 - CSDN博客](https://blog.csdn.net/Amosstan/article/details/81626343)  
[Android 6.0 正确获取IP及MAC - 简书](https://www.jianshu.com/p/8c6b931006f9)  
[基于Android系统的IPv6网络接入分析 - IT之旅 的博客 - CSDN博客](https://blog.csdn.net/qq_24754061/article/details/72786797)  

[线程框架：]
<https://github.com/OnlyTerminator/GeekThread>
## 权限相关  
[andPermission](https://github.com/yanzhenjie/AndPermission/blob/master/README-CN.md)  
```
boolean isNotWarn = false;

public void requstPermisson(View view) {
	AndPermission.with(this).permission(Permission.CAMERA).callback(new PermissionListener() {@Override public void onSucceed(int requestCode, @NonNull List < String > grantPermissions) {

}

		@Override public void onFailed(int requestCode, @NonNull List < String > deniedPermissions) {
			// 用户否勾选了不再提示并且拒绝了权限，那么提示用户到设置中授权。
			if (AndPermission.hasAlwaysDeniedPermission(MainActivity.this, deniedPermissions)) {
				// 第一种：用默认的提示语。
				isNotWarn = true;
			}
		}

	}).rationale(new RationaleListener() {@Override public void showRequestPermissionRationale(int requestCode, Rationale rationale) {
			AndPermission.rationaleDialog(MainActivity.this, rationale).show();
		}
	}).start();
	if (isNotWarn) {
		AndPermission.defaultSettingDialog(MainActivity.this, 100).show();
	}
}
```

<https://github.com/permissions-dispatcher/PermissionsDispatcher>    
<https://github.com/tbruyelle/RxPermissions>    
[android6.0权限适配：](https://github.com/jokermonn/permissions4m)  







## 支付(微信支付宝等)
<https://github.com/mayubao/Android-Pay>  
<https://github.com/vondear/RxTools>  
<http://www.open-open.com/lib/view/open1461241765752.html>  
<https://gitee.com/javen205/IJPay>  

## 拼音转换
<https://github.com/belerweb/pinyin4j>

## 快速开发mvp框架  
<https://github.com/TommyLemon/Android-ZBLibrary>  
## 命令行检查语法
<https://github.com/nvbn/thefuck>  

## 常用轮子汇总
<https://github.com/Trinea/android-open-project>  

## postman请求https网址没有响应，但是用浏览器有响应
<https://blog.csdn.net/ab411919134/article/details/81205793>
## 模拟http请求软件：代替postman的： 
<https://paw.cloud>  
## curl：
<https://curl.haxx.se>  
### 带多参数：  
<https://segmentfault.com/q/1010000008630196>
## 抓包：
<https://github.com/jgilfelt/chuck>   
wireshark  
<https://blog.csdn.net/ch853199769/article/details/78753963>  
<https://www.wireshark.org/>  
<https://www.crifan.com/wireshark_filter_display_keyword_for_weixin_http_request/>    
抓包手机<https://www.jianshu.com/p/4a554f55fe9c>    
Fidder  
<https://www.cnblogs.com/findyou/p/3491014.html>    
模拟网速慢  
<https://www.jianshu.com/p/4c138888c700>   
charles  
<https://www.charlesproxy.com/>  
下载后，把破解文件charles.jar拷贝到安装目录/lib中 ，替换即可  
条件：手机和电脑处于同一ip地址下  
使用  
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/befc592a-adc7-4585-8381-0ee82e3af2d0.png)
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/27a89a79-d38c-4f5d-9c0c-56225c76b5d2.png)
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/4645674564564.png)


### 插件化：
<https://github.com/Qihoo360/DroidPlugin/blob/master/readme_cn.md>  
<https://github.com/shuai999/AndroidPluginDemo> 

## 缓存diskLruCache：
<https://www.jianshu.com/p/f9cfbea586c2>  
<https://github.com/JakeWharton/DiskLruCache>  
### java和js互相调用  
<https://github.com/square/duktape-android>  



```
卸载软件
sudo apt-get remove 软件名  
```

### 屏幕截屏：
<https://github.com/goodbranch/ScreenCapture>    

```

带状态栏和不带状态栏



public static Bitmap captureWithoutStatusBar(Activity activity) {
View view = activity.getWindow().getDecorView();
view.setDrawingCacheEnabled(true);
view.buildDrawingCache();
Bitmap bmp = view.getDrawingCache();
int statusBarHeight = RxBarTool.getStatusBarHeight(activity);
int width = getScreenWidth(activity);
int height = getScreenHeight(activity);
Bitmap ret = Bitmap.createBitmap(bmp, 0, statusBarHeight, width, height - statusBarHeight);
view.destroyDrawingCache();
return ret;
}


public static Bitmap captureWithStatusBar(Activity activity) {
View view = activity.getWindow().getDecorView();
view.setDrawingCacheEnabled(true);
view.buildDrawingCache();
Bitmap bmp = view.getDrawingCache();
int width = getScreenWidth(activity);
int height = getScreenHeight(activity);
Bitmap ret = Bitmap.createBitmap(bmp, 0, 0, width, height);
view.destroyDrawingCache();
return ret;
}



public static int getScreenHeight(Context context) {
WindowManager wm = (WindowManager)context.getSystemService("window");
int height = wm.getDefaultDisplay().getHeight();
return height;
}

public static int getScreenWidth(Context context) {
WindowManager wm = (WindowManager)context.getSystemService("window");
int width = wm.getDefaultDisplay().getWidth();
return width;
}



public static int getStatusBarHeight(Context context) {
int result = 0;
int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
if (resourceId > 0) {
result = context.getResources().getDimensionPixelSize(resourceId);
}

return result;
}

```



说明： android5.0以前需要root，5.0之后开放了接口。  
### 滚动截屏（仿miui）
<https://github.com/android-notes/auto-scroll-capture>   
 
## 很多工具聚合  
<https://github.com/vondear/RxTools>      
<http://r.codekk.com/r/type/android>    
<https://github.com/XXApple/AndroidLibs>


                                                                                                                                                                
