### listview

[[toc]]

### 简单使用

```java
ArrayAdapter<String> adapter;
adapter = new ArrayAdapter<String>(
MainActivity.this,
android.R.layout.simple_list_item_1,
android.R.id.text1,
new String[]{"1", "2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17",}
);
list.setAdapter(adapter);
}
```

### 选中 item 高亮状态

```java
在布局文件中设定：
android:listSelector="@android:color/holo_red_light"
在代码中实现
listView.setSelector(android.R.color.holo_orange_light);
在getview中----
msettinglist的点击事件中：
mSettingList.getChildAt(3).setBackgroundColor(Color.GRAY);
```

```java
往上滑动的话,这个颜色竟然会有一点漏出来,并没有跟随着view一起滚动上去,解决办法：
不给listview设置listSelector 不给listview item的根布局设置背景 以及 item中的textview也不设置颜色selector,而是在adapter的getview

中对他们进行动态的设置


package com.example.testlistviewselection;

import java.util.List;

import android.content.Context;
import android.content.res.ColorStateList;
import android.content.res.Resources;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class ListViewAdapter extends BaseAdapter {

 private int defaultSelection = -1;
 private Context mContext;
 private List<String> list;
 private int text_selected_color;
 private int bg_selected_color;
 private ColorStateList colors;

 public ListViewAdapter(Context mContext, List<String> list) {
  // TODO Auto-generated constructor stub
  this.mContext = mContext;
  this.list = list;
  Resources resources = mContext.getResources();
  text_selected_color = resources.getColor(R.color.text_pressed);// 文字选中的颜色
  bg_selected_color = resources.getColor(R.color.bg_selected);// 背景选中的颜色
  colors = mContext.getResources().getColorStateList(
    R.color.listview_text_color_selector);// 文字未选中状态的selector
  resources = null;
 }

 @Override
 public int getCount() {
  // TODO Auto-generated method stub
  return list == null ? 0 : list.size();
 }

 @Override
 public Object getItem(int position) {
  // TODO Auto-generated method stub
  return list.get(position);

 }

 @Override
 public long getItemId(int position) {
  // TODO Auto-generated method stub
  return position;
 }

 @Override
 public View getView(int position, View convertView, ViewGroup parent) {
  // TODO Auto-generated method stub
  ViewHolder viewHolder = null;
  if (convertView == null) {
   viewHolder = new ViewHolder();
   convertView = LayoutInflater.from(mContext).inflate(
     R.layout.item_listview, parent, false);
   viewHolder.txt_item = (TextView) convertView
     .findViewById(R.id.txt_item);
   convertView.setTag(viewHolder);
  } else {
   viewHolder = (ViewHolder) convertView.getTag();
  }
  viewHolder.txt_item.setText(getItem(position).toString());

  if (position == defaultSelection) {// 选中时设置单纯颜色
   viewHolder.txt_item.setTextColor(text_selected_color);
   convertView.setBackgroundColor(bg_selected_color);
  } else {// 未选中时设置selector
   viewHolder.txt_item.setTextColor(colors);
   convertView.setBackgroundResource(R.drawable.listview_color_selector);
  }
  return convertView;
 }

 class ViewHolder {
  TextView txt_item;
 }

 /**
  * @param position
  *            设置高亮状态的item
  */
 public void setSelectPosition(int position) {
  if (!(position < 0 || position > list.size())) {
   defaultSelection = position;
   notifyDataSetChanged();
  }
 }

}

我们在adapter的getview中判断当前的position是不是选中的position如果是的话,那就给textview 以及view的背景设置一下单纯的颜色,

如果不是选中的position的话,那就设置给textview 以及 view一个selector,这样就可以让没选中的view有一个按压的效果了

主布局中给listview设置点击监听:

 //给listview设置item的点击监听
  lv_main.setOnItemClickListener(new OnItemClickListener() {
   @Override
   public void onItemClick(AdapterView<?> parent, View view,
     int position, long id) {
    adapter.setSelectPosition(position);
   }
  });
```

