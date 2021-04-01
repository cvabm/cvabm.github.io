# Java
[[toc]]

## 泛型
**作用**  
1、类型的参数化，就是可以把类型像方法的参数那样传递。
2、泛型使编译器可以在编译期间对类型进行检查以提高类型安全，减少运行时由于对象类型不匹配引发的异常。  

**常见使用定义**
```
 E — Element，常用在java Collection里，如：List<E>,Iterator<E>,Set<E>
 K,V — Key，Value，代表Map的键值对
 N — Number，数字
 T — Type，类型，如String，Integer等等
```

**泛型类**
```
//定义  
class Point<T>{// 此处可以随便写标识符号   
    private T x ;        
    private T y ;        
    public void setX(T x){//作为参数  
        this.x = x ;  
    }  
    public void setY(T y){  
        this.y = y ;  
    }  
    public T getX(){//作为返回值  
        return this.x ;  
    }  
    public T getY(){  
        return this.y ;  
    }  
};  
//IntegerPoint使用  
Point<Integer> p = new Point<Integer>() ;   
p.setX(new Integer(100)) ;   
System.out.println(p.getX());    
  
//FloatPoint使用  
Point<Float> p = new Point<Float>() ;   
p.setX(new Float(100.12f)) ;   
System.out.println(p.getX());    
``` 
**多泛型变量定义**
在之前的T后增加U类型
```
class MorePoint<T,U> {  
    private T x;  
    private T y;         
  
    private U name;  
  
    public void setX(T x) {  
        this.x = x;  
    }  
    public T getX() {  
        return this.x;  
    }  
    public void setName(U name){  
        this.name = name;  
    }  
  
    public U getName() {  
        return this.name;  
    }  
}  
//使用  
MorePoint<Integer,String> morePoint = new MorePoint<Integer, String>();  
morePoint.setName("harvic");  
Log.d(TAG, "morPont.getName:" + morePoint.getName());  
```

**泛型变量的定义**






















