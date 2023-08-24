# 高刷
```
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    WindowManager wm = (WindowManager) getApplication().getSystemService(Context.WINDOW_SERVICE);
    Display display = wm.getDefaultDisplay();
    float[] rates = display.getSupportedRefreshRates();
    float maxRate = 0;
    for (float rate : rates) {
        if (rate > maxRate) {
            maxRate = rate;
        }
    }
    maxRefreshRate = maxRate;

} else maxRefreshRate = 60;
                ```