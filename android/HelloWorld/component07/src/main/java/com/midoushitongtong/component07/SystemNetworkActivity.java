package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.midoushitongtong.component07.receiver.NetworkReceiver;

public class SystemNetworkActivity extends AppCompatActivity {
  private NetworkReceiver networkReceiver;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_system_network);
  }

  @Override
  protected void onStart() {
    super.onStart();
    networkReceiver = new NetworkReceiver();
    IntentFilter intentFilter = new IntentFilter("android.net.conn.CONNECTIVITY_CHANGE");
    registerReceiver(networkReceiver, intentFilter);
  }

  @Override
  protected void onStop() {
    super.onStop();
    unregisterReceiver(networkReceiver);
  }
}