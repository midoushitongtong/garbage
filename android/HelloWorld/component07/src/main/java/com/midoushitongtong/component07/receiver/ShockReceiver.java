package com.midoushitongtong.component07.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Vibrator;
import android.util.Log;

import com.midoushitongtong.component07.BroadStaticActivity;

public class ShockReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null && intent.getAction().equals(BroadStaticActivity.SHOCK_ACTION)) {
      Log.d("debug", "震动");
      Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
      vibrator.vibrate(500);
    }
  }
}
