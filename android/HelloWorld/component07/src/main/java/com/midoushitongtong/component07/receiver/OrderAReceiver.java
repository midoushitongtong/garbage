package com.midoushitongtong.component07.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.midoushitongtong.component07.BroadOrderActivity;

public class OrderAReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null && intent.getAction().equals(BroadOrderActivity.ORDER_ACTION)) {
      Log.d("debug", "接收器A收到一个广播");
    }
  }
}
