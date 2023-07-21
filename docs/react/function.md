[[toc]]

## 数据存储

封装：

```js
import {AsyncStorage} from 'react-native'
import Storage from 'react-native-storage'

let storage = undefined
let defaultExpires =null
let size = 1000

const createStorage = () => {

    storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: size,

        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,

        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: null,

        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,

        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // 或是写到另一个文件里，这里require引入
        sync: null
    })
}

const initStorage = () => {
    if (!storage) {
        createStorage()
    }
}

const _storage = {

    // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
    save(key, obj) {
        initStorage()
        storage.save({
            key: key,  // 注意: 请不要在key中使用_下划线符号!
            data: obj,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: defaultExpires
        })
    },

    // 取数据
    load(key, callBack) {
        initStorage()
        storage.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: { // 各种参数
                },
                someFlag: true,
            }
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            callBack && callBack(ret)
            return ret
        }).catch(err => {
            callBack && callBack('')
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO
                    break
                case 'ExpiredError':
                    // TODO
                    break
            }
        })
    },

    // 获取某个key下的所有id(仅key-id数据)
    getIdsForKey(id, callback) {
        initStorage()
        storage.getIdsForKey(id).then(ids => {
            callback && callback(ids)
        })
    },

    // 获取某个key下的所有数据(仅key-id数据)
    getAllDataForKey(key, callback) {
        initStorage()
        storage.getAllDataForKey(key).then(users => {
            callback && callback(users)
        })
    },

    // !! 清除某个key下的所有数据(仅key-id数据)
    clearMapForKey(key) {
        initStorage()
        storage.clearMapForKey(key)
    },

    // 删除单个数据
    remove(key) {
        initStorage()
        storage.remove({
            key: key
        })
    },

    // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
    clearMap() {
        initStorage()
        storage.clearMap()
    }
}

export {_storage as storage}


```

使用：

```js
import {storage} from '../storageUtil'

    storage.load("username", (PhoneNumber) => {
            if (PhoneNumber.length > 0) {
                this.setState({
                    UserName: PhoneNumber
                })
            }
        })


 storage.save("username", this.state.UserName);

```

## 获取设备信息组件

<https://segmentfault.com/a/1190000012034146>  
<https://github.com/react-native-community/react-native-device-info>

## debug 地址
```
http://localhost:8081/debugger-ui
```
## debug 原生代码

在 android studio 内先打 debug 点，然后点瓢虫一样的按钮（attach debugger to android process）

## 忽略黄色提醒

```js
方法一
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']); // 忽略黄色提醒

方法二
// react-native关闭所有黄色警告，将这两句话加在index.js文件中，放在AppRegistry.registerComponent('App', () => App)之前。
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true // 关闭全部黄色警告
```

## 6.0 以上权限申请

<https://juejin.im/post/5a0c51d3f265da431e164df9>

## 发送和接收事件 DeviceEventEmitter

```js
导入：
import {
    DeviceEventEmitter
} from 'react-native';


发送
DeviceEventEmitter.emit('left', '发送了个通知');


接收监听

componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
        alert('收到通知：' + a);
    });
}

切记，必须记得销毁！
componentWillUnmount() {
    this.deEmitter.remove();
}

```

## 后台任务

