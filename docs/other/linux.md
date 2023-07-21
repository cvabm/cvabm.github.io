[[toc]]

## 安装和更换 JDK

```
安装jdk 1.6
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java6-installer
切换jdk当前版本
sudo update-alternatives --config java
vi .bashrc
export PATH=/usr/lib/jvm/java-1.6.0-openjdk-amd64/bin:$PATH
推荐JDK版本：OpenJDK 1.7
$ sudo apt-get install openjdk-7-jre openjdk-7-jdk
<intent-filter>
<action android:name="com.cibn.browser" />
<category android:name="android.intent.category.DEFAULT" />
</intent-filter>
```

### ubuntu 更换国内源

<https://zhuanlan.zhihu.com/p/61228593>

## vim 常用命令

```
http://c.biancheng.net/view/519.html

vi 文件名
i文字前插入
a文字后插入

dd删除文字所在整一行
x删除光标所在字符
X删除光标前字符

u撤回操作
U撤回一系列操作

dw删除整个单词

复制黏贴
v 移动选择文本 按y 移动到其他位置按p黏贴
yy复制文本所在整一行

插入
o在文本底下插入一行

:e ++enc=utf8
:e ++enc=gbk

Ctrl+u 上半页
Ctrl+d 下半页
Ctrl+f 下一页
Ctrl+b 上一页

[[ 返回文本开始
]] 到达文本末尾

/关键字 - 回车，再按n到达位置，按N定位上一个位置


vi ：    ----------------  编辑
/文件名  --------- -----查找
:set nu 行号     --------跳转到某一行
:wq ---------------保存并退出
:q! ------------不保存强制退出

 :set nu ------行号
:nu ------跳入行号

chattr ------修改属性
cp --------复制
chmod +777 文件名 ---------------------去除权限打开文件
```

```
移动光标
h 	光标左移一个字符
l 	光标右移一个字符
space	光标右移一个字符
Backspace	光标左移一个字符
k或Ctrl+p	光标上移一行
j或Ctrl+n 	光标下移一行
Enter 	光标下移一行
w或W 	光标右移一个字至字首
b或B 	光标左移一个字至字首
e或E 	光标右移一个字至字尾
) 	光标移至句尾
( 	光标移至句首
}	光标移至段落开头
{	光标移至段落结尾
nG	光标移至第n行首
n+	光标下移n行
n-	光标上移n行
n$	光标移至第n行尾
H 	光标移至屏幕顶行
M 	光标移至屏幕中间行
L 	光标移至屏幕最后行
0	（注意是数字零）光标移至当前行首
$	光标移至当前行尾


删除文本
ndd	删除当前行及其后n-1行
x或X	x删除光标后的，而X删除光标前
Ctrl+u	删除输入方式下所输入的文本

ndw或ndW	删除光标处开始及其后的n-1个字
do	删至行首
d$	删至行尾


打开文件
vi +n file	打开文件，并将光标置于第n行首
vi +/pattern file	打开文件，并将光标置于第一个与pattern匹配的串处
vi -r filename 	在上次正用vi编辑时发生系统崩溃，恢复filename
vi filename....file	打开多个文件，依次进行编辑


复制移动
n1,n2 co n3	将n1行到n2行之间的内容拷贝到第n3行下
n1,n2 m n3	将n1行到n2行之间的内容移至到第n3行下
n1,n2 d 	将n1行到n2行之间的内容删除


屏幕翻滚
Ctrl+u	向文件首翻半屏
Ctrl+d	向文件尾翻半屏
Ctrl+f	向文件尾翻一屏
Ctrl＋b；	向文件首翻一屏
nz	将第n行滚至屏幕顶部


插入文本
o	在当前行之下新开一行
O	在当前行之上新开一行
r	替换当前字符
R	替换当前字符及其后的字符，直至按ESC键
s	从当前光标位置开始，以输入的文本替代指定数目的字符
S	删除指定数目的行，并以所输入文本代替之
ncw或nCW	修改指定数目的字
nCC	修改指定数目的行
```

## vim 配色

<https://github.com/NLKNguyen/papercolor-theme>

## windows 命令

- `taskmgr` 任务管理器
- `shutdown -s -t 1200` //在两分钟后关闭计算机
- `shutdown /a` //取消关机命令

- `start notepad "c:\test.txt"` 指定记事本打开
- `start chrome baidu.com`
- `start 文件或文件夹`（直接打开）
- `touch file` 新建文件

- **windows cmd 改编码**

```
将当前控制台编码设置为UTF-8，则输入
CHCP 65001
通过CHCP设置编码是治标不治本的
想永久的更改cmd编码值需要修改注册表
方法一：
在运行中通过regedit进入注册表
找到HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe
新建一个 DWORD（32位值）,命名为CodePage，值设为65001
已有CodePage的话，修改它，改为十进制，65001
```

