# mac基本设置
[[toc]]
## 常用命令  


>**zsh切换为bash**  
`chsh -s /bin/bash`  
**bash切换为zsh**  
`chsh -s /bin/zsh`  
当然，输入完密码之后，需要重启或者新开窗口。  
>**反向Tab**  
`shift + tab`  
>**返回顶部**  
`command + ↑`  
>**撤销操作**   
`command + z`  
>**恢复操作**  
`command + shift + z`

## 常用软件使用
推荐应用  
<https://wangchujiang.com/awesome-mac/index.zh.html>  
下载站   
<https://xclient.info>    
<https://www.macdo.cn>   
<https://www.macapp.so>   

### alfred 
快捷键  
调用 ：option + 空格  
剪切板 ：option + command +c  
搜索书签： bm +关键字

### 虚拟机 
<https://xclient.info/s/vmware-fusion.html>  
### 安装gradle  
<https://www.jianshu.com/p/c28062f94809>  

### 屏幕取色
应用 - 数码调色器 - 设置显示为十六进制   
复制 shift + command + c   
粘贴 shift + command + v  


## 常见问题 
### Mac上“查询”后总显示“找不到结果” 、无法添加欧路词典
```
最佳解决方案是删除
/System/Library/AssetsV2/PreinstalledAssetsV2/InstallWithOs/com_apple_MobileAsset_DictionaryServices_dictionaryOSX
路径下的所有文件夹
删除之后在词典里点击相应词典就可以重新下载添加了
```

### chrome访问https证书问题  
Chrome NET::ERR_CERT_INVALID解决办法  
```
 There's a secret passphrase built into the error page.  Just make sure the page is selected (click anywhere on the background), and type `thisisunsafe`
```

## 设置截图默认保存位置
```
创建一个用来保存平时截图的目录，如：mkdir ~/Desktop/idolaoxuPic

在mac终端执行命令：
defaults write com.apple.screencapture location ~/Desktop/idolaoxuPic

如下执行完后，修改并没有生效，需执行如下命令生效
killall SystemUIServer

```

## 打开摄像头  

photo booth