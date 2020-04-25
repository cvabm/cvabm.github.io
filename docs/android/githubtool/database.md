# 数据库
[[toc]]
## room 

<https://www.jianshu.com/p/7354d5048597>

## litepal

具体使用介绍    
<https://www.jianshu.com/p/bc68e763c7a2>

demo 
```
public void add(View view) {
News news = new News();
news.setName("李磊");
news.setAge(18);
news.setOld(false);
news.setOrderId(111111111111111l);
if (news.save()) {
Toast.makeText(this, "存储成功", Toast.LENGTH_SHORT).show();
} else {
Toast.makeText(this, "存储失败", Toast.LENGTH_SHORT).show();
}


News news1 = new News();
news1.setName("韩梅梅");
news1.setAge(18);
news1.setOld(false);
news1.setOrderId(333333333);
if (news1.save()) {
Toast.makeText(this, "存储成功1", Toast.LENGTH_SHORT).show();
} else {
Toast.makeText(this, "存储失败1", Toast.LENGTH_SHORT).show();
}
}

public void delete(View view) {
int i = DataSupport.deleteAll(News.class, "name = ?", "李磊");
Log.d(TAG, "delete: " + i);
}

public void change(View view) {
ContentValues values = new ContentValues();
values.put("age", 28);
int i = DataSupport.updateAll(News.class, values, "name = ? and age > ?", "李磊", "0");

Log.d(TAG, "change: " + i);

}

public void query(View view) {
List<News> firstNews = DataSupport.where("name = ?", "李磊").find(News.class);
Log.d(TAG, "query: " + firstNews.size());
Log.d(TAG, firstNews.get(0).getName() + "年龄: " + firstNews.get(0).getAge());
}

```


