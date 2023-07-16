package com.midoushitongtong.component05_client.util;

import android.content.Context;
import android.net.Uri;
import android.os.Build;

import androidx.core.content.FileProvider;


import com.midoushitongtong.component05_client.R;

import java.io.File;

public class FileUtil {
    public static boolean checkFileUri(Context context, String path) {
        File file = new File(path);
        if (!file.exists() || !file.isFile() || file.length() <= 0) {
            return false;
        }
        try {
            // 检测文件是否支持 fileProvider 的方式访问，如果有异常说明不支持
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                FileProvider.getUriForFile(context, context.getString(R.string.file_provider), file);
            }
        } catch (Error e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
