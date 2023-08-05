package com.midoushitongtong.component06.util;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

public class ViewUtil {
    public static void hideKeyboard(Activity activity, View view) {
        // 从系统服务获取输入法管理器
        InputMethodManager inputMethodManager = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
        // 关闭屏幕上的软键盘
        inputMethodManager.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
}
