package com.midoushitongtong.component05_client;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.midoushitongtong.component05_client.util.PermissionUtil;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import java.net.URI;

public class PermissionLazyActivity extends AppCompatActivity {
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
        setContentView(R.layout.activity_permission_lazy);

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