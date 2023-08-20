package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.app.PictureInPictureParams;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.util.Rational;

public class ReturnDesktopActivity extends AppCompatActivity {
  private DesktopReceiver desktopReceiver;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_return_desktop);
    desktopReceiver = new DesktopReceiver();
    IntentFilter intentFilter = new IntentFilter(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
    registerReceiver(desktopReceiver, intentFilter);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    unregisterReceiver(desktopReceiver);
  }

  // 在进入画中画模式或者退出画中画模式
  @Override
  public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode) {
    super.onPictureInPictureModeChanged(isInPictureInPictureMode);
    if (isInPictureInPictureMode) {
      Log.d("Debug", "进入画中画模式");
    } else {
      Log.d("Debug", "退出画中画模式");
    }
  }

  // 返回到桌面的接收器
  private class DesktopReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
      if (intent != null && intent.getAction().equals(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)) {
        String reason = intent.getStringExtra("reason");
        if (!TextUtils.isEmpty(reason) && (reason.equals("homekey") || reason.equals("recentapps"))) {
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !isInPictureInPictureMode()) {
            // 创建画中画参数构建器
            PictureInPictureParams.Builder builder = new PictureInPictureParams.Builder();
            // 画中画宽高比例, 10, 5 表示 宽度是高度的2倍
            Rational rational = new Rational(10, 5);
            builder.setAspectRatio(rational);
            // 进入画中画模式
            enterPictureInPictureMode(builder.build());
          }
        }
      }
    }
  }
}