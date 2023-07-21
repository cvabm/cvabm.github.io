[[toc]]

## SoundPool

```java
package com.soft.tm.fingerprint;
import android.annotation.SuppressLint;
import android.content.Context;
import android.media.AudioManager;
import android.media.SoundPool;
import com.soft.tm.R;
import java.util.HashMap;
/**
* 播放声音工具类
*
* @author Administrator
*/
public class SoundPlayer {
    // 声音编号
    public final static int ANSHOUZHI = 1;              //按手指

    private SoundPool soundPool;
    private HashMap<Integer, Integer> soundMap;
    private Context context;

    @SuppressLint("UseSparseArrays")
    public SoundPlayer(Context context) {//声音初始化设置
        this.context = context;
        soundPool = new SoundPool(1, AudioManager.STREAM_MUSIC, 0);
        soundMap = new HashMap<Integer, Integer>();

        soundMap.put(ANSHOUZHI, soundPool.load(context, R.raw.anshouzhi, 1));


    }
    /**
     * 播放声音
     *
     * @param sound
     * @param
     */
    public void playSound(int sound) {
        AudioManager mgr = (AudioManager) context
                .getSystemService(Context.AUDIO_SERVICE);
        float streamVolumeCurrent = mgr .getStreamVolume(AudioManager.STREAM_MUSIC);
        float streamVolumeMax = mgr .getStreamMaxVolume(AudioManager.STREAM_MUSIC);
        float volume = streamVolumeCurrent / streamVolumeMax;
        soundPool.play(soundMap.get(sound), volume, volume, 1, 0, 1f);
        // 参数：1、Map中取值 2、当前音量 3、最大音量 4、优先级 5、重播次数 6、播放速度
    }
    /**
     * 释放
     */
    public void releasePlaySound() {
        soundPool.release();
    }
}

使用：
SoundPlayer player = new SoundPlayer（contenxt）；

    player.play(Soundplayer.ANSHOUZHI);

```

## mediaplayer

```java
mediaPlayer = MediaPlayer.create(this, R.raw.printsuccess);
mediaPlayer.start();
mediaPlayer.release();


设置完数据源，不要忘记prepare()，尽量使用异步prepareAync()，这样不会阻塞UI线程。
start();//开始播放
pause();//暂停播放
reset()//清空MediaPlayer中的数据
setLooping(boolean);//设置是否循环播放
seekTo(msec)//定位到音频数据的位置，单位毫秒
stop();//停止播放
relase();//释放资源
```

### 音频录制

<https://blog.csdn.net/gh8609123/article/details/52963022>

## 录音 pcm 和 wav 格式（自定义采样率）