<https://blog.csdn.net/qq_27093465/article/details/73229016>  
## How To Implement Inter-thread Communication In Java  
<https://www.tutorialdocs.com/article/java-inter-thread-communication.html>   
## 观察者模式  
<https://www.cnblogs.com/mengdd/archive/2013/02/07/2908929.html>  
## 习惯用法总结
<https://zhuanlan.zhihu.com/p/28147309>  
## 常见问题总结
<http://bbs.itheima.com/thread-130760-1-1.html>  
## 各类数据结构的特点  
<https://blog.csdn.net/xiaolang85/article/details/10214981>  
## 关于二叉树的几种遍历方法 
<https://blog.csdn.net/pony_maggie/article/details/38390513>  
## HashCode的作用原理和实例解析  
<https://blog.csdn.net/baidu_31657889/article/details/52298367>  
## 注解
```
1. 如果注解难于理解，你就把它类同于标签，标签为了解释事物，注解为了解释代码。
2. 注解的基本语法，创建如同接口，但是多了个 @ 符号。
3. 注解的元注解。
4. 注解的属性。
5. 注解主要给编译器及工具类型的软件用的。
6. 注解的提取需要借助于 Java 的反射技术，反射比较慢，所以注解使用时也需要谨慎计较时间成本
```
```
元标签有 @Retention、@Documented、@Target、@Inherited、@Repeatable 5 种。
@Retention
Retention 的英文意为保留期的意思。当 @Retention 应用到一个注解上的时候，它解释说明了这个注解的的存活时间。
它的取值如下：
- RetentionPolicy.SOURCE 注解只在源码阶段保留，在编译器进行编译时它将被丢弃忽视。
- RetentionPolicy.CLASS 注解只被保留到编译进行的时候，它并不会被加载到 JVM 中。
- RetentionPolicy.RUNTIME 注解可以保留到程序运行的时候，它会被加载进入到 JVM 中，所以在程序运行时可以获取到它们。

@Documented
顾名思义，这个元注解肯定是和文档有关。它的作用是能够将注解中的元素包含到 Javadoc 中去。

@Target
Target 是目标的意思，@Target 指定了注解运用的地方。
你可以这样理解，当一个注解被 @Target 注解时，这个注解就被限定了运用的场景。
ElementType.ANNOTATION_TYPE 可以给一个注解进行注解
ElementType.CONSTRUCTOR 可以给构造方法进行注解
ElementType.FIELD 可以给属性进行注解
ElementType.LOCAL_VARIABLE 可以给局部变量进行注解
ElementType.METHOD 可以给方法进行注解
ElementType.PACKAGE 可以给一个包进行注解
ElementType.PARAMETER 可以给一个方法内的参数进行注解
ElementType.TYPE 可以给一个类型进行注解，比如类、接口、枚举

@Inherited
Inherited 是继承的意思，但是它并不是说注解本身可以继承，而是说如果一个超类被 @Inherited 注解过的注解进行注解的话，那么如果它的子类没有被任何注解应用的话，那么这个子类就继承了超类的注解。



@ param
可以归档方法或构造器的某个单一参数，或者归档类、接口以及泛型方法的类型参数。
每个段落的第一个词会被当作参数名，而余下的部分则会被当作是对它的描述:
　　@param max The maximum number of words to read.

@ see
可以创建链接到其他javadoc文档的交叉引用。
```
### Java 预置的注解
```
@Deprecated
这个元素是用来标记过时的元素
@Override
这个大家应该很熟悉了，提示子类要复写父类中被 @Override 修饰的方法
@SuppressWarnings
阻止警告的意思。之前说过调用被 @Deprecated 注解的方法后，编译器会警告提醒，而有时候开发者会忽略这种警告，他们可以在调用的地方通过 @SuppressWarnings 达到目的。
@SafeVarargs
参数安全类型注解。它的目的是提醒开发者不要用参数做一些不安全的操作,它的存在会阻止编译器产生 unchecked 这样的警告。它是在 Java 1.7 的版本中加入的
@FunctionalInterface
函数式接口注解，这个是 Java 1.8 版本引入的新特性。函数式编程很火，所以 Java 8 也及时添加了这个特性。
函数式接口 (Functional Interface) 就是一个具有一个方法的普通接口。
```
## 通过注解实现setContentView、findViewById、setOnClickListener
```
效果
@ContentView(id = R.layout.activity_main)
public class MainActivity extends AppCompatActivity implements View.OnClickListener{
@ViewInject(id = R.id.button1, clickable = true)
private Button button1;
@ViewInject(id = R.id.button2)
private Button button2;
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(savedInstanceState);
AnnotateUtils.inJectContentView(this);
AnnotateUtils.inJectView(this);
}
@Override
public void onClick(View v) {
}
}

```
```
逻辑实现 
1) 编写两个类Override的Annotation:ContentView、ViewInject
2) 编写一个AnnoteUtils类用来检测添加了注解的类、变量、方法，并且根据值执行对应的操作。
```
```
代码实现
ContentView.java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ContentView {
int id();//layout资源值
}

```
ElementType.TYPE表示着这个注解作用于类；RetentionPolicy.RUNTIME表示这个注解在运行时可以通过反射获取到
```
ViewInject.java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ViewInject {
int id();//控件id
boolean clickable() default false;
}

```
ElementType.TYPE表示着这个注解作用于字段；

