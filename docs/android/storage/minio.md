
[[toc]]
# minioLib（无下载进度）
<https://github.com/cvabm/MinioForAndroid>

# aws-sdk（有下载进度）
*   依赖

```java
// https://mvnrepository.com/artifact/com.amazonaws/aws-android-sdk-s3
implementation group: 'com.amazonaws', name: 'aws-android-sdk-s3', version: '2.22.5'
// https://mvnrepository.com/artifact/com.amazonaws/aws-android-sdk-mobile-client
implementation group: 'com.amazonaws', name: 'aws-android-sdk-mobile-client', version: '2.22.5'

```

*   service配置

 ```xml
 <service android:name="com.amazonaws.mobileconnectors.s3.transferutility.TransferService" android:enabled="true" />

```

### 文件上传

 ```java
     AmazonS3 s3 = new AmazonS3Client(new AWSCredentials() {
            @Override
            public String getAWSAccessKeyId() {
                return NetBaseConfig.MINIO_KEY;//minio的key
            }
            @Override
            public String getAWSSecretKey() {
                return NetBaseConfig.MINIO_SECRET;//minio的密钥
            }
        }, Region.getRegion(Regions.CN_NORTH_1),new ClientConfiguration());
        //服务器地址
        s3.setEndpoint(NetBaseConfig.MINIO_ENDPOINT);//http://ip:端口号

        File file = new File(filePath);//filePath是文件在Android中的地址
        //(桶名,fileName文件在桶中存放地址,文件file)
        s3.putObject(new PutObjectRequest(MINIO_BUCKET_NAME,fileName,file).withGeneralProgressListener(new ProgressListener(){
            int readedbyte = 0;
            @Override
            public void progressChanged(ProgressEvent progressEvent) {
                readedbyte += progressEvent.getBytesTransferred();
                Log.d(TAG, "progressChanged: "+fileName+"文件上传进度："+((float)(readedbyte / (float)file.length())*100 )+"%");
//                System.out.println("=========progress=================" + + "============URL=============");
            }
        }));
        //获取文件上传后访问地址url:(http://xxx/地址?密钥)
//        GeneratePresignedUrlRequest urlRequest = new GeneratePresignedUrlRequest(MINIO_BUCKET_NAME, fileName);
//        URL url = s3.generatePresignedUrl(urlRequest);
//        System.out.println("=========URL=================" + url.toString() + "============URL=============");
```
