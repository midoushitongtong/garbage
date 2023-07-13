package com.midoushitongtong.component05_client.util;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;


public class PermissionUtil {
    public static final String[] PERMISSIONS_CONTACT = new String[]{
            Manifest.permission.READ_CONTACTS,
            Manifest.permission.WRITE_CONTACTS
    };
    public static final String[] PERMISSIONS_SMS = new String[]{
            Manifest.permission.READ_SMS,
            Manifest.permission.SEND_SMS
    };
    public static final String[] PERMISSIONS_ALL = new String[]{
            Manifest.permission.READ_CONTACTS,
            Manifest.permission.WRITE_CONTACTS,
            Manifest.permission.READ_SMS,
            Manifest.permission.SEND_SMS
    };
    public static final int REQUEST_CODE_CONTACT = 1;
    public static final int REQUEST_CODE_SMS = 2;
    public static final int REQUEST_CODE_ALL = 3;


    // 检查是否有对应的权限
    public static boolean checkPermission(Activity activity, String[] permissions, int requestCode) {
        // android 6 以上才需要动态申请权限
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int check = PackageManager.PERMISSION_GRANTED;
            for (String permission : permissions) {
                check = ContextCompat.checkSelfPermission(activity, permission);
                if (check != PackageManager.PERMISSION_GRANTED) {
                    break;
                }
            }
            // 如果没有权限，则向系统请求权限
            if (check != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, permissions, requestCode);
                return false;
            }
        }
        return true;
    }

    // 检查申请权限结果
    public static boolean checkGrant(int[] grantResults) {
        if (grantResults != null) {
            for (int grant : grantResults) {
                if (grant != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
