# Linux
[[toc]]
## 常见问题
#### repo upload 时报错
<https://www.iteye.com/blog/yinger-fei-1535663>

#### Could not get lock /var/lib/apt/lists/lock
执行 sudo rm /var/lib/apt/lists/lock




## 安装和更换JDK
<https://www.jianshu.com/p/8e472580a350>
```
安装jdk 1.6  
sudo add-apt-repository ppa:webupd8team/java   
sudo apt-get update  
sudo apt-get install oracle-java6-installer  
切换更改当前jdk版本  
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
## 安装Android studio
<http://ask.android-studio.org/?/question/733>
## 搭建Android环境
eclipse<https://www.cnblogs.com/leoking01/p/6605833.html>
## Linux虚拟机共享主机的SSR实现翻墙
<https://www.zybuluo.com/CrazyHenry/note/1097693>
## unbuntu
各版本下载<http://mirrors.163.com/ubuntu-releases/>
## 相关软件
图像编辑<http://www.imagemagick.com.cn/index.html>
## repo命令
<https://source.android.google.cn/setup/develop/repo>
## 常用linux命令
命令大全<https://man.linuxde.net/>  
中文readme<https://github.com/mzlogin/awesome-adb#%E5%91%BD%E4%BB%A4%E8%AF%AD%E6%B3%95>
<https://github.com/mzlogin/awesome-adb>  
## svn常用命令
<https://blog.csdn.net/yangzhongxuan/article/details/7018168>  

### 文件显示灰色，无法删除
先把加入到cvs中的svn删除操作回退，然后再进行本地删除。  

## sudo命令
## vi编辑器常用命令
```
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

## windows命令
shutdown -s -t 1200  //在两分钟后关闭计算机
shutdown /a  //取消关机命令
dir列出所有文件和文件夹

## windows查看文件被占用进程
打開“資源監視器”。在“資源監視器”界面中，點擊第二個選項卡“CPU”。在“關聯的句柄”右側搜索框內輸入文件名稱，就可以查看該文件被那幾個程序佔用了。


