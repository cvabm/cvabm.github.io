# fragment

```
静态加载：需要给fragment 定义 id  或者tag

新建fragment.xml，然后再主布局中引入。
  View view = inflater.inflate(R.layout.fragment, container, false);

动态加载
          MyFragment fragment11 = new Fragment();
        getFragmentManager().gegintranslation().add(contoinerviewid ; fragment11);
                 //开启事务
              begintranslation . addToBackStack()  .// 按下返回键
          begintranslation.commit();


一般来说，在 Fragment 中应至少重写这些生命周期方法：

- onCreate()：当创建 Fragment 实例时，系统回调的方法。在该方法中，需要对一些必要的组件进行初始化，以保证这个组件的实例在 Fragment 处于 pause或stop 状态时仍然存在。

- onCreateView()：当第一次在 Fragment 上绘制UI时，系统回调的方法。该方法返回一个View 对象，该对象表示 Fragment 的根视图；若 Fragment 不需要展示视图，则该方法可以返回 null。

- onPause()：当用户离开 Fragment 时回调的方法（并不意味着该 Fragment 被销毁）。在该方法中，可以对 Fragment 的数据信息做一些持久化的保存工作，因为用户可能不再返回这个 Fragment。


生命周期：

onAttach（）   --- 当fragment被添加到activity中 会执行一次
oncreate()
onCreateView()
onActivityCreated（） --- 当fragment所在的activity启动完成会执行一次

onStart（）  启动fragment

onResume（） ---- 恢复fragment
onPause()
onstop()
onDestroyView()
onDestroy()
onDetach（）  当fragment从activity中删除时候




两者之间的通信

fragment可以使用getActivity（） 获取
activity可以使用  FragmentManager的findFragmentbyId（） 或者 findFragmentbyTag 获取
activity向fragment传递 ：  在activity中创建bundle包，并调用Fragment的setArguments（Bundle bundle）放法

反之  ； 在fragment定义一个内部回调接口 ，再让所在的activity实现该接口


fragment的生命周期
当Fragment与Activity发生关联时会调用onAttach方法，创建fragment时会调用和onCreate方法，然后调用onCreateView方法填充界面，
当Activity的onCreate方法返回时调用onActivityCreated(Bundle)方法
调用onstart开启fragment界面
屏幕灭掉：调用onPause方法暂停，onStop停止
屏幕解锁：onStart方法，onResume方法 继续（重新开始）
切换到其他frgament时：onPause onStop onDestroyView
切换回原来的fragment时：onCreateView重新加载 onStart onResume继续
回到桌面：onPause  onStop
回到应用：onStart onResume继续
退出应用：onPause onStop onDestroyView onDestroy销毁 onDetach()与Activity取消关联


fragment和activity间的数据传递
在fragment中定义一个回调接口  让包含这个fragment的activity去实现这个接口 这样fragment去调用接口中的回调方法
向activity传递数据


第16  fragment和activity之间怎么互相传递数据
* 在此总结一下Fragment与Activity之间交换数据的方式: Activity向Fragment传递数据
①Fragment中通过getActivity()然后进行强制转化，调用Activity中的公有方法
((XXXXActivity)getActivity()).fun();②Activity在切换Fragment的时候，通过fragment.setArguments(bundle)，向Fragment传递参数，Fragment通过getArguments(  );获得从activity中传递过来的值
2  Fragment向Activity传递数据    在Fragment内部定义一个回调接口.让包含该Fragment的    Activity实现该接口.这样Fragment就可调用该回调方法    将数据传给Activity
3.Activity实现一个接口，Fragment在onAttach方法中，将该Activity转化为该接口，在需要调用的时候回调。
通过FragmentManager来管理Fragment的，通过FragmentManager管理，我们创建Fragment和销毁Fragment的时候，可以通过栈的方式：
a.FragmentTransaction的add方法，添加一个Fragment
b.FragmentTransaction的popBackStack()弹出该Fragment 

如果不用fragment  怎么做同一个activity多个页面的效果 及和activity的关系



```