[[toc]]

## rn 常用命令

> - 安装所有依赖  
>   npm install
>
> - 运行到手机  
>   react-native run-android  
>   react-native run-ios
>
> - 运行不同的 productFlavors  
>   react-native run-android --variant normalDebug
>
> - 日志  
>   react-native log-android

## rn 手动查看 bundle

手动生成 bundle  
`npx react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res --dev false –-sourcemap-output ./android/app/src/main/assets/index.android.bundle.map`  
新建 html，内容如下，chrome-F12 即可查看 bundle  
`<script src="index.android.bundle"></script>`  
各参数代表的意思

- –entry-file RN 入口文件的路径, 绝对路径或相对路径
- –platform \[string\] ios 或 andorid
- –dev \[boolean\] 如果为 false, 警告会不显示并且打出的包的大小会变小
- –prepack 当通过时, 打包输出将使用 Prepack 格式化
- –bridge-config \[string\] 使用 Prepack 的一个 json 格式的文件\_\_fbBatchedBridgeConfig 例如: ./bridgeconfig.json
- –bundle-output 打包后的文件输出目录
- –sourcemap-output \[string\] 生成 Source Map，但 0.14 之后不再自动生成 source map，需要手动指定这个参数
- –assets-dest \[string\] 打包时图片资源的存储路径
- –verbose 显示打包过程
- –reset-cache 移除缓存文件
- –config \[string\] 命令行的配置文件路径

## react 基础

### 当前时间戳

纳秒和毫秒
long msgTime = TimeUnit.MILLISECONDS.convert(latestMsgSendTime, TimeUnit.NANOSECONDS);

```
JavaScript 获取当前时间戳：
第一种方法：

var timestamp = Date.parse(new Date());
结果：1280977330000
第二种方法：

var timestamp = (new Date()).valueOf();
结果：1280977330748

第三种方法：

var timestamp=new Date().getTime()；
结果：1280977330748
```

### 数组

<https://www.jianshu.com/p/18e09fabd113>

### setState

<https://www.hangge.com/blog/cache/detail_1737.html>

### 全局变量

<https://www.jianshu.com/p/8e79c2f931e6>

### AsyncStorage 的使用

```
说明

最大限制6MB空间，也可以setMaxSize修改，但是官方不建议，存储大量数据还是sqlite或者realm等其他方式

```

<https://www.jianshu.com/p/340696f50530>

### ref 使用

```
<PanGrid
        ref={(grid) => {this.listPanGrid = grid}}
        dataSource={this.state.listData}
        configCols={this.state.listColumns}
        statistics={listStatistics}
        checkboxCell={true}
        orderCell={true}
        onFire={{eventType: 'onRowSelected', callback: this.onMainFire.bind(this)}}
/>

```

```
	listColumn = (e) => {
		e.stopPropagation();
	   this.listPanGrid.toggleToolPanel();//注意这的this.refs.listPanGrid已被替换成this.listPanGrid
	   addPropagation();
	};
```

### 截取/替换字符串, 字符串转数组, 字符串中空格/字母/数字的个数

<https://www.jianshu.com/p/7741d2db0338>

### 遍历

<https://cythilya.github.io/2018/06/17/array-and-object-handling/>

## ReadableMap 和 WritableMap

```
ReadableMap一般是用于RN向原生传递的数据类型
@ReactMethod
        public void getData(ReadableMap map, Callback callback{
                ReadableNativeMap map2 = (ReadableNativeMap) map;
                map1 = map2.toHashMap()；
        }

```

```
WritableMap一般是用于从原生给RN传递数据类型。

@ReactMethod
public void setData(Callback callback){
   WritableMap map = Arguments.createMap();
    map.putBoolean("success", true);
    callback.invoke(map);
}

然后在JS端调用的代码如下：

ReactWithNativeBridgeManager.setData(function(result) {
       console.log(resule.success);
    })


```

## svg 相关

