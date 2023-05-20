package com.midoushitongtong.component02;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

public class Form1Activity extends AppCompatActivity {
    private ActivityResultLauncher<Intent> activityResultLauncher = registerForActivityResult(
        new ActivityResultContracts.StartActivityForResult(),
        new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                if (result == null || result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
                    return;
                }
                Intent intent = result.getData();
                TextView content = findViewById(R.id.content);
                Bundle bundle = intent.getExtras();
                content.setText(bundle.getString("age"));
            }
    });

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form1);

        findViewById(R.id.to_form2).setOnClickListener(View -> {
            // 唤起拨打电话程序
//            Intent intent = new Intent();
//            intent.setAction(Intent.ACTION_DIAL);
//            Uri uri = Uri.parse("tel:" + "123456");
//            intent.setData(uri);
//            startActivity(intent);

            // 唤起发送短信程序
//            Intent intent = new Intent();
//            intent.setAction(Intent.ACTION_SENDTO);
//            Uri uri = Uri.parse("smsto:" + "123456");
//            intent.setData(uri);
//            startActivity(intent);

//            Intent intent = new Intent(this, Form2Activity.class);
//            Bundle bundle = new Bundle();
//            bundle.putString("name", System.currentTimeMillis() + "");
//            intent.putExtras(bundle);
//            startActivity(intent);

            Intent intent = new Intent();
            intent.setClass(this, Form2Activity.class);
            // 设置要传递的数据
            Bundle bundle = new Bundle();
            bundle.putString("name", "张三");
            intent.putExtras(bundle);
            activityResultLauncher.launch(intent);
        });
    }
}