```
AnnotateUtils.java

public class AnnotateUtils {
public static void injectViews(Object object, View sourceView){
Field[] fields = object.getClass().getDeclaredFields();
for (Field field : fields){
ViewInject viewInject = field.getAnnotation(ViewInject.class);
if(viewInject != null){
int viewId = viewInject.id();
boolean clickable = viewInject.clickable();
if(viewId != -1){
try {
field.setAccessible(true);
field.set(object, sourceView.findViewById(viewId));
if(clickable == true){
sourceView.findViewById(viewId).setOnClickListener((View.OnClickListener) (object));
}
} catch (Exception e) {
e.printStackTrace();
}
}
}
}
}

public static void inJectContentView(Activity activity){
Class<? extends Activity> activityClass = activity.getClass();
ContentView contentView = activityClass.getAnnotation(ContentView.class);
if(contentView != null){
int layoutId = contentView.id();
try {
Method method = activityClass.getMethod("setContentView", int.class);
method.invoke(activity, layoutId);
} catch (Exception e) {
e.printStackTrace();
}
}
}
}
```
原理就是在AnnotateUtils通过传入的Object对象获得在类中注解了的字段，方法以及类本身。被执行对应的操作。具体原理在下一小节详细讲述。
JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。  
用处：
1) 在运行时判断任意一个对象所属的类；
2) 在运行时构造任意一个类的对象；
3) 在运行时判断任意一个类所具有的成员变量和方法；
4) 在运行时调用任意一个对象的方法；
5) 生成动态代理。
```
Field[] fields = object.getClass().getDeclaredFields();
```

这句代码的意思就是getClass获得类，然后getDeclaredFields获得类中的所有属性。
类似的方法有 ：
getName()：获得类的完整名字。
getFields()：获得类的public类型的属性。
getDeclaredFields()：获得类的所有属性。
getMethods()：获得类的public类型的方法。
getDeclaredMethods()：获得类的所有方法。
getMethod(String name, Class[] parameterTypes)：获得类的特定方法，name参数指定方法的名字，parameterTypes参数指定方法的参数类型。
getConstructors()：获得类的public类型的构造方法。
getConstructor(Class[] parameterTypes)：获得类的特定构造方法，parameterTypes参数指定构造方法的参数类型。
newInstance()：通过类的不带参数的构造方法创建这个类的一个对象。

```
Method method = activityClass.getMethod("setContentView", int.class);
method.invoke(activity, layoutId);
```
getMethod中的第一个参数是methodname，第二个参数是参数类型集合，通过这两个参数得到要执行的Method。  
method.invoke中的第一个参数是执行这个方法的对象，第二个参数是方法参数。执行该Method.invoke方法的参数是执行这个方法的对象owner，和参数数组args，可以这么理解：owner对象中带有参数args的method方法。返回值是Object，也既是该方法的返回值。   
```
再次基础上还有
public Object invokeMethod(Object owner, String methodName, Object[] args) throws Exception {
Class ownerClass = owner.getClass();
Class[] argsClass = new Class[args.length];
for (int i = 0, j = args.length; i < j; i++) {
argsClass[i] = args[i].getClass();
}
Method method = ownerClass.getMethod(methodName,argsClass);
return method.invoke(owner, args);
}

public Object invokeStaticMethod(String className, String methodName,
Object[] args) throws Exception {
Class ownerClass = Class.forName(className);
Class[] argsClass = new Class[args.length];
for (int i = 0, j = args.length; i < j; i++) {
argsClass[i] = args[i].getClass();
}
Method method = ownerClass.getMethod(methodName,argsClass);
return method.invoke(null, args);
}
```
## final关键字
>- 对于一个 final 变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。    
>- 当用 final 修饰一个类时，表明这个类不能被继承。final 类中的所有成员方法都会被隐式地指定为 final 方法。  
>- 使用 final 方法的原因有两个。第一个原因是把方法锁定，以防任何继承类修改它的含义；  
第二个原因是效率。在早期的 Java 实现版本中，会将 final 方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升（现在的 Java 版本已经不需要使用 final 方法进行这些优化了）。  
类中所有的 private 方法都隐式地指定为 final。

## static关键字
static 关键字主要有以下四种使用场景：  

