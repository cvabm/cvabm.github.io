# 其他硬件
[[toc]]

## 指纹
<https://github.com/uccmawei/FingerprintIdentify>  


## 人脸识别安卓原生
```


获取相机最大支持人脸数量

int maxNumDetectedFaces = mCamera.getParameters().getMaxNumDetectedFaces();
//        if (maxNumDetectedFaces > 0) {
//            Log.d("ljg", "surfaceChanged: ");
//            mCamera.setFaceDetectionListener(this);
//            mCamera.startPreview();
//            mCamera.startFaceDetection();
//            return;
//        }else {
//            Log.d("ljg", "surfaceChanged: not ");
//        }

获取人脸识别返回的数据
@Override
//    public void onFaceDetection(Camera.Face[] faces, Camera camera) {
//          在这里对返回的人脸数据做处理
//        Log.d("ljg", "onFaceDetection: "); 
//
//    }






检测某一张图片上的人脸

Bitmap bmp= BitmapFactory.decodeResource(getResources(), R.drawable.aaa);
int face = findFace(bmp);
Log.d("ljg", "2抓到人臉: "+face);


private int findFace(Bitmap bitmap){
    Bitmap tmpBmp = bitmap.copy(Bitmap.Config.RGB_565, true);
    //设置最多检测多少个 Face
    int maxFace = 1;
    FaceDetector mFaceDetector = new FaceDetector(tmpBmp.getWidth(),
            tmpBmp.getHeight(), maxFace);
    FaceDetector.Face[] mFace = new FaceDetector.Face[maxFace];
    // 实际检测到的脸数
    int faceCount = mFaceDetector.findFaces(tmpBmp, mFace);
    return faceCount;
}



```

## 蓝牙
<https://www.jianshu.com/p/795bb0a08beb>（fastble）  
## 热敏打印通用  
<https://github.com/GrassQing/CommonPrintProvider>

## 震动效果的实现
```
Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
vibrator.vibrate(200);//表示震动两百毫秒
//如果是下面这种前面参数表示震动频率,一百,两百,一百,后面的参数表示震动周期.也就是重复多少次
vibrator.vibrate(new long[]{100,200,100}, 2);
//最后在manifest.xml中注册权限

<uses-permission android:name="android.permission.VIBRATE"/>
```


## usb摄像头demo  
<https://github.com/jiangdongguo/AndroidUSBCamera>  
## android上访问u盘
<https://github.com/magnusja/libaums>
[Android-USB-OTG-读写U盘文件 - 简书](https://www.jianshu.com/p/a32e376ea70e)  