## windows 查看文件被占用进程

打開“資源監視器”。在“資源監視器”界面中，點擊第二個選項卡“CPU”。在“關聯的句柄”右側搜索框內輸入文件名稱，就可以查看該文件被那幾個程序佔用了。

![图片](https://pic.imgdb.cn/item/5f4870cd160a154a67958bd8.jpg)

## 无线调试

```
Android 手机需要是 Android 11 以上系统；开发者模式里有无线调试选项
电脑上的 Android SDK 工具需要 ≥ 30.0.0 版本，确认方式是：adb --version

1、打开无线调试- 使用配对码配对 - adb pair ip:port ，输入code码
2、adb connect ip:port(固定的ip和端口)


## 当前activity
```

adb shell dumpsys window | grep mCurrentFocus

```

```

## adb 工具 webadb

<https://yume-chan.github.io/ya-webadb/>  
浏览器 adb 连接手机，必须关闭 studio 等其他 adb 程序  
<https://www.vysor.io/>  
下载 windows 版本即可跟 android studio 共存

## adb 命令

- `adb shell pm list packages`：列出设备上安装的所有应用程序包名。
- `adb shell input text <text>`：模拟输入指定文本。
- `adb reboot`：重新启动设备。
- `adb shell am start -n <package_name>/<activity_name>`：启动指定应用程序的活动。
- `adb shell am startservice -n <service_name>`：启动指定服务。
- `adb shell am force-stop <package_name>`：强制停止指定应用程序。

- `adb shell am force-stop <package_name>`：强制停止指定应用程序。
- `adb shell am kill <package_name>`：杀死指定应用程序的进程。

- `adb shell dumpsys package <package_name>`：显示指定应用程序的包信息。
- `adb shell wm density`：设置设备的屏幕密度。
- `adb -s cf264b8f shell wm size` 获取屏幕分辨率

- `adb shell screencap <file_path>`：截屏，并将截图保存到指定的文件路径。
- `adb pull <device_file_path> <local_path>`：将设备上的文件复制到本地计算机。
- `adb push <local_path> <device_file_path>`：将本地计算机上的文件复制到设备上。

- `adb bugreport`：生成设备的 bug 报告，并将其保存到本地计算机。

monkey

- `monkey -p com.itheima.dialog 1000`
- `adb shell monkey -p com.example.agsdkdemo 10000 -s500 -v`
- `adb shell monkey -v -v -v -s 8888 --throttle 300 --pct-touch 30 --pct-motion 25 --pct-appswitch 25 --pct-majornav 5 --pct-nav 0 --pct-trackball 0 -p com.wwdy.app 10000`

- `adb shell monkey -p com.corerate.cep --throttle 500 --ignore-crashes --ignore-timeouts --ignore-security-exceptions --ignore-native-crashes --monitor-native-crashes -s 800 -v -v -v 200000>d:\111.txt`

stop monkey

- `adb shell ps |grep monkey`
- `adb shell kill pid`

自动化测试

- `adb shell am instrument -w com.example.agsdkdemo.test/android.test.InstrumentationTestRunner`

获取手机信息

- `adb shell getprop | grep product`获取厂商机型
- `adb shell getprop ro.build.version.release`获取 android 版本
- `adb shell getprop ro.product.cpu.abilist`
- `adb shell getprop ro.product.cpu.abi`获取设备硬件信息

input

- `adb shell input keyevent <key_code>`：模拟按下指定的按键。
- `adb shell input keyevent 26 && adb shell input swipe 250 250 800 800`：解锁手机
- 空格：`adb shell input keyevent 62`
- 删除：`adb shell input keyevent 67`
- MENU：`adb shell input keyevent 1`
- HOME：`adb shell input keyevent 2`
- back：`adb shell input keyevent 3`
- 字符：`adb shell input text ‘hello,world’`

- `adb reverse tcp:8081 tcp:8081`  
  Android 允许我们通过 ADB，把 Android 上的某个端口映射到电脑（adb forward），或者把电脑的某个端口映射到 Android 系统（adb reverse）。  
  假设电脑上开启的服务，监听的端口为 8000。Android 手机通过 USB 连接电脑后，执行 adb reverse tcp:8000 tcp:8000，然后在手机中访问 127.0.0.1:8000，就可以访问到电脑上启动的服务了。

- `adb shell am start -W [app包名]/[activtity路径.launchActivity]`app 启动时间

日志

- `adb logcat | grep "xxxx"`过滤日志，window 把 grep 改为 find
- `adb logcat > logcat/log.txt` 保存 log 到 txt 文件
- `adb logcat -c` ;清除 log
- `adb logcat -d -s ReactNativeJS -v time > redmi.txt` 读完最近所有 log 保存后返回
- `adb logcat -b crash` 过滤崩溃日志
- `adb bugreport`：生成设备的 bug 报告。

apk 管理

- `adb -s emulator-5555 install helloWorld.apk`
- `adb install -r`覆盖已安装
- `adb install -t`允许安装 app-debug.apk 测试包
- `pm disable PACKAGE_OR_COMPONENT` 冻结应用程序
- `pm enable PACKAGE_OR_COMPONENT` 解冻应用程序

卸载自带软件(免 root)

- `adb shell dumpsys window | grep mCurrentFocus`
- `adb shell pm uninstall -k --user 0 com.qihoo.browser`

清除设备缓存

- `adb shell pm clear <package_name>`
- `adb shell pm uninstall <full.packge.name>`
- `adb shell rm -rf /data/app/<full.package.name>-*`

## linux 命令

<https://www.linuxcool.com>

网络

- `ip addr`查看 ip 地址
- `ip -s link`显示不同网络接口的统计数据

其他

- `chmod 777`最高权限
- `chmod 999`有一定安全性，推荐
- `echo 'abcdef' > gaga.txt`向 gaga.txt 文件里面写入内容 abcdef
- `df /mnt/sdcard` 列出来一个目录的空间状态信息
- `sudo apt-get remove` 卸载软件

## ubuntu

- **常见问题**

  - ubuntu 安装依赖：0.8.1-1ubuntu4.4 正要被安装  
    解决办法：
    进入“系统->系统管理->更新管理器->设置”，在弹出的“软件源”对话框中选“更新”标签页，选中“Ubuntu 更新”下面的四个复选框，关闭后
    四个权限都打开
    在终端先执行“sudo apt-get update”就 ok 了
  - Could not get lock /var/lib/apt/lists/lock  
    执行 sudo rm /var/lib/apt/lists/lock

- **常用命令**
- `pwd` 显示当前路径
- `cd –` 返回上一次目录
- `cd ~` 返回主目录
- `cd /` 返回根目录
- `shutdonw -h now & half & poweroff` 关机
- `cat` 由第一行开始显示 cat |more 分页
- `nl` 在内容前加行号
- `whereis`,`locate` 快速定位查找
- `find 查找 find / -name “**_._**”`详细查找
- `whoami` 显示当前用户
- `free` 显示内存状态 free -m —>以 M 为单位显示
- `netstat` 显示网络状态 netstat -tulnp–>找出目前系統上已在監聽的網路連線及其 PID
- `tar -cvf /home/123.tar /etc` 打包，不压缩
- `tar -xvf 123.tar`解开包

## xshell 上传下载

- `rz -y`
- `sz file`
- `yum install lrzsz`

## linux 拷贝文件

- `scp -r /home/shaoxiaohu/test1 zhidao@192.168.0.1:/home/test2`  
  本机->远程服务器  
  test1 为源目录，test2 为目标目录，zhidao@192.168.0.1为远程服务器的用户名和 ip 地址。

- `scp -r zhidao@192.168.0.1:/home/test2 /home/shaoxiaohu/test1`
  Linux 下目录复制：远程服务器->本机
  zhidao@192.168.0.1为远程服务器的用户名和 ip 地址，test1 为源目录，test2 为目标目录。

注：如果端口号有更改，需在 scp 后输入：-P 端口号 （注意是大写，ssh 的命令中 -p 是小写

## windows 系统相关

### 宏碁 u 盘启动

```

 1、开机按 F2 进入 bios 设置界面，然后切换到“boot”栏，移动光标选择“Boot priority order”按回车确定。
 2、想要使用快捷键 U 盘启动的用户，完成步骤三操作后，开机按 F12 再选择 U 盘启动即可。

```

### win10 删除多余的系统引导

```
1、按 Win+R 键打开运行，输入 cmd 回车进入命令提示符。
2、在命令提示符下输入 msconfig,然后回车。
3、此时跳出系统配置的窗口，点击引导选项卡。
4、进入引导选项，在里面可以看到本计算机所有的引导，第一个是当前系统的引导，不能删也无法删，下面的是其他系统的引导，选择要删除的引导删除即可（注意：删除引导意味着该引导下的系统无法再次启动，请确认该引导完全无用后在删除）。

```

- `eventvwr`：事件查看器
- `notepad`：打开记事本

- `osk`：打开屏幕键盘
- `regedit`：注册表

- `snippingtool`：截图工具，支持无规则截图
- `taskmgr`：任务管理器（旧版）

### 校验 md5 值、sha1 等

```

certutil -hashfile xxx MD5
certutil -hashfile xxx SHA1
certutil -hashfile xxx SHA256

```

### linux 翻墙

# Linux 使用教程

- 1.

  执行 `cd && mkdir clash` 在用户目录下创建 clash 文件夹。

  下载适合的 Clash 二进制文件并解压重命名为 `clash`

  一般个人的 64 位电脑下载 clash-linux-amd64.tar.gz 即可。

  [下载客户端](https://github.com/Dreamacro/clash/releases)

- ***

  2.

  在终端 `cd` 到 Clash 二进制文件所在的目录，执行 `wget -O config.yaml https://www.paopaoyunyi.top/link/xxxxxxxxxx` 下载 Clash 配置文件

  [复制 wget 命令](https://www.ppyu.top/user/tutorial?os=linux&client=clash##)

  ![](https://www.ppyu.top/theme/malio/img/tutorial/linux-clash-2.jpg)

- ***

  3.

  执行 `./clash -d .` 即可启动 Clash，同时启动 HTTP 代理和 Socks5 代理。

  如提示权限不足，请执行 `chmod +x clash`

  ![](https://www.ppyu.top/theme/malio/img/tutorial/linux-clash-3.jpg)

- ***

  4.

  访问 [Clash Dashboard](http://clash.razord.top/) 可以进行切换节点、测延迟等操作。

  Host: `127.0.0.1`，端口: `9090`

  ![](https://www.ppyu.top/theme/malio/img/tutorial/linux-clash-4.jpg)

- ***

  5.

  以 Ubuntu 19.04 为例，打开系统设置，选择网络，点击网络代理右边的 ⚙ 按钮，选择手动，填写 HTTP 和 HTTPS 代理为 `127.0.0.1:7890`，填写 Socks 主机为 `127.0.0.1:7891`，即可启用系统代理。

  ![](https://www.ppyu.top/theme/malio/img/tutorial/linux-clash-5.jpg)

### 电脑键盘注册表已损坏导致无法输入信息的修复方式

解决方法：

1、打开注册表 regedit

注意： 如果因为键盘无法输入， 无法**W+R**打开运行窗口 输入 **regedit**

可以在以下目录中点击 **regedit.exe** 执行

```bash
C:\Windows\regedit.exe

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/db017430930242f88e46b83b86df222a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5qKm5Yed5ZOy6Zuq,size_20,color_FFFFFF,t_70,g_se,x_16)

2、定位到目录，删除 UpperFilters 项，并返回设备管理器中卸载设备，重新启动。

```bash
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4D36E96B-E325-11CE-BFC1-08002BE10318}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20035f2d1ee940348e1f65a1bfb03e30.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5qKm5Yed5ZOy6Zuq,size_20,color_FFFFFF,t_70,g_se,x_16)

此时可能出现两种情况

- 设备管理器里变成：代码  10：该设备无法启动。

- 这个设备运转正常（如图 5 一样），但依然输入无效。

3、重新定位到目录 ，右键右边的空白处，新建字符串，数值名称是**UpperFilters**项，数值数据是**kbdclass**

```bash
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4D36E96B-E325-11CE-BFC1-08002BE10318}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb3db6cdaa95432b9b8e7cfa949785ca.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5qKm5Yed5ZOy6Zuq,size_18,color_FFFFFF,t_70,g_se,x_16)

庆幸提前安装好 QQ，还能扫码登陆发送文字 **kbdclass** 复制粘贴过去就行。

4、返回设备管理器卸载设备，重新启动，就能正常使用。
![在这里插入图片描述](https://img-blog.csdnimg.cn/25165eb746df4cd4bed7e4a736e34416.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5qKm5Yed5ZOy6Zuq,size_20,color_FFFFFF,t_70,g_se,x_16)

---

## linux 依赖解决办法

```js
sudo apt-get -f install
sudo apt-get update
sudo apt-get upgrade
```

second step

```js
sudo apt-get update
sudo apt-get clean
sudo apt-get autoremove
```

third step

```js
sudo apt --fix-broken install
sudo apt-get update && sudo apt-get upgrade
sudo dpkg --configure -a
sudo apt-get install -f
```

### Ubuntu20.04 安装 yum 报错【无法定位软件包 yum】解决

**终极解决办法：**

```bash
#备份sources.list文件
sudo cp  /etc/apt/sources.list /etc/apt/sources.list.bak
#打开sources.list文件
sudo vim  /etc/apt/sources.list
#删除原内容，添加下列内容
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
#保存 做完以上前期工作，正式安装yum
sudo apt-get update
sudo apt install yum
#成功解决上楼报错
```

### Alacritty 命令行工具

Alacritty 默认不会添加配置文件，需要自己手动添加。

- Linux & Mac

```text
~/.config/alacritty/alacritty.yml
```

- Windows

```text
%APPDATA%\alacritty\alacritty.yml
```

[配色 1](https://github.com/alebelcor/alacritty-snazzy)