```java
private void startRecord() {
    AudioUtil.getInstance().startRecord();
}


private void stopRecord() {
    AudioUtil.getInstance().stopRecord();
}

package smartonet.com.myapplication;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Environment;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


/**
* @author kk 录音播放类
*/
public class AudioUtil {


    private static AudioUtil mInstance;
    private AudioRecord recorder;
    //录音源
    private static int audioSource = MediaRecorder.AudioSource.MIC;
    //录音的采样频率
    private static int audioRate = 44100;
    //录音的声道，单声道
    private static int audioChannel = AudioFormat.CHANNEL_IN_MONO;
    //量化的深度
    private static int audioFormat = AudioFormat.ENCODING_PCM_16BIT;
    //缓存的大小
    private static int bufferSize = AudioRecord.getMinBufferSize(audioRate, audioChannel, audioFormat);
    //记录播放状态
    private boolean isRecording = false;
    //数字信号数组
    private byte[] noteArray;
    //PCM文件
    private File pcmFile;
    //WAV文件
    private File wavFile;
    //文件输出流
    private OutputStream os;
    //文件根目录
    private String basePath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/yinfu/";
    private String outFileName;
    private String inFileName;


    private AudioUtil() {
        recorder = new AudioRecord(audioSource, audioRate, audioChannel, audioFormat, bufferSize);
    }


    public synchronized static AudioUtil getInstance() {
        if (mInstance == null) {
            mInstance = new AudioUtil();
        }
        return mInstance;
    }


    //读取录音数字数据线程
    class WriteThread implements Runnable {
        public void run() {
            writeData();
        }
    }


    //开始录音
    public void startRecord() {
        createFile();//创建文件
        isRecording = true;
        recorder.startRecording();
        recordData();
    }


    //停止录音
    public void stopRecord() {
        isRecording = false;
        recorder.stop();
        convertWaveFile();
    }


    //将数据写入文件夹,文件的写入没有做优化
    public void writeData() {
        noteArray = new byte[bufferSize];
        //建立文件输出流
        try {
            os = new BufferedOutputStream(new FileOutputStream(pcmFile));
        } catch (IOException e) {


        }
        while (isRecording == true) {
            int recordSize = recorder.read(noteArray, 0, bufferSize);
            if (recordSize > 0) {
                try {
                    os.write(noteArray);
                } catch (IOException e) {


                }
            }
        }
        if (os != null) {
            try {
                os.close();
            } catch (IOException e) {


            }
        }
    }


    // 这里得到可播放的音频文件
    public void convertWaveFile() {
        FileInputStream in = null;
        FileOutputStream out = null;
        long totalAudioLen = 0;
        long totalDataLen = totalAudioLen + 36;
        long longSampleRate = AudioUtil.audioRate;
        int channels = 1;
        long byteRate = 16 * AudioUtil.audioRate * channels / 8;
        byte[] data = new byte[bufferSize];
        try {


            in = new FileInputStream(inFileName);
            out = new FileOutputStream(outFileName);
            totalAudioLen = in.getChannel().size();
            //由于不包括RIFF和WAV
            totalDataLen = totalAudioLen + 36;
            WriteWaveFileHeader(out, totalAudioLen, totalDataLen, longSampleRate, channels, byteRate);
            while (in.read(data) != -1) {
                out.write(data);
            }
            in.close();
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /* 任何一种文件在头部添加相应的头文件才能够确定的表示这种文件的格式，wave是RIFF文件结构，每一部分为一个chunk，其中有RIFF WAVE chunk， FMT Chunk，Fact chunk,Data chunk,其中Fact chunk是可以选择的， */
    private void WriteWaveFileHeader(FileOutputStream out, long totalAudioLen, long totalDataLen, long longSampleRate,
                                     int channels, long byteRate) throws IOException {
        byte[] header = new byte[44];
        header[0] = 'R'; // RIFF
        header[1] = 'I';
        header[2] = 'F';
        header[3] = 'F';
        header[4] = (byte) (totalDataLen & 0xff);//数据大小
        header[5] = (byte) ((totalDataLen >> 8) & 0xff);
        header[6] = (byte) ((totalDataLen >> 16) & 0xff);
        header[7] = (byte) ((totalDataLen >> 24) & 0xff);
        header[8] = 'W';//WAVE
        header[9] = 'A';
        header[10] = 'V';
        header[11] = 'E';
        //FMT Chunk
        header[12] = 'f'; // 'fmt '
        header[13] = 'm';
        header[14] = 't';
        header[15] = ' ';//过渡字节
        //数据大小
        header[16] = 16; // 4 bytes: size of 'fmt ' chunk
        header[17] = 0;
        header[18] = 0;
        header[19] = 0;
        //编码方式 10H为PCM编码格式
        header[20] = 1; // format = 1
        header[21] = 0;
        //通道数
        header[22] = (byte) channels;
        header[23] = 0;
        //采样率，每个通道的播放速度
        header[24] = (byte) (longSampleRate & 0xff);
        header[25] = (byte) ((longSampleRate >> 8) & 0xff);
        header[26] = (byte) ((longSampleRate >> 16) & 0xff);
        header[27] = (byte) ((longSampleRate >> 24) & 0xff);
        //音频数据传送速率,采样率*通道数*采样深度/8
        header[28] = (byte) (byteRate & 0xff);
        header[29] = (byte) ((byteRate >> 8) & 0xff);
        header[30] = (byte) ((byteRate >> 16) & 0xff);
        header[31] = (byte) ((byteRate >> 24) & 0xff);
        // 确定系统一次要处理多少个这样字节的数据，确定缓冲区，通道数*采样位数
        header[32] = (byte) (1 * 16 / 8);
        header[33] = 0;
        //每个样本的数据位数
        header[34] = 16;
        header[35] = 0;
        //Data chunk
        header[36] = 'd';//data
        header[37] = 'a';
        header[38] = 't';
        header[39] = 'a';
        header[40] = (byte) (totalAudioLen & 0xff);
        header[41] = (byte) ((totalAudioLen >> 8) & 0xff);
        header[42] = (byte) ((totalAudioLen >> 16) & 0xff);
        header[43] = (byte) ((totalAudioLen >> 24) & 0xff);
        out.write(header, 0, 44);
    }


    //创建文件夹,首先创建目录，然后创建对应的文件
    public void createFile() {
        inFileName = basePath + "/" + System.currentTimeMillis() + ".pcm";
        outFileName = basePath + "/" + System.currentTimeMillis() + ".wav";
        File baseFile = new File(basePath);
        if (!baseFile.exists())
            baseFile.mkdirs();
        pcmFile = new File(inFileName);
        wavFile = new File(outFileName);
        if (pcmFile.exists()) {
            pcmFile.delete();
        }
        if (wavFile.exists()) {
            wavFile.delete();
        }
        try {
            pcmFile.createNewFile();
            wavFile.createNewFile();
        } catch (IOException e) {


        }
    }


    //记录数据
    public void recordData() {
        new Thread(new WriteThread()).start();
    }
}

```

## Android 开发中如何获取铃声和音量

