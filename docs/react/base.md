[[toc]]

## rn 手动查看 bundle

手动生成 bundle  
`npx react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res --dev false –-sourcemap-output ./android/app/src/main/assets/index.android.bundle.map`  
新建 html，内容如下，chrome-F12 即可查看 bundle  
`<script src="index.android.bundle"></script>`  
各参数代表的意思

- –entry-file RN 入口文件的路径, 绝对路径或相对路径
- –platform \[string\] ios 或 andorid
- –dev \[boolean\] 如果为 false, 警告会不显示并且打出的包的大小会变小
- –prepack 当通过时, 打包输出将使用 Prepack 格式化
- –bridge-config \[string\] 使用 Prepack 的一个 json 格式的文件\_\_fbBatchedBridgeConfig 例如: ./bridgeconfig.json
- –bundle-output 打包后的文件输出目录
- –sourcemap-output \[string\] 生成 Source Map，但 0.14 之后不再自动生成 source map，需要手动指定这个参数
- –assets-dest \[string\] 打包时图片资源的存储路径
- –verbose 显示打包过程
- –reset-cache 移除缓存文件
- –config \[string\] 命令行的配置文件路径

## 快速创建一个最简单的 node 服务

1、生成 package.json 文件

```bash
npm init -y
npm install express
```

2、创建并编写 js 文件，例如：server.js

```
var express = require("express"); //导入express框架
var bodyParser = require("body-parser"); //http请求参数解析
var app = express(); //生成实例

//定义接口
app.get("/api/getList", function (request, response) {
  response.send("listData");
});

app.listen(80, function () {
  console.log("Node服务已启动");
});
```

3、在控制台执行命令，启动服务

```scss
node server.js
```

4、浏览器或 PostMan 访问地址，
<a href="http://localhost:3000/api/getList">http://localhost:3000/api/getList</a>

```
npm install ws

const express = require('express');
const app = express();
const WebSocket = require('ws');

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    console.log('Received message:', data.toString());
    socket.send(`You said: ${data}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

```
