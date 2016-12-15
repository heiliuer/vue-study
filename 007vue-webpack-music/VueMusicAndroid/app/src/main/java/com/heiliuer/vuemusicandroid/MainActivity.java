package com.heiliuer.vuemusicandroid;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private WebView webviewMain;

    @TargetApi(19)
    protected void setTranslucentStatus(boolean on) {
        Window win = getWindow();
        WindowManager.LayoutParams winParams = win.getAttributes();
        final int bits = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
        if (on) {
            winParams.flags |= bits;
        } else {
            winParams.flags &= ~bits;
        }
        win.setAttributes(winParams);
    }

    public void setStatusBarDarkMode(boolean darkmode, Activity activity) {
        Class<? extends Window> clazz = activity.getWindow().getClass();
        try {
            int darkModeFlag = 0;
            Class<?> layoutParams = Class.forName("android.view.MiuiWindowManager$LayoutParams");
            Field field = layoutParams.getField("EXTRA_FLAG_STATUS_BAR_DARK_MODE");
            darkModeFlag = field.getInt(layoutParams);
            Method extraFlagField = clazz.getMethod("setExtraFlags", int.class, int.class);
            extraFlagField.invoke(activity.getWindow(), darkmode ? darkModeFlag : 0, darkModeFlag);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private HttpURLConnection getConnection(String url, String httpMethod) throws MalformedURLException, IOException {

        final HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod(httpMethod);

        return connection;
    }

    private long timeLastBackPressedToExit;

    @Override
    public void onBackPressed() {
        if (webviewMain.canGoBack()) {
            webviewMain.goBack();
        } else {
            long cu = System.currentTimeMillis();
            if (cu - timeLastBackPressedToExit <= 1000) {
                super.onBackPressed();
            } else {
                timeLastBackPressedToExit = cu;
                Toast.makeText(this, "再次点击返回退出", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        setTranslucentStatus(true);

        setStatusBarDarkMode(true, this);

        webviewMain = (WebView) findViewById(R.id.webview_main);
        WebSettings webSettings = webviewMain.getSettings();
        webSettings.setJavaScriptEnabled(true);


        webviewMain.setWebViewClient(new WebViewClient() {
            @Override
            @TargetApi(Build.VERSION_CODES.N)
            public WebResourceResponse shouldInterceptRequest(WebView view, final WebResourceRequest request) {
                String target = request.getUrl().toString();
                Log.v("data", "get url:" + target);
                if (target.startsWith("file://at.alicdn")) {
                    target = target.replace("file://at.alicdn", "http://at.alicdn");

                    WebResourceResponse response = getWebResourceResponse(request, target);
                    if (response != null) {
                        return response;
                    }
                } else if (target.startsWith("http://tingapi.ting.baidu.com/")) {
                    WebResourceResponse response = getWebResourceResponse(request, target);
                    if (response != null) {
                        return response;
                    }
                }

                return super.shouldInterceptRequest(view, request);
            }

            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                //防止跳出
//                final String url = request.getUrl().toString();
//                if (!url.startsWith("file://")) {
//                    webviewMain.post(new Runnable() {
//                        @Override
//                        public void run() {
//                            startUri(url);
//                        }
//                    });
//                    return true;
//                }
                return super.shouldOverrideUrlLoading(view, request);
            }
        });

        webviewMain.setWebChromeClient(new WebChromeClient() {

        });

        webviewMain.loadUrl("file:///android_asset/index.html");
    }

    private void startUri(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url));
        startActivity(intent);
    }


    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Nullable
    private WebResourceResponse getWebResourceResponse(WebResourceRequest request, String target) {
        try {
            HttpURLConnection conn = getConnection(target, request.getMethod());

            // add request headers
            boolean isTingapi = target.startsWith("http://tingapi.ting.baidu.com");
            for (Map.Entry<String, String> entry : request.getRequestHeaders().entrySet()) {
                if (!(isTingapi && "referer#origin".indexOf(entry.getKey().toLowerCase()) != -1)) {
                    conn.setRequestProperty(entry.getKey(), entry.getValue());
                }
            }

//            if (isTingapi)
//                conn.setRequestProperty("origin", "http://tingapi.ting.baidu.com");

            // Read input
            String charset = conn.getContentEncoding() != null ? conn.getContentEncoding() : Charset.defaultCharset().displayName();
            String mime = conn.getContentType();

            InputStream is = conn.getInputStream();

            Map<String, String> mapHeaders = new HashMap<>();
            mapHeaders.put("Access-Control-Allow-Origin", "*");
            return new WebResourceResponse(mime, charset, conn.getResponseCode(), conn.getResponseMessage(), mapHeaders, is);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
