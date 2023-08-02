## 要求规范

```
1、首页必须弹出用户协议和隐私政策让用户同意
2、给测试账号和密码
3、icp备案处填写备案号，下方截图上传备案信息
https://beian.miit.gov.cn/#/Integrated/index可查询(文字必须完整)
4、软著需选择纸质版选项上传
5、隐私政策和用户协议必须填写完整的公司名称，一字不差
6、应用首次启动时，不得一次性向用户申请后续服务可能涉及的所有权限
7、bugly低版本获取androidId，侵犯隐私


```

<https://dev.mi.com/distribute/doc/details?pId=1322>  
<https://dev.mi.com/docs/appsmarket/auditing&evaluation/auditing_criterion/>

## 小米手机去广告、删自带 app

禁用或冻结 app  
adb shell pm disable-user 应用包名

如果需要启用某个 app  
adb shell pm enable 应用包名
