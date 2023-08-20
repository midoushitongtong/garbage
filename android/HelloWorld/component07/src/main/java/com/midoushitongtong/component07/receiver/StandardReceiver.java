package com.midoushitongtong.component07.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class StandardReceiver extends BroadcastReceiver {
  public static final String STANDARD_ACTION = "com.midoushitongtong.component07.standard";

  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null && intent.getAction().equals(STANDARD_ACTION)) {
      Log.d("debug", "收到一个广播");
    }
  }
}
