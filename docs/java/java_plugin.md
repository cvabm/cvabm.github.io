[[toc]]

## netty

```


package com.example.test;


import android.content.Context;
import android.os.Handler;
import android.util.Log;


import org.jboss.netty.bootstrap.ClientBootstrap;
import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.channel.Channel;
import org.jboss.netty.channel.ChannelFuture;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.ChannelStateEvent;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.ExceptionEvent;
import org.jboss.netty.channel.FixedReceiveBufferSizePredictorFactory;
import org.jboss.netty.channel.MessageEvent;
import org.jboss.netty.channel.SimpleChannelHandler;
import org.jboss.netty.channel.socket.nio.NioClientSocketChannelFactory;


import java.io.InputStream;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;


public class Client {
    private static final String TAG = "tag";


    public static Client client;
    public static Handler handler2;
    private ChannelFuture channelFuture;
    private NioClientSocketChannelFactory nioClientSocketChannelFactory;
    private Channel channel;


    public static Client getClient(Handler handler) {
        if (client == null) {
            client = new Client();
            handler2 = handler;
        }
        return client;
    }


    public void init() {


        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    nioClientSocketChannelFactory = new NioClientSocketChannelFactory(Executors.newCachedThreadPool(), Executors.newCachedThreadPool());
                    ClientBootstrap bootstrap = new ClientBootstrap(nioClientSocketChannelFactory);
                    bootstrap.setPipelineFactory(new ChannelPipelineFactory() {
                        @Override
                        public ChannelPipeline getPipeline() throws Exception {
                            return Channels.pipeline(new ClientHandler());
                        }
                    });


                    bootstrap.setOption("tcpNoDelay", true);
                    bootstrap.setOption("keepAlive", true);
                    bootstrap.setOption(
                            "receiveBufferSizePredictorFactory",
                            new FixedReceiveBufferSizePredictorFactory(65535)); // 65535
                    channelFuture = bootstrap.connect(new InetSocketAddress("10.200.86.222", 7788));
                    channelFuture.awaitUninterruptibly();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();




    }


    public void sendMEssage(String content) {
        channel = channelFuture.getChannel();
        if (!channel.isOpen() || !channel.isConnected()) {
        }
        byte[] bytes = content.getBytes();
        ChannelBuffer channelBuffer = ChannelBuffers.buffer(bytes.length);
        channelBuffer.writeBytes(bytes);
        channel.write(channelBuffer);
        Log.d(TAG, "sendMEssage: ");


    }


    class ClientHandler extends SimpleChannelHandler {
        @Override
        public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
            Log.d(TAG, "messageReceived: "+e.getMessage());
        }


        @Override
        public void exceptionCaught(ChannelHandlerContext ctx, ExceptionEvent e) throws Exception {
            Log.d(TAG, "exceptionCaught: " + e.getCause());
            super.exceptionCaught(ctx, e);
        }


        @Override
        public void channelConnected(ChannelHandlerContext ctx, ChannelStateEvent e) throws Exception {
            super.channelConnected(ctx, e);
            Log.d(TAG, "channelConnected: ");
        }


        @Override
        public void channelDisconnected(ChannelHandlerContext ctx, ChannelStateEvent e) throws Exception {
            super.channelDisconnected(ctx, e);
            Log.d(TAG, "channelDisconnected: ");
        }


        @Override
        public void channelClosed(ChannelHandlerContext ctx, ChannelStateEvent e) throws Exception {
            super.channelClosed(ctx, e);
            Log.d(TAG, "channelClosed: ");
        }
    }


    public static String getFromRaw(Context context, int raw) {
        String encoding = "UTF-8";
        String result = "";
        try {
            InputStream in = context.getResources().openRawResource(raw);
            //获取文件的字节数
            int lenght = in.available();
            //创建byte数组
            byte[] buffer = new byte[lenght];
            //将文件中的数据读到byte数组中
            in.read(buffer);
            result = new String(buffer, encoding);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}

```
