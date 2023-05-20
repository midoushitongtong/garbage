package com.midoushitongtong.component02;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class FirstActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first);
        findViewById(R.id.to_second).setOnClickListener(View -> {
            Intent intent = new Intent(FirstActivity.this, SecondActivity.class);

            // 销毁目标 Activity 和它之上的所有 Activity， 重新创建目标 Activity
//            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

            // 清空任务栈中所有 Activity，并创建新的任务栈存放目标 Activity
//            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);

            startActivity(intent);
        });
    }
}
