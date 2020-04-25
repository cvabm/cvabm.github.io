# c++

## 一些教程 

<http://m.biancheng.net/cplus/>  

## C语言参数通用缩写表
<https://blog.csdn.net/zer1123/article/details/54881910> 

makefile

## makefile中一条语句这样： .c.o： gcc -c -o $*.o $<  
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