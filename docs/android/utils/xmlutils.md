# xml/json解析
[[toc]]

## pull解析xml  
<https://www.cnblogs.com/zhangmiao14/p/6184201.html>

```
package com.soft.tm.ui.activity;

import android.os.Environment;
import android.util.Log;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class Utils {
    public static void get() {
        try {
            File fXmlFile = new File(Environment.getExternalStorageDirectory().getPath()+"/hello.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(fXmlFile);
            doc.getDocumentElement().normalize();
            System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
            NodeList nList = doc.getElementsByTagName("meta-data");
            System.out.println("----------------------------");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                //System.out.println("\nCurrent Element :" + nNode.getNodeName());
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    Log.d("ljg", "get: "+eElement.getAttribute("android:name"));
                    Log.d("ljg", "get: "+eElement.getAttribute("android:value"));
                }
            }
        } catch (Exception e) {
        }
    }
}
```

## gson 
https://github.com/google/gson  

```

public static final String JSON_DATA = "...";Foo foo = new Gson().fromJson(JSON_DATA, Foo.class);


String JSON_DATA = "...";
GsonBuilder gsonBuilder = new GsonBuilder();gsonBuilder.setDateFormat("yyyy-MM-dd HH:mm:ss");
Gson gson = gsonBuilder.create();
Foo foo = gson.fromJson(JSON_DATA, Foo.class);


1、解析成数组
public static final String JSON_DATA = "...";
Foo[] foos = new Gson().fromJson(JSON_DATA, Foo[].class);
// 这时候想转成List的话调用如下方法
// List<Foo> foosList = Arrays.asList(foos);

2、解析成List
public static final String JSON_DATA = "...";
Type listType = new TypeToken<ArrayList<Foo>>(){}.getType();
ArrayList<Foo> foos = new Gson().fromJson(JSON_DATA, listType);
```

## 生成json工具
<https://www.json-generator.com/>  

## fastjson
https://github.com/alibaba/fastjson
```

String text = JSON.toJSONString(obj); //序列化
VO vo = JSON.parseObject("{...}", VO.class); //反序列化

解析：
主要代码：
    public List<TopTripType> parseResponseData(String responseStr) {
        List<TopTripType> result;
        try {
            JSONObject object = JSON.parseObject(responseStr);
            JSONObject data = (JSONObject) object.get("Data");
            JSONArray jsonArray = data.getJSONArray("ThemeList");
            result = JSON.parseArray(jsonArray.toJSONString(), TopTripType.class);
 
        } catch (Exception e) {
            result = new ArrayList<>();
            LogUtil.e(TAG, "parseResponseData()中解析json出现异常");
        }
        return result;
 
    }

```
## jsonObject
```
jsonOject.getnt("id");
jsonObject.optInt("id");  //推荐使用这种，不会报空指针

```
