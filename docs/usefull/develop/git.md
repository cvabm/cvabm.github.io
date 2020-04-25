# git
简单易学<https://learngitbranching.js.org/>
[[toc]]
## 常见问题
>idea push reject：push mater to origin/master was rejected by remote   
 没权限   






## 常用git命令
```
git add . //
git commit -s
git commit --amend //在原记录上提交
git status  查看修改后的代码
git branch -a 查看远程分支
git branch   查看本地分支
git rm 删除
git rm -rf 强制删除
git diff 后跟文件路径 ---//查看修改的地方
git branch -D分支名  删除分支
gitk .  查看修改记录

repo upload上传
repo sync . 更新代码
repo start ljg .   /空格+点  在所在目录新建分支

adb reboot  ---重启

```

## git删除本地未提交的文件
```
git checkout .

git clean -xdf
```

## git设置和取消代理
设置git代理

1	git config --global http.proxy http://127.0.0.1:1080  
2	git config --global https.proxy https://127.0.0.1:1080  

去掉git代理

1	git config --global --unset http.proxy  
2	git config --global --unset https.proxy  

## git配置用户名邮箱
```
修改当前项目的用户名和邮箱地址：


$ git config  user.name  "username"
 
$ git config  user.email  "email"　
修改全局用户名和邮箱地址：

$ git config --global user.name "username"
 
$ git config --global user.email "email"
查看git用户名和邮箱地址命令：

$ git config user.name
 
$ git config user.email
```
## git配置秘钥
mac环境
```
首先检查电脑是否曾经生成过秘钥

cd ~/.ssh

若打开该文件夹为空，则表示没有生成过秘钥，进入第二步。（~表示根目录）

(2) 生成秘钥

ssh-keygen -t rsa -C "Title"（随便起一个title）

命令要求输入密码，这个时候不用输入，直接三个回车即可。
执行成功后，会在主目录.ssh路径下生成两个文件：id_rsa私钥文件；id_rsa.pub公钥文件
title可以自己取一个容易区分的名字，key为id_rsa.pub中的内容（全部复制，可用“cat id_rsa.pub”命令打开）

```



## git下载指定分支   
```
使用Git下载v.2.8.1分支代码，  
使用命令：git clone -b v2.8.1 https://git.oschina.net/oschina/android-app.git  

```
## git下载指定tag  
git clone --branch tag名称 地址   
--depth-1,下载最新一次commit，减小.git文件体积,如
git clone --branch tag名称 --depth=1 地址    


## .gitignore立即生效 
```
# 有时候需要突然修改 .gitignore 文件，随后要立即生效

git rm -r --cached . #清除缓存
git add . #重新trace file
git commit -m "update .gitignore" #提交和注释
git push origin master #可选，如果需要同步到remote上的话
```

## git重命名文件夹  
```
不用先在本地修改文件夹名称
文件夹名称: game   文件夹修改后名称: gamesdk
1.  git mv game gamesdk
2. git commit -m 'rename dir game to gamesdk'
3. 推送到dev 分支
git push origin dev 

``` 
git 在windows使用  
```
（提交文件到本地分支）
1：新建文件夹 ， cmd进入此目录， git clone ---- （登录gitlab控制台-- 查看http前缀的地址copy）



2：进入到down下来的 项目根目录中 -- git checkout -b  lijiangang   //新建分支  
3:  --新建文件android.txt  ，git add 此文件
4： git commit -m "备注"

（本机更新最新的远程变化）
5：git checkout master
6： git pull

（本地合并远程变化）
7： git checkout lijiangang
8：git rebase -i master

（推送本地修修改到远程）
9：git push origin lijiangang

（控制台新建合并请求）
10： 登录gitlab --新建合并请求（输入相关的注释）提交

11：更新本地仓库并删除本地分支
git checkout master
git pull
git branch -d lijiangang


note：git branch --list （查看分支）

```
## gitignore  
<https://www.gitignore.io/> 
## sourcetree
<https://www.sourcetreeapp.com/>
## 重命名项目
```
git remote -v
git remote rename origin old-origin1
git remote add origin git@123.56.157.156:lijg/XinjiangTongfuvisitor.git
git push -u origin --all
git push -u origin --tags
```



