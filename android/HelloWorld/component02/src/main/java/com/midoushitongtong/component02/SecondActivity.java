package com.midoushitongtong.component02;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class SecondActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        findViewById(R.id.to_first).setOnClickListener(View -> {
            Intent intent = new Intent(SecondActivity.this, FirstActivity.class);
            // 如果栈中有当前的 Activity，会重新创建此 Activity，并清除此 Activity 之前的全部 Activity
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        });

    }
}
