# 网络

[[toc]]

## 忽略 https 证书问题(okhttp)

```

package in.minewave.room.frp;

import okhttp3.OkHttpClient;

import javax.net.ssl.*;

import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

/**
 * 封装的支持Https连接工具类
 */
public class HttpsUtils {
    private MyTrustManager mMyTrustManager;

    private SSLSocketFactory createSSLSocketFactory() {
        SSLSocketFactory ssfFactory = null;
        try {
            mMyTrustManager = new MyTrustManager();
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, new TrustManager[]{mMyTrustManager}, new SecureRandom());
            ssfFactory = sc.getSocketFactory();
        } catch (Exception ignored) {
            ignored.printStackTrace();
        }

        return ssfFactory;
    }

    /**
     * 实现X509TrustManager接口
     */
    public class MyTrustManager implements X509TrustManager {

        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) {
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }
    }

    /**
     * 实现HostnameVerifier接口(信任所有的 https 证书。)
     */
    private class TrustAllHostnameVerifier implements HostnameVerifier {

        @Override
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    }

    public OkHttpClient getTrustAllClient() {
        OkHttpClient.Builder mBuilder = new OkHttpClient.Builder();
        mBuilder.sslSocketFactory(createSSLSocketFactory(), mMyTrustManager)
                .hostnameVerifier(new TrustAllHostnameVerifier());
        mBuilder.connectTimeout(60, TimeUnit.SECONDS);//设置连接超时时间
        mBuilder.readTimeout(60, TimeUnit.SECONDS);//设置读取超时时间
        return mBuilder.build();
    }
}

```

## 读取 pem 和 bks 证书

```
package com.corerate.cep.model.http.impl;

import com.corerate.cep.R;
import com.corerate.cep.container.HomeEnergyApplication;

import org.apache.http.conn.ssl.SSLSocketFactory;
import org.bouncycastle.openssl.PEMReader;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import java.security.UnrecoverableKeyException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

public class CustomerSocketFactory extends SSLSocketFactory {

    private static final String PASSWD = "123456";

    public CustomerSocketFactory(KeyStore truststore)
            throws NoSuchAlgorithmException, KeyManagementException,
            KeyStoreException, UnrecoverableKeyException {
        super(truststore);
    }

    public static SSLContext getSSLContext() {

        SSLContext sslContext = null;
        try {
            // 设定Security的Provider提供程序
            Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

            // 建立空BKS,android只能用BKS(BouncyCastle密库)，一般java应用参数传JKS(java自带密库)
            KeyStore ksKeys = KeyStore.getInstance("BKS");
            ksKeys.load(null, null);

            // 读入客户端证书
            PEMReader cacertfile = new PEMReader(new InputStreamReader(HomeEnergyApplication.context.getResources().openRawResource(R.raw.my_ca)));
            X509Certificate cacert = (X509Certificate) cacertfile.readObject();
            cacertfile.close();

            // 导入根证书作为trustedEntry
            KeyStore.TrustedCertificateEntry trustedEntry = new KeyStore.TrustedCertificateEntry(cacert);
            ksKeys.setEntry("ca_root", trustedEntry, null);

            TrustManagerFactory tmf = TrustManagerFactory.getInstance("X509");//密钥管理器,一般java应用传SunX509
            tmf.init(ksKeys);

            // 构建SSLContext，此处传入参数为TLS，也可以为SSL
            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, tmf.getTrustManagers(), null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sslContext;
    }

    public static SSLSocketFactory getSSL() {
        SSLContext sslContext = null;
        try {
            // 设定Security的Provider提供程序
            Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

            // 建立空BKS,android只能用BKS(BouncyCastle密库)，一般java应用参数传JKS(java自带密库)
            KeyStore ksKeys = KeyStore.getInstance("BKS");
            ksKeys.load(null, null);

            // 读入客户端证书
            PEMReader cacertfile = new PEMReader(new InputStreamReader(HomeEnergyApplication.context.getResources().openRawResource(R.raw.my_ca)));
            X509Certificate cacert = (X509Certificate) cacertfile.readObject();
            cacertfile.close();

            // 导入根证书作为trustedEntry
            KeyStore.TrustedCertificateEntry trustedEntry = new KeyStore.TrustedCertificateEntry(cacert);
            ksKeys.setEntry("ca_root", trustedEntry, null);

            TrustManagerFactory tmf = TrustManagerFactory.getInstance("X509");//密钥管理器,一般java应用传SunX509
            tmf.init(ksKeys);

            // 构建SSLContext，此处传入参数为TLS，也可以为SSL
            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, tmf.getTrustManagers(), null);
            SSLSocketFactory factory = new CustomerSocketFactory(ksKeys);
            return factory;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static SSLSocketFactory getSocketFactory() {
        InputStream input = null;
        try {
//            input = HomeEnergyApplication.context.getAssets().open("client.bks");
            input = HomeEnergyApplication.context.getResources().openRawResource(R.raw.client);
            KeyStore trustStore = KeyStore.getInstance("BKS");
            trustStore.load(input, PASSWD.toCharArray());
            SSLSocketFactory factory = new CustomerSocketFactory(trustStore);
            return factory;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                input = null;
            }
        }
    }

}
```

