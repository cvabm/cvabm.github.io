## 一些教程

<http://m.biancheng.net/cplus/>  ## 一些教程
<https://seisman.github.io/how-to-write-makefile/index.html>
<https://seisman.github.io/how-to-write-makefile/index.html>

## C 语言参数通用缩写表

<https://blog.csdn.net/zer1123/article/details/54881910>

makefile

## makefile 中一条语句这样： .c.o： gcc -c -o $\*.o $<

```
.c.o:
这句话的意思就是 %.o : %.c
也就是说，所有的.o文件，依赖于对应的.c文件
比如有三个a.c b.c c.c
那么就会有 a.o b.o c.o
a.o : a.c
b.o : b.c
c.o : c.c
这是makefile依赖的一种简写方法。makefile的依赖关系有很多种写法。这是其中一种。
```
## 十进制-二进制
```
要把一个十进制数转换为二进制数，可以使用以下步骤：
将十进制数除以 2，得到商和余数。
把余数记录下来，然后把商作为新的十进制数重复第一步，直到商为 0。
把记录的余数倒序排列起来，就是这个十进制数对应的二进制数。
例如，将十进制数 19 转换为二进制数：
19 ÷ 2 = 9 余 19 ÷ 2 = 4 余 14 ÷ 2 = 2 余 02 ÷ 2 = 1 余 01 ÷ 2 = 0 余 1
所以 19 的二进制数为 10011。
```
## 常用工具
CodeBlocks - 下载带 mingw 的安装文件，100 多 M 大小  
vscode -  
clion -   
cfree -  
devc++ -  
## cmake
<https://aiden-dong.gitee.io/2019/07/20/CMake教程之CMake从入门到应用/>  
