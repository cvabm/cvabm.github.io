# 获取地理位置经纬度

## 基于 gps 和网络

<https://juejin.im/post/5c2dada96fb9a049f74650f8>

## Android 判断 GPS 是否开启和打开 GPS

https://www.jianshu.com/p/1f3cfa6f3965

## 根据经纬度取地址

<http://www.gpsspg.com/maps.htm>

## 坐标转换

<https://github.com/wandergis/coordtransform>

### gps 和网络定位自动切换

<https://www.twblogs.net/a/5efd8ee541b2036d50955d48>

#### gps底层
<https://blog.csdn.net/pashanhu6402/article/details/80366934>  

### 其他坐标转高德坐标

1、在线接口：
https://lbs.amap.com/api/webservice/guide/api/convert
2、离线方法:

```js
   let wgsToGcj = this.WgsToGcj(longitude, latitude);
            longitude = wgsToGcj.Lon;
            latitude = wgsToGcj.Lat;
            console.log("gps转换成高德坐标：" + longitude + " -- " + latitude)

    /*********WGS-84 to GCJ-02  *******/
    WgsToGcj(Longitude, Latitude) {
        var Dev = this.CalDev(Longitude, Latitude);
        var RetLat = Latitude - Dev.Lat;
        var RetLon = Longitude - Dev.Lon;
        Dev = this.CalDev(RetLon, RetLat);
        RetLat = Latitude + Dev.Lat;
        RetLon = Longitude + Dev.Lon;
        return {Lon: RetLon, Lat: RetLat};
    }

 /****** 计算纬度******/
    CalLat(X, Y) {
        var ResultLat = -100.0 + 2.0 * X + 3.0 * Y + 0.2 * Y * Y + 0.1 * X * Y + 0.2 * Math.sqrt(Math.abs(X));
        ResultLat += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLat += (20.0 * Math.sin(Y * Math.PI) + 40.0 * Math.sin(Y / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLat += (160.0 * Math.sin(Y / 12.0 * Math.PI) + 320 * Math.sin(Y * Math.PI / 30.0)) * 2.0 / 3.0;
        return ResultLat;
    }

    /******计算经度******/
    CalLon(X, Y) {
        var ResultLon = 300.0 + X + 2.0 * Y + 0.1 * X * X + 0.1 * X * Y + 0.1 * Math.sqrt(Math.abs(X));
        ResultLon += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLon += (20.0 * Math.sin(X * Math.PI) + 40.0 * Math.sin(X / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLon += (150.0 * Math.sin(X / 12.0 * Math.PI) + 300.0 * Math.sin(X / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ResultLon;
    }

    CalDev(WgLon, WgLat) {
        var ee = 0.00669342162296594323;
        var a = 6378245.0;
        var Lat = this.CalLat(WgLon - 105.0, WgLat - 35.0);
        var Lon = this.CalLon(WgLon - 105.0, WgLat - 35.0);
        var RadLat = WgLat / 180.0 * Math.PI;
        var Magic = Math.sin(RadLat);
        Magic = 1 - ee * Magic * Magic;
        var sqrtMagic = Math.sqrt(Magic);
        Lat = (Lat * 180.0) / ((a * (1 - ee)) / (Magic * sqrtMagic) * Math.PI);
        Lon = (Lon * 180.0) / (a / sqrtMagic * Math.cos(RadLat) * Math.PI);
        return {Lon: Lon, Lat: Lat};
    }


```

```js
地球坐标系——WGS84：常见于 GPS 设备，Google 地图等国际标准的坐标体系。
火星坐标系——GCJ-02：中国国内使用的被强制加密后的坐标体系，高德坐标就属于该种坐标体系。
百度坐标系——BD-09：百度地图所使用的坐标体系，是在火星坐标系的基础上又进行了一次加密处理。
因此在使用不同坐标系前，我们需要使用 AMap.convertFrom() 方法将这些非高德坐标系进行转换。

JavaScript
var gps = [116.3, 39.9];
AMap.convertFrom(gps, 'gps', function (status, result) {
  if (result.info === 'ok') {
    var lnglats = result.locations; // Array.<LngLat>
  }
});
```
## 越界
```js
/**
 * 判断点是否在多边形区域内
 * @param {Array<LatLng>} path 多边形顶点列表
 * @param {LatLng} point 待判断的点坐标
 * @returns {boolean} true：在多边形区域内；false：不在多边形区域内
 */
export function isContainsPoint(path, point) {
    var isInPolygon = false;
    var j = path.length - 1;
    for (var i = 0; i < path.length; i++) {
        var lati = path[i].latitude;
        var lngi = path[i].longitude;
        var latj = path[j].latitude;
        var lngj = path[j].longitude;
        if (((lati < point.latitude && latj >= point.latitude) || (latj < point.latitude && lati >= point.latitude)) && (lngi + (point.latitude - lati) / (latj - lati) * (lngj - lngi) < point.longitude)) {
            isInPolygon = !isInPolygon;
        }
        j = i;
    }
    return isInPolygon;
}
```
## 高德
* 导航或者地图SDK在vivo的Android 11版本上出现崩溃问题  
规避方法

以下两种方法均可规避，选择其中一个就可以。

1、将targetSDKVersion设置为小于30

2、在里的AndroidManifest.xml里的application里增加android:allowNativeHeapPointerTagging="false"

```
  <application android:allowNativeHeapPointerTagging="false">
  ...
  </application>
```

### 高德离线地图

<https://lbs.amap.com/tools/picker>  
获取城市中心坐标  


```java
options = GoogleMapUtil.getGooleMapTileOverlayOptions()
aMap.addTileOverlay(options);


    public static TileOverlayOptions getGooleMapTileOverlayOptions() {

        TileProvider tileProvider = new UrlTileProvider(256, 256) {
            public URL getTileUrl(int x, int y, int zoom) {
                try {
                    return new URL(String.format(url, x, y, zoom));
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }
                return null;
            }
        };

        return new TileOverlayOptions()
                .tileProvider(tileProvider)
                .diskCacheEnabled(true)
                .diskCacheSize(50000)
                .diskCacheDir("/storage/emulated/0/amap/OMCcache")
                .memoryCacheEnabled(false)
                .memCacheSize(10000)
                .zIndex(-9999);
    }
```