[react-native-background-job](https://github.com/vikeri/react-native-background-job)

```
参数
<object>

obj.jobKey string 那个在注册 job 时使用的 key，并且将在接下来退出时使用。
obj.timeout number 不管任务是否完成，都应终止响应的时间量(ms)（可配置,默认：2000）
obj.period number 运行此 job 的频率（ms），其具体数字是不确定的，Android 可能会为了节省电量而修改这个设置。注意：对于 Android 平台，此值将大于等于 900,0000（15min）(可配置项,默认：900,0000)
obj.persist boolean 重启应用时此 job 是否应继续保持。（可配置项,默认：true）
obj.override boolean 当前 job 是否应被已存在的相同 key 的其他 job 替换。（可配置项，默认：true）
obj.networkType number 只针对特殊网络需要（可配置项，默认：NETWORK_TYPE_NONE）
obj.requiresCharging boolean 仅在设备充电时运行, (不支持 pre Android N 设备) 文档(可配置项, 默认false)
obj.requiresDeviceIdle boolean 仅在设备空闲时使用, (不支持 pre Android N 设备) 文档(可配置项, 默认false)
obj.exact boolean 计划在定义的时间段内精准触发 job。注意：这项操作没有任何省电做法 (可配置项, 默认 false)
obj.allowWhileIdle boolean 允许 job 在睡眠时处理任务. (可配置项, 默认false)
obj.allowExecutionInForeground boolean 即便是 app 正在前台运行时依然允许 job 执行任务，请仅在小进程时使用 (配置, 默认false)
obj.notificationText string 对于 Android SDK 版本大于 26, 通知文本应该是什么 (可配置项, 默认"Running in background...")
obj.notificationTitle string 对于 Android SDK 版本大于 26, 通知标题应该是什么 (可配置项, 默认"Background job")

作者：zbc1243
链接：https://www.jianshu.com/p/8b07a5affaf1
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## React Native 原生模块向 JS 传递数据的几种方式(Android)

```
1. 通过回调函数Callbacks的方式
2. 通过Promises的异步的方式
3. 通过eviceEventEmitter发送事件的事件监听的方式.
```

native 层主动向 js 发数据

```java
java层包装数据发送
private void onConnected(Session session) {
  WritableMap params = Arguments.createMap();
  params.putString("sessionId", session.getSessionId());
  ReactContext reactContext = (ReactContext)getContext();
  reactContext
    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
    .emit("onSessionConnect", params);
}

js层监听即可
import { DeviceEventEmitter } from 'react-native';

const onSessionConnect = (event) => {
  console.log(event);
};

DeviceEventEmitter.addListener('onSessionConnect', onSessionConnect);
```

参考：<https://callstack.com/blog/sending-events-to-javascript-from-your-native-module-in-react-native/>

## 手势

<https://www.jianshu.com/p/1b56b81e78d7>

## 屏幕常亮

<https://github.com/marcshilling/react-native-idle-timer>  
IdleTimerManager.setIdleTimerDisabled(true);

## 监听屏幕亮屏

```java
package com.qiyi.screenonofftest;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;

public class detective extends Service {
    public detective() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    public void onCreate() {
        super.onCreate();
        /* 注册屏幕唤醒时的广播 */
        IntentFilter mScreenOnFilter = new IntentFilter("android.intent.action.SCREEN_ON");
        detective.this.registerReceiver(mScreenOReceiver, mScreenOnFilter);

        /* 注册机器锁屏时的广播 */
        IntentFilter mScreenOffFilter = new IntentFilter("android.intent.action.SCREEN_OFF");
        detective.this.registerReceiver(mScreenOReceiver, mScreenOffFilter);
    }

    public void onDestroy() {
        super.onDestroy();
        detective.this.unregisterReceiver(mScreenOReceiver);
    }

    private BroadcastReceiver mScreenOReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            if (action.equals("android.intent.action.SCREEN_ON")) {
                    System.out.println("—— SCREEN_ON ——");
            } else if (action.equals("android.intent.action.SCREEN_OFF")) {
                    System.out.println("—— SCREEN_OFF ——");
            }
        }

    };
}

```

    手动启动服务

```cpp
//替换相应服务名和包名
 adb shell am startservice -n com.qiyi.screenonofftest/com.qiyi.screenonofftest.detective

```
[日记本](https://www.jianshu.com/nb/21201760)
## 获取 gps 地址

<https://facebook.github.io/react-native/docs/geolocation>  
高德地图定位模块  
<https://github.com/qiuxiang/react-native-amap-geolocation>  
步骤  
<https://www.jianshu.com/p/dbcdaec6b911>

## 通过 js 打开新的 activity

<https://gitee.com/kikt/RN-startNewPage/tree/master/>

## 监听横竖屏切换

`npm install react-native-orientation --save`  
`react-native link react-native-orientation`

```js
禁止横屏
 Orientation.lockToPortrait()
构造函数：
 this.handleAppStateChange = this.handleAppStateChange.bind(this)
import Orientation from 'react-native-orientation';
componentDidMount(
  if (width > height) {
            Orientation.getOrientation((err, orientation) => {
                Global.orientationStr = orientation;
                this.setState({
                    curOrt: orientation
                })
            });
        }

    Orientation.addOrientationListener(this._orientationDidChange);
)

componentWillUnmount(
            Orientation.removeOrientationListener(this._orientationDidChange);
)

 _orientationDidChange = (ori) => {
        console.info("切换了" + ori)
        this.setState({
            curOrt: ori
        });
        Global.orientationStr = ori;
    }
```

## 监听前后台切换

```js
   constructor(props) {
        super(props)
        this.handleAppStateChange = this.handleAppStateChange.bind(this)
    }


componentDidMount(){
            AppState.addEventListener('change', this.handleAppStateChange);
}


    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

  handleAppStateChange(appState) {
        if (appState == 'active') {
            Orientation.getOrientation((err, orientation) => {
                Global.orientationStr = orientation;
                this.setState({
                    curOrt: orientation
                })
            });
        }
    }