![图片](https://pic.imgdb.cn/item/5f4870cd160a154a67958bd8.jpg)

## CURL常用命令  
<http://www.cnblogs.com/gbyukg/p/3326825.html>  

## 常用adb命令
```
app启动时间  
adb shell am start -W [packageName]/[packageName.launchActivity]  

adb -s cf264b8f shell wm size  //比如这时想指定 cf264b8f 这个设备来运行 adb 命令获取屏幕分辨率：
adb shell pm clear <packagename>  //清除应用数据与缓存

过滤日志  

windows:
adb logcat | find "meessage"  中文有乱码
linux:
adb logcat | grep "xxxx"

保存log到txt文件:
adb logcat > logcat/log.txt

adb shell monkey -v –throttle 300 –pct-touch 30
–pct-motion 20 –pct-nav 20 –pct-majornav 15 –pct-appswitch 5

–pct-anyevent 5 –pct-trackball 0 –pct-syskeys 0 -p ‘%s’ 1000

adb shell monkey -p com.corerate.cep -v --throttle 300 --pct-touch 30 --pct-motion 20 --pct-nav 20 --pct-majornav 15 --pct-appswitch 5 --pct-anyevent 5 --pct-trackball 0 --pct-syskeys 0 -p '%s' 1000 > d:\111.txt
adb shell monkey -p com.corerate.cep --throttle 500 --ignore-crashes --ignore-timeouts --ignore-security-exceptions --ignore-native-crashes --monitor-native-crashes -s 800 -v -v -v 200000>d:\111.txt


查看设备：adb device登录设备的shell：adb shell启动和关闭ADB服务：adb kill-server重启设备：adb reboot
adb install -r

查看所有应用包名  adb shell pm list packages多设备选择   adb –s <设备号> 
adb -d shell "run-as com.soft.tm1 ls /data/data/com.soft.tm1/databases/
直接运行此命令：

adb -d shell "run-as com.soft.tm1 cat /data/data/com.soft.tm1/databases/TianMain.db > /sdcard/TianMain.db"
adb pull /sdcard/com.soft.tm1
adb pull sdcard/Playcamera/ww.jpg f:/test4.jpg
adb push f:/test4.jpg sdcard/test4.jpg
Install Failed Insufficient Storage
清除设备缓存
adb shell pm uninstall <full.packge.name>
adb shell rm -rf /data/app/<full.package.name>-*

```
```
#Android操作系统底层linux
2.6.x内核

#Android操作系统的目录结构
* data目录： 保存应用程序的数据
* /data/app目录 用户安装的应用程序的apk
* /data/anr目录 开发人员使用定位anr异常
* /data/system目录 系统配置信息，注册表

* dev目录 ： devices英文单词的缩写
> linux操作系统所有的设备都是用文件表示的
* mnt 外置的挂载上来的设备 
>sdcard u盘

* proc目录 配置，状态信息

* sbin
>system bin系统重要的二进制文件
adbd: adb调试桥的服务器端进程

* system 系统目录文件夹（重要） Android系统标准目录结构
* /system/app目录 系统应用程序目录 默认卸载不掉
* /system/bin目录 可执行的二进制程序
* /system/exc 扩展目录
* /system/fonts 字体目录
* /system/framework 框架平台中间件
* /system/lib 类库 c/c++代码
* /system/media 媒体资源 
* /system/tts 语音发声引擎 不支持中文
* /system/usr 用户设备的配置信息 按键编码映射
* /system/xbin 二进制文件，为开发人员提供的二进制文件

## 常见的linux指令
/data/local/tmp 临时目录。目录里面的文件都是可以任意操作

* su  
> superuser 切换到超级管理员，无所不能的
>\# 超级管理员
> $ 一般用户 
* rm 
> remove 删除一个文件
> rm 文件名 
> rm *.txt
* ls 
> 列出来所有的文件和文件夹
> ls -l 列出来文件的详细信息 c驱动 d文件夹 -文件
> ls -a 显示隐藏文件 文件名前缀带. 就是隐藏文件
* cd 
> 切换到某个目录 cd .. 切换到上级目录
* cat 
> 猫，好奇害死猫
> 查看文件详细内容的指令
> cat 文件名 
> 注意： 一定不要cat 二进制程序
* mv 
>move 移动 
>move 源地址 -- > 目标地址
>常用于文件的重命名 move 源文件名称 目标文件名称
* cp 
> copy 拷贝文件 在Android操作系统并没有被引入进来
* mkdir 
> make dir 创建文件夹
* rmdir 
> 删除文件夹

* chmod
> change mode
> 更改文件的模式，权限 
> 修改为最高权限 chmod 777 文件名
* touch
> 创建文件 操作文件的指令 
> touch 文件名 如果文件不存在，直接创建文件，如果文件存在，什么事情都不发生

* echo 
> 回显数据， 数据的重定向
> echo 'abcdef' > gaga.txt
> 向gaga.txt 文件里面写入内容 abcdef
> 可以利用重定向符号去实现文件的拷贝

* sleep 
> .sh linux系统的下的批处理文件 
> sleep 睡眠函数 用于延迟多久执行命令
* df 
> df /mnt/sdcard 列出来一个目录的空间状态信息

* id  
>打印获取当前的用户组
>android系统给不同的应用分配了不同的用户
>uid， user id，用户id
>uid=0(root)  无所不能，非常强大 如来佛祖
>uid=1000(system) 系统用户 比较强大 玉皇大帝
>uid=2000(shell) 命令行窗体 执行adb指令
>uid=(10000+)  一般应用程序的id  如果不声明权限，什么危险的操作都干不了
* ps
> 列出来操作系统运行的所有的进程
* kill 
> 杀掉进程
> kill 进程pid
* reboot 
> 重启 root权限下
* chown 
> chage owner 更改所有者
> chown 当前文件所有者.当前文件所有者组 文件名
* mount
> 挂载，只有文件系统被挂载才可读可写
> mount -o remount rw / 挂载当前目录为可读可写权限
> mount -o remount ,rw /system 删除任意的文件
> 系统应用程序卸载器 （你的能力越大，你的责任越大）

为什么真实的手机都没有root权限，手机自行root后不保修。


## Android下特有的linux指令
* am 
> activity manager
> am start -n com.itheima.dialog/com.itheima.dialog.MainActivity 开启一个应用程序
> am force-stop com.itheima.dialog 强行停止应用
> am startservice 开启服务
> am broadcast 发送广播

* pm
> package manager 包管理器
> pm clear PACKAGE 清除应用程序数据
> pm disable PACKAGE_OR_COMPONENT 冻结应用程序（深度冻结）
> pm enable PACKAGE_OR_COMPONENT  解冻应用程序（深度解冻）

* monkey 
>猴子 自动化压力暴力测试
>monkey -p com.itheima.dialog 1000

* sendevent
>sendevent /dev/input/event0 3 0 +pointX 水平方向坐标
>sendevent /dev/input/event0 3 1 +pointY 垂直方向坐标



#如果想让真实的手机执行这些指令
#前提条件： 手机必须要root权限，手机要刷root

#刷root的原理 
> 就是把su二进制文件拷贝到 /system/bin 或者/system/xbin

> 苹果的越狱软件，Android刷root软件，工作的原理全部都是利用系统的漏洞实现

#刷模拟器，rom写文件（su）
* recovery  老毛桃 大白菜 深山红叶 雨林木风 winpe
* bootloader  bios 设置u盘启动
* rom 免序列号xp.iso windows.iso android4.2 rom

#静默安装
为什么有静默安装的需求
1. 正规应用。电子市场，方便用户静默安装
2. 病毒软件。静默安装的需求。


#修改字体
#修改开机动画
#删除锁屏密码

```
```
m：编译所有的模块   
mm：编译当前目录下的模块，当前目录下要有Android.mk文件   
mmm：编译指定路径下的模块，指定路径下要有Android.mk文件   
vi:  编辑    
wq : 保存并退出  
q! :   不保存退出   
egrep:查找  
find：查找  
chattr：修改属性  
chmod：修改权限  
zip：压缩和打包  
```
### 获取设备硬件信息
```
adb shell getprop ro.product.cpu.abilist
adb shell getprop ro.product.cpu.abi
```

## 常见问题
ubuntu安装依赖：0.8.1-1ubuntu4.4 正要被安装
解决办法：  
进入“系统->系统管理->更新管理器->设置”，在弹出的“软件源”对话框中选“更新”标签页，选中“Ubuntu 更新”下面的四个复选框，关闭后  
四个权限都打开  
在终端先执行“sudo apt-get update”就ok了   

## 一篇非常好的linux学习笔记分享(Linux入门绝佳)
```
linux目录架构 
/ 根目录 
/bin 常用的命令 binary file 的目錄 
/boot 存放系统启动时必须读取的档案，包括核心 (kernel) 在内 
/boot/grub/menu.lst GRUB设置 
/boot/vmlinuz 内核 
/boot/initrd 核心解壓縮所需 RAM Disk 
/dev 系统周边设备 
/etc 系统相关设定文件 
/etc/DIR_COLORS 设定颜色 
/etc/HOSTNAME 设定用户的节点名 
/etc/NETWORKING 只有YES标明网络存在 
/etc/host.conf 文件说明用户的系统如何查询节点名 
/etc/hosts 设定用户自已的IP与名字的对应表 
/etc/hosts.allow 设置允许使用inetd的机器使用 
/etc/hosts.deny 设置不允许使用inetd的机器使用 
/etc/hosts.equiv 设置远端机不用密码 
/etc/inetd.conf 设定系统网络守护进程inetd的配置 
/etc/gateways 设定路由器 
/etc/protocols 设定系统支持的协议 
/etc/named.boot 设定本机为名字服务器的配置文件 
/etc/sysconfig/network-scripts/ifcfg-eth0 设置IP 
/etc/resolv.conf 设置DNS 
/etc/X11 X Window的配置文件,xorg.conf 或 XF86Config 這兩個 X Server 的設定檔 
/etc/fstab 记录开机要mount的文件系统 
/etc/inittab 设定系统启动时init进程将把系统设置成什么样的runlevel 
/etc/issue 记录用户登录前显示的信息 
/etc/group 设定用户的组名与相关信息 
/etc/passwd 帐号信息 
/etc/shadow 密码信息 
/etc/sudoers 可以sudo命令的配置文件 
/etc/securetty 设定哪些终端可以让root登录 
/etc/login.defs 所有用户登录时的缺省配置 
/etc/exports 设定NFS系统用的 
/etc/init.d/ 所有服務的預設啟動 script 都是放在這裡的，例如要啟動或者關閉 
/etc/xinetd.d/ 這就是所謂的 super daemon 管理的各項服務的設定檔目錄 
/etc/modprobe.conf 内核模块额外参数设定 
/etc/syslog.conf 日志设置文件 
/home 使用者家目录 
/lib 系统会使用到的函数库 
/lib/modules kernel 的相关模块 
/var/lib/rpm rpm套件安装处 
/lost+found 系統不正常產生錯誤時，會將一些遺失的片段放置於此目錄下 
/mnt 外设的挂载点 
/media 与/mnt类似 
/opt 主机额外安装的软件 
/proc 虚拟目录，是内存的映射 
/proc/version 内核版本 
/proc/sys/kernel 系统内核功能 
/root 系统管理员的家目录 
/sbin 系统管理员才能执行的指令 
/srv 一些服務啟動之後，這些服務所需要取用的資料目錄 
/tmp 一般使用者或者是正在執行的程序暫時放置檔案的地方 
/usr 最大的目录，存许应用程序和文件 
/usr/X11R6： X-Window目录 
/usr/src： Linux源代码 


/usr/include：系统头文件 
/usr/openwin 存放SUN的OpenWin 
/usr/man 在线使用手册 
/usr/bin 使用者可執行的 binary file 的目錄 
/usr/local/bin 使用者可執行的 binary file 的目錄 
/usr/lib 系统会使用到的函数库 
/usr/local/lib 系统会使用到的函数库 
/usr/sbin 系统管理员才能执行的指令 
/usr/local/sbin 系统管理员才能执行的指令 
/var 日志文件 
/var/log/secure 記錄登入系統存取資料的檔案，例如 pop3, ssh, telnet, ftp 等都會記錄在此檔案中 
/var/log/wtmp 記錄登入者的訊息資料, last 
/var/log/messages 幾乎系統發生的錯誤訊息 
/var/log/boot.log 記錄開機或者是一些服務啟動的時候，所顯示的啟動或關閉訊息 
/var/log/maillog 紀錄郵件存取或往來( sendmail 與 pop3 )的使用者記錄 
/var/log/cron 記錄 crontab 這個例行性服務的內容 
/var/log/httpd, /var/log/news, /var/log/mysqld.log, /var/log/samba, /var/log/procmail.log： 
分別是幾個不同的網路服務的記錄檔 
一些常用的基本命令: 
uname -a 查看内核版本 
ls -al 显示所有文件的属性 
pwd 显示当前路径 
cd – 返回上一次目录 cd ~ 返回主目录 
date s 设置时间、日期 
cal 显示日历 cal 2006 
bc 计算器具 
man & info 帮助手册 
locale 显示当前字体 locale -a 所有可用字体 /etc/sysconfig/i18n设置文件 
LANG=en 使用英文字体 
sync 将数据同步写入硬盘 
shutdonw -h now & half & poweroff 关机 
reboot 重启 
startx & init 5 进入图形介面 
/work & ?work 向上、下查找文档内容 
chgrp 改变档案群组 chgrp testing install.log 
chown 改变所属人 chown root:root install.log 
chmod 改变属性 chmod 777 install.log read=4 write=2 execute=1 
cp 复制 cp filename 
rm 删除文件 rm -rf filename 强制删除文件 
rmdir 删除文件夹 
mv 移动 mv 123.txt 222.txt 重命名 
mkdir 创建文件夹 
touch 创建文件 更新当前时间 
cat 由第一行开始显示 cat |more 分页 
nl 在内容前加行号 
more & less 一面一面翻动 
head -n filename 显示第N行内容 
tail -n filename 显示后N行内容 
od 显示非纯文档 
df -h 显示分区空间 
du 显示目录或文件的大小 
fdisk 分区设置 fdisk -l /dev/hda 显示硬盘分区状态 
mkfs 建立各种文件系统 mkfs -t ext3 /dev/ram15 
fsck 检查和修复LINUX档案 
ln 硬链接 ln -s 软件链接 
whereis 查找命令 
locate 查找 
find 查找 find / -name “***.***” 


which 查看工具 
whoami 显示当前用户 
gcc -v 查看GCC版本 
chattr +i filename 禁止删除 chattr -i filename 取消禁止 
lsattr 显示隐藏档属性 
updatedb 更新资料库 
mke2fs 格式化 mkfs -t ext3 
dd if=/etc/passwd of=/tmp/passwd.bak 备份 
mount 列出系统所有的分区 
mount -t iso9660 /dev/cdrom /mnt/cdrom 挂载光盘 
mount -t vfat /dev/fd0 /mnt/floppy 挂载软盘 
mount -t vfat -o iocharset=utf8,umask=000 /dev/hda2 /mnt/hda2 挂载fat32分区 
mount -t ntfs -o nls=utf8,umask=000 /dev/hda3 /mnt/hda3 挂载ntfs分区 
Linux-NTFS Project: http://linux-ntfs.sourceforge.net/ 
umount /mnt/hda3 缷载 
ifconfig 显示或设置网络设备 
service network restart 重启网卡 
ifdown eth0 关闭网卡 
ifup eth0 开启网卡 
clear 清屏 
history 历史记录 !55 执行第55个指令 
stty 设置终端 stty -a 
fdisk /mbr 删除GRUB 
at 僅進行一次的工作排程 
crontab 循環執行的例行性命令 [e]编辑,[l]显示,[r]删除任务 
& 后台运行程序 tar -zxvf 123.tar.gz & —>后台运行 
jobs 观看后台暂停的程序 jobs -l 
fg 将后台程序调到前台 fg n –>n是数字,可以指定进行那个程序 
bg 让工作在后台运行 
kill 结束进程 kill -9 PID [9]强制结束,[15]正常结束,[l]列出可用的kill信号 
ps aux 查看后台程序 
top 查看后台程序 top -d 2 每两秒更新一次 top -d 2 -p10604 观看某个PID 
top -b -n 2 > /tmp/top.txt –>將 top 的資訊進行 2 次，然後將結果輸出到 /tmp/top.txt 
pstree 以树状图显示程序 [A]以 ASCII 來連接, [u]列出PID, [p]列出帐号 
killall 要刪除某個服務 killall -9 httpd 
free 显示内存状态 free -m —>以M为单位显示 
uptime 显示目前系统开机时间 
netstat 显示网络状态 netstat -tulnp–>找出目前系統上已在監聽的網路連線及其 PID 
dmesg 显示开机信息 demsg | more 
nice 设置优先权 nice -n -5 vi & –>用 root 給一個 nice 植為 -5 ，用於執行 vi 
renice 调整已存在优先权 
runlevel 显示目前的runlevel 
depmod 分析可载入模块的相依性 
lsmod 显示已载入系统的模块 
modinfo 显示kernel模块的信息 
insmod 载入模块 
modprobe 自动处理可载入模块 
rmmod 删除模块 
chkconfig 检查，设置系统的各种服务 chkconfig -list –>列出各项服务状态 
ntsysv 设置系统的各种服务 
cpio 备份文件压缩命令： 
*.Z compress 程式壓縮的檔案； 
*.bz2 bzip2 程式壓縮的檔案； 
*.gz gzip 程式壓縮的檔案； 
*.tar tar 程式打包的資料，並沒有壓縮過； 
*.tar.gz tar 程式打包的檔案，其中並且經過 gzip 的壓縮 
compress filename 压缩文件 加[-d]解压 uncompress 
gzip filename 压缩 加[-d]解压 zcat 123.gz 查看压缩文件内容 


bzip2 -z filename 压缩 加[-d]解压 bzcat filename.bz2 查看压缩文件内容 
tar -cvf /home/123.tar /etc 打包，不压缩 
tar -xvf 123.tar 解开包 
tar -zxvf /home/123.tar.gz 以gzip解压 
tar -jxvf /home/123.tar.bz2 以bzip2解压 
tar -ztvf /tmp/etc.tar.gz 查看tar内容 
cpio -covB > [file|device] 份份 
cpio -icduv < [file|device] 还原 
vi一般用法 
一般模式 编辑模式 指令模式 
h 左 a,i,r,o,A,I,R,O :w 保存 
j 下 进入编辑模式 :w! 强制保存 
k 上 dd 删除光标当前行 :q! 不保存离开 
l 右 ndd 删除n行 :wq! 保存后离开 
0 移动到行首 yy 复制当前行 :e! 还原原始档 
$ 移动到行尾 nyy 复制n行 :w filename 另存为 
H 屏幕最上 p,P 粘贴 :set nu 设置行号 
M 屏幕中央 u 撤消 :set nonu 取消行号 
L 屏幕最下 [Ctrl]+r 重做上一个动作 ZZ 保存离开 
G 档案最后一行 [ctrl]+z 暂停退出 :set nohlsearch 永久地关闭高亮显示 
/work 向下搜索 :sp 同时打开两个文档 
?work 向上搜索 [Ctrl]+w 两个文档设换 
gg 移动到档案第一行 :nohlsearch 暂时关闭高亮显示 
认识SHELL 
alias 显示当前所有的命令别名 alias lm=”ls -al” 命令别名 unalias lm 取消命令别名 
type 类似which 
exprot 设置或显示环境变量 
exprot PATH=”$PATH”:/sbin 添加/sbin入PATH路径 
echo $PATH 显示PATH路径 
bash 进入子程序 
name=yang 设定变量 
unset name 取消变量 
echo $name 显示变量的内容 
myname=”$name its me” & myname=’$name its me’ 单引号时$name失去变量内容 
ciw=/etc/sysconfig/network-scripts/ 设置路径 
env 列出所有环境变量 
echo $RANDOM 显示随意产生的数 
set 设置SHELL 
PS1=’[\u@\h \w \A #\#]\$ ‘ 提示字元的設定 
[root@linux ~]# read [-pt] variable —-读取键盘输入的变量 
參數： 
-p ：後面可以接提示字元！ 
-t ：後面可以接等待的『秒數！』 
declare 声明 shell 变量 
ulimit -a 显示所有限制资料 
ls /tmp/yang && echo “exist” || echo “not exist” 
意思是說，當 ls /tmp/yang 執行後，若正確，就執行echo “exist” ,若有問題，就執行echo “not exist” 
echo $PATH | cut -d ‘:’ -f 5 以:为分隔符,读取第5段内容 
export | cut -c 10-20 读取第10到20个字节的内容 
last | grep ‘root’ 搜索有root的一行,加[-v]反向搜索 
cat /etc/passwd | sort 排序显示 
cat /etc/passwd | wc 显示『行、字数、字节数』 
正规表示法 
[root@test root]# grep [-acinv] ‘搜尋字串’ filename 
參數說明： 
-a ：將 binary 檔案以 text 檔案的方式搜尋資料 
-c ：計算找到 ‘搜尋字串’ 的次數 
-i ：忽略大小寫的不同，所以大小寫視為相同 


-n ：順便輸出行號 
-v ：反向選擇，亦即顯示出沒有 ‘搜尋字串’ 內容的那一行！ 
grep -n ‘the’ 123.txt 搜索the字符 —-搜尋特定字串 
grep -n ‘t[ea]st’ 123.txt 搜索test或taste两个字符—利用 [] 來搜尋集合字元 
grep -n ‘[^g]oo’ 123.txt 搜索前面不为g的oo—-向選擇 [^] 
grep -n ‘[0-9]‘ 123.txt 搜索有0-9的数字 
grep -n ‘^the’ 123.txt 搜索以the为行首—-行首搜索^ 
grep -n ‘^[^a-zA-Z]‘ 123.txt 搜索不以英文字母开头 
grep -n ‘[a-z] 

123.txt 搜索以a-z结尾的行—- 行尾搜索$ 
grep -n ‘g..d’ 123.txt 搜索开头g结尾d字符—-任意一個字元 . 
grep -n ‘ooo*’ 123.txt 搜索至少有两个oo的字符—重複字元 * 
sed 文本流编辑器 利用脚本命令来处理文本文件 
awd 模式扫描和处理语言 
nl 123.txt | sed ‘2,5d’ 删除第二到第五行的内容 
diff 比较文件的差异 
cmp 比较两个文件是否有差异 
patch 修补文件 
pr 要打印的文件格式化 

帐号管理 
/etc/passwd 系统帐号信息 
/etc/shadow 帐号密码信息 经MD5 32位加密 
在密码栏前面加『 * 』『 ! 』禁止使用某帐号 
/etc/group 系统群组信息 
/etc/gshadow 
newgrp 改变登陆组 
useradd & adduser 建立新用户 —> useradd -m test 自动建立用户的登入目录 
useradd -m -g pgroup test —>指定所属级 
/etc/default/useradd 相关设定 
/etc/login.defs UID/GID 有關的設定 
passwd 更改密码 —-> passwd test 
usermod 修改用户帐号 
userdel 删除帐号 —->userdel -r test 
chsh 更换登陆系统时使用的SHELL [-l]显示可用的SHELL;[-s]修改自己的SHELL 
chfn 改变finger指令显示的信息 
finger 查找并显示用户信息 
id 显示用户的ID —-> id test 
groupadd 添加组 
groupmod 与usermod类似 
groupdel 删除组 
su test 更改用户 su – 进入root,且使用root的环境变量 
sudo 以其他身份来执行指令 
visudo 编辑/etc/sudoers 加入一行『 test ALL=(ALL) ALL 』 
%wheel ALL = (ALL) ALL 系统里所有wheel群组的用户都可用sudo 
%wheel ALL = (ALL) NOPASSWD: ALL wheel群组所有用户都不用密码NOPASSWD 
User_Alias ADMPW = vbird, dmtsai, vbird1, vbird3 加入ADMPW组 
ADMPW ALL = NOPASSWD: !/usr/bin/passwd, /usr/bin/passwd [A-Za-z]*, \ 
!/usr/bin/passwd root 可以更改使用者密码,但不能更改root密码 (在指令前面加入 ! 代表不可) 
PAM (Pluggable Authentication Modules, 嵌入式模組) 
who & w 看谁在线 
last 最近登陆主机的信息 
lastlog 最近登入的時間 读取 /var/log/lastlog 
talk 与其他用户交谈 
write 发送信息 write test [ctrl]+d 发送 
mesg 设置终端机的写入权限 mesg n 禁止接收 mesg y 
wall 向所有用户发送信息 wall this is q test 
mail 写mail 
/etc/default/useradd 家目录默认设置 


quota 显示磁盘已使用的空间与限制 quota -guvs –>秀出目前 root 自己的 quota 限制值 
quota -vu 查询 
quotacheck 检查磁盘的使用空间与限制 quotacheck -avug –>將所有的在 /etc/mtab 內，含有 quota 支援的 partition 進行掃瞄 
[-m] 强制扫描 
quota一定要是独立的分区,要有quota.user和quota.group两件文件,在/etc/fstab添加一句: 
/dev/hda3 /home ext3 defaults,usrquota,grpquota 1 2 
chmod 600 quota* 设置完成,重启生效 
edquota 编辑用户或群组的quota [u]用户,[g]群组,[p]复制,[t]设置宽限期限 
edquota -a yang edquota -p yang -u young –>复制 
quotaon 开启磁盘空间限制 quotaon -auvg —>啟動所有的具有 quota 的 filesystem 
quotaoff 关闭磁盘空间限制 quotaoff -a —>關閉了 quota 的限制 
repquota -av 查閱系統內所有的具有 quota 的 filesystem 的限值狀態 
Quota 從開始準備 filesystem 的支援到整個設定結束的主要的步驟大概是： 
1、設定 partition 的 filesystem 支援 quota 參數： 
由於 quota 必須要讓 partition 上面的 filesystem 支援才行，一般來說， 支援度最好的是 ext2/ext3 ， 
其他的 filesystem 類型鳥哥我是沒有試過啦！ 啟動 filesystem 支援 quota 最簡單就是編輯 /etc/fstab ， 
使得準備要開放的 quota 磁碟可以支援 quota 囉； 
2、建立 quota 記錄檔： 
剛剛前面講過，整個 quota 進行磁碟限制值記錄的檔案是 aquota.user/aquota.group， 
要建立這兩個檔案就必須要先利用 quotacheck 掃瞄才行喔！ 
3、編輯 quota 限制值資料： 
再來就是使用 edquota 來編輯每個使用者或群組的可使用空間囉； 
4、重新掃瞄與啟動 quota ： 
設定好 quota 之後，建議可以再進行一次 quotacheck ，然後再以 quotaon 來啟動吧！ 
开机流程简介 
1、載入 BIOS 的硬體資訊，並取得第一個開機裝置的代號； 
2、讀取第一個開機裝置的 MBR 的 boot Loader (亦即是 lilo, grub, spfdisk 等等) 的開機資訊； 
3、載入 Kernel 作業系統核心資訊， Kernel 開始解壓縮，並且嘗試驅動所有硬體裝置； 
4、Kernel 執行 init 程式並取得 run-level 資訊； 
5、init 執行 /etc/rc.d/rc.sysinit 檔案； 
6、啟動核心的外掛模組 (/etc/modprobe.conf)； 
7、init 執行 run-level 的各個批次檔( Scripts )； 
8、init 執行 /etc/rc.d/rc.local 檔案； 
9、執行 /bin/login 程式，並等待使用者登入； 
10、登入之後開始以 Shell 控管主機。 
在/etc/rc.d/rc3.d內,以S开头的为开机启动,以K开头的为关闭,接着的数字代表执行顺序 
GRUB vga设定 
彩度\解析度 640×480 800×600 1024×768 1280×1024 bit 
256 769 771 773 775 8 bit 
32768 784 787 790 793 15 bit 
65536 785 788 791 794 16 bit 
16.8M 786 789 792 795 32 bit 
./configure 检查系统信息 ./configure -help | more 帮助信息 
make clean 清除之前留下的文件 
make 编译 
make install 安装 
rpm -q –>查询是否安装 rpm -ql –>查询该套件所有的目录 
rpm -qi –>查询套件的说明资料 rpm -qc[d] –>设定档与说明档 
rpm -ivh –>安装 rpm -V —>查看套件有否更动过 
rpm -e –>删除 rpm -Uvh —>升级安装 
-nodeps –>强行安装 -test –>测试安装 
```












