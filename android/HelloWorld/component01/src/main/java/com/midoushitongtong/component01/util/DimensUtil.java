package com.midoushitongtong.component01.util;

import android.content.Context;

public class DimensUtil {
    // 将 dp 转成 px
    public static int dip2px(Context context, float dpValue) {
        // 获取手机当前像素密度 (1dp 有多少 px)
        float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }
}
