package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;

public class BroadStaticActivity extends AppCompatActivity {
  public static final String SHOCK_ACTION = "com.midoushitongtong.component07.shock";

  private void init() {
    findViewById(R.id.send_broadcast_button).setOnClickListener(view -> {
      Intent intent = new Intent(SHOCK_ACTION);
      intent.setComponent(new ComponentName(this, "com.midoushitongtong.component07.receiver.ShockReceiver"));
      sendBroadcast(intent);
    });
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_broad_static);
    init();
  }
}