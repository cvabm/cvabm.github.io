# fragment

### fragment 使用:

```java
静态加载：需要给fragment 定义 id  或者tag
新建fragment.xml，然后再主布局中引入。
  View view = inflater.inflate(R.layout.fragment, container, false);

动态加载
          MyFragment fragment11 = new Fragment();
        getFragmentManager().gegintranslation().add(contoinerviewid ; fragment11);
                 //开启事务
              begintranslation . addToBackStack()  .// 按下返回键
          begintranslation.commit();
```

### fragment 生命周期

```java
onAttach（） --- 当fragment被添加到activity中 会执行一次
oncreate()
onCreateView()
onActivityCreated（）--- 当fragment所在的activity启动完成会执行一次
onStart（）
onResume（）
onPause()
onstop()
onDestroyView()
onDestroy()
onDetach（）

fragment的生命周期变化：
屏幕灭掉：调用onPause方法暂停，onStop停止
屏幕解锁：onStart方法，onResume方法 继续（重新开始）
切换到其他frgament时：onPause onStop onDestroyView
切换回原来的fragment时：onCreateView重新加载 onStart onResume继续
回到桌面：onPause  onStop
回到应用：onStart onResume继续
退出应用：onPause onStop onDestroyView onDestroy销毁 onDetach()与Activity取消关联
```

### fragment 之间数据交互

```java
A -> B
ContentFragment cf = (ContentFragment) getActivity()
							.getFragmentManager().findFragmentById(
									R.id.content_fg);
					cf.showPro(name);

showPro()为B中的方法
--------------------------------------------------------------------------
使用接口回调或广播

```

### fragment 和 activity 数据交互

```
使用接口回调或广播
---------------------------------------------------------------------------
通过fragment.setArguments(bundle)，向Fragment传递参数，Fragment通过getArguments();
```
