package com.midoushitongtong.component02;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class HomeActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
        initEvent();
    }

    private void init() {
        setContentView(R.layout.activity_home);
    }

    private void initEvent() {
        findViewById(R.id.to_about).setOnClickListener((View view) -> {
            startActivity(new Intent(HomeActivity.this, AboutActivity.class));
        });
    }
}