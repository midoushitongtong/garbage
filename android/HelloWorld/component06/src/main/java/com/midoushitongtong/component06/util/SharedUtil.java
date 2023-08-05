package com.midoushitongtong.component06.util;

import android.content.Context;
import android.content.SharedPreferences;

public class SharedUtil {
    private static SharedUtil sharedUtil;
    private SharedPreferences sharedPreferences;

    public static SharedUtil getInstance(Context context) {
        if (sharedUtil == null) {
            sharedUtil = new SharedUtil();
            sharedUtil.sharedPreferences = context.getSharedPreferences("config", Context.MODE_PRIVATE);
        }
        return sharedUtil;
    }

    public void writeBoolean(String key, boolean value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(key, value);
        editor.commit();
    }

    public boolean readBoolean(String key, boolean defaultValue) {
        return sharedPreferences.getBoolean(key, defaultValue);
    }
}
