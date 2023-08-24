# ndk 开发

[[toc]]

### android-如何在 jni 中 C/C++层打印 log 到 logcat

```
1.在Android.mk文件中加入:LOCAL_LDLIBS := -llog
2.在要使用LOG的cpp文件中加入：
#include <android/log.h>
3.直接使用__android_log_print函数, 代码举例：

char * name = "mronion";
__android_log_print(ANDROID_LOG_INFO, "lclclc", "my name is %s\n", name); //log i类型
```

```
改进

直接使用__android_log_print太麻烦了，我们可以定义一些log的方法，上述第二步改为:

#include <android/log.h>
#define TAG "projectname" // 这个是自定义的LOG的标识
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG,TAG ,__VA_ARGS__) // 定义LOGD类型
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG ,__VA_ARGS__) // 定义LOGI类型
#define LOGW(...) __android_log_print(ANDROID_LOG_WARN,TAG ,__VA_ARGS__) // 定义LOGW类型
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG ,__VA_ARGS__) // 定义LOGE类型
#define LOGF(...) __android_log_print(ANDROID_LOG_FATAL,TAG ,__VA_ARGS__) // 定义LOGF类型

使用举例：

char * name = "mronion";
LOGD("my name is %s\n", name );
————————————————
版权声明：本文为CSDN博主「MrOnion0603」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/teagreen_red/java/article/details/77189411
```
