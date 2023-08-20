package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Button;

import com.midoushitongtong.component07.receiver.StandardReceiver;

public class BroadStandardActivity extends AppCompatActivity {
  private StandardReceiver standardReceiver;
  private void init() {
    Button sendStandardButton = findViewById(R.id.sendStandardButton);
    sendStandardButton.setOnClickListener(view -> {
      Intent intent = new Intent(StandardReceiver.STANDARD_ACTION);
      sendBroadcast(intent);
    });
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_broad_standard);
    init();
  }

  @Override
  protected void onStart() {
    super.onStart();
    standardReceiver = new StandardReceiver();
    IntentFilter filter = new IntentFilter(StandardReceiver.STANDARD_ACTION);
    registerReceiver(standardReceiver, filter);
  }

  @Override
  protected void onStop() {
    super.onStop();
    unregisterReceiver(standardReceiver);
  }
}