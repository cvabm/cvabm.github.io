# 界面

[[toc]]

# 屏幕适配

工具类  
<https://www.jianshu.com/p/a0a2c9f55fb6>

横屏控制  
<https://github.com/yamill/react-native-orientation>  
loading 框  
<https://github.com/yenole/react-native-easy-loading>  
下拉菜单  
<https://github.com/sohobloo/react-native-modal-dropdown>

## 组件

StatusBar

```java
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

## 对话框 dialog

[react-native-modals](https://github.com/jacklam718/react-native-modals)

## 进度条 slider

https://github.com/react-native-community/react-native-slider

## 侧拉菜单

https://github.com/root-two/react-native-drawer

## 聊天界面 UI

https://github.com/FaridSafi/react-native-gifted-chat  
https://github.com/wix/react-native-gifted-chat

## emoji 字符串转换

https://github.com/cribspot/emoji-utils

## 组件隐藏和显示

```
1：设置style：display: none / flex
2：在return()外定义界面：
 let v = this.state.isVideoOpen ? <View>具体界面</View>:null;
3：在需要动态显示的位置：{v}

```

## flex 布局

```
flexDirection
在组件的style中指定flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？默认值是竖直轴(column)方向。

justifyContent
在组件的style中指定justifyContent可以决定其子元素沿着主轴的排列方式。子元素对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between。

alignItems
在组件的style中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。子元素对应的这些可选项有：flex-start、center、flex-end以及stretch。

```

**说明**

stretch:相当于 android 的 match_parent，如果设置了宽或高，此配置则无效
[官网详解](https://reactnative.cn/docs/flexbox/)

## scrollview

**注意**

```
ScrollView 必须有一个确定的高度才能正常工作，
要么给它设置一个高度(不建议), 要么所有的子元素都有确定的高度。通常将其样式设置为 flex: 1
```

## Text 组件

### react native 0.59 安卓 9 上文字显示不全

```js
const React = require("react");
const { Platform, Text } = require("react-native");

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: "Roboto" },
  }),
};

const oldRender = Text.render;
Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [defaultFontFamily, origin.props.style],
  });
};
```

## RN 实现双击

```js
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

## RN 三连击

```js
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

```js
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

##　 react native 启动页

https://github.com/crazycodeboy/react-native-splash-screen

## react native config

获取不到数据解决：

```js
解决办法
添加build_config_package参数， 指定BuildConfig.class的绝对路径
android {

    defaultConfig {
        applicationId project.env.get("APP_ID")
        versionCode project.env.get("APP_VERSION_CODE").toInteger()
        versionName project.env.get("APP_VERSION_NAME")

        // for react-native-config
        resValue "string", "build_config_package", "your AndroidManifest.xml package name"

    }
}
```

### rn 创建原生组件

<https://medium.com/@newmanchen/%E5%A6%82%E4%BD%95%E5%BB%BA%E7%AB%8B-android-native-ui-component-with-react-native-ce198854ba22>

### rn 适配电视

<https://developer.applicaster.com/quick-brick/focus-manager-android-tv/>  
最大硬件解码数量  
<https://blog.csdn.net/epubcn/article/details/87932050>

```java
   private boolean isAndroidTV() {
        final UiModeManager uiModeManager = (UiModeManager) getSystemService(Activity.UI_MODE_SERVICE);
        return uiModeManager.getCurrentModeType() == Configuration.UI_MODE_TYPE_TELEVISION;
    }

```

### rn switch selector

<https://github.com/App2Sales/react-native-switch-selector>

### 区分 App 运行在手机还是电视

<https://juejin.cn/post/6844903480339988487#heading-3>

### rn 启动流程

<https://www.jianshu.com/p/eaa818a9931f>

### rn 代码格式化

<https://juejin.cn/post/6908271959381901325>  
eslint  
<https://cn.eslint.org/docs/rules/max-len>

### rn 监听事件

````js
阻止离开屏幕
componentDidMount
    this.beforeRemoveListener = this.props.navigation.addListener(
      'beforeRemove',
      (e) => {
        let errorInfo = '';
        Global.meetSwitchIsOn = this.state.meetSwitchIsOn;
        console.log('meetSwitchIsOn' + Global.meetSwitchIsOn);
        storage.save(storage.meetSwitchIsOn, this.state.meetSwitchIsOn);
        // if (errorInfo.length > 0) {
        //   e.preventDefault(); //阻止离开屏幕的行为
        //   Alert.alert('保存失败', errorInfo, [
        //     {
        //       text: '修改',
        //       style: 'cancel',
        //       onPress: () => {
        //       },
        //     },
        //   ]);
        // }
      },
    );

	componentWillUnmount
	 this.beforeRemoveListener();

	```

````
## 

## patch-package给npm包打补丁
```
1、npm i patch-package --save-dev
2、修复node_modules中react-native库的问题
3、npx patch-package react-native
4、将生成的patches文件夹加入到代码同步
5、使用：执行完npm install后再patch-package即可

撤销：patch-package --reverse mypackage
```
## rn组件库
react native elements
```
  "dependencies": {
    "react": "16.13.1",
    "react-native": "0.63.5",
    "react-native-elements": "^3.4.3",
    "react-native-safe-area-context": "3.1.9",
    "react-native-vector-icons": "^7.0.0"
  }
```
react native paper  
nativeBase  

## rn新项目
npx react-native init AwesomeProject --version X.XX.X