>- **修饰成员变量和成员方法**: 被 static 修饰的成员属于类，不属于单个这个类的某个对象，被类中所有对象共享，可以并且建议通过类名调用。被static 声明的成员变量属于静态成员变量，静态变量 存放在 Java 内存区域的方法区。调用格式：类名.静态变量名 类名.静态方法名()    
>- **静态代码块**: 静态代码块定义在类中方法外, 静态代码块在非静态代码块之前执行(静态代码块—>非静态代码块—>构造方法)。 该类不管创建多少对象，静态代码块只执行一次.
>- **静态内部类（static修饰类的话只能修饰内部类）：** 静态内部类与非静态内部类之间存在一个最大的区别: 非静态内部类在编译完成之后会隐含地保存着一个引用，该引用是指向创建它的外围类，但是静态内部类却没有。没有这个引用就意味着：1. 它的创建是不需要依赖外围类的创建。2. 它不能使用任何外围类的非static成员变量和方法。  
>- **静态导包**(用来导入类中的静态资源，1.5之后的新特性): 格式为：import static 这两个关键字连用可以指定导入某个类中的指定静态资源，并且不需要使用类名调用类中静态成员，可以直接使用类中静态成员变量和成员方法。

## volatile关键字解析
volatile关键字的两层语义  
　　一旦一个共享变量（类的成员变量、类的静态成员变量）被volatile修饰之后，那么就具备了两层语义：  
　　1）保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。  
　　2）禁止进行指令重排序。  
　　先看一段代码，假如线程1先执行，线程2后执行：  
```
//线程1  
boolean stop = false;  
while(!stop){  
    doSomething();  
}  
//线程2  
stop = true;  
``` 
可能会导致死循环。  
但是用volatile修饰之后就变得不一样了：  
　　第一：使用volatile关键字会强制将修改的值立即写入主存；  
　　第二：使用volatile关键字的话，当线程2进行修改时，会导致线程1的工作内存中缓存变量stop的缓存行无效（反映到硬件层的话，就是CPU的L1或者L2缓存中对应的缓存行无效）；  
　　第三：由于线程1的工作内存中缓存变量stop的缓存行无效，所以线程1再次读取变量stop的值时会去主存读取。  

能保证操作的可见性，不能保证原子性，能保证有序性  

.使用volatile关键字的场景  
　　synchronized关键字是防止多个线程同时执行一段代码，那么就会很影响程序执行效率，而volatile关键字在某些情况下性能要优于synchronized，但是要注意volatile关键字是无法替代synchronized关键字的，因为volatile关键字无法保证操作的原子性。通常来说，使用volatile必须具备以下2个条件：  
　　1）对变量的写操作不依赖于当前值  
　　2）该变量没有包含在具有其他变量的不变式中  
　　实际上，这些条件表明，可以被写入 volatile 变量的这些有效值独立于任何程序的状态，包括变量的当前状态。  
　　事实上，我的理解就是上面的2个条件需要保证操作是原子性操作，才能保证使用volatile关键字的程序在并发时能够正确执行。  
　　下面列举几个Java中使用volatile的几个场景。  
```

volatile boolean flag = false;
while(!flag){
    doSomething();
}
public void setFlag() {
    flag = true;
}
```
```
class Singleton{
    private volatile static Singleton instance = null;
     
    private Singleton() {
         
    }
     
    public static Singleton getInstance() {
        if(instance==null) {
            synchronized (Singleton.class) {
                if(instance==null)
                    instance = new Singleton();
            }
        }
        return instance;
    }
}
```
## jvm虚拟机解析
<https://www.cnblogs.com/wtzbk/p/7985156.html>  
<https://blog.csdn.net/ns_code/article/details/17565503>  


## 万物基于object
类默认继承于object，所以看不到基本类File的继承关系  
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/45645654756.png)
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/56457567567.png)
![](https://raw.githubusercontent.com/cvabm/FigureBed/master/img/34645756.png)

## long除以long舍掉小数的问题
```
long a = 123;
long b = 12345;
System.out.println( a *1.0f/ b );
解决方法：把其中一个数转为float即可
```