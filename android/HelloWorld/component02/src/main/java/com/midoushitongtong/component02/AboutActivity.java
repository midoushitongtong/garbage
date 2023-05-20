package com.midoushitongtong.component02;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class AboutActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
        initEvent();
    }

    private void init() {
        setContentView(R.layout.activity_about);
    }

    private void initEvent() {
        findViewById(R.id.back_icon).setOnClickListener((View view) -> {
            back();
        });
        findViewById(R.id.back_button).setOnClickListener((View view) -> {
            back();
        });
    }

    private void back() {
        // 结束当前页面
        finish();
    }
}
