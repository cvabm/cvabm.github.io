# kotlin

### kotlin 协程1

<https://juejin.cn/post/6908271959381901325>

- **作用域函数**

  - `let` 执行代码块、用来判空
  - `run` 跟 let 类似，区别是 run 直接调用，let 用 it 调用
  - `also` 跟 let 类似，区别是 also 返回对象本身
  - `with`直接访问对象的属性和函数
  - `apply` 跟 with 类似，区别是 apply 返回对象本身

- `by lazy`属性的初始化延迟到首次访问该属性时才执行
- `const`Java 中对应的是 public static final
- `MainActivity::class.java`相当于 java 中的 MainActivity.class
- `object`
  1、创建一个单例对象 2、创建匿名内部类或者对象表达式。
- `companion`伴生对象，相当于静态方法
- `companion object`相当于使用 static 关键字定义的静态成员变量或方法
- ` var myProperty: String by Delegates.notNull()`
  如果您尝试在赋值之前访问属性，或者将属性直接赋值为 null，都会导致 IllegalStateException 异常的抛出
- 类定义
  - `open`：用于定义一个可继承的类或成员方法
  - `final`：用于定义一个不可继承的类或成员方法。
  - `sealed`：用于定义一个密封类，它的子类必须在同一个文件中声明。
- `vararg numbers: Int` vararg 代表可变参数
- `infix fun Int.vs(a: Int)`中缀形式，可使用`5 vs 6`  
  不用中缀，则只能`5.vs(6)`
- `arrayOf`vs`arrayListOf` 前者不可变，后者可变
- `is` 相当于 instance of
- `as` 类型转换
- `when` 相当于 switch
- `mapOf["x"]?.let { "非空执行" } ?: "空执行"`
- `val oneMillion = 1_000_000`数字类型，下划线便于阅读
- `data class User` 数据类，自动导出 toString()、equals()
- `typealias`类型别名
- `operator` 重载运算符，可为自定义的类或数据类型重载
- `inline` 内联函数为内联，减少开销
- 集合转换
  - map 映射
  - zip 合并
  - associateWith 关联
  - flatten 打平
- 尾递归：对递归的优化，后面必须无代码

```
tailrec fun findFixPoint(x: Double = 1.0): Double
        = if (Math.abs(x - Math.cos(x)) < eps) x else findFixPoint(Math.cos(x))
```

- 函数式接口：只有一个抽象方法的接口

```
fun interface A {
    fun bar()
}

var myA = A { print("aaa") }
fun main() {
    myA.bar()
}
```
