# 网络相关

[[toc]]
## axios
<https://github.com/axios/axios>  

### 设置请求头内容
axios设置请求头中的Authorization 和 cookie 信息：
```
GET请求

axios.get(urlString, 
    {
        headers: {
            'Authorization': 'Bearer ' + token,
            "Cookie" : 'sessionId=' + sessionId + '; recId=' + recId,
            ...
        },
        params: {
            param1: string,
            param2: string
        },
        ...
    }
)
.then(res => fn)
.catch(e => fn)

POST请求

axios.post(urlString, 
    {
        data: data,
        ...
    },
    {
        headers: {
            'Authorization': 'Bearer ' + token,
            "Cookie" : 'sessionId=' + sessionId + '; recId=' + recId,
            ...
        }
    }
)
.then(res => fn)
.catch(e => fn)
————————————————
```

## fetch
```
> fetch: 发送请求,默认Get请求   
then : 传入一个回调函数，当上一次操作处理完,就会自动执行then的回调函数,并且自动把处理完的结果,作为参数传递给then的回调函数  
response.json(): 把请求到的数据转换为json  
catch : 在请求或者处理数据失败的时候,就会执行catch里的回调函数，捕获异常   

> 定义GET请求
getRequestData = (url) => {
    let args = {
        method:'GET',
    }

    fetch(url, args)
        .then((response)=>{
            return response.json();
        })
        .then((responseJson)=>{
            Alert.alert("提示", responseJson);
        })
        .catch((error)=>{
            Alert.alert("提示", error);
        })
};
>
```
[简单封装](https://www.jianshu.com/p/8951810b2e88)


<https://juejin.im/post/5b46bcdbe51d45195759febf>  



## digest认证

https://github.com/besing/digest-auth-request-rn