## 设置分割线

```java

1.在布局文件中ListView元素中通过属性设置

android:divider="#fffff"  分割线颜色
android:dividerHeight="1px"  分割线高度

2.使用XML文件设置

<!-- res/drawable/liner.xml ->
<?xmlversion="1.0"encoding="utf-8"?>
<layer-list  xmlns:android="http://schemas.android.com/apk/res/android">
<item>
  <shape>
      <gradient
        android:startColor="#000000"
        android:centerColor="#CCCCCC"
        android:endColor="#FFFFFF"
        android:height="1px"
        android:angle="0"/>
  </shape>
</item>
</layer-list>


在布局文件中引用

<ListViewandroid:id="@id/android:list"
    ...
    android:divider="@drawable/list_divider"
    android:dividerHeight="1dip"
    />

```

## listview 优化

1.ViewHolder 优化 减少 findviewbyID 的使用次数
创建一个 ViewHolder 类，定义 listview 条目中子控件为成员变量
当 listview 用数据适配器填充数据时，在 getView 方法中，直接 new 出 ViewHolder.子控件得到 findviewbyID 找到的布局控件
最后 convertView 调用 settag（holder）方法，把子控件的引用保持到 holder 容器中
下次使用的时候就不用再去 findviewbyID 直接 调用 getTag（）方法拿到 holder 中子控件的引用

2.快速滑动不加载图片，停下来后再加载图片，以免图片太多导致加载不过来，程序未响应
listView.setOnScrollListener(new PauseOnScrollListener(imageLoader, pauseOnScroll, pauseOnFling));

3.分批加载和分页加载
分页,分批加载 item(划过的 item 过多,每次调用 getView()异步的设置某个时间内用 handler 刷新 UI,同一时间调用 handler 刷新 UI 次数多了就会出现卡顿,卡顿时间过长就会报 ANR))

4.异步加载图片
问题：网络加载图片错乱(原因是:网络的不确定性,先加载图片的 item 没请求到网络,被其他的 item 先请求到了,得到图片的变成了其他的 item 的图片)
解决：UI 主线程继续做与用户交互的响应监听和操作，而加载图片的任务交到子线程中去做，当图片加载完成之后，再跟据回调等机制绘制到要显示的控件中。
具体步骤：1.在 adapter 的 getview 方法里面启动加载图片的 thread，如果 listview 在滑动则 wait. 2.监听 listview 滑动停止事件，获得 listview 显示的 item 的最上面和最下面的序号，并唤醒所有加载图片的 thread，判断加载图片的序号是否是在范围内，如果是则继续加载，如果不是则结束 thread.
3
5.scrollView 和 listView 的优化，scrollView 嵌套 listView

注意 2 个问题

1. listView 在屏幕中展示区域的高度，不是 listview 的总长度，而是显示在屏幕中部分 listView 的高度，因为可能 listView 有分批加载
2. 滑动冲突的处理（何时将触屏事件交给 listview 处理）
   解决方法：
   向上滑动到底部：首先监听 srcollView 是否滑动到屏幕展示区域的底部，如果到底部，这时就将 scrollView 的触摸事件拦截掉，将事件交给 listView
   然后 listview 再滑动加载。。。。。
   向下滑动到顶部：当检测到 listView 滑动到 listview 控件顶部时，将事件交给 scrollView，因为 listView 控件上面可能还有其他很多控件

## 动态加载数据

