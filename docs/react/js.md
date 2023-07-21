[[TOC]]

### js 教程

<https://www.w3school.com.cn/js/js_string_methods.asp>  
<https://zh.javascript.info/>  
常用方法<https://1loc.dev/>

### Android 和 H5 的交互

<https://www.jianshu.com/p/a25907862523>

### 前端调试工具 Eruda

[Eruda](https://github.com/liriliri/eruda/blob/master/doc/README_CN.md)

### js 数组删除 splice 和 delete

```
var test=[];
test.splice(2,1);


数组长度相应改变,但是原来的数组索引也相应改变
splice参数中第一个2,是删除的起始索引(从0算起),在此是数组第二个元素。第二个1,是删除元素的个数,在此只删除一个元素,即test[2];
此时遍历数组元素可以用普通遍历数组的方式,比如for,因为删除的元素在数组中并不保留。

delete test[2];

这种方式数组长度不变,此时test[2]变为undefined了,
好处是原来数组的索引也保持不变,此时要遍历数组元素可以才用.这种遍历方式跳过其中undefined的元素，所以非常实用。

```

### js 字符串替换和删除

没有 replaceAll 方法，可用如下代替：

```
正则表达式替换所有字符

var str = '2016-09-19';
var result = str.replace(/-/g,'');
console.log(result);
...
20160919

/-/g 中 /- 是将 - 转义，/g 表示替换所有字符串。
```

```
字符串分解连接替换法


var str = '2016-09-19';
var result = str.split('-').join('');
console.log(result);
...
20160919

```

### js 数组条件过滤 filter

```
list = list.filter(item = >{
	if (item.user_type == 'online' && item.username != this.state.userName) {
		return item
	}
})
```

### js 接收超过 16 位的 Long 类型会损失精度问题

160811004938657922，收到会变成  
160811004938657920

解决方法：后台传递类型改为 string

### groovy

快速入门<https://www.jianshu.com/p/e8dec95c4326>

### js 获取 url 参数

<https://www.jianshu.com/p/708c915fb905>
```js
随机数
const randomString = () => Math.random().toString(36).slice(2)
randomString() // gi1qtdego0b
```
