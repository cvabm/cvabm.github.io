## 一些教程

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

## c 使用

- `gcc` linux 生成.out windows 为.exe
- `puts "hello"` 不带格式打印
- `printf("Name: %s\n", name);` %s 输入字符串、%d 整数、%f 浮点数、%c 字符
- `std::cout << "hello" <<std::endl;`
- `&str`str 内存地址
- `abort();` // 调用 abort()函数，人为引发 SIGABRT 信号
- `~ResourceHolder(){ 释放资源 }` 析构函数，只能有一个，释放资源的作用
- `__LINE__`
  - 当前行号,预定义宏，不用导入直接用
  - `__FILE__`文件名
  - `__DATE__`编译日期
  - `_WIN64` 表示当前为 64 位系统
- `virtual 返回类型 函数名(参数列表) = 0;` 纯虚函数,无实现，派生类必须实现该函数
- 操作符

  - `&x`表示取变量 x 的地址
  - `*`解引用操作符，获取指针指向的对象的值
  - `->`用于访问指针指向的对象的成员
  - `sizeof()` 获取对变量或类型的占字节数
  - `typedef int Age` 将 int 类型取个别名为 Age

- `函数模板`

```c
// 函数模板
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}
```

### 笔记

C:\Program Files\JetBrains\CLion 2022.2.5\bin\mingw\bin\g++.exe

- 找到 cmake.exe 设为环境变量
- cmake --build cmake-build-debug --target untitled -j 22
