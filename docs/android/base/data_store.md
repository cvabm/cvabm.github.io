[[toc]]

## SharedPreferences

<https://juejin.im/post/5adc444df265da0b886d00bc>

## mmkv

```java
dependencies {
    implementation 'com.tencent:mmkv-static:1.1.1'
    // "1.1.1" 可以被任何可用的版本替代
}

MMKV.initialize(this);
MMKV kv = MMKV.defaultMMKV();
//所有类型的数据操作类似，👇以布尔值做统一示范
kv.encode("bool", true);
boolean bValue = kv.decodeBool("bool");
kv.removeValueForKey("bool");
kv.removeValuesForKeys(new String[]{"int", "long"});
boolean hasBool = kv.containsKey("bool");

//从sharedPreference迁移到mmkv
//SharedPreferences preferences = getSharedPreferences("TEST", MODE_PRIVATE);
//将👆SharedPreferences替换为👇MMKV
MMKV preferences = MMKV.mmkvWithID("TEST");
// 👇再将之前SharedPreferences的旧数据迁移至MMKV，并清空SharedPreferences
SharedPreferences old_man = getSharedPreferences("TEST", MODE_PRIVATE);
preferences.importFromSharedPreferences(old_man);
old_man.edit().clear().commit();
// MMKV实现了SharedPreferences和Editor接口，所以之前的数据存储不需要做任何变化👇
SharedPreferences.Editor editor = preferences.edit();
editor.putBoolean("bool", true);
editor.putInt("int", Integer.MIN_VALUE);
editor.putLong("long", Long.MAX_VALUE);
editor.putFloat("float", -3.14f);
editor.putString("string", "hello, imported");
// 无需调用 commit()，apply()方法存储数据，在put时，数据已经进行了存储，当然调用了也不妨事，MMKV中的这两个方法都是空实现
editor.commit();
```

## sqlite
在线查看和编辑  
<https://sqlime.org/>  
windows客户端  
<https://github.com/little-brother/sqlite-gui>  

```
data/data/package_name/databases/ 保存路径
adb shell 进入即可查看
```

### 简单使用

<https://juejin.im/post/5a33e802f265da4325295cf7>  
日期时间
包含毫秒 sss：DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))  
不包含毫秒：'create_time TimeStamp DEFAULT(datetime(\'now\', \'localtime\'))

### 日期时间

<https://www.runoob.com/sqlite/sqlite-date-time.html>

### 加密

<https://www.jianshu.com/p/48ad2ff74fc5>  
查找如何判断字段是否包含某个字符串

## Android数据库
room、realm、litepal、greendao
## litepal

[litepal](https://github.com/LitePalFramework/LitePal)

## greendao

[greendao 使用](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2017/0703/8144.html)

```java
CREATE TABLE users(id int(6) NOT NULL AUTO_INCREMENT,PRIMARY KEY (id),user_name VARCHAR(20) NOT NULL,emails VARCHAR(50) NOT NULL);
truncate table users
INSERT INTO users(user_name, emails) VALUES('小张','a@email.com,b@email.com,c@email.com');
INSERT INTO users(user_name, emails) VALUES('小王','aa@email.com,bb@email.com,cc@email.com');

SELECT * FROM users WHERE emails like "%b@email.com%";
SELECT * FROM users WHERE find_in_set('aa@email.com', emails);
```

## 不同存储之间的区别

[![6kKrCj.jpg](https://s3.ax1x.com/2021/03/02/6kKrCj.jpg)](https://imgtu.com/i/6kKrCj)

## 工具

[db brower for sqlte](http://www.sqlitebrowser.org)

## 其他

mysql 中 int、bigint、smallint 和 tinyint 的区别  
<https://www.cnblogs.com/yiwd/p/5531167.html>

如何将打开 res aw 目录中的数据库文件?
解答：在 Android 中不能直接打开 res aw 目录中的数据库文件，而需要在程序第一次启动时将该文件复制到手机内存或 SD 卡的某个目录中，然后再打开该数据库文件。复制的基本方法是使用 getResources().openRawResource 方法获得 res aw 目录中资源的 InputStream 对象，然后将该 InputStream 对象中的数据写入其他的目录中相应文件中。在 Android SDK 中可以使用 SQLiteDatabase.openOrCreateDatabase 方法来打开任意目录中的 SQLite 数据库文件。