## 读取 pem 和 bks

```

获取httpclient

public static HttpClient getCustomClient() {
    BasicHttpParams params = new BasicHttpParams();
    HttpConnectionParams.setConnectionTimeout(params, CONNECTION_TIME_OUT);//请求超时时间
    HttpConnectionParams.setSoTimeout(params, SO_TIME_OUT);//等待数据超时时间
    HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
    HttpProtocolParams.setContentCharset(params, HTTP.DEFAULT_CONTENT_CHARSET);
    HttpProtocolParams.setUseExpectContinue(params, true);
    SchemeRegistry schReg = new SchemeRegistry();
    schReg.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
    schReg.register(new Scheme("https", CustomerSocketFactory.getSSL(), 443));
    ClientConnectionManager connMgr = new ThreadSafeClientConnManager(params, schReg);
    return new DefaultHttpClient(connMgr, params);
}




pem格式

public static SSLSocketFactory getSSL() {
    SSLContext sslContext = null;
    try {
        // 设定Security的Provider提供程序
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

        // 建立空BKS,android只能用BKS(BouncyCastle密库)，一般java应用参数传JKS(java自带密库)
        KeyStore ksKeys = KeyStore.getInstance("BKS");
        ksKeys.load(null, null);

        // 读入客户端证书
        PEMReader cacertfile = new PEMReader(new InputStreamReader(HomeEnergyApplication.context.getResources().openRawResource(R.raw.cacert)));
        X509Certificate cacert = (X509Certificate) cacertfile.readObject();
        cacertfile.close();

        // 导入根证书作为trustedEntry
        KeyStore.TrustedCertificateEntry trustedEntry = new KeyStore.TrustedCertificateEntry(cacert);
        ksKeys.setEntry("ca_root", trustedEntry, null);

        TrustManagerFactory tmf = TrustManagerFactory.getInstance("X509");//密钥管理器,一般java应用传SunX509
        tmf.init(ksKeys);

        // 构建SSLContext，此处传入参数为TLS，也可以为SSL
        sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, tmf.getTrustManagers(), null);
        SSLSocketFactory factory = new CustomerSocketFactory(ksKeys);
        return factory;
    } catch (Exception e) {
        e.printStackTrace();
        return null;
    }
}



bks格式

    public static SSLSocketFactory getSocketFactory() {
        InputStream input = null;
        try {
//            input = HomeEnergyApplication.context.getAssets().open("client.bks");
            input = HomeEnergyApplication.context.getResources().openRawResource(R.raw.client);
            KeyStore trustStore = KeyStore.getInstance("BKS");
            trustStore.load(input, PASSWD.toCharArray());
            SSLSocketFactory factory = new CustomerSocketFactory(trustStore);
            return factory;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                input = null;
            }
        }
    }


```
