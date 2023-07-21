[[toc]]

## 面向对象

> - **面向过程**  
>   性能好， 因为类调用时需要实例化，开销比较大，比较消耗资源，所以当性能是最重要的考量因素的时候，比如单片机、嵌入式开发、Linux/Unix 等一般采用面向过程开发  
>   C++11 开始（2011 年的时候）,C++就引入了多线程库，在 windows、linux、macos 都可以使用 std::thread 和 std::async 来创建线程
> - **面向对象**  
>   面向对象易维护、易复用、易扩展。 因为面向对象有封装、继承、多态性的特性，所以可以设计出低耦合的系统，使系统更加灵活、更加易于维护
> - 性能区别原因  
>   java 最终的执行代码并不是可以直接被 CPU 执行的二进制机械码
>   面向过程语言大多都是直接编译成机械码在电脑上执行

> - **重载和重写**  
>   重载：多个方法有相同的名字、不同的参数
>   重写：类对父类的允许访问的方法的实现过程进行重新编写,发生在子类中，方法名、参数列表必须相同

> - **封装**  
>   把一个对象的属性私有化，同时提供一些可以被外界访问的属性的方法
> - **继承**  
>   使用已存在的类的定义作为基础建立新类  
>   新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类  
>   方便复用代码
> - **多态**  
>   程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编程时并不确定，而是在程序运行期间才确定  
>   两种形式可以实现多态：继承（多个子类对同一方法的重写）和接口（实现接口并覆盖接口中同一方法）

## JVM 底层

> Java 虚拟机（JVM）是运行 Java 字节码(.class 文件)的虚拟机。  
> JVM 有针对不同系统的特定实现（Windows，Linux，macOS），目的是使用相同的字节码，它们都会给出相同的结果

> - **Oracle JDK 和 OpenJDK 的对比**
>   1:openjdk 完全开源，oracle 不完全开源  
>   2：oracle jdk 更稳定  
>   3：oracle jdk 性能更好

```

Javac 编译Java文件为 class 文件

Java 命令的使用， 带package的Java类如何在命令行中启动

Java程序涉及到的各个路径(classpath， Java。library。path， Java运行的主目录等)


JVM内存模型和结构

GC原理，性能调优

调优：Thread Dump， 分析内存结构

class 二进制字节码结构， class loader 体系 ， class加载过程 ， 实例创建过程

方法执行过程

Java各个大版本更新提供的新特性(需要简单了解)
```

## 数据类型

### **基本数据类型**

| 数据类型 | 占用大小 | 包装类型  |
| -------- | -------- | --------- |
| byte     | 8bits    | Byte      |
| short    | 16bits   | Short     |
| int      | 32bits   | Integer   |
| long     | 64bits   | Long      |
| char     | 16bits   | Character |
| float    | 32bits   | Float     |
| double   | 64bits   | Double    |

### **String/StringBuffer/StringBuilder**

> - String
>   使用 final 修饰保存字符串，对象不可变，线程安全。
> - Stringbuffer
>   对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的
> - Strinbuilder
>   没有同步锁，非线程安全

### double 和 float 的区别

```
double精度高，有效数字16位，float精度7位。
但double消耗内存是float的两倍，double的运算速度比float慢得多，
java语言中数学函数zd名称double 和float不同，不要写错，能用单精度时不要用双精度（以省内存，加快运算速度）
```

**选择**  
少量数据，用 String，单线程操作大量数据用 Stringbuilder，多线程操作大量数据用 Stringbuffer

### **自动拆箱装箱**

装箱：基本类型 → 引用类型
拆箱：引用类型 → 基本类型

### **构造方法的作用**

```
实例化对象
如果没有构造方法，我们得要这样写：Person   ren1=new Person();
Ren1.name=(“张三”);   ren1.age=20; ren1.height=180;  多麻烦……
所以用构造方法，相当于建立了一个代码块，直接填充进去就可以……
```

### 浮点运算

**比较两个浮点数是否相等**

```
// 比较x和y是否相等，先计算其差的绝对值:
double r = Math.abs(x - y);
// 再判断绝对值是否足够小:
if (r < 0.00001) {
    // 可以认为相等
} else {
    // 不相等
}
```

