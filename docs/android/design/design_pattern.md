[[toc]]

## observer 观察者模式

<https://www.cnblogs.com/mengdd/archive/2013/02/07/2908929.html>

## 单例模式

1)单例设计模式：
① 概念：
保证一个类在内存中只有唯一一个对象。
② 实现单例设计模式的步骤：
a、将构造函数私有化。构造函数私有化可避免其他程序创建该类对象
b、在本类中创建一个私有的该类对象
c、对外提供一个公共访问方式，为了方便其他程序访问到该类对象
③ 单例设计模式的两种方式：
a、饿汉式：
类一加载就创建对象

```java
class Student {
    private Student() {}
    private static final Student s = new Student();
    public static Student getInstance() {
        return s;
    }
}
```

b、饱汉式：
使用时才创建该对象

```java
class Student {
    private Student() {}
    private static final Student s = null;
    public static Student getInstance() {
        if (s == null) {
            //线程1就进来了，线程2就进来了。
            s = new Student();
        }
        return s;
    }
}
```
```java
线程安全 - 
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {
        // 私有的构造函数，防止外部实例化
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                // 使用双重检查锁定确保线程安全
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    // 其他类成员和方法...
}

```

c、饿汉式和饱汉式的区别： \***\*饿汉式是类一加载进内存就创建好了对象；而懒汉式则是类加载进内存的时候，对象还没有存在，要使用该对象的时候再 new 出来
\*\***懒汉式是延迟加载，如果多个线程同时操作懒汉式时就有可能出现线程安全问题
为解决饱汉式的线程安全问题，解决线程安全问题可以加同步来解决。
但是加了同步之后，每一次都要比较锁，效率就变慢了，可以通过双重判断来提高程序效率。
注：开发常用饿汉式，因为饿汉式简单安全。懒汉式多线程的时候容易发生问题
④ 单例设计模式的应用：
当需要保证某个类在内存中有且仅有一个实例对象时，就用单例设计模式。比如 java 的 Runtime 类、Class 类都是采用的单例设计模式

## 工厂模式

```java
Integer n = Integer.valueOf(100);
List.of()
上述都是使用了静态工厂方式

public final class Integer {
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
    ...
}

```

## 适配器模式

```java
Callable<Long> callable = new Task(123450000L);
Thread thread = new Thread(new RunnableAdapter(callable));
thread.start();

RunnableAdapter()相当于一个适配器
这个RunnableAdapter类就是Adapter，它接收一个Callable，输出一个Runnable

public class RunnableAdapter implements Runnable {
    // 引用待转换接口:
    private Callable<?> callable;

    public RunnableAdapter(Callable<?> callable) {
        this.callable = callable;
    }

    // 实现指定接口:
    public void run() {
        // 将指定接口调用委托给转换接口调用:
        try {
            callable.call();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

```

## 抽象工厂模式

<https://www.runoob.com/design-pattern/abstract-factory-pattern.html>

## 装饰模式

抽象装饰类的作用
<https://blog.csdn.net/gaopu12345/article/details/79534846>

## 代理模式

```java
在直接访问对象时带来的问题，比如说：要访问的对象在远程的机器上。在面向对象系统中，
有些对象由于某些原因（比如对象创建开销很大，或者某些操作需要安全控制，或者需要进程外的访问），
直接访问会给使用者或者系统结构带来很多麻烦，我们可以在访问此对象时加上一个对此对象的访问层。

public class RealImage implements Image {

   private String fileName;

   public RealImage(String fileName){
      this.fileName = fileName;
      loadFromDisk(fileName);
   }

   @Override
   public void display() {
      System.out.println("Displaying " + fileName);
   }

   private void loadFromDisk(String fileName){
      System.out.println("Loading " + fileName);
   }
}

public class ProxyImage implements Image{

   private RealImage realImage;
   private String fileName;

   public ProxyImage(String fileName){
      this.fileName = fileName;
   }

   @Override
   public void display() {
      if(realImage == null){
         realImage = new RealImage(fileName);
      }
      realImage.display();
   }
}

public class ProxyPatternDemo {

   public static void main(String[] args) {
      Image image = new ProxyImage("test_10mb.jpg");

      // 图像将从磁盘加载
      image.display();
      System.out.println("");
      // 图像不需要从磁盘加载
      image.display();
   }
}

执行程序，输出结果：

Loading test_10mb.jpg
Displaying test_10mb.jpg

Displaying test_10mb.jpg

```
