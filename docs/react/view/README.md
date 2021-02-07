# 界面

[[toc]]
横屏控制  
<https://github.com/yamill/react-native-orientation>  
loading框  
<https://github.com/yenole/react-native-easy-loading>  
下拉菜单  
<https://github.com/sohobloo/react-native-modal-dropdown>  
## 组件

StatusBar  
```
静态配置：
在view根节点内：
   <StatusBar backgroundColor="#ff0000"
                           translucent={true}
                           hidden={true}
                           animated={true}/>

动态配置：

StatusBar.setHidden(true, 'slide') 
```

## 单选框
react-native-radio-buttons-group  
react-native-simple-radio-button  


## 对话框dialog
[react-native-modals](https://github.com/jacklam718/react-native-modals)


## 进度条slider
https://github.com/react-native-community/react-native-slider

## 侧拉菜单
https://github.com/root-two/react-native-drawer


## 聊天界面UI 
https://github.com/FaridSafi/react-native-gifted-chat  
https://github.com/wix/react-native-gifted-chat
## emoji字符串转换
https://github.com/cribspot/emoji-utils

## 组件隐藏和显示
```
1：设置style：display: none / flex  
2：在return()外定义界面：   
 let v = this.state.isVideoOpen ? <View>具体界面</View>:null;
3：在需要动态显示的位置：{v}   

```

## flex布局

```
flexDirection
在组件的style中指定flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？默认值是竖直轴(column)方向。

justifyContent
在组件的style中指定justifyContent可以决定其子元素沿着主轴的排列方式。子元素对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between。

alignItems
在组件的style中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。子元素对应的这些可选项有：flex-start、center、flex-end以及stretch。

```
**说明**

stretch:相当于android 的match_parent，如果设置了宽或高，此配置则无效
[官网详解](https://reactnative.cn/docs/flexbox/)

## scrollview
**注意**
```
ScrollView 必须有一个确定的高度才能正常工作，
要么给它设置一个高度(不建议), 要么所有的子元素都有确定的高度。通常将其样式设置为 flex: 1
```

## Text组件
### react native 0.59 安卓9上文字显示不全 
```
const React = require('react');
const { Platform, Text } = require('react-native');

const defaultFontFamily = {
	...Platform.select({
		android: { fontFamily: 'Roboto' }
	})
};

const oldRender = Text.render;
Text.render = function(...args) {
	const origin = oldRender.call(this, ...args);
	return React.cloneElement(origin, {
		style: [defaultFontFamily, origin.props.style]
	});
};

```


## RN实现双击
```
onPress = { () = >{
		let timer = null;
		clearTimeout(timer);
		clickTag++;
		if (clickTag >= 2) {
			clickTag = 0;
		console.info(“执行”)
		}
		timer = setTimeout(() = >{
			clickTag = 0;
		},
		500)
	}
}

```

## RN三连击
```
onPress = { () = >{

		const currentTimestamp = new Date().getTime();
		if ((currentTimestamp - clickTimeStamp < 500) || clickTimeStamp == 0) {
			clickTime++;
			clickTimeStamp = currentTimestamp;
			if (clickTime >= 3) {
				clickTime = 0;
				clickTimeStamp = 0;
				this.showDialog()
			}
		} else {
			clickTime = 0;
			clickTimeStamp = 0;
			clickTime++;
			clickTimeStamp = currentTimestamp;
			if (clickTime >= 3) {
				clickTime = 0;
				clickTimeStamp = 0;
				this.showDialog()
			}
		}
	}
}
```


## 判断页面是否为当前显示
```
    this.focusListener = this.props.navigation.addListener(
      'focus',
      (payload) => {
        this.state.pageFocus = true;
      },
    );


 componentWillUnmount() {
    this.focusListener();
 }
```

##　react native启动页

https://github.com/crazycodeboy/react-native-splash-screen 
