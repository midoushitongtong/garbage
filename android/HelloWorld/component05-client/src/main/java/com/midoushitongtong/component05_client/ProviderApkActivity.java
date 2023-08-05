package com.midoushitongtong.component05_client;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;

import com.midoushitongtong.component05_client.util.PermissionUtil;
import com.midoushitongtong.component05_client.util.ToastUtil;

import java.io.File;

public class ProviderApkActivity extends AppCompatActivity {
    private void checkAndInstall() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // 安卓 11 之后需要的权限
            if (!Environment.isExternalStorageManager()) {
                // 跳转到设置页面, 申请安装 apk 权限
                Intent intent = new Intent();
                intent.setAction(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setData(Uri.fromParts("package", getPackageName(), null));
                startActivity(intent);
            } else {
                installApk();
            }
        } else {
            // 安卓 11 之前需要的权限
            if (PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_EXTERNAL_STORAGE, PermissionUtil.REQUEST_CODE_EXTERNAL_STORAGE)) {
                installApk();
            }
        }
    }

    private void installApk() {
        // apk 路径
        String apkPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString() + "/application-ea503185-e942-4cac-b551-a775e4074c48.apk";
        // 获取包管理器
        PackageManager packageManager = getPackageManager();
        // 获取 apk 文件信息
        PackageInfo packageInfo = packageManager.getPackageArchiveInfo(apkPath, PackageManager.GET_ACTIVITIES);
        if (packageInfo == null) {
            ToastUtil.show(this, "安装包已损坏");
            return;
        }
        Uri uri = Uri.parse(apkPath);
        // 兼容 android 7.0 获取文件 uri 的访问方式
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            uri = FileProvider.getUriForFile(this, getString(R.string.file_provider), new File(apkPath));
        }
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.setDataAndType(uri, "application/vnd.android.package-archive");
        startActivity(intent);
    }
    private void init() {
        findViewById(R.id.install_apk_button).setOnClickListener(view -> {
            // 判断是否有安装 apk 的权限
           checkAndInstall();
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provider_apk);
        init();
    }
}