```

## 监听 android 返回键

```js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  Platform,
} from 'react-native';
 
class App extends Component {
  //构造函数
  constructor(props) {
   super(props);
  }
 
  //组件初始渲染执行完毕后调用
  componentDidMount() {
    //如果当前是Android系统，则添加back键按下事件监听
    if(Platform.OS === "android") {
      BackAndroid.addEventListener('hardwareBackPress', ()=>{
        return this.handleBackAndroid(this.navigator);
      });
    }
  }
 
  //组件被卸载前会执行
  componentWillUnmount() {
    //如果当前是Android系统，则移除back键按下事件监听
    if(Platform.OS === "android") {
      BackAndroid.removeEventListener('hardwareBackPress', ()=>{});
    }
  }
 
  //back键按下事件响应
  handleBackAndroid(navigator) {
    //如果存在上一页则后退
    if(navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true; //接管默认行为
    }
    return false;  //使用默认行为（直接退出应用）
  }
 
  //..........
}


BackAndroid API 还有一个静态函数 exitApp，能让应用马上结束
```

## 监听网络状态

```js

import {
    NetInfo,
} from 'react-native';



NetInfo.fetch().done((status) => {
            hasInternet = status;
        });


componentDidMount(){
                NetInfo.addEventListener('change', this.handleConnectivityChange);
}


componentWillUnmount() {
           NetInfo.removeEventListener('change', this.handleConnectivityChange);

    }


    handleConnectivityChange(status) {
        if (status == 'NONE') {
            hasInternet = false;
        } else {
            hasInternet = true;
        }
        console.log('网络状态：' + hasInternet);
    }

```

## panResponder 手势支持，监听触摸事件

```js


    this.panResponder2 = PanResponder.create({
        //是否拦截触摸事件
        onStartShouldSetPanResponder: () => true,
        //
        onMoveShouldSetPanResponder: () => true,
        //开始手势触摸
        onPanResponderGrant: () => {
            this.startHiddenTimer()
            console.info("开始计时：")
        },

        //手势移动时候触发
        onPanResponderMove: (evt, gs) => {
        },
        //触摸离开，释放
        onPanResponderRelease: (evt, gs) => {
        }
    })

在需要监听的控件上添加
 <View style={styles.container}>
    <View style={[styles.redView,{backgroundColor: this.state.redViewBgColor}]}
        {...this._panResponder.panHandlers}
    ></View>
</View>


```

## 手势拖动控件

```js
this.panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
        this.startHiddenTimer()
        this._top = this.state.top
        this._right = this.state.right
    },
    onPanResponderMove: (evt, gs) => {
        console.log(gs.dx + ' ' + gs.dy)
        this.setState({
            top: this._top + gs.dy,
            right: this._right - gs.dx
        })
    },
    onPanResponderRelease: (evt, gs) => {
        this.setState({
            top: this._top + gs.dy,
            right: this._right - gs.dx
        })
    }
})


控件style使用top和right

 style={(this.state.curOrt == 'PORTRAIT') ? {
    top: this.state.top,
    right: this.state.right,
    position: "absolute",
    width: height > width ? width / 3 : height / 3,
    height: height > width ? height / 4 : height / 4,
}

```

## 关闭软键盘

```js
<TextInput
          onSubmitEditing={Keyboard.dismiss}
           ref='input'
           style={styles.reply}
           placeholder={this.state.placeholder}
           numberOfLines={1}
           value = {this.state.replyaccount}
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.setState({ replyaccount: text})}
/>

关闭键盘：
this.refs['input'].blur();

secureTextEntry={true}  密码*显示

```

例：

```js
 < TextInput style = {
    {
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        height: 30,
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4,
        width: 120,
    }
}
returnKeyType = "search"placeholder = "请输入关键字"
onChangeText = { (text) = >this.setState({
        searchStr: text
    })
}
/>/
```

## react 对话框

https://www.jianshu.com/p/641785e5efe7

## react 获取 BuildConfig 内容

```

https://github.com/luggit/react-native-config

如：
public final class BuildConfig {
  public static final boolean DEBUG = Boolean.parseBoolean("true");
  public static final String APPLICATION_ID = "venus.plugin.base";
  public static final String BUILD_TYPE = "debug";
  public static final String FLAVOR = "";
  public static final int VERSION_CODE = 1;
  public static final String VERSION_NAME = "1.0";
}

```

## 电视和机顶盒

### 官方

<https://reactnative.cn/docs/building-for-apple-tv>

android 层适配 tv  
<https://blog.csdn.net/github_33304260/article/details/80849376>