```java
ListView的动态加载
private ListView lv_select_contact;
private List<ContactInfo>  infos;
private LinearLayout loading;
private String limit="_id desc limit 30 offset ";//这里面的30表示每次查出的数据条数,自已定义
private int offset;//表示从第行数据开始查
private int total;//这个表示总条目数
private ContactAdapter adapter;
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(savedInstanceState);
setContentView(R.layout.activity_select_contact);
lv_select_contact = (ListView) findViewById(R.id.lv_select_contact);
loading = (LinearLayout) findViewById(R.id.loading);
refreshData();//首先第一次先展示一部分
//监听Listview滚动.通过offset的变化去实现数据的变化
lv_select_contact.setOnScrollListener(new OnScrollListener() {
@Override
public void onScrollStateChanged(AbsListView view, int scrollState) {
if (scrollState==OnScrollListener.SCROLL_STATE_IDLE) {//SCROLL_STATE_IDLE表示当滚动停止状态.
int position = lv_select_contact.getLastVisiblePosition();//获得当前可见条目的最后一行索引
int endPosition=infos.size();//获得当前list的数据最后一行索引
if (position==endPosition-1) {
offset+=30;
if (offset>total) {//如果大于总条目表示数据加载完了
Toast.makeText(SelectContactActivity.this, "没有更多数据了", 1).show();
}
refreshData();//刷新数据
}
}
}
//这个方法用于获得一些滚动的数据
@Override
public void onScroll(AbsListView view, int firstVisibleItem,
int visibleItemCount, int totalItemCount) {
// TODO Auto-generated method stub
}
});
//定义条目的点击事件
lv_select_contact.setOnItemClickListener(new OnItemClickListener() {
@Override
public void onItemClick(AdapterView<?> parent, View view,
int position, long id) {
ContactInfo info = infos.get(position);
String phone = info.getPhone();
Intent data = new Intent();
data.putExtra("phone", phone);
setResult(0, data);
finish();
}
});
}
//动态显示获取数据的方法
private void refreshData() {
new  MyAsynTask(){
@Override
public void beforeTask() {
loading.setVisibility(View.VISIBLE);
}
@Override
public void runTask()
//执行查询前,得到总条目
if (total==0) {
total=ContactInfoProvider.getTotal(SelectContactActivity.this);
}
//得到adapter需要的数据集合,没有直接创建
if (infos==null) {
infos = ContactInfoProvider.getContactInfos(SelectContactActivity.this,limit+0);
}else{
//有的话直接把得到的集合添加进去
infos.addAll(ContactInfoProvider.getContactInfos(SelectContactActivity.this,limit+offset));
}
}
@Override
public void afterTask() {
//执行后关闭进度条
loading.setVisibility(View.INVISIBLE);
if (adapter==null) {//如果adapter为空则应该是第一次添加,那么创建一个
adapter=new ContactAdapter();
lv_select_contact.setAdapter(adapter);
}else{
//如果有就直接刷新,这样就避免了每次加载完都跳到第一行.
//但记住,这个跟数据库无直接关联,如果数据集合没有变化,这个是没有效果的,只有从重查询数据库得到新集合才可以..
adapter.notifyDataSetChanged();
}
}}.startTask();
}
//添加适配器
private class ContactAdapter extends BaseAdapter{

@Override
public int getCount() {
return infos.size();
}

@Override
public Object getItem(int position) {
return null;
}

@Override
public long getItemId(int position) {
return 0;
}

@Override
public View getView(int position, View convertView, ViewGroup parent) {
ViewHolder hodler;
View view ;
if (convertView!=null&&convertView instanceof RelativeLayout) {
view = convertView;
hodler=(ViewHolder) view.getTag();
}else{
view = View.inflate(getApplicationContext(), R.layout.list_contact_item, null);
hodler=new ViewHolder();
hodler.tv_name=(TextView) view.findViewById(R.id.tv_contact_name);
hodler.tv_phone=(TextView) view.findViewById(R.id.tv_contact_phone);
view.setTag(hodler);
}
ContactInfo info = infos.get(position);
hodler.tv_name.setText(info.getName());
hodler.tv_phone.setText(info.getPhone());
return view;
}
}
//对象容器
static class ViewHolder {
TextView tv_name;
TextView tv_phone;
}
}

```

## getview 执行次数的问题

有几个 item 就执行几次的方法,
将 ListView 的 的高 layout_height="fill_parent"
