package com.midoushitongtong.component07.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.midoushitongtong.component07.BroadOrderActivity;

public class OrderBReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null && intent.getAction().equals(BroadOrderActivity.ORDER_ACTION)) {
      Log.d("debug", "接收器B收到一个广播");
      // 终止广播继续, 不在向低优先级的广播继续发送
      abortBroadcast();
    }
  }
}
