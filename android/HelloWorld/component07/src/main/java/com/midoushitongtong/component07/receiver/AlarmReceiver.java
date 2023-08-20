package com.midoushitongtong.component07.receiver;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class AlarmReceiver extends BroadcastReceiver {
  private Context context;
  public static final String ALARM_ACTION = "com.midoushitongtong.component07.alarm";

  public AlarmReceiver(Context context) {
    this.context = context;
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null && intent.getAction().equals(ALARM_ACTION)) {
      Log.d("debug", "收到闹钟广播");
    }
  }

  // 发送闹钟广播
  public void sendAlarm() {
    Intent intent = new Intent(ALARM_ACTION);
    // 创建一个用于广播的延迟意图
    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
    // 从系统服务获取闹钟管理器
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    // 在空闲时发送广播
    alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, 1000, pendingIntent);
  }
}
