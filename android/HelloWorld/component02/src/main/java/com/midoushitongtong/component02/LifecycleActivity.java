package com.midoushitongtong.component02;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

public class LifecycleActivity extends AppCompatActivity {
    private static final String LOG_TAG = "ning";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();

        Log.d(LOG_TAG, "LifecycleActivity onCreate");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(LOG_TAG, "LifecycleActivity onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(LOG_TAG, "LifecycleActivity onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(LOG_TAG, "LifecycleActivity onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(LOG_TAG, "LifecycleActivity onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(LOG_TAG, "LifecycleActivity onDestroy");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(LOG_TAG, "LifecycleActivity onRestart");
    }

    private void init() {
        setContentView(R.layout.activity_lifecycle);
        findViewById(R.id.button1).setOnClickListener(View -> {
            startActivity(new Intent(LifecycleActivity.this, AboutActivity.class));
        });
    }

}
