# 网络相关
## axios
<https://github.com/axios/axios>  
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