```


基本类型： int， long， float， double， boolean ， 。。。

对应的对象类型： Integer 等类型到基本类型的转换， 装箱和拆箱

Object类型： equals， hashcode

String 类型的特点
```

**浮点数精准计算**

```

public class TestArithmetic {
    public static void main(String[] args) {
        System.out.println("0.09 + 0.01 = " + ArithmeticUtils.add(0.09, 0.01));
        System.out.println("9.99 - 0.12 = " + ArithmeticUtils.subtract(9.99, 0.12));
        System.out.println("17.173 * 100 = " + ArithmeticUtils.multiply(17.173, 100));
        System.out.println("16.3 / 1000 = " + ArithmeticUtils.divide(16.3, 1000));
    }
}

public class ArithmeticUtils {
    private static final int DEF_SCALE = 10;

    public static double add(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(Double.toString(d1));
        BigDecimal b2 = new BigDecimal(Double.toString(d2));
        return b1.add(b2).doubleValue();
    }

    public static double subtract(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(Double.toString(d1));
        BigDecimal b2 = new BigDecimal(Double.toString(d2));
        return b1.subtract(b2).doubleValue();
    }

    public static double multiply(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(Double.toString(d1));
        BigDecimal b2 = new BigDecimal(Double.toString(d2));
        return b1.multiply(b2).doubleValue();
    }

    public static double divide(double d1, double d2) {
        return divide(d1, d2, DEF_SCALE);
    }

    public static double divide(double d1, double d2, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("The scale must be a positive integer or zero");
        }
        BigDecimal b1 = new BigDecimal(Double.toString(d1));
        BigDecimal b2 = new BigDecimal(Double.toString(d2));
        return b1.divide(b2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
}




打印为
0.09 + 0.01 = 0.1
9.99 - 0.12 = 9.87
17.173 * 100 = 1717.3
16.3 / 1000 = 0.0163


```

## 集合

**collections 工具类**

