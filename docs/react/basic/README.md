# react native基础
[[toc]]
## rn常用命令

>- 安装所有依赖  
> npm install  
> 
>- 运行到手机  
> react-native run-android  
> react-native run-ios  
> 
>- 运行不同的productFlavors  
> react-native run-android --variant normalDebug  
>
>- 日志  
>  react-native log-android

## react基础

#### 当前时间戳
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
### AsyncStorage的使用  
<https://www.jianshu.com/p/340696f50530>  

### ref使用
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


### Navigation prop  
<https://reactnavigation.org/docs/zh-Hans/navigation-prop.html>  
### 截取/替换字符串, 字符串转数组, 字符串中空格/字母/数字的个数   
<https://www.jianshu.com/p/7741d2db0338>  
### 遍历  
<https://cythilya.github.io/2018/06/17/array-and-object-handling/>  

## ReadableMap和WritableMap
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

## svg相关 

rn使用svg：  
<https://blog.csdn.net/zdluoa/article/details/79951005>  

svg转换  
<https://react-svgr.com/playground/>

svg2android  
<http://inloop.github.io/svg2android/>  


## npm
### 常用命令

>- **安装包，默认会安装最新的版本**  
npm install gulp
>
>- **安装指定版本**  
npm install gulp@3.9.1
>- **-S, --save**  
安装包信息将加入到dependencies（生产阶段的依赖）    
npm install gulp --save 或 npm install gulp -S
>
>- **-D, --save-dev**  
安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它    
npm install gulp --save-dev 或 npm install gulp -D
>
>- **-O, --save-optional**  
安装包信息将加入到optionalDependencies（可选阶段的依赖）  
npm install gulp --save-optional 或 npm install gulp -O
>
>- **-E, --save-exact**  
精确安装指定模块版本    
npm install gulp --save-exact 或 npm install gulp -E
>
>- **查看当前目录下安装了哪些node包**    
npm ls
>
>- **npm清理缓存**  
npm cache clean -f
>
>- **全局安装/卸载**  
npm install -g
npm uninstall -g

### 换成淘宝镜像
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

### 设置和取消代理方法
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
## 原生Android项目集成react native
<https://blog.csdn.net/anthony_3/article/details/78181665>  
<https://www.jianshu.com/p/3d8434174243>

## react native使用本地依赖
>1、根目录项创建文件夹node_modules_local,把修改的库移到这个文件夹  
2、修改package.json  
"react-native-baidu-map": "file:./node_modules_local/react-native-baidu-map",  
3、执行yarn install  

## 沙盒 
<https://codesandbox.io/>
## react学习资料  
官网<https://reactnative.cn/> 
<https://github.com/petehunt/react-howto/blob/6f09237b19773764a1fc35becf03b767548491ff/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-react-%E6%9C%AC%E8%BA%AB>  
学习指南  
<https://github.com/reactnativecn/react-native-guide>    
管理项目公共js方法  
<https://blog.csdn.net/oKeYue/article/details/79031209>  
demo例子
<https://www.hangge.com/blog/cache/category_76_1.html>  



## 自定义原生UI组件  

[官网流程](https://reactnative.cn/docs/0.51/native-component-android.html)
[详细流程](https://blog.csdn.net/it_talk/article/details/52638456)





