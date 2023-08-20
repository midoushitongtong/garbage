package com.midoushitongtong.component05_client;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;
import android.Manifest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.midoushitongtong.component05_client.util.PermissionUtil;
import com.midoushitongtong.component05_client.util.ToastUtil;

public class PermissionHungryActivity extends AppCompatActivity {
    private void jumpToSetting() {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.fromParts("package", getPackageName(), null));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Log.d("debug", getPackageName());
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_permission_hungry);

        PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_ALL, PermissionUtil.REQUEST_CODE_ALL);

        findViewById(R.id.get_contact_button).setOnClickListener(view -> {
            PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_CONTACT, PermissionUtil.REQUEST_CODE_CONTACT);
        });

        findViewById(R.id.send_sms_button).setOnClickListener(view -> {
            PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_SMS, PermissionUtil.REQUEST_CODE_SMS);
        });
    }

    // 申请权限的回调方法
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case PermissionUtil.REQUEST_CODE_ALL:
                Log.d("debug", grantResults.toString());
                if (PermissionUtil.checkGrant(grantResults)) {
                    Toast.makeText(this, "获取所有权限成功", Toast.LENGTH_SHORT).show();
                } else {
                    // 部分权限获取失败
                    for (int i = 0; i < grantResults.length; i++) {
                        if (grantResults[i] != PackageManager.PERMISSION_GRANTED) {
                            switch (permissions[i]) {
                                case Manifest.permission.READ_CONTACTS:
                                case Manifest.permission.WRITE_CONTACTS:
                                    ToastUtil.show(this, "获取通讯录权限失败");
                                    jumpToSetting();
                                    return;
                                case Manifest.permission.READ_SMS:
                                case Manifest.permission.SEND_SMS:
                                    ToastUtil.show(this, "获取短信权限失败");
                                    jumpToSetting();
                                    return;
                            }
                        }
                    }
                }
                break;
            case PermissionUtil.REQUEST_CODE_CONTACT:
                Log.d("debug", grantResults.toString());
                if (PermissionUtil.checkGrant(grantResults)) {
                    Toast.makeText(this, "获取通讯录权限成功", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "获取通讯录权限失败", Toast.LENGTH_SHORT).show();
                    jumpToSetting();
                }
                break;
            case PermissionUtil.REQUEST_CODE_SMS:
                if (PermissionUtil.checkGrant(grantResults)) {
                    Toast.makeText(this, "收发短信权限成功", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "收发短信权限失败", Toast.LENGTH_SHORT).show();
                    jumpToSetting();
                }
                break;
        }
    }
}