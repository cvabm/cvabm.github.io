# 数据存储
[[toc]]
## SharedPreferences
<https://juejin.im/post/5adc444df265da0b886d00bc>  
## 数据库sqlite

<https://github.com/LitePalFramework/LitePal>  
greendao  
<http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2017/0703/8144.html>  
```
注意!
text类型的一定要用单引号
```

简单使用  
<https://juejin.im/post/5a33e802f265da4325295cf7>  

日期时间  
<https://www.runoob.com/sqlite/sqlite-date-time.html>  
加密  
<https://www.jianshu.com/p/48ad2ff74fc5>  
查找如何判断字段是否包含某个字符串  
```
CREATE TABLE users(id int(6) NOT NULL AUTO_INCREMENT,PRIMARY KEY (id),user_name VARCHAR(20) NOT NULL,emails VARCHAR(50) NOT NULL);
truncate table users
INSERT INTO users(user_name, emails) VALUES('小张','a@email.com,b@email.com,c@email.com');
INSERT INTO users(user_name, emails) VALUES('小王','aa@email.com,bb@email.com,cc@email.com');

SELECT * FROM users WHERE emails like "%b@email.com%";
SELECT * FROM users WHERE find_in_set('aa@email.com', emails);
```
mysql中int、bigint、smallint 和 tinyint的区别     
<https://www.cnblogs.com/yiwd/p/5531167.html>  
### 如何将打开res aw目录中的数据库文件?  
解答：在Android中不能直接打开res aw目录中的数据库文件，而需要在程序第一次启动时将该文件复制到手机内存或SD卡的某个目录中，然后再打开该数据库文件。复制的基本方法是使用getResources().openRawResource 方法获得res aw目录中资源的 InputStream对象，然后将该InputStream对象中的数据写入其他的目录中相应文件中。在Android SDK中可以使用SQLiteDatabase.openOrCreateDatabase方法来打开任意目录中的SQLite数据库文件。   



