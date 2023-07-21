[[toc]]

## aop 简介

```
Aspect Oriented Programming的缩写，面向切面编程，
通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术

用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率
```

![dI4t4U.png](https://s1.ax1x.com/2020/08/28/dI4t4U.png)

## lancet

[github](https://github.com/eleme/lancet/blob/develop/README_zh.md)

demo：
新建一个类即可，如：

```java
在每个toast后加字符串

package fr.pchab.androidrtc;

import android.content.Context;
import android.widget.Toast;

import me.ele.lancet.base.Origin;
import me.ele.lancet.base.annotations.Proxy;
import me.ele.lancet.base.annotations.TargetClass;

public class Myhook {
    @Proxy("makeText")
    @TargetClass("android.widget.Toast")
    public static Toast anyName2(Context context, CharSequence msg, int duration) {
        msg = msg + "加上了toast";
        return (Toast) Origin.call();
    }
}

```

```java
//修改log.i

    @Proxy("i")
    @TargetClass("android.util.Log")
    public static int anyName(String tag, String msg) {
        msg = msg + "lancet";
        return (int) Origin.call();

    }
```
