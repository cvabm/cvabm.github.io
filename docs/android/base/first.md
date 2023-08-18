[[toc]]

## 手机暗码

> 目前移动平台实现了一些暗码功能，即在手机上通过拨号盘输入一些字符，可以显示手机的软件信息或者激活辅助调试功能。  
> 安卓原生暗码
>
> - **\*#06#** 查看 IMEI 号；
> - \*#07#：监管信息 （待确认）；
> - _#_#4636#_#_ ：显示手机信息、电池信息、电池记录、使用统计数据、WiFi 信息等基本信息；

> 高通平台上乐视自实现暗码如下：

    * *#5388#*：打开工厂测试APK；
    * *#*#8888#*#*：打开离线日志工具，配合问题反馈，获取更多日志；
    * *#*#46360000#*#*：设置USB的默认功能，供调试用；
    * *#*#76937#*#*：打开用于监控系统是否进入睡眠状态的呼吸灯；激活Download mode，手机死机不再重启，而是进入该模式；Enable all logs，提高日志的输出级别；
    * #02#：显示手机软件编译自哪个分支；
    * *#*#9439#*#* : 即中国电信的首字母，可以在公开版上激活电信网络功能；

> MTK 平台上乐视自实现暗码如下：

    * *#*#3646633#*#*：开发者模式，获取系统信息，可以配置一些模式 （MTK原生实现）；
    * *#5388#*：打开工厂测试APK；
    * *#*#8888#*#*：打开离线日志工具，配合问题反馈，获取更多日志；
    * *#02#：显示系统信息；

> 小米手机测试指令代码  
> _#_#64663#_#_ 综合测试指令
> _#_#4636#_#_ 显示手机信息、电池信息、电池记录、使用统计数据、WiFi 信息

### 获取摄像头所支持的所有分辨率

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TextureView textureView = new TextureView(this);
        textureView.setSurfaceTextureListener(new TextureView.SurfaceTextureListener() {
            @Override
            public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
                try {
                    Camera open = Camera.open();

                    Camera.Parameters params = open.getParameters();

                    List<Camera.Size> pictureSizes = params.getSupportedPictureSizes();
                    int length = pictureSizes.size();
                    for (int i = 0; i < length; i++) {
                        Log.e("SupportedPictureSizes", "SupportedPictureSizes : " + pictureSizes.get(i).width + "x" + pictureSizes.get(i).height);
                    }

                    List<Camera.Size> previewSizes = params.getSupportedPreviewSizes();
                    length = previewSizes.size();
                    for (int i = 0; i < length; i++) {
                        Log.e("SupportedPreviewSizes", "SupportedPreviewSizes : " + previewSizes.get(i).width + "x" + previewSizes.get(i).height);
                    }

                    open.setPreviewTexture(surface);
                    open.startPreview();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {

            }

            @Override
            public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
                return false;
            }

            @Override
            public void onSurfaceTextureUpdated(SurfaceTexture surface) {

            }
        });

        setContentView(textureView);
    }
}

```