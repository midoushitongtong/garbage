package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

public class LifeCycleActivity extends AppCompatActivity {
  public static final String TAG = "Debug";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_life_cycle);
  }

  @Override
  protected void onStart() {
    super.onStart();
    // 竖屏切换到横屏会创建新的 activity 生命周期的方法会重新执行
    Log.d(TAG, "onStart: ");
  }
}