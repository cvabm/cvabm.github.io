# 其他硬件

[[toc]]

## 指纹

<https://github.com/uccmawei/FingerprintIdentify>

## 人脸识别安卓原生

```java


获取相机最大支持人脸数量

int maxNumDetectedFaces = mCamera.getParameters().getMaxNumDetectedFaces();
//        if (maxNumDetectedFaces > 0) {
//            Log.d("tag", "surfaceChanged: ");
//            mCamera.setFaceDetectionListener(this);
//            mCamera.startPreview();
//            mCamera.startFaceDetection();
//            return;
//        }else {
//            Log.d("tag", "surfaceChanged: not ");
//        }

获取人脸识别返回的数据
@Override
//    public void onFaceDetection(Camera.Face[] faces, Camera camera) {
//          在这里对返回的人脸数据做处理
//        Log.d("tag", "onFaceDetection: ");
//
//    }

检测某一张图片上的人脸

Bitmap bmp= BitmapFactory.decodeResource(getResources(), R.drawable.aaa);
int face = findFace(bmp);
Log.d("tag", "2抓到人臉: "+face);


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

##　震动问题(android10 无法后台震动)

```java
 Vibrator mVibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
   long[] patern = {0,1000,1000};
    AudioAttributes audioAttributes = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_ALARM) //key
                    .build();
            mVibrator.vibrate(pattern, 1, audioAttributes);
        }else {
            mVibrator.vibrate(pattern, 1);
        }


```

## usb 摄像头 demo

<https://github.com/jiangdongguo/AndroidUSBCamera>

## android 上访问 u 盘

<https://github.com/magnusja/libaums>
[Android-USB-OTG-读写 U 盘文件 - 简书](https://www.jianshu.com/p/a32e376ea70e)

## 串口通信

<https://github.com/freyskill/SerialPortHelper>

### 查看串口波特率命令

<https://m.dgzj.com/tongxin/50113.html>

### Android 端串口通讯开发整理

<https://juejin.cn/post/6844903892208058381>  
<https://www.jianshu.com/p/e9a062074ab4>  
<https://github.com/fm183/SerialportDemo>  
<https://github.com/freyskill/SerialPortHelper>

### android 串口调试助手

<https://github.com/licheedev/Android-SerialPort-Tool>  
<https://github.com/licheedev/Android-SerialPort-API>

### 蓝牙耳机和有线耳机监听
```js
    this.wiredHeadsetListener1 = NativeModule.addListener('onAudioDeviceChanged', (data) => {
            console.log("11测试，" + JSON.stringify(data))
            if (data) {
                let availableAudioDeviceList = data.availableAudioDeviceList;
                if (availableAudioDeviceList.indexOf('BLUETOOTH') >= 0) {
                    if (data.selectedAudioDevice != 'BLUETOOTH') {
                        this.state.deviceBluetooth = true
                        InCallManager.chooseAudioRoute("BLUETOOTH");
                        Global.hasEarphone = true
                        console.log("测试，切换到蓝牙")
                    }
                } else {
                    Global.hasEarphone = false
                    this.state.deviceBluetooth = false
                    if (Global.isSoundOpen) {
                        InCallManager.chooseAudioRoute("SPEAKER_PHONE");
                        console.log("测试，切换到扬声器")
                    } else {
                        InCallManager.chooseAudioRoute("EARPIECE");
                        console.log("测试，切换到听筒")
                    }
                }
            }
        });
        this.wiredHeadsetListener2 = NativeModule.addListener('WiredHeadset', (data) => {
            console.log("22测试" + JSON.stringify(data))
            if (data) {
                if (this.state._isPlug) {
                    if (!data.isPlugged) {
                        Global.hasEarphone = false
                        if (Global.isSoundOpen) {
                            InCallManager.chooseAudioRoute("SPEAKER_PHONE");
                            console.log("测试，切换到扬声器")
                        } else {
                            InCallManager.chooseAudioRoute("EARPIECE");
                            console.log("测试，切换到听筒")
                        }
                    }
                }
                this.state._isPlug = data.isPlugged;
                if (this.state._isPlug) {
                    Global.hasEarphone = true
                }
            }
        });
```