package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.IntentFilter;
import android.os.Bundle;

import com.midoushitongtong.component07.receiver.AlarmReceiver;

public class AlarmActivity extends AppCompatActivity {
  private AlarmReceiver alarmReceiver;

  private void init() {
    findViewById(R.id.button).setOnClickListener(view -> {
      alarmReceiver.sendAlarm();
    });
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_alarm);
    init();
  }

  @Override
  protected void onStart() {
    super.onStart();
    alarmReceiver = new AlarmReceiver(getApplicationContext());
    IntentFilter intentFilter = new IntentFilter(AlarmReceiver.ALARM_ACTION);
    registerReceiver(alarmReceiver, intentFilter);
  }

  @Override
  protected void onStop() {
    super.onStop();
    unregisterReceiver(alarmReceiver);
  }
}