```java
通过程序获取android系统手机的铃声和音量。设置音量的方法也很简单，AudioManager提供了方法：
publicvoidsetStreamVolume(intstreamType,intindex,intflags)其中streamType有内置的常量，去文档里面就可以看到。　　Java代码：
AudioManager mAudioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
//通话音量
int max = mAudioManager.getStreamMaxVolume( AudioManager.STREAM_VOICE_CALL );
int current = mAudioManager.getStreamVolume( AudioManager.STREAM_VOICE_CALL );
Log.d(“VIOCE_CALL”, “max : ” + max + ” current : ” + current);
//系统音量
max = mAudioManager.getStreamMaxVolume( AudioManager.STREAM_SYSTEM );
current = mAudioManager.getStreamVolume( AudioManager.STREAM_SYSTEM );
Log.d(“SYSTEM”, “max : ” + max + ” current : ” + current);
//铃声音量
max = mAudioManager.getStreamMaxVolume( AudioManager.STREAM_RING );
current = mAudioManager.getStreamVolume( AudioManager.STREAM_RING );
Log.d(“RING”, “max : ” + max + ” current : ” + current);
//音乐音量
max = mAudioManager.getStreamMaxVolume( AudioManager.STREAM_MUSIC );
current = mAudioManager.getStreamVolume( AudioManager.STREAM_MUSIC );
Log.d(“MUSIC”, “max : ” + max + ” current : ” + current);
//提示声音音量
max = mAudioManager.getStreamMaxVolume( AudioManager.STREAM_ALARM );
current = mAudioManager.getStreamVolume( AudioManager.STREAM_ALARM );
Log.d(“ALARM”, “max : ” + max + ” current : ” + current);
来源： <http://www.mianwww.com/html/2012/02/12997.html>

```

## 屏蔽音量+,音量-

```java
//android系统上屏蔽音量+,音量-,方法
//在需要屏蔽的App界面上复写onKeyDown方法,获取音量+,音量-按键值
public boolean onKeyDown(int keyCode, KeyEvent event) {
        // TODO Auto-generated method stub

        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            //捕获音量+按键处理

            return true;
        }

        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            //捕获音量-按键处理
            return true;
        }

        else {
           return super.onKeyDown(keyCode, event);
        }
}






屏蔽电源键：
private static final String ISMART_ACTION_SET_SHORTPRESS_POWERSELLP_ENABLE = "ismart.intent.action_SetShortPressPowerSleepEnable";
//屏蔽电源键
Intent intent = new Intent();
intent.setAction(ISMART_ACTION_SET_SHORTPRESS_POWERSELLP_ENABLE);
intent.putExtra("Sleepenable", false);
sendBroadcast(intent);


返回键：
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
if (keyCode == KeyEvent.KEYCODE_BACK) {
Log.d("tag", "back: ");
return true;
} else {
return super.onKeyDown(keyCode, event);
}
}


/**
* 屏蔽home键
*/
@Override
public void onAttachedToWindow() {
this.getWindow().setType(WindowManager.LayoutParams.TYPE_KEYGUARD_DIALOG);
super.onAttachedToWindow();
}


```

## 最大音量

```java
private AudioManager audioMa;
audioMa = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
audioMa.setStreamVolume(AudioManager.STREAM_MUSIC, audioMa.getStreamMaxVolume(AudioManager.STREAM_MUSIC), AudioManager.FLAG_SHOW_UI);
```

## 服务之电话录音

```java
package com.itheima.phonelistener;

import android.app.Service;
import android.content.Intent;
import android.media.MediaRecorder;
import android.os.IBinder;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

public class PhoneService extends Service {

    private MediaRecorder mRecorder;

    @
    Override
    public IBinder onBind(Intent intent) {
        return null;
    }@
    Override
    public void onCreate() {
        super.onCreate();
        System.out.println("监听电话状态!");
        TelephonyManager manager = (TelephonyManager) getSystemService(TELEPHONY_SERVICE); // 获取电话管理器
        manager.listen(new MyPhoneStateListener(), PhoneStateListener.LISTEN_CALL_STATE); // 用电话管理器注册一个监听器, 监听电话状态
    }
    private class MyPhoneStateListener extends PhoneStateListener {
        private String num;
        public void onCallStateChanged(int state, String incomingNumber) { // 电话状态改变时执行该方法
            switch (state) {
                case TelephonyManager.CALL_STATE_RINGING:
                    num = incomingNumber; // 振铃时, 记录号码
                    break;
                case TelephonyManager.CALL_STATE_OFFHOOK:
                    startRecording(); // 摘机时, 开始录音
                    break;
                case TelephonyManager.CALL_STATE_IDLE:
                    stopRecording(); // 空闲时, 结束录音
                    break;
            }
        }
        private void stopRecording() {
            if (mRecorder != null) {
                mRecorder.stop(); // 停止
                mRecorder.release(); // 释放资源
                mRecorder = null; // 垃圾回收
            }
        }

        private void startRecording() {
            try {
                mRecorder = new MediaRecorder(); // 创建媒体记录器
                mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC); // 设置音频源
                mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP); // 设置输出格式
                mRecorder.setOutputFile("/mnt/sdcard/" + num + "_" + System.currentTimeMillis() + ".3gp"); // 设置输出文件路径
                mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB); // 设置编码
                mRecorder.prepare(); // 准备
                mRecorder.start(); // 开始
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}

```
