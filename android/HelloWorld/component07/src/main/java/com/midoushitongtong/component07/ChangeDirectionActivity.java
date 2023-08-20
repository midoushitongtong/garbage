package com.midoushitongtong.component07;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;

public class ChangeDirectionActivity extends AppCompatActivity {
  private static final String TAG = "Debug";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_change_direction);
  }

  // 在配置项发生改变时触发。比如屏幕方向发生变化
  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    switch (newConfig.orientation) {
      case Configuration.ORIENTATION_PORTRAIT:
        Log.d(TAG, "onConfigurationChanged: 竖屏");
        break;
      case Configuration.ORIENTATION_LANDSCAPE:
        Log.d(TAG, "onConfigurationChanged: 横屏");
        break;
    }
  }

  @Override
  protected void onStart() {
    super.onStart();
    // 竖屏切换到横屏不会创建新的 activity
    Log.d(TAG, "onStart: ");
  }
}