[img to svg](https://www.visioncortex.org/vtracer/)  
[rn 使用 svg](https://blog.csdn.net/zdluoa/article/details/79951005)  
svg 转换  
<https://react-svgr.com/playground/>  
svg2android  
<http://inloop.github.io/svg2android/>  
SVG 转 PNG/JPG 工具 - 图标工场  
<https://icon.wuruihong.com/tools/svg2png>

### ico 转换

<https://www.wyzda.com/helper/favicon_text.html>

## node

- `cmd - node - process.env.hello=123` 设置环境变量，只在当前命令行有效
- `cmd - set RN_WEBRTC_SKIP_DOWNLOAD=1` 设置环境变量，全局有效
- `npm cache verify`npm 5.x 之前版本使用，修复缓存丢失的包
- `node filename.js` // 运行 JavaScript 文件
- `node` // 进入交互式运行模式

<https://yjhjstz.gitbooks.io/deep-into-node/>

## npm

### npm 常用命令

- `npm list` // 显示所有已安装的包及其依赖关系
- `npm list -g` // 显示全局安装的包及其依赖关系

> - **安装包，默认会安装最新的版本**  
>   npm install gulp
>
> - **安装指定版本**  
>   npm install gulp@3.9.1
> - **-S, --save**  
>   安装包信息将加入到 dependencies（生产阶段的依赖）  
>   npm install gulp --save 或 npm install gulp -S
>
> - **-D, --save-dev**  
>   安装包信息将加入到 devDependencies（开发阶段的依赖），所以开发阶段一般使用它  
>   npm install gulp --save-dev 或 npm install gulp -D
>
> - **-O, --save-optional**  
>   安装包信息将加入到 optionalDependencies（可选阶段的依赖）  
>   npm install gulp --save-optional 或 npm install gulp -O
>
> - **-E, --save-exact**  
>   精确安装指定模块版本  
>   npm install gulp --save-exact 或 npm install gulp -E
>
> - **查看当前目录下安装了哪些 node 包**  
>   npm ls
>
> - **npm 清理缓存**  
>   npm cache clean -f
>
> - **全局安装/卸载**  
>   npm install -g
>   npm uninstall -g

### npm 换成淘宝镜像

```
查看registy
- npm config get registry

将registry设置为淘宝镜像
- npm config set registry http://registry.npm.taobao.org

再次查看
- npm config get registry

如果自己本地已经设置为淘宝镜像，在publish本地node包时要改回原地址 不然会报401错误
- npm config set registry http://registry.npmjs.org
```

### npm 设置和取消代理方法

```
设置代理
1 npm config set proxy=http://127.0.0.1:8087
2 npm config set registry=http://registry.npmjs.org
关于http
经过上面设置使用了http开头的源，因此不需要设http_proxy了，否则还要加一句

1 npm config set https-proxy http://server:port
 代理用户名和密码
1 npm config set proxy http://username:password@server:port
2 npm config set https-proxy http://username:passwprd@server:port
取消代理
1 npm config delete proxy
2 npm config delete https-proxy
```

# 快速创建一个最简单的 node 服务

1、生成 package.json 文件

```bash
npm init -y
npm install express
```

2、创建并编写 js 文件，例如：server.js

```javascript
var express = require("express"); //导入express框架
var bodyParser = require("body-parser"); //http请求参数解析
var app = express(); //生成实例

//定义接口
app.get("/api/getList", function (request, response) {
  response.send("listData");
});

app.listen(80, function () {
  console.log("Node服务已启动");
});
```

3、在控制台执行命令，启动服务

```scss
node server.js
```

4、浏览器或 PostMan 访问地址，
<a href="http://localhost:3000/api/getList">http://localhost:3000/api/getList</a>

```js
npm install ws

const express = require('express');
const app = express();
const WebSocket = require('ws');

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    console.log('Received message:', data.toString());
    socket.send(`You said: ${data}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

```

**其他：meteor 、nest.js、Koa**

## resolutions 选择性依赖项

package.json，不更新依赖包的情况下，更新某个依赖包内部的子依赖项

```js
{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "left-pad": "1.0.0",
    "c": "file:../c-1",
    "d2": "file:../d2-1"
  },
  "resolutions": {
    "d2/left-pad": "1.1.1",
    "c/**/left-pad": "1.1.2"
  }
}
```

## 原生 Android 项目集成 react native

<https://blog.csdn.net/anthony_3/article/details/78181665>  
<https://www.jianshu.com/p/3d8434174243>

## react native 使用本地依赖

> 1、根目录项创建文件夹 node_modules_local,把修改的库移到这个文件夹  
> 2、修改 package.json  
> "react-native-baidu-map": "file:./node_modules_local/react-native-baidu-map",  
> 3、执行 yarn install

### react native 手动 link

```java
总共三步
1、settings.gradle文件
include ':react-native-webview'
project(':react-native-webview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview/android')

2、app/build.gradle文件
implementation project(':react-native-webview')

3、MainApplication.java文件

 @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage()
      );
}

别忘了导包：import com.reactnativecommunity.webview.RNCWebViewPackage;

```

## 沙盒

<https://codesandbox.io/>

## react 学习资料

<https://react.iamkasong.com/>  
<https://reactnative.cn/>  
<https://github.com/petehunt/react-howto/blob/6f09237b19773764a1fc35becf03b767548491ff/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-react-%E6%9C%AC%E8%BA%AB>  
学习指南  
<https://github.com/reactnativecn/react-native-guide>  
管理项目公共 js 方法  
<https://blog.csdn.net/oKeYue/article/details/79031209>  
demo 例子
<https://www.hangge.com/blog/cache/category_76_1.html>

## 自定义原生 UI 组件

[官网流程](https://reactnative.cn/docs/0.51/native-component-android.html)
[详细流程](https://blog.csdn.net/it_talk/article/details/52638456)

## ui 界面相关

### 获取当前页面

```js
const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    CallVC: {
      screen: CallVC,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  {
    mode: "modal",
    headerMode: "none", // 设置顶部导航条不显示
    initialRouteName: "Login", // 默认的初始路由
    transitionConfig: () => ({
      screenInterpolator: (props) => {
        const { index, isActive, route } = props.scene;
        if (isActive) {
          Global.currentPage = route.routeName;
          console.log("当前页面：" + Global.currentPage);
        }
      },
    }),
  }
);
```

### package.json 依赖

```
~跟^最大差別就是鎖定的版本號位置不得高於該版本號碼
^：鎖住第一碼(即A) 不得變更。如^1.2.2，則安裝範圍是>=1.2.2 且 <2.0.0。即須符合1.*.*。
~：鎖住第二碼(即B) 不得變更。如~1.2.2，則安裝範圍是>=1.2.2且<1.3.0。即須符合1.2.*。
```
