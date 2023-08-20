package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.midoushitongtong.component07.receiver.TimeReceiver;

public class SystemMinuteActivity extends AppCompatActivity {
  private TimeReceiver timeReceiver;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_system_minute);
  }

  @Override
  protected void onStart() {
    super.onStart();
    timeReceiver = new TimeReceiver();
    IntentFilter intentFilter = new IntentFilter(Intent.ACTION_TIME_TICK);
    registerReceiver(timeReceiver, intentFilter);
  }

  @Override
  protected void onStop() {
    super.onStop();
    unregisterReceiver(timeReceiver);
  }
}