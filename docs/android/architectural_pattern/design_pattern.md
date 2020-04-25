# 设计模式
[[toc]]
## 观察者模式observer
<https://www.cnblogs.com/mengdd/archive/2013/02/07/2908929.html>  
## 单例模式
1)单例设计模式：
①概念：
保证一个类在内存中只有唯一一个对象。
②实现单例设计模式的步骤：
a、将构造函数私有化。构造函数私有化可避免其他程序创建该类对象
b、在本类中创建一个私有的该类对象
c、对外提供一个公共访问方式，为了方便其他程序访问到该类对象
③单例设计模式的两种方式：
a、饿汉式：
类一加载就创建对象

```
class Student
{
private Student(){}
private static final Student s = new Student();
public static Student getInstance()
{
return s;
}
}
```
b、饱汉式：
使用时才创建该对象

```
class Student
{
private Student(){}
private static final Student s = null;
public static Student getInstance()
{
if(s==null)
{
//线程1就进来了，线程2就进来了。
s = new Student();
}
return s;
}
}
```
c、饿汉式和饱汉式的区别：
****饿汉式是类一加载进内存就创建好了对象；而懒汉式则是类加载进内存的时候，对象还没有存在，要使用该对象的时候再new出来
****懒汉式是延迟加载，如果多个线程同时操作懒汉式时就有可能出现线程安全问题
为解决饱汉式的线程安全问题，解决线程安全问题可以加同步来解决。
但是加了同步之后，每一次都要比较锁，效率就变慢了，可以通过双重判断来提高程序效率。
注：开发常用饿汉式，因为饿汉式简单安全。懒汉式多线程的时候容易发生问题
④单例设计模式的应用：
当需要保证某个类在内存中有且仅有一个实例对象时，就用单例设计模式。比如java的Runtime类、Class类都是采用的单例设计模式
## 工厂模式
## 抽象工厂模式
## 装饰模式
## 代理模式

