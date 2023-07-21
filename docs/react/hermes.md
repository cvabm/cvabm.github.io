[[TOC]]
## hermes使用
```js
1.build.gradle
project.ext.react = [
        enableHermes: true,  // clean and rebuild if changing
]

2.proguard-rules.pro
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

3.hermes报错提示proxy找不到
Turns out the solution is
npm install hermes-engine@v0.5.2-rc1
Or, upgrade to RN 0.64.x and Hermès 0.7.
Hermès v0.5.2-rc1, which targets RN 0.63, enables Proxy by default. Same goes for 0.7 on 64.

4.是否启用
console.log("isHermes", !!global.HermesInternal)
```



