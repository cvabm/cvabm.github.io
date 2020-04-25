# 小程序
[[toc]]
```
http://lbs.qq.com/qqmap_wx_jssdk/qqmapwx.html
http://www.uml.org.cn/mobiledev/201702281.asp
http://blog.csdn.net/sinat_17775997/article/details/54982066
http://blog.csdn.net/xiehuimx/article/details/52005355
http://www.jianshu.com/p/aaef5ceb3936
http://www.tuicool.com/articles/a26vErr
http://p.codekk.com/detail/Android/hss01248/wxListview

http://p.codekk.com/detail/Android/hss01248/wxPageManager
http://p.codekk.com/detail/Android/hss01248/wxTabs

```

## 动态显示和隐藏控件

```
wxml：

 <view >
  <button bindtap="onChangeShowState">点击</button>
 </view>
 <view class="bright789_view_hide{{showView?'bright789_view_show':''}}">
 <text class="bright789-text">我是被显示被隐藏控件</text>
 </view>


wxss：
.bright789-text{
 font-size: 40rpx;
 line-height: 40px;
 color: #ff0000;
}
.bright789_view_hide{
 display: none;
}
.bright789_view_show{
 display: block;
}
js：
Page({
 data:{
 showView:true
 },
 onLoad:function(options){
 // 生命周期函数--监听页面加载
 showView:(options.showView=="true"?true:false)
 }
 ,onChangeShowState:function(){
 var that=this;
 that.setData({
  showView:(!that.data.showView)
 })
 }
})
```

## 获取后台json显示到程序
```
1：后台：
             response.setContentType("text/json");
             response.setCharacterEncoding("UTF-8");

             PrintWriter out = response.getWriter();
                         //拼接json数据
              out.print("{\"status\":\"success\",\"type\":\"pile\",\"age\":\"12\",\"name\":\"李明\"}");
             out.flush();

             out.close();
2：小程序：
    data: {
      zhihu: null
    },
    onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
      var that = this//不要漏了这句，很重要
      wx.request({
        url: 'https://lijiangang.ittun.com/Dem/servlet/dem',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          //将获取到的json数据，存在名字叫zhihu的这个数组中
            console.log(res.data),
          that.setData({
            zhihu: res.data,
            //res代表success函数的事件对，data是固定的
          })
        }
      })
    },

3：wxml中显示：
 <text>{{zhihu.name}}</text>

```