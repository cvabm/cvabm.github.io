[[toc]]

## RGB

> - 通过调节红、绿、蓝三个变量，来表示任何一种颜色  
>   每个变量数值范围：0 - 255，256×256×256=16777216，故通常简称为 1600 万色  
>   三色灰度值为 0 时最暗，255 最亮  
>   三色都为 0 时为黑色，都为 255 则白色
>
> - 网页颜色是以 16 进制代码表示，一般格式为#DEFABC （字母范围从 A-F,数字从 0-9 ）

## YUV

> YUV（也称 YCbCr）是电视系统所采用的一种颜色编码方法。  
> 其中 Y 表示明亮度，也就是灰阶值，它是基础信号；U 和 V 表示的则是色度，UV 的作用是描述影像色彩及饱和度，它们用于指定像素的颜色。U 和 V 不是基础信号，它俩都是被正交调制的.  
> YUV 与 RGB 视频信号相比，最大的优点在于只需占用极少的带宽，YUV 只需要占用 RGB 一半的带宽。

> - **YUV 采样格式**  
>   主要的采样格式有 YCbCr 4:2:0、YCbCr 4:2:2 和 YCbCr 4:4:4 ，其中 YCbCr 4:2:0 是最常用的采样格式。
>   - **YUV 4:4:4**  
>     YUV 三个信道的抽样率相同，因此在生成的图像里，每个象素的三个分量信息完整（每个分量通常 8 比特），经过 8 比特量化之后，未经压缩的每个像素占用 3 个字节。
>   - **YUV 4:2:2**  
>     每个色差信道的抽样率是亮度信道的一半，所以水平方向的色度抽样率只是 4:4:4 的一半。对非压缩的 8 比特量化的图像来说，每个由两个水平方向相邻的像素组成的宏像素需要占用 4 字节内存。
>   - **YUV4:2:0**  
>     4:2:0 并不意味着只有 Y、Cb 两个分量，而没有 Cr 分量。它实际指得是对每行扫描线来说，只有一种色度分量，它以 2:1 的抽样率存储。相邻的扫描行存储不同的色度分量，也就是说，如果一行是 4:2:0 的话，下一行就是 4:0:2，再下一行是 4:2:0…以此类推。对每个色度分量来说，水平方向和竖直方向的抽样率都是 2:1，所以可以说色度的抽样率是 4:1。对非压缩的 8 比特量化的视频来说，每个由 2x2 个 2 行 2 列相邻的像素组成的宏像素需要占用 6 字节内存。

> YUV 4:4:4 采样，每一个 Y 对应一组 UV 分量。  
> YUV 4:2:2 采样，每两个 Y 共用一组 UV 分量。  
> YUV 4:2:0 采样，每四个 Y 共用一组 UV 分量。

> - YUV 存储格式分为两大类：planar（平面）格式 和 packed（打包）格式  
>    - 比较常用的是 YUV 4:2:0 格式  
>    - YUV420P 又分为 I420 和 YV12 两种格式。  
>   I420 格式和 YV12 格式的不同处在 U 平面和 V 平面的位置不同。  
>   在 I420 格式中，U 平面紧跟在 Y 平面之后，然后才是 V 平面（即：YUV）；但 YV12 则是相反（即：YVU）。  
>   I420: YYYYYYYY UU VV =>YUV420P  
>   YV12: YYYYYYYY VV UU =>YUV420P  
>   YUV420SP 中的 Y 分量为平面格式，UV 分量为打包格式，即 U 和 V 分量交错排列

作者：李超
链接：http://www.imooc.com/article/25974
来源：慕课网
本文原创发布于慕课网 ，转载请注明出处，谢谢合作