- [面向对象](#面向对象)
- [JVM 底层](#jvm-底层)
- [数据类型](#数据类型)
	- [**基本数据类型**](#基本数据类型)
	- [**String/StringBuffer/StringBuilder**](#stringstringbufferstringbuilder)
	- [double 和 float 的区别](#double-和-float-的区别)
	- [**自动拆箱装箱**](#自动拆箱装箱)
	- [**构造方法的作用**](#构造方法的作用)
	- [浮点运算](#浮点运算)
- [集合](#集合)
- [Collections](#collections)
	- [排序操作](#排序操作)
	- [查找,替换操作](#查找替换操作)
	- [同步控制](#同步控制)
	- [Collections 还可以设置不可变集合，提供了如下三类方法：](#collections-还可以设置不可变集合提供了如下三类方法)
- [如何正确的将数组转换为 ArrayList?](#如何正确的将数组转换为-arraylist)
- [Arrays 类的常见操作](#arrays-类的常见操作)
	- [排序 : `sort()`](#排序--sort)
	- [查找 : `binarySearch()`](#查找--binarysearch)
	- [比较: `equals()`](#比较-equals)
	- [填充 : `fill()`](#填充--fill)
	- [转列表 `asList()`](#转列表-aslist)
	- [转字符串 `toString()`](#转字符串-tostring)
	- [复制 `copyOf()`](#复制-copyof)
- [exception 异常](#exception-异常)
- [IO 流](#io-流)
- [多线程并发](#多线程并发)
- [网络](#网络)
- [日期时间](#日期时间)
- [json/xml](#jsonxml)
	- [解析key值不固定的json](#解析key值不固定的json)
- [maven 使用](#maven-使用)
- [泛型](#泛型)
- [spring boot 标注](#spring-boot-标注)
- [JNI](#jni)

## Collections

Collections 工具类常用方法:

1. 排序
2. 查找,替换操作
3. 同步控制(不推荐，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合)

### 排序操作

```
void reverse(List list)//反转
void shuffle(List list)//随机排序
void sort(List list)//按自然排序的升序排序
void sort(List list, Comparator c)//定制排序，由Comparator控制排序逻辑
void swap(List list, int i , int j)//交换两个索引位置的元素
void rotate(List list, int distance)//旋转。当distance为正数时，将list后distance个元素整体移到前面。当distance为负数时，将 list的前distance个元素整体移到后面。
```

**示例代码:**

```
     ArrayList<Integer> arrayList = new ArrayList<Integer>();
		arrayList.add(-1);
		arrayList.add(3);
		arrayList.add(3);
		arrayList.add(-5);
		arrayList.add(7);
		arrayList.add(4);
		arrayList.add(-9);
		arrayList.add(-7);
		System.out.println("原始数组:");
		System.out.println(arrayList);
		// void reverse(List list)：反转
		Collections.reverse(arrayList);
		System.out.println("Collections.reverse(arrayList):");
		System.out.println(arrayList);


		Collections.rotate(arrayList, 4);
		System.out.println("Collections.rotate(arrayList, 4):");
		System.out.println(arrayList);

		// void sort(List list),按自然排序的升序排序
		Collections.sort(arrayList);
		System.out.println("Collections.sort(arrayList):");
		System.out.println(arrayList);

		// void shuffle(List list),随机排序
		Collections.shuffle(arrayList);
		System.out.println("Collections.shuffle(arrayList):");
		System.out.println(arrayList);

		// void swap(List list, int i , int j),交换两个索引位置的元素
		Collections.swap(arrayList, 2, 5);
		System.out.println("Collections.swap(arrayList, 2, 5):");
		System.out.println(arrayList);

		// 定制排序的用法
		Collections.sort(arrayList, new Comparator<Integer>() {

			@Override
			public int compare(Integer o1, Integer o2) {
				return o2.compareTo(o1);
			}
		});
		System.out.println("定制排序后：");
		System.out.println(arrayList);
```

### 查找,替换操作

```
int binarySearch(List list, Object key)//对List进行二分查找，返回索引，注意List必须是有序的
int max(Collection coll)//根据元素的自然顺序，返回最大的元素。 类比int min(Collection coll)
int max(Collection coll, Comparator c)//根据定制排序，返回最大元素，排序规则由Comparatator类控制。类比int min(Collection coll, Comparator c)
void fill(List list, Object obj)//用指定的元素代替指定list中的所有元素。
int frequency(Collection c, Object o)//统计元素出现次数
int indexOfSubList(List list, List target)//统计target在list中第一次出现的索引，找不到则返回-1，类比int lastIndexOfSubList(List source, list target).
boolean replaceAll(List list, Object oldVal, Object newVal), 用新元素替换旧元素
```

**示例代码：**

```
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		arrayList.add(-1);
		arrayList.add(3);
		arrayList.add(3);
		arrayList.add(-5);
		arrayList.add(7);
		arrayList.add(4);
		arrayList.add(-9);
		arrayList.add(-7);
		ArrayList<Integer> arrayList2 = new ArrayList<Integer>();
		arrayList2.add(-3);
		arrayList2.add(-5);
		arrayList2.add(7);
		System.out.println("原始数组:");
		System.out.println(arrayList);

		System.out.println("Collections.max(arrayList):");
		System.out.println(Collections.max(arrayList));

		System.out.println("Collections.min(arrayList):");
		System.out.println(Collections.min(arrayList));

		System.out.println("Collections.replaceAll(arrayList, 3, -3):");
		Collections.replaceAll(arrayList, 3, -3);
		System.out.println(arrayList);

		System.out.println("Collections.frequency(arrayList, -3):");
		System.out.println(Collections.frequency(arrayList, -3));

		System.out.println("Collections.indexOfSubList(arrayList, arrayList2):");
		System.out.println(Collections.indexOfSubList(arrayList, arrayList2));

		System.out.println("Collections.binarySearch(arrayList, 7):");
		// 对List进行二分查找，返回索引，List必须是有序的
		Collections.sort(arrayList);
		System.out.println(Collections.binarySearch(arrayList, 7));
```

### 同步控制

Collections 提供了多个`synchronizedXxx()`方法·，该方法可以将指定集合包装成线程同步的集合，从而解决多线程并发访问集合时的线程安全问题。

我们知道 HashSet，TreeSet，ArrayList,LinkedList,HashMap,TreeMap 都是线程不安全的。Collections 提供了多个静态方法可以把他们包装成线程同步的集合。

**最好不要用下面这些方法，效率非常低，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合。**

方法如下：

```
synchronizedCollection(Collection<T>  c) //返回指定 collection 支持的同步（线程安全的）collection。
synchronizedList(List<T> list)//返回指定列表支持的同步（线程安全的）List。
synchronizedMap(Map<K,V> m) //返回由指定映射支持的同步（线程安全的）Map。
synchronizedSet(Set<T> s) //返回指定 set 支持的同步（线程安全的）set。
```

### Collections 还可以设置不可变集合，提供了如下三类方法：

```
emptyXxx(): 返回一个空的、不可变的集合对象，此处的集合既可以是List，也可以是Set，还可以是Map。
singletonXxx(): 返回一个只包含指定对象（只有一个或一个元素）的不可变的集合对象，此处的集合可以是：List，Set，Map。
unmodifiableXxx(): 返回指定集合对象的不可变视图，此处的集合可以是：List，Set，Map。
上面三类方法的参数是原有的集合对象，返回值是该集合的”只读“版本。
```

**示例代码：**

```
        ArrayList<Integer> arrayList = new ArrayList<Integer>();
        arrayList.add(-1);
        arrayList.add(3);
        arrayList.add(3);
        arrayList.add(-5);
        arrayList.add(7);
        arrayList.add(4);
        arrayList.add(-9);
        arrayList.add(-7);
        HashSet<Integer> integers1 = new HashSet<>();
        integers1.add(1);
        integers1.add(3);
        integers1.add(2);
        Map scores = new HashMap();
        scores.put("语文" , 80);
        scores.put("Java" , 82);

        //Collections.emptyXXX();创建一个空的、不可改变的XXX对象
        List<Object> list = Collections.emptyList();
        System.out.println(list);//[]
        Set<Object> objects = Collections.emptySet();
        System.out.println(objects);//[]
        Map<Object, Object> objectObjectMap = Collections.emptyMap();
        System.out.println(objectObjectMap);//{}

        //Collections.singletonXXX();
        List<ArrayList<Integer>> arrayLists = Collections.singletonList(arrayList);
        System.out.println(arrayLists);//[[-1, 3, 3, -5, 7, 4, -9, -7]]
        //创建一个只有一个元素，且不可改变的Set对象
        Set<ArrayList<Integer>> singleton = Collections.singleton(arrayList);
        System.out.println(singleton);//[[-1, 3, 3, -5, 7, 4, -9, -7]]
        Map<String, String> nihao = Collections.singletonMap("1", "nihao");
        System.out.println(nihao);//{1=nihao}

        //unmodifiableXXX();创建普通XXX对象对应的不可变版本
        List<Integer> integers = Collections.unmodifiableList(arrayList);
        System.out.println(integers);//[-1, 3, 3, -5, 7, 4, -9, -7]
        Set<Integer> integers2 = Collections.unmodifiableSet(integers1);
        System.out.println(integers2);//[1, 2, 3]
        Map<Object, Object> objectObjectMap2 = Collections.unmodifiableMap(scores);
        System.out.println(objectObjectMap2);//{Java=82, 语文=80}

        //添加出现异常：java.lang.UnsupportedOperationException
//        list.add(1);
//        arrayLists.add(arrayList);
//        integers.add(1);
```

## 如何正确的将数组转换为 ArrayList?

```
List list = new ArrayList<>(Arrays.asList("a", "b", "c"))
```

## Arrays 类的常见操作

1. 排序 : `sort()`
2. 查找 : `binarySearch()`
3. 比较: `equals()`
4. 填充 : `fill()`
5. 转列表: `asList()`
6. 转字符串 : `toString()`
7. 复制: `copyOf()`

### 排序 : `sort()`

```
		// *************排序 sort****************
		int a[] = { 1, 3, 2, 7, 6, 5, 4, 9 };
		// sort(int[] a)方法按照数字顺序排列指定的数组。
		Arrays.sort(a);
		System.out.println("Arrays.sort(a):");
		for (int i : a) {
			System.out.print(i);
		}
		// 换行
		System.out.println();

		// sort(int[] a,int fromIndex,int toIndex)按升序排列数组的指定范围
		int b[] = { 1, 3, 2, 7, 6, 5, 4, 9 };
		Arrays.sort(b, 2, 6);
		System.out.println("Arrays.sort(b, 2, 6):");
		for (int i : b) {
			System.out.print(i);
		}
		// 换行
		System.out.println();

		int c[] = { 1, 3, 2, 7, 6, 5, 4, 9 };
		// parallelSort(int[] a) 按照数字顺序排列指定的数组(并行的)。同sort方法一样也有按范围的排序
		Arrays.parallelSort(c);
		System.out.println("Arrays.parallelSort(c)：");
		for (int i : c) {
			System.out.print(i);
		}
		// 换行
		System.out.println();

		// parallelSort给字符数组排序，sort也可以
		char d[] = { 'a', 'f', 'b', 'c', 'e', 'A', 'C', 'B' };
		Arrays.parallelSort(d);
		System.out.println("Arrays.parallelSort(d)：");
		for (char d2 : d) {
			System.out.print(d2);
		}
		// 换行
		System.out.println();

```

在做算法面试题的时候，我们还可能会经常遇到对字符串排序的情况,`Arrays.sort()` 对每个字符串的特定位置进行比较，然后按照升序排序。

```
String[] strs = { "abcdehg", "abcdefg", "abcdeag" };
Arrays.sort(strs);
System.out.println(Arrays.toString(strs));//[abcdeag, abcdefg, abcdehg]
```

### 查找 : `binarySearch()`

```
		// *************查找 binarySearch()****************
		char[] e = { 'a', 'f', 'b', 'c', 'e', 'A', 'C', 'B' };
		// 排序后再进行二分查找，否则找不到
		Arrays.sort(e);
		System.out.println("Arrays.sort(e)" + Arrays.toString(e));
		System.out.println("Arrays.binarySearch(e, 'c')：");
		int s = Arrays.binarySearch(e, 'c');
		System.out.println("字符c在数组的位置：" + s);
```

### 比较: `equals()`

```
		// *************比较 equals****************
		char[] e = { 'a', 'f', 'b', 'c', 'e', 'A', 'C', 'B' };
		char[] f = { 'a', 'f', 'b', 'c', 'e', 'A', 'C', 'B' };
		/*
		* 元素数量相同，并且相同位置的元素相同。 另外，如果两个数组引用都是null，则它们被认为是相等的 。
		*/
		// 输出true
		System.out.println("Arrays.equals(e, f):" + Arrays.equals(e, f));
```

### 填充 : `fill()`

```
		// *************填充fill(批量初始化)****************
		int[] g = { 1, 2, 3, 3, 3, 3, 6, 6, 6 };
		// 数组中所有元素重新分配值
		Arrays.fill(g, 3);
		System.out.println("Arrays.fill(g, 3)：");
		// 输出结果：333333333
		for (int i : g) {
			System.out.print(i);
		}
		// 换行
		System.out.println();

		int[] h = { 1, 2, 3, 3, 3, 3, 6, 6, 6, };
		// 数组中指定范围元素重新分配值
		Arrays.fill(h, 0, 2, 9);
		System.out.println("Arrays.fill(h, 0, 2, 9);：");
		// 输出结果：993333666
		for (int i : h) {
			System.out.print(i);
		}
```

### 转列表 `asList()`

```
		// *************转列表 asList()****************
		/*
		 * 返回由指定数组支持的固定大小的列表。
		 * （将返回的列表更改为“写入数组”。）该方法作为基于数组和基于集合的API之间的桥梁，与Collection.toArray()相结合 。
		 * 返回的列表是可序列化的，并实现RandomAccess 。
		 * 此方法还提供了一种方便的方式来创建一个初始化为包含几个元素的固定大小的列表如下：
		 */
		List<String> stooges = Arrays.asList("Larry", "Moe", "Curly");
		System.out.println(stooges);
```

### 转字符串 `toString()`

```
		// *************转字符串 toString()****************
		/*
		* 返回指定数组的内容的字符串表示形式。
		*/
		char[] k = { 'a', 'f', 'b', 'c', 'e', 'A', 'C', 'B' };
		System.out.println(Arrays.toString(k));// [a, f, b, c, e, A, C, B]
```

### 复制 `copyOf()`

```
		// *************复制 copy****************
		// copyOf 方法实现数组复制,h为数组，6为复制的长度
		int[] h = { 1, 2, 3, 3, 3, 3, 6, 6, 6, };
		int i[] = Arrays.copyOf(h, 6);
		System.out.println("Arrays.copyOf(h, 6);：");
		// 输出结果：123333
		for (int j : i) {
			System.out.print(j);
		}
		// 换行
		System.out.println();
		// copyOfRange将指定数组的指定范围复制到新数组中
		int j[] = Arrays.copyOfRange(h, 6, 11);
		System.out.println("Arrays.copyOfRange(h, 6, 11)：");
		// 输出结果66600(h数组只有9个元素这里是从索引6到索引11复制所以不足的就为0)
		for (int j2 : j) {
			System.out.print(j2);
		}
		// 换行
		System.out.println();
```

```
集合框架的体系： 基础Collection ，Map

具体集合实现的内容， List ，Set ，Map 具体的实现，内部结构， 特殊的方法， 适用场景等

集合相关的工具类 Collections 等的用法


```

## exception 异常

![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/20200317134417.png)

> - Error（错误）  
>   是程序无法处理的错误，运行时 JVM（Java 虚拟机）出现的问题
> - Exception（异常）  
>   是程序本身可以处理的异常。
> - Throwable 类  
>   public string getMessage():返回异常发生时的简要描述  
>   public string toString():返回异常发生时的详细信息  
>   public string getLocalizedMessage():返回异常对象的本地化信息。使用 Throwable 的子类覆盖这个方法，可以生成本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与 getMessage（）返回的结果相同  
>   public void printStackTrace():在控制台上打印 Throwable 对象封装的异常信息
> - 在以下 4 种特殊情况下，finally 块不会被执行：  
>   在 finally 语句块第一行发生了异常。 因为在其他行，finally 块还是会得到执行  
>   在前面的代码中用了 System.exit(int)已退出程序。 exit 是带参函数 ；若该语句在异常语句之后，finally 会执行  
>   程序所在的线程死亡。  
>   关闭 CPU。

```
Throwable

Exception

RuntimeException

Error

RuntimeException 和 一般 Exception 的区别， 具体处理方法等
```

## IO 流

> - Java 中 IO 流分为几种?  
>   按照流的流向分，可以分为输入流和输出流；  
>   按照操作单元划分，可以划分为字节流和字符流；  
>   按照流的角色划分为节点流和处理流。
>
> - **按操作方式分类结构图：**  
>   ![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/68747470733a2f2f6d792d626c6f672d746f2d7573652e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f323031392d362f494f2d25453625393325384425453425424425394325453625393625423925453525424325384625453525.png)
>
> - **按操作对象分类结构图：**
>
> ![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/68747470733a2f2f6d792d626c6f672d746f2d7573652e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f323031392d362f494f2d25453625393325384425453425424425394325453525414625423925453825423125413125453525.png)

## 多线程并发

> - 线程 6 种状态  
>   ![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/qqqqqqqqqqqqqqqqq3333.png)

## 网络

## 日期时间

## json/xml 
### 解析key值不固定的json
```java
	JsonObject data = new Gson().fromJson(body, JsonObject.class);
	Set<Map.Entry<String, JsonElement>> entries = data.entrySet();
	// 动态获取key值
	Iterator<Map.Entry<String, JsonElement>> iterator = entries.iterator();//使用迭代器
	String list = "";
	while (iterator.hasNext()) {
		Map.Entry<String, JsonElement> obj = iterator.next();//获取key
		JsonElement value = obj.getValue();
		StockBean bean = new Gson().fromJson(value, StockBean.class);
		Double price = bean.getPrice();
	}
```

## maven 使用

## 泛型

## spring boot 标注

## JNI
