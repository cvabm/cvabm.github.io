[[toc]]

### mvc

```
视图（View）：用户界面。
控制器（Controller）：业务逻辑
模型（Model）：数据保存

View 传送指令到 Controller >
Controller 完成业务逻辑后，要求 Model 改变状态 >
Model 将新的数据发送到 View，用户得到反馈

Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。
所有的通信都是单向的。
```

### mvp

```
1：view其实就是activity
2：presenter内接收view和model实例,执行业务逻辑并更新UI视图
3：view和model不发生联系，都是通过prensenter来传递。
4：view非常薄，不存在任何业务逻辑，被动改变视图，没有任何主动性
5：prensenter非常厚，存在所有的业务逻辑部署
6：各部分的通信都是双向的
```

账号登陆的一个例子解释  
<https://blog.csdn.net/lmj623565791/article/details/46596109>

## mvvm

```
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。

```

mvvm<https://zhuanlan.zhihu.com/p/33206893>  
mvvm<https://tech.meituan.com/2016/11/11/android-mvvm.html>

### Data Bindings

简单使用：  
<https://zhuanlan.zhihu.com/p/34532561>  
详细使用：  
<https://blog.gokit.info/post/android-data-binding/>  
详细介绍：  
<https://academy.realm.io/cn/posts/data-binding-android-boyar-mount>  
其他：

> - itHub - lovestack/VRMR: liveData+ViewModel+Room 简单整合
>   <https://github.com/lovestack/VRMR>
> - 于使用 Android MVVM + LiveData 模式的一些建议
>   <https://zhuanlan.zhihu.com/p/33206893>
> - 何构建 Android MVVM 应用框架 -
>   <https://tech.meituan.com/android_mvvm.html>
> - ayouts and binding expressions | Android Developers
>   <https://developer.android.com/topic/libraries/data-binding/expressions>
