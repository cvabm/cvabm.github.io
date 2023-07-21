[[toc]]

jsdoc -c jsdoc.json .\README.md


# 安装

## 准备

*   Node.js 8.15.0+

## 通过npm安装

*   全局安装：npm install -g jsdoc

    *   若出现权限问题，如 EACCES报错，最佳实践为用**node版本管理器**（nvm等）重装npm
*   本地安装：npm install --save-dev jsdoc
    *   命令行工具目录：./node\_modules/.bin/jsdoc

鉴于JSDoc的文档生成工具的本质，建议使用 --save-dev的本地安装模式

# 使用

## 书写JSDoc标签

jsdoc的使用方式非常简单，在编写代码时根据jsdoc的规则在块级注释中添加相应标签即可：

```javascript
/*** 功能：将时间戳格式化为指定格式的字符串* @param {Number} milliSec - 要转换的时间，可以为秒、毫秒、微秒、或Date类型* @param {String} [formatStr] - 目标格式字符串 可选 默认为：'yyyy-MM-dd hh:mm:ss'* @returns {String} - 根据目标时间格式，将时间数值（或Date）转换成的时间字符串*/function formatTime(milliSec, formatStr = DEFAULT_FORMAT_STR) {    // code}
```

其中 @param、@returns即为jsdoc的常用标签，具体标签及用法可通过传送门到[官网](https://jsdoc.app/)﻿或[中文文档](https://www.html.cn/doc/jsdoc/about-namepaths.html)﻿查看

## 生成JSDoc文档

代码编写完成后，即可通过[命令行](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020)生成jsdoc文档

### 基本用法

*   /path/to/jsdoc yourSourceCodeFile.js

```bash
// 全局安装jsdoc yourSourceCodeFile.js// 本地安装./node_modules/.bin/jsdoc yourSourceCodeFile.js
```

*   jsdoc提供了大量命令行选项满足使用需求，这里列出一些常用选项：

    *   **\-c 或 --configure**：指定JSDoc配置文件的路径。默认为安装JSDoc目录下的conf.json或conf.json.EXAMPLE
    *   **\-d 或 --destination**：指定输出生成文档的文件夹路径。JSDoc内置的Haruki模板，使用console 将数据转储到控制台。默认为 ./out
    *   **\-r 或 --recurse**：扫描源文件和导览时递归到子目录
    *   **\-R 或 --readme**：用来包含到生成文档的README.md文件。默认为在源路径中找到的第一个README.md文件
    *   **\-t 或 --template**：用于生成输出文档的模板的路径。默认为templates/default，JSDoc内置的默认模板
    *   **\-v 或 --version**：显示jsdoc版本号
*   更多选项可通过 -h 或 --help选项查看，或通过传送门到[官网](https://jsdoc.app/)或[中文文档](https://www.html.cn/doc/jsdoc/about-namepaths.html)查看
*   每次都输入一长串命令行太过繁琐，可在配置文件中的opts参数中指定这些选项

### 用conf.json配置JSDoc

```javascript
{    "tags": {        "allowUnknownTags": true    },    "source": {        "include": ["./src"],        "includePattern": ".+\\.js(doc|x)?$",        "excludePattern": "(^|\\/|\\\\)_",        "exclude": ["./src/index.js"]    },    "plugins": [],    "opts": {        "template": "./doc/templates/docdash",        "encoding": "utf8",        "destination": "./doc/doc-page/",        "recurse": true    },    "templates": {        "cleverLinks": false,        "monospaceLinks": false,        "default": {            "outputSourceFiles": true        }    }}
```

其中：

*   **tags**：控制那些标签允许被使用和解析
*   **source**：指定要用jsdoc生成文档的文件
    *   **include**：路径组成的数组，jsdoc将为它们生成文档
    *   **exclude**：路径组成的数组，jsdoc应忽略的路径
    *   **includePattern**：正则表达式字符串，只有文件名匹配的文件才会被jsdoc扫描。默认为 .+.js(doc)?$ 即 .js 或 .jsdoc 结尾的文件才会被扫描
    *   **excludePattern**：正则表达式字符串，文件名匹配的文件将被jsdoc忽略。默认为 (^|\\\\/|\\\\\\\\)\_ 即下划线开头的文件或下划线开头的目录下的所有文件
    *   结合起来，jsdoc的执行过程是：
        *   扫描include中的所有文件（若使用了 -r 命令将在子目录中递归搜索）
        *   在上一步搜索到的文件中，使用includePattern匹配文件名，只**保留**相匹配的文件
        *   在上一步匹配到的文件中，使用excludePattern匹配文件名，**剔除**相匹配的文件
        *   在上一部生于的文件中，如果文件路径在exclude中，该文件将被**剔除**
        *   最终剩下的文件将通过jsdoc进行解析
*   **opts：**配置命令行选项，与上面讲的选项相对应
*   **plugins**：要启用的插件，在数组中添加插件相对于JSDoc文件夹的路径即可
*   **templates**：配置jsdoc所生成的文档的模板

配置完成后使用 ./node\_modules/.bin/jsdoc -c path/to/yourconf.json 生成jsdoc文档即可

# 其他

## 改变模板

1.  如果你觉得默认模板不好看，可以通过GitHub下载喜欢的模板，例如：
    *   [jaguarjs-jsdoc](https://github.com/davidshimjs/jaguarjs-jsdoc)
    *   [DocStrap](https://github.com/docstrap/docstrap) ([example](https://docstrap.github.io/docstrap))
    *   [jsdoc3Template](https://github.com/DBCDK/jsdoc3Template) ([example](https://github.com/danyg/jsdoc3Template/wiki#wiki-screenshots))
    *   [minami](https://github.com/Nijikokun/minami)
    *   [docdash](https://github.com/clenemt/docdash) ([example](http://clenemt.github.io/docdash/))
    *   [tui-jsdoc-template](https://github.com/nhnent/tui.jsdoc-template) ([example](https://nhnent.github.io/tui.jsdoc-template/latest/))
    *   [better-docs](https://github.com/SoftwareBrothers/better-docs) ([example](https://softwarebrothers.github.io/admin-bro-dev/index.html))
2.  将下载好的模板文件夹放入 ./node\_modules/jsdoc/templates/ 中
3.  变更命令行选项中的 template/-t 选项为新的模板文件夹
4.  重新生成jsdoc文档即可

## 添加主页

主页中可以添加对项目的描述、使用说明、注意事项等等。稳妥起见，我们不采用jsdoc自动搜索的方式

1.  在合适的目录下新建md文件，如 ./doc/HOMEPAGE.md
2.  变更命令行选项中的 readme/-r 为新建的文件 ./doc/HOMEPAGE.md
3.  重新生成jsdoc文档即可

## 通过npm命令生成文档

如果你仍不满足使用conf.json配置后的命令行简洁程度，可以看过来

1.  打开项目的package.json
2.  在scripts中添加一行 "jsdoc": "node\_modules/.bin/jsdoc -r -c doc/conf.json -R doc/HOMEPAGE.md"
3.  执行 npm run jsdoc 即可

## gulp中的JSDoc插件：gulp-jsdoc3

*   安装：npm install --save-dev gulp-jsdoc3
*   使用：

```javascript
var jsdoc = require('gulp-jsdoc3'); gulp.task('doc', function (cb) {    // jsdoc的配置文件    var config = require('./doc/conf.json');    gulp.src(['README.md', './src/**/*.js'], {read: false}).pipe(jsdoc(config, cb));});
```

# 传送门

*   官网：[https://jsdoc.app](https://jsdoc.app/)/
*   GitHub：[https://github.com/jsdoc/jsdoc](https://github.com/jsdoc/jsdoc)
*   npm：[https://www.npmjs.com/package/jsdoc](https://www.npmjs.com/package/jsdoc)
*   中文文档：[https://www.html.cn/doc/jsdoc/about-namepaths.html](https://www.html.cn/doc/jsdoc/about-namepaths.html)